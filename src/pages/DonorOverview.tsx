import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { kpiData, getRiskBandColor, getRiskBandBg, getSeverityBadge, getGateColor, mockWatchlist, mockMilestoneAlerts } from '@/data/mockData';
import { DollarSign, Users, TrendingUp, AlertTriangle, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

function RingChart({ score, size = 120 }: { score: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const band = score <= 30 ? 'Low' : score <= 50 ? 'Moderate' : score <= 70 ? 'Elevated' : 'High';
  const color = score <= 30 ? 'hsl(160,100%,45%)' : score <= 50 ? 'hsl(218,60%,64%)' : score <= 70 ? 'hsl(38,92%,50%)' : 'hsl(0,84%,60%)';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="hsl(215,20%,16%)" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={circumference - progress} strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute flex flex-col items-center" style={{ marginTop: size * 0.3 }}>
        <span className="font-mono text-2xl font-bold">{score}</span>
        <span className="text-xs text-muted-foreground">/100</span>
      </div>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRiskBandBg(band as any)}`}>{band}</span>
    </div>
  );
}

export default function DonorOverview() {
  const { clients } = useApp();
  const navigate = useNavigate();

  const kpis = [
    { label: 'Total Capital Deployed', value: `$${(kpiData.totalCapitalDeployed / 1000).toFixed(0)}K`, icon: DollarSign, accent: 'text-primary' },
    { label: 'Total Repaid to Date', value: `$${(kpiData.totalRepaid / 1000).toFixed(0)}K`, icon: TrendingUp, accent: 'text-primary' },
    { label: 'Active Manufacturers', value: kpiData.activeManufacturers.toString(), icon: Users, accent: 'text-secondary' },
    { label: 'Avg Portfolio Risk', value: kpiData.averageRiskScore.toFixed(1), icon: Shield, accent: 'text-warning' },
    { label: 'Capital at Risk', value: `$${(kpiData.capitalAtRisk / 1000).toFixed(0)}K`, icon: AlertTriangle, accent: 'text-destructive' },
  ];

  const compositeScore = Math.round(clients.filter(c => c.capitalDeployed > 0).reduce((s, c) => s + c.riskScore * (c.portfolioWeight / 100), 0));
  const riskDims = [
    { label: 'Regulatory', score: 43, weight: 25 },
    { label: 'Financial', score: 39, weight: 25 },
    { label: 'Operational', score: 44, weight: 20 },
    { label: 'Market', score: 50, weight: 20 },
    { label: 'Governance', score: 35, weight: 10 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.accent}`} />
            </div>
            <span className="font-mono text-xl font-bold">{k.value}</span>
          </div>
        ))}
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Risk */}
        <div className="space-y-4">
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Portfolio Risk Aggregate</h3>
            <div className="flex justify-center relative">
              <RingChart score={compositeScore || 38} size={140} />
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Risk Dimension Breakdown</h3>
            <div className="space-y-3">
              {riskDims.map(d => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{d.label} <span className="text-muted-foreground">({d.weight}%)</span></span>
                    <span className="font-mono">{d.score}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${d.score}%`,
                        backgroundColor: d.score <= 30 ? 'hsl(160,100%,45%)' : d.score <= 50 ? 'hsl(218,60%,64%)' : d.score <= 70 ? 'hsl(38,92%,50%)' : 'hsl(0,84%,60%)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
  <h3 className="text-sm font-semibold mb-4">By Risk Band</h3>

  <div className="space-y-2 text-sm">
    {/* Low */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
        <span>Low (0–30)</span>
      </div>
      <span>1 client</span>
    </div>

    {/* Medium */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
        <span>Medium (31–55)</span>
      </div>
      <span>5 clients</span>
    </div>

    {/* High */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
        <span>High (56–75)</span>
      </div>
      <span>1 client</span>
    </div>

    {/* Critical */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-700"></span>
        <span>Critical (76–100)</span>
      </div>
      <span>1 client</span>
    </div>
  </div>
</div>
        </div>

        {/* Right: Watchlist & Alerts */}
        <div className="space-y-4">
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Watchlist / Early Warning</h3>
            <div className="space-y-3">
              {mockWatchlist.map((w, i) => {
                const badge = getSeverityBadge(w.severity);
                return (
                  <div key={i} className="border border-border rounded-md p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${badge.className}`}>{badge.icon} {badge.label}</span>
                      <span className="text-xs font-medium">{w.clientName}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{w.issue}</p>
                    <p className="text-[10px] text-primary">→ {w.action}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Live Milestone Alerts</h3>
            <div className="space-y-2">
              {mockMilestoneAlerts.map((a, i) => (
                <div key={i} className="flex items-center gap-3 border border-primary/20 rounded-md p-3 bg-primary/5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{a.clientName}</p>
                    <p className="text-[10px] text-muted-foreground">{a.milestone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-primary">${a.trancheAmount.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
       {/* System Modules (3 slots) */}
      <div className="grid grid-cols-3 gap-4">
        
        {/* System 1 */}
        <div className="bg-white/[0.03] border border-white/10 border-t-emerald-500 border-t-2 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-bold text-emerald-400 tracking-wider mb-3">SYSTEM 1 — THREE-TIER MILESTONE GATE</h3>
            <p className="font-semibold text-sm mb-1 text-white">Active · 6 Green · 1 Amber · 1 Red</p>
            <p className="text-xs text-white/50 mb-6 leading-relaxed">Gulf Drug on 90-day cure period. ZimPharm on full hold.</p>
          </div>
          <button onClick={() => navigate('/disbursements')} className="self-start text-xs font-semibold px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors">
            View Gates →
          </button>
        </div>

        {/* System 2 */}
        <div className="bg-white/[0.03] border border-white/10 border-t-blue-500 border-t-2 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-bold text-blue-400 tracking-wider mb-3">SYSTEM 2 — IMPACT METRICS DASHBOARD</h3>
            <p className="font-semibold text-sm mb-1 text-white">4.2M units/month · 612 jobs · -28% vs imports</p>
            <p className="text-xs text-white/50 mb-6 leading-relaxed">4/5 priority products on NatPharm shelf this month.</p>
          </div>
          <button onClick={() => navigate('/impact-dashboard')} className="self-start text-xs font-semibold px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors">
            View Impact Metrics →
          </button>
        </div>

        {/* System 3 */}
        <div className="bg-white/[0.03] border border-white/10 border-t-amber-500 border-t-2 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-bold text-amber-500 tracking-wider mb-3">SYSTEM 3 — ECOSYSTEM LIAISON TRACKER</h3>
            <p className="font-semibold text-sm mb-1 text-white">6/8 NatPharm MOUs · 2 escalations active</p>
            <p className="text-xs text-white/50 mb-6 leading-relaxed">Gulf Drug MCAZ overdue. ZimPharm MOU breach.</p>
          </div>
          <button onClick={() => navigate('/contacts')} className="self-start text-xs font-semibold px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors">
            View Ecosystem →
          </button>
        </div>
        </div>


      {/* Manufacturer Table */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold mb-4">Funded Manufacturers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-2 font-medium">Company</th>
                <th className="pb-2 font-medium">Sector</th>
                <th className="pb-2 font-medium">Location</th>
                <th className="pb-2 font-medium text-right">Capital Deployed</th>
                <th className="pb-2 font-medium">Risk Score</th>
                <th className="pb-2 font-medium">Milestones</th>
                <th className="pb-2 font-medium">MCAZ</th>
                <th className="pb-2 font-medium">NatPharm</th>
                <th className="pb-2 font-medium">Gate</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(c => {
                const done = c.milestones.filter(m => m.status === 'Completed').length;
                const total = c.milestones.length;
                return (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/client/${c.id}`)}>
                    <td className="py-3 font-medium">{c.companyName}</td>
                    <td className="py-3">{c.sector}</td>
                    <td className="py-3">{c.location}</td>
                    <td className="py-3 text-right font-mono">${c.capitalDeployed.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${getRiskBandBg(c.riskBand)}`}>
                        {c.riskScore} {c.riskBand}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${(done/total)*100}%` }} />
                        </div>
                        <span className="font-mono text-muted-foreground">{done}/{total}</span>
                      </div>
                    </td>
                    <td className="py-3">{c.mcazCompliant ? '✅' : '❌'}</td>
                    <td className="py-3">{c.natPharmMOU ? '✅' : '❌'}</td>
                    <td className="py-3">
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${getGateColor(c.disbursementGate)}`}>
                        {c.disbursementGate}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-muted-foreground">{c.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
