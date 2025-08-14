import { getData } from "@/app/services/apiCalls";
import { splitTimeString, getStartTimeForPeriod } from "@/app/utils/timeUtils";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");
    const period = searchParams.get("period") || "1D";

    if (!companyId) {
      return new Response(JSON.stringify({ error: "Missing companyId" }), {
        status: 400,
      });
    }

    // Convert period string to startTime
    const { unit, duration } = splitTimeString(period);
    if (!unit || !duration) {
      return new Response(JSON.stringify({ error: "Invalid period format" }), {
        status: 400,
      });
    }

    const startTime = getStartTimeForPeriod(duration, unit);

    // Fetch price_history filtered by company_id and created_at >= startTime
    const data = await getData("price_history", {
      companyId,
      startTime,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
