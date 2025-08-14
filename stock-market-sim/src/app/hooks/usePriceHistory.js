import { useEffect, useState } from "react";
import { fetchData } from "@/app/services/apiCalls";

export default function usePriceHistory(selectedCompany, period) {
  const [chartPriceData, setChartPriceData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    if (!selectedCompany?.id) return;

    async function fetchPriceHistory() {
      try {
        const data = await fetchData(
          `price-history?companyId=${selectedCompany.id}&period=${period}`
        );

        if (!data?.length) {
          setChartPriceData([]);
          setChartLabels([]);
          return;
        }

        // sort data by timestamp just in case
        const sortedData = data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        // determine unit from period
        const unit = period.slice(-1); // "D", "W", "M", "Y"

        // generate labels based on unit
        const labels = sortedData.map((obj) => {
          const date = new Date(obj.created_at);
          if (unit === "D") {
            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          } else if (unit === "W" || unit === "M") {
            return date.toLocaleDateString([], {
              day: "numeric",
              month: "short",
            });
          } else if (unit === "Y") {
            return date.toLocaleDateString([], {
              month: "short",
              year: "numeric",
            });
          }
          return date.toLocaleDateString();
        });

        const prices = sortedData.map((obj) => obj.price);

        setChartLabels(labels);
        setChartPriceData(prices);
      } catch (err) {
        console.error("Failed to fetch price history:", err);
        setChartLabels([]);
        setChartPriceData([]);
      }
    }

    fetchPriceHistory();
  }, [selectedCompany, period]);

  return { chartPriceData, chartLabels };
}
