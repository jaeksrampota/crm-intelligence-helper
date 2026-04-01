import { useState, useCallback } from 'react';
import { LogOut } from 'lucide-react';
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
import { BehaviorDetailPanel } from './components/slideout/BehaviorDetailPanel';
import { SatisfactionDetailPanel } from './components/slideout/SatisfactionDetailPanel';
import { LoginPage } from './components/auth/LoginPage';
import { AllCommentsButton } from './components/comments/AllCommentsButton';
import { CommentSummaryPanel } from './components/comments/CommentSummaryPanel';
import { useClientDashboard } from './hooks/use-client-dashboard';
import { useSlideout } from './hooks/use-slideout';
import { useAuth } from './hooks/use-auth';
import { useComments } from './hooks/use-comments';
import { useTranslation } from './i18n';

const SLIDEOUT_TITLES = (t: ReturnType<typeof useTranslation>['t']) => ({
  product: t.app.productDetail,
  interaction: t.app.interactionDetail,
  behavior: t.app.behaviorDetail,
  satisfaction: t.app.satisfactionDetail,
});

export default function App() {
  const [clientId, setClientId] = useState<string | null>(null);
  const { profile, salesTips, alerts, behavioralSignals, isLoading, dismissAlert } = useClientDashboard(clientId);
  const slideout = useSlideout();
  const { isAuthenticated, login, logout, error: authError } = useAuth();
  const { comments } = useComments();
  const [showAllComments, setShowAllComments] = useState(false);
  const { t, language, toggleLanguage } = useTranslation();

  const scrollToZone = useCallback((zone: string) => {
    const el = document.getElementById(`zone-${zone}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      el.classList.add('ring-2', 'ring-rb-yellow', 'ring-offset-1');
      setTimeout(() => el.classList.remove('ring-2', 'ring-rb-yellow', 'ring-offset-1'), 1500);
    }
  }, []);

  const openCommentCount = comments.filter((c) => c.status === 'open').length;

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} error={authError} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar with search */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-4 h-14">
        <div className="flex items-center gap-2 shrink-0">
          <img src={import.meta.env.BASE_URL + 'rb-icon.svg'} alt="Raiffeisenbank" className="w-7 h-7" />
          <span className="font-bold text-sm">{t.app.brandName}</span>
        </div>
        <SearchBar
          onSelectClient={setClientId}
          selectedClientName={profile?.client.name}
          onClear={() => { slideout.close(); setClientId(null); }}
        />
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <AllCommentsButton openCount={openCommentCount} onClick={() => setShowAllComments(true)} />
          <button
            onClick={toggleLanguage}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-xs font-semibold"
            title={language === 'en' ? 'Přepnout do češtiny' : 'Switch to English'}
          >
            <span className={language === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
            <span className="text-gray-300">|</span>
            <span className={language === 'cs' ? 'opacity-100' : 'opacity-40'}>CZ</span>
          </button>
          <button
            onClick={logout}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-xs font-semibold text-gray-600"
            title={t.login.logout}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      {!clientId ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] gap-5">
          <img src={import.meta.env.BASE_URL + 'rb-logo.svg'} alt="Raiffeisenbank" className="h-12" />
          <h1 className="text-xl font-bold text-gray-700">{t.app.title}</h1>
          <p className="text-sm text-gray-500">{t.app.searchPrompt}</p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-56px)]">
          <div className="text-sm text-gray-500">{t.app.loadingClient}</div>
        </div>
      ) : profile && behavioralSignals ? (
        <DashboardLayout
          header={<ClientHeader client={profile.client} interactions={profile.interactions} onInteractionClick={slideout.openInteractionDetail} />}
          alerts={<AlertsBar alerts={alerts} onDismiss={dismissAlert} onNavigate={scrollToZone} />}
          products={<ProductCardsGrid products={profile.products} onProductClick={slideout.openProductDetail} />}
          activity={<ActivityTimeline interactions={profile.interactions} onInteractionClick={slideout.openInteractionDetail} />}
          behavior={
            <BehaviorSignals
              signals={behavioralSignals}
              satisfactionScores={profile.satisfaction_scores}
              onTileClick={slideout.openBehaviorDetail}
              onSatisfactionClick={slideout.openSatisfactionDetail}
            />
          }
          sales={<SalesTipsPanel tips={salesTips} />}
        />
      ) : null}

      {/* Slide-out */}
      <SlideoutPanel
        isOpen={slideout.isOpen}
        onClose={slideout.close}
        title={slideout.contentType ? SLIDEOUT_TITLES(t)[slideout.contentType] : ''}
      >
        {slideout.contentType === 'product' && slideout.contentId && (
          <ProductDetailPanel productId={slideout.contentId} />
        )}
        {slideout.contentType === 'interaction' && slideout.contentId && (
          <InteractionDetailPanel interactionId={slideout.contentId} />
        )}
        {slideout.contentType === 'behavior' && slideout.contentId && profile && (
          <BehaviorDetailPanel signalKey={slideout.contentId} profile={profile} />
        )}
        {slideout.contentType === 'satisfaction' && profile && (
          <SatisfactionDetailPanel scores={profile.satisfaction_scores} />
        )}
      </SlideoutPanel>

      {/* All comments summary */}
      <CommentSummaryPanel isOpen={showAllComments} onClose={() => setShowAllComments(false)} />
    </div>
  );
}
