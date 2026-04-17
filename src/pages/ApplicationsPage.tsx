import React from "react";

const applications = [
  {
    company: "CosPharma (Pvt) Ltd",
    category: "Topicals / Antifungals",
    capital: "$380,000",
    submitted: "06 Jan 2025",
    gmp: "Partial",
    risk: "48 / Med",
    stage: "CHAI Review",
  },
  {
    company: "Elesan Pharmaceuticals",
    category: "ORS / Oral Liquids",
    capital: "$250,000",
    submitted: "02 Jan 2025",
    gmp: "Strong",
    risk: "27 / Low",
    stage: "Expert Vetting",
  },
  {
    company: "Medirite Healthcare",
    category: "IV Fluids / Injectables",
    capital: "$620,000",
    submitted: "28 Dec 2024",
    gmp: "Non-compliant",
    risk: "62 / High",
    stage: "Initial Review",
  },
];

export default function ApplicationsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Applications Under Review</h1>

      {/* Alert */}
      <div className="bg-red-600/10 border border-red-500 text-red-400 p-4 rounded-xl mb-6">
        ⚠️ 3 applications require CHAI + independent expert review before shortlisting to investor.
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl shadow p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Pending Applications</h2>
        <table className="w-full text-sm">
          <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="text-left py-2">Company</th>
              <th className="text-left">Product Category</th>
              <th>Capital Requested</th>
              <th>Submitted</th>
              <th>GMP Readiness</th>
              <th>Prelim Risk</th>
              <th>Stage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={i} className="border-b border-slate-700">
                <td className="py-3">{app.company}</td>
                <td>{app.category}</td>
                <td className="text-center">{app.capital}</td>
                <td className="text-center">{app.submitted}</td>
                <td className="text-center">
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-600/20 text-yellow-400">
                    {app.gmp}
                  </span>
                </td>
                <td className="text-center">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-600/20 text-blue-400">
                    {app.risk}
                  </span>
                </td>
                <td className="text-center">
                  <span className="px-2 py-1 rounded-full text-xs bg-slate-700 text-white">
                    {app.stage}
                  </span>
                </td>
                <td className="text-center">
                  <button className="px-3 py-1 text-sm rounded-lg bg-blue-600 hover:bg-blue-500">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}