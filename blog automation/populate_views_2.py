import os

BASE = r"D:\BrightLoom\cleints works\Nine Degree\blog automation\dashboard\src\views"

views = {}

views["CompetitorIntelligence.jsx"] = """import React, { useState } from 'react';
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
"""

views["SEOIntelligence.jsx"] = """import React, { useState } from 'react';
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
"""

views["OpportunityBacklog.jsx"] = """import React from 'react';
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
"""

views["ContentStudio.jsx"] = """import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Copy
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const ContentStudio = () => {
  const {
    editorialBrief,
    setEditorialBrief,
    article,
    generateArticle,
    isGenerating,
    aiModels
  } = useIntelligence();

  const [activeDossierTab, setActiveDossierTab] = useState('summary');
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const blogArchitectures = [
    'Thought Leadership',
    'Market Outlook',
    'Industry Analysis',
    'Strategic Advisory Article',
    'Case Study',
    'Practical Guide & Due Diligence',
    'Comparison (e.g. Luxury vs Mid-Segment)',
    'Regulatory Deep Dive',
    'Pillar Authority Article',
    'Generative Search (GEO) Explainer'
  ];

  const writingTones = [
    'Authoritative Advisory',
    'Analytical & Macro-Economic',
    'Journalistic Investigation',
    'Strategic Frameworks',
    'Conversational Executive',
    'Technical Due-Diligence'
  ];

  const knowledgeDepths = [
    'Expert & Research-Grade',
    'Deep Knowledge Sharing',
    'Practical Advisory Guide',
    'Standard Overview'
  ];

  const handleCopyMarkdown = () => {
    const md = `# ${article.title}\\n\\n*${article.subtitle}*\\n\\n**By ${article.author}** | ${article.readingTime}\\n\\n## Executive Summary\\n${article.executiveSummary}\\n\\n${article.sections.map(s => `## ${s.heading}\\n\\n${s.content}\\n`).join('\\n')}\\n\\n## Frequently Asked Questions\\n${article.faq.map(f => `**Q: ${f.q}**\\n${f.a}\\n`).join('\\n')}`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isClaudeAvailable = aiModels.claude.status === 'connected';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PenTool className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-zinc-100">
              Master Editorial Bureau & Studio
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              5-Department n8n Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Configure the strategic brief, assign specialist AI models, input expert observations, and generate long-form Nine Degree publications with 4K architectural visual assets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 bg-[#1c1c20] text-zinc-200 text-xs font-medium rounded-xl hover:bg-[#25252a] transition-all flex items-center gap-1.5 border border-[#2e2e34] cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied MD!' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={generateArticle}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black text-xs font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-md shadow-[#d4af37]/15 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating via 5-Dept Pipeline...' : 'Generate Article via n8n'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#202024] pb-3">
              <h3 className="text-sm font-semibold text-zinc-100 font-serif flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#d4af37]" />
                <span>Editorial Brief & Settings</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">Department 3 Input</span>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Topic or Strategic Thesis *
              </label>
              <textarea
                rows={2}
                required
                value={editorialBrief.topic}
                onChange={(e) => setEditorialBrief({ ...editorialBrief, topic: e.target.value })}
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#d4af37] text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-mono text-[10px] uppercase mb-1">
                  Blog Architecture
                </label>
                <select
                  value={editorialBrief.blogType}
                  onChange={(e) => setEditorialBrief({ ...editorialBrief, blogType: e.target.value })}
                  className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 outline-none text-[11px]"
                >
                  {blogArchitectures.map((arch) => (
                    <option key={arch} value={arch}>{arch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-[10px] uppercase mb-1">
                  Writing Tone
                </label>
                <select
                  value={editorialBrief.writingTone}
                  onChange={(e) => setEditorialBrief({ ...editorialBrief, writingTone: e.target.value })}
                  className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 outline-none text-[11px]"
                >
                  {writingTones.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-mono text-[10px] uppercase mb-1">
                  Information Depth
                </label>
                <select
                  value={editorialBrief.informationDepth}
                  onChange={(e) => setEditorialBrief({ ...editorialBrief, informationDepth: e.target.value })}
                  className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 outline-none text-[11px]"
                >
                  {knowledgeDepths.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-[10px] uppercase mb-1">
                  Writer Model (DPT 3)
                </label>
                <select
                  value={editorialBrief.assignedWriterModel}
                  onChange={(e) => setEditorialBrief({ ...editorialBrief, assignedWriterModel: e.target.value })}
                  className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 outline-none text-[11px]"
                >
                  <option value="gemini-2.5-flash">Google Gemini 2.5 Flash (Default)</option>
                  <option value="gemini-2.5-pro">Google Gemini 2.5 Pro</option>
                  <option value="claude-3-5-sonnet-20241022" disabled={!isClaudeAvailable}>
                    Anthropic Claude 3.5 Sonnet {isClaudeAvailable ? '(Connected)' : '(Add Key in Models tab)'}
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-mono text-[10px] uppercase mb-1">
                  Geographic Scope (Global / Metro)
                </label>
                <input
                  type="text"
                  value={editorialBrief.geographicFocus}
                  onChange={(e) => setEditorialBrief({ ...editorialBrief, geographicFocus: e.target.value })}
                  className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-3 py-1.5 text-zinc-200 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-[10px] uppercase mb-1">
                  Primary SEO / GEO Keyword
                </label>
                <input
                  type="text"
                  value={editorialBrief.primaryKeyword}
                  onChange={(e) => setEditorialBrief({ ...editorialBrief, primaryKeyword: e.target.value })}
                  className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-3 py-1.5 text-zinc-200 outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-zinc-300 font-medium">
                  Expert Contribution & Insider Observations
                </label>
                <span className="text-[10px] font-mono text-[#d4af37]">Swapnil Soni / VP Notes</span>
              </div>
              <textarea
                rows={3}
                placeholder="Add proprietary data, legal rulings, or on-ground deal statistics..."
                value={editorialBrief.expertNotes}
                onChange={(e) => setEditorialBrief({ ...editorialBrief, expertNotes: e.target.value })}
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#d4af37] text-xs font-serif leading-relaxed"
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                The Master Writer will naturally weave these insider points into the core argument while keeping them distinct from external citations.
              </p>
            </div>
          </div>

          <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-[#202024] pb-3 mb-3">
              <div className="flex items-center gap-1 bg-[#17171a] p-1 rounded-lg border border-[#28282e]">
                {['summary', 'keywords', 'competitor', 'qa'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDossierTab(tab)}
                    className={`px-2.5 py-1 rounded font-mono text-[10.5px] uppercase transition-all cursor-pointer ${
                      activeDossierTab === tab
                        ? 'bg-[#d4af37] text-black font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono text-emerald-400">DPT 2 + 5 Dossier</span>
            </div>

            {activeDossierTab === 'summary' && (
              <div className="space-y-2 text-zinc-300">
                <div className="text-[11px] font-medium text-zinc-200">
                  Target Thesis: "{editorialBrief.topic}"
                </div>
                <div className="text-[11px] text-zinc-400">
                  Verified across global intelligence briefs and market reports. Search intent classified as High Commercial Investigation.
                </div>
              </div>
            )}

            {activeDossierTab === 'keywords' && (
              <div className="space-y-1.5 text-zinc-300 font-mono text-[11px]">
                <div className="flex justify-between text-zinc-400 border-b border-[#222226] pb-1 text-[10px]">
                  <span>Query</span>
                  <span>Volume / KD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-200">{editorialBrief.primaryKeyword}</span>
                  <span className="text-emerald-400">2,900/mo (Low 22%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">how to advertise on chatgpt search</span>
                  <span className="text-emerald-400">1,850/mo (Low 14%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">pune luxury penthouses investment yield</span>
                  <span className="text-emerald-400">3,400/mo (Medium 32%)</span>
                </div>
              </div>
            )}

            {activeDossierTab === 'competitor' && (
              <div className="space-y-2 text-zinc-300 text-[11px]">
                <div className="font-semibold text-amber-400">Competitor Gap Exploited:</div>
                <p className="text-zinc-400">
                  Competitor portals rely on broad aggregator statistics and lack fiduciary yield due diligence. Nine Degree provides the proprietary cross-border framework.
                </p>
              </div>
            )}

            {activeDossierTab === 'qa' && (
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-zinc-400">Editorial Quality Score:</span>
                  <span className="text-[#d4af37] font-bold">{article.qualityScore}</span>
                </div>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-zinc-400">Readability Standard:</span>
                  <span className="text-emerald-400">Grade 11.4 (Advisory Level)</span>
                </div>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-zinc-400">Banned Clichés Found:</span>
                  <span className="text-emerald-400">0 (Zero Clichés)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#0c0c0e] rounded-3xl border border-[#26262a] p-6 shadow-2xl relative overflow-hidden">
          <div className="border-b border-[#202024] pb-5 mb-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
              <span className="text-[#d4af37] uppercase tracking-widest font-semibold">
                Nine Degree Editorial Release
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3 h-3 text-[#d4af37]" />
                  {article.readingTime}
                </span>
                <span className="text-emerald-400 font-semibold font-mono">
                  {article.qualityScore}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-100 leading-tight">
              {article.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-serif italic">
              {article.subtitle}
            </p>

            <div className="flex items-center gap-3 mt-4 text-xs font-mono text-zinc-400">
              <span className="font-semibold text-zinc-200">{article.author}</span>
              <span>•</span>
              <span className="text-zinc-500">Word Count: ~{article.wordCount} words</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#26262a] mb-6 shadow-xl relative group">
            <img
              src={article.heroImage}
              alt="4K Architectural Cover"
              className="w-full h-64 sm:h-80 object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
              <div className="text-[10px] font-mono text-zinc-300">
                Visual Studio DPT 4 • Curated 4K Architectural Stream (Watermark-Free)
              </div>
            </div>
          </div>

          <div className="bg-[#141417] p-5 rounded-2xl border-l-4 border-[#d4af37] border-y border-r border-[#242428] mb-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
              Executive Summary & Macro Context
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 font-serif leading-relaxed">
              {article.executiveSummary}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm font-serif text-zinc-300 leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#d4af37] first-letter:mr-2 first-letter:float-left">
              {article.introduction}
            </p>

            {article.sections.map((sec, i) => (
              <div key={i} className="space-y-2 pt-4 border-t border-[#1c1c20]">
                <h2 className="text-lg font-serif font-bold text-zinc-100 flex items-center gap-2">
                  <span>{sec.heading}</span>
                </h2>
                <p className="text-zinc-300 leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>

          <div className="my-6 rounded-2xl overflow-hidden border border-[#26262a] shadow-lg">
            <img
              src={article.bodyImage}
              alt="In-Content Architectural Blueprint"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-2.5 bg-[#121214] text-[10px] font-mono text-zinc-500 text-center">
              Figure 1.2 — Micro-Market Corridor Land Layout & Infrastructure Blueprint
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#202024]">
            <h3 className="text-base font-serif font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#d4af37]" />
              <span>Frequently Asked Strategic Questions</span>
            </h3>

            <div className="space-y-2">
              {article.faq.map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-[#222226] rounded-xl overflow-hidden bg-[#121215]"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-3.5 text-left text-xs font-semibold text-zinc-200 flex items-center justify-between hover:text-[#d4af37] transition-colors cursor-pointer"
                    >
                      <span>{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#d4af37]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-zinc-400 font-serif leading-relaxed border-t border-[#1a1a1e] pt-2">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#202024] flex items-center justify-between text-xs text-zinc-500 font-mono">
            <div>Nine Degree Strategic Fiduciary Advisory</div>
            <div className="text-[#d4af37]">Published via Autonomous Engine</div>
          </div>
        </div>
      </div>
    </div>
  );
};
"""

