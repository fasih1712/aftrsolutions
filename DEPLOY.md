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
Add this block to the existing Caddyfile used by the Thesis Craft Mentors setup:

```
aftrsolutions.com, www.aftrsolutions.com {
    reverse_proxy 127.0.0.1:8081
    encode gzip
}
```

> If Caddy runs **inside a Docker container**, `127.0.0.1` points at the Caddy
> container itself. In that case put both containers on a shared Docker network
> and use `reverse_proxy aftr-web:80` instead (and the host port mapping becomes
> optional).

Reload Caddy (`docker exec <caddy-container> caddy reload --config /etc/caddy/Caddyfile`
or `sudo systemctl reload caddy`). Caddy will fetch Let's Encrypt certificates automatically.

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
