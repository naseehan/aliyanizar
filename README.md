# Aliya Nizar Studio

Portfolio and online shop for Dubai-based artist and interior designer Aliya Nizar.

- **Frontend:** React 19, Vite, Tailwind CSS, Redux Toolkit, React Router, GSAP
- **Content:** products are loaded from a Strapi CMS (`src/lib/productsApi.js`)
- **API:** Express server in `server/` that sends contact-form emails through Resend

## Getting started

```bash
npm install
npm run dev
```

The contact-form API lives in `server/`:

```bash
cd server
npm install
npm start
```

## Testing

The project has **126 automated tests** across the frontend and the API, with roughly 95% statement coverage on the frontend. They run on every push and pull request through GitHub Actions (`.github/workflows/test.yml`).

| Layer | Tools | What is covered |
| --- | --- | --- |
| State | Vitest | Cart and favourites Redux slices: 5-item limit, localStorage persistence and recovery from corrupted storage |
| Data | Vitest | Strapi response normalisation (v4 and v5 shapes, media URLs, rich-text blocks), fetch errors, URL slug helpers |
| Components | React Testing Library, user-event | Shop search, category filters, add to cart and favourites, cart sidebar and WhatsApp checkout, artwork details, gallery pagination, navigation, contact forms (success, 429 rate limit, server errors) |
| Routing | React Testing Library | Every route in `App.jsx`, the intro loader and the 404 fallback |
| API | Vitest, Supertest | `POST /sendmail`: validation, email content, mail-provider failures, rate limiting, CORS |

```bash
npm test                 # frontend tests
npm run test:watch       # watch mode
npm run test:coverage    # coverage report in coverage/
npm run test:server      # API tests
npm run test:all         # everything
```

Tests sit next to the code they cover (`*.test.js` / `*.test.jsx`). Shared setup and render helpers are in `src/test/`. The Express app is built by `createApp()` in `server/app.js`, which takes the mailer as a parameter, so the API tests never send real emails.
