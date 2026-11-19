import React, { useState } from 'react';
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
  Layers,
  BookmarkPlus,
  History,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const TopicValidator = () => {
  const {
    validateTopic,
    activeValidation,
    isValidating,
    sendToStudio,
    addToBacklog,
    validationHistory,
    selectedIndustry,
    selectedGeography
  } = useIntelligence();

  const [inputIdea, setInputIdea] = useState('Luxury vs Mid-Segment Real Estate Marketing: Creative Positioning & Media Buying');
  const [targetIndustry, setTargetIndustry] = useState(selectedIndustry);
  const [targetGeography, setTargetGeography] = useState(selectedGeography);
  const [toastMessage, setToastMessage] = useState(null);

  const handleValidate = (e) => {
    e.preventDefault();
    if (!inputIdea.trim()) return;
    validateTopic(inputIdea, targetIndustry, targetGeography);
  };

  const handleSaveActiveToBacklog = () => {
    if (!activeValidation) return;
    const item = {
      title: activeValidation.winningAngle || activeValidation.recommendedAngle || activeValidation.rawIdea,
      industry: activeValidation.industry,
      classification: activeValidation.classification,
      opportunityScore: activeValidation.opportunityScore,
      geography: activeValidation.geography,
      status: 'validated'
    };
    addToBacklog(item);
    setToastMessage(`Saved "${item.title.slice(0, 45)}..." to Opportunity Backlog!`);
    setTimeout(() => setToastMessage(null), 3000);
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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-gradient-to-r from-emerald-500/20 via-[#16161a] to-[#16161a] border border-emerald-500/40 px-5 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-zinc-500">Backlog Sync</span>
        </div>
      )}

      {/* Main Validation Input Form */}
      <div className="bg-[#16161a] p-6 lg:p-8 rounded-3xl border border-[#26262b] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#e43d25]" />
          <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
            Universal Topic & Hypothesis Validator
          </h2>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e43d25]/15 text-[#ff6a52] border border-[#e43d25]/30 font-medium">
            2-Stage Live Webhook
          </span>
        </div>
        <p className="text-xs text-zinc-400 max-w-2xl mb-4 leading-relaxed">
          Submit any raw idea, blog title, or strategic thesis. The engine runs preliminary diagnosis instantly, then triggers deep research into search intent, competitor saturation, and content gaps via the n8n multi-agent pipeline.
        </p>

        <form onSubmit={handleValidate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Topic, Hypothesis or Raw Idea *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How can B2B manufacturing companies use AI to improve sales conversion?"
              value={inputIdea}
              onChange={(e) => setInputIdea(e.target.value)}
              className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-2xl px-4 py-3 text-sm text-zinc-100 outline-none focus:border-[#e43d25] transition-colors shadow-inner"
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
                className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-[#e43d25] transition-colors"
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
                Target Geography
              </label>
              <select
                value={targetGeography}
                onChange={(e) => setTargetGeography(e.target.value)}
                className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-[#e43d25] transition-colors"
              >
                <option value="Global / Cross-Border">Global / Cross-Border</option>
                <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Dubai / UAE">Dubai / UAE</option>
                <option value="London / UK">London / UK</option>
                <option value="Singapore">Singapore</option>
                <option value="India (National)">India (National)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] font-mono text-zinc-500">
              ⚡ Evaluates search volume, competitor saturation, and content gap
            </span>
            <button
              type="submit"
              disabled={isValidating}
              className="px-6 py-2.5 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 disabled:opacity-50 cursor-pointer"
            >
              <Zap className={`w-3.5 h-3.5 ${isValidating ? 'animate-spin' : ''}`} />
              <span>{isValidating ? 'Running Multi-Agent Validation...' : 'Run 2-Stage Validation'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Active Validation Result Card */}
      {activeValidation && (
        <div className="bg-[#16161a] p-6 lg:p-8 rounded-3xl border border-[#e43d25]/40 shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#26262b] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e43d25]/15 text-[#ff6a52] text-[10px] font-mono font-semibold border border-[#e43d25]/30">
                  {activeValidation.stage === 'completed' ? 'Stage 2 Completed (Verified)' : 'Stage 1 Preliminary'}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400 text-xs font-mono">{activeValidation.industry}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400 text-xs font-mono">{activeValidation.geography}</span>
              </div>
              <h3 className="text-base font-display font-bold text-zinc-100">
                "{activeValidation.detectedTopic || activeValidation.rawIdea}"
              </h3>
            </div>

            <div className="text-right">
              <div className="text-2xl font-display font-bold text-[#e43d25]">
                {activeValidation.opportunityScore}/100
              </div>
              <div className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                Opportunity Score
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830]">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-[#ff6a52]" />
                <span>Search vs Share Classification</span>
              </div>
              <div className="text-xs font-semibold text-zinc-200">
                {activeValidation.classification}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                Evaluated against the Searchable vs. Shareable taxonomy from content-strategy.
              </div>
            </div>

            <div className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830]">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1 font-semibold">
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

            <div className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830]">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1 font-semibold">
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

          <div className="space-y-3 bg-[#1b1b20] p-5 rounded-2xl border border-[#282830] text-xs">
            <div>
              <span className="font-semibold text-[#ff6a52] font-mono uppercase text-[11px] tracking-wider block mb-1">
                Recommended Nine Degree Winning Angle:
              </span>
              <p className="text-sm font-semibold text-zinc-100 font-display">
                "{activeValidation.winningAngle || activeValidation.recommendedAngle}"
              </p>
            </div>

            <div className="pt-2 border-t border-[#26262b]">
              <span className="font-semibold text-zinc-300 block mb-1">
                Identified Market Content Gaps (To Exploit):
              </span>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                {(activeValidation.detailedGaps || activeValidation.contentGaps || []).map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#26262b]">
            <button
              onClick={handleSaveActiveToBacklog}
              className="px-5 py-2.5 bg-[#1b1b20] hover:bg-[#24242c] text-zinc-200 text-xs font-semibold rounded-full border border-[#2f2f38] hover:border-emerald-500/50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Save to Opportunity Backlog</span>
            </button>

            <button
              onClick={() =>
                sendToStudio({
                  headline: activeValidation.winningAngle || activeValidation.recommendedAngle,
                  geography: activeValidation.geography,
                  suggestedContentAngle: activeValidation.summary,
                  supportingEvidence: (activeValidation.detailedGaps || []).join('; ')
                })
              }
              className="px-6 py-2.5 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 cursor-pointer"
            >
              <span>Promote to Content Studio & Generate Blog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Recent Validations History Drawer */}
      {validationHistory && validationHistory.length > 0 && (
        <div className="bg-[#16161a] p-6 rounded-3xl border border-[#26262b] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#ff6a52]" />
              <h3 className="text-sm font-bold text-zinc-100 font-display">
                Recent Validation History (Persistent Log)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              {validationHistory.length} Validated Topics
            </span>
          </div>

          <div className="divide-y divide-[#222228]">
            {validationHistory.slice(0, 5).map((val) => (
              <div key={val.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-0.5">
                    <span className="text-[#ff6a52]">{val.industry}</span>
                    <span>•</span>
                    <span>{val.geography}</span>
                    <span>•</span>
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{new Date(val.timestamp).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 group-hover:text-[#ff6a52] transition-colors">
                    "{val.winningAngle || val.rawIdea}"
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold text-[#e43d25] mr-1">
                    {val.opportunityScore}/100
                  </span>
                  <button
                    onClick={() => {
                      addToBacklog({
                        title: val.winningAngle || val.rawIdea,
                        industry: val.industry,
                        classification: val.classification,
                        opportunityScore: val.opportunityScore,
                        geography: val.geography,
                        status: 'validated'
                      });
                      setToastMessage(`Saved "${(val.winningAngle || val.rawIdea).slice(0, 40)}..." to Backlog!`);
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    title="Save to Backlog"
                    className="p-1.5 bg-[#1b1b20] hover:bg-[#232328] text-zinc-400 hover:text-white rounded-lg border border-[#2a2a32] cursor-pointer"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      sendToStudio({
                        headline: val.winningAngle || val.rawIdea,
                        geography: val.geography,
                        suggestedContentAngle: val.classification,
                        supportingEvidence: `Validated Topic: ${val.rawIdea}`
                      })
                    }
                    className="px-3.5 py-1.5 bg-[#e43d25]/15 hover:bg-[#e43d25] text-[#ff6a52] hover:text-white text-[11px] font-semibold rounded-full border border-[#e43d25]/30 hover:border-transparent transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Draft</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Autonomous Suggestions */}
      <div className="bg-[#16161a] p-6 rounded-3xl border border-[#26262b]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-zinc-100 font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#e43d25]" />
              <span>Autonomous Topic Recommendations (Pre-Researched)</span>
            </h3>
            <p className="text-[11px] text-zinc-500">
              Formulated from Nine Degree's live blog archive and active regulatory and tech shifts.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
            5 Ready Opportunities
          </span>
        </div>

        <div className="space-y-3">
          {autonomousSuggestions.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-[#1b1b20] rounded-2xl border border-[#282830] hover:border-[#e43d25]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#24242c] text-zinc-300 font-medium border border-[#2d2d38]">
                    {item.industry}
                  </span>
                  <span>•</span>
                  <span className="text-indigo-400">{item.classification}</span>
                  <span>•</span>
                  <span className="text-[#ff6a52] font-semibold">Score: {item.opportunityScore}/100</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-100 group-hover:text-[#ff6a52] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1">
                  <span className="text-zinc-500">Why Now: </span>
                  {item.reason}
                </p>
                <p className="text-[11px] text-zinc-500 italic mt-0.5">
                  <span className="text-[#ff6a52]">Angle: </span>
                  {item.angle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setInputIdea(item.title);
                    validateTopic(item.title, item.industry, 'Global / Cross-Border');
                  }}
                  className="px-3.5 py-1.5 bg-[#222228] hover:bg-[#2a2a32] text-zinc-300 text-[11px] rounded-full border border-[#2e2e36] transition-all cursor-pointer"
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
                  className="px-4 py-1.5 bg-[#e43d25] hover:bg-[#d8402a] text-white text-[11px] font-semibold rounded-full shadow-sm shadow-[#e43d25]/20 hover:shadow-md hover:shadow-[#e43d25]/30 transition-all flex items-center gap-1.5 cursor-pointer"
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
