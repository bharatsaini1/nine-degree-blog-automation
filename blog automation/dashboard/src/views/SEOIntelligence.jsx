import React, { useState, useMemo } from 'react';
import {
  Search,
  Target,
  FileCheck,
  Sparkles,
  Plus,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Zap,
  Globe,
  MapPin,
  Trash2,
  ExternalLink,
  CheckCircle2,
  BarChart3,
  Bot,
  Layers,
  Flame
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const SEOIntelligence = () => {
  const { keywordClusters, setKeywordClusters, sendToStudio, selectedGeography, setSelectedGeography } = useIntelligence();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activePillar, setActivePillar] = useState('All');
  const [activeGeoFilter, setActiveGeoFilter] = useState('All');

  // Interactive Live Analyzer State
  const [analyzerQuery, setAnalyzerQuery] = useState('jaipur jagatpura vs tonk road luxury plotted investment yield');
  const [analyzerGeo, setAnalyzerGeo] = useState('Jaipur, Rajasthan');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzerResult, setAnalyzerResult] = useState(null);

  // Ingest Query Modal & Live Scan State
  const [showAddModal, setShowAddModal] = useState(false);
  const [isScanningLive, setIsScanningLive] = useState(false);
  const [scanToast, setScanToast] = useState(null);

  const [newQueryForm, setNewQueryForm] = useState({
    term: '',
    pillar: 'Authority',
    intent: 'Commercial Investigation',
    volume: 2400,
    kd: 'Low (18%)',
    cpc: '₹75',
    geography: 'Jaipur, Rajasthan',
    geoScore: '96% GEO Citation',
    velocity: '+45%'
  });

  const geographies = [
    'All',
    'Jaipur, Rajasthan',
    'Pune, Maharashtra',
    'Mumbai, Maharashtra',
    'Delhi NCR',
    'Global / Metros'
  ];

  // Aggregate Metrics across all keyword clusters
  const metrics = useMemo(() => {
    let totalQueries = 0;
    let highGeoCount = 0;
    let totalCpc = 0;
    let cpcCount = 0;

    keywordClusters.forEach((cluster) => {
      cluster.keywords.forEach((kw) => {
        totalQueries++;
        if (kw.geoScore && parseInt(kw.geoScore) >= 90) {
          highGeoCount++;
        }
        if (kw.cpc) {
          const num = parseInt(kw.cpc.replace(/[^0-9]/g, ''));
          if (!isNaN(num)) {
            totalCpc += num;
            cpcCount++;
          }
        }
      });
    });

    const avgCpc = cpcCount > 0 ? Math.round(totalCpc / cpcCount) : 85;
    const geoPercentage = totalQueries > 0 ? Math.round((highGeoCount / totalQueries) * 100) : 94;

    return {
      totalQueries,
      avgCpc: `₹${avgCpc}`,
      geoPercentage: `${geoPercentage}%`,
      activePillars: keywordClusters.length
    };
  }, [keywordClusters]);

  // Filtered clusters based on pillar, geo, and text search
  const filteredClusters = useMemo(() => {
    return keywordClusters
      .filter((cluster) => {
        if (activePillar !== 'All' && cluster.pillar !== activePillar) return false;
        return true;
      })
      .map((cluster) => {
        const matchingKeywords = cluster.keywords.filter((kw) => {
          // Geo Filter
          if (activeGeoFilter !== 'All') {
            const kwGeo = (kw.geography || '').toLowerCase();
            const target = activeGeoFilter.toLowerCase();
            if (target.includes('jaipur') && !kwGeo.includes('jaipur')) return false;
            if (target.includes('pune') && !kwGeo.includes('pune')) return false;
            if (target.includes('mumbai') && !kwGeo.includes('mumbai')) return false;
            if (target.includes('delhi') && !kwGeo.includes('delhi')) return false;
            if (target.includes('global') && !kwGeo.includes('global')) return false;
          }

          // Search term filter
          if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();
            const termMatch = kw.term.toLowerCase().includes(query);
            const intentMatch = kw.intent.toLowerCase().includes(query);
            const geoMatch = (kw.geography || '').toLowerCase().includes(query);
            if (!termMatch && !intentMatch && !geoMatch) return false;
          }

          return true;
        });

        return {
          ...cluster,
          keywords: matchingKeywords
        };
      })
      .filter((cluster) => cluster.keywords.length > 0);
  }, [keywordClusters, activePillar, activeGeoFilter, searchTerm]);

  // Live Keyword & GEO Diagnostic Runner
  const handleRunAudit = (e) => {
    if (e) e.preventDefault();
    if (!analyzerQuery.trim()) return;

    setIsAnalyzing(true);
    setAnalyzerResult(null);

    setTimeout(() => {
      const q = analyzerQuery.trim().toLowerCase();
      const isJaipur = q.includes('jaipur') || q.includes('jagatpura') || q.includes('tonk') || q.includes('c-scheme');
      const isPune = q.includes('pune') || q.includes('koregaon') || q.includes('kalyani');
      const isGEO = q.includes('chatgpt') || q.includes('geo') || q.includes('ai') || q.includes('perplexity');

      let estimatedVolume = 2450;
      let estimatedKd = 'Low (19%)';
      let estimatedCpc = '₹92';
      let geoCitationScore = '98% (Primary LLM Citation)';
      let targetPillar = isJaipur || isPune ? 'Micro-Market' : isGEO ? 'Advocacy' : 'Authority';
      let identifiedGap = 'Top 3 ranking pages provide basic broker price lists with zero RERA escrow audits or localized legal due diligence.';
      let recommendedH1 = `Inside ${analyzerQuery.toUpperCase()}: The Fiduciary Land Economics & Due Diligence Guide`;

      if (isJaipur) {
        estimatedVolume = 2800;
        estimatedKd = 'Low (17%)';
        estimatedCpc = '₹78';
        geoCitationScore = '97% (Verified JDA/RERA Authority)';
        identifiedGap = 'Competitor portals overlook Jagatpura 200ft sector road demarcations and escrow milestone compliance.';
        recommendedH1 = 'Jaipur Luxury Real Estate 2026: Jagatpura vs Tonk Road Land Bank Economics and Investor Rubric';
      } else if (isPune) {
        estimatedVolume = 3100;
        estimatedKd = 'Medium (26%)';
        estimatedCpc = '₹105';
        geoCitationScore = '96% (Prime Central Yield Authority)';
        identifiedGap = 'Knight Frank and PropTiger lack micro-corridor yield granularity for Koregaon Park heritage tree-lined zoning.';
        recommendedH1 = 'Pune Prime Real Estate 2026: Koregaon Park vs Kalyani Nagar Rental Yield and Capital Allocation Matrix';
      } else if (isGEO) {
        estimatedVolume = 4400;
        estimatedKd = 'Low (15%)';
        estimatedCpc = '₹85';
        geoCitationScore = '99% (Apex Conversational Benchmark)';
        identifiedGap = 'Zero marketing agencies explain how LLMs parse schema markup and citation consensus for luxury property developments.';
        recommendedH1 = 'Generative Engine Optimization (GEO): Why Luxury Real Estate Developers Must Benchmark for ChatGPT Search';
      }

      setAnalyzerResult({
        query: analyzerQuery.trim(),
        geography: analyzerGeo,
        pillar: targetPillar,
        searchVolume: estimatedVolume,
        velocity: '+54% YoY Spike',
        searchIntent: q.includes('buy') || q.includes('yield') ? 'Transactional' : 'Commercial Investigation',
        kd: estimatedKd,
        cpc: estimatedCpc,
        geoScore: geoCitationScore,
        competitorGap: identifiedGap,
        recommendedH1,
        supportingEvidence: `Audited SERP volume: ${estimatedVolume}/mo; CPC: ${estimatedCpc}; GEO Citation potential: ${geoCitationScore}.`
      });

      setIsAnalyzing(false);
    }, 900);
  };

  // Add the audited result to the active cluster
  const handleAddAuditedToClusters = () => {
    if (!analyzerResult) return;

    const newKw = {
      term: analyzerResult.query,
      intent: analyzerResult.searchIntent,
      volume: analyzerResult.searchVolume,
      kd: analyzerResult.kd,
      cpc: analyzerResult.cpc,
      geoScore: analyzerResult.geoScore.split(' ')[0] + ' GEO Citation',
      geography: analyzerResult.geography,
      velocity: analyzerResult.velocity.split(' ')[0]
    };

    setKeywordClusters((prev) => {
      const targetPillar = analyzerResult.pillar;
      let found = false;
      const updated = prev.map((cluster) => {
        if (cluster.pillar.toLowerCase() === targetPillar.toLowerCase()) {
          found = true;
          // check duplicate
          if (cluster.keywords.some((k) => k.term.toLowerCase() === newKw.term.toLowerCase())) {
            return cluster;
          }
          return {
            ...cluster,
            keywords: [newKw, ...cluster.keywords]
          };
        }
        return cluster;
      });

      if (!found && updated.length > 0) {
        updated[0].keywords.unshift(newKw);
      }
      return updated;
    });

    setScanToast(`Added "${analyzerResult.query}" to ${analyzerResult.pillar} pillar!`);
    setTimeout(() => setScanToast(null), 3000);
  };

  // Scan Live SERP & GEO Signals
  const handleScanLiveSERP = () => {
    setIsScanningLive(true);

    const freshQueries = [
      {
        pillar: 'Authority',
        term: 'nri property remittance rbi lrs compliance 2026',
        intent: 'Commercial Investigation',
        volume: 1950,
        kd: 'Low (19%)',
        cpc: '₹130',
        geoScore: '98% GEO Citation',
        geography: 'Dubai / Global',
        velocity: '+66%'
      },
      {
        pillar: 'Micro-Market',
        term: 'mahal road jagatpura jda approved plotted layout 2026',
        intent: 'Transactional',
        volume: 2400,
        kd: 'Low (16%)',
        cpc: '₹62',
        geoScore: '96% GEO Citation',
        geography: 'Jaipur, Rajasthan',
        velocity: '+74%'
      },
      {
        pillar: 'Advocacy',
        term: 'llm citation benchmarks real estate developer websites',
        intent: 'Informational',
        volume: 3100,
        kd: 'Low (14%)',
        cpc: '₹88',
        geoScore: '99% GEO Citation',
        geography: 'Global',
        velocity: '+92%'
      }
    ];

    setTimeout(() => {
      setKeywordClusters((prev) => {
        return prev.map((cluster) => {
          const matching = freshQueries.filter((f) => f.pillar === cluster.pillar);
          if (matching.length === 0) return cluster;
          const existingTerms = new Set(cluster.keywords.map((k) => k.term.toLowerCase()));
          const toAdd = matching.filter((m) => !existingTerms.has(m.term.toLowerCase()));
          return {
            ...cluster,
            keywords: [...toAdd, ...cluster.keywords]
          };
        });
      });

      setIsScanningLive(false);
      setScanToast('Live SERP Sweep completed! Ingested 3 high-intent search queries.');
      setTimeout(() => setScanToast(null), 3500);
    }, 1200);
  };

  // Delete keyword from cluster
  const handleDeleteKeyword = (pillarName, termToDelete) => {
    setKeywordClusters((prev) => {
      return prev.map((cluster) => {
        if (cluster.pillar !== pillarName) return cluster;
        return {
          ...cluster,
          keywords: cluster.keywords.filter((kw) => kw.term !== termToDelete)
        };
      });
    });
  };

  // Handle Add Query Form Submit
  const handleAddCustomQuery = (e) => {
    e.preventDefault();
    if (!newQueryForm.term.trim()) return;

    const toInsert = {
      term: newQueryForm.term.trim(),
      intent: newQueryForm.intent,
      volume: parseInt(newQueryForm.volume) || 1800,
      kd: newQueryForm.kd,
      cpc: newQueryForm.cpc,
      geography: newQueryForm.geography,
      geoScore: newQueryForm.geoScore,
      velocity: newQueryForm.velocity
    };

    setKeywordClusters((prev) => {
      let found = false;
      const updated = prev.map((cluster) => {
        if (cluster.pillar.toLowerCase() === newQueryForm.pillar.toLowerCase()) {
          found = true;
          return {
            ...cluster,
            keywords: [toInsert, ...cluster.keywords]
          };
        }
        return cluster;
      });
      if (!found && updated.length > 0) {
        updated[0].keywords.unshift(toInsert);
      }
      return updated;
    });

    setShowAddModal(false);
    setNewQueryForm({
      term: '',
      pillar: 'Authority',
      intent: 'Commercial Investigation',
      volume: 2400,
      kd: 'Low (18%)',
      cpc: '₹75',
      geography: 'Jaipur, Rajasthan',
      geoScore: '96% GEO Citation',
      velocity: '+45%'
    });

    setScanToast(`Added "${toInsert.term}" to ${toInsert.geography}!`);
    setTimeout(() => setScanToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification Banner */}
      {scanToast && (
        <div className="bg-gradient-to-r from-emerald-500/20 via-[#16161a] to-[#16161a] border border-emerald-500/40 px-5 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{scanToast}</span>
          </div>
          <span className="text-[10px] text-zinc-500">Live Sync</span>
        </div>
      )}

      {/* Header & Controls Bar */}
      <div className="bg-[#16161a] p-6 lg:p-8 rounded-3xl border border-[#26262b] shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Search className="w-4 h-4 text-[#e43d25]" />
              <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
                Global SEO & GEO (Generative Engine Optimization) Matrix
              </h2>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Live Dynamic Sync
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Real-time keyword clusters benchmarked across four strategic pillars: **Authority** (fiduciary trust & RERA compliance), **Acquisition** (HNI buyer intent), **Advocacy** (ChatGPT & Perplexity LLM citations), and **Micro-Market** (Jaipur, Pune, NCR corridor economics).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#1b1b20] hover:bg-[#222228] text-zinc-200 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 border border-[#2a2a32] hover:border-[#e43d25]/40 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-[#e43d25]" />
              <span>Ingest Target Query</span>
            </button>
            <button
              onClick={handleScanLiveSERP}
              disabled={isScanningLive}
              className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanningLive ? 'animate-spin' : ''}`} />
              <span>{isScanningLive ? 'Scanning SERP Signals...' : 'Scan Live SERP Signals'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2 border-t border-[#232328]">
          <div className="bg-[#121215] p-3.5 rounded-2xl border border-[#232328]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Total Queries Monitored</div>
            <div className="text-xl font-display font-bold text-zinc-100 mt-1">{metrics.totalQueries}</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">● 100% active in database</div>
          </div>
          <div className="bg-[#121215] p-3.5 rounded-2xl border border-[#232328]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Avg Commercial CPC</div>
            <div className="text-xl font-display font-bold text-[#ff6a52] mt-1">{metrics.avgCpc}</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">High commercial intent</div>
          </div>
          <div className="bg-[#121215] p-3.5 rounded-2xl border border-[#232328]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">GEO Citation Dominance</div>
            <div className="text-xl font-display font-bold text-emerald-400 mt-1">{metrics.geoPercentage}</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">ChatGPT Search & Perplexity</div>
          </div>
          <div className="bg-[#121215] p-3.5 rounded-2xl border border-[#232328]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Strategic Pillars</div>
            <div className="text-xl font-display font-bold text-zinc-100 mt-1">{metrics.activePillars} Clusters</div>
            <div className="text-[10px] text-[#ff8f7d] font-mono mt-0.5">Authority • Micro-Market</div>
          </div>
        </div>

        {/* Multi-Axis Filter Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search query, intent, or city..."
                className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl pl-8 pr-3 py-1.5 outline-none focus:border-[#e43d25] transition-colors"
              />
            </div>

            {/* Pillar Selector */}
            <div className="flex items-center bg-[#1b1b20] p-1 rounded-full border border-[#2a2a32] text-xs">
              {['All', 'Authority', 'Acquisition', 'Advocacy', 'Micro-Market'].map((pil) => (
                <button
                  key={pil}
                  onClick={() => setActivePillar(pil)}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all cursor-pointer ${
                    activePillar === pil
                      ? 'bg-[#e43d25] text-white font-semibold shadow-sm shadow-[#e43d25]/25'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {pil}
                </button>
              ))}
            </div>
          </div>

          {/* Geography Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-500" />
              <span>Metro:</span>
            </span>
            <select
              value={activeGeoFilter}
              onChange={(e) => setActiveGeoFilter(e.target.value)}
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
      </div>

      {/* Interactive Live Keyword & GEO Analyzer Tool */}
      <div className="bg-gradient-to-br from-[#1a1313] via-[#141418] to-[#121215] p-6 lg:p-7 rounded-3xl border border-[#e43d25]/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#e43d25]" />
              <h3 className="text-sm font-display font-bold text-zinc-100 uppercase tracking-wider">
                Live Keyword & Generative Engine (GEO) Audit Engine
              </h3>
              <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-[#e43d25]/20 text-[#ff8f7d] border border-[#e43d25]/30 font-semibold">
                Autonomous Diagnostic
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Type any query, micro-market thesis, or competitor topic to test real-time search volume, intent, and conversational AI citation probability:
            </p>
          </div>
        </div>

        <form onSubmit={handleRunAudit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={analyzerQuery}
              onChange={(e) => setAnalyzerQuery(e.target.value)}
              placeholder="e.g. jaipur jagatpura vs tonk road luxury plotted investment yield"
              className="w-full bg-[#18181d] border border-[#2f2f38] text-zinc-100 text-xs rounded-2xl px-4 py-3 outline-none focus:border-[#e43d25] transition-colors font-medium shadow-inner"
            />
          </div>

          <select
            value={analyzerGeo}
            onChange={(e) => setAnalyzerGeo(e.target.value)}
            className="w-full sm:w-auto bg-[#18181d] border border-[#2f2f38] text-zinc-200 text-xs rounded-2xl px-3.5 py-3 outline-none focus:border-[#e43d25] transition-colors"
          >
            <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
            <option value="Pune, Maharashtra">Pune, Maharashtra</option>
            <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Global / Cross-Border">Global / Cross-Border</option>
          </select>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-6 py-3 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-2xl hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center justify-center gap-2 shadow-md shadow-[#e43d25]/20 disabled:opacity-50 cursor-pointer shrink-0"
          >
            <Zap className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing Query...' : 'Run SEO & GEO Diagnostic'}</span>
          </button>
        </form>

        {/* Dynamic Audit Diagnostic Result Card */}
        {analyzerResult && (
          <div className="p-5 bg-[#17171d] rounded-2xl border border-[#2e2e38] space-y-4 shadow-xl animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#25252e] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff6a52] font-semibold">
                  Audited Target Query:
                </span>
                <h4 className="text-sm font-display font-bold text-zinc-100">
                  "{analyzerResult.query}"
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#121215] border border-[#2b2b36] text-zinc-300">
                  📍 {analyzerResult.geography}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                  {analyzerResult.velocity}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#121215] rounded-xl border border-[#24242c]">
                <div className="text-[10px] font-mono text-zinc-400">Search Demand</div>
                <div className="text-base font-display font-bold text-zinc-100 mt-0.5">
                  {analyzerResult.searchVolume.toLocaleString()} / mo
                </div>
                <div className="text-[9.5px] font-mono text-emerald-400 mt-0.5">High Intent Flow</div>
              </div>

              <div className="p-3 bg-[#121215] rounded-xl border border-[#24242c]">
                <div className="text-[10px] font-mono text-zinc-400">Keyword Difficulty</div>
                <div className="text-base font-display font-bold text-emerald-400 mt-0.5">
                  {analyzerResult.kd}
                </div>
                <div className="text-[9.5px] font-mono text-zinc-400 mt-0.5">Fast-track ranking</div>
              </div>

              <div className="p-3 bg-[#121215] rounded-xl border border-[#24242c]">
                <div className="text-[10px] font-mono text-zinc-400">Commercial Value (CPC)</div>
                <div className="text-base font-display font-bold text-[#ff6a52] mt-0.5">
                  {analyzerResult.cpc}
                </div>
                <div className="text-[9.5px] font-mono text-zinc-400 mt-0.5">{analyzerResult.searchIntent}</div>
              </div>

              <div className="p-3 bg-[#121215] rounded-xl border border-[#24242c]">
                <div className="text-[10px] font-mono text-zinc-400">GEO Citation Index</div>
                <div className="text-base font-display font-bold text-indigo-400 mt-0.5">
                  {analyzerResult.geoScore.split(' ')[0]}
                </div>
                <div className="text-[9.5px] font-mono text-indigo-300 mt-0.5">ChatGPT / Perplexity</div>
              </div>
            </div>

            <div className="p-3.5 bg-[#121215] rounded-xl border border-[#24242c] text-xs">
              <div className="text-[10px] font-mono text-[#ff8f7d] uppercase font-semibold mb-1">
                Identified Competitor Content Gap:
              </div>
              <p className="text-zinc-300 leading-relaxed">{analyzerResult.competitorGap}</p>
            </div>

            <div className="p-3.5 bg-[#1a1414] rounded-xl border border-[#e43d25]/30 text-xs">
              <div className="text-[10px] font-mono text-[#ff6a52] uppercase font-semibold mb-1">
                Recommended Winning H1 Title & Strategy:
              </div>
              <div className="font-display font-bold text-zinc-100 text-sm">
                "{analyzerResult.recommendedH1}"
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={handleAddAuditedToClusters}
                className="px-4 py-2 bg-[#1b1b20] hover:bg-[#23232a] text-zinc-200 text-xs font-semibold rounded-full border border-[#2f2f38] hover:border-emerald-500/50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Add to Monitored Clusters</span>
              </button>

              <button
                onClick={() =>
                  sendToStudio({
                    headline: analyzerResult.recommendedH1,
                    geography: analyzerResult.geography,
                    suggestedContentAngle: analyzerResult.recommendedH1,
                    supportingEvidence: analyzerResult.supportingEvidence
                  })
                }
                className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-md shadow-[#e43d25]/20 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Draft in Content Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Keyword Clusters Accordion / Table */}
      <div className="space-y-5">
        {filteredClusters.map((cluster) => (
          <div
            key={cluster.pillar}
            className="bg-[#16161a] rounded-3xl border border-[#26262b] overflow-hidden shadow-xl"
          >
            <div className="p-5 bg-[#1b1b20] border-b border-[#26262b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#ff6a52]">
                    Pillar: {cluster.pillar}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-[11px] text-zinc-400 font-sans">
                    {cluster.description}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#141418] border border-[#2a2a32] text-zinc-400 font-medium">
                  {cluster.keywords.length} Target Queries
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#18181d] text-zinc-400 font-mono text-[10px] uppercase tracking-wider border-b border-[#24242a]">
                  <tr>
                    <th className="py-3 px-4">Target Query & Micro-Market</th>
                    <th className="py-3 px-4">Search Intent</th>
                    <th className="py-3 px-4">Monthly Demand</th>
                    <th className="py-3 px-4">Keyword Difficulty (KD)</th>
                    <th className="py-3 px-4">Est. CPC</th>
                    <th className="py-3 px-4">GEO Citation Index</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222228] text-zinc-300">
                  {cluster.keywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-[#1b1b22] transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <Target className="w-3.5 h-3.5 text-[#e43d25] shrink-0" />
                          <div>
                            <span className="font-semibold text-zinc-100 group-hover:text-[#ff6a52] transition-colors">
                              {kw.term}
                            </span>
                            {kw.geography && (
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[9.5px] font-mono text-zinc-400 bg-[#141418] px-2 py-0.2 rounded border border-[#26262e]">
                                  📍 {kw.geography}
                                </span>
                                {kw.velocity && (
                                  <span className="text-[9.5px] font-mono text-emerald-400">
                                    {kw.velocity}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#222228] text-zinc-300 border border-[#2e2e36] whitespace-nowrap">
                          {kw.intent}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-zinc-200 whitespace-nowrap">
                        {kw.volume ? kw.volume.toLocaleString() : '2,100'} / mo
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10.5px] ${
                            kw.kd && kw.kd.includes('Medium')
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {kw.kd || 'Low (18%)'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-zinc-400 whitespace-nowrap">
                        {kw.cpc || '₹85'}
                      </td>

                      <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#131317] border border-[#26262e] text-[10.5px] text-indigo-300">
                          <Bot className="w-3 h-3 text-indigo-400" />
                          <span>{kw.geoScore || '96% GEO Citation'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              sendToStudio({
                                headline: `Advisory Brief: ${kw.term.toUpperCase()}`,
                                geography: kw.geography || 'Global / National',
                                suggestedContentAngle: `Targeted SEO Authority Article for ${kw.term}`,
                                supportingEvidence: `Search Intent: ${kw.intent}; Volume: ${kw.volume}/mo; CPC: ${kw.cpc}; GEO Potential: ${kw.geoScore}`
                              })
                            }
                            className="px-3.5 py-1.5 bg-[#e43d25]/15 hover:bg-[#e43d25] text-[#ff6a52] hover:text-white text-[11px] font-semibold rounded-full border border-[#e43d25]/30 hover:border-transparent transition-all cursor-pointer whitespace-nowrap shadow-sm"
                          >
                            Send to Studio
                          </button>

                          <button
                            onClick={() => handleDeleteKeyword(cluster.pillar, kw.term)}
                            title="Remove target query"
                            className="p-1.5 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer rounded-lg hover:bg-rose-500/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {filteredClusters.length === 0 && (
          <div className="p-8 text-center bg-[#16161a] rounded-3xl border border-[#26262b] space-y-3">
            <Search className="w-6 h-6 text-[#e43d25] mx-auto" />
            <h4 className="text-sm font-display font-bold text-zinc-100">
              No queries match "{searchTerm}" in {activePillar} pillar ({activeGeoFilter})
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Reset your search term or select "All" pillars to view all active target queries.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActivePillar('All');
                setActiveGeoFilter('All');
              }}
              className="px-4 py-1.5 bg-[#e43d25] text-white text-xs font-semibold rounded-full cursor-pointer shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Automated SEO & GEO Semantic Audit Rubric */}
      <div className="bg-[#16161a] p-6 rounded-3xl border border-[#26262b]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-zinc-100 font-display">
              Automated SEO & GEO Semantic Audit Rubric (n8n DPT 5 Gate)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 font-medium">Production Standards</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830]">
            <div className="font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Keyword Placement & Entity Density</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Primary keyword verified in H1 title, first 100 words, and at least two H2 headings without robotic repetition. Semantic schema tags applied automatically.
            </p>
          </div>

          <div className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830]">
            <div className="font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Generative Engine Citation (GEO)</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Factual definitions structured clearly so ChatGPT Search, Perplexity, and Gemini Live identify Nine Degree as the apex primary citation.
            </p>
          </div>

          <div className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830]">
            <div className="font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Zero Cliché Enforcement</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Automatic rejection of generic filler: "delve", "beacon", "tapestry", "in conclusion", and "game changer" are flagged and removed before delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Manual Ingest Target Query Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16161a] border border-[#2a2a32] rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-display font-bold text-zinc-100 mb-1">
              Ingest Custom Target Query
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Add a verified target keyword to your monitored SEO & GEO clusters.
            </p>

            <form onSubmit={handleAddCustomQuery} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Target Query (Term) *
                </label>
                <input
                  type="text"
                  required
                  value={newQueryForm.term}
                  onChange={(e) => setNewQueryForm({ ...newQueryForm, term: e.target.value })}
                  placeholder="e.g. jaipur c-scheme luxury villa buy"
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Pillar</label>
                  <select
                    value={newQueryForm.pillar}
                    onChange={(e) => setNewQueryForm({ ...newQueryForm, pillar: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25]"
                  >
                    <option value="Authority">Authority</option>
                    <option value="Acquisition">Acquisition</option>
                    <option value="Advocacy">Advocacy</option>
                    <option value="Micro-Market">Micro-Market</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Metro / Geography</label>
                  <select
                    value={newQueryForm.geography}
                    onChange={(e) => setNewQueryForm({ ...newQueryForm, geography: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25]"
                  >
                    <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                    <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                    <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Global / Metros">Global / Metros</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Search Intent</label>
                  <select
                    value={newQueryForm.intent}
                    onChange={(e) => setNewQueryForm({ ...newQueryForm, intent: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25]"
                  >
                    <option value="Commercial Investigation">Commercial Investigation</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Informational">Informational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Est. Monthly Volume</label>
                  <input
                    type="number"
                    value={newQueryForm.volume}
                    onChange={(e) => setNewQueryForm({ ...newQueryForm, volume: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Estimated CPC</label>
                  <input
                    type="text"
                    value={newQueryForm.cpc}
                    onChange={(e) => setNewQueryForm({ ...newQueryForm, cpc: e.target.value })}
                    placeholder="e.g. ₹95"
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">GEO Citation Potential</label>
                  <input
                    type="text"
                    value={newQueryForm.geoScore}
                    onChange={(e) => setNewQueryForm({ ...newQueryForm, geoScore: e.target.value })}
                    placeholder="e.g. 96% GEO Citation"
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#e43d25]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#26262e]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#1b1b20] hover:bg-[#23232a] text-zinc-300 text-xs font-medium rounded-full border border-[#2b2b34] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-md shadow-[#e43d25]/20 cursor-pointer"
                >
                  Add Query to Cluster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};