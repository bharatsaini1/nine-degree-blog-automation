import React from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  Zap,
  Users
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const ExecutiveOverview = () => {
  const { trends, competitors, backlog, setActiveTab, sendToStudio } = useIntelligence();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Executive Intelligence Summary Banner */}
      <div className="bg-gradient-to-r from-[#171614] via-[#1c1b18] to-[#141416] p-6 rounded-2xl border border-[#d4af37]/25 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-mono font-semibold">
                Autonomous Morning Briefing
              </span>
              <span className="text-zinc-500 font-mono text-[11px]">| 16 Nov 2026</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-zinc-100">
              Global Real Estate, Brand Strategy & AI Search Movements
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Cross-border capital allocators and luxury developers are abandoning volume classified ads for discreet fiduciary advisory and Generative Engine Optimization (GEO). Competitors remain trapped in superficial portal listicles.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('topicValidator')}
              className="px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-[#d4af37]/10 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Validate Strategy</span>
            </button>
            <button
              onClick={() => setActiveTab('trendRadar')}
              className="px-4 py-2 bg-[#202024] text-zinc-200 text-xs font-medium rounded-xl hover:bg-[#28282e] transition-all flex items-center gap-1.5 border border-[#303036] cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Radar</span>
            </button>
          </div>
        </div>

        {/* 3 Executive Bullet Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#2a2925]">
          <div className="bg-[#111113]/80 p-3.5 rounded-xl border border-[#242428]">
            <div className="text-[11px] font-mono text-[#d4af37] mb-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Global Luxury Divergence</span>
            </div>
            <div className="text-xs text-zinc-200 font-medium">
              Ultra-luxury buyers discount portal discount ads by 40% (Dubai / Mumbai / Pune)
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Discreet media buying and architectural restraint outperform promotional noise.
            </div>
          </div>

          <div className="bg-[#111113]/80 p-3.5 rounded-xl border border-[#242428]">
            <div className="text-[11px] font-mono text-indigo-400 mb-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Generative Search Shift (GEO)</span>
            </div>
            <div className="text-xs text-zinc-200 font-medium">
              34% of HNI Property Queries Initiated in ChatGPT Search & Perplexity
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Developers must optimize for LLM citation benchmarks rather than basic Google blue links.
            </div>
          </div>

          <div className="bg-[#111113]/80 p-3.5 rounded-xl border border-[#242428]">
            <div className="text-[11px] font-mono text-emerald-400 mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nine Degree Advisory Moat</span>
            </div>
            <div className="text-xs text-zinc-200 font-medium">
              Zero competitors offer independent Fiduciary Escrow & Land Due Diligence
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Opportunity to capture high-intent capital allocators via research-grade publications.
            </div>
          </div>
        </div>
      </div>

      {/* Verified Intelligence Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111113] p-4 rounded-xl border border-[#222226]">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Verified Trends Ingested
          </div>
          <div className="text-2xl font-serif font-bold text-zinc-100 mt-1">
            {trends.length}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <span>● 7-day strict window verified</span>
          </div>
        </div>

        <div className="bg-[#111113] p-4 rounded-xl border border-[#222226]">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Competitors Monitored
          </div>
          <div className="text-2xl font-serif font-bold text-zinc-100 mt-1">
            {competitors.length}
          </div>
          <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1 font-mono">
            <span>Housing.com, Knight Frank, PropTiger</span>
          </div>
        </div>

        <div className="bg-[#111113] p-4 rounded-xl border border-[#222226]">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Validated Backlog
          </div>
          <div className="text-2xl font-serif font-bold text-[#d4af37] mt-1">
            {backlog.length}
          </div>
          <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1 font-mono">
            <span>Ready for 1-click Studio run</span>
          </div>
        </div>

        <div className="bg-[#111113] p-4 rounded-xl border border-[#222226]">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Active Multi-Agent Depts
          </div>
          <div className="text-2xl font-serif font-bold text-zinc-100 mt-1">
            5 / 5
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <span>All n8n sub-agents online</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Top Recommended Actions + What Changed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-100 font-serif flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
              <span>Recommended Strategic Actions (Prioritized)</span>
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Based on Market Gaps</span>
          </div>

          <div className="space-y-3">
            {trends.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#17171a] rounded-xl border border-[#26262a] hover:border-[#d4af37]/40 transition-all flex items-start justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                    <span className="text-[#d4af37] font-semibold">Priority #{idx + 1}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{item.confidenceLevel}</span>
                  </div>
                  <div className="text-xs font-medium text-zinc-200 group-hover:text-[#d4af37] transition-colors">
                    {item.recommendedAction}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
                    Angle: {item.suggestedContentAngle}
                  </div>
                </div>

                <button
                  onClick={() => sendToStudio(item)}
                  className="px-2.5 py-1.5 bg-[#d4af37]/15 hover:bg-[#d4af37] text-[#d4af37] hover:text-black text-[11px] font-medium rounded-lg transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span>Draft</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-100 font-serif flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>What Changed? (Intelligence Delta Since Yesterday)</span>
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Persistent Memory</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-[#151518] rounded-xl border border-[#222226]">
              <div className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider mb-0.5">
                Generative AI Search Policy Shift
              </div>
              <div className="text-xs text-zinc-300 font-medium">
                OpenAI expanded conversational ads and sponsored links in ChatGPT Search.
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Source: Search Engine Land / Nine Degree Tech Desk.
              </div>
            </div>

            <div className="p-3 bg-[#151518] rounded-xl border border-[#222226]">
              <div className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider mb-0.5">
                Competitor Positioning Shift
              </div>
              <div className="text-xs text-zinc-300 font-medium">
                Housing.com updated portal listings with 4 new sponsored broker banners.
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Content Gap remains: Zero legal title due-diligence provided to prospective buyers.
              </div>
            </div>

            <div className="p-3 bg-[#151518] rounded-xl border border-[#222226]">
              <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wider mb-0.5">
                Search Intent Spike
              </div>
              <div className="text-xs text-zinc-300 font-medium">
                "luxury real estate marketing strategy 2026" search velocity grew +48% week-over-week.
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                High commercial investigation volume from agency and developer CMOs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
