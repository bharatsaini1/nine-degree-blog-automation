import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Copy,
  Download,
  BookmarkPlus,
  Send,
  Edit3,
  CheckCircle2,
  Save,
  Eye
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const ContentStudio = () => {
  const {
    editorialBrief,
    setEditorialBrief,
    article,
    setArticle,
    generateArticle,
    isGenerating,
    aiModels,
    addToBacklog,
    setActiveTab
  } = useIntelligence();

  const [activeDossierTab, setActiveDossierTab] = useState('summary');
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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

  const buildMarkdown = () => {
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

    return md;
  };

  const handleCopyMarkdown = () => {
    const md = buildMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = buildMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(article.title || 'nine-degree-article').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    setToastMessage('Downloaded Markdown file!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveToBacklog = () => {
    addToBacklog({
      title: article.title,
      industry: editorialBrief.blogType || 'Real Estate',
      classification: editorialBrief.blogType,
      opportunityScore: article.opportunityScore || 96,
      status: 'in_production',
      geography: editorialBrief.geographicFocus
    });
    setToastMessage('Article saved to Opportunity Backlog (In Production)!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendToPublishingGate = () => {
    setActiveTab('publishing');
  };

  const isClaudeAvailable = aiModels.claude && aiModels.claude.status === 'connected';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-gradient-to-r from-emerald-500/20 via-[#16161a] to-[#16161a] border border-emerald-500/40 px-5 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-zinc-500">Editorial Studio</span>
        </div>
      )}

      {/* Top Banner and Actions */}
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

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-2 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 border cursor-pointer ${
              isEditing
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-[#1c1c20] text-zinc-300 border-[#2e2e34] hover:bg-[#25252a]'
            }`}
          >
            {isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Preview Mode' : 'Edit Text'}</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 bg-[#1c1c20] text-zinc-200 text-xs font-medium rounded-full hover:bg-[#25252a] hover:border-[#e43d25]/40 transition-all flex items-center gap-1.5 border border-[#2e2e34] cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied MD!' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="px-3.5 py-2 bg-[#1c1c20] text-zinc-200 text-xs font-medium rounded-full hover:bg-[#25252a] hover:border-[#e43d25]/40 transition-all flex items-center gap-1.5 border border-[#2e2e34] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export MD</span>
          </button>

          <button
            onClick={handleSaveToBacklog}
            className="px-3.5 py-2 bg-[#1c1c20] text-zinc-200 text-xs font-medium rounded-full hover:bg-[#25252a] hover:border-[#e43d25]/40 transition-all flex items-center gap-1.5 border border-[#2e2e34] cursor-pointer"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-[#ff6a52]" />
            <span>Save to Backlog</span>
          </button>

          <button
            onClick={handleSendToPublishingGate}
            className="px-4 py-2 bg-[#1c1c20] hover:bg-[#222228] text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30 hover:border-emerald-500 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publishing Gate</span>
          </button>

          <button
            onClick={generateArticle}
            disabled={isGenerating}
            className="px-5 py-2 bg-gradient-to-r from-[#e43d25] to-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/25 hover:brightness-105 transition-all flex items-center gap-2 shadow-md shadow-[#e43d25]/20 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Generate via n8n'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Editorial Brief Input Controls */}
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
                  Expert Perspective & Ground Observations
                </label>
                <span className="text-[10px] font-mono text-[#ff6a52]">Swapnil Soni Directive</span>
              </div>
              <textarea
                rows={3}
                value={editorialBrief.expertNotes}
                onChange={(e) => setEditorialBrief({ ...editorialBrief, expertNotes: e.target.value })}
                placeholder="Specific micro-market data points, client friction, or escrow audit details..."
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl p-3 text-zinc-200 outline-none focus:border-[#e43d25] text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Rendered Executive Publication */}
        <div className="lg:col-span-7 bg-[#111113] p-6 lg:p-8 rounded-2xl border border-[#222226] shadow-xl relative">
          {/* Header Info */}
          <div className="border-b border-[#202024] pb-6 mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-[#e43d25]/15 text-[#ff6a52] font-semibold border border-[#e43d25]/30">
                {editorialBrief.blogType}
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-500" />
                {article.readingTime}
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-emerald-400 font-semibold">{article.qualityScore}</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">~{article.wordCount} words</span>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={article.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value })}
                  className="w-full bg-[#17171a] border border-[#e43d25]/50 text-xl font-display font-bold text-zinc-100 p-2.5 rounded-xl outline-none"
                />
                <textarea
                  rows={2}
                  value={article.subtitle}
                  onChange={(e) => setArticle({ ...article, subtitle: e.target.value })}
                  className="w-full bg-[#17171a] border border-[#2a2a32] text-xs italic text-zinc-300 p-2.5 rounded-xl outline-none"
                />
              </div>
            ) : (
              <>
                <h1 className="text-xl lg:text-2xl font-display font-bold text-zinc-100 tracking-tight leading-snug">
                  {article.title}
                </h1>
                <p className="text-xs text-zinc-400 font-sans italic mt-1.5 leading-relaxed">
                  {article.subtitle}
                </p>
              </>
            )}

            <div className="mt-3 text-[11px] font-mono text-zinc-400">
              By <span className="text-zinc-200 font-medium">{article.author}</span>
            </div>
          </div>

          {/* Hero Cover Image Preview */}
          {article.heroImage && (
            <div className="mb-6 rounded-xl overflow-hidden border border-[#26262a] shadow-lg relative">
              <img
                src={article.heroImage}
                alt="Architectural Cover"
                className="w-full h-64 object-cover"
              />
              <div className="p-2.5 bg-[#141417] text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Figure: Verified 4K Editorial Asset</span>
                <span className="text-emerald-400">100% Watermark Free</span>
              </div>
            </div>
          )}

          {/* Executive Summary Dossier */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#17171b] to-[#121215] border border-[#2a2a30]">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#ff6a52] mb-1.5">
              Executive Summary & Macro Thesis:
            </h3>
            {isEditing ? (
              <textarea
                rows={3}
                value={article.executiveSummary}
                onChange={(e) => setArticle({ ...article, executiveSummary: e.target.value })}
                className="w-full bg-[#121215] border border-[#2a2a32] text-xs text-zinc-200 p-2.5 rounded-xl outline-none"
              />
            ) : (
              <p className="text-xs text-zinc-200 font-serif leading-relaxed italic">
                "{article.executiveSummary}"
              </p>
            )}
          </div>

          {/* Sections List */}
          <div className="space-y-6 text-xs text-zinc-300 font-sans leading-relaxed">
            {article.sections && article.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-2 border-b border-[#1c1c20] pb-5">
                <h2 className="text-sm font-display font-bold text-zinc-100 flex items-center gap-2">
                  <span className="text-[#e43d25] font-mono text-xs">§{sIdx + 1}.</span>
                  <span>{sec.heading}</span>
                </h2>

                {sec.subheading && (
                  <p className="text-[11px] text-zinc-400 italic">{sec.subheading}</p>
                )}

                {sec.paragraphs && sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-zinc-300 leading-relaxed font-sans">
                    {para}
                  </p>
                ))}

                {sec.metric && (
                  <div className="p-3 bg-[#18181d] rounded-xl border border-[#2b2b34] flex items-center justify-between text-xs mt-2">
                    <span className="text-zinc-400">{sec.metric.label}:</span>
                    <span className="font-bold text-[#ff6a52] font-mono">{sec.metric.value}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ Accordion */}
          {article.faq && article.faq.length > 0 && (
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
          )}

          {/* Strategic Takeaway Verdict */}
          {article.strategicTakeaway && (
            <div className="mt-6 p-4 rounded-xl bg-[#1c1313] border border-[#e43d25]/30 text-xs">
              <span className="font-mono uppercase text-[10px] tracking-wider text-[#ff6a52] font-semibold block mb-1">
                Strategic Fiduciary Verdict:
              </span>
              <p className="text-zinc-200 leading-relaxed font-sans">
                {article.strategicTakeaway}
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#202024] flex items-center justify-between text-xs text-zinc-500 font-mono">
            <div>Nine Degree Strategic Fiduciary Advisory</div>
            <div className="text-[#e43d25]">Published via Autonomous Engine</div>
          </div>
        </div>
      </div>
    </div>
  );
};
