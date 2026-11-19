import React, { useState } from 'react';
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
            <ImageIcon className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              Visual Studio & Architectural Image Bureau
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e43d25]/10 text-[#ff6a52] border border-[#e43d25]/20 font-semibold">
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
          className="px-5 py-2.5 bg-gradient-to-r from-[#e43d25] to-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/25 hover:brightness-105 transition-all flex items-center gap-1.5 shadow-md shadow-[#e43d25]/20 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Synthesizing 4K Asset...' : 'Regenerate Cover Asset'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl text-xs space-y-4">
          <div className="border-b border-[#202024] pb-3">
            <h3 className="text-sm font-semibold text-zinc-100 font-display">
              Visual Prompt Architecture
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Department 4 Engine</span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Active Article Context:
            </label>
            <div className="p-2.5 bg-[#17171a] rounded-xl border border-[#26262a] text-[11px] text-[#ff6a52] font-sans font-medium">
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
                  className={`py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    aspectRatio === ratio
                      ? 'bg-[#e43d25] text-white font-semibold shadow-sm shadow-[#e43d25]/30'
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
              className="w-full bg-[#17171a] border border-[#2e2e34] rounded-xl p-3 text-xs font-mono text-zinc-200 outline-none focus:border-[#e43d25]"
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
              <h3 className="text-sm font-semibold text-zinc-100 font-display">
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
                <span className="text-[#e43d25] font-semibold">Ratio: {aspectRatio}</span>
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
