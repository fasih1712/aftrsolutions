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
