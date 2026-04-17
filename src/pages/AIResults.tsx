import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { AIAssessment } from '@/data/mockData';

const mockAIResults: Record<string, AIAssessment> = {
  biozim: {
    riskLevel: 'Medium',
    riskExplanation: 'BioZim Labs shows moderate risk driven by a late repayment in 2024 and the absence of a NatPharm MOU. However, strong MCAZ compliance and critical cold-chain infrastructure provide stabilizing factors.',
    repaymentLikelihood: 72,
    repaymentDrivers: 'Steady monthly income ($62K), single late repayment in 3-year history, growing vaccine demand in southern Zimbabwe, and strong institutional relationships.',
    parameterMatchScore: 60,
    parameters: [
      { name: 'MCAZ Compliance', passed: true, comment: 'BSL-2 certified, current GMP status' },
      { name: 'NatPharm MOU', passed: false, comment: 'No MOU signed — limits distribution' },
      { name: 'Local Sourcing >60%', passed: false, comment: '45% local sourcing — below threshold' },
      { name: 'Repayment History', passed: false, comment: 'One late repayment in Q4 2024' },
      { name: 'Manufacturing Capacity >80%', passed: true, comment: 'Operating at 85% fill-finish capacity' },
    ],
    riskFlags: [
      { severity: 'High', description: 'NatPharm MOU not secured — single largest distribution risk' },
      { severity: 'Medium', description: 'Late repayment in Q4 2024 indicates cash flow pressure' },
      { severity: 'Low', description: 'Local sourcing below target but improving quarter-over-quarter' },
    ],
    bestCase: {
      repaymentTimeline: 'Full repayment within 42 months with NatPharm MOU secured',
      revenueGrowth: '28% growth driven by Hepatitis B vaccine approval and distribution expansion',
      importSubstitution: '$950K annual substitution, rising to $1.8M with expanded coverage',
    },
    worstCase: {
      defaultLikelihood: '18% probability based on financial stress testing',
      riskTriggers: 'Cold chain equipment failure, NatPharm MOU rejection, continued cash flow issues',
      mitigation: 'Require quarterly financial reviews, establish equipment maintenance fund, accelerate NatPharm engagement',
    },
    recommendation: 'Fund with Conditions',
    recommendationText: 'BioZim Labs presents a strategically important cold-chain infrastructure investment with moderate risk. We recommend funding with specific conditions to mitigate identified risks.',
    conditions: [
      'NatPharm MOU must be signed within 90 days of next tranche',
      'Quarterly financial reporting with cash flow projections',
      'Equipment maintenance reserve fund of $15,000 must be established',
      'Local sourcing improvement plan to reach 60% within 12 months',
    ],
    date: new Date().toISOString().split('T')[0],
  },
  curelocal: {
    riskLevel: 'High',
    riskExplanation: 'CureLocal Pharma is a new applicant with no funding history, pending MCAZ registration, and limited manufacturing capacity. While the herbal medicine sector has growth potential, the regulatory uncertainty and small scale create significant risk.',
    repaymentLikelihood: 45,
    repaymentDrivers: 'Limited monthly income ($28K), no repayment track record, uncertain MCAZ approval timeline, but strong local sourcing (92%) and growing market demand for standardized herbal medicines.',
    parameterMatchScore: 40,
    parameters: [
      { name: 'MCAZ Compliance', passed: false, comment: 'Registration pending — no clear timeline' },
      { name: 'NatPharm MOU', passed: false, comment: 'Cannot pursue without MCAZ registration' },
      { name: 'Local Sourcing >60%', passed: true, comment: '92% — exceptionally high local content' },
      { name: 'Repayment History', passed: false, comment: 'No prior funding — cannot assess' },
      { name: 'Manufacturing Capacity >80%', passed: false, comment: 'Manual facility, 5K units/month — below threshold' },
    ],
    riskFlags: [
      { severity: 'High', description: 'MCAZ registration for herbal products has no precedent — outcome uncertain' },
      { severity: 'High', description: 'No financial track record with institutional lenders' },
      { severity: 'Medium', description: 'Manufacturing capacity requires significant capital upgrade' },
      { severity: 'Low', description: 'Single-person management team — key person risk' },
    ],
    bestCase: {
      repaymentTimeline: 'Repayment beginning month 12 if MCAZ approves within 6 months',
      revenueGrowth: '50% growth potential in underserved herbal medicine market',
      importSubstitution: 'New category — potential $500K annual import substitution',
    },
    worstCase: {
      defaultLikelihood: '42% probability — primarily driven by MCAZ registration risk',
      riskTriggers: 'MCAZ rejection, insufficient demand for standardized herbal products, equipment delays',
      mitigation: 'Phased funding approach, require MCAZ pre-submission meeting outcomes before first tranche',
    },
    recommendation: 'Decline',
    recommendationText: 'CureLocal Pharma presents innovative potential but excessive risk for direct funding at this stage. The absence of MCAZ compliance, no funding history, and limited manufacturing capacity create a risk profile beyond acceptable thresholds. We recommend the applicant pursue MCAZ pre-submission consultation and return with a clearer regulatory pathway.',
    date: new Date().toISOString().split('T')[0],
  },
};

