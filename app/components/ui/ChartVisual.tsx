/**
 * Illustrative market chart drawn in SVG (no remote images, no live data).
 * Used as the hero visual so pages load fast and stay on-brand.
 */
const CANDLES = [
  [42, 58, 38, 62],
  [58, 52, 49, 64],
  [52, 66, 50, 70],
  [66, 61, 57, 72],
  [61, 74, 59, 78],
  [74, 70, 66, 80],
  [70, 83, 68, 87],
  [83, 79, 75, 89],
  [79, 92, 77, 96],
  [92, 88, 84, 98],
  [88, 101, 86, 106],
  [101, 112, 97, 116],
] as const;

export default function ChartVisual({
  label = "Market overview",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const w = 520;
  const h = 260;
  const step = w / (CANDLES.length + 1);
  const y = (v: number) => h - ((v - 30) / 90) * (h - 30) - 10;
  const line = CANDLES.map((c, i) => `${i === 0 ? "M" : "L"}${(i + 1) * step},${y(c[1])}`).join(" ");
  const area = `${line} L${CANDLES.length * step},${h} L${step},${h} Z`;

  return (
    <div className={`glass-card overflow-hidden p-5 ${className}`} aria-hidden>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#34d399]" />
          <span className="text-xs font-semibold tracking-wide text-white/70">{label}</span>
        </div>
        <div className="flex gap-1.5">
          {["1H", "4H", "1D"].map((t, i) => (
            <span
              key={t}
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                i === 2 ? "bg-white/15 text-white" : "text-white/45"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-auto w-full">
        <defs>
          <linearGradient id="cv-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3d7bff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3d7bff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cv-line" x1="0" x2="1">
            <stop offset="0%" stopColor="#2f5bff" />
            <stop offset="100%" stopColor="#12c2e9" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((r) => (
          <line key={r} x1="0" x2={w} y1={h * r} y2={h * r} stroke="rgba(255,255,255,0.07)" />
        ))}
        {CANDLES.map(([o, c, lo, hi], i) => {
          const x = (i + 1) * step;
          const up = c >= o;
          const color = up ? "#34d399" : "#fb7185";
          return (
            <g key={i} opacity="0.55">
              <line x1={x} x2={x} y1={y(hi)} y2={y(lo)} stroke={color} strokeWidth="1.5" />
              <rect
                x={x - 6}
                width="12"
                y={y(Math.max(o, c))}
                height={Math.max(Math.abs(y(o) - y(c)), 2)}
                rx="2"
                fill={color}
              />
            </g>
          );
        })}
        <path d={area} fill="url(#cv-area)" />
        <path d={line} fill="none" stroke="url(#cv-line)" strokeWidth="3" strokeLinecap="round" className="draw-line" />
      </svg>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Forex", "Metals", "indices"].map((m) => (
          <div key={m} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-white/45">Market</p>
            <p className="text-sm font-semibold text-white">{m}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
