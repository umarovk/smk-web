# SMK Web

Website profil sekolah berbasis Next.js App Router + Sanity CMS.

## System Requirements

- OS: Windows 10/11, macOS, atau Linux
- Node.js: 20.x atau lebih baru (LTS disarankan)
- npm: 10.x atau lebih baru
- Git: versi terbaru
- Sanity project aktif (project ID + dataset)

## Instalasi Lokal

1) Clone repository

```bash
git clone <repo-url>
cd smk-web
```

1) Install dependencies

```bash
npm install
```

1) Buat file env

```bash
cp .env.example .env.local
```

Untuk PowerShell:

```powershell
Copy-Item .env.example .env.local
```

1) Isi `.env.local`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-08
SANITY_API_WRITE_TOKEN=your_write_token
SANITY_REVALIDATE_SECRET=your_random_secret
```

1) Jalankan development server

```bash
npm run dev
```

- App: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## Scripts

- `npm run dev` - jalankan mode development
- `npm run build` - build production
- `npm run start` - jalankan hasil build
- `npm run lint` - cek lint

## Tutorial Deploy

### Opsi A: Deploy ke Vercel (paling mudah)

1) Push project ke GitHub/GitLab/Bitbucket.
2) Login ke Vercel, klik **Add New Project**.
3) Import repository `smk-web`.
4) Set Environment Variables di Vercel:
   - `NEXT_PUBLIC_SITE_URL=https://domain-kamu.com`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=...`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `NEXT_PUBLIC_SANITY_API_VERSION=2026-03-08`
   - `SANITY_API_WRITE_TOKEN=...`
   - `SANITY_REVALIDATE_SECRET=...`
5) Klik **Deploy**.
6) Setelah live, cek:
   - `https://domain-kamu.com`
   - `https://domain-kamu.com/studio`

### Opsi B: Deploy ke Ubuntu Server (VPS)

Bagian ini cocok jika kamu host sendiri di VPS Ubuntu.

#### 1) Persiapan sistem yang wajib

- Ubuntu Server 22.04/24.04 LTS
- Akses sudo user non-root
- Domain aktif (A record ke IP server)
- Port terbuka: `22` (SSH), `80` (HTTP), `443` (HTTPS)
- Git terbaru
- Node.js `20.x` LTS + npm
- PM2 (process manager)
- Nginx (reverse proxy)
- Certbot + plugin Nginx (SSL Let's Encrypt)

#### 2) Install dependency di Ubuntu

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl nginx ufw
```

Install Node.js 20 LTS (NodeSource):

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

Install PM2:

```bash
sudo npm i -g pm2
```

#### 3) Deploy aplikasi

```bash
cd /var/www
sudo mkdir -p smk-web
sudo chown -R $USER:$USER smk-web
cd smk-web
git clone <repo-url> .
npm install
```

Buat file env production:

```bash
cp .env.example .env.local
nano .env.local
```

Isi minimal:

```env
NEXT_PUBLIC_SITE_URL=https://domain-kamu.com
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-08
SANITY_API_WRITE_TOKEN=your_write_token
SANITY_REVALIDATE_SECRET=your_random_secret
```

Build dan jalankan pakai PM2:

```bash
npm run build
pm2 start npm --name smk-web -- start
pm2 save
pm2 startup
```

#### 4) Setup Nginx reverse proxy

Buat config:

```bash
sudo nano /etc/nginx/sites-available/smk-web
```

Isi:

```nginx
server {
    listen 80;
    server_name domain-kamu.com www.domain-kamu.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan site:

```bash
sudo ln -s /etc/nginx/sites-available/smk-web /etc/nginx/sites-enabled/smk-web
sudo nginx -t
sudo systemctl reload nginx
```

#### 5) Aktifkan SSL (HTTPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domain-kamu.com -d www.domain-kamu.com
```

#### 6) Setup firewall (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

#### 7) Checklist verifikasi setelah deploy

- `pm2 status` -> proses `smk-web` online
- `sudo systemctl status nginx` -> active (running)
- Buka `https://domain-kamu.com` -> website tampil normal
- Buka `https://domain-kamu.com/studio` -> Sanity Studio bisa diakses
- Coba update konten di Sanity -> konten berubah di web (via cache/webhook)

## Setup Webhook Sanity (realtime update cache)

Tanpa webhook, konten tetap update tapi menunggu cache revalidate periodik.  
Dengan webhook, update dari Sanity bisa muncul lebih cepat.

1) Buka Sanity Manage -> Project -> API -> Webhooks.
1) Create webhook:
   - Method: `POST`
   - URL: `https://domain-kamu.com/api/revalidate?secret=SANITY_REVALIDATE_SECRET`
   - Trigger: Create, Update, Delete
1) Filter (opsional):

```groq
_type in [
  "homepageSettings",
  "profileSettings",
  "tahfidzSettings",
  "spmbSettings",
  "seoSettings",
  "navbarSettings",
  "footerSettings",
  "article",
  "concentration"
]
```

1) Payload:

```json
{
  "_type": _type,
  "slug": slug.current
}
```

## Notes

- Pastikan `NEXT_PUBLIC_SITE_URL` selalu sesuai domain production.
- Setiap ubah env di hosting, lakukan redeploy.
- Jangan commit file `.env.local` ke repository.
