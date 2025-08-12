import { getData } from "@/app/services/apiCalls";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

// Handle CORS for preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      ...corsHeaders,
    },
  });
}

export async function GET() {
  try {
    const companies = await getData("companies");

    return new Response(JSON.stringify(companies), {
      status: 200,
      headers: {
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
      },
    });
  }
}

// get companies with their stock prices (foreign key join)
// export async function GET() {
//   const companies = await getData("companies");
//   const stockPrices = await getData("price_history");

//   const companiesWithStockPrices = companies.map((company) => {
//     return {
//       ...company,
//       stockPrices: stockPrices.filter(
//         (price) => price.company_id === company.id
//       ),
//     };
//   });

//   return Response.json(companiesWithStockPrices);
// }
