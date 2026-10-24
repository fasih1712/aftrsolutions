// Email to the team when someone requests Innovation Hub access. Sent over SMTP, so any
// mailbox works (Gmail with an App Password is free). Off unless SMTP_HOST, SMTP_USER and
// SMTP_PASS are set; a failed email is logged and never blocks the sign-up.
import nodemailer from 'nodemailer'

const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env
const PORT = Number(process.env.SMTP_PORT || 465)
const FROM = process.env.SMTP_FROM || SMTP_USER
const TO = process.env.HUB_NOTIFY_EMAIL || 'info@aftrsolutions.com'
// A bot rotating IPs could get past the sign-up rate limit; this keeps the inbox usable.
const DAILY_LIMIT = Number(process.env.HUB_NOTIFY_DAILY_LIMIT || 50)

const transport = SMTP_HOST && SMTP_USER && SMTP_PASS
  ? nodemailer.createTransport({ host: SMTP_HOST, port: PORT, secure: PORT === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
  : null

export const notifyEnabled = Boolean(transport)

/** Logs whether the SMTP login works, so a wrong password shows up in `docker logs hub-api`. */
export async function checkNotify() {
  if (!transport) return console.log('hub: email notifications off (no SMTP_HOST / SMTP_USER / SMTP_PASS)')
  try {
    await transport.verify()
    console.log(`hub: email notifications on, sending to ${TO}`)
  } catch (error) {
    console.warn(`hub: email notifications not working (${error.code || error.message})`)
  }
}

let day = ''
let sent = 0

export function notifyNewRequest(user, adminUrl) {
  if (!transport) return
  const today = new Date().toISOString().slice(0, 10)
  if (today !== day) { day = today; sent = 0 }
  if (++sent > DAILY_LIMIT) {
    if (sent === DAILY_LIMIT + 1) console.warn(`hub: notification limit (${DAILY_LIMIT}/day) reached`)
    return
  }
  const text = [
    'Someone has requested access to the AFTR Innovation Hub.',
    '',
    `Name:     ${user.name}`,
    `Email:    ${user.email}`,
    `Company:  ${user.company}`,
    `Phone:    ${user.phone || 'Not given'}`,
    '',
    'Wants to try:',
    user.reason,
    '',
    `Approve or reject it here: ${adminUrl}`,
    '',
    'Reply to this email to write to them directly.',
  ].join('\n')
  transport.sendMail({
    from: `"AFTR Innovation Hub" <${FROM}>`,
    to: TO,
    replyTo: user.email,
    subject: `New Innovation Hub request: ${user.name}, ${user.company}`,
    text,
  }).catch((error) => console.warn(`hub: notification email failed (${error.code || error.message})`))
}
