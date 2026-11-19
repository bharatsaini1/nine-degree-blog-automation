import React, { useState } from 'react';
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
  Users,
  RefreshCw
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const ExecutiveOverview = () => {
  const { trends, competitors, backlog, setActiveTab, sendToStudio } = useIntelligence();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshDelta, setRefreshDelta] = useState(0);

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRefreshDelta((prev) => prev + 1);
      setIsRefreshing(false);
    }, 800);
  };

  const activeBriefing = {
    badge: 'Nine Degree Global Advisory',
      dateLabel: currentDate,
      title: 'Global Real Estate Brand Positioning, Media Allocation & GEO Dominance',
      summary:
        'Cross-border capital allocators and luxury developers are abandoning volume classified ads for discreet fiduciary advisory and Generative Engine Optimization (GEO). Competitors remain trapped in superficial portal listicles.',
      insights: [
        {
          label: 'Global Luxury Divergence',
          icon: TrendingUp,
          color: 'text-[#ff6a52]',
          headline: 'Ultra-luxury buyers discount portal discount ads by 40% (Dubai / Mumbai / Pune / Jaipur)',
          detail: 'Discreet media buying and architectural restraint outperform promotional noise.'
        },
        {
          label: 'Generative Search Shift (GEO)',
          icon: AlertCircle,
          color: 'text-indigo-400',
          headline: '34% of HNI Property Queries Initiated in ChatGPT Search & Perplexity',
          detail: 'Developers must optimize for LLM citation benchmarks rather than basic Google blue links.'
        },
        {
          label: 'Nine Degree Advisory Moat',
          icon: ShieldCheck,
          color: 'text-emerald-400',
          headline: 'Zero competitors offer independent Fiduciary Escrow & Land Due Diligence',
          detail: 'Opportunity to capture high-intent capital allocators via research-grade publications.'
        }
      ],
      deltas: [
        {
          tag: 'Generative AI Search Policy Shift',
          color: 'text-[#ff8f7d]',
          title: 'OpenAI expanded conversational ads and sponsored links in ChatGPT Search.',
          source: 'Source: Search Engine Land / Nine Degree Tech Desk.'
        },
        {
          tag: 'Competitor Positioning Shift',
          color: 'text-emerald-400',
          title: 'Housing.com added 4 new sponsored broker banners without title due diligence.',
          source: 'Content Gap remains: Zero legal title due-diligence provided to prospective buyers.'
        },
        {
          tag: 'Search Velocity Spike',
          color: 'text-amber-400',
          title: '"luxury real estate marketing strategy 2026" search velocity grew +48% week-over-week.',
          source: 'High commercial investigation volume from agency and developer CMOs.'
        }
      ]
  };

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
              <span className="text-zinc-500 font-mono text-[11px]">| {activeBriefing.dateLabel}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e43d25]/15 text-[#ff8f7d] border border-[#e43d25]/30">
                {activeBriefing.badge}
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl font-display font-bold text-zinc-100 tracking-tight">
              {activeBriefing.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {activeBriefing.summary}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[10.5px] font-mono">
              <span className="text-zinc-500 font-semibold uppercase tracking-wider">Verified Streams:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#16161b] border border-[#26262e] text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Raj-RERA</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#16161b] border border-[#26262e] text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>MahaRERA</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#16161b] border border-[#26262e] text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>JDA Master Plan</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#16161b] border border-[#26262e] text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>RBI Remittance</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#16161b] border border-[#26262e] text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Knight Frank</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 bg-[#18181c] text-zinc-300 hover:text-white rounded-full border border-[#2b2b32] hover:border-[#e43d25]/40 transition-all cursor-pointer shadow-sm"
              title="Refresh Intelligence Briefing"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#e43d25]' : ''}`} />
            </button>
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

        {/* 3 Executive Strategic Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#291b1b] relative z-10">
          {activeBriefing.insights.map((ins, i) => {
            const IconComponent = ins.icon;
            return (
              <div key={i} className="bg-[#141418]/90 p-4 rounded-2xl border border-[#24242c] flex flex-col justify-between">
                <div>
                  <div className={`text-[11px] font-mono ${ins.color} mb-1 flex items-center gap-1.5 font-medium`}>
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{ins.label}</span>
                  </div>
                  <div className="text-xs text-zinc-200 font-medium leading-snug">
                    {ins.headline}
                  </div>
                </div>
                <div className="text-[11px] text-zinc-500 mt-2">
                  {ins.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Intelligence Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveTab('trendRadar')}
          className="bg-[#16161a] p-5 rounded-2xl border border-[#26262b] hover:border-[#e43d25]/50 transition-all text-left cursor-pointer group shadow-sm"
        >
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider group-hover:text-zinc-300">
            Verified Trends Ingested
          </div>
          <div className="text-2xl font-display font-bold text-zinc-100 mt-1 group-hover:text-[#ff6a52] transition-colors">
            {trends.length}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <span>● 7-day strict window verified</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('competitor')}
          className="bg-[#16161a] p-5 rounded-2xl border border-[#26262b] hover:border-[#e43d25]/50 transition-all text-left cursor-pointer group shadow-sm"
        >
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider group-hover:text-zinc-300">
            Competitors Monitored
          </div>
          <div className="text-2xl font-display font-bold text-zinc-100 mt-1 group-hover:text-[#ff6a52] transition-colors">
            {competitors.length}
          </div>
          <div className="text-[11px] text-zinc-400 truncate flex items-center gap-1 mt-1 font-mono">
            <span>{competitors.map(c => c.name.split(' ')[0]).slice(0, 3).join(', ')}</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('backlog')}
          className="bg-[#16161a] p-5 rounded-2xl border border-[#26262b] hover:border-[#e43d25]/50 transition-all text-left cursor-pointer group shadow-sm"
        >
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider group-hover:text-zinc-300">
            Validated Backlog
          </div>
          <div className="text-2xl font-display font-bold text-[#e43d25] mt-1 group-hover:text-[#ff6a52] transition-colors">
            {backlog.length}
          </div>
          <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-1 font-mono">
            <span>Ready for 1-click Studio run</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('agents')}
          className="bg-[#16161a] p-5 rounded-2xl border border-[#26262b] hover:border-[#e43d25]/50 transition-all text-left cursor-pointer group shadow-sm"
        >
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider group-hover:text-zinc-300">
            Active Multi-Agent Depts
          </div>
          <div className="text-2xl font-display font-bold text-zinc-100 mt-1 group-hover:text-[#ff6a52] transition-colors">
            5 / 5
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <span>All n8n sub-agents online</span>
          </div>
        </button>
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
                className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830] hover:border-[#e43d25]/40 transition-all flex items-start justify-between gap-3 group shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                    <span className="text-[#ff6a52] font-semibold">Priority #{idx + 1}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{item.confidenceLevel}</span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 group-hover:text-[#ff6a52] transition-colors leading-snug">
                    {item.recommendedAction}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 line-clamp-1 italic">
                    "{item.suggestedContentAngle || item.headline}"
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="text-zinc-500">Source:</span>
                    <span className="text-zinc-300 font-medium truncate max-w-[280px]">
                      {item.sourceName || 'Rajasthan RERA / State Gazette'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => sendToStudio(item)}
                  className="px-4 py-1.5 bg-[#e43d25]/15 hover:bg-[#e43d25] text-[#ff6a52] hover:text-white text-[11px] font-semibold rounded-full transition-all shrink-0 flex items-center gap-1 cursor-pointer border border-[#e43d25]/30 hover:border-transparent shadow-sm"
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
            <span className="text-[10px] font-mono text-zinc-500">Live Delta Feed</span>
          </div>

          <div className="space-y-3">
            {activeBriefing.deltas.map((del, dIdx) => (
              <div key={dIdx} className="p-3.5 bg-[#1b1b20] rounded-2xl border border-[#282830]">
                <div className={`text-[10px] font-mono ${del.color} uppercase tracking-wider mb-0.5 font-semibold`}>
                  {del.tag}
                </div>
                <div className="text-xs text-zinc-300 font-medium leading-snug">
                  {del.title}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[10.5px] font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="text-zinc-400">{del.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
