import { getData, postData } from "../services/apiCalls.js";
import { updateStockPrice } from "../utils/priceUtils.js";

async function seedPriceHistory() {
  try {
    // Fetch all companies
    const companies = await getData("companies");
    const historyEntries = [];
    const now = new Date();

    // Generate price history for a company
    const generateData = (companyId, startPrice, points, intervalHours) => {
      let currentPrice = startPrice;
      for (let i = points; i >= 0; i--) {
        const timestamp = new Date(
          now.getTime() - i * intervalHours * 60 * 60 * 1000
        );
        currentPrice = updateStockPrice(currentPrice);

        historyEntries.push({
          company_id: companyId,
          price: currentPrice,
          created_at: timestamp.toISOString(),
        });
      }
    };

    // Generate price history for each company for different periods with different intervals as to not clutter the dataset
    for (const company of companies) {
      const basePrice = company.current_price || 100;

      // 1D, every 5 minutes
      generateData(company.id, basePrice, 24 * 12, 5 / 60);

      // 1W, every hour
      generateData(company.id, basePrice, 168, 1);

      // 1M, every 12 hours
      generateData(company.id, basePrice, 60, 12);

      // 1Y, every day
      generateData(company.id, basePrice, 365, 24);
    }

    // Bulk insert to DB
    await postData("price_history", historyEntries);

    console.log("Price history seeded successfully");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
}

seedPriceHistory();
