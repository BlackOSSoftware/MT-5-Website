"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./HeroLiveDevices.css";

type Candle = { open: number; close: number; high: number; low: number };

function createCandles(count: number): Candle[] {
  const data: Candle[] = [];
  let price = 65;
  for (let i = 0; i < count; i++) {
    const open = price;
    const close = open + (Math.random() - 0.44) * 8;
    data.push({
      open,
      close,
      high: Math.max(open, close) + Math.random() * 5,
      low: Math.min(open, close) - Math.random() * 5,
    });
    price = close;
  }
  return data;
}

function drawDesktop(
  canvas: HTMLCanvasElement,
  candles: Candle[],
  priceLabel: string,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const dpr = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;

  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);

  const max = Math.max(...candles.map((c) => c.high)) + 5;
  const min = Math.min(...candles.map((c) => c.low)) - 5;
  const getY = (p: number) => h - ((p - min) / (max - min)) * h;
  const step = w / candles.length;
  const cw = Math.max(3, step * 0.55);

  ctx.strokeStyle = "rgba(140,170,205,.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = (h * i) / 4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  candles.forEach((c, i) => {
    const x = Math.round(i * step + step / 2) + 0.5;
    const up = c.close >= c.open;
    const color = up ? "#10d9a5" : "#ff5d7a";
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, getY(c.high));
    ctx.lineTo(x, getY(c.low));
    ctx.stroke();
    ctx.fillStyle = color;
    const top = Math.min(getY(c.open), getY(c.close));
    const bodyH = Math.max(2.5, Math.abs(getY(c.open) - getY(c.close)));
    ctx.fillRect(x - cw / 2, top, cw, bodyH);
  });

  ctx.beginPath();
  candles.forEach((c, i) => {
    const x = i * step + step / 2;
    const y = getY(c.close);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#4da3ff";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.stroke();

  const last = candles[candles.length - 1];
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#4da3ff";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, getY(last.close));
  ctx.lineTo(w, getY(last.close));
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#1a78f0";
  ctx.fillRect(w - 54, getY(last.close) - 9, 54, 18);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 9px Arial";
  ctx.fillText(priceLabel, w - 50, getY(last.close) + 3.5);
}

function drawMobile(canvas: HTMLCanvasElement, points: number[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);

  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, "rgba(25,123,255,.3)");
  gradient.addColorStop(1, "rgba(25,123,255,0)");

  ctx.beginPath();
  points.forEach((y, i) => {
    const x = i * (w / (points.length - 1));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach((y, i) => {
    const x = i * (w / (points.length - 1));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#1675ed";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function seedMobilePoints(h: number) {
  const points: number[] = [];
  let value = h * 0.75;
  for (let i = 0; i < 35; i++) {
    value += (Math.random() - 0.46) * 9;
    value = Math.max(5, Math.min(h - 5, value));
    points.push(value);
  }
  return points;
}

/** Fixed heights — Math.random() breaks SSR hydration */
const VOLUME_HEIGHTS = [
  42, 68, 35, 78, 55, 62, 48, 72, 38, 85, 58, 45, 70, 52, 66, 40, 75, 50, 60, 33,
  80, 47, 64, 56, 71, 44, 69, 37, 76, 53, 61, 49, 73, 41, 67, 54, 79, 46, 63, 57,
].map((h) => `${h}%`);

export default function HeroLiveDevices() {
  const reduce = useReducedMotion() === true;
  const desktopRef = useRef<HTMLCanvasElement>(null);
  const mobileRef = useRef<HTMLCanvasElement>(null);
  const candlesRef = useRef<Candle[] | null>(null);
  const mobilePtsRef = useRef<number[]>([]);
  const [ready, setReady] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    candlesRef.current = createCandles(32);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const desktop = desktopRef.current;
    const mobile = mobileRef.current;
    const root = rootRef.current;
    if (!desktop) return;

    const paint = () => {
      if (!candlesRef.current) return;
      if (desktop.clientHeight < 4) desktop.style.height = "120px";
      drawDesktop(desktop, candlesRef.current, "67,428");
      if (mobile) {
        const mh = mobile.getBoundingClientRect().height || 36;
        if (mobilePtsRef.current.length === 0) {
          mobilePtsRef.current = seedMobilePoints(mh);
        }
        drawMobile(mobile, mobilePtsRef.current);
      }
    };

    const boot = window.requestAnimationFrame(() => paint());

    let id: number | undefined;
    const tick = () => {
      if (!visibleRef.current || document.hidden) return;
      const candles = candlesRef.current;
      if (!candles) return;
      const last = candles[candles.length - 1];
      last.close += (Math.random() - 0.46) * 2;
      last.high = Math.max(last.high, last.close);
      last.low = Math.min(last.low, last.close);
      const pts = mobilePtsRef.current;
      if (pts.length) {
        const next = pts[pts.length - 1] + (Math.random() - 0.46) * 4;
        pts.push(Math.max(5, Math.min(40, next)));
        if (pts.length > 35) pts.shift();
      }
      paint();
    };

    if (!reduce) id = window.setInterval(tick, 1600);

    const io = root
      ? new IntersectionObserver(
          ([entry]) => {
            visibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting) paint();
          },
          { threshold: 0.12 },
        )
      : null;
    if (root && io) io.observe(root);

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(paint, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(boot);
      if (id) window.clearInterval(id);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
    };
  }, [ready, reduce]);

  return (
    <div ref={rootRef} className="heroDeviceScene" aria-hidden>
      <div className="hd-glow" />

      <div className="hd-tablet">
        <div className="hd-tablet-bezel">
          <div className="hd-tablet-camera" />
          <div className="hd-tablet-screen">
            <div className="hd-desktop-ui">
              <div className="hd-topbar">
                <div className="hd-brand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/oceana-logo.png" alt="Oceana" />
                </div>
                <div className="hd-top-links">
                  <span>Markets</span>
                  <span>Trading</span>
                  <span>Portfolio</span>
                  <span>Analytics</span>
                </div>
                <div className="hd-top-actions">
                  <span className="hd-live-dot">● Live</span>
                  <div className="hd-avatar">O</div>
                </div>
              </div>

              <div className="hd-desktop-body">
                <div className="hd-main-market">
                  <div className="hd-pair-head">
                    <div className="hd-pair-name">
                      <div className="hd-coin">₿</div>
                      <div>
                        <strong>Bitcoin / USDT</strong>
                        <small>BTCUSDT · Spot Market</small>
                      </div>
                    </div>
                    <div className="hd-price-main">
                      $67,428.50
                      <small>+2.84% Today</small>
                    </div>
                  </div>

                  <div className="hd-chart-toolbar">
                    <span>
                      1m　5m　<b>15m</b>　1H　4H　1D
                    </span>
                    <span>Indicators</span>
                  </div>

                  <canvas className="hd-big-chart" ref={desktopRef} />

                  <div className="hd-chart-footer">
                    <span>09:00</span>
                    <span>10:00</span>
                    <span>11:00</span>
                    <span>12:00</span>
                    <span>13:00</span>
                    <span>14:00</span>
                  </div>

                  <div className="hd-volume-bars">
                    {VOLUME_HEIGHTS.map((h, i) => (
                      <span key={i} style={{ height: h }} />
                    ))}
                  </div>
                </div>

                <div className="hd-order-panel">
                  <div className="hd-panel-heading">Place Order</div>
                  <div className="hd-buy-sell">
                    <span>BUY</span>
                    <span>SELL</span>
                  </div>
                  <div className="hd-field">
                    <small>Order Type</small>
                    <div>Market Order</div>
                  </div>
                  <div className="hd-field">
                    <small>Quantity</small>
                    <div>0.025 BTC</div>
                  </div>
                  <div className="hd-field">
                    <small>Price</small>
                    <div>Market Price</div>
                  </div>
                  <div className="hd-place-order">Buy BTC</div>
                  <div className="hd-orderbook">
                    <h4>Market Depth</h4>
                    <div className="hd-book-row red">
                      <span>67,432</span>
                      <span>0.025</span>
                    </div>
                    <div className="hd-book-row red">
                      <span>67,429</span>
                      <span>0.042</span>
                    </div>
                    <div className="hd-book-row green">
                      <span>67,425</span>
                      <span>0.083</span>
                    </div>
                    <div className="hd-book-row green">
                      <span>67,420</span>
                      <span>0.064</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hd-desktop-bottom">
                <div className="hd-market-cell">
                  <small>BTC / USDT</small>
                  <strong>$67,428.50</strong>
                  <em>+2.84%</em>
                </div>
                <div className="hd-market-cell">
                  <small>ETH / USDT</small>
                  <strong>$3,821.40</strong>
                  <em>+3.28%</em>
                </div>
                <div className="hd-market-cell">
                  <small>EUR / USD</small>
                  <strong>1.08425</strong>
                  <em>+0.52%</em>
                </div>
                <div className="hd-market-cell">
                  <small>GOLD / USD</small>
                  <strong>$2,685.20</strong>
                  <em>+1.24%</em>
                </div>
              </div>
            </div>
          </div>
          <div className="hd-tablet-home" />
        </div>
      </div>

      <div className="hd-phone">
        <div className="hd-phone-screen">
          <div className="hd-phone-notch" />
          <div className="hd-mobile-ui">
            <div className="hd-mobile-header">
              <div className="hd-mobile-brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/oceana-logo.png" alt="Oceana" />
              </div>
              <div className="hd-mobile-avatar" />
            </div>

            <div className="hd-balance-card">
              <small>Total Portfolio Value</small>
              <h2>$12,480.75</h2>
              <div className="hd-gain">↗ $642.50 (+5.21%) Today</div>
            </div>

            <div className="hd-mobile-actions">
              <div>
                <div className="hd-action">↗</div>
                <div className="hd-action-label">Deposit</div>
              </div>
              <div>
                <div className="hd-action">↙</div>
                <div className="hd-action-label">Withdraw</div>
              </div>
              <div>
                <div className="hd-action">⇄</div>
                <div className="hd-action-label">Transfer</div>
              </div>
              <div>
                <div className="hd-action">◷</div>
                <div className="hd-action-label">History</div>
              </div>
            </div>

            <div className="hd-section-title">
              My Assets
              <small>See All</small>
            </div>

            <div className="hd-asset">
              <div className="hd-asset-left">
                <div className="hd-asset-icon">₿</div>
                <div className="hd-asset-info">
                  <strong>Bitcoin</strong>
                  <small>BTC</small>
                </div>
              </div>
              <div className="hd-asset-value">
                <strong>$5,420.50</strong>
                <small>+2.84%</small>
              </div>
            </div>

            <div className="hd-asset">
              <div className="hd-asset-left">
                <div className="hd-asset-icon eth">Ξ</div>
                <div className="hd-asset-info">
                  <strong>Ethereum</strong>
                  <small>ETH</small>
                </div>
              </div>
              <div className="hd-asset-value">
                <strong>$3,280.25</strong>
                <small>+3.28%</small>
              </div>
            </div>

            <div className="hd-section-title">
              Portfolio Performance
              <small>1W　1M</small>
            </div>

            <div className="hd-mobile-chart-box">
              <h4>
                $12,480.75{" "}
                <span style={{ color: "#08ae7e" }}>↗ 5.21%</span>
              </h4>
              <canvas ref={mobileRef} />
            </div>

            <div className="hd-mobile-bottom">
              <span>⌂ Home</span>
              <span>◈ Markets</span>
              <span>↗ Trade</span>
              <span>▤ Assets</span>
              <span>● Profile</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hd-reflection" />
    </div>
  );
}
