# lowkeykaushiki

A warm, minimal personal blogging site built with Next.js. The public site is open to everyone, while `/admin` is protected by a simple owner login for creating, editing, publishing, unpublishing, and deleting posts.

## Stack

- Next.js App Router
- Tailwind CSS
- MongoDB Atlas for blog posts
- Resend for contact form email delivery
- Tiptap rich text editor in the admin post form
- Env-based admin login with signed HTTP-only session cookies
- Optional Instagram footer link via `NEXT_PUBLIC_INSTAGRAM_URL`

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Without `MONGODB_URI`, the public blog shows demo posts so the design can be previewed immediately. Admin CRUD requires MongoDB because it writes real posts.

## Environment variables

```bash
MONGODB_URI=
MONGODB_DB=lowkeykaushiki
MONGODB_COLLECTION=posts

ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-before-deploy
SESSION_SECRET=replace-with-a-long-random-string

RESEND_API_KEY=
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=lowkeykaushiki <onboarding@resend.dev>
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/lowkeykaushikey
```

For production, use a strong `ADMIN_PASSWORD` and a long random `SESSION_SECRET`.

## Suggested free deployment

1. Push this project to GitHub.
2. Create a free MongoDB Atlas M0 cluster and copy the connection string into `MONGODB_URI`.
3. Create a Resend API key and add the email variables.
4. Import the GitHub repo into Vercel Hobby and add all environment variables.
5. Deploy.

## Email setup

1. Create a Resend account and verify your sender domain, or use the onboarding sender while testing.
2. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to `.env.local` and Vercel.
3. Keep `CONTACT_FROM_EMAIL` as a verified sender or the Resend onboarding sender.
4. Send a test message from the contact form and confirm it lands in your inbox.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
