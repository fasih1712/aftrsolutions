// SQLite storage for the Innovation Hub (users, sessions, demo access log).
// In Docker the file lives on the `hub-data` named volume, so accounts survive redeploys.
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import Database from 'better-sqlite3'

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  company       TEXT NOT NULL DEFAULT '',
  phone         TEXT NOT NULL DEFAULT '',
  reason        TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'revoked')),
  created_at    TEXT NOT NULL,
  approved_at   TEXT,
  approved_by   INTEGER REFERENCES users(id),
  last_login_at TEXT
);
CREATE INDEX IF NOT EXISTS users_status ON users(status);

CREATE TABLE IF NOT EXISTS sessions (
  id         INTEGER PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  ip         TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS access_log (
  id        INTEGER PRIMARY KEY,
  user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  demo_slug TEXT NOT NULL,
  at        TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS access_log_at ON access_log(at);
`

const USER_COLUMNS = 'u.id, u.name, u.email, u.company, u.phone, u.reason, u.role, u.status, u.created_at, u.approved_at, u.last_login_at'

export function openDb(file) {
  mkdirSync(dirname(file), { recursive: true })
  const db = new Database(file)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  db.pragma('busy_timeout = 3000')
  db.exec(SCHEMA)

  const q = {
    userByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
    userById: db.prepare('SELECT * FROM users WHERE id = ?'),
    insertUser: db.prepare(`INSERT INTO users (name, email, company, phone, reason, password_hash, role, status, created_at, approved_at)
      VALUES (@name, @email, @company, @phone, @reason, @password_hash, @role, @status, @created_at, @approved_at)`),
    setStatus: db.prepare('UPDATE users SET status = @status, approved_at = @approved_at, approved_by = @approved_by WHERE id = @id'),
    setName: db.prepare('UPDATE users SET name = ? WHERE id = ?'),
    setPassword: db.prepare('UPDATE users SET password_hash = ? WHERE id = ?'),
    touchLogin: db.prepare('UPDATE users SET last_login_at = ? WHERE id = ?'),
    listUsers: db.prepare(`SELECT ${USER_COLUMNS}, a.name AS approved_by_name,
        (SELECT COUNT(*) FROM access_log l WHERE l.user_id = u.id) AS demo_opens
      FROM users u LEFT JOIN users a ON a.id = u.approved_by
      WHERE (@status = 'all' OR u.status = @status OR (@status = 'closed' AND u.status IN ('rejected', 'revoked')))
      ORDER BY u.created_at DESC LIMIT 500`),
    countByStatus: db.prepare('SELECT status, COUNT(*) AS n FROM users GROUP BY status'),

    insertSession: db.prepare(`INSERT INTO sessions (user_id, token_hash, created_at, expires_at, ip, user_agent)
      VALUES (@user_id, @token_hash, @created_at, @expires_at, @ip, @user_agent)`),
    sessionUser: db.prepare(`SELECT s.id AS session_id, s.expires_at, ${USER_COLUMNS}
      FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?`),
    deleteSession: db.prepare('DELETE FROM sessions WHERE token_hash = ?'),
    deleteSessionsFor: db.prepare('DELETE FROM sessions WHERE user_id = ?'),
    deleteOtherSessions: db.prepare('DELETE FROM sessions WHERE user_id = ? AND id != ?'),
    deleteExpired: db.prepare('DELETE FROM sessions WHERE expires_at <= ?'),

    logAccess: db.prepare('INSERT INTO access_log (user_id, demo_slug, at) VALUES (?, ?, ?)'),
    recentAccess: db.prepare(`SELECT l.demo_slug, l.at, u.name, u.email, u.company
      FROM access_log l JOIN users u ON u.id = l.user_id ORDER BY l.at DESC LIMIT ?`),
    accessSince: db.prepare('SELECT COUNT(*) AS n FROM access_log WHERE at >= ?'),
    accessTotal: db.prepare('SELECT COUNT(*) AS n FROM access_log'),
  }

  return { db, q }
}
