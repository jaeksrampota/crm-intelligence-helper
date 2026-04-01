import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useClientSearch } from '../../hooks/use-client-search';
import { SegmentBadge } from '../shared/SegmentBadge';

interface SearchBarProps {
  onSelectClient: (clientId: string) => void;
  selectedClientName?: string;
  onClear: () => void;
}

export function SearchBar({ onSelectClient, selectedClientName, onClear }: SearchBarProps) {
  const { query, setQuery, results, isSearching } = useClientSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:border-rb-yellow focus-within:ring-1 focus-within:ring-rb-yellow">
        <Search size={16} className="ml-3 text-gray-400" />
        {selectedClientName ? (
          <div className="flex items-center gap-2 px-3 py-2 flex-1">
            <span className="text-sm font-medium">{selectedClientName}</span>
            <button onClick={onClear} className="p-0.5 hover:bg-gray-100 rounded">
              <X size={14} className="text-gray-400" />
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
            placeholder="Search client by name or ID..."
            className="w-full px-3 py-2 text-sm bg-transparent outline-none"
          />
        )}
      </div>

      {showDropdown && query.trim() && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="px-3 py-2 text-xs text-gray-400">Searching...</div>
          ) : results.length === 0 ? (
            <div className="px-3 py-2 text-xs text-gray-400">No clients found</div>
          ) : (
            results.map((client) => (
              <button
                key={client.client_id}
                onClick={() => handleSelect(client.client_id)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <span className="text-sm font-medium">{client.name}</span>
                <SegmentBadge segment={client.segment} />
                <span className="text-[10px] text-gray-400 ml-auto">{client.client_id}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
