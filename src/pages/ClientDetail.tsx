import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRiskBandBg, getGateColor } from '@/data/mockData';
import { ArrowLeft, DollarSign, Target, CheckCircle, Percent, Lock, Unlock, Check, Circle, Play, Users, Leaf, Factory, ShieldCheck, Globe } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ClientDetail() {
  const { id } = useParams();
  const { clients, setClients } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const client = clients.find(c => c.id === id);
  const [newComment, setNewComment] = useState('');

  if (!client) return <div className="p-10 text-center text-muted-foreground">Client not found</div>;

  const milestoneDone = client.milestones.filter(m => m.status === 'Completed').length;

  const handleMarkComplete = (milestoneId: string) => {
    setClients(prev => prev.map(c => {
      if (c.id !== id) return c;
      const milestones = c.milestones.map(m => m.id === milestoneId ? { ...m, status: 'Completed' as const, date: new Date().toISOString().split('T')[0] } : m);
      const tranches = c.tranches.map(t => t.tiedMilestone === milestoneId ? { ...t, status: 'Unlocked' as const } : t);
      return { ...c, milestones, tranches };
    }));
    toast({ title: 'Milestone completed', description: 'Associated tranche has been unlocked.' });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setClients(prev => prev.map(c => {
      if (c.id !== id) return c;
      return { ...c, comments: [...c.comments, {
        id: `c${Date.now()}`, author: 'Current Donor', role: 'Donor' as const, text: newComment,
        date: new Date().toISOString().split('T')[0], sentiment: 'Neutral' as const,
      }]};
    }));
    setNewComment('');
  };

  const sentimentColor = (s: string) => s === 'Positive' ? 'bg-primary/20 text-primary' : s === 'Cautious' ? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground';

  // Peer comparison data
  const platformAvg = 50;
  const sectorAvg = client.sector === 'Generics' ? 35 : client.sector === 'Vaccines' ? 48 : 62;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 rounded-md hover:bg-accent transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">{client.companyName}</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{client.sector}</span>
            <span className="text-xs text-muted-foreground">{client.location}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getRiskBandBg(client.riskBand)}`}>{client.riskBand}</span>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getGateColor(client.disbursementGate)}`}>
          Gate: {client.disbursementGate}
        </span>
      </div>

      {/* Stat Boxes */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Capital Deployed', value: `$${client.capitalDeployed.toLocaleString()}`, icon: DollarSign },
          { label: 'Portfolio Weight', value: `${client.portfolioWeight}%`, icon: Percent },
          { label: 'Milestones Done', value: `${milestoneDone}/${client.milestones.length}`, icon: Target },
          { label: 'Parameter Match', value: client.aiAssessment ? `${client.aiAssessment.parameterMatchScore}%` : 'N/A', icon: CheckCircle },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className="font-mono text-lg font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted border border-border">
          {['Overview', 'Risk Scores', 'Milestones & Tranches', 'ESG Impact', 'Regulatory Pipeline', 'Documents', 'Comments', 'AI Assessment'].map(t => (
            <TabsTrigger key={t} value={t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')} className="text-xs data-[state=active]:bg-card">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg border border-border p-5 space-y-3">
              <h3 className="text-sm font-semibold">Application Details</h3>
              {[
                ['Contact Person', client.contactPerson],
                ['Amount Requested', `$${client.amountRequested.toLocaleString()}`],
                ['Purpose', client.purpose],
                ['Monthly Income', `$${client.monthlyIncome.toLocaleString()}`],
                ['Repayment Timeline', `${client.repaymentTimeline} months`],
                ['Interest Rate', `${client.interestRate}%`],
                ['Local Sourcing', `${client.localSourcingPercentage}%`],
                ['MCAZ Compliant', client.mcazCompliant ? 'Yes' : 'No'],
                ['NatPharm MOU', client.natPharmMOU ? 'Yes' : 'No'],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-right max-w-[60%]">{val}</span>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="text-sm font-semibold mb-3">Funding History</h3>
              {client.fundingHistory.length === 0 ? (
                <p className="text-xs text-muted-foreground">No funding history</p>
              ) : (
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border text-muted-foreground"><th className="pb-2 text-left">Year</th><th className="pb-2 text-right">Amount</th><th className="pb-2 text-right">Status</th></tr></thead>
                  <tbody>
                    {client.fundingHistory.map(f => (
                      <tr key={f.year} className="border-b border-border/50">
                        <td className="py-2">{f.year}</td>
                        <td className="py-2 text-right font-mono">${f.amount.toLocaleString()}</td>
                        <td className="py-2 text-right">{f.repaidOnTime ? <span className="text-primary">On time</span> : <span className="text-warning">Late</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Risk Scores */}
        <TabsContent value="risk-scores" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">Risk Dimensions</h3>
              <div className="space-y-3">
                {client.riskDimensions.map(d => (
                  <div key={d.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{d.label} <span className="text-muted-foreground">({d.weight}%)</span></span>
                      <span className="font-mono">{d.score}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{
                        width: `${d.score}%`,
                        backgroundColor: d.score <= 30 ? 'hsl(160,100%,45%)' : d.score <= 50 ? 'hsl(218,60%,64%)' : d.score <= 70 ? 'hsl(38,92%,50%)' : 'hsl(0,84%,60%)',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Composite Score</span>
                  <span className={`font-mono text-lg font-bold ${getRiskBandBg(client.riskBand).split(' ')[1]}`}>{client.riskScore}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskBandBg(client.riskBand)}`}>{client.riskBand}</span>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">Peer Comparison</h3>
              <div className="space-y-4">
                {[
                  { label: 'This Client', score: client.riskScore, color: 'bg-primary' },
                  { label: 'Platform Average', score: platformAvg, color: 'bg-secondary' },
                  { label: `${client.sector} Average`, score: sectorAvg, color: 'bg-warning' },
                ].map(p => (
                  <div key={p.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{p.label}</span>
                      <span className="font-mono">{p.score}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Milestones & Tranches */}
        <TabsContent value="milestones-&-tranches" className="space-y-4 mt-4">
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Milestones</h3>
            <div className="flex items-center gap-2 mb-6">
              {client.milestones.map((m, i) => (
                <div key={m.id} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    m.status === 'Completed' ? 'bg-primary/20 border-primary' :
                    m.status === 'In Progress' ? 'bg-secondary/20 border-secondary' :
                    'bg-muted border-border'
                  }`}>
                    {m.status === 'Completed' ? <Check className="w-4 h-4 text-primary" /> :
                     m.status === 'In Progress' ? <Play className="w-4 h-4 text-secondary" /> :
                     <Circle className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  {i < client.milestones.length - 1 && <div className={`w-8 h-0.5 ${m.status === 'Completed' ? 'bg-primary' : 'bg-border'}`} />}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {client.milestones.map(m => (
                <div key={m.id} className="flex items-center justify-between border border-border rounded-md p-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-muted-foreground">{m.label}</span>
                    <div>
                      <p className="text-sm font-medium">{m.title}</p>
                      <p className="text-xs text-muted-foreground">{m.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{m.date}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      m.status === 'Completed' ? 'bg-primary/20 text-primary' :
                      m.status === 'In Progress' ? 'bg-secondary/20 text-secondary' :
                      'bg-muted text-muted-foreground'
                    }`}>{m.status === 'Completed' ? '✓' : m.status === 'In Progress' ? '▶' : '○'} {m.status}</span>
                    {m.status !== 'Completed' && (
                      <button onClick={() => handleMarkComplete(m.id)}
                        className="text-[10px] px-2 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Tranches</h3>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-2">Tranche</th><th className="pb-2 text-right">Amount</th><th className="pb-2">Tied Milestone</th><th className="pb-2">Status</th>
              </tr></thead>
              <tbody>
                {client.tranches.map(t => (
                  <tr key={t.id} className="border-b border-border/50">
                    <td className="py-2 font-mono">#{t.id}</td>
                    <td className="py-2 text-right font-mono">${t.amount.toLocaleString()}</td>
                    <td className="py-2">{t.tiedMilestone}</td>
                    <td className="py-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${
                        t.status === 'Disbursed' ? 'bg-primary/20 text-primary' :
                        t.status === 'Unlocked' ? 'bg-secondary/20 text-secondary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {t.status === 'Locked' ? <Lock className="w-3 h-3" /> : t.status === 'Unlocked' ? <Unlock className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                        {t.status === 'Disbursed' ? '✅' : ''} {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* ESG Impact */}
        <TabsContent value="esg-impact" className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Jobs Created (Direct)', value: client.esgImpact.jobsCreatedDirect, icon: Users, suffix: '' },
              { label: 'Jobs Created (Indirect)', value: client.esgImpact.jobsCreatedIndirect, icon: Users, suffix: '' },
              { label: 'Local Raw Materials Sourced', value: client.esgImpact.localRawMaterialsSourced, icon: Leaf, suffix: '/yr', prefix: '$' },
              { label: 'Medicine Product Lines', value: client.esgImpact.medicineProductLines, icon: Factory, suffix: '' },
              { label: 'Import Substitution Impact', value: client.esgImpact.importSubstitutionImpact, icon: ShieldCheck, suffix: '/yr', prefix: '$' },
              { label: 'Est. CO₂ Reduction', value: client.esgImpact.estimatedCO2Reduction, icon: Globe, suffix: ' tons/yr' },
            ].map(e => (
              <div key={e.label} className="bg-card rounded-lg border border-border p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <e.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{e.label}</p>
                  <p className="font-mono text-xl font-bold">
                    {e.prefix || ''}{e.value.toLocaleString()}{e.suffix || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Regulatory Pipeline */}
        <TabsContent value="regulatory-pipeline" className="mt-4">
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">MCAZ Registration Pipeline</h3>
            {client.pipeline.length === 0 ? <p className="text-xs text-muted-foreground">No pipeline data</p> : (
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
            )}
          </div>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents" className="mt-4 space-y-4">
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Documents</h3>
            <div className="space-y-2">
              {client.documents.map(d => (
                <div key={d.id} className="flex items-center justify-between border border-border rounded-md p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium">{d.filename}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{d.type}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${d.uploadedBy === 'Client' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>{d.uploadedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">{d.uploadDate}</span>
                    <button className="text-[10px] px-2 py-1 rounded bg-accent text-accent-foreground">View</button>
                    <button className="text-[10px] px-2 py-1 rounded bg-accent text-accent-foreground">Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Drag & drop files here or click to upload</p>
            <button className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground">Browse Files</button>
          </div>
        </TabsContent>

        {/* Comments */}
        <TabsContent value="comments" className="mt-4 space-y-4">
          <div className="bg-card rounded-lg border border-border p-5 space-y-3">
            {client.comments.map(c => (
              <div key={c.id} className="border border-border rounded-md p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold">{c.author}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${c.role === 'Donor' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>{c.role}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${sentimentColor(c.sentiment)}`}>{c.sentiment}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{c.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <textarea value={newComment} onChange={e => setNewComment(e.target.value)}
              placeholder="Add a comment..." className="w-full bg-muted rounded-md p-3 text-xs resize-none h-20 border-none focus:outline-none focus:ring-1 focus:ring-ring" />
            <div className="flex justify-end mt-2">
              <button onClick={handleAddComment} className="text-xs px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Post Comment
              </button>
            </div>
          </div>
        </TabsContent>

        {/* AI Assessment */}
        <TabsContent value="ai-assessment" className="mt-4">
          {client.aiAssessment ? (
            <div className="bg-card rounded-lg border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">AI Assessment Complete</h3>
                  <p className="text-xs text-muted-foreground">Assessed on {client.aiAssessment.date}</p>
                </div>
                <span className={`text-sm px-3 py-1.5 rounded-full font-bold ${
                  client.aiAssessment.recommendation === 'Fund' ? 'bg-primary/20 text-primary' :
                  client.aiAssessment.recommendation === 'Fund with Conditions' ? 'bg-warning/20 text-warning' :
                  'bg-destructive/20 text-destructive'
                }`}>
                  {client.aiAssessment.recommendation === 'Fund' ? '✅' : client.aiAssessment.recommendation === 'Decline' ? '❌' : '⚠️'} {client.aiAssessment.recommendation}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{client.aiAssessment.recommendationText.substring(0, 150)}...</p>
              <button onClick={() => navigate(`/ai-results/${client.id}`)}
                className="text-xs px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                View Full Report
              </button>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border p-10 text-center space-y-4">
              <h3 className="text-sm font-semibold">Run AI Assessment</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Analyse this client's full profile using AI to generate a risk report, repayment likelihood, and funding recommendation.
              </p>
              <button onClick={() => navigate(`/ai-results/${client.id}?run=true`)}
                className="text-sm px-6 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Run AI Assessment
              </button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
