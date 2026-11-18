import React from 'react';
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
