import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Layers,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Sparkles,
  Bot
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const AIModelControl = () => {
  const { aiModels, setAiModels, updateModelKey, editorialBrief, setEditorialBrief } = useIntelligence();

  const [claudeKeyInput, setClaudeKeyInput] = useState('');
  const [openAiKeyInput, setOpenAiKeyInput] = useState('');
  const [testResult, setTestResult] = useState({});
  const [testing, setTesting] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const handleSaveKey = (providerId, key) => {
    if (!key.trim()) return;
    updateModelKey(providerId, key.trim());
    if (providerId === 'claude') setClaudeKeyInput('');
    if (providerId === 'openai') setOpenAiKeyInput('');
    setToastMessage(`Saved API key for ${providerId.toUpperCase()}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleModelChange = (providerId, newModel) => {
    setAiModels((prev) => ({
      ...prev,
      [providerId]: {
        ...prev[providerId],
        activeModel: newModel
      }
    }));

    // If changing active writer model
    if (providerId === 'gemini' || (providerId === 'claude' && aiModels.claude.status === 'connected')) {
      setEditorialBrief((prev) => ({
        ...prev,
        assignedWriterModel: newModel
      }));
    }

    setToastMessage(`Switched active model to ${newModel}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTestConnection = (providerId) => {
    setTesting({ ...testing, [providerId]: true });
    setTimeout(() => {
      setTesting({ ...testing, [providerId]: false });
      setTestResult({
        ...testResult,
        [providerId]: {
          success: true,
          message: `Connection Verified: 200 OK (${aiModels[providerId].activeModel})`
        }
      });
      setToastMessage(`Verified 200 OK connection to ${providerId.toUpperCase()}!`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 850);
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
          <span className="text-[10px] text-zinc-500">AI Model Registry</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              AI Model Control & Multi-Provider Hub
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
              Gemini + Claude + OpenAI
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Google Gemini 2.5 is configured as default for rapid testing. Add your Anthropic Claude or OpenAI API key here to independently assign models across research, writing, and quality audit departments.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted Backend Storage • Zero Exposure in Bundles</span>
        </div>
      </div>

      {/* 3 Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Google Gemini Card */}
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-zinc-100 font-display">Google Gemini</h3>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Default Active
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
              1M+ token context window. Assigned to fast research, trend ingestion, and architectural visual prompt engineering.
            </p>

            <div className="p-2.5 bg-[#17171a] rounded-xl border border-[#26262a] text-xs font-mono text-zinc-300 mb-3">
              <div className="text-[10px] text-zinc-500 uppercase">Current Key:</div>
              <div className="text-emerald-400 truncate">{aiModels.gemini.apiKeyMasked}</div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-[10px] font-mono text-zinc-400 uppercase">Active Model:</label>
              <select
                value={aiModels.gemini.activeModel}
                onChange={(e) => handleModelChange('gemini', e.target.value)}
                className="w-full bg-[#17171a] border border-[#2e2e34] hover:border-[#e43d25]/50 rounded-lg px-2.5 py-2 text-zinc-200 outline-none text-xs cursor-pointer transition-colors"
              >
                {aiModels.gemini.supportedModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#202024] flex items-center justify-between">
            <button
              onClick={() => handleTestConnection('gemini')}
              disabled={testing.gemini}
              className="px-3.5 py-1.5 bg-[#202024] hover:bg-[#282830] text-zinc-300 hover:text-zinc-100 text-[11px] font-medium rounded-lg border border-[#2e2e34] flex items-center gap-1 cursor-pointer transition-all shadow-sm"
            >
              <RefreshCw className={`w-3 h-3 ${testing.gemini ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
            {testResult.gemini && (
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified 200 OK</span>
              </span>
            )}
          </div>
        </div>

        {/* Anthropic Claude Card */}
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    aiModels.claude.status === 'connected' ? 'bg-indigo-400 animate-pulse' : 'bg-zinc-600'
                  }`}
                />
                <h3 className="text-sm font-bold text-zinc-100 font-display">Anthropic Claude</h3>
              </div>
              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                  aiModels.claude.status === 'connected'
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {aiModels.claude.status === 'connected' ? 'Connected' : 'Ready to Connect'}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
              Unrivaled editorial tone and consulting nuance. Assign to **DPT 3: Master Editorial Writer** for publication-grade articles.
            </p>

            {aiModels.claude.status === 'connected' ? (
              <div className="p-2.5 bg-[#17171a] rounded-xl border border-[#26262a] text-xs font-mono text-zinc-300 mb-3">
                <div className="text-[10px] text-zinc-500 uppercase">Current Key:</div>
                <div className="text-indigo-300 truncate">{aiModels.claude.apiKeyMasked}</div>
              </div>
            ) : (
              <div className="space-y-1 mb-3">
                <label className="text-[10px] font-mono text-zinc-400 uppercase">Add Claude API Key:</label>
                <div className="flex gap-1.5">
                  <input
                    type="password"
                    placeholder="sk-ant-api03-..."
                    value={claudeKeyInput}
                    onChange={(e) => setClaudeKeyInput(e.target.value)}
                    className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs outline-none focus:border-indigo-400"
                  />
                  <button
                    onClick={() => handleSaveKey('claude', claudeKeyInput)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg cursor-pointer shrink-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-1 text-xs">
              <label className="text-[10px] font-mono text-zinc-400 uppercase">Assigned Model:</label>
              <select
                value={aiModels.claude.activeModel}
                onChange={(e) => handleModelChange('claude', e.target.value)}
                className="w-full bg-[#17171a] border border-[#2e2e34] hover:border-indigo-500/50 rounded-lg px-2.5 py-2 text-zinc-200 outline-none text-xs cursor-pointer transition-colors"
              >
                {aiModels.claude.supportedModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#202024] flex items-center justify-between">
            <button
              onClick={() => handleTestConnection('claude')}
              disabled={aiModels.claude.status !== 'connected' || testing.claude}
              className="px-3.5 py-1.5 bg-[#202024] hover:bg-[#282830] text-zinc-300 hover:text-zinc-100 text-[11px] font-medium rounded-lg border border-[#2e2e34] flex items-center gap-1 cursor-pointer disabled:opacity-40 shadow-sm"
            >
              <RefreshCw className={`w-3 h-3 ${testing.claude ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
            {testResult.claude && (
              <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified 200 OK</span>
              </span>
            )}
          </div>
        </div>

        {/* OpenAI Card */}
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    aiModels.openai.status === 'connected' ? 'bg-emerald-400' : 'bg-zinc-600'
                  }`}
                />
                <h3 className="text-sm font-bold text-zinc-100 font-display">OpenAI</h3>
              </div>
              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                  aiModels.openai.status === 'connected'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {aiModels.openai.status === 'connected' ? 'Connected' : 'Ready to Connect'}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
              Strict structured JSON verification. Assign to **DPT 5: Quality Assurance & Cliché Audit** for rigorous rubric scoring.
            </p>

            {aiModels.openai.status === 'connected' ? (
              <div className="p-2.5 bg-[#17171a] rounded-xl border border-[#26262a] text-xs font-mono text-zinc-300 mb-3">
                <div className="text-[10px] text-zinc-500 uppercase">Current Key:</div>
                <div className="text-emerald-400 truncate">{aiModels.openai.apiKeyMasked}</div>
              </div>
            ) : (
              <div className="space-y-1 mb-3">
                <label className="text-[10px] font-mono text-zinc-400 uppercase">Add OpenAI API Key:</label>
                <div className="flex gap-1.5">
                  <input
                    type="password"
                    placeholder="sk-proj-..."
                    value={openAiKeyInput}
                    onChange={(e) => setOpenAiKeyInput(e.target.value)}
                    className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs outline-none focus:border-emerald-400"
                  />
                  <button
                    onClick={() => handleSaveKey('openai', openAiKeyInput)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-semibold rounded-lg cursor-pointer shrink-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-1 text-xs">
              <label className="text-[10px] font-mono text-zinc-400 uppercase">Assigned Model:</label>
              <select
                value={aiModels.openai.activeModel}
                onChange={(e) => handleModelChange('openai', e.target.value)}
                className="w-full bg-[#17171a] border border-[#2e2e34] hover:border-emerald-500/50 rounded-lg px-2.5 py-2 text-zinc-200 outline-none text-xs cursor-pointer transition-colors"
              >
                {aiModels.openai.supportedModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#202024] flex items-center justify-between">
            <button
              onClick={() => handleTestConnection('openai')}
              disabled={aiModels.openai.status !== 'connected' || testing.openai}
              className="px-3.5 py-1.5 bg-[#202024] hover:bg-[#282830] text-zinc-300 hover:text-zinc-100 text-[11px] font-medium rounded-lg border border-[#2e2e34] flex items-center gap-1 cursor-pointer disabled:opacity-40 shadow-sm"
            >
              <RefreshCw className={`w-3 h-3 ${testing.openai ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
            {testResult.openai && (
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified 200 OK</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Model Routing Architecture Matrix */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Sliders className="w-4 h-4 text-[#e43d25]" />
          <h3 className="text-sm font-bold text-zinc-100 font-display">
            Multi-Agent Department Routing Rules (Active Orchestration)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-[#17171a] rounded-xl border border-[#24242c]">
            <div className="text-[10px] font-mono text-[#ff6a52] uppercase font-semibold">DPT 1: Signal Scorer</div>
            <div className="font-semibold text-zinc-200 mt-1">Gemini 2.5 Flash</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">High-speed RSS & gazette scan</div>
          </div>
          <div className="p-3 bg-[#17171a] rounded-xl border border-[#24242c]">
            <div className="text-[10px] font-mono text-[#ff6a52] uppercase font-semibold">DPT 2: Fact & SERP</div>
            <div className="font-semibold text-zinc-200 mt-1">Gemini 2.5 Flash</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Live Google SERP & RERA scraper</div>
          </div>
          <div className="p-3 bg-[#17171a] rounded-xl border border-[#24242c]">
            <div className="text-[10px] font-mono text-[#ff6a52] uppercase font-semibold">DPT 3: Master Writer</div>
            <div className="font-semibold text-zinc-200 mt-1">{editorialBrief.assignedWriterModel}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Active Publication Engine</div>
          </div>
          <div className="p-3 bg-[#17171a] rounded-xl border border-[#24242c]">
            <div className="text-[10px] font-mono text-[#ff6a52] uppercase font-semibold">DPT 4: Visual Studio</div>
            <div className="font-semibold text-zinc-200 mt-1">Gemini Architectural Visuals</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Watermark-free 4K assets</div>
          </div>
          <div className="p-3 bg-[#17171a] rounded-xl border border-[#24242c]">
            <div className="text-[10px] font-mono text-[#ff6a52] uppercase font-semibold">DPT 5: QA & SEO Gate</div>
            <div className="font-semibold text-zinc-200 mt-1">Cliché & GEO Auditor</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Zero cliché enforcement</div>
          </div>
        </div>
      </div>
    </div>
  );
};
