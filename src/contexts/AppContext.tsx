import React, { createContext, useContext, useState } from 'react';
import { Role, Client, Notification, mockClients, mockNotifications } from '@/data/mockData';

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  portfolio: { clientId: string; allocation: number }[];
  setPortfolio: React.Dispatch<React.SetStateAction<{ clientId: string; allocation: number }[]>>;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('donor');
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [portfolio, setPortfolio] = useState<{ clientId: string; allocation: number }[]>([]);

  return (
    <AppContext.Provider value={{ role, setRole, clients, setClients, notifications, setNotifications, portfolio, setPortfolio }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
