import React from 'react';
import { BookOpen, ShieldAlert, CheckCircle2, MapPin, Award } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const KnowledgeBrandProfiles = () => {
  const { brandProfile } = useIntelligence();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-lg font-serif font-bold text-zinc-100">
            Brand Governance & Fiduciary Knowledge Base
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
            Nine Degree Global Standard
          </span>
        </div>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Core editorial persona, verified global & domestic real estate corridors, target audience profiles, and banned AI cliché guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs">
          <h3 className="text-sm font-semibold text-zinc-100 font-serif flex items-center gap-2">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span>Nine Degree Advisory Voice Rules</span>
          </h3>

          <div className="space-y-2">
            {brandProfile.editorialVoiceRules.map((rule, idx) => (
              <div key={idx} className="p-3 bg-[#161619] rounded-xl border border-[#26262a] text-zinc-300 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#202024]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Tracked Global & Domestic Corridors:
            </div>
            <div className="flex flex-wrap gap-2">
              {brandProfile.keyMicroMarkets.map((m, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#18181c] text-zinc-300 font-mono text-[10.5px] border border-[#26262a] flex items-center gap-1"
                >
                  <MapPin className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>{m}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-100 font-serif flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Banned Generic AI Cliché Dictionary</span>
            </h3>
            <span className="text-[10px] font-mono text-rose-400">Enforced by DPT 5</span>
          </div>

          <p className="text-zinc-400">
            Any draft containing these robotic filler phrases is automatically rejected by the Quality Assurance Gate.
          </p>

          <div className="flex flex-wrap gap-2">
            {brandProfile.bannedCliches.map((word, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 font-mono text-[11px] border border-rose-500/20"
              >
                ✕ "{word}"
              </span>
            ))}
          </div>

          <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] text-[11px] text-zinc-400 mt-4">
            <span className="font-semibold text-zinc-200 block mb-0.5">Advisory Directive:</span>
            Replace generic fluff with verified data: circle rates, construction timeline metrics, escrow percentages, and court precedents.
          </div>
        </div>
      </div>
    </div>
  );
};
