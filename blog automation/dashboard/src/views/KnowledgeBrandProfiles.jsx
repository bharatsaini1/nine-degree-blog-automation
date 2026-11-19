import React, { useState } from 'react';
import { BookOpen, ShieldAlert, CheckCircle2, MapPin, Award, Plus, Trash2, X, Sparkles, AlertCircle } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const KnowledgeBrandProfiles = () => {
  const {
    brandProfile,
    addBannedCliche,
    removeBannedCliche,
    addMicroMarket,
    removeMicroMarket,
    addVoiceRule,
    removeVoiceRule
  } = useIntelligence();

  const [newCliche, setNewCliche] = useState('');
  const [newMarket, setNewMarket] = useState('');
  const [newRule, setNewRule] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  const showFeedback = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleAddCliche = (e) => {
    e.preventDefault();
    if (!newCliche.trim()) return;
    addBannedCliche(newCliche);
    showFeedback(`Banned cliché "${newCliche.trim()}" added to Quality Gate`);
    setNewCliche('');
  };

  const handleAddMarket = (e) => {
    e.preventDefault();
    if (!newMarket.trim()) return;
    addMicroMarket(newMarket);
    showFeedback(`Tracked corridor "${newMarket.trim()}" added to intelligence scope`);
    setNewMarket('');
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.trim()) return;
    addVoiceRule(newRule);
    showFeedback(`Advisory Voice directive registered in Department 3`);
    setNewRule('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              Brand Governance & Fiduciary Knowledge Base
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e43d25]/10 text-[#ff6a52] border border-[#e43d25]/20 font-semibold">
              Nine Degree Standard 2.0
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Core editorial persona, verified global & domestic real estate corridors, fiduciary voice mandates, and banned AI cliché guardrails enforced across all 5 autonomous departments.
          </p>
        </div>

        {statusMsg && (
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{statusMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Voice Rules & Micro-Markets */}
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-5 text-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-zinc-100 font-display flex items-center gap-2">
                <Award className="w-4 h-4 text-[#e43d25]" />
                <span>Nine Degree Advisory Voice Rules</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">
                {brandProfile.editorialVoiceRules.length} Active Directives
              </span>
            </div>
            <p className="text-zinc-400 text-[11px] mb-3">
              Synthesized by Department 3 (Chief Real Estate Analyst) to ensure fiduciary-grade authority.
            </p>

            {/* List of rules */}
            <div className="space-y-2">
              {brandProfile.editorialVoiceRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="group p-3 bg-[#161619] hover:bg-[#1a1a1e] rounded-xl border border-[#26262a] text-zinc-300 flex items-start justify-between gap-3 transition-colors"
                >
                  <div className="flex items-start gap-2.5 flex-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rule}</span>
                  </div>
                  <button
                    onClick={() => {
                      removeVoiceRule(idx);
                      showFeedback(`Rule #${idx + 1} removed`);
                    }}
                    title="Remove rule"
                    className="opacity-40 group-hover:opacity-100 text-zinc-500 hover:text-rose-400 p-1 rounded-md transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add rule input */}
            <form onSubmit={handleAddRule} className="mt-3 flex gap-2">
              <input
                type="text"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Add new advisory voice mandate..."
                className="flex-1 bg-[#161619] border border-[#26262a] rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#e43d25]/50 font-sans"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#e43d25] hover:bg-[#ff4e36] text-white rounded-xl font-medium flex items-center gap-1.5 transition-all text-xs cursor-pointer shadow-lg shadow-[#e43d25]/20 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Micro-Market Corridors */}
          <div className="pt-4 border-t border-[#202024]">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#e43d25]" />
                <span>Tracked Global & Domestic Corridors ({brandProfile.keyMicroMarkets.length})</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {brandProfile.keyMicroMarkets.map((m, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#18181c] hover:bg-[#1e1e24] text-zinc-300 font-mono text-[11px] border border-[#26262a] flex items-center gap-1.5 transition-all group"
                >
                  <MapPin className="w-2.5 h-2.5 text-[#e43d25]" />
                  <span>{m}</span>
                  <button
                    onClick={() => {
                      removeMicroMarket(m);
                      showFeedback(`Removed corridor "${m}"`);
                    }}
                    title={`Remove ${m}`}
                    className="ml-1 text-zinc-500 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddMarket} className="flex gap-2">
              <input
                type="text"
                value={newMarket}
                onChange={(e) => setNewMarket(e.target.value)}
                placeholder="e.g. Hyderabad Financial District, Goa Coastal Reserve..."
                className="flex-1 bg-[#161619] border border-[#26262a] rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#e43d25]/50 font-sans"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#202024] hover:bg-[#28282e] hover:border-[#e43d25]/40 text-zinc-200 border border-[#2e2e34] rounded-xl font-medium flex items-center gap-1.5 transition-all text-xs cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-[#e43d25]" />
                <span>Add Corridor</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Banned AI Clichés & Quality Guardrail */}
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-100 font-display flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Banned Generic AI Cliché Dictionary</span>
              </h3>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                Enforced by Department 5 QA
              </span>
            </div>

            <p className="text-zinc-400 leading-relaxed text-[11px]">
              Any editorial draft containing these robotic filler phrases is automatically flagged and rejected by the Department 5 Quality Assurance Gate before executive publication.
            </p>

            <div className="flex flex-wrap gap-2">
              {brandProfile.bannedCliches.map((word, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-mono text-[11px] border border-rose-500/20 flex items-center gap-1.5 transition-all group"
                >
                  <span>"{word}"</span>
                  <button
                    onClick={() => {
                      removeBannedCliche(word);
                      showFeedback(`Unbanned phrase "${word}"`);
                    }}
                    title={`Unban "${word}"`}
                    className="text-rose-400/60 hover:text-rose-200 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddCliche} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newCliche}
                onChange={(e) => setNewCliche(e.target.value)}
                placeholder="Ban new generic phrase (e.g. game changer, in today's world)..."
                className="flex-1 bg-[#161619] border border-[#26262a] rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 font-sans"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 rounded-xl font-medium flex items-center gap-1.5 transition-all text-xs cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ban Phrase</span>
              </button>
            </form>
          </div>

          <div className="p-4 bg-[#161619] rounded-xl border border-[#26262a] text-[11px] text-zinc-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
              <AlertCircle className="w-3.5 h-3.5 text-[#e43d25]" />
              <span>Advisory Quality Directive:</span>
            </div>
            <p className="leading-relaxed">
              Replace promotional adjectives and generic fluff with verified fiduciary data: RERA project registration IDs, circle rate spreads, construction milestone verification, escrow yields, and high-court land title precedents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
