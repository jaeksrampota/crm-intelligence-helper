import { useState, useEffect, useRef } from 'react';
import type { Client } from '../types';
import { searchClients } from '../services';

export function useClientSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Client[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setIsSearching(true);
    timerRef.current = setTimeout(async () => {
      const r = await searchClients(query);
      setResults(r);
      setIsSearching(false);
    }, query.trim() ? 200 : 0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  return { query, setQuery, results, isSearching };
}
