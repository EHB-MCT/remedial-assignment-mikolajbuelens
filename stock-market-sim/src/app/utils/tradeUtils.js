export function getPortfolio() {
  if (typeof window === "undefined") {
    return { balance: 0, stocks: {} };
  }
  const data = localStorage.getItem("portfolio");
  if (!data) {
    const initial = { balance: 1000, stocks: {} };
    localStorage.setItem("portfolio", JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
}
