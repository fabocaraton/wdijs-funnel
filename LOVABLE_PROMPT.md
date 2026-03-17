# Build this for Lovable

## Project Identity
**WDIJS Funnel** — A single-product book sales funnel for "What Did I Just Sign?" by Charles Stewart III. This is a conversion-optimized VSL funnel that sells digital and physical book bundles to athletes, entertainers, entrepreneurs, and professionals.

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS (custom color tokens, zero custom CSS)
- Shadcn/ui (button, input, label, card, badge)
- Supabase (PostgreSQL with RLS, anonymous inserts)
- Stripe Hosted Checkout via Payment Links

## Design Direction

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| royal-900 | #0D1147 | Page body, deepest background |
| royal-700 | #1A237E | Section alternates, card fills |
| royal-600 | #283593 | Subtle section differentiation |
| royal-500 | #3949AB | Hover states |
| royal-300 | #7986CB | Muted text, fine print |
| crimson | #B71C1C | All CTAs, buttons, price callouts |
| crimson-400 | #D32F2F | Button hover |
| crimson-700 | #8B0000 | Button active/press |
| ivory | #FAFAFA | Primary text, headlines |
| lavender | #C5CAE9 | Subheadlines, descriptions |

### Typography
- **Headlines**: Fraunces (Google Fonts), weights 700/800/900, serif
- **Body/UI**: Satoshi (Fontshare), weights 400/500/600/700, sans-serif
- font-serif = Fraunces (headlines, prices, section labels)
- font-sans = Satoshi (body, descriptions, buttons, inputs)

### Component Patterns
- Card: `rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8`
- Card hover: `hover:border-crimson/15 hover:bg-crimson/[0.03]`
- CTA primary: `bg-crimson text-white font-sans font-bold rounded-xl px-8 py-4 shadow-lg shadow-crimson/20`
- CTA secondary: `border border-white/10 text-lavender font-sans font-medium rounded-xl px-6 py-3`
- Section: `py-24 px-6 md:px-16`
- Animation: Fade-in from below, opacity 0->1, translateY 24->0px, 700ms ease-out

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | VSLPage | Main sales page — hero, video, problem, quiz, offer stack, testimonials, FAQ, final CTA |
| `/checkout` | CheckoutPage | Order form, bump toggle, Stripe redirect |
| `/thank-you` | ThankYouPage | Post-purchase delivery, downloads, upsell |
| `/workbook` | WorkbookPage | Standalone workbook sales page |

## VSL Page Sections (in order)
1. **HeroSection** — A/B tested headline, subheadline, CTA, trust stats strip
2. **VSLVideoSection** — YouTube embed (rel=0, modestbranding=1)
3. **ProblemSection** — 3 pain point cards with icons
4. **RiskSnapshotSection** — 3 yes/no questions, dynamic result with CTA
5. **OfferStackSection** — Hormozi value stack, $37 primary, $127 secondary
6. **TestimonialsSection** — 6 metric-first testimonial cards
7. **FAQSection** — 8-item custom accordion
8. **FinalCTASection** — Urgency close with radial glow
9. **StickyCTA** — Fixed bottom bar, label evolves with scroll depth
10. **ExitIntentModal** — Free chapter offer, email capture
11. **Footer** — Compliance disclosure (FINRA/SIPC required)

## Supabase Tables

### lead_captures
- id: UUID (PK)
- first_name: TEXT
- email: TEXT (NOT NULL, UNIQUE INDEX)
- source: TEXT ('exit-intent' | 'inline' | 'footer' | 'checkout')
- created_at: TIMESTAMPTZ

### orders
- id: UUID (PK)
- email: TEXT (NOT NULL)
- first_name: TEXT (NOT NULL)
- last_name: TEXT
- stripe_session_id: TEXT
- offer_type: TEXT ('digital-starter' | 'complete-package' | 'workbook-digital' | 'physical-bump-upgrade')
- includes_bump: BOOLEAN
- total_amount: DECIMAL(10,2)
- status: TEXT ('pending' | 'completed' | 'abandoned' | 'refunded')
- abandoned_at: TIMESTAMPTZ
- created_at: TIMESTAMPTZ

### abandoned_checkouts
- id: UUID (PK)
- email: TEXT (NOT NULL)
- first_name: TEXT
- checkout_step: TEXT ('email' | 'bump' | 'payment')
- offer_type: TEXT
- recovery_email_sent: BOOLEAN
- recovered_at: TIMESTAMPTZ
- created_at: TIMESTAMPTZ

### analytics_events
- id: UUID (PK)
- session_id: TEXT (NOT NULL, INDEXED)
- event_name: TEXT (NOT NULL, INDEXED)
- properties: JSONB
- page_url: TEXT
- created_at: TIMESTAMPTZ

### micro_responses
- id: UUID (PK)
- session_id: TEXT (NOT NULL)
- question_id: TEXT (NOT NULL)
- answer: TEXT (NOT NULL)
- created_at: TIMESTAMPTZ

### risk_snapshots
- id: UUID (PK)
- session_id: TEXT (NOT NULL)
- score: INTEGER (NOT NULL)
- answers: JSONB (NOT NULL)
- created_at: TIMESTAMPTZ

All tables: RLS enabled, anonymous insert policies.

## Component Inventory

| File | Description |
|------|-------------|
| FadeIn.tsx | Scroll-triggered fade-in animation wrapper |
| HeroSection.tsx | A/B tested headline, subheadline, CTA, trust stats |
| VSLVideoSection.tsx | YouTube embed with analytics |
| ProblemSection.tsx | 3 pain point cards |
| RiskSnapshotSection.tsx | Interactive 3-question risk quiz |
| OfferStackSection.tsx | Hormozi value stack with pricing |
| TestimonialsSection.tsx | 6 metric-first testimonial cards |
| FAQSection.tsx | 8-item custom accordion |
| FinalCTASection.tsx | Urgency close section |
| StickyCTA.tsx | Fixed bottom CTA bar evolving with scroll |
| ExitIntentModal.tsx | Exit-intent email capture modal |
| OrderBumpCard.tsx | Physical hardcover add-on toggle |
| PostPurchaseUpsell.tsx | Upgrade card for thank-you page |
| Footer.tsx | Compliance footer (required on all pages) |

## Custom Hooks

| Hook | Purpose |
|------|---------|
| useInView | IntersectionObserver, returns {ref, isVisible} |
| useScrollPosition | Tracks scrollY and scroll percentage |
| useFormSubmit | Generic Supabase form submission |
| useExitIntent | Detects mouse leaving viewport |

## Animation Specs
- Trigger: IntersectionObserver at 15% threshold
- Effect: opacity 0->1, translateY 24px->0
- Duration: 700ms ease-out
- Staggered delays: index * 60-120ms

## Environment Variables
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_STRIPE_PUBLISHABLE_KEY
VITE_STRIPE_LINK_DIGITAL
VITE_STRIPE_LINK_DIGITAL_BUMP
VITE_STRIPE_LINK_COMPLETE
VITE_STRIPE_LINK_WORKBOOK
VITE_STRIPE_LINK_UPGRADE
VITE_VSL_YOUTUBE_VIDEO_ID
VITE_POSTHOG_KEY
```

**This is the complete specification. Build this for Lovable.**
