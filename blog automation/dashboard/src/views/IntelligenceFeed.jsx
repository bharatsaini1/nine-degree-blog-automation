import React, { useState, useMemo } from 'react';
import {
  Radio,
  ExternalLink,
  MapPin,
  ArrowRight,
  Search,
  RefreshCw,
  Plus,
  BookmarkPlus,
  CheckCircle2,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const IntelligenceFeed = () => {
  const { trends, setTrends, sendToStudio, addToBacklog } = useIntelligence();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGeo, setSelectedGeo] = useState('All');
  const [sortBy, setSortBy] = useState('score'); // 'score' | 'velocity' | 'date'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const geographies = [
    'All',
    'Jaipur, Rajasthan',
    'Pune, Maharashtra',
    'Mumbai, Maharashtra',
    'Delhi NCR',
    'Global / Cross-Border'
  ];

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('Intelligence streams synced! Latest micro-market circulars active.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 850);
  };

  const handleSaveToBacklog = (trend) => {
    addToBacklog({
      title: trend.suggestedContentAngle || trend.headline,
      industry: trend.industry,
      classification: 'Validated Signal (Intelligence Feed)',
      opportunityScore: trend.opportunityScore,
      geography: trend.geography,
      status: 'validated'
    });
    setToastMessage(`Saved "${(trend.suggestedContentAngle || trend.headline).slice(0, 45)}..." to Backlog!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTrends = useMemo(() => {
    return trends
      .filter((t) => {
        // Geo filter
        if (selectedGeo !== 'All') {
          const tGeo = (t.geography || '').toLowerCase();
          const target = selectedGeo.toLowerCase();
          if (target.includes('jaipur') && !tGeo.includes('jaipur')) return false;
          if (target.includes('pune') && !tGeo.includes('pune')) return false;
          if (target.includes('mumbai') && !tGeo.includes('mumbai')) return false;
          if (target.includes('delhi') && !tGeo.includes('delhi')) return false;
          if (target.includes('global') && !tGeo.includes('global') && !tGeo.includes('cross-border')) return false;
        }

        // Text search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const headlineMatch = (t.headline || '').toLowerCase().includes(q);
          const evidenceMatch = (t.supportingEvidence || '').toLowerCase().includes(q);
          const sourceMatch = (t.sourceName || '').toLowerCase().includes(q);
          const angleMatch = (t.suggestedContentAngle || '').toLowerCase().includes(q);
          if (!headlineMatch && !evidenceMatch && !sourceMatch && !angleMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score') {
          return (b.opportunityScore || 0) - (a.opportunityScore || 0);
        } else if (sortBy === 'velocity') {
          const numA = parseInt((a.velocity || '').replace(/[^0-9]/g, '')) || 0;
          const numB = parseInt((b.velocity || '').replace(/[^0-9]/g, '')) || 0;
          return numB - numA;
        } else if (sortBy === 'date') {
          return new Date(b.publishedDate || 0) - new Date(a.publishedDate || 0);
        }
        return 0;
      });
  }, [trends, selectedGeo, searchTerm, sortBy]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-gradient-to-r from-emerald-500/20 via-[#16161a] to-[#16161a] border border-emerald-500/40 px-5 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-zinc-500">Live Sync</span>
        </div>
      )}

      {/* Header and Live Search Bar */}
      <div className="bg-[#16161a] p-6 lg:p-8 rounded-3xl border border-[#26262b] shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Radio className="w-4 h-4 text-[#e43d25]" />
              <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
                Live Global & Regional Intelligence Feed
              </h2>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                {filteredTrends.length} Live Signals Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Real-time multi-source signal ingestion across international wealth hubs, Reddit communities, government circulars, and technology discussions.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefreshFeed}
              disabled={isRefreshing}
              className="px-4 py-2 bg-[#1b1b20] hover:bg-[#222228] text-zinc-200 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 border border-[#2a2a32] hover:border-[#e43d25]/40 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#e43d25] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Feeds'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Search & Filter Controls */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#232328]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search signals, sources, or keywords..."
                className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl pl-8 pr-3 py-1.5 outline-none focus:border-[#e43d25] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-500" />
                <span>Metro:</span>
              </span>
              <select
                value={selectedGeo}
                onChange={(e) => setSelectedGeo(e.target.value)}
                className="bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-[#e43d25] transition-colors"
              >
                {geographies.map((geo) => (
                  <option key={geo} value={geo}>
                    {geo === 'All' ? 'All Metros & Global' : geo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-zinc-500" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-[#e43d25] transition-colors"
            >
              <option value="score">Opportunity Score (Highest)</option>
              <option value="velocity">Velocity / Growth Spike</option>
              <option value="date">Latest Published Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredTrends.map((item) => (
          <div
            key={item.id}
            className="bg-[#16161a] p-6 rounded-3xl border border-[#26262b] hover:border-[#e43d25]/40 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 group"
          >
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e43d25]/15 text-[#ff6a52] font-semibold border border-[#e43d25]/30">
                  {item.category}
                </span>
                <span>•</span>
                <span className="text-zinc-300 font-medium">{item.industry}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {item.geography}
                </span>
                <span>•</span>
                <span className="text-zinc-500 font-mono">Pub: {item.publishedDate}</span>
              </div>

              <h3 className="text-sm font-display font-bold text-zinc-100 group-hover:text-[#ff6a52] transition-colors leading-snug">
                {item.headline}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.supportingEvidence}
              </p>

              {item.suggestedContentAngle && (
                <div className="text-[11px] font-sans text-[#ff8f7d] italic">
                  Suggested Angle: "{item.suggestedContentAngle}"
                </div>
              )}

              <div className="pt-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111114] border border-[#26262e] text-[11px] font-mono text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-zinc-500">Verified Source:</span>
                  <a
                    href={item.originalUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-zinc-200 hover:text-[#ff6a52] flex items-center gap-1 transition-colors max-w-sm truncate"
                  >
                    <span className="truncate">{item.sourceName || 'State Regulatory Portal'}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-end md:items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-lg font-display font-bold text-[#e43d25]">
                  {item.opportunityScore}/100
                </div>
                <div className="text-[9px] font-mono text-emerald-400 flex items-center justify-end gap-1">
                  <Flame className="w-2.5 h-2.5" />
                  <span>{item.velocity}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveToBacklog(item)}
                  title="Save to Opportunity Backlog"
                  className="p-2 bg-[#1b1b20] hover:bg-[#232328] text-zinc-300 hover:text-white rounded-full border border-[#2a2a32] hover:border-[#e43d25]/40 transition-all cursor-pointer shadow-sm"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                </button>

                <button
                  onClick={() => sendToStudio(item)}
                  className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-sm shadow-[#e43d25]/20 hover:shadow-md hover:shadow-[#e43d25]/30 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTrends.length === 0 && (
          <div className="p-8 text-center bg-[#16161a] rounded-3xl border border-[#26262b] space-y-3">
            <Radio className="w-6 h-6 text-[#e43d25] mx-auto" />
            <h4 className="text-sm font-display font-bold text-zinc-100">
              No intelligence signals match "{searchTerm}" in {selectedGeo}
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Reset your search term or select "All" metros to view all active signals.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGeo('All');
              }}
              className="px-4 py-1.5 bg-[#e43d25] text-white text-xs font-semibold rounded-full cursor-pointer shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
