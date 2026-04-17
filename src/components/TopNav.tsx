import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Building2, User, Briefcase } from 'lucide-react';

export default function TopNav() {
  const { role, setRole, notifications } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="border-b border-white/10 bg-[#0B1527]/80 backdrop-blur-sm sticky top-0 z-50 h-14 flex-shrink-0 text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center h-full gap-4">
        
        {/* Mobile menu and logo */}
        <div className="md:hidden flex items-center gap-2 mr-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-semibold text-sm">ZimPharma</span>
        </div>

        <div className="flex-1" />

        {/* Role Toggle */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => { setRole('donor'); navigate('/'); }}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              role === 'donor' ? 'bg-blue-600 text-white shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            Donor
          </button>
          <button
            onClick={() => { setRole('client'); navigate('/client/home'); }}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              role === 'client' ? 'bg-blue-600 text-white shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            <User className="w-3 h-3" />
            Client
          </button>
        </div>

        {role === 'donor' && (
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-md text-white/60 hover:bg-white/5 hover:text-white transition-colors border border-transparent hover:border-white/10"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-mono shadow-md">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
