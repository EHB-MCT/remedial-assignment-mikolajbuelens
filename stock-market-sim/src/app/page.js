//! TEMPORARY REDIRECT (please remove in before merging to the development branch)

import { redirect } from "next/navigation";

const devModeRedirect = true;

export default function Home() {
  if (devModeRedirect) redirect("/market-overview");
  return null;
}
