export type Role = 'donor' | 'client';

export type Sector = 'Generics' | 'Vaccines' | 'Diagnostics' | 'Herbal' | 'Other';
export type RiskBand = 'Low' | 'Moderate' | 'Elevated' | 'High';
export type MilestoneStatus = 'Completed' | 'In Progress' | 'Pending';
export type TrancheStatus = 'Locked' | 'Unlocked' | 'Disbursed';
export type DisbursementGate = 'Green' | 'Amber' | 'Red' | 'Buffer';
export type PipelineStage = 'Pre-submission' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
export type ApplicationStep = 'Submitted' | 'Under Review' | 'AI Assessment' | 'Decision' | 'Funded';
export type AlertSeverity = 'critical' | 'warning' | 'watch';
export type Recommendation = 'Fund' | 'Fund with Conditions' | 'Decline';

export interface Milestone {
  id: string;
  label: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  date: string;
}

export interface Tranche {
  id: number;
  amount: number;
  tiedMilestone: string;
  status: TrancheStatus;
}

export interface RiskDimension {
  label: string;
  score: number;
  weight: number;
}

export interface FundingHistory {
  year: number;
  amount: number;
  repaidOnTime: boolean;
}

export interface ESGImpact {
  jobsCreatedDirect: number;
  jobsCreatedIndirect: number;
  localRawMaterialsSourced: number;
  medicineProductLines: number;
  importSubstitutionImpact: number;
  estimatedCO2Reduction: number;
}

export interface PipelineItem {
  id: string;
  medicineName: string;
  category: string;
  stage: PipelineStage;
  expectedApproval: string;
  estimatedRevenueImpact: number;
}

export interface Document {
  id: string;
  filename: string;
  type: string;
  uploadedBy: 'Client' | 'Donor';
  uploadDate: string;
}

export interface Comment {
  id: string;
  author: string;
  role: 'Donor' | 'Investor';
  text: string;
  date: string;
  sentiment: 'Positive' | 'Neutral' | 'Cautious';
}

export interface AIAssessment {
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskExplanation: string;
  repaymentLikelihood: number;
  repaymentDrivers: string;
  parameterMatchScore: number;
  parameters: { name: string; passed: boolean; comment: string }[];
  riskFlags: { severity: 'High' | 'Medium' | 'Low'; description: string }[];
  bestCase: { repaymentTimeline: string; revenueGrowth: string; importSubstitution: string };
  worstCase: { defaultLikelihood: string; riskTriggers: string; mitigation: string };
  recommendation: Recommendation;
  recommendationText: string;
  conditions?: string[];
  date: string;
}

export interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  sector: Sector;
  location: string;
  amountRequested: number;
  purpose: string;
  monthlyIncome: number;
  repaymentTimeline: number;
  interestRate: number;
  localSourcingPercentage: number;
  manufacturingCapacity: string;
  mcazCompliant: boolean;
  natPharmMOU: boolean;
  capitalDeployed: number;
  capitalRepaid: number;
  riskScore: number;
  riskBand: RiskBand;
  portfolioWeight: number;
  disbursementGate: DisbursementGate;
  status: 'Active' | 'Pending' | 'Under Review';
  applicationStep: ApplicationStep;
  riskDimensions: RiskDimension[];
  milestones: Milestone[];
  tranches: Tranche[];
  fundingHistory: FundingHistory[];
  esgImpact: ESGImpact;
  pipeline: PipelineItem[];
  documents: Document[];
  comments: Comment[];
  aiAssessment: AIAssessment | null;
}

export interface Notification {
  id: string;
  icon: string;
  severity: AlertSeverity;
  clientName: string;
  description: string;
  date: string;
  read: boolean;
  category: 'milestone' | 'risk' | 'repayment';
}

export interface WatchlistItem {
  clientName: string;
  severity: AlertSeverity;
  issue: string;
  action: string;
}

export interface MilestoneAlert {
  clientName: string;
  milestone: string;
  trancheAmount: number;
  date: string;
}

