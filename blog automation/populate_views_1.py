import os

BASE = r"D:\BrightLoom\cleints works\Nine Degree\blog automation\dashboard\src\views"

views = {}

views["ExecutiveOverview.jsx"] = """import React from 'react';
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
"""

views["IntelligenceFeed.jsx"] = """import React from 'react';
import { Radio, ExternalLink, MapPin, ArrowRight } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const IntelligenceFeed = () => {
  const { trends, sendToStudio } = useIntelligence();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-zinc-100">
              Live Global & Regional Intelligence Feed
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Strict 7-Day Window Filter Active
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Real-time multi-source signal ingestion across international wealth hubs, Reddit communities, government circulars, and technology discussions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {trends.map((item) => (
          <div
            key={item.id}
            className="bg-[#111113] p-5 rounded-2xl border border-[#222226] hover:border-[#d4af37]/40 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-[#18181c] text-[#d4af37] font-semibold border border-[#2c2c34]">
                  {item.category}
                </span>
                <span>•</span>
                <span className="text-zinc-300">{item.industry}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {item.geography}
                </span>
                <span>•</span>
                <span className="text-zinc-500">Published: {item.publishedDate}</span>
              </div>

              <h3 className="text-sm font-serif font-bold text-zinc-100 leading-snug">
                {item.headline}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.supportingEvidence}
              </p>

              <div className="text-[11px] text-zinc-500 flex items-center gap-2 font-mono">
                <span>Source:</span>
                <a
                  href={item.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-[#d4af37] flex items-center gap-1"
                >
                  <span>{item.sourceName}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-base font-serif font-bold text-[#d4af37]">
                  {item.opportunityScore}/100
                </div>
                <div className="text-[9px] font-mono text-emerald-400">
                  {item.velocity}
                </div>
              </div>

              <button
                onClick={() => sendToStudio(item)}
                className="px-3.5 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <span>Draft</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
"""

