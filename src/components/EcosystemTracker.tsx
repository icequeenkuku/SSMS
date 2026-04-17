import { useApp } from '@/contexts/AppContext';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export default function EcosystemTracker() {
  const { clients } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-foreground">Ecosystem Liaison Tracker — System 3</h2>
        <p className="text-sm text-muted-foreground">Constant structured contact with MoHCC, NatPharm, MCAZ, RBZ — per manufacturer alignment log</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 flex flex-col justify-between">
          <span className="text-xs text-muted-foreground mb-2 block">NatPharm MOU Status</span>
          <div>
            <span className="text-2xl font-bold">6/8</span>
            <p className="text-[10px] text-muted-foreground mt-1">Signed binding MOUs</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 flex flex-col justify-between">
          <span className="text-xs text-muted-foreground mb-2 block">MoHCC Alignment</span>
          <div>
            <span className="text-2xl font-bold">Active</span>
            <p className="text-[10px] text-muted-foreground mt-1">Last meeting: 8 Jan 2025</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 flex flex-col justify-between">
          <span className="text-xs text-muted-foreground mb-2 block">MCAZ Queue Positions</span>
          <div>
            <span className="text-2xl font-bold">3 pending</span>
            <p className="text-[10px] text-muted-foreground mt-1">Avg wait: 6 weeks</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 flex flex-col justify-between">
          <span className="text-xs text-muted-foreground mb-2 block">RBZ Escrow Status</span>
          <div>
            <span className="text-2xl font-bold text-primary">Compliant</span>
            <p className="text-[10px] text-muted-foreground mt-1">All covenants current</p>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-warning/10 border border-warning/20 rounded-md p-3 flex items-start gap-2 text-warning">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p className="text-xs font-medium">
          ZimPharm Ltd: NatPharm MOU not signed — disbursement hold in effect. Gulf Drug Co: MCAZ inspection overdue by 3 weeks (Amber Gate condition). Escalation required.
        </p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Per-Manufacturer Ecosystem Status</h3>
          <p className="text-[10px] text-muted-foreground">All live engagement tracked. Green = compliant · Amber = action needed · Red = breach</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left uppercase tracking-wider">
                <th className="pb-3 font-medium">Manufacturer</th>
                <th className="pb-3 font-medium">NatPharm MOU</th>
                <th className="pb-3 font-medium">MoHCC Alignment</th>
                <th className="pb-3 font-medium">MCAZ Inspection</th>
                <th className="pb-3 font-medium">NMRL Queue</th>
                <th className="pb-3 font-medium">RBZ Covenant</th>
                <th className="pb-3 font-medium">Policy Workstream</th>
                <th className="pb-3 font-medium">Last Contact</th>
                <th className="pb-3 font-medium">Next Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 font-medium text-sm">Varichem Pharmaceuticals</td>
                <td className="py-3"><span className="px-2 py-1 rounded bg-primary/20 text-primary">✓ Signed</span></td>
                <td className="py-3 text-primary">Aligned</td>
                <td className="py-3 text-primary">Passed Jan 2025</td>
                <td className="py-3 text-primary">Cleared</td>
                <td className="py-3 text-primary">Compliant</td>
                <td className="py-3 text-blue-400">GMP mandate lobbying</td>
                <td className="py-3 text-muted-foreground text-[10px]">14 Jan 2025</td>
                <td className="py-3 text-blue-400">Quarterly review Feb</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-medium text-sm">CAPS Pharmaceuticals</td>
                <td className="py-3"><span className="px-2 py-1 rounded bg-primary/20 text-primary">✓ Signed</span></td>
                <td className="py-3 text-primary">Aligned</td>
                <td className="py-3 text-primary">Passed Dec 2024</td>
                <td className="py-3 text-primary">Cleared</td>
                <td className="py-3 text-primary">Compliant</td>
                <td className="py-3 text-blue-400">Import duty exemption</td>
                <td className="py-3 text-muted-foreground text-[10px]">12 Jan 2025</td>
                <td className="py-3 text-blue-400">M5 annual review Mar</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-medium text-sm">Pharmanova (Pvt) Ltd</td>
                <td className="py-3"><span className="px-2 py-1 rounded bg-primary/20 text-primary">✓ Signed</span></td>
                <td className="py-3 text-primary">Aligned</td>
                <td className="py-3 text-warning">Scheduled Feb 2025</td>
                <td className="py-3 text-warning">Queue pos. 4</td>
                <td className="py-3 text-primary">Compliant</td>
                <td className="py-3 text-blue-400">Monitoring</td>
                <td className="py-3 text-muted-foreground text-[10px]">10 Jan 2025</td>
                <td className="py-3 text-blue-400">MCAZ pre-inspection prep</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-medium text-sm">Datlabs (Pvt) Ltd</td>
                <td className="py-3"><span className="px-2 py-1 rounded bg-primary/20 text-primary">✓ Signed</span></td>
                <td className="py-3 text-blue-400">Pending briefing</td>
                <td className="py-3 text-warning">Queue pos. 7</td>
                <td className="py-3 text-warning">Queue pos. 6</td>
                <td className="py-3 text-primary">Compliant</td>
                <td className="py-3 text-blue-400">Monitoring</td>
                <td className="py-3 text-muted-foreground text-[10px]">08 Jan 2025</td>
                <td className="py-3 text-blue-400">MoHCC briefing needed</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-medium text-sm">Gulf Drug Co</td>
                <td className="py-3"><span className="px-2 py-1 rounded bg-primary/20 text-primary">✓ Signed</span></td>
                <td className="py-3 text-blue-400">Needs briefing</td>
                <td className="py-3 text-destructive font-bold">OVERDUE 3 WEEKS</td>
                <td className="py-3 text-warning">Queue pos. 8</td>
                <td className="py-3 text-primary">Compliant</td>
                <td className="py-3 text-warning">Not started</td>
                <td className="py-3 text-muted-foreground text-[10px]">05 Jan 2025</td>
                <td className="py-3 text-destructive font-bold">AMBER GATE — ESCALATE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
