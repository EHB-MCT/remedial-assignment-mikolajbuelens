import { getData, postData, updateData } from "@/app/services/apiCalls";
import { updateStockPrice } from "@/app/utils/priceUtils";

// TODO: implement a Cron job via Vercel to automatically execute this function (every +-5 minutes)

export async function POST() {
  try {
    // Fetch all companies in order to loop all of them at once
    const companies = await getData("companies");

    const historyEntries = [];
    const updatedCompanies = [];

    // loop over all companies in order to bulk insert/update price data (since they all will change at the same time anyway)
    for (const company of companies) {
      console.log("Updating price for company:", company.latest_price);
      const newPrice = updateStockPrice(company.latest_price);

      historyEntries.push({
        company_id: company.id,
        price: newPrice,
      });

      updatedCompanies.push({
        id: company.id,
        latest_price: newPrice,
      });
    }

    // Insert all price history entries for all available companies, preventing a new post request for each company which would slow down performance on a large scale
    await postData("price_history", historyEntries);

    // Update all companies with their new/most recent prices
    // (might get rid of this later and just make it so a company gets it's most recent price from the price history with the latest timestamp
    //  this might hinder code readability however + the "latest_price" column would probably be more reusable-friendly instead of filtering timestamps everytime to get the same result)
    await updateData("companies", updatedCompanies);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
