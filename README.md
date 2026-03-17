# WDIJS Funnel — "What Did I Just Sign?"

A single-product book sales funnel for **"What Did I Just Sign?"** by **Charles Stewart III**. Built for deployment via Lovable.io.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components
- Supabase (PostgreSQL backend)
- Stripe Hosted Checkout (Payment Links)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Fill in your Supabase URL, anon key, Stripe Payment Link URLs, and YouTube video ID.

### 3. Create Supabase tables
Open your Supabase SQL Editor and run the contents of `supabase/schema.sql`.

### 4. Create Stripe Payment Links
In your Stripe Dashboard, create Payment Links for:
- Digital Starter: $37
- Digital + Physical Bump: $77
- Complete Package: $127
- Workbook Digital: $19
- Upgrade (post-purchase): $90

Set each Payment Link's success URL to your domain's `/thank-you` page with appropriate query parameters.

### 5. Push to GitHub
```bash
git init && git add . && git commit -m "Initial WDIJS funnel"
git remote add origin <your-repo-url>
git push -u origin main
```

### 6. Connect to Lovable
1. Open Lovable.io
2. Connect your GitHub repo
3. Connect Supabase in Lovable's integrations panel
4. Paste the contents of `LOVABLE_PROMPT.md` into Lovable's prompt editor
5. Build and deploy

## Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | VSLPage | Main sales page with video, quiz, offer stack |
| `/checkout` | CheckoutPage | Order form with bump toggle, Stripe redirect |
| `/thank-you` | ThankYouPage | Post-purchase delivery and upsell |
| `/workbook` | WorkbookPage | Standalone workbook sales page |

## File Structure

```
src/
  types/index.ts          — All TypeScript interfaces
  lib/utils.ts            — cn() utility
  lib/supabase.ts         — Supabase client
  lib/stripe.ts           — Stripe Payment Link redirect logic
  lib/data.ts             — ALL site content (single source of truth)
  lib/analytics.ts        — Event tracking
  lib/abtest.ts           — A/B test variant assignment
  hooks/                  — useInView, useScrollPosition, useFormSubmit, useExitIntent
  components/             — 14 components (one per file)
  pages/                  — 4 page components
supabase/schema.sql       — 6 tables with RLS
LOVABLE_PROMPT.md         — Initialization prompt for Lovable
```

## Compliance

Every page includes the required FINRA/SIPC compliance disclosure for Pinnacle Investments, LLC affiliation. Do not remove.
