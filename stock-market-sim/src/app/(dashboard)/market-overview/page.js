import PriceChart from "@/app/components/priceChart";
import styles from "@/app/styles/layouts/marketOverview.module.css";

export default function MarketOverview() {
  const profit = 10; // Example profit value
  return (
    <div>
      <h1>Market Overview</h1>
      <PriceChart
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
        dataPoints={[100, 105, 102, 110, 108, 115, 120]}
      />
    </div>
  );
}
