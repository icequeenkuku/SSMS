import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { getRiskBandBg } from '@/data/mockData';
import type { PipelineStage } from '@/data/mockData';
import { Check, Circle, Clock, FileText, Plus } from 'lucide-react';

export default function ClientHome() {
  const { clients, setClients } = useApp();
  // Show a pre-populated example client view (NovaMed)
  const client = clients[0];
  const [newPipeline, setNewPipeline] = useState({ medicineName: '', category: '', stage: 'Pre-submission' as PipelineStage, expectedApproval: '', estimatedRevenueImpact: 0 });
  const [showForm, setShowForm] = useState(false);

  const steps = ['Submitted', 'Under Review', 'AI Assessment', 'Decision', 'Funded'];
  const currentStepIdx = steps.indexOf(client.applicationStep);

  const addPipeline = () => {
    if (!newPipeline.medicineName) return;
    setClients(prev => prev.map(c => c.id !== client.id ? c : {
      ...c, pipeline: [...c.pipeline, { ...newPipeline, id: `p${Date.now()}` }]
    }));
    setNewPipeline({ medicineName: '', category: '', stage: 'Pre-submission', expectedApproval: '', estimatedRevenueImpact: 0 });
    setShowForm(false);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-6 space-y-6">
      <h1 className="text-xl font-bold">Client Dashboard</h1>
      <p className="text-xs text-muted-foreground">Viewing as: <span className="text-foreground font-medium">{client.companyName}</span></p>

      {/* Application Status */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold mb-4">Application Status</h3>
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] ${
                i <= currentStepIdx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {i < currentStepIdx ? <Check className="w-3 h-3" /> : i === currentStepIdx ? <Clock className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
              </div>
              <span className={`text-[10px] ${i <= currentStepIdx ? 'font-semibold' : 'text-muted-foreground'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < currentStepIdx ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* AI Results (read-only) */}
      {client.aiAssessment && (
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-semibold mb-3">AI Assessment Results</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase">Risk Level</p>
              <p className={`font-mono text-lg font-bold ${client.aiAssessment.riskLevel === 'Low' ? 'text-primary' : 'text-warning'}`}>{client.aiAssessment.riskLevel}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase">Repayment Likelihood</p>
              <p className="font-mono text-lg font-bold text-primary">{client.aiAssessment.repaymentLikelihood}%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase">Recommendation</p>
              <span className={`text-sm px-2 py-0.5 rounded-full font-bold ${
                client.aiAssessment.recommendation === 'Fund' ? 'bg-primary/20 text-primary' : 'bg-warning/20 text-warning'
              }`}>
                {client.aiAssessment.recommendation === 'Fund' ? '✅' : '⚠️'} {client.aiAssessment.recommendation}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Regulatory Pipeline */}
      <div className="bg-card rounded-lg border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Regulatory Pipeline Tracker</h3>
          <button onClick={() => setShowForm(!showForm)} className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add Medicine
          </button>
        </div>
        {showForm && (
          <div className="border border-border rounded-md p-4 mb-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input value={newPipeline.medicineName} onChange={e => setNewPipeline(p => ({ ...p, medicineName: e.target.value }))}
                placeholder="Medicine Name" className="bg-muted rounded-md px-3 py-2 text-xs border-none focus:outline-none focus:ring-1 focus:ring-ring" />
              <input value={newPipeline.category} onChange={e => setNewPipeline(p => ({ ...p, category: e.target.value }))}
                placeholder="Category" className="bg-muted rounded-md px-3 py-2 text-xs border-none focus:outline-none focus:ring-1 focus:ring-ring" />
              <select value={newPipeline.stage} onChange={e => setNewPipeline(p => ({ ...p, stage: e.target.value as PipelineStage }))}
                className="bg-muted rounded-md px-3 py-2 text-xs border-none focus:outline-none focus:ring-1 focus:ring-ring">
                {['Pre-submission', 'Submitted', 'Under Review', 'Approved', 'Rejected'].map(s => <option key={s}>{s}</option>)}
              </select>
              <input type="date" value={newPipeline.expectedApproval} onChange={e => setNewPipeline(p => ({ ...p, expectedApproval: e.target.value }))}
                className="bg-muted rounded-md px-3 py-2 text-xs border-none focus:outline-none focus:ring-1 focus:ring-ring" />
              <input type="number" value={newPipeline.estimatedRevenueImpact || ''} onChange={e => setNewPipeline(p => ({ ...p, estimatedRevenueImpact: parseInt(e.target.value) || 0 }))}
                placeholder="Revenue Impact (USD)" className="bg-muted rounded-md px-3 py-2 text-xs border-none focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <button onClick={addPipeline} className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground">Add</button>
          </div>
        )}
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border text-muted-foreground text-left">
            <th className="pb-2">Medicine</th><th className="pb-2">Category</th><th className="pb-2">Stage</th><th className="pb-2">Expected Approval</th><th className="pb-2 text-right">Revenue Impact</th>
          </tr></thead>
          <tbody>{client.pipeline.map(p => (
            <tr key={p.id} className="border-b border-border/50">
              <td className="py-2 font-medium">{p.medicineName}</td>
              <td className="py-2">{p.category}</td>
              <td className="py-2"><span className={`text-[10px] px-2 py-0.5 rounded-full ${
                p.stage === 'Approved' ? 'bg-primary/20 text-primary' : p.stage === 'Rejected' ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground'
              }`}>{p.stage}</span></td>
              <td className="py-2">{p.expectedApproval}</td>
              <td className="py-2 text-right font-mono">${p.estimatedRevenueImpact.toLocaleString()}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