const riskDimensionsTemplate = (reg: number, fin: number, ops: number, mkt: number, gov: number): RiskDimension[] => [
  { label: 'Regulatory', score: reg, weight: 25 },
  { label: 'Financial', score: fin, weight: 25 },
  { label: 'Operational', score: ops, weight: 20 },
  { label: 'Market', score: mkt, weight: 20 },
  { label: 'Governance', score: gov, weight: 10 },
];

export const mockClients: Client[] = [
  {
    id: 'novamed',
    companyName: 'NovaMed Zimbabwe',
    contactPerson: 'Tendai Moyo',
    sector: 'Generics',
    location: 'Harare',
    amountRequested: 500000,
    purpose: 'Expand generic ARV production line and acquire WHO prequalification for 3 formulations.',
    monthlyIncome: 85000,
    repaymentTimeline: 36,
    interestRate: 8.5,
    localSourcingPercentage: 72,
    manufacturingCapacity: 'ISO-certified facility with 50,000 unit/month capacity. Two production lines for tablets and capsules.',
    mcazCompliant: true,
    natPharmMOU: true,
    capitalDeployed: 420000,
    capitalRepaid: 280000,
    riskScore: 28,
    riskBand: 'Low',
    portfolioWeight: 42,
    disbursementGate: 'Green',
    status: 'Active',
    applicationStep: 'Funded',
    riskDimensions: riskDimensionsTemplate(15, 22, 30, 35, 20),
    milestones: [
      { id: 'M1', label: 'M1', title: 'Facility Upgrade', description: 'Complete cleanroom installation', status: 'Completed', date: '2024-03-15' },
      { id: 'M2', label: 'M2', title: 'Equipment Procurement', description: 'Install tablet press and packaging line', status: 'Completed', date: '2024-06-20' },
      { id: 'M3', label: 'M3', title: 'MCAZ Inspection', description: 'Pass MCAZ GMP inspection', status: 'Completed', date: '2024-09-10' },
      { id: 'M4', label: 'M4', title: 'Production Start', description: 'Begin commercial production of first 2 formulations', status: 'In Progress', date: '2025-01-15' },
      { id: 'M5', label: 'M5', title: 'WHO Prequalification', description: 'Submit and obtain WHO PQ for ARV formulations', status: 'Pending', date: '2025-06-30' },
    ],
    tranches: [
      { id: 1, amount: 100000, tiedMilestone: 'M1', status: 'Disbursed' },
      { id: 2, amount: 100000, tiedMilestone: 'M2', status: 'Disbursed' },
      { id: 3, amount: 80000, tiedMilestone: 'M3', status: 'Disbursed' },
      { id: 4, amount: 80000, tiedMilestone: 'M4', status: 'Unlocked' },
      { id: 5, amount: 60000, tiedMilestone: 'M5', status: 'Locked' },
    ],
    fundingHistory: [
      { year: 2022, amount: 150000, repaidOnTime: true },
      { year: 2023, amount: 200000, repaidOnTime: true },
      { year: 2024, amount: 420000, repaidOnTime: true },
    ],
    esgImpact: {
      jobsCreatedDirect: 45,
      jobsCreatedIndirect: 120,
      localRawMaterialsSourced: 340000,
      medicineProductLines: 8,
      importSubstitutionImpact: 2100000,
      estimatedCO2Reduction: 85,
    },
    pipeline: [
      { id: 'p1', medicineName: 'Tenofovir/Lamivudine/Dolutegravir', category: 'ARV', stage: 'Approved', expectedApproval: '2024-06-01', estimatedRevenueImpact: 800000 },
      { id: 'p2', medicineName: 'Amoxicillin 500mg', category: 'Antibiotic', stage: 'Under Review', expectedApproval: '2025-03-15', estimatedRevenueImpact: 350000 },
      { id: 'p3', medicineName: 'Metformin 850mg', category: 'Antidiabetic', stage: 'Submitted', expectedApproval: '2025-08-01', estimatedRevenueImpact: 220000 },
    ],
    documents: [
      { id: 'd1', filename: 'NovaMed_GovID.pdf', type: 'Government ID', uploadedBy: 'Client', uploadDate: '2024-01-10' },
      { id: 'd2', filename: 'MCAZ_License_2024.pdf', type: 'MCAZ License', uploadedBy: 'Client', uploadDate: '2024-01-10' },
      { id: 'd3', filename: 'Bank_Statements_Q4.pdf', type: 'Bank Statement', uploadedBy: 'Client', uploadDate: '2024-01-15' },
      { id: 'd4', filename: 'Business_Registration.pdf', type: 'Registration', uploadedBy: 'Client', uploadDate: '2024-01-10' },
      { id: 'd5', filename: 'Due_Diligence_Report.pdf', type: 'Due Diligence', uploadedBy: 'Donor', uploadDate: '2024-02-05' },
    ],
    comments: [
      { id: 'c1', author: 'Sarah Johnson', role: 'Donor', text: 'Strong operational track record. Recommend proceeding with next tranche.', date: '2024-11-15', sentiment: 'Positive' },
      { id: 'c2', author: 'Michael Chen', role: 'Investor', text: 'WHO PQ timeline seems ambitious. Monitor closely.', date: '2024-12-01', sentiment: 'Cautious' },
    ],
    aiAssessment: {
      riskLevel: 'Low',
      riskExplanation: 'NovaMed demonstrates strong financial health with consistent revenue growth and timely repayments. MCAZ compliance and NatPharm MOU provide regulatory stability. The primary risk is the ambitious WHO prequalification timeline.',
      repaymentLikelihood: 87,
      repaymentDrivers: 'Strong monthly income ($85k), proven repayment history (3 years on-time), diversified product pipeline, and growing local demand for generic ARVs.',
      parameterMatchScore: 80,
      parameters: [
        { name: 'MCAZ Compliance', passed: true, comment: 'Fully compliant with current GMP standards' },
        { name: 'NatPharm MOU', passed: true, comment: 'Active MOU with procurement guarantees' },
        { name: 'Local Sourcing >60%', passed: true, comment: '72% local sourcing achieved' },
        { name: 'Repayment History', passed: true, comment: 'Zero late payments across 3 funding cycles' },
        { name: 'Manufacturing Capacity >80%', passed: false, comment: 'Currently at 65% capacity utilization' },
      ],
      riskFlags: [
        { severity: 'Low', description: 'WHO PQ timeline may extend 3-6 months beyond target' },
        { severity: 'Medium', description: 'Currency fluctuation exposure on imported raw materials (28%)' },
      ],
      bestCase: {
        repaymentTimeline: 'Full repayment within 30 months (6 months ahead of schedule)',
        revenueGrowth: '35% annual revenue growth driven by WHO PQ and NatPharm orders',
        importSubstitution: '$2.1M annual import substitution, rising to $3.5M by Year 3',
      },
      worstCase: {
        defaultLikelihood: '8% probability of default based on financial stress testing',
        riskTriggers: 'Currency devaluation >30%, WHO PQ rejection, key equipment failure',
        mitigation: 'Maintain 3-month operating reserve, diversify supplier base, engage WHO PQ consultants',
      },
      recommendation: 'Fund',
      recommendationText: 'NovaMed Zimbabwe demonstrates strong fundamentals across all key metrics. The company has a proven track record of timely repayments, solid regulatory compliance, and a growing product pipeline. We recommend full funding approval with standard monitoring protocols.',
      date: '2024-12-15',
    },
  },
  {
    id: 'biozim',
    companyName: 'BioZim Labs',
    contactPerson: 'Grace Chikowore',
    sector: 'Vaccines',
    location: 'Bulawayo',
    amountRequested: 750000,
    purpose: 'Establish cold-chain vaccine storage and distribution network for southern Zimbabwe.',
    monthlyIncome: 62000,
    repaymentTimeline: 48,
    interestRate: 9.0,
    localSourcingPercentage: 45,
    manufacturingCapacity: 'BSL-2 certified lab with cold storage. Monthly fill-finish capacity of 20,000 vials.',
    mcazCompliant: true,
    natPharmMOU: false,
    capitalDeployed: 300000,
    capitalRepaid: 120000,
    riskScore: 52,
    riskBand: 'Moderate',
    portfolioWeight: 30,
    disbursementGate: 'Amber',
    status: 'Active',
    applicationStep: 'Funded',
    riskDimensions: riskDimensionsTemplate(35, 50, 55, 60, 45),
    milestones: [
      { id: 'M1', label: 'M1', title: 'Cold Chain Setup', description: 'Install cold storage units at 3 distribution points', status: 'Completed', date: '2024-04-20' },
      { id: 'M2', label: 'M2', title: 'Staff Training', description: 'Train 15 cold chain technicians', status: 'In Progress', date: '2025-02-01' },
      { id: 'M3', label: 'M3', title: 'Distribution Launch', description: 'Begin vaccine distribution to 10 clinics', status: 'Pending', date: '2025-06-15' },
      { id: 'M4', label: 'M4', title: 'Quality Audit', description: 'Pass WHO cold chain quality audit', status: 'Pending', date: '2025-09-30' },
      { id: 'M5', label: 'M5', title: 'Scale Expansion', description: 'Expand to 25 clinics across 3 provinces', status: 'Pending', date: '2026-01-15' },
    ],
    tranches: [
      { id: 1, amount: 150000, tiedMilestone: 'M1', status: 'Disbursed' },
      { id: 2, amount: 120000, tiedMilestone: 'M2', status: 'Unlocked' },
      { id: 3, amount: 100000, tiedMilestone: 'M3', status: 'Locked' },
      { id: 4, amount: 80000, tiedMilestone: 'M4', status: 'Locked' },
      { id: 5, amount: 50000, tiedMilestone: 'M5', status: 'Locked' },
    ],
    fundingHistory: [
      { year: 2023, amount: 150000, repaidOnTime: true },
      { year: 2024, amount: 300000, repaidOnTime: false },
    ],
    esgImpact: {
      jobsCreatedDirect: 28,
      jobsCreatedIndirect: 75,
      localRawMaterialsSourced: 180000,
      medicineProductLines: 4,
      importSubstitutionImpact: 950000,
      estimatedCO2Reduction: 42,
    },
    pipeline: [
      { id: 'p1', medicineName: 'Hepatitis B Vaccine', category: 'Vaccine', stage: 'Under Review', expectedApproval: '2025-06-01', estimatedRevenueImpact: 600000 },
      { id: 'p2', medicineName: 'Tetanus Toxoid', category: 'Vaccine', stage: 'Pre-submission', expectedApproval: '2026-01-01', estimatedRevenueImpact: 400000 },
    ],
    documents: [
      { id: 'd1', filename: 'BioZim_GovID.pdf', type: 'Government ID', uploadedBy: 'Client', uploadDate: '2023-11-05' },
      { id: 'd2', filename: 'MCAZ_Certificate.pdf', type: 'MCAZ License', uploadedBy: 'Client', uploadDate: '2023-11-05' },
      { id: 'd3', filename: 'Bank_Statements.pdf', type: 'Bank Statement', uploadedBy: 'Client', uploadDate: '2023-11-10' },
    ],
    comments: [
      { id: 'c1', author: 'David Mhlanga', role: 'Investor', text: 'Late repayment in 2024 is concerning. Need to understand cash flow issues.', date: '2025-01-10', sentiment: 'Cautious' },
      { id: 'c2', author: 'Sarah Johnson', role: 'Donor', text: 'Cold chain infrastructure is critical for the region. Worth continued support.', date: '2025-01-20', sentiment: 'Positive' },
    ],
    aiAssessment: null,
  },
  {
    id: 'curelocal',
    companyName: 'CureLocal Pharma',
    contactPerson: 'Farai Ndlovu',
    sector: 'Herbal',
    location: 'Mutare',
    amountRequested: 250000,
    purpose: 'Develop standardized herbal medicine production line with MCAZ registration for 5 traditional remedies.',
    monthlyIncome: 28000,
    repaymentTimeline: 24,
    interestRate: 11.0,
    localSourcingPercentage: 92,
    manufacturingCapacity: 'Small-scale facility with manual packaging. Monthly capacity: 5,000 units. Seeking automation upgrade.',
    mcazCompliant: false,
    natPharmMOU: false,
    capitalDeployed: 0,
    capitalRepaid: 0,
    riskScore: 71,
    riskBand: 'Elevated',
    portfolioWeight: 0,
    disbursementGate: 'Red',
    status: 'Pending',
    applicationStep: 'Under Review',
    riskDimensions: riskDimensionsTemplate(80, 65, 72, 68, 70),
    milestones: [
      { id: 'M1', label: 'M1', title: 'MCAZ Application', description: 'Submit MCAZ registration for 5 products', status: 'Pending', date: '2025-06-01' },
      { id: 'M2', label: 'M2', title: 'Facility Certification', description: 'Obtain GMP certification for herbal facility', status: 'Pending', date: '2025-09-01' },
      { id: 'M3', label: 'M3', title: 'Automation Install', description: 'Install automated packaging equipment', status: 'Pending', date: '2025-12-01' },
      { id: 'M4', label: 'M4', title: 'First Sales', description: 'Achieve first commercial sales through NatPharm', status: 'Pending', date: '2026-03-01' },
      { id: 'M5', label: 'M5', title: 'Breakeven', description: 'Reach operational breakeven', status: 'Pending', date: '2026-09-01' },
    ],
    tranches: [
      { id: 1, amount: 75000, tiedMilestone: 'M1', status: 'Locked' },
      { id: 2, amount: 60000, tiedMilestone: 'M2', status: 'Locked' },
      { id: 3, amount: 50000, tiedMilestone: 'M3', status: 'Locked' },
      { id: 4, amount: 40000, tiedMilestone: 'M4', status: 'Locked' },
      { id: 5, amount: 25000, tiedMilestone: 'M5', status: 'Locked' },
    ],
    fundingHistory: [],
    esgImpact: {
      jobsCreatedDirect: 0,
      jobsCreatedIndirect: 0,
      localRawMaterialsSourced: 0,
      medicineProductLines: 0,
      importSubstitutionImpact: 0,
      estimatedCO2Reduction: 0,
    },
    pipeline: [
      { id: 'p1', medicineName: 'Moringa Extract Capsules', category: 'Herbal', stage: 'Pre-submission', expectedApproval: '2025-12-01', estimatedRevenueImpact: 120000 },
      { id: 'p2', medicineName: 'Artemisia Tea (Standardized)', category: 'Herbal', stage: 'Pre-submission', expectedApproval: '2026-03-01', estimatedRevenueImpact: 95000 },
    ],
    documents: [
      { id: 'd1', filename: 'CureLocal_GovID.pdf', type: 'Government ID', uploadedBy: 'Client', uploadDate: '2025-01-20' },
      { id: 'd2', filename: 'Business_Plan.pdf', type: 'Business Plan', uploadedBy: 'Client', uploadDate: '2025-01-20' },
    ],
    comments: [
      { id: 'c1', author: 'Michael Chen', role: 'Investor', text: 'Interesting concept but high regulatory risk. MCAZ registration for herbal products is uncertain.', date: '2025-02-01', sentiment: 'Cautious' },
    ],
    aiAssessment: null,
  },
];

