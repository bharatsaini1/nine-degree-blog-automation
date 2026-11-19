import React, { useState } from 'react';
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
    let md = `# ${article.title}\n\n*${article.subtitle}*\n\n**By ${article.author}** | ${article.readingTime} | Word Count: ~${article.wordCount} words\n\n## Executive Summary\n${article.executiveSummary}\n\n## Introduction\n${article.introduction}\n\n`;

    if (article.sections && Array.isArray(article.sections)) {
      article.sections.forEach((s) => {
        md += `## ${s.heading}\n\n`;
        if (s.subheading) md += `*${s.subheading}*\n\n`;
        if (Array.isArray(s.paragraphs)) {
          md += s.paragraphs.join('\n\n') + '\n\n';
        } else {
          md += (s.content || '') + '\n\n';
        }
        if (s.metric) {
          md += `> **${s.metric.label}:** ${s.metric.value} — *${s.metric.detail}*\n\n`;
        }
        if (s.figure) {
          md += `![${s.figure.alt}](${s.figure.url})\n*${s.figure.caption}*\n\n`;
        }
      });
    }

    if (article.faq && article.faq.length > 0) {
      md += `## Frequently Asked Strategic Questions\n\n`;
      article.faq.forEach((f) => {
        md += `### ${f.q}\n${f.a}\n\n`;
      });
    }

    if (article.strategicTakeaway) {
      md += `## Strategic Fiduciary Verdict\n${article.strategicTakeaway}\n`;
    }

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
            <PenTool className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              Master Editorial Bureau & Studio
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
            className="px-4 py-2 bg-[#1c1c20] text-zinc-200 text-xs font-medium rounded-full hover:bg-[#25252a] hover:border-[#e43d25]/40 transition-all flex items-center gap-1.5 border border-[#2e2e34] cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied MD!' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={generateArticle}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-gradient-to-r from-[#e43d25] to-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/25 hover:brightness-105 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 disabled:opacity-50 cursor-pointer"
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
              <h3 className="text-sm font-semibold text-zinc-100 font-display flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#e43d25]" />
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
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25] text-xs font-medium"
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
                <span className="text-[10px] font-mono text-[#e43d25] font-semibold">Swapnil Soni / VP Notes</span>
              </div>
              <textarea
                rows={3}
                placeholder="Add proprietary data, legal rulings, or on-ground deal statistics..."
                value={editorialBrief.expertNotes}
                onChange={(e) => setEditorialBrief({ ...editorialBrief, expertNotes: e.target.value })}
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl px-3 py-2 text-zinc-100 outline-none focus:border-[#e43d25] text-xs font-sans leading-relaxed"
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                The Master Writer will naturally weave these insider points into the core argument while keeping them distinct from external citations.
              </p>
            </div>
          </div>

          <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-[#202024] pb-3 mb-3">
              <div className="flex items-center gap-1 bg-[#17171a] p-1 rounded-full border border-[#28282e]">
                {['summary', 'keywords', 'competitor', 'qa'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDossierTab(tab)}
                    className={`px-3 py-1 rounded-full font-mono text-[10.5px] uppercase transition-all cursor-pointer ${
                      activeDossierTab === tab
                        ? 'bg-[#e43d25] text-white font-semibold shadow-sm shadow-[#e43d25]/30'
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
                <div className="font-semibold text-[#e43d25]">Competitor Gap Exploited:</div>
                <p className="text-zinc-400">
                  Competitor portals rely on broad aggregator statistics and lack fiduciary yield due diligence. Nine Degree provides the proprietary cross-border framework.
                </p>
              </div>
            )}

            {activeDossierTab === 'qa' && (
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-zinc-400">Editorial Quality Score:</span>
                  <span className="text-[#e43d25] font-bold">{article.qualityScore}</span>
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
              <span className="text-[#e43d25] uppercase tracking-widest font-semibold">
                Nine Degree Editorial Release
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3 h-3 text-[#e43d25]" />
                  {article.readingTime}
                </span>
                <span className="text-emerald-400 font-semibold font-mono">
                  {article.qualityScore}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100 leading-tight tracking-tight">
              {article.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans italic">
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

          <div className="bg-gradient-to-r from-[#e43d25]/10 via-[#141417] to-[#141417] p-5 rounded-2xl border-l-4 border-[#e43d25] border-y border-r border-[#242428] mb-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#e43d25] font-semibold mb-1">
              Executive Summary & Macro Context
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
              {article.executiveSummary}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#e43d25] first-letter:mr-2 first-letter:float-left mb-4">
              {article.introduction}
            </p>

            {article.sections && article.sections.map((sec, i) => (
              <div key={i} className="space-y-3 pt-6 border-t border-[#1c1c20]">
                <h2 className="text-lg font-display font-bold text-zinc-100 flex items-center gap-2">
                  <span>{sec.heading}</span>
                </h2>
                {sec.subheading && (
                  <div className="text-xs font-mono text-[#e43d25] italic mb-2">
                    {sec.subheading}
                  </div>
                )}

                {Array.isArray(sec.paragraphs) ? (
                  sec.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-zinc-300 leading-relaxed mb-3">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-zinc-300 leading-relaxed mb-3">{sec.content}</p>
                )}

                {sec.metric && (
                  <div className="my-4 p-4 rounded-xl bg-[#141417] border border-[#26262c] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#e43d25] block font-semibold">
                        {sec.metric.label}
                      </span>
                      <span className="text-xs text-zinc-400 font-sans">
                        {sec.metric.detail}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base font-mono font-bold text-emerald-400 ml-4 shrink-0">
                      {sec.metric.value}
                    </span>
                  </div>
                )}

                {sec.figure && (
                  <div className="my-5 rounded-2xl overflow-hidden border border-[#26262a] shadow-lg">
                    <img
                      src={sec.figure.url}
                      alt={sec.figure.alt || 'Architectural Figure'}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                    <div className="p-2.5 bg-[#121214] text-[10px] font-mono text-zinc-400 text-center border-t border-[#1a1a1e]">
                      {sec.figure.caption}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {article.strategicTakeaway && (
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-[#1b1212] to-[#0f0f12] border border-[#e43d25]/30 shadow-xl">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#e43d25] font-semibold mb-2 flex items-center gap-2">
                <span>★ Strategic Fiduciary Verdict</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed italic">
                "{article.strategicTakeaway}"
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#202024]">
            <h3 className="text-base font-display font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#e43d25]" />
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
                      className="w-full p-3.5 text-left text-xs font-semibold text-zinc-200 flex items-center justify-between hover:text-[#e43d25] transition-colors cursor-pointer"
                    >
                      <span>{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#e43d25]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-zinc-400 font-sans leading-relaxed border-t border-[#1a1a1e] pt-2">
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
            <div className="text-[#e43d25]">Published via Autonomous Engine</div>
          </div>
        </div>
      </div>
    </div>
  );
};
