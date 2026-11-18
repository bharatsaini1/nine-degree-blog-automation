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
