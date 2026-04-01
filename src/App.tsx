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
    <div className="min-h-screen" style={{ background: '#008080' }}>
      {/* ── Win2k Taskbar / Toolbar ── */}
      <div
        className="flex items-center gap-1 px-2 h-12 shrink-0"
        style={{
          background: '#d4d0c8',
          borderBottom: '2px solid #404040',
          boxShadow: 'inset 0 1px 0 #ffffff',
        }}
      >
        {/* App icon + name */}
        <div
          className="flex items-center gap-1.5 px-2 py-1 shrink-0"
          style={{
            borderTop: '2px solid #ffffff',
            borderLeft: '2px solid #ffffff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
            outline: '1px solid #000',
            background: '#d4d0c8',
          }}
        >
          <img src={import.meta.env.BASE_URL + 'rb-icon.svg'} alt="Raiffeisenbank" className="w-5 h-5" />
          <span className="font-bold" style={{ fontSize: 11, fontFamily: 'Tahoma, MS Sans Serif, sans-serif' }}>
            {t.app.brandName} — {t.app.title}
          </span>
        </div>

        {/* Separator */}
        <div className="w-px h-8 mx-1" style={{ background: '#808080', borderRight: '1px solid #ffffff' }} />

        <SearchBar
          onSelectClient={setClientId}
          selectedClientName={profile?.client.name}
          onClear={() => { slideout.close(); setClientId(null); }}
        />

        <div className="ml-auto flex items-center gap-1 shrink-0">
          <AllCommentsButton openCount={openCommentCount} onClick={() => setShowAllComments(true)} />

          {/* Separator */}
          <div className="w-px h-8 mx-0.5" style={{ background: '#808080', borderRight: '1px solid #ffffff' }} />

          <button
            onClick={toggleLanguage}
            className="win2k-btn"
            title={language === 'en' ? 'Přepnout do češtiny' : 'Switch to English'}
          >
            <span style={{ opacity: language === 'en' ? 1 : 0.45 }}>EN</span>
            <span style={{ color: '#808080' }}>|</span>
            <span style={{ opacity: language === 'cs' ? 1 : 0.45 }}>CZ</span>
          </button>

          <button
            onClick={logout}
            className="win2k-btn"
            title={t.login.logout}
          >
            <LogOut size={14} />
            {t.login.logout}
          </button>
        </div>
      </div>

      {/* Content */}
      {!clientId ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-48px)] gap-4">
          {/* Win2k welcome dialog */}
          <div
            style={{
              background: '#d4d0c8',
              borderTop: '2px solid #ffffff',
              borderLeft: '2px solid #ffffff',
              borderRight: '2px solid #404040',
              borderBottom: '2px solid #404040',
              outline: '1px solid #000',
              width: 320,
            }}
          >
            <div className="win2k-titlebar">
              <img src={import.meta.env.BASE_URL + 'rb-icon.svg'} alt="" className="w-4 h-4" />
              {t.app.title}
            </div>
            <div className="p-6 flex flex-col items-center gap-4">
              <img src={import.meta.env.BASE_URL + 'rb-logo.svg'} alt="Raiffeisenbank" className="h-10" />
              <p style={{ fontFamily: 'Tahoma, sans-serif', fontSize: 11 }}>{t.app.searchPrompt}</p>
              <div
                className="w-full h-px"
                style={{ background: '#808080', boxShadow: '0 1px 0 #ffffff' }}
              />
              <p className="text-xs" style={{ color: '#808080' }}>CRM Intelligence Helper v1.0</p>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-48px)]">
          <div
            style={{
              background: '#d4d0c8',
              borderTop: '2px solid #ffffff',
              borderLeft: '2px solid #ffffff',
              borderRight: '2px solid #404040',
              borderBottom: '2px solid #404040',
              outline: '1px solid #000',
              padding: '16px 32px',
              fontFamily: 'Tahoma, sans-serif',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              className="w-4 h-4 border-2 animate-spin rounded-full"
              style={{ borderColor: '#0a246a #0a246a #0a246a transparent' }}
            />
            {t.app.loadingClient}
          </div>
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
