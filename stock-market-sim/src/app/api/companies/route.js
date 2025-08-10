import { getData } from "@/app/services/apiCalls";

export async function GET() {
  const companies = await getData("companies");
  return Response.json(companies);
}
