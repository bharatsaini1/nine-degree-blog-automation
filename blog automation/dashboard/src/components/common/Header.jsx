import React from 'react';
import { Sparkles } from 'lucide-react';
import { useIntelligence } from '../../context/IntelligenceContext';

export const Header = () => {
  const { setActiveTab, aiModels, perspective } = useIntelligence();

  const getPerspectiveLabel = () => {
    switch (perspective) {
      case 'cmo':
        return 'CMO & Strategic Growth Cockpit';
      case 'strategist':
        return 'Head of Content & SEO Architecture';
      case 'vc':
        return 'VC, Real Estate Fund & Due Diligence';
      default:
        return 'Executive Editorial Bureau';
    }
  };

  const isClaudeActive = aiModels.claude.status === 'connected';

  return (
    <header className="h-16 border-b border-[#26262a] bg-[#0c0c0e]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold text-zinc-100 font-serif tracking-wide">
            Nine Degree Strategic Editorial OS
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
            {getPerspectiveLabel()}
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 font-sans">
          Global market signal ingestion, competitive teardown & multi-agent publishing
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 bg-[#141417] px-3 py-1.5 rounded-lg border border-[#26262a] text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300 font-mono">Gemini 2.5 (Default)</span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isClaudeActive ? 'bg-indigo-400' : 'bg-zinc-600'
              }`}
            />
            <span
              className={`font-mono ${
                isClaudeActive ? 'text-indigo-300' : 'text-zinc-400'
              }`}
            >
              {isClaudeActive ? 'Claude 3.5 Sonnet' : 'Claude Ready'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('topicValidator')}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black text-xs font-semibold rounded-lg shadow-sm hover:brightness-110 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Validate Idea</span>
        </button>
      </div>
    </header>
  );
};
