# Development V - Remedial assignment - 📈Stock Market Simulation📉

## Overview 📜

This project was created as part of the "Development V course assignment @EHB.

## Project Structure 📂

```plaintext
stock-market-sim/
├── src/
│   └── app/
│       ├── _lib/
│       ├── (dashboard)/
│       ├── (stocks)/
│       ├── api/
│       │   ├── companies/
│       │   ├── price-history/
│       │   └── update-price/
│       ├── components/
│       ├── services/
│       ├── styles/
│       │   ├── components/
│       │   ├── layouts/
│       │   ├── reset.css
│       │   └── globals.css
│       ├── hooks/
│       ├── seeders/
│       └── utils/
├── __tests__/
├── docs/
│   └── progress.md
├── README.md
├── CHANGELOG.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── .gitignore
├── package.json
├── jest.config.js
└── next.config.js
```

## Branches 🪵

#### High-Level Overview of current branches

- main
- develop
- feat/setup-nextjs -> initial setup for Next.js
- feat/chart-ui -> implemented chart UI components
- feat/db-connection -> established Supabase database connection
- feat/company-list -> created company list view with a company card component
- feat/price-simulation -> added price simulation logic (creating/updating simulated prices)
- feat/price-display -> Displayed prices from DB in chart and cards

## API Endpoints 🔌

| Method | Endpoint           | Description                                                                 |
| ------ | ------------------ | --------------------------------------------------------------------------- |
| GET    | /api/companies     | Fetch all companies.                                                        |
| POST   | /api/update-price  | Insert/update stock prices for all available companies.                     |
| GET    | /api/price-history | Fetch the latest stock prices for all companies. Price + timestamp history. |

## Sources 📚

### Documentation

- [Next.js Documentation](https://nextjs.org/docs), more specifically:
  - [How to use Jest with Next.js](https://nextjs.org/docs/app/guides/testing/jest#creating-your-first-test)
- [Supabase Documentation](https://supabase.com/docs) more specifically:

  - [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
  - [Supabase connection](https://supabase.com/docs/guides/database/connecting-to-postgres)

  ### Articles - Forms -AI

- [ChatGPT - Help with adding gradient background to line chart](https://chatgpt.com/share/6893cec2-9e0c-8008-a9e5-8a778157a7d1)
- [Piccalil blog - Reset.css](https://piccalil.li/blog/a-more-modern-css-reset/?trk=article-ssr-frontend-pulse_x-social-details_comments-action_comment-text)
- [Github discussion - Fixing syntax error: Selector ":root" is not pure (pure selectors must contain at least one local class or id)](https://github.com/vercel/next.js/discussions/17089)
- [Stack Overflow - How to update a Supabase table in bulk to reduce the number of requests](https://stackoverflow.com/questions/74483857/update-multiple-rows-in-a-single-query-in-a-supabase-database-postgres)
