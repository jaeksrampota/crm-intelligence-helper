import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useClientSearch } from '../../hooks/use-client-search';
import { SegmentBadge } from '../shared/SegmentBadge';
import { useTranslation } from '../../i18n';

interface SearchBarProps {
  onSelectClient: (clientId: string) => void;
  selectedClientName?: string;
  onClear: () => void;
}

export function SearchBar({ onSelectClient, selectedClientName, onClear }: SearchBarProps) {
  const { query, setQuery, results, isSearching } = useClientSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (clientId: string) => {
    onSelectClient(clientId);
    setShowDropdown(false);
    setQuery('');
  };

  const insetStyle: React.CSSProperties = {
    background: '#ffffff',
    borderTop: '2px solid #808080',
    borderLeft: '2px solid #808080',
    borderRight: '2px solid #ffffff',
    borderBottom: '2px solid #ffffff',
    outline: '1px solid #404040',
    display: 'flex',
    alignItems: 'center',
    minWidth: 240,
    maxWidth: 360,
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
      <div style={insetStyle}>
        <Search size={14} style={{ marginLeft: 6, color: '#808080', flexShrink: 0 }} />
        {selectedClientName ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 6px', flex: 1 }}>
            <span style={{ fontFamily: 'Tahoma, sans-serif', fontSize: 11, fontWeight: 600 }}>{selectedClientName}</span>
            <button
              onClick={onClear}
              style={{
                background: '#d4d0c8',
                borderTop: '1px solid #ffffff',
                borderLeft: '1px solid #ffffff',
                borderRight: '1px solid #808080',
                borderBottom: '1px solid #808080',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 1,
              }}
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder={t.search.placeholder}
            style={{
              width: '100%',
              padding: '3px 6px',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              fontSize: 11,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#000',
            }}
          />
        )}
      </div>

      {showDropdown && query.trim() && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#ffffff',
            borderTop: '1px solid #808080',
            borderLeft: '2px solid #808080',
            borderRight: '2px solid #ffffff',
            borderBottom: '2px solid #ffffff',
            outline: '1px solid #404040',
            zIndex: 30,
            maxHeight: 220,
            overflowY: 'auto',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {isSearching ? (
            <div style={{ padding: '6px 8px', fontFamily: 'Tahoma, sans-serif', fontSize: 11, color: '#808080', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  border: '2px solid #d4d0c8',
                  borderTopColor: '#0a246a',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              {t.search.searching}
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '6px 8px', fontFamily: 'Tahoma, sans-serif', fontSize: 11, color: '#808080' }}>
              {t.search.noResults(query)}
            </div>
          ) : (
            results.map((client) => (
              <button
                key={client.client_id}
                onClick={() => handleSelect(client.client_id)}
                className="win2k-listitem"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '3px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'Tahoma, sans-serif',
                  fontSize: 11,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'default',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <span style={{ fontWeight: 600 }}>{client.name}</span>
                <SegmentBadge segment={client.segment} />
                <span style={{ fontSize: 10, color: '#808080', marginLeft: 'auto' }}>{client.client_id}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
