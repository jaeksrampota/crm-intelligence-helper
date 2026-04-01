import { useState } from 'react';
import { SearchBar } from './components/layout/SearchBar';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ClientHeader } from './components/header/ClientHeader';
import { ProductCardsGrid } from './components/products/ProductCardsGrid';
import { ActivityTimeline } from './components/activity/ActivityTimeline';
import { BehaviorSignals } from './components/behavior/BehaviorSignals';
import { SalesTipsPanel } from './components/sales/SalesTipsPanel';
import { AlertsBar } from './components/alerts/AlertsBar';
import { SlideoutPanel } from './components/slideout/SlideoutPanel';
import { ProductDetailPanel } from './components/slideout/ProductDetailPanel';
import { InteractionDetailPanel } from './components/slideout/InteractionDetailPanel';
import { useClientDashboard } from './hooks/use-client-dashboard';
import { useSlideout } from './hooks/use-slideout';

export default function App() {
  const [clientId, setClientId] = useState<string | null>(null);
  const { profile, salesTips, alerts, behavioralSignals, isLoading, dismissAlert } = useClientDashboard(clientId);
  const slideout = useSlideout();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar with search */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-rb-yellow rounded" />
          <span className="font-bold text-sm">CRM Intelligence</span>
        </div>
        <SearchBar
          onSelectClient={setClientId}
          selectedClientName={profile?.client.name}
          onClear={() => setClientId(null)}
        />
      </div>

      {/* Content */}
      {!clientId ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] gap-4">
          <div className="w-16 h-16 bg-rb-yellow rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold">RB</span>
          </div>
          <h1 className="text-xl font-bold text-gray-700">CRM Intelligence Helper</h1>
          <p className="text-sm text-gray-500">Search for a client to begin</p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-56px)]">
          <div className="text-sm text-gray-500">Loading client data...</div>
        </div>
      ) : profile && behavioralSignals ? (
        <DashboardLayout
          header={<ClientHeader client={profile.client} interactions={profile.interactions} />}
          alerts={<AlertsBar alerts={alerts} onDismiss={dismissAlert} />}
          products={<ProductCardsGrid products={profile.products} onProductClick={slideout.openProductDetail} />}
          activity={<ActivityTimeline interactions={profile.interactions} onInteractionClick={slideout.openInteractionDetail} />}
          behavior={<BehaviorSignals signals={behavioralSignals} />}
          sales={<SalesTipsPanel tips={salesTips} />}
        />
      ) : null}

      {/* Slide-out */}
      <SlideoutPanel
        isOpen={slideout.isOpen}
        onClose={slideout.close}
        title={slideout.contentType === 'product' ? 'Product Detail' : 'Interaction Detail'}
      >
        {slideout.contentType === 'product' && slideout.contentId && (
          <ProductDetailPanel productId={slideout.contentId} />
        )}
        {slideout.contentType === 'interaction' && slideout.contentId && (
          <InteractionDetailPanel interactionId={slideout.contentId} />
        )}
      </SlideoutPanel>
    </div>
  );
}
