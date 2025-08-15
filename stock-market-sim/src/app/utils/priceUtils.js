/**
 * Updates the stock price based on market volatility.
 * @param {*} price - The current stock price.
 * @returns The updated stock price with volatility applied.
 */
export function updateStockPrice(price) {
  const volatility = 0.001; // 0.1% max change
  const maxChange = 0.5; // max $0.50 change per tick

  const change = Math.max(
    -maxChange,
    Math.min(maxChange, (Math.random() * volatility * 2 - volatility) * price)
  );
  const newPrice = parseFloat((price + change).toFixed(2));
  return newPrice;
}
