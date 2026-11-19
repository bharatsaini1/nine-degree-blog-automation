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
      <div className="bg-[#16161a] p-6 lg:p-8 rounded-3xl border border-[#26262b] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              Competitor Intelligence & Teardown Bureau
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
              `competitor-alternatives` Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Real competitor audits exposing what existing portals and macro wealth reports covered well, where their content fails in fiduciary depth, and Nine Degree's high-authority counter-angle. No manufactured weaknesses.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Competitor Source</span>
        </button>
      </div>

      <div className="bg-[#16161a] rounded-3xl border border-[#26262b] overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#26262b] flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-100 font-display">
            Verified Competitor Content & Gap Matrix
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">
            {competitors.length} Tracked Sources
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1b1b20] text-zinc-400 font-mono text-[10.5px] uppercase tracking-wider border-b border-[#26262b]">
              <tr>
                <th className="py-3.5 px-4">Competitor / Entity</th>
                <th className="py-3.5 px-4">Main Positioning</th>
                <th className="py-3.5 px-4">What They Cover Well</th>
                <th className="py-3.5 px-4 text-amber-400">Critical Gap / Weakness</th>
                <th className="py-3.5 px-4">Verified Evidence</th>
                <th className="py-3.5 px-4 text-[#ff6a52]">Nine Degree Counter-Angle</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222228] text-zinc-300">
              {competitors.map((comp) => (
                <tr key={comp.id} className="hover:bg-[#1b1b22] transition-colors">
                  <td className="py-4 px-4 font-medium text-zinc-100">
                    <div className="font-semibold text-zinc-100">{comp.name}</div>
                    <a
                      href={comp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-zinc-500 hover:text-[#ff6a52] flex items-center gap-1 mt-0.5 transition-colors"
                    >
                      <span>Original Link</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </td>
                  <td className="py-4 px-4 max-w-[200px] text-[11px] text-zinc-400 leading-relaxed">
                    {comp.positioning}
                  </td>
                  <td className="py-4 px-4 max-w-[180px] text-[11px] text-emerald-400/90 leading-relaxed">
                    {comp.strengths}
                  </td>
                  <td className="py-4 px-4 max-w-[220px] text-[11px] text-amber-300 leading-relaxed font-medium">
                    {comp.gaps}
                  </td>
                  <td className="py-4 px-4 max-w-[200px] text-[11px] text-zinc-400 italic leading-relaxed">
                    "{comp.evidence}"
                  </td>
                  <td className="py-4 px-4 max-w-[240px] text-xs text-[#ff6a52] font-semibold leading-relaxed">
                    {comp.counterAngle}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() =>
                        sendToStudio({
                          headline: comp.counterAngle,
                          geography: comp.geography,
                          suggestedContentAngle: comp.gaps,
                          supportingEvidence: comp.evidence
                        })
                      }
                      className="px-3.5 py-1.5 bg-[#e43d25]/15 hover:bg-[#e43d25] text-[#ff6a52] hover:text-white text-[11px] font-semibold rounded-full border border-[#e43d25]/30 hover:border-transparent transition-all shrink-0 cursor-pointer"
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
        <div className="bg-[#16161a] p-6 rounded-3xl border border-[#26262b]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
            Competitive Positioning Landscape
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Major aggregator portals operate as transaction billboards, monetizing developer banner ads. This structurally prevents them from criticizing project delays or highlighting escrow defaults.
          </p>
          <div className="mt-4 p-4 bg-[#1c1313] rounded-2xl border border-[#e43d25]/30 text-xs text-[#ff8f7d] leading-relaxed">
            <span className="font-bold text-[#ff6a52]">Nine Degree Moat:</span> We do not accept broker classified ads. Our authority stems from fiduciary due diligence, financial underwriting, and brand architecture.
          </div>
        </div>

        <div className="bg-[#16161a] p-6 rounded-3xl border border-[#26262b]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
            Monitoring Schedule & Scraper State
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-zinc-300 p-2.5 bg-[#1b1b20] rounded-xl border border-[#26262b]">
              <span>Housing.com Real Estate Research</span>
              <span className="text-emerald-400 font-mono text-[11px]">Synced Today</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300 p-2.5 bg-[#1b1b20] rounded-xl border border-[#26262b]">
              <span>Knight Frank Global Wealth Reports</span>
              <span className="text-emerald-400 font-mono text-[11px]">Synced Today</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300 p-2.5 bg-[#1b1b20] rounded-xl border border-[#26262b]">
              <span>PropTiger Corridors & Escrow Watch</span>
              <span className="text-emerald-400 font-mono text-[11px]">Synced Today</span>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16161a] border border-[#2a2a32] rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-display font-bold text-zinc-100 mb-1">
              Add Competitor Source for Automated Teardown
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Identify where standard portals lack depth and define the counter-advisory angle.
            </p>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Competitor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 99acres Corridor Reports"
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Published Content URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newCompetitor.url}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, url: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">What They Cover Well</label>
                <input
                  type="text"
                  placeholder="e.g. Surface pricing charts and broad portal traffic..."
                  value={newCompetitor.strengths}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, strengths: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Critical Fiduciary Content Gap *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="What crucial due diligence or architectural truth is completely omitted?"
                  value={newCompetitor.gaps}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, gaps: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Nine Degree High-Authority Counter Angle *</label>
                <input
                  type="text"
                  required
                  placeholder="The advisory article headline to win the high-trust audience..."
                  value={newCompetitor.counterAngle}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, counterAngle: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#26262b]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#202026] text-zinc-300 rounded-full hover:bg-[#282830] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white font-semibold rounded-full shadow-md shadow-[#e43d25]/25 cursor-pointer transition-all"
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
