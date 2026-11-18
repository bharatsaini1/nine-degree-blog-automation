import React from 'react';
import {
  ListTodo,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const OpportunityBacklog = () => {
  const { backlog, setBacklog, sendToStudio } = useIntelligence();

  const handleDelete = (id) => {
    setBacklog((prev) => prev.filter((item) => item.id !== id));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'validated':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'queued':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'in_production':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'published':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ListTodo className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-zinc-100">
              Opportunity Backlog & Content Queue
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
              {backlog.length} Items Queued
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Prioritized strategic topics discovered from trends, validated hypotheses, and competitor gaps ready for editorial production.
          </p>
        </div>
      </div>

      <div className="bg-[#111113] rounded-2xl border border-[#222226] overflow-hidden shadow-xl">
        <div className="divide-y divide-[#1e1e22]">
          {backlog.map((item) => (
            <div
              key={item.id}
              className="p-5 hover:bg-[#161619]/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono mb-1.5">
                  <span
                    className={`px-2 py-0.5 rounded border uppercase tracking-wider font-semibold ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">{item.industry}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-indigo-400">{item.classification}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-500 font-mono">Date: {item.createdDate}</span>
                </div>

                <h3 className="text-sm font-serif font-bold text-zinc-100 leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-base font-serif font-bold text-[#d4af37]">
                    {item.opportunityScore}/100
                  </div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase">
                    Opportunity Score
                  </div>
                </div>

                <button
                  onClick={() =>
                    sendToStudio({
                      headline: item.title,
                      geography: 'Global / National',
                      suggestedContentAngle: item.classification,
                      supportingEvidence: `Validated Topic from Backlog: ${item.title}`
                    })
                  }
                  className="px-3.5 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Open in Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-[#202024] transition-all cursor-pointer"
                  title="Remove from Backlog"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
