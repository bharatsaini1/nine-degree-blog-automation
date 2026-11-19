import React from 'react';
import { Radio, ExternalLink, MapPin, ArrowRight } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const IntelligenceFeed = () => {
  const { trends, sendToStudio } = useIntelligence();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#16161a] p-6 lg:p-8 rounded-3xl border border-[#26262b] shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              Live Global & Regional Intelligence Feed
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Strict 7-Day Window Filter Active
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Real-time multi-source signal ingestion across international wealth hubs, Reddit communities, government circulars, and technology discussions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {trends.map((item) => (
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
                <span className="text-zinc-500">Published: {item.publishedDate}</span>
              </div>

              <h3 className="text-sm font-display font-bold text-zinc-100 group-hover:text-[#ff6a52] transition-colors leading-snug">
                {item.headline}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.supportingEvidence}
              </p>

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

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-lg font-display font-bold text-[#e43d25]">
                  {item.opportunityScore}/100
                </div>
                <div className="text-[9px] font-mono text-emerald-400">
                  {item.velocity}
                </div>
              </div>

              <button
                onClick={() => sendToStudio(item)}
                className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-sm shadow-[#e43d25]/20 hover:shadow-md hover:shadow-[#e43d25]/30 transition-all flex items-center gap-1.5 cursor-pointer"
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
