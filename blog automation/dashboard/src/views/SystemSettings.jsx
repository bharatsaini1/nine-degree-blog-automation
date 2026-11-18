import React, { useState } from 'react';
import { Settings, Download, RefreshCw } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const SystemSettings = () => {
  const { backendOnline, activeWorkspace } = useIntelligence();
  const [cleared, setCleared] = useState(false);

  const handleReset = () => {
    localStorage.clear();
    setCleared(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleExport = () => {
    const data = {
      workspace: activeWorkspace,
      exportedAt: new Date().toISOString(),
      trends: JSON.parse(localStorage.getItem('nd_trends') || '[]'),
      competitors: JSON.parse(localStorage.getItem('nd_competitors') || '[]'),
      keywords: JSON.parse(localStorage.getItem('nd_keywords') || '[]'),
      backlog: JSON.parse(localStorage.getItem('nd_backlog') || '[]')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nine_degree_intelligence_backup_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-lg font-serif font-bold text-zinc-100">
            System & Storage Settings
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
            Configuration
          </span>
        </div>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Manage local persistent intelligence cache, review integration connection status, and export intelligence dossiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-3 text-xs">
          <h3 className="text-sm font-semibold text-zinc-100 font-serif">
            Active Engine Connectors
          </h3>

          <div className="space-y-2">
            <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] flex items-center justify-between">
              <div>
                <div className="font-semibold text-zinc-200">n8n Automation Engine (Port 5678)</div>
                <div className="text-[10px] font-mono text-zinc-500">ID: NDEditorialIntel01</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${backendOnline ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                {backendOnline ? 'CONNECTED' : 'CHECKING'}
              </span>
            </div>

            <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] flex items-center justify-between">
              <div>
                <div className="font-semibold text-zinc-200">Google Gemini API</div>
                <div className="text-[10px] font-mono text-zinc-500">Default Multi-Agent Provider</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] flex items-center justify-between">
              <div>
                <div className="font-semibold text-zinc-200">Anthropic Claude Adapter</div>
                <div className="text-[10px] font-mono text-zinc-500">Claude 3.5 Sonnet Integration</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 text-indigo-400 font-semibold">
                CONFIGURABLE
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs">
          <h3 className="text-sm font-semibold text-zinc-100 font-serif">
            Data Persistence & Local Cache
          </h3>
          <p className="text-zinc-400">
            All trends, competitor dossiers, keyword matrices, and validated hypotheses are stored in persistent local browser storage.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-[#202024] hover:bg-[#28282e] text-zinc-200 rounded-xl border border-[#2e2e34] transition-all flex items-center gap-2 cursor-pointer font-medium"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Export Dossier (JSON)</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl border border-rose-500/30 transition-all flex items-center gap-2 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{cleared ? 'Reloading...' : 'Reset to Default Seeds'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
