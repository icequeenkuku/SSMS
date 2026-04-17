import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';
import { getSeverityBadge } from '@/data/mockData';
import { Check } from 'lucide-react';

export default function Notifications() {
  const { notifications, setNotifications } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread' | 'milestone' | 'risk' | 'repayment'>('all');

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'all') return true;
    return n.category === filter;
  });

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'milestone', label: 'Milestones' },
    { key: 'risk', label: 'Risk' },
    { key: 'repayment', label: 'Repayments' },
  ] as const;

  return (
    <div className="max-w-[800px] mx-auto px-6 py-6 space-y-4">
      <h1 className="text-xl font-bold">Notifications</h1>
      <div className="flex gap-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`text-xs px-3 py-1.5 rounded-md transition-colors ${filter === t.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(n => {
          const badge = getSeverityBadge(n.severity);
          return (
            <div key={n.id} className={`border border-border rounded-md p-4 transition-colors ${n.read ? 'opacity-60' : 'bg-card'}`}>
              <div className="flex items-start gap-3">
                <span className="text-lg">{n.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${badge.className}`}>{badge.label}</span>
                    <span className="text-xs font-semibold">{n.clientName}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{n.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                </div>
                {!n.read && (
                  <button onClick={() => markRead(n.id)}
                    className="text-[10px] px-2 py-1 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Read
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">No notifications</p>}
      </div>
    </div>
  );
}
