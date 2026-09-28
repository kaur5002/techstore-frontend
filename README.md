# TechStore

TechStore is a fictional technology storefront built as a compact frontend engineering portfolio project. It demonstrates a complete browse → product detail → bag journey with a real read-only product API. Checkout, payments, authentication, and account data are intentionally outside the demo's scope.

## Features

- Responsive product collection with accessible client-side search
- Server-rendered product details, ratings, prices, and product imagery
- Persistent client-side bag with quantity controls, removal, duplicate handling, and subtotal
- Loading, API error, missing product, no-results, and empty-bag states
- Semantic HTML, keyboard-operable controls, visible focus, reduced-motion support, and meaningful image text
- Vitest and React Testing Library behavior tests; GitHub Actions CI

## Stack and architecture

Next.js App Router and React provide server components for the catalog and product route, with client components limited to search and interactive cart/purchase controls. TypeScript runs in strict mode. Tailwind CSS v4 is configured; the compact bespoke visual system is authored in `app/globals.css` to keep styles deliberate and dependency-light. Vitest and React Testing Library cover user-visible behavior.

The product route and collection use the REST abstraction in `lib/api.ts` → Fake Store API. `NEXT_PUBLIC_PRODUCTS_API_URL` can change the API origin. API data is checked before it reaches typed UI. The shared cart context owns cart operations and persists data in browser local storage. Its versioned key and defensive parse protect against stale or malformed saved state.

```text
App Router pages (server rendered)
  ├── reusable product, state, and navigation components
  ├── lib/api.ts → Fake Store API REST endpoints
  └── client interaction islands → search and CartProvider
```

## Accessibility

Pages use semantic landmarks, headings, links, and buttons; search and quantity controls have programmatic labels; image alternatives describe the product (decorative cart thumbnails are hidden from assistive technology). Quantity buttons expose their action and disabled boundary, cart feedback uses a live status, and keyboard focus is visible. Motion is reduced when the user requests it. The palette and focus ring were chosen for readable contrast, though this demo has not been through a formal WCAG audit.

## Performance and compatibility

Catalog and product data are fetched on the server and revalidated every five minutes. Only the search and cart interactions hydrate. Product images reserve layout space through fixed aspect regions and Next Image dimensions; external API images are unoptimized to avoid requiring a fixed remote host allowlist. The first two catalog images are prioritized and the remaining images use the browser's lazy loading. CSS is responsive from 320px and includes reduced-motion handling. These are implementation decisions, not measured Core Web Vitals claims. No Lighthouse run was performed.

The app uses standard links, buttons, local storage, CSS grid, and broadly supported responsive styles for current Chrome, Safari, Firefox, and Edge. The catalog depends on an internet connection to Fake Store API.

## Tests and CI

Tests exercise product card content and details navigation, selecting a quantity and adding to the bag, cart quantity/subtotal/removal, and the empty bag state. They use accessible role and label queries instead of snapshots. GitHub Actions runs on pull requests and pushes to `main`: dependency install, ESLint, TypeScript, Vitest, and production build.

## Run locally

Requires Node.js 22 and npm.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. To configure the API, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_PRODUCTS_API_URL`.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

## Project limitations

This is a fictional portfolio/demo application. It has no checkout, payment processing, authentication, database, or backend of its own. The public product API and its catalog are third-party services and availability is not controlled by this project.
