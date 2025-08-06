import PriceChart from "@/app/components/priceChart";

export default function MarketOverview() {
  return (
    <div>
      <h1>Market Overview</h1>
      <PriceChart
        chartData={{
          // TODO: replace with real data from API
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              data: [100, 120, 110, 140, 135],
              fill: false,
              borderColor: "rgba(0, 255, 106, 1)",
            },
          ],
        }}
        chartOptions={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: "Stock Performance" },
          },
          scales: {
            x: {
              type: "category",
              title: { display: true, text: "Days" },
            },
            y: {
              title: { display: true, text: "Price (USD)" },
            },
          },
        }}
      />
    </div>
  );
}
