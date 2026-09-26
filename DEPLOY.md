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
`curl -s http://127.0.0.1:8081/api/health` on the server: `{"ready":true,"provider":"gemini"}` means the chat button is live.
Without a key the site works normally and the chat button stays hidden.
