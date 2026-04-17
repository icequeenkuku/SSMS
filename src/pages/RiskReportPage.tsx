// RiskReportPage.tsx
// Portfolio Risk Report — no sidebar, standalone page

interface Client {
  name: string;
  regulatory: number;
  financial: number;
  operational: number;
  market: number;
  governance: number;
  composite: number;
  capitalWeight: number;
  weightedContribution: number;
  band: "Critical" | "High" | "Medium" | "Low";
}

// ── Data ──────────────────────────────────────────────────────────────────────

const clients: Client[] = [
  {
    name: "ZimPharm Ltd",
    regulatory: 82, financial: 75, operational: 70, market: 78, governance: 68,
    composite: 76, capitalWeight: 8.4, weightedContribution: 6.4, band: "Critical",
  },
  {
    name: "Gulf Drug Company",
    regulatory: 70, financial: 62, operational: 58, market: 65, governance: 52,
    composite: 63, capitalWeight: 7.4, weightedContribution: 4.7, band: "High",
  },
  {
    name: "Plus Five Pharmaceuticals",
    regulatory: 65, financial: 55, operational: 50, market: 48, governance: 38,
    composite: 53, capitalWeight: 9.2, weightedContribution: 4.9, band: "Medium",
  },
  {
    name: "Datlabs (Pvt) Ltd",
    regulatory: 60, financial: 50, operational: 45, market: 40, governance: 35,
    composite: 48, capitalWeight: 11.1, weightedContribution: 5.3, band: "Medium",
  },
  {
    name: "Pharmanova (Pvt) Ltd",
    regulatory: 55, financial: 48, operational: 42, market: 38, governance: 30,
    composite: 45, capitalWeight: 13.2, weightedContribution: 5.9, band: "Medium",
  },
  {
    name: "Graniteside Chemicals",
    regulatory: 58, financial: 45, operational: 40, market: 38, governance: 30,
    composite: 44, capitalWeight: 5.8, weightedContribution: 2.6, band: "Medium",
  },
  {
    name: "Varichem Pharmaceuticals",
    regulatory: 35, financial: 30, operational: 28, market: 25, governance: 22,
    composite: 29, capitalWeight: 21.0, weightedContribution: 6.1, band: "Low",
  },
  {
    name: "CAPS Holdings",
    regulatory: 40, financial: 38, operational: 35, market: 30, governance: 28,
    composite: 36, capitalWeight: 24.0, weightedContribution: 8.6, band: "Low",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 76) return "text-red-400";
  if (score >= 56) return "text-orange-400";
  if (score >= 31) return "text-amber-400";
  return "text-emerald-400";
}

