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

## 07-08-2025

- Added utility function to get recent dates/hours in `src/app/utils/timeUtils.js`, since I plan to use this for multiple components (General stock chart, portfolio chart, etc.)
- Implemented Jest tests for the utility function in `__tests__/timeUtils.test.js` with the help of the Next.js documentation -> I considered other testing libraries but Jest seems to be the most widely used and well-supported for Next.js projects as well as the industry standard for React applications.
- Fixed issues found during testing, including handling of invalid time ranges
- Executed a **git rebase (squash)** to clean up the 4 commits for timeUtils (initial feature, Jest installation, tests, fixes) into a single commit for clarity. I did have some issues, caused by some rookie mistakes (not force pushing, saving changes during the rebase causing conflicts), though nothing that I couldn't resolve with a second rebase.

<p style="margin-left: 2em;">
  <img src="./screenshots/rebase.png" alt="Git Rebase Window" width="600" border="1" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
</p>

<small style="margin-left: 2em;">Using the rebase command opened a Gitlens window (locally installed extension) but I opted to use the text editor instead to get a better feel for the default process.</small>
