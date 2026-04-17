import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Briefcase, TrendingUp, MapPin } from 'lucide-react';

export default function PortfolioBuilder() {
  const { clients, portfolio, setPortfolio } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [summary, setSummary] = useState('');

  const addToPortfolio = (clientId: string) => {
    if (portfolio.find(p => p.clientId === clientId)) return;
    setPortfolio(prev => [...prev, { clientId, allocation: 0 }]);
  };

  const removeFromPortfolio = (clientId: string) => {
    setPortfolio(prev => prev.filter(p => p.clientId !== clientId));
  };

  const updateAllocation = (clientId: string, amount: number) => {
    setPortfolio(prev => prev.map(p => p.clientId === clientId ? { ...p, allocation: amount } : p));
  };

  const totalAllocated = portfolio.reduce((s, p) => s + p.allocation, 0);
  const portfolioClients = portfolio.map(p => ({ ...p, client: clients.find(c => c.id === p.clientId)! })).filter(p => p.client);

  const weightedRisk = portfolioClients.length > 0
    ? portfolioClients.reduce((s, p) => s + p.client.riskScore * (p.allocation / Math.max(totalAllocated, 1)), 0).toFixed(1)
    : '0';

  const sectorBreakdown = portfolioClients.reduce((acc, p) => {
    acc[p.client.sector] = (acc[p.client.sector] || 0) + p.allocation;
    return acc;
  }, {} as Record<string, number>);

  const locationBreakdown = portfolioClients.reduce((acc, p) => {
    acc[p.client.location] = (acc[p.client.location] || 0) + p.allocation;
    return acc;
  }, {} as Record<string, number>);

  const availableClients = clients.filter(c => !portfolio.find(p => p.clientId === c.id));

  const generateSummary = () => {
    const sectors = Object.keys(sectorBreakdown);
    setSummary(
      `This portfolio allocates $${totalAllocated.toLocaleString()} across ${portfolioClients.length} manufacturer(s) in ${sectors.join(', ')}. ` +
      `The weighted risk score of ${weightedRisk} suggests a ${parseFloat(weightedRisk) <= 40 ? 'conservative' : parseFloat(weightedRisk) <= 60 ? 'balanced' : 'aggressive'} risk profile. ` +
      `${sectors.length > 1 ? 'Good sector diversification observed.' : 'Consider adding manufacturers from different sectors to improve diversification.'} ` +
      `Overall, this portfolio ${parseFloat(weightedRisk) <= 50 ? 'presents a favorable risk-return balance suitable for impact-focused investors.' : 'carries elevated risk but offers high potential for pharmaceutical market development impact.'}`
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6">
      <h1 className="text-xl font-bold mb-6">Portfolio Builder</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Available */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold mb-4">Available Clients</h3>
          <div className="space-y-2">
            {availableClients.map(c => (
              <div key={c.id} className="flex items-center justify-between border border-border rounded-md p-3">
                <div>
                  <p className="text-sm font-medium">{c.companyName}</p>
                  <p className="text-xs text-muted-foreground">{c.sector} · {c.location} · Risk: <span className="font-mono">{c.riskScore}</span></p>
                </div>
                <button onClick={() => addToPortfolio(c.id)}
                  className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
            ))}
            {availableClients.length === 0 && <p className="text-xs text-muted-foreground">All clients added to portfolio</p>}
          </div>
        </div>

        {/* Right: Portfolio */}
        <div className="space-y-4">
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Your Portfolio</h3>
            {portfolioClients.length === 0 ? (
              <p className="text-xs text-muted-foreground">Add clients from the left panel</p>
            ) : (
              <div className="space-y-3">
                {portfolioClients.map(p => (
                  <div key={p.clientId} className="flex items-center gap-3 border border-border rounded-md p-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.client.companyName}</p>
                      <p className="text-xs text-muted-foreground">{p.client.sector}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">$</span>
                      <input type="number" value={p.allocation || ''} onChange={e => updateAllocation(p.clientId, parseInt(e.target.value) || 0)}
                        className="w-28 bg-muted rounded-md px-2 py-1 text-xs font-mono border-none focus:outline-none focus:ring-1 focus:ring-ring"
                        placeholder="Amount" />
                    </div>
                    <button onClick={() => removeFromPortfolio(p.clientId)} className="p-1 text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-lg border border-border p-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Total Allocated</p>
                  <p className="font-mono text-sm font-bold">${totalAllocated.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-warning" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Weighted Risk</p>
                  <p className="font-mono text-sm font-bold">{weightedRisk}</p>
                </div>
              </div>
            </div>
            {Object.keys(sectorBreakdown).length > 0 && (
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Sector Diversification</p>
                <div className="flex gap-1 flex-wrap">
                  {Object.entries(sectorBreakdown).map(([k, v]) => (
                    <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary">{k}: ${v.toLocaleString()}</span>
                  ))}
                </div>
              </div>
            )}
            {Object.keys(locationBreakdown).length > 0 && (
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Location Diversification</p>
                <div className="flex gap-1 flex-wrap">
                  {Object.entries(locationBreakdown).map(([k, v]) => (
                    <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/20 text-secondary"><MapPin className="w-2.5 h-2.5 inline" /> {k}: ${v.toLocaleString()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={generateSummary}
              className="text-xs px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80">
              Generate Portfolio Summary
            </button>
            <button onClick={() => { toast({ title: 'Portfolio committed!', description: 'Your portfolio has been saved.' }); }}
              className="text-xs px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              Commit Portfolio
            </button>
          </div>

          {summary && (
            <div className="bg-card rounded-lg border border-primary/30 p-4" style={{ background: 'linear-gradient(135deg, hsla(160,100%,45%,0.05), transparent)' }}>
              <p className="text-xs text-muted-foreground">{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