export default function AIResults() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { clients, setClients } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const client = clients.find(c => c.id === id);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [assessment, setAssessment] = useState<AIAssessment | null>(client?.aiAssessment || null);

  useEffect(() => {
    if (searchParams.get('run') === 'true' && !assessment) {
      setLoading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2;
        });
      }, 60);
      const timer = setTimeout(() => {
        setLoading(false);
        const result = id && mockAIResults[id] ? mockAIResults[id] : mockAIResults.biozim;
        setAssessment(result);
        if (id) {
          setClients(prev => prev.map(c => c.id === id ? { ...c, aiAssessment: result } : c));
        }
      }, 3500);
      return () => { clearInterval(interval); clearTimeout(timer); };
    }
  }, []);

  if (!client) return <div className="p-10 text-center text-muted-foreground">Client not found</div>;

  if (loading) {
    return (
      <div className="max-w-lg mx-auto mt-32 text-center space-y-6">
        <h2 className="text-lg font-semibold">Analysing client data…</h2>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground font-mono">{progress}%</p>
      </div>
    );
  }

  if (!assessment) return <div className="p-10 text-center text-muted-foreground">No assessment data</div>;

  const riskColor = assessment.riskLevel === 'Low' ? 'text-primary bg-primary/20' : assessment.riskLevel === 'Medium' ? 'text-warning bg-warning/20' : assessment.riskLevel === 'High' ? 'text-destructive bg-destructive/20' : 'text-destructive bg-destructive/20';
  const recBadge = assessment.recommendation === 'Fund' ? '✅ bg-primary/20 text-primary' : assessment.recommendation === 'Fund with Conditions' ? '⚠️ bg-warning/20 text-warning' : '❌ bg-destructive/20 text-destructive';
  const [recIcon, ...recClasses] = recBadge.split(' ');

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{client.companyName} — AI Assessment</h1>
          <p className="text-xs text-muted-foreground">{client.sector} · {client.location} · {assessment.date}</p>
        </div>
        <span className={`text-sm px-4 py-2 rounded-full font-bold ${recClasses.join(' ')}`}>
          {recIcon} {assessment.recommendation}
        </span>
      </div>

      {/* Section 1 — Risk Level */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold mb-3">Risk Level</h3>
        <span className={`text-lg font-bold px-3 py-1 rounded-full ${riskColor}`}>{assessment.riskLevel}</span>
        <p className="text-xs text-muted-foreground mt-3">{assessment.riskExplanation}</p>
      </div>

      {/* Section 2 — Repayment */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold mb-3">Repayment Likelihood</h3>
        <span className="font-mono text-4xl font-bold text-primary">{assessment.repaymentLikelihood}%</span>
        <p className="text-xs text-muted-foreground mt-2">{assessment.repaymentDrivers}</p>
      </div>

      {/* Section 3 — Parameter Match */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold mb-3">Parameter Match Score: <span className="font-mono text-primary">{assessment.parameterMatchScore}%</span></h3>
        <table className="w-full text-xs mt-2">
          <thead><tr className="border-b border-border text-muted-foreground"><th className="pb-2 text-left">Parameter</th><th className="pb-2">Status</th><th className="pb-2 text-left">Comment</th></tr></thead>
          <tbody>{assessment.parameters.map(p => (
            <tr key={p.name} className="border-b border-border/50">
              <td className="py-2 font-medium">{p.name}</td>
              <td className="py-2 text-center">{p.passed ? '✅' : '❌'}</td>
              <td className="py-2 text-muted-foreground">{p.comment}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* Section 4 — Risk Flags */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold mb-3">Key Risk Flags</h3>
        <ul className="space-y-2">
          {assessment.riskFlags.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded mt-0.5 ${
                f.severity === 'High' ? 'bg-destructive/20 text-destructive' :
                f.severity === 'Medium' ? 'bg-warning/20 text-warning' :
                'bg-muted text-muted-foreground'
              }`}>{f.severity}</span>
              <span className="text-xs text-muted-foreground">{f.description}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 5 — Scenarios */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-primary/30 p-5" style={{ background: 'linear-gradient(135deg, hsla(160,100%,45%,0.05), transparent)' }}>
          <h3 className="text-sm font-semibold text-primary mb-3">Best Case</h3>
          <div className="space-y-2 text-xs">
            <p><span className="text-muted-foreground">Repayment: </span>{assessment.bestCase.repaymentTimeline}</p>
            <p><span className="text-muted-foreground">Revenue Growth: </span>{assessment.bestCase.revenueGrowth}</p>
            <p><span className="text-muted-foreground">Import Substitution: </span>{assessment.bestCase.importSubstitution}</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-destructive/30 p-5" style={{ background: 'linear-gradient(135deg, hsla(0,84%,60%,0.05), transparent)' }}>
          <h3 className="text-sm font-semibold text-destructive mb-3">Worst Case</h3>
          <div className="space-y-2 text-xs">
            <p><span className="text-muted-foreground">Default Likelihood: </span>{assessment.worstCase.defaultLikelihood}</p>
            <p><span className="text-muted-foreground">Risk Triggers: </span>{assessment.worstCase.riskTriggers}</p>
            <p><span className="text-muted-foreground">Mitigation: </span>{assessment.worstCase.mitigation}</p>
          </div>
        </div>
      </div>

      {/* Section 6 — Final Recommendation */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold mb-3">Final Recommendation</h3>
        <p className="text-xs text-muted-foreground">{assessment.recommendationText}</p>
        {assessment.conditions && (
          <div className="mt-3">
            <p className="text-xs font-semibold mb-1">Conditions:</p>
            <ul className="list-disc list-inside space-y-1">
              {assessment.conditions.map((c, i) => <li key={i} className="text-xs text-muted-foreground">{c}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => navigate(`/client/${client.id}`)} className="text-xs px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Back to Client Profile
        </button>
        <button onClick={() => toast({ title: 'Export started', description: 'PDF report will download shortly.' })}
          className="text-xs px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 flex items-center gap-1">
          <Download className="w-3 h-3" /> Export as PDF
        </button>
        <button onClick={() => navigate('/portfolio')}
          className="text-xs px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1">
          <Plus className="w-3 h-3" /> Add to My Portfolio
        </button>
      </div>
    </div>
  );
}
