import React, { useState, useMemo } from 'react';
import {
  ListTodo,
  ArrowRight,
  Trash2,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  SlidersHorizontal,
  MapPin
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const OpportunityBacklog = () => {
  const { backlog, setBacklog, updateBacklogStatus, deleteFromBacklog, sendToStudio, addToBacklog } = useIntelligence();

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    industry: 'Real Estate',
    classification: 'Searchable (High Buyer Intent)',
    opportunityScore: 95,
    status: 'queued',
    geography: 'Jaipur, Rajasthan'
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'validated':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'queued':
        return 'bg-[#e43d25]/15 text-[#ff6a52] border-[#e43d25]/30';
      case 'in_production':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'published':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newOpportunity.title.trim()) return;

    addToBacklog({
      title: newOpportunity.title.trim(),
      industry: newOpportunity.industry,
      classification: newOpportunity.classification,
      opportunityScore: parseInt(newOpportunity.opportunityScore) || 92,
      status: newOpportunity.status,
      geography: newOpportunity.geography
    });

    setShowAddModal(false);
    setToastMessage(`Added "${newOpportunity.title.slice(0, 35)}..." to Opportunity Backlog!`);
    setTimeout(() => setToastMessage(null), 3000);

    setNewOpportunity({
      title: '',
      industry: 'Real Estate',
      classification: 'Searchable (High Buyer Intent)',
      opportunityScore: 95,
      status: 'queued',
      geography: 'Jaipur, Rajasthan'
    });
  };

  const handleDelete = (id, title) => {
    deleteFromBacklog(id);
    setToastMessage(`Removed "${title.slice(0, 35)}..." from Backlog.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredBacklog = useMemo(() => {
    return backlog.filter((item) => {
      // Status tab filter
      if (activeFilter !== 'All') {
        const target = activeFilter.toLowerCase().replace(' ', '_');
        if (item.status !== target) return false;
      }

      // Text search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const titleMatch = (item.title || '').toLowerCase().includes(q);
        const indMatch = (item.industry || '').toLowerCase().includes(q);
        const classMatch = (item.classification || '').toLowerCase().includes(q);
        const geoMatch = (item.geography || '').toLowerCase().includes(q);
        if (!titleMatch && !indMatch && !classMatch && !geoMatch) return false;
      }

      return true;
    });
  }, [backlog, activeFilter, searchTerm]);

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
              <ListTodo className="w-4 h-4 text-[#e43d25]" />
              <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
                Opportunity Backlog & Content Queue
              </h2>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e43d25]/15 text-[#ff6a52] border border-[#e43d25]/30 font-medium">
                {backlog.length} Total Topics Tracked
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Prioritized strategic topics discovered from trends, validated hypotheses, and competitor gaps ready for editorial production.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/30 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest Opportunity</span>
          </button>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#232328]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search topics, industry, or corridor..."
                className="w-full bg-[#1b1b20] border border-[#2a2a32] text-zinc-200 text-xs rounded-xl pl-8 pr-3 py-1.5 outline-none focus:border-[#e43d25] transition-colors"
              />
            </div>

            <div className="flex items-center bg-[#1b1b20] p-1 rounded-full border border-[#2a2a32] text-xs">
              {['All', 'Validated', 'Queued', 'In Production', 'Published'].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all cursor-pointer ${
                    activeFilter === status
                      ? 'bg-[#e43d25] text-white font-semibold shadow-sm shadow-[#e43d25]/25'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-400">
            Showing {filteredBacklog.length} of {backlog.length} Topics
          </div>
        </div>
      </div>

      {/* Backlog List */}
      <div className="bg-[#16161a] rounded-3xl border border-[#26262b] overflow-hidden shadow-xl">
        <div className="divide-y divide-[#222228]">
          {filteredBacklog.map((item) => (
            <div
              key={item.id}
              className="p-5 hover:bg-[#1b1b22] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-[10px] font-mono mb-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">{item.industry}</span>
                  {item.geography && (
                    <>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-300 font-medium">📍 {item.geography}</span>
                    </>
                  )}
                  <span className="text-zinc-500">•</span>
                  <span className="text-indigo-400">{item.classification}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-500 font-mono">Date: {item.createdDate}</span>
                </div>

                <h3 className="text-sm font-display font-bold text-zinc-100 group-hover:text-[#ff6a52] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Workflow Status Transition Dropdown */}
                <div>
                  <select
                    value={item.status}
                    onChange={(e) => updateBacklogStatus(item.id, e.target.value)}
                    className="bg-[#1b1b20] border border-[#2b2b36] hover:border-[#e43d25]/50 text-zinc-300 text-[11px] font-mono rounded-lg px-2.5 py-1.5 outline-none cursor-pointer transition-colors"
                  >
                    <option value="queued">Queued</option>
                    <option value="validated">Validated</option>
                    <option value="in_production">In Production</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="text-right">
                  <div className="text-lg font-display font-bold text-[#e43d25]">
                    {item.opportunityScore}/100
                  </div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase font-medium">
                    Score
                  </div>
                </div>

                <button
                  onClick={() =>
                    sendToStudio({
                      headline: item.title,
                      geography: item.geography || 'Global / National',
                      suggestedContentAngle: item.classification,
                      supportingEvidence: `Validated Topic from Backlog: ${item.title}`
                    })
                  }
                  className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-sm shadow-[#e43d25]/20 hover:shadow-md hover:shadow-[#e43d25]/30 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Open in Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2 text-zinc-500 hover:text-rose-400 rounded-full hover:bg-rose-500/10 transition-all cursor-pointer"
                  title="Remove from Backlog"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBacklog.length === 0 && (
          <div className="p-8 text-center space-y-2">
            <ListTodo className="w-6 h-6 text-[#e43d25] mx-auto" />
            <h4 className="text-sm font-display font-bold text-zinc-100">
              No backlog topics match "{searchTerm}" in {activeFilter} status
            </h4>
            <p className="text-xs text-zinc-400">
              Reset your filters or click "Ingest Opportunity" to add a new strategic topic.
            </p>
          </div>
        )}
      </div>

      {/* Ingest Opportunity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16161a] border border-[#2a2a32] rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-display font-bold text-zinc-100 mb-1">
              Ingest Opportunity Topic
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Add a new strategic topic card into the Nine Degree production pipeline.
            </p>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Topic Headline / Angle *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inside Jaipur's C-Scheme Ultra-Prime Enclaves: Heritage Pricing"
                  value={newOpportunity.title}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Industry</label>
                  <select
                    value={newOpportunity.industry}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, industry: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-200 outline-none focus:border-[#e43d25]"
                  >
                    <option value="Real Estate">Real Estate</option>
                    <option value="Technology & AI">Technology & AI</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Banking & Finance">Banking & Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Metro / Geography</label>
                  <select
                    value={newOpportunity.geography}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, geography: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-200 outline-none focus:border-[#e43d25]"
                  >
                    <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                    <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                    <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Global / Cross-Border">Global / Cross-Border</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Initial Status</label>
                  <select
                    value={newOpportunity.status}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, status: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-200 outline-none focus:border-[#e43d25]"
                  >
                    <option value="queued">Queued</option>
                    <option value="validated">Validated</option>
                    <option value="in_production">In Production</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Opportunity Score (0-100)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={newOpportunity.opportunityScore}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, opportunityScore: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                  />
                </div>
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
                  Add to Backlog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
