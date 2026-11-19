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
      <div className="bg-gradient-to-r from-[#181212] via-[#1c1313] to-[#141417] p-6 lg:p-8 rounded-3xl border border-[#e43d25]/25 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e43d25]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#e43d25] animate-ping" />
              <span className="text-[11px] uppercase tracking-widest text-[#ff6a52] font-mono font-semibold">
                Autonomous Morning Briefing
              </span>
              <span className="text-zinc-500 font-mono text-[11px]">| 16 Nov 2026</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-display font-bold text-zinc-100 tracking-tight">
              Global Real Estate, Brand Strategy & AI Search Movements
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Cross-border capital allocators and luxury developers are abandoning volume classified ads for discreet fiduciary advisory and Generative Engine Optimization (GEO). Competitors remain trapped in superficial portal listicles.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('topicValidator')}
              className="px-5 py-2.5 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Validate Strategy</span>
            </button>
            <button
              onClick={() => setActiveTab('trendRadar')}
              className="px-5 py-2.5 bg-[#18181c] text-zinc-200 text-xs font-medium rounded-full hover:bg-[#202026] hover:border-[#e43d25]/40 transition-all flex items-center gap-2 border border-[#2b2b32] cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Radar</span>
            </button>
          </div>
        </div>

        {/* 3 Executive Bullet Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#291b1b] relative z-10">
          <div className="bg-[#141418]/90 p-4 rounded-2xl border border-[#24242c]">
            <div className="text-[11px] font-mono text-[#ff6a52] mb-1 flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-[#e43d25]" />
              <span>Global Luxury Divergence</span>
            </div>
            <div className="text-xs text-zinc-200 font-medium">
              Ultra-luxury buyers discount portal discount ads by 40% (Dubai / Mumbai / Pune)
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Discreet media buying and architectural restraint outperform promotional noise.
            </div>
          </div>

          <div className="bg-[#141418]/90 p-4 rounded-2xl border border-[#24242c]">
            <div className="text-[11px] font-mono text-indigo-400 mb-1 flex items-center gap-1.5 font-medium">
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

          <div className="bg-[#141418]/90 p-4 rounded-2xl border border-[#24242c]">
            <div className="text-[11px] font-mono text-emerald-400 mb-1 flex items-center gap-1.5 font-medium">
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
        <div className="bg-[#16161a] p-5 rounded-2xl border border-[#26262b] hover:border-[#383842] transition-colors">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Verified Trends Ingested
          </div>
          <div className="text-2xl font-display font-bold text-zinc-100 mt-1">
            {trends.length}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <span>● 7-day strict window verified</span>
          </div>
        </div>

        <div className="bg-[#16161a] p-5 rounded-2xl border border-[#26262b] hover:border-[#383842] transition-colors">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Competitors Monitored
          </div>
          <div className="text-2xl font-display font-bold text-zinc-100 mt-1">
            {competitors.length}
          </div>
          <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1 font-mono">
            <span>Housing.com, Knight Frank, PropTiger</span>
          </div>
        </div>

        <div className="bg-[#16161a] p-5 rounded-2xl border border-[#26262b] hover:border-[#383842] transition-colors">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Validated Backlog
          </div>
          <div className="text-2xl font-display font-bold text-[#e43d25] mt-1">
            {backlog.length}
          </div>
          <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1 font-mono">
            <span>Ready for 1-click Studio run</span>
          </div>
        </div>

        <div className="bg-[#16161a] p-5 rounded-2xl border border-[#26262b] hover:border-[#383842] transition-colors">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Active Multi-Agent Depts
          </div>
          <div className="text-2xl font-display font-bold text-zinc-100 mt-1">
            5 / 5
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <span>All n8n sub-agents online</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Top Recommended Actions + What Changed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#16161a] p-6 rounded-3xl border border-[#26262b]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-zinc-100 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#e43d25]" />
              <span>Recommended Strategic Actions (Prioritized)</span>
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Based on Market Gaps</span>
          </div>

          <div className="space-y-3">
            {trends.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830] hover:border-[#e43d25]/40 transition-all flex items-start justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                    <span className="text-[#ff6a52] font-semibold">Priority #{idx + 1}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{item.confidenceLevel}</span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 group-hover:text-[#ff6a52] transition-colors">
                    {item.recommendedAction}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
                    Angle: {item.suggestedContentAngle}
                  </div>
                </div>

                <button
                  onClick={() => sendToStudio(item)}
                  className="px-3.5 py-1.5 bg-[#e43d25]/15 hover:bg-[#e43d25] text-[#ff6a52] hover:text-white text-[11px] font-semibold rounded-full transition-all shrink-0 flex items-center gap-1 cursor-pointer border border-[#e43d25]/30 hover:border-transparent"
                >
                  <span>Draft</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#16161a] p-6 rounded-3xl border border-[#26262b]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-zinc-100 font-display flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ff573d]" />
              <span>What Changed? (Intelligence Delta Since Yesterday)</span>
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Persistent Memory</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#1b1b20] rounded-2xl border border-[#282830]">
              <div className="text-[10px] font-mono text-[#ff8f7d] uppercase tracking-wider mb-0.5 font-semibold">
                Generative AI Search Policy Shift
              </div>
              <div className="text-xs text-zinc-300 font-medium">
                OpenAI expanded conversational ads and sponsored links in ChatGPT Search.
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Source: Search Engine Land / Nine Degree Tech Desk.
              </div>
            </div>

            <div className="p-3.5 bg-[#1b1b20] rounded-2xl border border-[#282830]">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-0.5 font-semibold">
                Competitor Positioning Shift
              </div>
              <div className="text-xs text-zinc-300 font-medium">
                Housing.com updated portal listings with 4 new sponsored broker banners.
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Content Gap remains: Zero legal title due-diligence provided to prospective buyers.
              </div>
            </div>

            <div className="p-3.5 bg-[#1b1b20] rounded-2xl border border-[#282830]">
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-0.5 font-semibold">
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
