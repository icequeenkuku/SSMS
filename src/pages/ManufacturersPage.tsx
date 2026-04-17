import React from "react";

const manufacturers = [
  {
    name: "Varichem Pharmaceuticals",
    location: "Harare, Southerton",
    focus: "Oral solids, ARVs, Antifungals",
    status: "MCAZ Certified cGMP",
    deployed: "$780K",
    risk: 32,
    state: "Active",
  },
  {
    name: "CAPS Pharmaceuticals",
    location: "Harare, Msasa",
    focus: "Oral solids, Multivitamins, ORS",
    status: "MCAZ Certified cGMP",
    deployed: "$920K",
    risk: 26,
    state: "Active",
  },
  {
    name: "Pharmanova (Pvt) Ltd",
    location: "Harare, Graniteside",
    focus: "Analgesics, ORS, Folic acid",
    status: "GMP Roadmap",
    deployed: "$500K",
    risk: 45,
    state: "Active",
  },
  {
    name: "Datlabs (Pvt) Ltd",
    location: "Bulawayo",
    focus: "Oral solids, Antifungals",
    status: "GMP Roadmap",
    deployed: "$420K",
    risk: 48,
    state: "Active",
  },
  {
    name: "Plus Five Pharmaceuticals",
    location: "Harare",
    focus: "Generic OSD, Antibiotics",
    status: "GMP Roadmap",
    deployed: "$350K",
    risk: 53,
    state: "Active",
  },
  {
    name: "Gulf Drug Company",
    location: "Harare, Ardbennie",
    focus: "ORS, General OSD",
    status: "GMP Roadmap",
    deployed: "$280K",
    risk: 63,
    state: "Watchlist",
  },
  {
    name: "ZimPharm Ltd",
    location: "Harare, Graniteside",
    focus: "Oral liquids, Syrups",
    status: "Partial compliance",
    deployed: "$320K",
    risk: 76,
    state: "Watchlist",
  },
  {
    name: "Graniteside Chemicals",
    location: "Harare, Graniteside",
    focus: "Chemical-based generics",
    status: "GMP Roadmap",
    deployed: "$220K",
    risk: 44,
    state: "Pending",
  },
];

const getRiskColor = (risk: number) => {
  if (risk < 40) return "text-green-400 bg-green-600/20";
  if (risk < 60) return "text-yellow-400 bg-yellow-600/20";
  return "text-red-400 bg-red-600/20";
};

const getStateColor = (state: string) => {
  if (state === "Active") return "text-green-400 bg-green-600/20";
  if (state === "Watchlist") return "text-red-400 bg-red-600/20";
  return "text-yellow-400 bg-yellow-600/20";
};

export default function ManufacturersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manufacturer Registry</h1>
        <button className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500">
          + New Application
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl shadow p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">All Manufacturers</h2>

        <table className="w-full text-sm">
          <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="text-left py-2">Manufacturer</th>
              <th className="text-left">Location</th>
              <th className="text-left">Product Focus</th>
              <th className="text-left">MCAZ Status</th>
              <th>Deployed</th>
              <th>Risk Score</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {manufacturers.map((m, i) => (
              <tr key={i} className="border-b border-slate-700">
                <td className="py-3 font-medium">{m.name}</td>
                <td>{m.location}</td>
                <td>{m.focus}</td>
                <td>{m.status}</td>
                <td className="text-center">{m.deployed}</td>
                <td className="text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(m.risk)}`}>
                    {m.risk}
                  </span>
                </td>
                <td className="text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStateColor(m.state)}`}>
                    {m.state}
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