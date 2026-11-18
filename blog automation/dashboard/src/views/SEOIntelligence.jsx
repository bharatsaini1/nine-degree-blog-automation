import React, { useState } from 'react';
import {
  Search,
  Target,
  FileCheck
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const SEOIntelligence = () => {
  const { keywordClusters, sendToStudio } = useIntelligence();
  const [activePillar, setActivePillar] = useState('All');

  const filteredClusters = keywordClusters.filter((c) => {
    if (activePillar !== 'All' && c.pillar !== activePillar) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Search className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-zinc-100">
              Global SEO & GEO (Generative Engine Optimization) Matrix
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              `content-strategy` & `aeo`
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Keyword clusters structured across three strategic pillars: **Authority** (fiduciary trust & RERA/DLD compliance), **Acquisition** (HNI buyer intent), and **Advocacy** (conversational ChatGPT & Perplexity search visibility).
          </p>
        </div>

        <div className="flex items-center bg-[#17171a] p-1 rounded-xl border border-[#26262a] text-xs">
          {['All', 'Authority', 'Acquisition', 'Advocacy'].map((pil) => (
            <button
              key={pil}
              onClick={() => setActivePillar(pil)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                activePillar === pil
                  ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {pil}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {filteredClusters.map((cluster) => (
          <div
            key={cluster.pillar}
            className="bg-[#111113] rounded-2xl border border-[#222226] overflow-hidden shadow-xl"
          >
            <div className="p-4 bg-[#161619] border-b border-[#222226] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#d4af37]">
                    Pillar: {cluster.pillar}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-[11px] text-zinc-400 font-sans">
                    {cluster.description}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                {cluster.keywords.length} Verified Queries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141417] text-zinc-400 font-mono text-[10px] uppercase tracking-wider border-b border-[#202024]">
                  <tr>
                    <th className="py-2.5 px-4">Target Query (Search + Conversational GEO)</th>
                    <th className="py-2.5 px-4">Search Intent</th>
                    <th className="py-2.5 px-4">Monthly Search Demand</th>
                    <th className="py-2.5 px-4">Keyword Difficulty (KD)</th>
                    <th className="py-2.5 px-4">Est. Commercial CPC</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e22] text-zinc-300">
                  {cluster.keywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-[#161619]/60 transition-colors">
                      <td className="py-3 px-4 font-medium text-zinc-100 flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{kw.term}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1c1c20] text-zinc-300 border border-[#2a2a30]">
                          {kw.intent}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-200">
                        {kw.volume.toLocaleString()} / mo
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-400">
                        {kw.kd}
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-400">
                        {kw.cpc}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() =>
                            sendToStudio({
                              headline: `Advisory Brief: ${kw.term.toUpperCase()}`,
                              geography: 'Global / National',
                              suggestedContentAngle: `Targeted SEO Authority Article for ${kw.term}`,
                              supportingEvidence: `Search Intent: ${kw.intent}; Volume: ${kw.volume}/mo; CPC: ${kw.cpc}`
                            })
                          }
                          className="px-2.5 py-1 bg-[#d4af37]/15 hover:bg-[#d4af37] text-[#d4af37] hover:text-black text-[11px] font-semibold rounded-lg transition-all cursor-pointer"
                        >
                          Send to Studio
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226]">
        <div className="flex items-center gap-2 mb-3">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-zinc-100 font-serif">
            Automated SEO & GEO Semantic Audit Rubric (n8n DPT 5 Gate)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a]">
            <div className="font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Keyword Placement & Entity Density</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Primary keyword verified in H1 title, first 100 words, and at least two H2 headings without robotic repetition.
            </p>
          </div>

          <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a]">
            <div className="font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Generative Engine Citation (GEO)</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Factual definitions structured clearly so ChatGPT Search and Perplexity identify Nine Degree as the primary authoritative citation.
            </p>
          </div>

          <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a]">
            <div className="font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Zero Cliché Enforcement</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Automatic rejection of generic filler: "delve", "beacon", "tapestry", "in conclusion" are flagged and removed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