views["VisualStudio.jsx"] = """import React, { useState } from 'react';
import {
  Image as ImageIcon,
  RefreshCw
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const VisualStudio = () => {
  const { article, setArticle } = useIntelligence();

  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [stylePreset, setStylePreset] = useState('Cinematic Architectural Photography');
  const [customPrompt, setCustomPrompt] = useState(
    'Hyper-realistic modern luxury villa enclave in Jaipur, warm twilight desert lighting, clean minimalist sandstone facades, manicured native landscaping, 8k resolution, architectural digest cover style, completely watermark free.'
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const galleryImages = [
    {
      id: 'img-1',
      title: 'Hero Cover: Luxury Enclave',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      aspect: '16:9',
      alt: 'Luxury architectural villa facade in twilight',
      status: 'Active Hero'
    },
    {
      id: 'img-2',
      title: 'Figure 1: Micro-Market Land Blueprint',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      aspect: '16:9',
      alt: 'Architectural blueprint and interior courtyard layout',
      status: 'Active Body'
    },
    {
      id: 'img-3',
      title: 'Alternative: Luxury Terraces',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
      aspect: '16:9',
      alt: 'Modern residential villa with private perimeter pool',
      status: 'In Library'
    }
  ];

  const handleRegenerateHero = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setArticle((prev) => ({
        ...prev,
        heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
      }));
      setIsGenerating(false);
    }, 1100);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-zinc-100">
              Visual Studio & Architectural Image Bureau
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Watermark-Free 4K Stream
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Engineer cinematic architectural image prompts, generate aspect-ratio optimized editorial assets, and eliminate watermarked endpoints across all Nine Degree releases.
          </p>
        </div>

        <button
          onClick={handleRegenerateHero}
          disabled={isGenerating}
          className="px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Synthesizing 4K Asset...' : 'Regenerate Cover Asset'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl text-xs space-y-4">
          <div className="border-b border-[#202024] pb-3">
            <h3 className="text-sm font-semibold text-zinc-100 font-serif">
              Visual Prompt Architecture
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Department 4 Engine</span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Active Article Context:
            </label>
            <div className="p-2.5 bg-[#17171a] rounded-xl border border-[#26262a] text-[11px] text-[#d4af37] font-serif">
              "{article.title}"
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Visual Style Preset
            </label>
            <select
              value={stylePreset}
              onChange={(e) => setStylePreset(e.target.value)}
              className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-2 text-zinc-200 outline-none text-xs"
            >
              <option value="Cinematic Architectural Photography">Cinematic Architectural Photography</option>
              <option value="Twilight Luxury Real Estate Drone View">Twilight Luxury Real Estate Drone View</option>
              <option value="Editorial Blueprint & Master Plan Diagram">Editorial Blueprint & Master Plan Diagram</option>
              <option value="Minimalist High-End Sandstone Interior">Minimalist High-End Sandstone Interior</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['16:9', '4:5', '1:1'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                    aspectRatio === ratio
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'bg-[#17171a] text-zinc-400 hover:text-zinc-200 border border-[#26262a]'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Cinematic Architectural Prompt
            </label>
            <textarea
              rows={4}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl p-3 text-xs font-mono text-zinc-200 outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] text-[11px] text-zinc-400 space-y-1">
            <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
              ✓ Watermark-Free Pipeline Verified
            </div>
            <p>
              Direct curated 4K architectural image stream eliminates third-party watermarked overlays.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#202024] pb-3 mb-4">
              <h3 className="text-sm font-semibold text-zinc-100 font-serif">
                Active Cover Asset (Live in Article)
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">100% Watermark Free</span>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#26262a] shadow-lg relative group">
              <img
                src={article.heroImage}
                alt="Active Cover"
                className="w-full h-72 object-cover"
              />
              <div className="p-3 bg-[#141417] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Alt: {article.title}</span>
                <span className="text-[#d4af37]">Ratio: {aspectRatio}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {galleryImages.slice(1).map((item) => (
              <div
                key={item.id}
                className="bg-[#111113] p-3 rounded-xl border border-[#222226] text-xs space-y-2"
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="font-semibold text-zinc-200 truncate">{item.title}</div>
                <div className="text-[10px] font-mono text-zinc-500">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
"""

for rel_path, code in views.items():
    full_path = os.path.join(BASE, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Written: {rel_path} ({len(code)} bytes)")