function compositeBadge(score: number, band: Client["band"]) {
  const colors: Record<Client["band"], string> = {
    Critical: "bg-red-500 text-white",
    High: "bg-orange-500 text-white",
    Medium: "bg-amber-500/80 text-white",
    Low: "bg-slate-600 text-slate-200",
  };
  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${colors[band]}`}>
      {score}
    </span>
  );
}

function bandPill(band: Client["band"]) {
  const styles: Record<Client["band"], string> = {
    Critical: "bg-red-500/20 text-red-400 border border-red-500/30",
    High: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
    Medium: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    Low: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  };
  const short: Record<Client["band"], string> = {
    Critical: "CRIT", High: "HIGH", Medium: "MED", Low: "LOW",
  };
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${styles[band]}`}>
      {short[band]}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RiskReportPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio Risk Report</h1>
          <p className="text-sm text-slate-400 mt-1">Quarterly risk assessment — January 2025</p>
        </div>
        <button className="text-sm bg-sky-600 hover:bg-sky-500 text-white rounded-lg px-5 py-2 font-medium transition-colors">
          Export
        </button>
      </div>

      <div className="space-y-6">
        {/* Executive Summary */}
        <div className="bg-[#161d2b] border border-white/[0.08] rounded-2xl px-7 py-6">
          <h2 className="text-base font-semibold mb-3">Executive Summary</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The SSMS portfolio currently holds{" "}
            <strong className="text-white">8 active financing relationships</strong> with a total
            deployed capital of <strong className="text-white">USD 3.79 million</strong>. The{" "}
            <span className="text-amber-400 font-semibold">
              weighted portfolio risk score is 43/100 (Medium)
            </span>
            , driven primarily by the regulatory risk dimension (weighted average 49) reflecting the
            sector-wide challenge of WHO-GMP compliance. Two clients —{" "}
            <span className="text-red-400 font-semibold">ZimPharm Ltd (Critical, 76)</span> and{" "}
            <span className="text-orange-400 font-semibold">Gulf Drug Co (High, 63)</span> — require
            immediate remediation action. The NatPharm off-take MOU framework has been signed by 6 of
            8 clients, materially reducing market risk. GMP milestone completion rate stands at{" "}
            <strong className="text-white">64%</strong>.
          </p>
        </div>

        {/* Full Risk Matrix */}
        <div className="bg-[#161d2b] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="px-7 py-5 border-b border-white/[0.08]">
            <h2 className="text-base font-semibold">Full Risk Matrix — All Active Clients</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[
                    { label: "Manufacturer", wide: true },
                    { label: "Regulatory" },
                    { label: "Financial" },
                    { label: "Operational" },
                    { label: "Market" },
                    { label: "Governance" },
                    { label: "Composite" },
                    { label: "Capital\nWeight" },
                    { label: "Weighted\nContribution" },
                    { label: "Band" },
                  ].map(({ label, wide }) => (
                    <th
                      key={label}
                      className={`text-left text-[10px] tracking-widest uppercase text-slate-500 px-4 py-4 font-medium whitespace-pre-line ${wide ? "w-52" : ""}`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => (
                  <tr
                    key={c.name}
                    className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${
                      i % 2 === 0 ? "" : "bg-white/[0.01]"
                    }`}
                  >
                    <td className="px-4 py-4 font-medium text-white leading-snug">{c.name}</td>
                    <td className={`px-4 py-4 font-semibold ${scoreColor(c.regulatory)}`}>{c.regulatory}</td>
                    <td className={`px-4 py-4 font-semibold ${scoreColor(c.financial)}`}>{c.financial}</td>
                    <td className={`px-4 py-4 font-semibold ${scoreColor(c.operational)}`}>{c.operational}</td>
                    <td className={`px-4 py-4 font-semibold ${scoreColor(c.market)}`}>{c.market}</td>
                    <td className={`px-4 py-4 font-semibold ${scoreColor(c.governance)}`}>{c.governance}</td>
                    <td className="px-4 py-4">{compositeBadge(c.composite, c.band)}</td>
                    <td className="px-4 py-4 text-slate-300">{c.capitalWeight}%</td>
                    <td className={`px-4 py-4 font-semibold ${scoreColor(c.weightedContribution * 10)}`}>
                      {c.weightedContribution}
                    </td>
                    <td className="px-4 py-4">{bandPill(c.band)}</td>
                  </tr>
                ))}
              </tbody>

              {/* Totals row */}
              <tfoot>
                <tr className="border-t border-white/10 bg-white/[0.02]">
                  <td className="px-4 py-4 text-xs text-slate-500 uppercase tracking-widest font-semibold">
                    Portfolio Average
                  </td>
                  {(["regulatory","financial","operational","market","governance"] as const).map((dim) => {
                    const avg = Math.round(clients.reduce((s, c) => s + c[dim], 0) / clients.length);
                    return (
                      <td key={dim} className={`px-4 py-4 font-bold ${scoreColor(avg)}`}>{avg}</td>
                    );
                  })}
                  <td className="px-4 py-4">
                    {compositeBadge(43, "Medium")}
                  </td>
                  <td className="px-4 py-4 text-slate-300 font-semibold">100%</td>
                  <td className="px-4 py-4 text-amber-400 font-bold">43.0</td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      MED
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Risk Band Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          {(
            [
              { band: "Critical", count: 1, color: "border-red-500/40 bg-red-500/5", text: "text-red-400", desc: "Immediate action required" },
              { band: "High", count: 1, color: "border-orange-500/40 bg-orange-500/5", text: "text-orange-400", desc: "Escalation recommended" },
              { band: "Medium", count: 4, color: "border-amber-500/40 bg-amber-500/5", text: "text-amber-400", desc: "Monitor closely" },
              { band: "Low", count: 2, color: "border-emerald-500/40 bg-emerald-500/5", text: "text-emerald-400", desc: "Within acceptable range" },
            ] as const
          ).map((b) => (
            <div key={b.band} className={`border rounded-2xl px-5 py-4 ${b.color}`}>
              <p className={`text-xs uppercase tracking-widest font-semibold ${b.text}`}>{b.band}</p>
              <p className="text-3xl font-bold text-white mt-1">{b.count}</p>
              <p className="text-xs text-slate-400 mt-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}