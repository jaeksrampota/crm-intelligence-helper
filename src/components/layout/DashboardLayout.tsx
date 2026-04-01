import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  header: ReactNode;
  products: ReactNode;
  activity: ReactNode;
  behavior: ReactNode;
  sales: ReactNode;
  alerts: ReactNode;
}

export function DashboardLayout({ header, products, activity, behavior, sales, alerts }: DashboardLayoutProps) {
  return (
    <div className="h-[calc(100vh-56px)] flex flex-col gap-2.5 p-3">
      {/* Zone A: Header */}
      <div>{header}</div>

      {/* Alerts bar */}
      {alerts && <div>{alerts}</div>}

      {/* Main 4-column grid */}
      <div className="flex-1 grid grid-cols-4 gap-3 min-h-0">
        <div className="overflow-y-auto pr-0.5">{products}</div>
        <div className="overflow-y-auto pr-0.5">{activity}</div>
        <div className="overflow-y-auto pr-0.5">{behavior}</div>
        <div className="overflow-y-auto pr-0.5">{sales}</div>
      </div>
    </div>
  );
}