export const mockWatchlist: WatchlistItem[] = [
  { clientName: 'BioZim Labs', severity: 'warning', issue: 'Late repayment detected in Q4 2024 — 15 days overdue', action: 'Schedule financial review meeting' },
  { clientName: 'CureLocal Pharma', severity: 'critical', issue: 'MCAZ registration pending — no compliance pathway established', action: 'Require compliance roadmap before any disbursement' },
  { clientName: 'BioZim Labs', severity: 'watch', issue: 'NatPharm MOU not yet signed — limits distribution channels', action: 'Connect with NatPharm liaison office' },
  { clientName: 'CureLocal Pharma', severity: 'warning', issue: 'Manufacturing capacity below minimum threshold', action: 'Assess automation upgrade feasibility' },
];

export const mockMilestoneAlerts: MilestoneAlert[] = [
  { clientName: 'NovaMed Zimbabwe', milestone: 'M3 — MCAZ Inspection Passed', trancheAmount: 80000, date: '2024-09-10' },
  { clientName: 'NovaMed Zimbabwe', milestone: 'M2 — Equipment Procurement Complete', trancheAmount: 100000, date: '2024-06-20' },
  { clientName: 'BioZim Labs', milestone: 'M1 — Cold Chain Setup Complete', trancheAmount: 150000, date: '2024-04-20' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', icon: '🎯', severity: 'watch', clientName: 'NovaMed Zimbabwe', description: 'Milestone M4 (Production Start) approaching deadline — Jan 15, 2025', date: '2025-01-05', read: false, category: 'milestone' },
  { id: 'n2', icon: '⚠️', severity: 'warning', clientName: 'BioZim Labs', description: 'Q4 2024 repayment was 15 days late — $25,000', date: '2025-01-02', read: false, category: 'repayment' },
  { id: 'n3', icon: '🔴', severity: 'critical', clientName: 'CureLocal Pharma', description: 'Risk score increased to 71 (Elevated) — MCAZ non-compliance', date: '2025-01-08', read: false, category: 'risk' },
  { id: 'n4', icon: '✅', severity: 'watch', clientName: 'NovaMed Zimbabwe', description: 'Milestone M3 completed — Tranche 3 ($80,000) disbursed', date: '2024-09-10', read: true, category: 'milestone' },
  { id: 'n5', icon: '💰', severity: 'watch', clientName: 'NovaMed Zimbabwe', description: 'Upcoming repayment: $12,500 due Feb 1, 2025', date: '2025-01-20', read: false, category: 'repayment' },
  { id: 'n6', icon: '📋', severity: 'warning', clientName: 'BioZim Labs', description: 'MCAZ certificate expires in 60 days — renewal required', date: '2025-01-12', read: false, category: 'risk' },
  { id: 'n7', icon: '🎯', severity: 'watch', clientName: 'BioZim Labs', description: 'Milestone M2 (Staff Training) target date approaching — Feb 1, 2025', date: '2025-01-15', read: true, category: 'milestone' },
];

export const kpiData = {
  totalCapitalDeployed: 720000,
  totalRepaid: 400000,
  activeManufacturers: 2,
  averageRiskScore: 50.3,
  capitalAtRisk: 180000,
};

export function getRiskBandColor(band: RiskBand): string {
  switch (band) {
    case 'Low': return 'text-primary';
    case 'Moderate': return 'text-secondary';
    case 'Elevated': return 'text-warning';
    case 'High': return 'text-destructive';
  }
}

export function getRiskBandBg(band: RiskBand): string {
  switch (band) {
    case 'Low': return 'bg-primary/20 text-primary';
    case 'Moderate': return 'bg-secondary/20 text-secondary';
    case 'Elevated': return 'bg-warning/20 text-warning';
    case 'High': return 'bg-destructive/20 text-destructive';
  }
}

export function getSeverityBadge(severity: AlertSeverity): { icon: string; className: string; label: string } {
  switch (severity) {
    case 'critical': return { icon: '🔴', className: 'bg-destructive/20 text-destructive', label: 'Critical' };
    case 'warning': return { icon: '🟡', className: 'bg-warning/20 text-warning', label: 'Warning' };
    case 'watch': return { icon: '🔵', className: 'bg-secondary/20 text-secondary', label: 'Watch' };
  }
}

export function getGateColor(gate: DisbursementGate): string {
  switch (gate) {
    case 'Green': return 'bg-primary/20 text-primary';
    case 'Amber': return 'bg-warning/20 text-warning';
    case 'Red': return 'bg-destructive/20 text-destructive';
    case 'Buffer': return 'bg-secondary/20 text-secondary';
  }
}