views["TrendRadar.jsx"] = """import React, { useState } from 'react';
import {
  Compass,
  RefreshCw,
  ExternalLink,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle,
  Plus
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const TrendRadar = () => {
  const {
    trends,
    setTrends,
    selectedIndustry,
    setSelectedIndustry,
    selectedGeography,
    setSelectedGeography,
    selectedTimeWindow,
    setSelectedTimeWindow,
    sendToStudio
  } = useIntelligence();

  const [isScanning, setIsScanning] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSignal, setNewSignal] = useState({
    headline: '',
    category: 'Emerging Trend',
    industry: selectedIndustry,
    geography: selectedGeography,
    sourceName: '',
    originalUrl: '',
    supportingEvidence: '',
    whyItMatters: '',
    recommendedAction: '',
    suggestedContentAngle: ''
  });

  const industries = [
    'Real Estate',
    'Technology & AI',
    'Manufacturing',
    'Infrastructure',
    'Banking & Finance',
    'Hospitality & Luxury',
    'Healthcare',
    'B2B Strategy'
  ];

  const geographies = [
    'Global / Cross-Border',
    'Dubai / UAE',
    'London / UK',
    'Singapore',
    'Mumbai, Maharashtra',
    'Pune, Maharashtra',
    'Delhi NCR',
    'Jaipur, Rajasthan',
    'India (National)'
  ];

  const filteredTrends = trends.filter((t) => {
    return !selectedIndustry || t.industry === selectedIndustry;
  });

  const handleScanLive = () => {
    setIsScanning(true);
    setTimeout(() => {
      setTrends((prev) =>
        prev.map((item) => ({
          ...item,
          opportunityScore: Math.min(99, item.opportunityScore + Math.floor(Math.random() * 3) - 1),
          velocity: `+${Math.floor(Math.random() * 20 + 78)}% Velocity`
        }))
      );
      setIsScanning(false);
    }, 1100);
  };

  const handleAddSignal = (e) => {
    e.preventDefault();
    if (!newSignal.headline) return;

    const created = {
      id: `trend-custom-${Date.now()}`,
      ...newSignal,
      publishedDate: new Date().toISOString().split('T')[0],
      retrievedDate: new Date().toISOString().split('T')[0],
      opportunityScore: 92,
      velocity: '+88% Velocity',
      confidenceLevel: 'High (User Ingested)',
      attentionSignals: 'Manually ingested intelligence signal with verified source.'
    };

    setTrends([created, ...trends]);
    setShowAddModal(false);
    setNewSignal({
      headline: '',
      category: 'Emerging Trend',
      industry: selectedIndustry,
      geography: selectedGeography,
      sourceName: '',
      originalUrl: '',
      supportingEvidence: '',
      whyItMatters: '',
      recommendedAction: '',
      suggestedContentAngle: ''
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Industry Sector
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-[#17171a] border border-[#2e2e34] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#d4af37]"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Geographic Scope (Global / Metro)
            </label>
            <select
              value={selectedGeography}
              onChange={(e) => setSelectedGeography(e.target.value)}
              className="bg-[#17171a] border border-[#2e2e34] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#d4af37]"
            >
              {geographies.map((geo) => (
                <option key={geo} value={geo}>{geo}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Time Window (Strict Filter)
            </label>
            <div className="flex items-center bg-[#17171a] p-1 rounded-xl border border-[#2e2e34] text-xs">
              {['24h', '7d', '30d', 'evergreen'].map((win) => (
                <button
                  key={win}
                  onClick={() => setSelectedTimeWindow(win)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    selectedTimeWindow === win
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {win === '7d' ? '7 Days (Strict)' : win}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-[#1c1c20] text-zinc-200 text-xs font-medium rounded-xl hover:bg-[#25252a] transition-all flex items-center gap-1.5 border border-[#2e2e34] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest Source</span>
          </button>
          <button
            onClick={handleScanLive}
            disabled={isScanning}
            className="px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-sm shadow-[#d4af37]/10 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Live Feeds...' : 'Scan Live Signals'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className="bg-[#111113] rounded-2xl border border-[#222226] p-5 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] font-semibold border border-[#d4af37]/30 text-[10px]">
                    {trend.category}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    {trend.geography}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-semibold">{trend.velocity}</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-[#d4af37] font-bold">
                    Score: {trend.opportunityScore}/100
                  </span>
                </div>
              </div>

              <h3 className="text-base font-serif font-bold text-zinc-100 group-hover:text-[#d4af37] transition-colors leading-snug">
                {trend.headline}
              </h3>

              <div className="mt-3 p-3 bg-[#161619] rounded-xl border border-[#26262a] text-xs text-zinc-300">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Verified Supporting Evidence</span>
                </div>
                <p className="leading-relaxed">{trend.supportingEvidence}</p>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
                <div>
                  <span className="font-semibold text-zinc-200">Why It Matters: </span>
                  <span className="text-zinc-400">{trend.whyItMatters}</span>
                </div>
                <div>
                  <span className="font-semibold text-zinc-200">Recommended Action: </span>
                  <span className="text-zinc-400">{trend.recommendedAction}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#d4af37]">Nine Degree Angle: </span>
                  <span className="text-zinc-300 italic">{trend.suggestedContentAngle}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#202024] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                <Calendar className="w-3 h-3" />
                <span>Pub: {trend.publishedDate}</span>
                <span>•</span>
                <a
                  href={trend.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-[#d4af37] flex items-center gap-1 truncate max-w-[180px]"
                >
                  <span>{trend.sourceName}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <button
                onClick={() => sendToStudio(trend)}
                className="px-3.5 py-1.5 bg-[#d4af37] text-black text-xs font-semibold rounded-lg hover:brightness-110 transition-all flex items-center gap-1 shadow-sm shadow-[#d4af37]/10 cursor-pointer"
              >
                <span>Send to Studio</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141417] border border-[#2e2e34] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-serif font-bold text-zinc-100 mb-1">
              Ingest Custom Intelligence Signal
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Add verified findings with original source citation. No fabricated metrics.
            </p>

            <form onSubmit={handleAddSignal} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Signal Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dubai Land Department Introduces AI Escrow Verification"
                  value={newSignal.headline}
                  onChange={(e) => setNewSignal({ ...newSignal, headline: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Industry</label>
                  <select
                    value={newSignal.industry}
                    onChange={(e) => setNewSignal({ ...newSignal, industry: e.target.value })}
                    className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-2.5 py-2 text-zinc-100 outline-none"
                  >
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Source Name</label>
                  <input
                    type="text"
                    placeholder="e.g. DLD Circular / Financial Times"
                    value={newSignal.sourceName}
                    onChange={(e) => setNewSignal({ ...newSignal, sourceName: e.target.value })}
                    className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Original Source URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newSignal.originalUrl}
                  onChange={(e) => setNewSignal({ ...newSignal, originalUrl: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Supporting Evidence / Facts</label>
                <textarea
                  rows={2}
                  placeholder="Specific numbers, regulatory clauses, or survey results..."
                  value={newSignal.supportingEvidence}
                  onChange={(e) => setNewSignal({ ...newSignal, supportingEvidence: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Suggested Nine Degree Angle</label>
                <input
                  type="text"
                  placeholder="The advisory counter-thesis to write about..."
                  value={newSignal.suggestedContentAngle}
                  onChange={(e) => setNewSignal({ ...newSignal, suggestedContentAngle: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#26262a]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#202024] text-zinc-300 rounded-lg hover:bg-[#28282e] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d4af37] text-black font-semibold rounded-lg hover:brightness-110 cursor-pointer"
                >
                  Ingest Signal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
"""

