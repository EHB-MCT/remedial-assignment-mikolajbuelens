"use client";
import { useState, useEffect } from "react";
import PriceChart from "@/app/components/priceChart";
import styles from "@/app/styles/layouts/marketOverview.module.css";
import PeriodPicker from "@/app/components/PeriodPicker";
import { getTimeLabels, splitTimeString } from "@/app/utils/timeUtils";
import CompanyCard from "@/app/components/companyCard";
import { fetchData } from "@/app/services/apiCalls";
import usePriceHistory from "@/app/hooks/usePriceHistory";
import { getPortfolio } from "@/app/utils/tradeUtils";
import PrimaryButton from "@/app/components/primaryButton";
import Image from "next/image";

export default function MarketOverview() {
  const profit = 10; // Example profit value
  const [timeLabels, setTimeLabels] = useState(getTimeLabels(7, "D")); // Default to last 7 days
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("1D");
  const [portfolio, setPortfolio] = useState(getPortfolio());

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

  const profitLoss = (
    chartPriceData[chartPriceData.length - 1] - chartPriceData[0]
  ).toFixed(2);
  const percentageChange = ((profitLoss / chartPriceData[0]) * 100).toFixed(2);

  function handleTrade(type, amount) {
    const portfolio = getPortfolio();
    const selectedCompanyPrice = selectedCompany.price;

    if (type === "buy") {
      console.log("companyPrice", selectedCompany);
      const cost = selectedCompanyPrice * amount;
      if (portfolio.balance >= cost) {
        portfolio.balance -= cost;
        portfolio.stocks[selectedCompany.id] =
          (portfolio.stocks[selectedCompany.id] || 0) + amount;
      } else {
        console.log("balance and cost", portfolio.balance, cost);
        alert("Not enough balance!");
        return;
      }
    } else if (type === "sell") {
      const owned = portfolio.stocks[selectedCompany.id] || 0;
      if (owned >= amount) {
        portfolio.balance += selectedCompanyPrice * amount;
        portfolio.stocks[selectedCompany.id] -= amount;
      } else {
        alert("Not enough stocks!");
        return;
      }
    }

    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    setPortfolio(portfolio);
  }

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

      {/* {console.log("Chart Price Data:", chartPriceData)} */}
      <PriceChart
        labels={chartLabels}
        dataPoints={chartPriceData}
        profit={profitLoss}
      />

      {/* buySell */}
      <div className="flexCenter flexColumn">
        <p>Balance: ${portfolio.balance.toFixed(2)}</p>
        {!!selectedCompany.name ? (
          <div>
            <p>
              Owned stock of {selectedCompany.name}:{" "}
              {portfolio.stocks[selectedCompany.id] || 0}
            </p>
            <div className="flexRow flexCenter">
              <PrimaryButton
                color="#29E69F"
                onClick={() => handleTrade("buy", 1)}
              >
                Buy
              </PrimaryButton>
              <PrimaryButton
                color="#FB4D59"
                onClick={() => handleTrade("sell", 1)}
              >
                Sell
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <p>Please select a company to start trading.</p>
        )}
      </div>
    </div>
  );
}
