// utils/portfolio.js

const STORAGE_KEY = "stockPortfolio";

export function getPortfolio() {
  if (typeof localStorage === "undefined") {
    throw new Error("localStorage is not available in this environment.");
  }
  const data = localStorage.getItem("portfolio");
  if (!data) {
    const initial = { balance: 1000, stocks: {} }; // default starting balance
    localStorage.setItem("portfolio", JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
}

export function savePortfolio(portfolio) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
}
