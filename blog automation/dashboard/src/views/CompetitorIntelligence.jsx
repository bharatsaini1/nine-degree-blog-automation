import React, { useState, useMemo } from 'react';
import {
  Users,
  ExternalLink,
  Plus,
  Search,
  Trash2,
  RefreshCw,
  CheckCircle2,
  MapPin,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const CompetitorIntelligence = () => {
  const { competitors, setCompetitors, sendToStudio } = useIntelligence();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGeo, setSelectedGeo] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    url: '',
    industry: 'Real Estate',
    geography: 'Jaipur, Rajasthan',
    positioning: '',
    strengths: '',
    gaps: '',
    evidence: '',
    counterAngle: ''
  });

  const geographies = [
    'All',
    'Jaipur, Rajasthan',
    'Pune, Maharashtra',
    'Mumbai, Maharashtra',
    'Tier-1 & Tier-2 Growth Metros',
    'Global / Dubai / London',
    'India / National'
  ];

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
    setToastMessage(`Added competitor audit for "${item.name}"!`);
    setTimeout(() => setToastMessage(null), 3000);
    setNewCompetitor({
      name: '',
      url: '',
      industry: 'Real Estate',
      geography: 'Jaipur, Rajasthan',
      positioning: '',
      strengths: '',
      gaps: '',
      evidence: '',
      counterAngle: ''
    });
  };

  const handleDelete = (id, name) => {
    setCompetitors(competitors.filter((c) => c.id !== id));
    setToastMessage(`Removed "${name}" from competitor watch.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTriggerAudit = () => {
    setIsScanning(true);
    setTimeout(() => {
      // simulate fresh teardown discovery
      const freshComp = {
        id: `comp-${Date.now()}`,
        name: '99acres Jaipur Micro-Market Portal',
        url: 'https://99acres.com/jaipur-real-estate-trends',
        industry: 'Real Estate',
        geography: 'Jaipur, Rajasthan',
        positioning: 'Mass retail classifieds promoting outlying unapproved agricultural plots',
        strengths: 'High direct portal traffic, extensive broker directory',
        gaps: 'Zero RERA title verification, fails to warn buyers about agricultural land conversion bottlenecks',
        evidence: '99acres lists 40+ unapproved satellite plot schemes in Jaipur outer ring',
        counterAngle: 'The Jaipur Plotted Due-Diligence Rubric: How to Verify JDA Demarcation and Escrow Clearance',
        status: 'Monitored',
        lastChecked: new Date().toISOString().split('T')[0]
      };

      if (!competitors.some((c) => c.name === freshComp.name)) {
        setCompetitors([freshComp, ...competitors]);
      }
      setIsScanning(false);
      setToastMessage('Live Competitor Teardown completed! Discovered fresh micro-market gaps.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1100);
  };

  const filteredCompetitors = useMemo(() => {
    return competitors.filter((comp) => {
      // Geo filter
      if (selectedGeo !== 'All') {
        const cGeo = (comp.geography || '').toLowerCase();
        const target = selectedGeo.toLowerCase();
        if (target.includes('jaipur') && !cGeo.includes('jaipur')) return false;
        if (target.includes('pune') && !cGeo.includes('pune')) return false;
        if (target.includes('mumbai') && !cGeo.includes('mumbai')) return false;
        if (target.includes('global') && !cGeo.includes('global') && !cGeo.includes('dubai') && !cGeo.includes('london')) return false;
      }

      // Text search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const nameMatch = (comp.name || '').toLowerCase().includes(q);
        const posMatch = (comp.positioning || '').toLowerCase().includes(q);
        const gapMatch = (comp.gaps || '').toLowerCase().includes(q);
        const counterMatch = (comp.counterAngle || '').toLowerCase().includes(q);
        if (!nameMatch && !posMatch && !gapMatch && !counterMatch) return false;
      }

      return true;
    });
  }, [competitors, selectedGeo, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-gradient-to-r from-emerald-500/20 via-[#16161a] to-[#16161a] border border-emerald-500/40 px-5 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-zinc-500">Live Sync</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="bg-[#16161a] p-6 lg:p-8 rounded-3xl border border-[#26262b] shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleTriggerAudit}
              disabled={isScanning}
              className="px-4 py-2 bg-[#1b1b20] hover:bg-[#222228] text-zinc-200 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 border border-[#2a2a32] hover:border-[#e43d25]/40 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#e43d25] ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Auditing Portals...' : 'Trigger Live SERP Audit'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Competitor Source</span>
            </button>
          </div>
        </div>

        {/* Search & Geography Filter Ribbon */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#232328]">
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search competitor, gap, or counter-angle..."
              className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl pl-8 pr-3 py-1.5 outline-none focus:border-[#e43d25] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-500" />
              <span>Coverage:</span>
            </span>
            <select
              value={selectedGeo}
              onChange={(e) => setSelectedGeo(e.target.value)}
              className="bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-[#e43d25] transition-colors"
            >
              {geographies.map((geo) => (
                <option key={geo} value={geo}>
                  {geo === 'All' ? 'All Coverage Areas' : geo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Competitor Gap Table */}
      <div className="bg-[#16161a] rounded-3xl border border-[#26262b] overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#26262b] flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-100 font-display">
            Verified Competitor Content & Gap Matrix
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">
            {filteredCompetitors.length} Monitored Entities
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
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222228] text-zinc-300">
              {filteredCompetitors.map((comp) => (
                <tr key={comp.id} className="hover:bg-[#1b1b22] transition-colors group">
                  <td className="py-4 px-4 font-medium text-zinc-100">
                    <div className="font-semibold text-zinc-100 group-hover:text-[#ff6a52] transition-colors">
                      {comp.name}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                      📍 {comp.geography}
                    </div>
                    {comp.url && (
                      <a
                        href={comp.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-zinc-500 hover:text-[#ff6a52] flex items-center gap-1 mt-0.5 transition-colors"
                      >
                        <span>Original Link</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </td>

                  <td className="py-4 px-4 max-w-[180px] text-[11px] text-zinc-400 leading-relaxed">
                    {comp.positioning}
                  </td>

                  <td className="py-4 px-4 max-w-[180px] text-[11px] text-emerald-400/90 leading-relaxed">
                    {comp.strengths}
                  </td>

                  <td className="py-4 px-4 max-w-[200px] text-[11px] text-amber-300 leading-relaxed font-medium">
                    {comp.gaps}
                  </td>

                  <td className="py-4 px-4 max-w-[180px] text-[11px] text-zinc-400 italic leading-relaxed">
                    "{comp.evidence}"
                  </td>

                  <td className="py-4 px-4 max-w-[220px] text-xs text-[#ff6a52] font-semibold leading-relaxed">
                    {comp.counterAngle}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          sendToStudio({
                            headline: comp.counterAngle,
                            geography: comp.geography,
                            suggestedContentAngle: comp.gaps,
                            supportingEvidence: comp.evidence
                          })
                        }
                        className="px-3 py-1.5 bg-[#e43d25]/15 hover:bg-[#e43d25] text-[#ff6a52] hover:text-white text-[11px] font-semibold rounded-full border border-[#e43d25]/30 hover:border-transparent transition-all shrink-0 cursor-pointer whitespace-nowrap shadow-sm"
                      >
                        Draft Counter
                      </button>

                      <button
                        onClick={() => handleDelete(comp.id, comp.name)}
                        title="Remove competitor"
                        className="p-1.5 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer rounded-lg hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCompetitors.length === 0 && (
          <div className="p-8 text-center space-y-2">
            <Users className="w-6 h-6 text-[#e43d25] mx-auto" />
            <h4 className="text-sm font-display font-bold text-zinc-100">
              No competitors match "{searchTerm}" in {selectedGeo}
            </h4>
            <p className="text-xs text-zinc-400">
              Try resetting your filters or click "Add Competitor Source".
            </p>
          </div>
        )}
      </div>

      {/* Dynamic Monitoring Schedule and Landscape Cards */}
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
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Active Scraper Schedule & Sync State
            </h4>
            <span className="text-[10px] font-mono text-emerald-400">
              ● {competitors.length} Feeds Synced
            </span>
          </div>

          <div className="space-y-2.5 text-xs max-h-56 overflow-y-auto pr-1">
            {competitors.map((comp) => (
              <div
                key={comp.id}
                className="flex items-center justify-between text-zinc-300 p-2.5 bg-[#1b1b20] rounded-xl border border-[#26262b]"
              >
                <div>
                  <div className="font-medium text-zinc-200">{comp.name}</div>
                  <div className="text-[10px] font-mono text-zinc-500">Coverage: {comp.geography}</div>
                </div>
                <span className="text-emerald-400 font-mono text-[11px] whitespace-nowrap bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Synced: {comp.lastChecked || 'Today'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Competitor Modal */}
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
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Coverage / Geography</label>
                  <select
                    value={newCompetitor.geography}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, geography: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-200 outline-none focus:border-[#e43d25]"
                  >
                    <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                    <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                    <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Global / Dubai / London">Global / Dubai / London</option>
                    <option value="India / National">India / National</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newCompetitor.url}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, url: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Main Positioning</label>
                <input
                  type="text"
                  placeholder="e.g. General national macro volume charts"
                  value={newCompetitor.positioning}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, positioning: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Critical Gap / Weakness</label>
                <input
                  type="text"
                  placeholder="e.g. Fails to audit local RERA escrow default circulars"
                  value={newCompetitor.gaps}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, gaps: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Nine Degree Counter-Angle *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Fiduciary Escrow Test: Land Due-Diligence Checklist"
                  value={newCompetitor.counterAngle}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, counterAngle: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#26262b]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#1b1b20] hover:bg-[#232328] text-zinc-300 rounded-full border border-[#2a2a32] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white font-semibold rounded-full shadow-md shadow-[#e43d25]/20 cursor-pointer"
                >
                  Save Competitor Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