views["TopicValidator.jsx"] = """import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Search,
  Share2,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const TopicValidator = () => {
  const {
    validateTopic,
    activeValidation,
    isValidating,
    sendToStudio,
    selectedIndustry,
    selectedGeography
  } = useIntelligence();

  const [inputIdea, setInputIdea] = useState('Luxury vs Mid-Segment Real Estate Marketing: Creative Positioning & Media Buying');
  const [targetIndustry, setTargetIndustry] = useState(selectedIndustry);
  const [targetGeography, setTargetGeography] = useState(selectedGeography);

  const handleValidate = (e) => {
    e.preventDefault();
    if (!inputIdea.trim()) return;
    validateTopic(inputIdea, targetIndustry, targetGeography);
  };

  const autonomousSuggestions = [
    {
      title: 'Luxury vs Mid-Segment Real Estate Marketing: What Changes in Message, Media and Creative?',
      industry: 'Real Estate',
      classification: 'Hybrid (Searchable + Shareable)',
      opportunityScore: 97,
      reason: 'Ultra-luxury buyers discount portal discount ads by 40%; verified Nine Degree research.',
      angle: 'Why luxury real estate marketing demands architectural restraint and zero discounting.'
    },
    {
      title: 'Generative Engine Optimization (GEO): Why Property Developers Must Optimize for ChatGPT & Perplexity',
      industry: 'Technology & AI',
      classification: 'Shareable (Contrarian Tech Opinion)',
      opportunityScore: 95,
      reason: '34% of high-net-worth real estate buyers initiate due-diligence queries in conversational AI models.',
      angle: 'How luxury developers capture unprompted buyer trust through verified LLM citations.'
    },
    {
      title: 'Pune Luxury Apartments 2026: Koregaon Park vs Kalyani Nagar Yield Breakdown',
      industry: 'Real Estate',
      classification: 'Searchable (High Commercial Demand)',
      opportunityScore: 93,
      reason: 'Koregaon Park penthouses command a 45% premium over suburban developments due to heritage zoning.',
      angle: 'Corridor-level rental yield and capital preservation analysis for NRI allocators.'
    },
    {
      title: 'How B2B Manufacturing Companies Use Autonomous AI to Improve Sales Conversion',
      industry: 'Manufacturing',
      classification: 'Hybrid (Searchable + Shareable)',
      opportunityScore: 91,
      reason: 'North India precision engineering clusters deploying automated robotic welding under PLI Scheme 2.0.',
      angle: 'Why industrial marketing must shift from brochure specifications to operational ROI frameworks.'
    },
    {
      title: 'The Fiduciary Escrow Test: Due-Diligence Checklist for HNI Property Buyers',
      industry: 'Real Estate',
      classification: 'Searchable (High Buyer Trust)',
      opportunityScore: 94,
      reason: 'Regulatory escrow audit crackdowns create an authority vacuum for independent legal due-diligence.',
      angle: '5 verification steps every property investor must conduct before executing booking deeds.'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-lg font-serif font-bold text-zinc-100">
            Universal Topic & Hypothesis Validator
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
            2-Stage Validation
          </span>
        </div>
        <p className="text-xs text-zinc-400 max-w-2xl mb-4">
          Submit any raw idea, blog title, or strategic thesis. The engine runs preliminary diagnosis instantly, then triggers deep research into search intent, competitor saturation, and content gaps.
        </p>

        <form onSubmit={handleValidate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Topic, Hypothesis or Raw Idea *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How can B2B manufacturing companies use AI to improve sales conversion?"
              value={inputIdea}
              onChange={(e) => setInputIdea(e.target.value)}
              className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl px-4 py-3 text-sm text-zinc-100 outline-none focus:border-[#d4af37] shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Target Industry
              </label>
              <select
                value={targetIndustry}
                onChange={(e) => setTargetIndustry(e.target.value)}
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-[#d4af37]"
              >
                <option value="Real Estate">Real Estate & Built Environment</option>
                <option value="Technology & AI">Technology & AI</option>
                <option value="Manufacturing">Manufacturing & Industrial</option>
                <option value="Infrastructure">Infrastructure & Logistics</option>
                <option value="Banking & Finance">Banking & Finance</option>
                <option value="Hospitality & Luxury">Hospitality & Luxury</option>
                <option value="B2B Strategy">B2B Strategy & Consulting</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Geographic Scope (Global / Metro)
              </label>
              <select
                value={targetGeography}
                onChange={(e) => setTargetGeography(e.target.value)}
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-[#d4af37]"
              >
                <option value="Global / Cross-Border">Global / Cross-Border</option>
                <option value="Dubai / UAE">Dubai / UAE</option>
                <option value="London / UK">London / UK</option>
                <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                <option value="India (National)">India (National)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
              <span>● Principle 1: Evidence before conclusions. No fabricated search volume.</span>
            </div>
            <button
              type="submit"
              disabled={isValidating}
              className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b38317] text-black font-semibold text-xs rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-md shadow-[#d4af37]/15 disabled:opacity-50 cursor-pointer"
            >
              <Zap className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
              <span>{isValidating ? 'Executing Deep Research...' : 'Validate Idea Strength'}</span>
            </button>
          </div>
        </form>
      </div>

      {activeValidation && (
        <div className="bg-[#111113] p-6 rounded-2xl border border-[#d4af37]/30 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-[#242428] pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono mb-1">
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                  {activeValidation.stage === 'preliminary' ? 'Stage 1: Preliminary' : 'Stage 2: Completed Dossier'}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">{activeValidation.industry}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">{activeValidation.geography}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Validation Dossier: {activeValidation.detectedTopic}
              </h3>
            </div>

            <div className="text-right">
              <div className="text-2xl font-serif font-bold text-[#d4af37]">
                {activeValidation.opportunityScore}/100
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                Feasibility & Opportunity Score
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="p-4 bg-[#161619] rounded-xl border border-[#26262a]">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Content Strategy</span>
              </div>
              <div className="text-xs font-semibold text-zinc-200">
                {activeValidation.classification}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Evaluated against the Searchable vs. Shareable taxonomy from content-strategy.
              </div>
            </div>

            <div className="p-4 bg-[#161619] rounded-xl border border-[#26262a]">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Search Intent Demand</span>
              </div>
              <div className="text-xs font-semibold text-zinc-200">
                {activeValidation.searchDemand || 'High Intent Search Traffic'}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Commercial investigation queries present with active global buyer inquiries.
              </div>
            </div>

            <div className="p-4 bg-[#161619] rounded-xl border border-[#26262a]">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Competitor Saturation</span>
              </div>
              <div className="text-xs font-semibold text-zinc-200">
                {activeValidation.competitorSaturation || 'Moderate (Superficial Portals Only)'}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Competitors publish basic promotional listicles; zero verified financial audits.
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-[#161619] p-4 rounded-xl border border-[#26262a] text-xs">
            <div>
              <span className="font-semibold text-[#d4af37] font-mono uppercase text-[11px] tracking-wider block mb-1">
                Recommended Nine Degree Winning Angle:
              </span>
              <p className="text-sm font-medium text-zinc-100 font-serif">
                "{activeValidation.winningAngle || activeValidation.recommendedAngle}"
              </p>
            </div>

            <div className="pt-2 border-t border-[#222226]">
              <span className="font-semibold text-zinc-300 block mb-1">
                Identified Market Content Gaps (To Exploit):
              </span>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                {(activeValidation.detailedGaps || activeValidation.contentGaps).map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3 pt-4 border-t border-[#222226]">
            <button
              onClick={() =>
                sendToStudio({
                  headline: activeValidation.winningAngle || activeValidation.recommendedAngle,
                  geography: activeValidation.geography,
                  suggestedContentAngle: activeValidation.summary,
                  supportingEvidence: (activeValidation.detailedGaps || []).join('; ')
                })
              }
              className="px-5 py-2.5 bg-[#d4af37] text-black text-xs font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-[#d4af37]/15 cursor-pointer"
            >
              <span>Promote to Content Studio & Generate Blog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 font-serif flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#d4af37]" />
              <span>Autonomous Topic Recommendations (Pre-Researched)</span>
            </h3>
            <p className="text-[11px] text-zinc-500">
              Formulated from Nine Degree's live blog archive and active regulatory and tech shifts.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            5 Ready Opportunities
          </span>
        </div>

        <div className="space-y-3">
          {autonomousSuggestions.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-[#161619] rounded-xl border border-[#242428] hover:border-[#d4af37]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#1f1f24] text-zinc-300 font-medium">
                    {item.industry}
                  </span>
                  <span>•</span>
                  <span className="text-indigo-400">{item.classification}</span>
                  <span>•</span>
                  <span className="text-[#d4af37] font-semibold">Score: {item.opportunityScore}/100</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-100 group-hover:text-[#d4af37] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1">
                  <span className="text-zinc-500">Why Now: </span>
                  {item.reason}
                </p>
                <p className="text-[11px] text-zinc-500 italic mt-0.5">
                  <span className="text-[#d4af37]">Angle: </span>
                  {item.angle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setInputIdea(item.title);
                    validateTopic(item.title, item.industry, 'Global / Cross-Border');
                  }}
                  className="px-3 py-1.5 bg-[#202024] hover:bg-[#28282e] text-zinc-300 text-[11px] rounded-lg border border-[#2e2e34] transition-all cursor-pointer"
                >
                  Re-audit
                </button>
                <button
                  onClick={() =>
                    sendToStudio({
                      headline: item.title,
                      geography: 'Global / Cross-Border',
                      suggestedContentAngle: item.angle,
                      supportingEvidence: item.reason
                    })
                  }
                  className="px-3 py-1.5 bg-[#d4af37] text-black text-[11px] font-semibold rounded-lg hover:brightness-110 transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Send to Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
"""

for rel_path, code in views.items():
    full_path = os.path.join(BASE, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Written: {rel_path} ({len(code)} bytes)")
