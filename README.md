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

2) Install dependencies

```bash
npm install
```

3) Buat file env

```bash
cp .env.example .env.local
```

Untuk PowerShell:

```powershell
Copy-Item .env.example .env.local
```

4) Isi `.env.local`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-08
SANITY_API_WRITE_TOKEN=your_write_token
SANITY_REVALIDATE_SECRET=your_random_secret
```

5) Jalankan development server

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

### Opsi B: Deploy ke VPS (Node.js server)

1) Install Node.js 20+ di server.
2) Clone repo di server.
3) Buat `.env.local` (isi sama seperti production).
4) Install dependency:

```bash
npm install
```

5) Build:

```bash
npm run build
```

6) Jalankan app:

```bash
npm run start
```

7) (Disarankan) pakai PM2 agar auto-restart:

```bash
npm i -g pm2
pm2 start npm --name smk-web -- start
pm2 save
```

8) Pasang reverse proxy Nginx ke port app (default 3000) + SSL.

## Setup Webhook Sanity (realtime update cache)

Tanpa webhook, konten tetap update tapi menunggu cache revalidate periodik.  
Dengan webhook, update dari Sanity bisa muncul lebih cepat.

1) Buka Sanity Manage -> Project -> API -> Webhooks.
2) Create webhook:
   - Method: `POST`
   - URL: `https://domain-kamu.com/api/revalidate?secret=SANITY_REVALIDATE_SECRET`
   - Trigger: Create, Update, Delete
3) Filter (opsional):

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

4) Payload:

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
