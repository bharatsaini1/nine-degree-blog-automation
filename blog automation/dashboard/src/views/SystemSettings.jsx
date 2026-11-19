import React, { useState, useRef } from 'react';
import { Settings, Download, Upload, RefreshCw, Activity, CheckCircle2, AlertTriangle, ShieldCheck, Database, Server } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const SystemSettings = () => {
  const { backendOnline, activeWorkspace, pingBackend, importFullBackup, backendUrl, setBackendUrl, aiModels, updateModelKey } = useIntelligence();
  const [cleared, setCleared] = useState(false);
  const [pingResult, setPingResult] = useState(null);
  const [isPinging, setIsPinging] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const [customUrlInput, setCustomUrlInput] = useState(backendUrl || '');
  const [urlSavedFeedback, setUrlSavedFeedback] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState('');
  const [geminiSavedFeedback, setGeminiSavedFeedback] = useState(false);
  const fileInputRef = useRef(null);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all intelligence matrices to default seeds? Custom backlog items and published archives will be refreshed.")) {
      localStorage.clear();
      setCleared(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  const handleExport = () => {
    const data = {
      workspace: activeWorkspace,
      exportedAt: new Date().toISOString(),
      version: "2.0.0",
      trends: JSON.parse(localStorage.getItem('nd_trends') || '[]'),
      competitors: JSON.parse(localStorage.getItem('nd_competitors') || '[]'),
      keywords: JSON.parse(localStorage.getItem('nd_keywords') || '[]'),
      backlog: JSON.parse(localStorage.getItem('nd_backlog') || '[]'),
      published: JSON.parse(localStorage.getItem('nd_published') || '[]'),
      validations: JSON.parse(localStorage.getItem('nd_validations') || '[]'),
      prompts: JSON.parse(localStorage.getItem('nd_prompts') || '{}'),
      brand: JSON.parse(localStorage.getItem('nd_brand') || '{}'),
      models: JSON.parse(localStorage.getItem('nd_models') || '{}')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nine_degree_full_intelligence_backup_${Date.now()}.json`;
    a.click();
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result);
        const success = importFullBackup(json);
        if (success) {
          setImportStatus({
            type: 'success',
            message: `Successfully imported backup! Loaded ${json.trends?.length || 0} trends, ${json.backlog?.length || 0} backlog topics, and ${json.published?.length || 0} published dossiers.`
          });
        } else {
          setImportStatus({
            type: 'error',
            message: 'Invalid backup structure. Required keys missing.'
          });
        }
      } catch (err) {
        setImportStatus({
          type: 'error',
          message: 'Failed to parse JSON file. Please ensure it is a valid Nine Degree export.'
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePing = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await pingBackend();
      setPingResult(res);
    } catch (err) {
      setPingResult({
        ok: false,
        latency: 'timeout',
        status: 500,
        message: 'Engine unreachable'
      });
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              System Telemetry & Storage Engine
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e43d25]/10 text-[#ff6a52] border border-[#e43d25]/20 font-semibold">
              Nine Degree Core 2.0
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Live n8n webhook diagnostics, multi-tenant state serialization, automated backups, and persistent intelligence cache governance.
          </p>
        </div>

        {importStatus && (
          <div
            className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 border ${
              importStatus.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
            }`}
          >
            {importStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{importStatus.message}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Active Engine Connectors & Live Ping */}
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-100 font-display flex items-center gap-2">
              <Server className="w-4 h-4 text-[#e43d25]" />
              <span>Active Multi-Agent Engine Connectors</span>
            </h3>
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="px-3 py-1.5 bg-[#202024] hover:bg-[#28282e] hover:border-[#e43d25]/40 text-zinc-200 border border-[#2e2e34] rounded-lg text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Activity className={`w-3 h-3 text-[#e43d25] ${isPinging ? 'animate-pulse' : ''}`} />
              <span>{isPinging ? 'Pinging...' : 'Ping Engine'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {/* n8n Engine Card */}
            <div className="p-3.5 bg-[#161619] rounded-xl border border-[#26262a] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-zinc-200 text-xs flex items-center gap-1.5">
                    <span>n8n Multi-Agent Engine (Port 5678)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    Webhook: {backendUrl ? `${backendUrl}/webhook/nine-degree-dashboard` : '/n8n/webhook/nine-degree-dashboard'}
                  </div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                    backendOnline
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {backendOnline ? 'ONLINE' : 'DEGRADED / RECONNECTING'}
                </span>
              </div>

              {/* Cloud n8n URL Config */}
              <div className="pt-2 border-t border-[#222228] space-y-1.5">
                <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>Remote Cloud n8n Backend URL:</span>
                  {urlSavedFeedback && <span className="text-emerald-400">Saved to memory!</span>}
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="e.g. https://nine-degree-n8n.onrender.com"
                    className="flex-1 bg-[#101013] border border-[#27272e] rounded-lg px-2.5 py-1.5 text-[11px] text-zinc-200 font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#e43d25]/50"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBackendUrl(customUrlInput);
                      setUrlSavedFeedback(true);
                      setTimeout(() => setUrlSavedFeedback(false), 2500);
                      handlePing();
                    }}
                    className="px-3 py-1.5 bg-[#e43d25] hover:bg-[#ff4e36] text-white rounded-lg text-[10.5px] font-semibold cursor-pointer transition-all shrink-0"
                  >
                    Save & Ping
                  </button>
                </div>
              </div>

              {pingResult && (
                <div
                  className={`mt-2 p-2 rounded-lg font-mono text-[10.5px] border flex items-center justify-between ${
                    pingResult.ok
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Ping latency: {pingResult.latency}ms</span>
                    <span className="text-zinc-500">| HTTP {pingResult.status}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">
                    {new Date(pingResult.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>

            {/* Gemini API Connector */}
            <div className="p-3.5 bg-[#161619] rounded-xl border border-[#26262a] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-zinc-200 text-xs">Google Gemini 2.5 Flash / Pro API</div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    {aiModels?.gemini?.apiKeyMasked ? `Key: ${aiModels.gemini.apiKeyMasked}` : 'Default Intelligence Foundation'}
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                  {aiModels?.gemini?.apiKeyRaw ? 'CUSTOM KEY ACTIVE' : 'ACTIVE'}
                </span>
              </div>
              <div className="flex gap-2 pt-1 border-t border-[#222228]">
                <input
                  type="password"
                  placeholder={aiModels?.gemini?.apiKeyRaw ? "Paste new key to replace..." : "Paste Gemini API Key (AIzaSy...)"}
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  className="flex-1 bg-[#101013] border border-[#27272e] rounded-lg px-2.5 py-1.5 text-[11px] text-zinc-200 font-mono placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400/50"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!geminiKeyInput.trim()) return;
                    updateModelKey('gemini', geminiKeyInput.trim());
                    setGeminiKeyInput('');
                    setGeminiSavedFeedback(true);
                    setTimeout(() => setGeminiSavedFeedback(false), 2500);
                  }}
                  disabled={!geminiKeyInput.trim()}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-[10.5px] font-semibold cursor-pointer transition-all shrink-0"
                >
                  Save Key
                </button>
              </div>
              {geminiSavedFeedback && (
                <div className="text-[10px] font-mono text-emerald-400">
                  Google Gemini API Key saved to local storage!
                </div>
              )}
            </div>

            {/* Claude Adapter */}
            <div className="p-3.5 bg-[#161619] rounded-xl border border-[#26262a] flex items-center justify-between">
              <div>
                <div className="font-semibold text-zinc-200 text-xs">Anthropic Claude 3.5 Sonnet Engine</div>
                <div className="text-[10px] font-mono text-zinc-500">Autonomous Synthesis Fallback & Cross-Verification</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 font-semibold">
                READY
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Data Persistence & Local Cache Backup */}
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-100 font-display flex items-center gap-2">
              <Database className="w-4 h-4 text-[#e43d25]" />
              <span>Persistent Intelligence Cache Governance</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed text-[11px]">
              All ingested trends, competitor audits, keyword opportunities, content drafts, brand governance rules, and agent prompt configurations are preserved across page sessions via structured localStorage serialization.
            </p>

            <div className="grid grid-cols-2 gap-2 font-mono text-[10.5px] pt-1">
              <div className="p-2.5 bg-[#161619] rounded-lg border border-[#26262a]">
                <div className="text-zinc-500 uppercase text-[9px]">Workspace Scope</div>
                <div className="text-zinc-200 font-semibold">{activeWorkspace}</div>
              </div>
              <div className="p-2.5 bg-[#161619] rounded-lg border border-[#26262a]">
                <div className="text-zinc-500 uppercase text-[9px]">Storage Engine</div>
                <div className="text-emerald-400 font-semibold">JSON LocalStorage</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3 border-t border-[#202024]">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-[#202024] hover:bg-[#28282e] hover:border-[#e43d25]/40 text-zinc-200 rounded-xl border border-[#2e2e34] transition-all flex items-center gap-2 cursor-pointer font-medium text-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#e43d25]" />
                <span>Export Dossier (JSON)</span>
              </button>

              <button
                onClick={handleImportClick}
                className="px-4 py-2 bg-[#202024] hover:bg-[#28282e] hover:border-[#e43d25]/40 text-zinc-200 rounded-xl border border-[#2e2e34] transition-all flex items-center gap-2 cursor-pointer font-medium text-xs"
              >
                <Upload className="w-3.5 h-3.5 text-indigo-400" />
                <span>Import Backup (JSON)</span>
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl border border-rose-500/30 transition-all flex items-center gap-2 cursor-pointer font-medium text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{cleared ? 'Resetting...' : 'Reset Seeds'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
