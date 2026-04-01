import { useState, useEffect, useContext } from 'react';
import type { ClientProfile, BehavioralSignalsSummary, SalesTip, Alert } from '../types';
import {
  fetchClient,
  fetchProducts,
  fetchInteractions,
  fetchTransactions,
  fetchBehavioralSignals,
  fetchCampaigns,
} from '../services';
import { getSalesTips, getAlerts } from '../providers';
import { satisfactionScores } from '../data';
import { behavioralEvents } from '../data';
import { LanguageContext } from '../i18n';

export function useClientDashboard(clientId: string | null) {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [salesTips, setSalesTips] = useState<SalesTip[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [behavioralSignals, setBehavioralSignals] = useState<BehavioralSignalsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (!clientId) {
      setProfile(null);
      setSalesTips([]);
      setAlerts([]);
      setBehavioralSignals(null);
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const [client, products, interactions, transactions, campaigns, signals] = await Promise.all([
          fetchClient(clientId!),
          fetchProducts(clientId!),
          fetchInteractions(clientId!, 10),
          fetchTransactions(clientId!),
          fetchCampaigns(clientId!),
          fetchBehavioralSignals(clientId!),
        ]);

        if (cancelled) return;

        if (!client) {
          setError('Client not found');
          setIsLoading(false);
          return;
        }

        const clientProfile: ClientProfile = {
          client,
          products,
          interactions,
          transactions,
          campaigns,
          behavioral_events: behavioralEvents.filter((e) => e.client_id === clientId),
          satisfaction_scores: satisfactionScores.filter((s) => s.client_id === clientId),
        };

        const tips = getSalesTips(clientProfile, language);
        const alertsList = getAlerts(clientProfile, language);

        setProfile(clientProfile);
        setSalesTips(tips);
        setAlerts(alertsList);
        setBehavioralSignals(signals);
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load client data');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [clientId, language]);

  // Re-generate tips and alerts when language changes (without re-fetching)
  useEffect(() => {
    if (profile) {
      setSalesTips(getSalesTips(profile, language));
      setAlerts(getAlerts(profile, language));
    }
  }, [language, profile]);

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, dismissed: true } : a)));
  };

  return { profile, salesTips, alerts, behavioralSignals, isLoading, error, dismissAlert };
}
