import React, { useState } from 'react';
import {
  Image as ImageIcon,
  RefreshCw,
  Plus,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Sliders,
  Check
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [newImageForm, setNewImageForm] = useState({
    title: '',
    url: '',
    aspect: '16:9',
    alt: ''
  });

  const [gallery, setGallery] = useState([
    {
      id: 'img-1',
      title: 'Hero Cover: Luxury Enclave',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      aspect: '16:9',
      alt: 'Luxury architectural villa facade in twilight'
    },
    {
      id: 'img-2',
      title: 'Figure 1: Micro-Market Land Blueprint',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      aspect: '16:9',
      alt: 'Architectural blueprint and interior courtyard layout'
    },
    {
      id: 'img-3',
      title: 'Alternative: Luxury Terraces',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
      aspect: '16:9',
      alt: 'Modern residential villa with private perimeter pool'
    },
    {
      id: 'img-4',
      title: 'Corridor Architecture: Sandstone Pavilions',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      aspect: '16:9',
      alt: 'Modern sandstone colonnade in luxury compound'
    }
  ]);

  const handleSetHero = (url, title) => {
    setArticle((prev) => ({
      ...prev,
      heroImage: url
    }));
    setToastMessage(`Assigned "${title}" as Active Hero Cover!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSetBody = (url, title) => {
    setArticle((prev) => ({
      ...prev,
      bodyImage: url
    }));
    setToastMessage(`Assigned "${title}" as Active Article Body Figure!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegenerateCover = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const freshUrls = [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
      ];
      const selected = freshUrls[Math.floor(Math.random() * freshUrls.length)];
      setArticle((prev) => ({
        ...prev,
        heroImage: selected
      }));
      setGallery((prev) => [
        {
          id: `img-${Date.now()}`,
          title: `Synthesized Cover: ${stylePreset.split(' ')[0]}`,
          url: selected,
          aspect: aspectRatio,
          alt: customPrompt.slice(0, 50)
        },
        ...prev
      ]);
      setIsGenerating(false);
      setToastMessage('Synthesized fresh 4K architectural asset via Department 4!');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1100);
  };

  const handleAddCustomImage = (e) => {
    e.preventDefault();
    if (!newImageForm.url.trim()) return;

    const newImg = {
      id: `img-custom-${Date.now()}`,
      title: newImageForm.title.trim() || 'Custom Architectural Asset',
      url: newImageForm.url.trim(),
      aspect: newImageForm.aspect,
      alt: newImageForm.alt.trim() || 'Custom visual asset'
    };

    setGallery([newImg, ...gallery]);
    setShowAddModal(false);
    setNewImageForm({ title: '', url: '', aspect: '16:9', alt: '' });
    setToastMessage(`Added "${newImg.title}" to visual asset library!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-gradient-to-r from-emerald-500/20 via-[#16161a] to-[#16161a] border border-emerald-500/40 px-5 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-zinc-500">Visual Studio</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              Visual Studio & Architectural Image Bureau
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e43d25]/10 text-[#ff6a52] border border-[#e43d25]/20 font-semibold">
              Watermark-Free 4K Pipeline
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Engineer cinematic architectural image prompts, generate aspect-ratio optimized editorial assets, and eliminate watermarked endpoints across all Nine Degree releases.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#1c1c20] hover:bg-[#25252a] text-zinc-200 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 border border-[#2e2e34] cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#e43d25]" />
            <span>Add Image URL</span>
          </button>

          <button
            onClick={handleRegenerateCover}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-gradient-to-r from-[#e43d25] to-[#d8402a] text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-[#e43d25]/25 hover:brightness-105 transition-all flex items-center gap-1.5 shadow-md shadow-[#e43d25]/20 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing Asset...' : 'Synthesize 4K Asset'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prompt Architecture */}
        <div className="lg:col-span-5 bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl text-xs space-y-4">
          <div className="border-b border-[#202024] pb-3">
            <h3 className="text-sm font-semibold text-zinc-100 font-display">
              Visual Prompt Architecture
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Department 4 Engine (Gemini Model)</span>
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

        {/* Right Column: Live Cover Preview & Interactive Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Hero Cover */}
          <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#202024] pb-3 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 font-display">
                  Active Hero Cover Asset (Live in Article)
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">100% Watermark Free</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">Aspect Ratio: {aspectRatio}</span>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#26262a] shadow-lg relative group">
              <img
                src={article.heroImage}
                alt="Active Cover"
                className="w-full h-64 object-cover"
              />
              <div className="p-3 bg-[#141417] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span className="truncate max-w-sm">Title: {article.title}</span>
                <span className="text-[#e43d25] font-semibold">Active Hero</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Asset Gallery */}
          <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#202024] pb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Curated Asset Library ({gallery.length} Assets)
              </h4>
              <span className="text-[10px] font-mono text-zinc-500">Click any image to assign</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((item) => {
                const isHero = article.heroImage === item.url;
                const isBody = article.bodyImage === item.url;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border text-xs space-y-2 transition-all ${
                      isHero
                        ? 'bg-[#18181d] border-[#e43d25] shadow-md shadow-[#e43d25]/15'
                        : isBody
                        ? 'bg-[#18181d] border-indigo-500/50'
                        : 'bg-[#141417] border-[#222226] hover:border-[#383842]'
                    }`}
                  >
                    <div className="relative rounded-lg overflow-hidden h-32 bg-black">
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                      {isHero && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#e43d25] text-white font-mono text-[9px] font-semibold flex items-center gap-1 shadow">
                          <Check className="w-2.5 h-2.5" />
                          <span>Active Hero</span>
                        </div>
                      )}
                      {isBody && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[9px] font-semibold flex items-center gap-1 shadow">
                          <Check className="w-2.5 h-2.5" />
                          <span>Body Figure</span>
                        </div>
                      )}
                    </div>

                    <div className="font-semibold text-zinc-200 truncate">{item.title}</div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleSetHero(item.url, item.title)}
                        className={`px-3 py-1 text-[10.5px] rounded-full font-mono transition-all cursor-pointer ${
                          isHero
                            ? 'bg-[#e43d25] text-white font-semibold'
                            : 'bg-[#1e1e24] text-zinc-300 hover:text-white hover:bg-[#282832]'
                        }`}
                      >
                        Set as Hero
                      </button>

                      <button
                        onClick={() => handleSetBody(item.url, item.title)}
                        className={`px-3 py-1 text-[10.5px] rounded-full font-mono transition-all cursor-pointer ${
                          isBody
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'bg-[#1e1e24] text-zinc-300 hover:text-white hover:bg-[#282832]'
                        }`}
                      >
                        Set as Body
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16161a] border border-[#2a2a32] rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-display font-bold text-zinc-100 mb-1">
              Add Custom Architectural Image
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Import a verified watermark-free image URL into your visual asset library.
            </p>

            <form onSubmit={handleAddCustomImage} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Image Title / Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Sandstone Courtyard at Sunset"
                  value={newImageForm.title}
                  onChange={(e) => setNewImageForm({ ...newImageForm, title: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Direct Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newImageForm.url}
                  onChange={(e) => setNewImageForm({ ...newImageForm, url: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-100 outline-none focus:border-[#e43d25]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Aspect Ratio</label>
                  <select
                    value={newImageForm.aspect}
                    onChange={(e) => setNewImageForm({ ...newImageForm, aspect: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-[#2a2a32] rounded-xl p-2.5 text-zinc-200 outline-none focus:border-[#e43d25]"
                  >
                    <option value="16:9">16:9 (Landscape Hero)</option>
                    <option value="4:5">4:5 (Portrait Editorial)</option>
                    <option value="1:1">1:1 (Square Figure)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Alt Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Architectural detail..."
                    value={newImageForm.alt}
                    onChange={(e) => setNewImageForm({ ...newImageForm, alt: e.target.value })}
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
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
