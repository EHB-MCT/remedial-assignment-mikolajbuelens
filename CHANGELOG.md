# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 05-08-2025

### Added

- Initial project setup with Next.js without the default boilerplate files
- Initial project folders/routes with `.gitkeep` where applicable
- Initial `README.md` and progress docs
- Initial `CHANGELOG.md`, `LICENSE`, `CONTRIBUTING.md`, and `CODE_OF_CONDUCT.md` files

---

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
