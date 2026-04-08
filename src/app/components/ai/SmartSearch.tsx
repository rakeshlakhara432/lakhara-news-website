import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Search, AutoAwesome } from '@mui/icons-material';

export const SmartSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    if (!query) return;
    setLoading(true);
    // In a real scenario, this would call an AI embedding endpoint
    setTimeout(() => {
      setResults([
        `AI Results for: ${query}`,
        `"Lakhara Samaj Event in Jaipur" (80% match)`,
        `"Matrimonial profiles matching criteria" (45% match)`
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-md mx-auto print:hidden">
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Smart Search (AI powered)..."
        variant="outlined"
        size="small"
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        InputProps={{
          className: "bg-white/80 backdrop-blur-sm rounded-full",
          startAdornment: (
            <InputAdornment position="start">
              <AutoAwesome className="text-orange-500 size-4" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} disabled={loading} size="small" className="bg-orange-100 p-1">
                {loading ? <CircularProgress size={16} /> : <Search className="text-orange-600 size-4" />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      
      {results.length > 0 && (
        <div className="absolute top-12 left-0 right-0 bg-white border shadow-xl rounded-xl p-3 z-50 animate-in slide-in-from-top-2">
          <div className="text-xs font-bold text-slate-500 mb-2">AI SEARCH RESULTS</div>
          <ul className="space-y-2">
            {results.map((r, i) => (
              <li key={i} className="text-sm p-2 hover:bg-orange-50 rounded cursor-pointer">{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
