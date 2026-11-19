import React, { useState } from 'react';
import { Send, Globe } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const PublishingPerformance = () => {
  const { article } = useIntelligence();
  const [approved, setApproved] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    if (!approved) return;
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
    }, 1400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
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
        <p className="text-xs text-zinc-400 max-w-2xl">
          Articles are never published automatically. Review the final editorial package, verify human sign-off from VP/CMO, and dispatch to the live Nine Degree CMS.
        </p>
      </div>

      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#202024] pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#e43d25] font-semibold">
              Ready for Human Sign-off
            </span>
            <h3 className="text-base font-display font-bold text-zinc-100 mt-0.5">
              {article.title}
            </h3>
            <p className="text-xs text-zinc-400 font-sans italic mt-0.5">{article.subtitle}</p>
          </div>

          <div className="text-right">
            <div className="text-lg font-display font-bold text-emerald-400">
              {article.qualityScore}
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              Quality Gate Cleared
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#161619] rounded-xl border border-[#26262a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="vpSignOff"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
              className="w-4 h-4 accent-[#e43d25] rounded cursor-pointer"
            />
            <label htmlFor="vpSignOff" className="text-xs text-zinc-200 cursor-pointer">
              <span className="font-semibold text-zinc-100">Executive Authorization: </span>
              I confirm that this piece represents Nine Degree advisory fiduciary standards, facts have been reviewed, and it is authorized for publication.
            </label>
          </div>

          <button
            onClick={handlePublish}
            disabled={!approved || publishing || published}
            className={`px-5 py-2.5 text-xs font-semibold rounded-full transition-all flex items-center gap-2 cursor-pointer ${
              published
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : approved
                ? 'bg-gradient-to-r from-[#e43d25] to-[#d8402a] text-white hover:shadow-lg hover:shadow-[#e43d25]/25 shadow-md shadow-[#e43d25]/20 hover:brightness-105'
                : 'bg-[#202024] text-zinc-500 cursor-not-allowed'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>
              {published
                ? 'Live on NineDegree.in!'
                : publishing
                ? 'Dispatching to CMS...'
                : 'Authorize & Publish Live'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
