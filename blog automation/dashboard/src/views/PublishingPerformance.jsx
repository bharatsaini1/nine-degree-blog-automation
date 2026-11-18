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
          <Send className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-lg font-serif font-bold text-zinc-100">
            Publishing Gate & Content Performance
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
              Ready for Human Sign-off
            </span>
            <h3 className="text-base font-serif font-bold text-zinc-100 mt-0.5">
              {article.title}
            </h3>
            <p className="text-xs text-zinc-400 font-serif italic mt-0.5">{article.subtitle}</p>
          </div>

          <div className="text-right">
            <div className="text-lg font-serif font-bold text-emerald-400">
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
              className="w-4 h-4 accent-[#d4af37] rounded cursor-pointer"
            />
            <label htmlFor="vpSignOff" className="text-xs text-zinc-200 cursor-pointer">
              <span className="font-semibold text-zinc-100">Executive Authorization: </span>
              I confirm that this piece represents Nine Degree advisory fiduciary standards, facts have been reviewed, and it is authorized for publication.
            </label>
          </div>

          <button
            onClick={handlePublish}
            disabled={!approved || publishing || published}
            className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              published
                ? 'bg-emerald-600 text-white'
                : approved
                ? 'bg-[#d4af37] text-black hover:brightness-110 shadow-md shadow-[#d4af37]/15'
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
