import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft, Upload, X } from 'lucide-react';

export default function ClientApplication() {
  const { setClients } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: '', contactPerson: '', sector: 'Generics', location: '', amountRequested: 0, purpose: '',
    monthlyIncome: 0, repaymentTimeline: 12, interestRate: 0, localSourcingPercentage: 50,
    manufacturingCapacity: '', mcazCompliant: false, natPharmMOU: false,
  });
  const [files, setFiles] = useState<Record<string, { name: string; type: string }>>({});

  const docSlots = ['Government ID', 'MCAZ License/Certificate', 'Bank Statements', 'Business Registration', 'Proof of Income', 'Repayment Schedule', 'Business Plan'];

  const update = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    const newId = form.companyName.toLowerCase().replace(/\s+/g, '-');
    setClients(prev => [...prev, {
      id: newId, ...form, sector: form.sector as any,
      capitalDeployed: 0, capitalRepaid: 0, riskScore: 0, riskBand: 'Low' as const,
      portfolioWeight: 0, disbursementGate: 'Red' as const, status: 'Pending' as const,
      applicationStep: 'Submitted' as const,
      riskDimensions: [
        { label: 'Regulatory', score: 0, weight: 25 }, { label: 'Financial', score: 0, weight: 25 },
        { label: 'Operational', score: 0, weight: 20 }, { label: 'Market', score: 0, weight: 20 },
        { label: 'Governance', score: 0, weight: 10 },
      ],
      milestones: [], tranches: [], fundingHistory: [], pipeline: [], documents: [], comments: [],
      esgImpact: { jobsCreatedDirect: 0, jobsCreatedIndirect: 0, localRawMaterialsSourced: 0, medicineProductLines: 0, importSubstitutionImpact: 0, estimatedCO2Reduction: 0 },
      aiAssessment: null,
    }]);
    toast({ title: 'Application submitted!', description: 'Your application is now under review.' });
    navigate('/client/home');
  };

  const stepLabels = ['Company Info', 'Financials & Compliance', 'Documents'];

  const inputClass = "w-full bg-muted rounded-md px-3 py-2 text-sm border-none focus:outline-none focus:ring-1 focus:ring-ring";
  const labelClass = "text-xs font-medium text-muted-foreground mb-1 block";

  return (
    <div className="max-w-[700px] mx-auto px-6 py-6 space-y-6">
      <h1 className="text-xl font-bold">Application Form</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {stepLabels.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step > i + 1 ? 'bg-primary text-primary-foreground' : step === i + 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>{i + 1}</div>
            <span className={`text-xs ${step === i + 1 ? 'font-semibold' : 'text-muted-foreground'}`}>{s}</span>
            {i < 2 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-primary' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        {step === 1 && (
          <div className="space-y-4">
            <div><label className={labelClass}>Company Name</label><input value={form.companyName} onChange={e => update('companyName', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Contact Person</label><input value={form.contactPerson} onChange={e => update('contactPerson', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Sector</label>
              <select value={form.sector} onChange={e => update('sector', e.target.value)} className={inputClass}>
                {['Generics', 'Vaccines', 'Diagnostics', 'Herbal', 'Other'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div><label className={labelClass}>Location</label><input value={form.location} onChange={e => update('location', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Amount Requested (USD)</label><input type="number" value={form.amountRequested || ''} onChange={e => update('amountRequested', parseInt(e.target.value) || 0)} className={inputClass} /></div>
            <div><label className={labelClass}>Purpose / Use of Funds</label><textarea value={form.purpose} onChange={e => update('purpose', e.target.value)} className={`${inputClass} h-20 resize-none`} /></div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div><label className={labelClass}>Monthly Income (USD)</label><input type="number" value={form.monthlyIncome || ''} onChange={e => update('monthlyIncome', parseInt(e.target.value) || 0)} className={inputClass} /></div>
            <div><label className={labelClass}>Repayment Timeline (months)</label><input type="number" value={form.repaymentTimeline} onChange={e => update('repaymentTimeline', parseInt(e.target.value) || 0)} className={inputClass} /></div>
            <div><label className={labelClass}>Interest Rate Offered (%)</label><input type="number" step="0.1" value={form.interestRate || ''} onChange={e => update('interestRate', parseFloat(e.target.value) || 0)} className={inputClass} /></div>
            <div>
              <label className={labelClass}>Local Sourcing Percentage: <span className="font-mono text-primary">{form.localSourcingPercentage}%</span></label>
              <input type="range" min={0} max={100} value={form.localSourcingPercentage} onChange={e => update('localSourcingPercentage', parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary" />
            </div>
            <div><label className={labelClass}>Manufacturing Capacity</label><textarea value={form.manufacturingCapacity} onChange={e => update('manufacturingCapacity', e.target.value)} className={`${inputClass} h-16 resize-none`} /></div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <div onClick={() => update('mcazCompliant', !form.mcazCompliant)}
                  className={`w-10 h-5 rounded-full transition-colors ${form.mcazCompliant ? 'bg-primary' : 'bg-muted'} relative`}>
                  <div className={`w-4 h-4 rounded-full bg-foreground absolute top-0.5 transition-transform ${form.mcazCompliant ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-xs">MCAZ Compliant</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div onClick={() => update('natPharmMOU', !form.natPharmMOU)}
                  className={`w-10 h-5 rounded-full transition-colors ${form.natPharmMOU ? 'bg-primary' : 'bg-muted'} relative`}>
                  <div className={`w-4 h-4 rounded-full bg-foreground absolute top-0.5 transition-transform ${form.natPharmMOU ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-xs">NatPharm MOU Signed</span>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            {docSlots.map(slot => (
              <div key={slot} className="flex items-center justify-between border border-border rounded-md p-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs">{slot}</span>
                </div>
                {files[slot] ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary">{files[slot].name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{files[slot].type}</span>
                    <button onClick={() => setFiles(prev => { const n = { ...prev }; delete n[slot]; return n; })} className="text-muted-foreground hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setFiles(prev => ({ ...prev, [slot]: { name: `${slot.replace(/\//g, '_')}.pdf`, type: 'PDF' } }))}
                    className="text-[10px] px-2 py-1 rounded-md bg-accent text-accent-foreground">
                    Choose File
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)} className="text-xs px-4 py-2 rounded-md bg-accent text-accent-foreground flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Previous
          </button>
        ) : <div />}
        {step < 3 ? (
          <button onClick={() => setStep(s => s + 1)} className="text-xs px-4 py-2 rounded-md bg-primary text-primary-foreground flex items-center gap-1">
            Next <ChevronRight className="w-3 h-3" />
          </button>
        ) : (
          <button onClick={handleSubmit} className="text-xs px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
}
