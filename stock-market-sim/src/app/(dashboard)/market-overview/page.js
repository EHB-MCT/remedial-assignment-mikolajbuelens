"use client";
import { useState, useEffect } from "react";
import PriceChart from "@/app/components/priceChart";
import styles from "@/app/styles/layouts/marketOverview.module.css";
import PeriodPicker from "@/app/components/PeriodPicker";
import { getTimeLabels, splitTimeString } from "@/app/utils/timeUtils";
import CompanyCard from "@/app/components/companyCard";
import { fetchData } from "@/app/services/apiCalls";
import usePriceHistory from "@/app/hooks/usePriceHistory";
import Image from "next/image";

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
  console.warn("selections", selectedPeriod, selectedCompany);
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

  const profitLoss = (
    chartPriceData[chartPriceData.length - 1] - chartPriceData[0]
  ).toFixed(2);
  const percentageChange = ((profitLoss / chartPriceData[0]) * 100).toFixed(2);

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
      <div className="flexRow">
        {!isNaN(profitLoss) ? (
          <>
            <h3>
              {selectedCompany.name}{" "}
              <span style={{ color: profitLoss > 0 ? "green" : "red" }}>
                {profitLoss} ({percentageChange}%)
              </span>
            </h3>

            <Image
              style={{ alignSelf: "bottom", marginTop: "15px" }}
              src={
                profitLoss > 0
                  ? "/svg/icons/profitIcon.svg"
                  : "/svg/icons/lossIcon.svg"
              }
              alt="Change Icon"
              width={26}
              height={26}
            />
          </>
        ) : (
          <h3>No Company Selected</h3>
        )}
      </div>

      {/* <div className={styles.profit}> */}
      {console.log("Chart Price Data:", chartPriceData)}
      <PriceChart
        labels={chartLabels}
        dataPoints={chartPriceData}
        profit={profitLoss}
      />
    </div>
  );
}
