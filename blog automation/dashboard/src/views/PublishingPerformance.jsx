import React, { useState, useMemo } from 'react';
import {
  Send,
  Globe,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Eye,
  Trash2,
  ExternalLink,
  Award,
  Clock,
  Sparkles,
  X
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const PublishingPerformance = () => {
  const { article, publishedArticles, publishArticle, unpublishArticle } = useIntelligence();

  const [approved, setApproved] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const stats = useMemo(() => {
    let totalWords = 0;
    let totalViews = 0;
    let totalReads = 0;
    let totalCitations = 0;

    publishedArticles.forEach((art) => {
      totalWords += art.wordCount || 2400;
      totalViews += art.views || 0;
      totalReads += art.reads || 0;
      totalCitations += art.citations || 0;
    });

    return {
      totalCount: publishedArticles.length,
      totalWords: totalWords.toLocaleString(),
      totalViews: totalViews.toLocaleString(),
      totalReads: totalReads.toLocaleString(),
      totalCitations: totalCitations.toLocaleString(),
      avgQuality: '95/100'
    };
  }, [publishedArticles]);

  const handleAuthorizeAndPublish = () => {
    if (!approved) return;
    setPublishing(true);

    setTimeout(() => {
      const published = publishArticle(article);
      setPublishing(false);
      setApproved(false);
      setToastMessage(`Successfully published "${published.title.slice(0, 40)}..." live to Nine Degree CMS!`);
      setTimeout(() => setToastMessage(null), 3500);
    }, 1200);
  };

  const handleUnpublish = (id, title) => {
    unpublishArticle(id);
    setToastMessage(`Unpublished "${title.slice(0, 35)}..." from live CMS.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-gradient-to-r from-emerald-500/20 via-[#16161a] to-[#16161a] border border-emerald-500/40 px-5 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-zinc-500">Live CMS</span>
        </div>
      )}

      {/* Header and Guidelines */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Send className="w-4 h-4 text-[#e43d25]" />
          <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
            Publishing Gate & Content Performance
          </h2>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e43d25]/10 text-[#ff6a52] border border-[#e43d25]/20 font-semibold">
            Principle 3: Human Authorization Required
          </span>
        </div>
        <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
          Articles are never published autonomously. Review the final editorial package, verify human sign-off from VP/CMO, and dispatch to the live Nine Degree CMS.
        </p>
      </div>

      {/* Dynamic Performance KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#16161a] p-4 rounded-2xl border border-[#26262b]">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Live Published Articles</div>
          <div className="text-2xl font-display font-bold text-zinc-100 mt-1">{stats.totalCount}</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">● Dispatched to CMS</div>
        </div>

        <div className="bg-[#16161a] p-4 rounded-2xl border border-[#26262b]">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Executive Impressions / Views</div>
          <div className="text-2xl font-display font-bold text-[#ff6a52] mt-1">{stats.totalViews}</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{stats.totalReads} Verified Reads</div>
        </div>

        <div className="bg-[#16161a] p-4 rounded-2xl border border-[#26262b]">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Total Words Produced</div>
          <div className="text-2xl font-display font-bold text-zinc-100 mt-1">{stats.totalWords}</div>
          <div className="text-[10px] text-indigo-400 font-mono mt-0.5">Research-grade depth</div>
        </div>

        <div className="bg-[#16161a] p-4 rounded-2xl border border-[#26262b]">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">LLM Citations (GEO)</div>
          <div className="text-2xl font-display font-bold text-emerald-400 mt-1">{stats.totalCitations}</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">ChatGPT Search & Perplexity</div>
        </div>
      </div>

      {/* Active Article Authorization Box */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#202024] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#e43d25] font-semibold">
                Pending Executive Authorization
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-[10px] font-mono text-zinc-400">~{article.wordCount} words</span>
              <span className="text-zinc-500">•</span>
              <span className="text-[10px] font-mono text-zinc-400">{article.readingTime}</span>
            </div>
            <h3 className="text-base font-display font-bold text-zinc-100 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-zinc-400 font-sans italic mt-0.5 leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-lg font-display font-bold text-emerald-400">
              {article.qualityScore}
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              QA Audit Gate Cleared
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#161619] rounded-xl border border-[#26262a] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="vpSignOff"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
              className="w-4 h-4 accent-[#e43d25] rounded cursor-pointer mt-0.5"
            />
            <label htmlFor="vpSignOff" className="text-xs text-zinc-200 cursor-pointer leading-relaxed">
              <span className="font-semibold text-zinc-100">Executive Authorization: </span>
              I confirm that this piece represents Nine Degree fiduciary advisory standards, regulatory citations are verified, and it is authorized for immediate live dispatch.
            </label>
          </div>

          <button
            onClick={handleAuthorizeAndPublish}
            disabled={!approved || publishing}
            className={`px-6 py-2.5 text-xs font-semibold rounded-full transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              approved
                ? 'bg-gradient-to-r from-[#e43d25] to-[#d8402a] text-white hover:shadow-lg hover:shadow-[#e43d25]/25 shadow-md shadow-[#e43d25]/20 hover:brightness-105'
                : 'bg-[#202024] text-zinc-500 cursor-not-allowed'
            }`}
          >
            <Globe className={`w-3.5 h-3.5 ${publishing ? 'animate-spin' : ''}`} />
            <span>{publishing ? 'Dispatching to NineDegree.in...' : 'Authorize & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Published Articles Archive Table */}
      <div className="bg-[#16161a] rounded-3xl border border-[#26262b] overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#26262b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#e43d25]" />
            <h3 className="text-sm font-bold text-zinc-100 font-display">
              Published Articles Archive (Persistent CMS Registry)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 font-medium">
            {publishedArticles.length} Live Publications
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1b1b20] text-zinc-400 font-mono text-[10px] uppercase tracking-wider border-b border-[#26262b]">
              <tr>
                <th className="py-3 px-4">Publication Title & Angle</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4">Word Count</th>
                <th className="py-3 px-4">Quality Score</th>
                <th className="py-3 px-4">Views / Reads</th>
                <th className="py-3 px-4">LLM Citations</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222228] text-zinc-300">
              {publishedArticles.map((post) => (
                <tr key={post.id} className="hover:bg-[#1b1b22] transition-colors group">
                  <td className="py-3.5 px-4 font-medium text-zinc-100 max-w-sm">
                    <div className="font-semibold text-zinc-100 group-hover:text-[#ff6a52] transition-colors line-clamp-1">
                      {post.title}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono truncate mt-0.5">
                      {post.subtitle}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-zinc-400 whitespace-nowrap">
                    {post.author ? post.author.split(',')[0] : 'Swapnil Soni'}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-zinc-400 whitespace-nowrap">
                    {post.publishedDate}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-zinc-300 whitespace-nowrap">
                    ~{post.wordCount} words
                  </td>

                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold whitespace-nowrap">
                    {post.qualityScore}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-zinc-300 whitespace-nowrap">
                    {post.views ? post.views.toLocaleString() : '1,420'} / {post.reads ? post.reads.toLocaleString() : '890'}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-indigo-400 font-semibold whitespace-nowrap">
                    {post.citations || 12} Citations
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="px-3 py-1 bg-[#222228] hover:bg-[#2c2c34] text-zinc-200 text-[11px] rounded-full transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Read Post</span>
                      </button>

                      <button
                        onClick={() => handleUnpublish(post.id, post.title)}
                        title="Unpublish post"
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
      </div>

      {/* Read Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16161a] border border-[#2a2a32] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 lg:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full bg-[#1b1b20] hover:bg-[#25252a] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-zinc-400">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                LIVE ON CMS
              </span>
              <span>•</span>
              <span>{selectedPost.readingTime}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{selectedPost.qualityScore}</span>
            </div>

            <h2 className="text-xl font-display font-bold text-zinc-100 mb-2 leading-snug">
              {selectedPost.title}
            </h2>

            <p className="text-xs text-zinc-400 italic mb-4 leading-relaxed">
              {selectedPost.subtitle}
            </p>

            {selectedPost.heroImage && (
              <img
                src={selectedPost.heroImage}
                alt={selectedPost.title}
                className="w-full h-52 object-cover rounded-xl mb-4 border border-[#26262a]"
              />
            )}

            <div className="p-3 bg-[#131317] rounded-xl border border-[#24242c] text-xs font-mono text-zinc-300 mb-4 flex items-center justify-between">
              <span>Author: {selectedPost.author}</span>
              <span className="text-zinc-500">Date: {selectedPost.publishedDate}</span>
            </div>

            <div className="text-xs text-zinc-300 font-serif leading-relaxed space-y-3">
              <p>
                {selectedPost.articleData?.executiveSummary ||
                  'Ultra-luxury property buyers and capital allocators discount standard portal listings by 40%. Discretion, private previews, and verified fiduciary due diligence drive high-ticket transactions.'}
              </p>
              <p>
                {selectedPost.articleData?.introduction ||
                  'The traditional property portal playbook was engineered for volume retail transactions. High-net-worth individuals operate on entirely different heuristics: capital preservation, structural tax transparency, and developer solvency.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#26262b] flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">Live URL: {selectedPost.url}</span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-1.5 bg-[#e43d25] text-white text-xs font-semibold rounded-full cursor-pointer shadow-sm"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
