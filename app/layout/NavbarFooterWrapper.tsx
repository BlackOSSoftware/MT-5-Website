"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavbarFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isUserRoute = pathname.startsWith("/user");

  return (
    <>
      {!isUserRoute && <Navbar />}
      {children}
      {!isUserRoute && <Footer />}
    </>
  );
}
