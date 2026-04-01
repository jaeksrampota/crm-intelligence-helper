import type { ReactNode } from 'react';
import { CommentZoneWrapper } from '../comments/CommentZoneWrapper';

interface DashboardLayoutProps {
  header: ReactNode;
  products: ReactNode;
  activity: ReactNode;
  behavior: ReactNode;
  sales: ReactNode;
  alerts: ReactNode;
}

const WIN2K_PANEL = {
  background: '#d4d0c8',
  borderTop: '2px solid #ffffff',
  borderLeft: '2px solid #ffffff',
  borderRight: '2px solid #404040',
  borderBottom: '2px solid #404040',
  outline: '1px solid #000',
};

function Win2kGroupBox({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <div
      id={id}
      style={{
        background: '#d4d0c8',
        border: '1px solid #808080',
        outline: '1px solid #ffffff',
        paddingTop: 14,
        paddingLeft: 6,
        paddingRight: 6,
        paddingBottom: 6,
        position: 'relative',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: -7,
          left: 10,
          background: '#d4d0c8',
          padding: '0 4px',
          fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
          fontSize: 11,
          fontWeight: 'bold',
        }}
      >
        {title}
      </span>
      <div style={{ height: '100%', overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

export function DashboardLayout({ header, products, activity, behavior, sales, alerts }: DashboardLayoutProps) {
  return (
    <div
      className="xl:h-[calc(100vh-48px)] flex flex-col gap-2 p-2"
      style={{ background: '#008080' }}
    >
      {/* Zone A: Header — Win2k window panel */}
      <div id="zone-header" style={{ ...WIN2K_PANEL }}>
        <div
          className="win2k-titlebar"
          style={{ borderBottom: '1px solid #404040' }}
        >
          Client Information
        </div>
        <div style={{ padding: '4px 6px', background: '#d4d0c8' }}>
          <CommentZoneWrapper zoneId="header">{header}</CommentZoneWrapper>
        </div>
      </div>

      {/* Alerts bar */}
      {alerts && (
        <div id="zone-alerts">
          <CommentZoneWrapper zoneId="alerts">{alerts}</CommentZoneWrapper>
        </div>
      )}

      {/* Main 4-column grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 min-h-0">
        {/* Products */}
        <div
          id="zone-products"
          className="xl:overflow-y-auto"
          style={{ ...WIN2K_PANEL, padding: 0 }}
        >
          <div className="win2k-titlebar" style={{ borderBottom: '1px solid #404040' }}>Products</div>
          <div style={{ padding: '6px', background: '#d4d0c8', height: 'calc(100% - 22px)', overflowY: 'auto' }}>
            <CommentZoneWrapper zoneId="products">{products}</CommentZoneWrapper>
          </div>
        </div>

        {/* Activity */}
        <div
          id="zone-activity"
          className="xl:overflow-y-auto"
          style={{ ...WIN2K_PANEL, padding: 0 }}
        >
          <div className="win2k-titlebar" style={{ borderBottom: '1px solid #404040' }}>Activity Log</div>
          <div style={{ padding: '6px', background: '#d4d0c8', height: 'calc(100% - 22px)', overflowY: 'auto' }}>
            <CommentZoneWrapper zoneId="activity">{activity}</CommentZoneWrapper>
          </div>
        </div>

        {/* Behavior */}
        <div
          id="zone-behavior"
          className="xl:overflow-y-auto"
          style={{ ...WIN2K_PANEL, padding: 0 }}
        >
          <div className="win2k-titlebar" style={{ borderBottom: '1px solid #404040' }}>Behavior Signals</div>
          <div style={{ padding: '6px', background: '#d4d0c8', height: 'calc(100% - 22px)', overflowY: 'auto' }}>
            <CommentZoneWrapper zoneId="behavior">{behavior}</CommentZoneWrapper>
          </div>
        </div>

        {/* Sales */}
        <div
          id="zone-sales"
          className="xl:overflow-y-auto"
          style={{ ...WIN2K_PANEL, padding: 0 }}
        >
          <div className="win2k-titlebar" style={{ borderBottom: '1px solid #404040' }}>Sales Tips</div>
          <div style={{ padding: '6px', background: '#d4d0c8', height: 'calc(100% - 22px)', overflowY: 'auto' }}>
            <CommentZoneWrapper zoneId="sales">{sales}</CommentZoneWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
