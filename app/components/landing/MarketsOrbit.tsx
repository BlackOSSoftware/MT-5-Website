"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  BarChart3,
  Bitcoin,
  Coins,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import "./MarketsOrbit.css";

type OrbitCard = {
  nameKey: "forex" | "crypto" | "indices" | "metals";
  href: string;
  tag: string;
  icon: LucideIcon;
  color: string;
};

const ORBIT_CARDS: OrbitCard[] = [
  { nameKey: "forex", href: "/markets/forex", tag: "EUR/USD", icon: LineChart, color: "56, 189, 248" },
  { nameKey: "crypto", href: "/markets/crypto", tag: "BTC/USD", icon: Bitcoin, color: "52, 211, 153" },
  { nameKey: "indices", href: "/markets/indices", tag: "US30", icon: BarChart3, color: "129, 140, 248" },
  { nameKey: "metals", href: "/markets/metal", tag: "XAU/USD", icon: Coins, color: "251, 191, 36" },
  { nameKey: "forex", href: "/markets/forex", tag: "GBP/USD", icon: LineChart, color: "34, 211, 238" },
  { nameKey: "crypto", href: "/markets/crypto", tag: "ETH/USD", icon: Bitcoin, color: "74, 222, 128" },
  { nameKey: "indices", href: "/markets/indices", tag: "NAS100", icon: BarChart3, color: "167, 139, 250" },
  { nameKey: "metals", href: "/markets/metal", tag: "XAG/USD", icon: Coins, color: "250, 204, 21" },
];

export default function MarketsOrbit() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const quantity = ORBIT_CARDS.length;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`marketsOrbit${active ? " is-active" : ""}`}
      aria-hidden
    >
      <div
        className="marketsOrbitInner"
        style={{ ["--quantity" as string]: quantity }}
      >
        {ORBIT_CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link
              key={`${card.nameKey}-${card.tag}`}
              href={card.href}
              className="marketsOrbitCard"
              style={
                {
                  ["--index" as string]: index,
                  ["--color-card" as string]: card.color,
                } as CSSProperties
              }
              tabIndex={-1}
            >
              <div className="marketsOrbitFace">
                <span className="marketsOrbitIcon">
                  <Icon size={18} />
                </span>
                <span className="marketsOrbitName">{t(`nav.${card.nameKey}`)}</span>
                <span className="marketsOrbitTag">{card.tag}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
