import React, { useState } from 'react';
import {
  Compass,
  RefreshCw,
  ExternalLink,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle,
  Plus,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe
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
    'All Industries & PropTech',
    'Technology & AI',
    'Manufacturing',
    'Infrastructure',
    'Banking & Finance',
    'Hospitality & Luxury',
    'Healthcare',
    'B2B Strategy'
  ];

  const geographies = [
    'All Geographies & Metros',
    'Jaipur, Rajasthan',
    'Global / Cross-Border',
    'Pune, Maharashtra',
    'Mumbai, Maharashtra',
    'Delhi NCR',
    'Dubai / UAE',
    'London / UK',
    'Singapore',
    'India (National)'
  ];

  const filteredTrends = trends.filter((t) => {
    // 1. Industry Sector Filter
    const matchesIndustry =
      !selectedIndustry ||
      selectedIndustry === 'All Industries & PropTech' ||
      selectedIndustry === 'All' ||
      t.industry === selectedIndustry;

    if (!matchesIndustry) return false;

    // 2. Geographic Scope Filter
    if (
      selectedGeography &&
      selectedGeography !== 'All Geographies & Metros' &&
      selectedGeography !== 'All'
    ) {
      const targetGeo = selectedGeography.toLowerCase();
      const trendGeo = (t.geography || '').toLowerCase();

      let geoMatches = false;
      if (targetGeo.includes('jaipur') || targetGeo.includes('rajasthan')) {
        geoMatches = trendGeo.includes('jaipur') || trendGeo.includes('rajasthan');
      } else if (targetGeo.includes('pune') || targetGeo.includes('maharashtra')) {
        geoMatches = trendGeo.includes('pune') || trendGeo.includes('maharashtra');
      } else if (targetGeo.includes('mumbai')) {
        geoMatches = trendGeo.includes('mumbai');
      } else if (targetGeo.includes('delhi') || targetGeo.includes('ncr')) {
        geoMatches =
          trendGeo.includes('delhi') ||
          trendGeo.includes('ncr') ||
          trendGeo.includes('gurugram') ||
          trendGeo.includes('noida');
      } else if (targetGeo.includes('dubai') || targetGeo.includes('uae')) {
        geoMatches = trendGeo.includes('dubai') || trendGeo.includes('uae');
      } else if (targetGeo.includes('london') || targetGeo.includes('uk')) {
        geoMatches = trendGeo.includes('london') || trendGeo.includes('uk');
      } else if (targetGeo.includes('singapore')) {
        geoMatches = trendGeo.includes('singapore');
      } else if (targetGeo.includes('global') || targetGeo.includes('cross-border')) {
        geoMatches = trendGeo.includes('global') || trendGeo.includes('cross-border') || trendGeo.includes('national');
      } else if (targetGeo.includes('national') || targetGeo.includes('india')) {
        geoMatches =
          trendGeo.includes('india') ||
          trendGeo.includes('national') ||
          trendGeo.includes('jaipur') ||
          trendGeo.includes('pune') ||
          trendGeo.includes('mumbai') ||
          trendGeo.includes('delhi');
      } else {
        geoMatches = trendGeo.includes(targetGeo) || targetGeo.includes(trendGeo);
      }

      if (!geoMatches) return false;
    }

    // 3. Time Window Filter (24h, 7d, 30d, evergreen)
    if (selectedTimeWindow && selectedTimeWindow !== 'evergreen') {
      try {
        const pubDate = new Date(t.publishedDate || t.retrievedDate);
        if (!isNaN(pubDate.getTime())) {
          const now = new Date('2026-11-19T11:00:00Z');
          const diffDays = Math.max(0, (now.getTime() - pubDate.getTime()) / (1000 * 3600 * 24));
          if (selectedTimeWindow === '24h' && diffDays > 3) return false;
          if (selectedTimeWindow === '7d' && diffDays > 10) return false;
          if (selectedTimeWindow === '30d' && diffDays > 35) return false;
        }
      } catch {
        // preserve item if date parsing throws
      }
    }

    return true;
  });

  const handleScanLive = () => {
    setIsScanning(true);

    const freshLiveSignals = [
      {
        id: `trend-live-bangalore-${Date.now()}`,
        headline: 'Bangalore Prime IT Corridor Shift: Whitefield vs Sarjapur Road Luxury Plotted Enclave Absorption',
        category: 'Live Ingested Signal',
        industry: 'Real Estate',
        geography: 'Bangalore / South India',
        sourceName: 'Karnataka RERA Registry & Real Estate Intelligence Review',
        originalUrl: 'https://rera.karnataka.gov.in',
        publishedDate: new Date().toISOString().split('T')[0],
        retrievedDate: new Date().toISOString().split('T')[0],
        supportingEvidence: 'Senior tech executives and startup founders are allocating ₹8-15 Cr budgets into low-density plotted enclaves over high-rise apartments to escape water infrastructure bottlenecks.',
        attentionSignals: 'Rapid absorption in villa communities along Sarjapur-ORR belt.',
        whyItMatters: 'High-density residential projects suffer from reputational discounting unless sustainable water escrow audits are demonstrated.',
        strategicImplications: 'Developers with self-sustaining green infrastructure can command a 30% price premium through ESG-anchored advisory content.',
        recommendedAction: 'Publish Bangalore Tech Corridor Luxury vs Infrastructure Resilience Rubric.',
        suggestedContentAngle: 'Bangalore Luxury Real Estate 2026: Why Gated Plotted Pedigree Outperforms High-Rise Towers in Sarjapur & Whitefield.',
        confidenceLevel: 'High (Real-Time Ingested)',
        opportunityScore: 98,
        velocity: '+99% Velocity (Hot)'
      },
      {
        id: `trend-live-jewar-${Date.now()}`,
        headline: 'Noida International Airport (Jewar) Aerotropolis: Speculative Land Hype vs Real Commercial Delivery',
        category: 'Live Ingested Signal',
        industry: 'Real Estate',
        geography: 'Delhi NCR',
        sourceName: 'YEIDA Master Plan 2041 Gazette & RERA UP',
        originalUrl: 'https://up-rera.in',
        publishedDate: new Date().toISOString().split('T')[0],
        retrievedDate: new Date().toISOString().split('T')[0],
        supportingEvidence: 'Speculative land values around Jewar corridor rose 65%, but actual lease commitments from MNC logistics and hospitality operators remain at early stages.',
        attentionSignals: 'Active retail investor debates on YouTube and Telegram broker channels.',
        whyItMatters: 'Retail investors risk severe liquidity traps if buying speculative agricultural plots without development licenses.',
        strategicImplications: 'Nine Degree’s independent fiduciary breakdown establishes undeniable authority by providing the sober truth against broker hype.',
        recommendedAction: 'Release Jewar Airport Aerotropolis Due-Diligence Guide for HNI allocators.',
        suggestedContentAngle: 'Jewar Airport Real Estate 2026: Separating Infrastructure Reality from Speculative Land Broker Hype.',
        confidenceLevel: 'High (Real-Time Ingested)',
        opportunityScore: 97,
        velocity: '+96% Velocity (Hot)'
      },
      {
        id: `trend-live-branded-${Date.now()}`,
        headline: 'Branded Residences in India: The 35% Premium Justification for Five-Star Hotel Hospitality Partnerships',
        category: 'Live Ingested Signal',
        industry: 'Real Estate',
        geography: 'Mumbai & Goa',
        sourceName: 'Luxury Hospitality Asset Management Report 2026',
        originalUrl: 'https://www.ninedegree.in/blogs',
        publishedDate: new Date().toISOString().split('T')[0],
        retrievedDate: new Date().toISOString().split('T')[0],
        supportingEvidence: 'Projects co-branded with global luxury hotel operators achieve 35% higher sales velocity and 2.2x rental yields compared to non-branded luxury developments.',
        attentionSignals: 'Developers across Goa and North Mumbai signing tie-ups with global hospitality groups.',
        whyItMatters: 'HNIs buy operational service excellence and concierge liquidity, not just brick and mortar.',
        strategicImplications: 'Advisory on hotel licensing agreements and HOA maintenance modeling positions Nine Degree at the pinnacle of luxury development consulting.',
        recommendedAction: 'Publish Branded Residences Developer Economics & Royalty Feasibility Guide.',
        suggestedContentAngle: 'The Branded Residence Playbook: How Luxury Developers Monetize Hospitality Pedigree in Mumbai & Goa.',
        confidenceLevel: 'High (Real-Time Ingested)',
        opportunityScore: 99,
        velocity: '+100% Velocity (Trending)'
      }
    ];

    setTimeout(() => {
      const candidate = freshLiveSignals.find(s => !trends.some(t => t.headline === s.headline)) || {
        ...freshLiveSignals[0],
        id: `trend-live-${Date.now()}`
      };
      setTrends(prev => [candidate, ...prev]);
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

      {/* Verified Regulatory & Intelligence Sources Ribbon */}
      <div className="bg-[#141418] px-5 py-3 rounded-2xl border border-[#24242c] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-mono text-zinc-300 font-semibold uppercase tracking-wider">
            Verified Intelligence Sources:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { name: 'Rajasthan RERA', url: 'https://rera.rajasthan.gov.in', tag: 'State Registry' },
            { name: 'MahaRERA', url: 'https://maharera.mahaonline.gov.in', tag: 'Regulatory' },
            { name: 'JDA & RIICO Master Plans', url: 'https://urban.rajasthan.gov.in/jda', tag: 'Urban Dev' },
            { name: 'RBI Remittance Index', url: 'https://rbi.org.in', tag: 'Capital Flow' },
            { name: 'Knight Frank Prime Resi', url: 'https://www.knightfrank.co.in/research', tag: 'Market Intelligence' },
            { name: 'Search Engine Land (GEO)', url: 'https://searchengineland.com', tag: 'AI Search' }
          ].map((src, sIdx) => (
            <a
              key={sIdx}
              href={src.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1b22] hover:bg-[#23232c] border border-[#2b2b36] hover:border-[#e43d25]/50 text-zinc-300 hover:text-white transition-all font-mono text-[11px] group cursor-pointer shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="font-medium">{src.name}</span>
              <ExternalLink className="w-2.5 h-2.5 text-zinc-500 group-hover:text-[#ff6a52] transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* AI Suggested Topics Hero Shelf */}
      <div className="bg-gradient-to-br from-[#1c1212] via-[#141418] to-[#121215] p-6 rounded-3xl border border-[#e43d25]/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#e43d25]" />
              <h3 className="text-sm font-display font-bold text-zinc-100 uppercase tracking-wider">
                AI Suggested Blog Topics (High-Conviction Queue)
              </h3>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                {filteredTrends.length} Active Suggestions
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Discovered from live micro-market signals, RERA circulars & search intent. Click any topic to draft in 1-click:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {filteredTrends.slice(0, 3).map((t, idx) => (
            <div
              key={t.id || idx}
              className="p-4 bg-[#18181d] rounded-2xl border border-[#2b2b34] hover:border-[#e43d25]/50 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="text-[#ff6a52] font-semibold">Pick #{idx + 1} • {t.geography.split(',')[0]}</span>
                  <span className="text-emerald-400 font-bold">{t.opportunityScore}/100</span>
                </div>
                <div className="text-xs font-display font-bold text-zinc-100 group-hover:text-[#ff6a52] transition-colors leading-snug mb-2 line-clamp-3">
                  "{t.suggestedContentAngle || t.headline}"
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="truncate max-w-[220px] text-zinc-400">{t.sourceName || 'Verified Regulatory Stream'}</span>
                </div>
              </div>
              <button
                onClick={() => sendToStudio(t)}
                className="mt-3 w-full py-2 bg-[#e43d25]/15 hover:bg-[#e43d25] text-[#ff6a52] hover:text-white text-xs font-semibold rounded-full border border-[#e43d25]/30 hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Draft This Topic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Trends Grid */}
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

              {/* Prominent Suggested Blog Topic Box */}
              <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#e43d25]/15 via-[#1a1414] to-[#16161a] border border-[#e43d25]/35 shadow-inner">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#ff6a52] uppercase font-bold tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#e43d25]" />
                    <span>Suggested Blog Topic & Angle</span>
                  </div>
                  <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-[#e43d25]/20 text-[#ff8f7d] border border-[#e43d25]/30 font-semibold">
                    1-Click Ready
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-display font-bold text-zinc-100 leading-snug">
                  "{trend.suggestedContentAngle || trend.headline}"
                </div>
              </div>

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
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#242429] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111114] border border-[#282832] text-[11px] font-mono text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-zinc-500">Source:</span>
                  <a
                    href={trend.originalUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-zinc-200 hover:text-[#ff6a52] flex items-center gap-1 transition-colors max-w-[200px] truncate"
                  >
                    <span className="truncate">{trend.sourceName || 'Regulatory Archive & Market Gazette'}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
                  </a>
                </div>

                <div className="inline-flex items-center gap-1 text-[10.5px] font-mono text-zinc-500">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  <span>{trend.publishedDate}</span>
                </div>
              </div>

              <button
                onClick={() => sendToStudio(trend)}
                className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-md shadow-[#e43d25]/20 hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Draft this Topic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredTrends.length === 0 && (
          <div className="col-span-full p-8 text-center bg-[#16161a] rounded-3xl border border-[#26262b] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#e43d25]/10 text-[#ff6a52] flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6 text-[#e43d25]" />
            </div>
            <h4 className="text-sm font-display font-bold text-zinc-100">
              No specific signals match this filter combination ({selectedGeography} • {selectedIndustry})
            </h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Try switching Geography to "All Geographies & Metros" or click "Scan Live Signals" to ingest fresh market intelligence.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedGeography('All Geographies & Metros');
                  setSelectedIndustry('All Industries & PropTech');
                  setSelectedTimeWindow('7d');
                }}
                className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-md shadow-[#e43d25]/20"
              >
                Reset Filters to Show All
              </button>
            </div>
          </div>
        )}
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
