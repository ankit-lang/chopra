# Booking & Notifications Integration

This document explains how to set up the booking/email/WhatsApp integration added to the site.

Overview
- Server-side storage: SQLite (data/bookings.db) - suitable for initial deployment.
- Email: Nodemailer (SMTP) - configure SMTP via env.
- WhatsApp: Baileys (QR auth) - store auth files in `data/baileys_auth`.
- API route: `POST /api/booking` accepts `{ idempotencyKey, type, payload }`.

Environment variables
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port (e.g. 587)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `EMAIL_FROM` - From address (optional, default `Chopras <info@chopras.nl>`)
- `NOTIFY_EMAIL` - Where notifications are sent (default info@chopras.nl)
- `NOTIFY_WHATSAPP_NUMBER` - Full international number without plus (e.g. 31630645930)
- `BAILEYS_AUTH_DIR` - optional path to store Baileys auth files (default `data/baileys_auth`)
- `DATABASE_FILE` - optional path to SQLite DB (default `data/bookings.db`)

Install dependencies
Run in project root:
```bash
pnpm add nodemailer @adiwajshing/baileys better-sqlite3
```

Local QR authentication (Baileys)
1. Start the Next.js server: `pnpm dev`.
2. On server startup Baileys may print a QR to the terminal. Scan the QR with the WhatsApp account that will be used to send messages.
3. After successful scan, credentials are stored in `data/baileys_auth` and the socket will reconnect automatically.

Notes to avoid common Baileys issues
- Only a single socket instance is created by the helper (`src/lib/whatsapp.ts`).
- The code saves credentials via `useMultiFileAuthState` and listens for `creds.update`.
- If you see reconnect loops, stop the server, remove `data/baileys_auth`, restart and re-scan.
- In production, prefer a persistent file system or a cloud storage adapter for auth files.

Deployment considerations
- If deploying to serverless or read-only fs (Vercel), file-based auth and SQLite will not persist. Use a VM, Docker container, or external DB and persist auth to an object store.
- Use a dedicated SMTP account and restrict access.
- Ensure `data/` is persisted between restarts (Docker volume, VM disk).

Removing previous integrations and duplicates
Run these commands in the repo to find common webhook/CRM references:
```bash
rg "webhook|zapier|mailgun|sendgrid|postmark|mailchimp|hubspot|crm|automation" || true
rg "/api/.*(webhook|hook)" || true
```
Audit any matches and remove or disable them to ensure only this flow sends notifications.

Testing
- Submit a reservation from the site and check:
  - `data/bookings.db` contains a new booking row
  - Email arrives at `NOTIFY_EMAIL`
  - WhatsApp message arrives at the configured WhatsApp account
  
Local `.env` and Vercel environment variables

- Create a local `.env` file during development (copy `.env.example` to `.env.local`). Example entries:
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
EMAIL_FROM="Chopras <info@chopras.nl>"
NOTIFY_EMAIL=info@chopras.nl
NOTIFY_WHATSAPP_NUMBER=31630645930
BAILEYS_AUTH_DIR=data/baileys_auth
DATA_DIR=data
```

- Important: keep SMTP credentials and WhatsApp auth secrets out of source control. Add `.env.local` to `.gitignore`.

- Vercel (recommended production settings):
  1. Open your project in the Vercel dashboard.
  2. Go to Settings -> Environment Variables.
  3. Add each variable (key and value). For server-only secrets (SMTP, WhatsApp tokens), set them as "Production" and "Preview" but do NOT prefix with `NEXT_PUBLIC_`.
  4. Example keys to add: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `NOTIFY_EMAIL`, `NOTIFY_WHATSAPP_NUMBER`.

- Using the Vercel CLI (interactive):
```bash
vercel login
vercel link   # link project
vercel env add SMTP_HOST production
vercel env add SMTP_PORT production
# follow prompts to enter values
```

- Notes about Baileys and Vercel:
  - Vercel is serverless and its filesystem is ephemeral. `BAILEYS_AUTH_DIR` (file-based credentials) will not persist across server instances. For reliable WhatsApp using Baileys in production, run the Baileys client on a persistent host (VM, Docker container with a volume) or use a cloud storage adapter for the auth state.
  - Alternative: use an external WhatsApp provider (Twilio or WhatsApp Cloud API) that does not require file-based auth.

Support
If you want, I can:
- Move storage to PostgreSQL or Prisma for production
- Add an admin UI to view and retry failed notifications
- Add rate limiting and more robust deduplication
