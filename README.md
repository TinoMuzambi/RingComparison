# Ring Ledger

Ring Ledger is a transparent comparison of South African engagement-ring and
wedding-band quotes. It keeps the details that disappear in a price-only list—
diamond grading, metal, warranty, lead time, payment terms, retailer ratings and
the original reference media—together in one searchable ledger.

[View the live application](https://comparison-psi.vercel.app)

## Why this project exists

Ring quotes are difficult to compare because each retailer presents a different
combination of materials, services and terms. Ring Ledger turns a personal
research snapshot into a consistent decision-support interface. It is not a
store, affiliate site or source of financial advice.

The dataset was last updated in December 2025. Prices, reviews, availability and
retailer terms can change; always verify them with the linked retailer before
making a purchase.

## Highlights

- Server-rendered filtering, full-field search and deterministic sorting
- Separate engagement-ring and wedding-band datasets
- GIA-aware colour and clarity ordering, including mixed grades in the source
- Responsive quote cards with progressively disclosed warranty and payment data
- Lazy images and opt-in video loading to avoid downloading the 16 MB media set
  on initial page load
- URL-addressable filters that work without client-side JavaScript
- Strict query validation, security headers, metadata, robots and sitemap
- Automated unit, lint, type and production-build checks

## Local development

The supported runtimes are Node.js 20.19+, 22.13+ and 24+. CI and Vercel use
Node.js 24.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Run the complete suite with `npm run check`.

## Data and media

The repository-owned snapshots live in `data/rings.json` and
`data/wedding-bands.json`. Reference photos and videos live in `public/media`.
Every referenced filename is present in the repository. Source records and media
are intentionally kept intact; the interface treats missing optional fields as
“Not provided” rather than inventing values.

To add a quote, follow the existing JSON shape and use one of the supported media
types (`photo`, `video` or `null`). Then run the quality checks before publishing.

## Architecture

- Next.js App Router and React server components
- TypeScript with strict checking
- Plain CSS with no runtime styling dependency
- Vitest for query, filtering and sorting behavior
- Vercel deployment through the `comparison` project
