import React from "react";

const topMetrics = [
  { title: "Total Committed", value: "$6.2M", sub: "Across 8 active + 3 pending" },
  { title: "Disbursed to Date", value: "$4.2M", sub: "68% of total committed" },
  { title: "Pending Release", value: "$840K", sub: "Awaiting milestone verification" },
  { title: "Recycled Capital", value: "$820K", sub: "Re-deployed to next cohort" },
];

const gates = [
  {
    title: "GREEN GATE",
    desc: "Milestone fully achieved with verified evidence. Full tranche released within 5 days of sign-off.",
    border: "border-green-500",
    text: "text-green-400",
  },
  {
    title: "AMBER GATE",
    desc: "Partial / external factor (ZETDC, shipping, MCAZ queue). 50% released, 50% escrow, 90-day cure period.",
    border: "border-yellow-500",
    text: "text-yellow-400",
  },
  {
    title: "RED GATE",
    desc: "Performance failure or cure period expired. Full hold. Remediation plan + board approval to resume.",
    border: "border-red-500",
    text: "text-red-400",
  },
  {
    title: "BUFFER (5%)",
    desc: "Pre-committed per manufacturer. Accessible only via Amber Gate for documented force majeure. Repaid on schedule.",
    border: "border-blue-500",
    text: "text-blue-400",
  },
];

const disbursements = [
  {
    date: "14 Jan 2025",
    manufacturer: "Varichem Pharm",
    milestone: "M3 — MCAZ Registration",
    amount: "+$180,000",
    verified: "CHAI + Deloitte ZW",
    evidence: "MCAZ certificate, batch records",
    status: "Released",
  },
  {
    date: "10 Jan 2025",
    manufacturer: "Pharmanova",
    milestone: "M2 — Infrastructure",
    amount: "+$120,000",
    verified: "CHAI + UZ Pharmacy",
    evidence: "Invoices, site inspection",
    status: "Released",
  },
  {
    date: "22 Dec 2024",
    manufacturer: "CAPS Pharm",
    milestone: "M4 — Commercial",
    amount: "+$200,000",
    verified: "CHAI + KPMG ZW",
    evidence: "Management accounts, NatPharm PO",
    status: "Released",
  },
  {
    date: "15 Dec 2024",
    manufacturer: "Plus Five Pharm",
    milestone: "M1 — Onboarding",
    amount: "+$80,000",
    verified: "CHAI",
    evidence: "Legal docs, MCAZ licence",
    status: "Released",
  },
];

export default function DisbursementTracker() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Disbursement Tracker</h1>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topMetrics.map((m, i) => (
          <div key={i} className="bg-slate-800 p-4 rounded-2xl shadow">
            <p className="text-sm text-slate-400">{m.title}</p>
            <h2 className="text-2xl font-bold mt-2">{m.value}</h2>
            <p className="text-xs text-slate-400 mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Gates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {gates.map((g, i) => (
          <div key={i} className={`bg-slate-800 p-4 rounded-2xl border ${g.border}`}>
            <h3 className={`font-semibold mb-2 ${g.text}`}>{g.title}</h3>
            <p className="text-sm text-slate-300">{g.desc}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl shadow p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Disbursement Log</h2>
        <table className="w-full text-sm">
          <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left">Manufacturer</th>
              <th className="text-left">Milestone</th>
              <th>Amount</th>
              <th className="text-left">Verified By</th>
              <th className="text-left">Evidence</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {disbursements.map((d, i) => (
              <tr key={i} className="border-b border-slate-700">
                <td className="py-3">{d.date}</td>
                <td>{d.manufacturer}</td>
                <td>{d.milestone}</td>
                <td className="text-center text-green-400">{d.amount}</td>
                <td>{d.verified}</td>
                <td>{d.evidence}</td>
                <td className="text-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}