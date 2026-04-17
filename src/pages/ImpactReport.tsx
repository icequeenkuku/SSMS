import React from "react";

const metrics = [
  { title: "Total Units Produced (Month)", value: "4.2M", sub: "Across 5 priority products" },
  { title: "Jobs Created / Sustained", value: "612", sub: "Direct manufacturing employment" },
  { title: "Products on NatPharm Shelf", value: "4/5", sub: "4 of 5 priority products available" },
  { title: "Avg Price vs Import", value: "-28%", sub: "Below equivalent import price" },
  { title: "Patients Served (Est.)", value: "1.8M", sub: "Annual treatment episodes" },
];

const tableData = [
  {
    product: "ORS Sachets (1L)",
    manufacturer: "Pharmanova + CAPS",
    units: "680,000",
    status: "On shelf",
    local: "$0.28",
    importP: "$0.45",
    saving: "-38%",
    patients: "840,000",
    gmp: "Roadmap",
  },
  {
    product: "Folic Acid 5mg",
    manufacturer: "CAPS + Varichem",
    units: "420,000",
    status: "On shelf",
    local: "$0.62",
    importP: "$0.95",
    saving: "-35%",
    patients: "280,000",
    gmp: "Roadmap",
  },
  {
    product: "Ferrous Sulphate 200mg",
    manufacturer: "CAPS + Pharmanova",
    units: "380,000",
    status: "On shelf",
    local: "$0.94",
    importP: "$1.42",
    saving: "-34%",
    patients: "220,000",
    gmp: "Roadmap",
  },
  {
    product: "Co-trimoxazole 480mg",
    manufacturer: "Varichem + Pharmanova",
    units: "2,100,000",
    status: "On shelf",
    local: "$0.92",
    importP: "$1.35",
    saving: "-32%",
    patients: "520,000",
    gmp: "Roadmap",
  },
  {
    product: "Paracetamol 500mg",
    manufacturer: "CAPS + Pharmanova + Varichem",
    units: "620,000",
    status: "Limited stock",
    local: "$0.38",
    importP: "$0.65",
    saving: "-42%",
    patients: "740,000",
    gmp: "Upgrading",
  },
];

const employmentData = [
  { name: "CAPS", jobs: 220 },
  { name: "Pharmanova", jobs: 180 },
  { name: "Varichem", jobs: 150 },
  { name: "Combined Ops", jobs: 62 },
];

const economicSummary = [
  { label: "Total Savings vs Imports", value: "$12.4M" },
  { label: "Local Production Value", value: "$28.7M" },
  { label: "Import Substitution Rate", value: "63%" },
  { label: "Cost Reduction (Avg)", value: "-28%" },
];

export default function ImpactDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Impact Metrics Dashboard — System 2</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {metrics.map((m, i) => (
          <div key={i} className="bg-slate-800 p-4 rounded-2xl shadow">
            <p className="text-sm text-slate-400">{m.title}</p>
            <h2 className="text-2xl font-bold mt-2">{m.value}</h2>
            <p className="text-xs text-slate-400 mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl shadow p-4 overflow-x-auto mb-8">
        <h2 className="text-lg font-semibold mb-4">Product-Level Impact Metrics</h2>
        <table className="w-full text-sm">
          <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="text-left py-2">Product</th>
              <th className="text-left">Manufacturer(s)</th>
              <th>Monthly Units</th>
              <th>Status</th>
              <th>Local Price</th>
              <th>Import Price</th>
              <th>Saving</th>
              <th>Annual Patients</th>
              <th>GMP Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} className="border-b border-slate-700">
                <td className="py-3">{row.product}</td>
                <td>{row.manufacturer}</td>
                <td className="text-center text-green-400">{row.units}</td>
                <td className="text-center">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-600/20 text-green-400">
                    {row.status}
                  </span>
                </td>
                <td className="text-center">{row.local}</td>
                <td className="text-center">{row.importP}</td>
                <td className="text-center text-green-400">{row.saving}</td>
                <td className="text-center">{row.patients}</td>
                <td className="text-center">
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-600/20 text-yellow-400">
                    {row.gmp}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employment Impact */}
        <div className="bg-slate-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Employment Impact by Manufacturer</h2>
          <div className="space-y-4">
            {employmentData.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span>{item.name}</span>
                <span className="font-semibold text-green-400">{item.jobs} jobs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Summary */}
        <div className="bg-slate-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Economic Impact Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            {economicSummary.map((item, i) => (
              <div key={i} className="bg-slate-900 p-4 rounded-xl">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="text-xl font-bold mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
