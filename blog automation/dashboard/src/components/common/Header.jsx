import React from 'react';
import { Sparkles } from 'lucide-react';
import { useIntelligence } from '../../context/IntelligenceContext';

export const Header = () => {
  const { setActiveTab, aiModels } = useIntelligence();

  const isClaudeActive = aiModels.claude.status === 'connected';

  return (
    <header className="h-16 border-b border-[#26262b] bg-[#111114]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-zinc-100 font-display tracking-tight">
            Nine Degree Strategic Editorial OS
          </h1>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e43d25]/15 text-[#ff573d] border border-[#e43d25]/30 font-medium">
            Strategic Growth Cockpit
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 font-sans">
          Global market signal ingestion, competitive teardown & multi-agent publishing
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 bg-[#18181c] px-3 py-1.5 rounded-full border border-[#2a2a30] text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300 font-mono">Gemini 2.5 (Default)</span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isClaudeActive ? 'bg-[#ff573d]' : 'bg-zinc-600'
              }`}
            />
            <span
              className={`font-mono ${
                isClaudeActive ? 'text-[#ffb3a8]' : 'text-zinc-400'
              }`}
            >
              {isClaudeActive ? 'Claude 3.5 Sonnet' : 'Claude Ready'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('topicValidator')}
          className="flex items-center gap-2 px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-md shadow-[#e43d25]/25 hover:shadow-lg hover:shadow-[#e43d25]/40 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Validate Idea</span>
        </button>
      </div>
    </header>
  );
};
