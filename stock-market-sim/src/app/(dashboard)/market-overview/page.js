"use client";

import { useState } from "react";

import PriceChart from "@/app/components/priceChart";
import styles from "@/app/styles/layouts/marketOverview.module.css";
import PeriodPicker from "@/app/components/PeriodPicker";
import { getTimeLabels, splitTimeString } from "@/app/utils/timeUtils";
import CompanyCard from "@/app/components/companyCard";

export default function MarketOverview() {
  const profit = 10; // Example profit value
  const [timeLabels, setTimeLabels] = useState(getTimeLabels(7, "D")); // Default to last 7 days

  // const timeLabels = getTimeLabels(7, "D"); // Get labels for the last 7 days
  // console.log("Time Labels:", timeLabels);
  return (
    <div>
      <h1>Market Overview</h1>
      {/* TODO: replace with db data */}
      <CompanyCard
        company={{
          logo: "/img/stocks/apple-logo.png",
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 150.32,
          change: "+1.23%",
          sector: "Technology",
        }}
      />
      <PeriodPicker
        onPeriodChange={(period) => {
          const { unit, duration } = splitTimeString(period);
          console.log(
            "Selected Period:",
            period,
            "Unit:",
            unit,
            "Duration:",
            duration
          );
          console.log("Time Labels:", timeLabels);
          setTimeLabels(getTimeLabels(duration, unit));
        }}
      />
      {/* <div className={styles.profit}> */}
      <PriceChart
        labels={timeLabels}
        dataPoints={[100, 105, 102, 110, 108, 115, 120]}
      />
    </div>
  );
}
