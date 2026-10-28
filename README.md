# Bank of America Online Banking

A commercial banking web application inspired by Bank of America's visual language and official brand aesthetic.

---

## 1. Vercel Deployment Instructions

The application is configured for direct 1-step deployment on Vercel:

### Option A: Deploy via Vercel Dashboard / Git Repository
1. Push this project folder to your GitHub, GitLab, or Bitbucket repository.
2. In the [Vercel Dashboard](https://vercel.com/new), select **"Add New Project"** and import the repository.
3. Vercel will automatically detect the configuration from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**. Your site will build and be live immediately.

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow the quick prompts and your deployment will be provisioned directly.

---

## 2. Vercel Configuration Highlights (`vercel.json`)

- **Single Page App Routing**: All client routes (`/(.*)`) automatically rewrite to `/index.html`, eliminating 404 errors on page reloads.
- **Cache Optimization**: Assets in `/assets/` have immutable long-term caching headers (`max-age=31536000`).
- **Zero Server-Side Baggage**: Clean static asset output generated into `/dist` via `vite build`.

---

## 3. Local Development

```bash
# Install dependencies
npm install

# Start local development server (Port 3000)
npm run dev

# Test production build
npm run build
```

---

## 4. Demonstration Credentials

- **Username**: `Michaelbaumann10`
- **Password**: `Password123!` *(or `Baumann2026!`)*

> Note: The login inputs start empty on initial page load. Entering the correct credentials triggers a 2-second authentication loading modal before redirecting to the account dashboard. Entering incorrect credentials immediately shows an error banner.

---

## 5. Profile Image Customization

To replace the profile photo with a custom image:
1. Save your file as:
   ```
   /public/images/profile-placeholder.jpg
   ```
2. The application will load the new photo automatically. If missing, it gracefully falls back to the client monogram avatar (`MB`).

---

## 6. Features & Interactions

- **Accounts & Balances**: Displays liquid checking ($6,224,000), savings ($2,500,000 at 4.85% APY), total available balance ($8,724,000), corporate credit cards, and Merrill Lynch wealth portfolio.
- **Transaction History**: **40 distinct realistic transactions** exclusively dated across **February 2026** and **September 2026**, with category filtering, search, and CSV export.
- **Pay & Transfer**: Clean 2-type interface (ACH and Transfer) with fields for From Account, Account Name, Bank Name, Account Number, Transfer Amount, and Reference.
- **Transaction Restriction Modal**: Attempting to submit any transfer triggers the authentic account restriction dialog.
