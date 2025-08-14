export function updateStockPrice(price) {
  const stockPrice = price;
  // Simulate volatility => 5% swing will be rare, 1% swings will be more common
  const volatility = Math.random() < 0.1 ? 0.05 : 0.01;
  const change = (Math.random() * volatility * 2 - volatility) * stockPrice;
  const newPrice = parseFloat((stockPrice + change).toFixed(2));
  return newPrice;
}
