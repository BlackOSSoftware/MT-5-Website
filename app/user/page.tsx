import type { Metadata } from "next";
import Overview from "./components/Dashboard/Overview";
import { buildPageMetadata } from "../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "User Dashboard | oceanaprofx",
  description: "Secure user dashboard for account monitoring and internal trading activity management.",
  path: "/user",
  pageKeywords: [
    "oceanaprofx user dashboard",
    "client dashboard access",
    "private trading dashboard",
    "account overview panel",
    "secure user area",
    "broker portal",
  ],
  noindex: true,
});

export default function UserDashboard() {
  return (
    <>
      <Overview />
    </>
  );
}
