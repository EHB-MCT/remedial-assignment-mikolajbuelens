# Changelog

All notable changes to this project will be documented in this file (most often when merging a feature branch to develop).
<br> This document adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 05-08-2025

### Added

- Initial project setup with Next.js without the default boilerplate files
- Initial project folders/routes with `.gitkeep` where applicable
- Initial `README.md` and progress docs
- Initial `CHANGELOG.md`, `LICENSE`, `CONTRIBUTING.md`, and `CODE_OF_CONDUCT.md` files

## [0.2.0] - 10-08-2025

### Added

- Chart.js and react-chartjs-2 libraries for data visualization
- Initial StockChart component with dummy data as well as additional UI components:
  - PeriodPicker for selecting time ranges
  - Button component for applying selected time ranges
- CSS Modules for component-scoped styles
- Reset.css and variables.css for global styles
- Utility function for getting recent dates/hours
- Jest installed + Jest tests for the utility function with initial test cases

### Changed

- Restructured CSS files into components/ and layouts/ folders
- Moved CSS variables from `variables.css` to `globals.css` for clarity and to avoid confusion with CSS Modules' scoping behavior

## [0.3.0] - 11-08-2025

### Added

- Supabase as the backend database
- `supabase.js` file for initializing the Supabase client
- `services/apiCalls.js` file for handling API calls to the Supabase database
- API route for companies in `src/app/api/companies/route.js`
- `.env.example` file for environment variables needed for Supabase

## [1.0.0] - 12-08-2025

### Added

- Initial implementation of company list fetching from Supabase
- CompanyCard component for displaying individual company information, implemented on the MarketOverview page
- Basic styling for company cards and market overview layout
- Add fetchData service function for making client-side API calls to Supabase
- Add images in public/img/stocks/ for each company logo

### changed

- Replace dummy data from CompanyCard component
- Update env to switch between development and production URL's

## [1.1.0] - 14-08-2025

### Added

- Created API route for updating stock prices in `src/app/api/update-price/route.js`
- Implemented `updateStockPrices` function in `utils/priceUtils.js` to simulate market price fluctuations based on random generated volatility

### Changes

- Allow for bulk updates of stock prices with the updateData service function to Supabase with upsert (`src/app/services/apiCalls.js`)
