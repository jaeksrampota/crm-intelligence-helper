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
    <div className="xl:h-[calc(100vh-56px)] flex flex-col gap-2.5 p-3">
      {/* Zone A: Header */}
      <div id="zone-header">{header}</div>

      {/* Alerts bar */}
      {alerts && <div id="zone-alerts">{alerts}</div>}

      {/* Main 4-column grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 min-h-0">
        <div id="zone-products" className="xl:overflow-y-auto pr-0.5">{products}</div>
        <div id="zone-activity" className="xl:overflow-y-auto pr-0.5">{activity}</div>
        <div id="zone-behavior" className="xl:overflow-y-auto pr-0.5">{behavior}</div>
        <div id="zone-sales" className="xl:overflow-y-auto pr-0.5">{sales}</div>
      </div>
    </div>
  );
}
