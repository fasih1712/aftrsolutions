# Deploying to AWS EC2 (Thesis Craft Mentors server)

## 1. DNS
Point `aftrsolutions.com` and `www.aftrsolutions.com` (A records) to the EC2 public IP.

## 2. Run the container on the server
```bash
git clone https://github.com/fasih1712/aftrsolutions.git ~/aftrsolutions
cd ~/aftrsolutions
docker compose up -d --build
curl -I http://127.0.0.1:8081      # should return 200
```

## 3. Add the site to Caddy (automatic HTTPS)
Caddy runs inside the `thesiscraftmentors` container (default `bridge` network),
and its Caddyfile is baked into that image. So the block lives in the
ThesisCraftMentor repo's `Caddyfile`:

```
aftrsolutions.com, www.aftrsolutions.com {
    reverse_proxy 172.17.0.1:8081
    encode gzip
}
```

`172.17.0.1` is the host's `docker0` bridge IP (check with `ip -4 addr show docker0`);
`docker-compose.yml` publishes aftr-web on it so the Caddy container can reach it.
Pushing the ThesisCraftMentor repo rebuilds and restarts Caddy, which then fetches
Let's Encrypt certificates automatically (stored in the `caddy_data` volume).

## 4. Updates
```bash
cd ~/aftrsolutions && git pull && docker compose up -d --build
```
## 5. CI/CD (automatic)
`.github/workflows/deploy.yml` builds the site and, on every push to `main`, SSHes into
the server and runs `git reset --hard origin/main && docker compose up -d --build`.

Repo → Settings → Secrets and variables → Actions → add:

| Secret | Value |
|---|---|
| `EC2_HOST` | EC2 public IP |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | full contents of the `.pem` private key |

Caddy config (step 3) is a one-time manual step; the workflow does not touch it.

## AI chat assistant

The site runs a second container, `aftr-chat`, for the website chatbot. It needs one API key.

**Free (recommended): Google Gemini**
1. Open https://aistudio.google.com/apikey, sign in with a Google account and click **Create API key**. No credit card needed.
2. In GitHub: repo **Settings > Secrets and variables > Actions > New repository secret**, name `GEMINI_API_KEY`, paste the key.
3. Re-run the **Deploy to AWS EC2** workflow (Actions tab > Run workflow), or push any commit.

The free tier is rate limited (a few hundred to about a thousand answers a day, depending on the model). When a model hits its limit the
server falls back to the next one in `GEMINI_MODELS` (default `gemini-flash-latest,gemini-flash-lite-latest`); if all are busy, visitors
see a polite "try again in a minute" message. On the free tier Google may use prompts and replies to improve its products.

**Paid alternative: Claude** - add `ANTHROPIC_API_KEY` instead (used only when no Gemini key is set).

The deploy writes the keys to `~/aftrsolutions/.env` on the server (mode 600, not in git). Check with
`curl -s http://127.0.0.1:8081/api/health` on the server: `{"ready":true}` means the chat button is live.
Without a key the site works normally and the chat button stays hidden.

## Innovation Hub

The `hub-api` container (folder `hub/`) runs the Innovation Hub: access requests, admin approval, sign-in
sessions, and the check that protects the demo subdomains. Users live in SQLite at `/data/hub.db` on the
`hub-data` Docker volume, so they survive redeploys (`docker compose down -v` would delete them).

**Admins (one-time):** add two GitHub secrets, then deploy:

| Secret | Value |
|---|---|
| `HUB_ADMIN_EMAILS` | comma-separated admin emails, e.g. `fasih@aftrsolutions.com,rafay@aftrsolutions.com` |
| `HUB_ADMIN_PASSWORD` | a starting password, at least 10 characters, no single quote (`'`) |

On start, hub-api creates any listed admin that doesn't exist yet. Existing accounts are never changed, so
each admin should sign in at `/hub/login` and change the password on `/hub/account` straight away.
Admins approve, reject, revoke and reset passwords at `/hub/admin`.

**Email on new requests (optional, free):** hub-api emails the team whenever someone requests access, with
their details and a link to `/hub/admin`. It sends over SMTP, so add these GitHub secrets and redeploy:

| Secret | Gmail (free) | Other mailbox |
|---|---|---|
| `SMTP_HOST` | `smtp.gmail.com` | your provider's SMTP server |
| `SMTP_PORT` | `465` | `465` (SSL) or `587` (STARTTLS) |
| `SMTP_USER` | the Gmail address | the mailbox login |
| `SMTP_PASS` | a 16-character App Password | the mailbox password |
| `HUB_NOTIFY_EMAIL` | where to send (default `info@aftrsolutions.com`) | same |

Gmail App Password: turn on 2-Step Verification for the Google account, then create one at
https://myaccount.google.com/apppasswords (it only works with 2-Step Verification on). Use a separate Gmail account for
sending if you like; replies go straight to the person who asked (Reply-To). At most 50 notification emails a day
(`HUB_NOTIFY_DAILY_LIMIT`). `docker logs hub-api` shows `email notifications on` or the reason they aren't working.

Check on the server: `curl -s http://127.0.0.1:8081/api/hub/health` returns `{"ok":true}`.
Backup: `docker run --rm -v aftrsolutions_hub-data:/data -v "$PWD":/out alpine cp /data/hub.db /out/hub-backup.db`.

### Innovation Hub demos

Each live demo is its own container on this server, serving **sample data only** (never real client data),
on its own subdomain such as `demo-chatbot.aftrsolutions.com`. The Hub session cookie is set for
`.aftrsolutions.com`, so the same sign-in works there, and Caddy asks hub-api before every request.

1. **Container:** run the demo (separate repo or a `demos/` folder) bound to the docker bridge only, with a
   memory limit, e.g. in its compose file:
   ```yaml
   services:
     demo-chatbot:
       image: demo-chatbot:latest
       restart: unless-stopped
       ports: ["172.17.0.1:9101:80"]
       mem_limit: 128m
   ```
   The signed-in user's email arrives in the `X-Hub-User` request header if the demo needs it.
2. **DNS:** add an `A` record `demo-chatbot` -> the server's Elastic IP.
3. **Caddy:** add this block to the ThesisCraftMentor repo's `Caddyfile` and push (Caddy gets the certificate itself):
   ```
   demo-chatbot.aftrsolutions.com {
       forward_auth 172.17.0.1:8081 {
           uri /api/hub/auth/verify?redirect=1
           copy_headers X-Hub-User
       }
       reverse_proxy 172.17.0.1:9101
   }
   ```
   `/api/hub/auth/verify` returns 200 for a signed-in, approved user. Otherwise, with `?redirect=1`, it
   answers with a redirect to `https://aftrsolutions.com/hub/login?next=<the demo URL>`, which Caddy passes
   to the browser. (Caddy hands the auth response straight back to the visitor, so a `handle_errors`
   redirect would never run.) `next` is only honoured for `aftrsolutions.com` and its subdomains.
4. **Website:** in `src/data/hub.js` set that demo's `type: 'live'` and `url: 'https://demo-chatbot.aftrsolutions.com'`,
   then push. The Hub, the demo page and the chat assistant's knowledge all update from that file.

Revoking a user deletes their sessions, so they lose access to every demo at once.
