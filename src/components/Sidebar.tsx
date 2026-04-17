import { useApp } from '@/contexts/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Building2, ShieldAlert, FileText, Phone, FolderOpen, Coins, BarChart, PlusCircle } from 'lucide-react';

export default function Sidebar() {
  const { role } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const donorSections = [
    {
      title: 'MAIN',
      links: [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/portfolio', label: 'Portfolio Risk', icon: Briefcase },
        { path: '/applications', label: 'Applications', icon: FolderOpen },
      ]
    },
    {
      title: 'MANAGEMENT',
      links: [
        { path: '/manufacturers', label: 'Manufacturers', icon: Building2 },
        { path: '/disbursements', label: 'Disbursements', icon: Coins },
        { path: '/applications', label: 'New Applications', icon: PlusCircle },
      ]
    },
    {
      title: 'REPORTS',
      links: [
        { path: '/risk-report', label: 'Risk Report', icon: ShieldAlert },
        { path: '/impact-dashboard', label: 'Impact Dashboard', icon: BarChart },
        { path: '/contacts', label: 'Ecosystem Liaison', icon: Phone },
      ]
    }
  ];

  const clientSections = [
    {
      title: 'MAIN',
      links: [
        { path: '/client/home', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/client/apply', label: 'Apply', icon: FileText },
      ]
    }
  ];

  const sections = role === 'donor' ? donorSections : clientSections;

  return (
    <aside className="w-64 border-r border-border bg-[#0B1527] text-white flex flex-col min-h-screen relative z-10 hidden md:flex">
      <div className="p-4 border-b border-white/10 h-16 flex flex-col justify-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex flex-col">
             <span className="text-[10px] font-bold text-blue-400 tracking-wider">SSMS PLATFORM</span>
             <span className="text-sm font-bold text-white">Supply-Side Market</span>
             
          </div>
        </div>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-[10px] font-bold text-white/40 mb-2 tracking-wider">{section.title}</h4>
            <div className="space-y-1">
              {section.links.map((l) => (
                <button
                  key={l.path}
                  onClick={() => navigate(l.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all group ${
                    location.pathname === l.path 
                    ? 'bg-blue-900/40 text-blue-400' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <l.icon className={`w-4 h-4 transition-colors ${location.pathname === l.path ? 'text-blue-400' : 'text-white/50 group-hover:text-white'}`} />
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
