"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Filler
);

export default function StockChart({ labels, dataPoints }) {
  const chartRef = useRef(null);
  const profit = 10; // Placeholder profit value, will be replaced with actual data
  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "rgba(117, 250, 157, 0.6)"); // top color
    gradient.addColorStop(1, "rgba(117, 250, 157, 0.05)"); // bottom color
    return gradient;
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: dataPoints,
        fill: true,
        borderColor:
          profit > 0 ? "rgba(117, 250, 157, 0.5)" : "rgba(250, 117, 157)",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null; // wait until chart is fully initialized before accessing chartArea
          }
          return getGradient(ctx, chartArea);
        },
        // tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "#1e293b20" },
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
}
