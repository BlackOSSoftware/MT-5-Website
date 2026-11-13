"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppDownloadPopup from "../components/marketing/AppDownloadPopup";
import I18nProvider from "../lib/i18n/I18nProvider";

export default function NavbarFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isUserRoute = pathname.startsWith("/user");

  return (
    <I18nProvider>
      {!isUserRoute && <Navbar />}
      {children}
      {!isUserRoute && <Footer />}
      {!isUserRoute && <AppDownloadPopup />}
    </I18nProvider>
  );
}
