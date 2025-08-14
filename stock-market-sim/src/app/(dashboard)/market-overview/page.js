"use client";
import { useState, useEffect } from "react";
import PriceChart from "@/app/components/priceChart";
import styles from "@/app/styles/layouts/marketOverview.module.css";
import PeriodPicker from "@/app/components/PeriodPicker";
import { getTimeLabels, splitTimeString } from "@/app/utils/timeUtils";
import CompanyCard from "@/app/components/companyCard";
import { fetchData } from "@/app/services/apiCalls";
import usePriceHistory from "@/app/hooks/usePriceHistory";

export default function MarketOverview() {
  const profit = 10; // Example profit value
  const [timeLabels, setTimeLabels] = useState(getTimeLabels(7, "D")); // Default to last 7 days
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("NVIDIA Corporation");
  // const [chartPriceData, setChartPriceData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("1D");

  useEffect(() => {
    async function fetchCompanies() {
      const data = await fetchData("companies");
      setCompanies(data);
    }
    fetchCompanies();
  }, []);

  console.log("Fetched Companies:", companies);
  console.log("Selected Company:", selectedCompany);
  const { chartPriceData, chartLabels } = usePriceHistory(
    selectedCompany,
    selectedPeriod
  );

  // useEffect(() => {
  //   async function fetchPriceHistory() {
  //     if (!selectedCompany) return;

  //     const data = await fetchData(
  //       `price-history?companyId=${selectedCompany.id}&period=1D`
  //     );

  //     // Sort data by timestamp just in case
  //     const sortedData = data.sort(
  //       (a, b) => new Date(a.created_at) - new Date(b.created_at)
  //     );

  //     // Extract prices and corresponding labels
  //     const prices = sortedData.map((obj) => obj.price);
  //     const labels = sortedData.map((obj) =>
  //       new Date(obj.created_at).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     );

  //     setChartPriceData(prices);
  //     setTimeLabels(labels); // <-- now your labels match timestamps exactly
  //   }

  //   fetchPriceHistory();
  // }, [selectedCompany]);

  // const timeLabels = getTimeLabels(7, "D"); // Get labels for the last 7 days
  // console.log("Time Labels:", timeLabels);
  return (
    <div>
      <h1>Market Overview</h1>
      <div className={styles.companyList}>
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard
              key={company.stock_symbol}
              company={{
                id: company.id,
                logo: company.stock_symbol.toLowerCase() + ".png",
                symbol: company.stock_symbol,
                name: company.name,
                price: company.latest_price,
                change: "+1.23%", //TODO: Calculate actual change
                selected: selectedCompany.name === company.name,
              }}
              setSelectedCompany={setSelectedCompany}
            />
          ))
        ) : (
          <p>No companies available</p>
        )}
      </div>

      {/* <CompanyCard
        company={{
          logo: "/img/stocks/apple-logo.png",
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 150.32,
          change: "+1.23%",
          sector: "Technology",
        }}
      /> */}
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
          // setTimeLabels(getTimeLabels(duration, unit));
          setSelectedPeriod(period);
        }}
        selectedPeriod={selectedPeriod}
      />
      <h3>{selectedCompany.name}</h3>

      {/* <div className={styles.profit}> */}
      {console.log("Chart Price Data:", chartPriceData)}
      <PriceChart labels={chartLabels} dataPoints={chartPriceData} />
    </div>
  );
}
