# Progress Documentation🔬

#### This document tracks the progress made during the project, including recent changes and decisions made during development as well as the rationale behind them.

## 05-08-2025

- Set up folder structure following Next.js App Router best practices including grouping of routes by main features -> [(Next.js Route Grouping and other best practises)](https://nextjs.org/docs/app/getting-started/project-structure#route-groups)
- Created components/, services/, utils/ based on SOLID separation of concerns and Next.js best practices
- Added .gitkeep to keep folders tracked in Git while empty
- Created initial README.md, CHANGELOG.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md and progress.md files
- Decided not to use TypeScript (yet) to keep scope manageable

## 06-08-2025

- Added the chart.js/react-chartjs-2 library to visualize stock prices
- Created a initial StockChart component to display stock prices using Chart.js (currently using dummy data)
- Structured CSS files more logically with component and layout folders and added initial styles with CSS modules to prevent bloated global files
  - Styles that apply to the base layout (all pages) are still kept in `src/app/styles/` such as `globals.css` and the newly added `reset.css` and `variables.css` files
