import React, { useState } from 'react';
import {
  Users,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const CompetitorIntelligence = () => {
  const { competitors, setCompetitors, sendToStudio } = useIntelligence();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    url: '',
    industry: 'Real Estate',
    geography: 'Global / National',
    positioning: '',
    strengths: '',
    gaps: '',
    evidence: '',
    counterAngle: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCompetitor.name) return;
    const item = {
      id: `comp-${Date.now()}`,
      ...newCompetitor,
      status: 'Monitored',
      lastChecked: new Date().toISOString().split('T')[0]
    };
    setCompetitors([item, ...competitors]);
    setShowAddModal(false);
    setNewCompetitor({
      name: '',
      url: '',
      industry: 'Real Estate',
      geography: 'Global / National',
      positioning: '',
      strengths: '',
      gaps: '',
      evidence: '',
      counterAngle: ''
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-zinc-100">
              Competitor Intelligence & Teardown Bureau
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              `competitor-alternatives` Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Real competitor audits exposing what existing portals and macro wealth reports covered well, where their content fails in fiduciary depth, and Nine Degree's high-authority counter-angle. No manufactured weaknesses.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-sm shadow-[#d4af37]/10 shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Competitor Source</span>
        </button>
      </div>

      <div className="bg-[#111113] rounded-2xl border border-[#222226] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#222226] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-100 font-serif">
            Verified Competitor Content & Gap Matrix
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">
            {competitors.length} Tracked Sources
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161619] text-zinc-400 font-mono text-[10.5px] uppercase tracking-wider border-b border-[#222226]">
              <tr>
                <th className="py-3 px-4">Competitor / Entity</th>
                <th className="py-3 px-4">Main Positioning</th>
                <th className="py-3 px-4">What They Cover Well</th>
                <th className="py-3 px-4 text-amber-400">Critical Gap / Weakness</th>
                <th className="py-3 px-4">Verified Evidence</th>
                <th className="py-3 px-4 text-[#d4af37]">Nine Degree Counter-Angle</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f23] text-zinc-300">
              {competitors.map((comp) => (
                <tr key={comp.id} className="hover:bg-[#161619]/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-zinc-100">
                    <div>{comp.name}</div>
                    <a
                      href={comp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-zinc-500 hover:text-[#d4af37] flex items-center gap-1 mt-0.5"
                    >
                      <span>Original Link</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </td>
                  <td className="py-3.5 px-4 max-w-[200px] text-[11px] text-zinc-400 leading-relaxed">
                    {comp.positioning}
                  </td>
                  <td className="py-3.5 px-4 max-w-[180px] text-[11px] text-emerald-400/90 leading-relaxed">
                    {comp.strengths}
                  </td>
                  <td className="py-3.5 px-4 max-w-[220px] text-[11px] text-amber-300 leading-relaxed font-medium">
                    {comp.gaps}
                  </td>
                  <td className="py-3.5 px-4 max-w-[200px] text-[11px] text-zinc-400 italic leading-relaxed">
                    "{comp.evidence}"
                  </td>
                  <td className="py-3.5 px-4 max-w-[240px] text-xs text-[#d4af37] font-serif font-medium leading-relaxed">
                    {comp.counterAngle}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() =>
                        sendToStudio({
                          headline: comp.counterAngle,
                          geography: comp.geography,
                          suggestedContentAngle: comp.gaps,
                          supportingEvidence: comp.evidence
                        })
                      }
                      className="px-2.5 py-1.5 bg-[#d4af37]/15 hover:bg-[#d4af37] text-[#d4af37] hover:text-black text-[11px] font-semibold rounded-lg transition-all shrink-0 cursor-pointer"
                    >
                      Draft Counter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Competitive Positioning Landscape
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Major aggregator portals operate as transaction billboards, monetizing developer banner ads. This structurally prevents them from criticizing project delays or highlighting escrow defaults.
          </p>
          <div className="mt-3 p-3 bg-[#17171a] rounded-xl border border-[#26262a] text-[11px] text-[#d4af37] font-serif">
            Nine Degree Moat: We do not accept broker classified ads. Our authority stems from fiduciary due diligence, financial underwriting, and brand architecture.
          </div>
        </div>

        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Monitoring Schedule & Scraper State
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-zinc-300">
              <span>Housing.com Real Estate Research</span>
              <span className="text-emerald-400 font-mono text-[11px]">Synced Today</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span>Knight Frank Global Wealth Reports</span>
              <span className="text-emerald-400 font-mono text-[11px]">Synced Yesterday</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span>RERA & Dubai Land Dept Circulars</span>
              <span className="text-emerald-400 font-mono text-[11px]">Active Feed</span>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141417] border border-[#2e2e34] rounded-2xl max-w-lg w-full p-6 shadow-2xl text-xs">
            <h3 className="text-base font-serif font-bold text-zinc-100 mb-1">
              Track New Competitor Source
            </h3>
            <p className="text-zinc-400 mb-4">
              Enter competitor article to deconstruct and formulate Nine Degree counter-angle.
            </p>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Competitor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Knight Frank Research Desk"
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Article or Portal URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newCompetitor.url}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, url: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Main Claim / Positioning</label>
                <input
                  type="text"
                  placeholder="Their central thesis..."
                  value={newCompetitor.positioning}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, positioning: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-400 font-medium mb-1">Critical Weakness / Gap</label>
                <textarea
                  rows={2}
                  placeholder="What did they miss or gloss over?"
                  value={newCompetitor.gaps}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, gaps: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4af37] font-medium mb-1">Nine Degree Counter-Angle</label>
                <input
                  type="text"
                  placeholder="The differentiated title to write..."
                  value={newCompetitor.counterAngle}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, counterAngle: e.target.value })}
                  className="w-full bg-[#1b1b1f] border border-[#2e2e34] rounded-lg px-3 py-2 text-zinc-100 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#26262a]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#202024] text-zinc-300 rounded-lg hover:bg-[#28282e] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d4af37] text-black font-semibold rounded-lg hover:brightness-110 cursor-pointer"
                >
                  Add Competitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
