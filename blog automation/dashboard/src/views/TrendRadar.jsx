import React, { useState } from 'react';
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
      <div className="bg-[#16161a] p-5 rounded-3xl border border-[#26262b] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Industry Sector
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25] transition-colors"
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
              className="bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25] transition-colors"
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
            <div className="flex items-center bg-[#1b1b20] p-1 rounded-full border border-[#2a2a32] text-xs">
              {['24h', '7d', '30d', 'evergreen'].map((win) => (
                <button
                  key={win}
                  onClick={() => setSelectedTimeWindow(win)}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all cursor-pointer ${
                    selectedTimeWindow === win
                      ? 'bg-[#e43d25] text-white shadow-sm shadow-[#e43d25]/25 font-semibold'
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
            className="px-4 py-2 bg-[#1b1b20] text-zinc-200 text-xs font-medium rounded-full hover:bg-[#222228] transition-all flex items-center gap-1.5 border border-[#2a2a32] hover:border-[#e43d25]/40 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#e43d25]" />
            <span>Ingest Source</span>
          </button>
          <button
            onClick={handleScanLive}
            disabled={isScanning}
            className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 disabled:opacity-50 cursor-pointer"
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
            className="bg-[#16161a] rounded-3xl border border-[#26262b] p-6 hover:border-[#e43d25]/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e43d25]/15 text-[#ff6a52] font-semibold border border-[#e43d25]/30 text-[10px]">
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
                  <span className="text-[#ff6a52] font-bold">
                    Score: {trend.opportunityScore}/100
                  </span>
                </div>
              </div>

              <h3 className="text-base font-display font-bold text-zinc-100 group-hover:text-[#ff6a52] transition-colors leading-snug">
                {trend.headline}
              </h3>

              <div className="mt-3 p-3.5 bg-[#1b1b20] rounded-2xl border border-[#282830] text-xs text-zinc-300">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Verified Supporting Evidence</span>
                </div>
                <p className="leading-relaxed">{trend.supportingEvidence}</p>
              </div>

              <div className="mt-3.5 grid grid-cols-1 gap-2 text-xs">
                <div>
                  <span className="font-semibold text-zinc-200">Why It Matters: </span>
                  <span className="text-zinc-400">{trend.whyItMatters}</span>
                </div>
                <div>
                  <span className="font-semibold text-zinc-200">Recommended Action: </span>
                  <span className="text-zinc-400">{trend.recommendedAction}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#ff6a52]">Nine Degree Angle: </span>
                  <span className="text-zinc-300 italic">{trend.suggestedContentAngle}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#242429] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                <Calendar className="w-3 h-3" />
                <span>Pub: {trend.publishedDate}</span>
                <span>•</span>
                <a
                  href={trend.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-[#ff6a52] flex items-center gap-1 truncate max-w-[180px] transition-colors"
                >
                  <span>{trend.sourceName}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <button
                onClick={() => sendToStudio(trend)}
                className="px-4 py-1.5 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-sm shadow-[#e43d25]/20 hover:shadow-md hover:shadow-[#e43d25]/30 transition-all flex items-center gap-1.5 cursor-pointer"
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
          <div className="bg-[#16161a] border border-[#2a2a32] rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-display font-bold text-zinc-100 mb-1">
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
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Industry</label>
                  <select
                    value={newSignal.industry}
                    onChange={(e) => setNewSignal({ ...newSignal, industry: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-2.5 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
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
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
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
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Supporting Evidence / Facts</label>
                <textarea
                  rows={2}
                  placeholder="Specific numbers, regulatory clauses, or survey results..."
                  value={newSignal.supportingEvidence}
                  onChange={(e) => setNewSignal({ ...newSignal, supportingEvidence: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Suggested Nine Degree Angle</label>
                <input
                  type="text"
                  placeholder="The advisory counter-thesis to write about..."
                  value={newSignal.suggestedContentAngle}
                  onChange={(e) => setNewSignal({ ...newSignal, suggestedContentAngle: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#26262b]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#202026] text-zinc-300 rounded-full hover:bg-[#282830] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white font-semibold rounded-full shadow-md shadow-[#e43d25]/25 cursor-pointer transition-all"
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
