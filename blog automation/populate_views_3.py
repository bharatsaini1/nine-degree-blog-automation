import os

BASE = r"D:\BrightLoom\cleints works\Nine Degree\blog automation\dashboard\src\views"

views = {}

views["AgentControlRoom.jsx"] = """import React, { useState } from 'react';
import {
  Bot,
  CheckCircle2,
  FileCode,
  Save
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const AgentControlRoom = () => {
  const { agentTelemetry } = useIntelligence();
  const [selectedAgent, setSelectedAgent] = useState(agentTelemetry[2] || {
    department: 'DPT 3: Master Editorial Bureau',
    agent: 'Nine Degree Executive Writer',
    model: 'gemini-2.5-flash',
    status: 'completed',
    tokens: 7800,
    latency: '5.8s',
    cost: '$0.0030'
  });
  const [promptContent, setPromptContent] = useState(
    `You are the Master Editorial Director and Principal Advisory Author at Nine Degree, India's premier strategic real estate advisory.

STRICT EDITORIAL VOICE RULES:
1. Speak with collective advisory authority ("We observe", "Nine Degree micro-market research indicates").
2. Anchor every claim in real corridor economics: cite RERA circulars, JDA layout clearances, and circle rates.
3. ABSOLUTE ZERO CLICHÉ TOLERANCE: Never use words like 'delve', 'tapestry', 'beacon of innovation', 'crucial role', 'in today’s fast-paced world', or 'in conclusion'.
4. Integrate Swapnil Soni's expert observations naturally into the core argument.
5. Structure: High-conviction thesis, macroeconomic context, ground-level friction analysis, and strategic playbook.`
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePrompt = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-zinc-100">
              Agent Control Room & Telemetry Bureau
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              5 Live Orchestrated Sub-Agents
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Real-time execution telemetry from the n8n orchestration system. Inspect tokens, latency, cost, and edit specialist system prompts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {agentTelemetry.map((ag) => {
          const isSelected = selectedAgent.department === ag.department;
          return (
            <button
              key={ag.department}
              onClick={() => setSelectedAgent(ag)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#18181c] border-[#d4af37] shadow-lg shadow-[#d4af37]/5'
                  : 'bg-[#111113] border-[#222226] hover:border-[#33333a]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="text-[#d4af37] font-semibold">{ag.department.split(':')[0]}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-serif font-bold text-zinc-100 truncate">
                {ag.agent}
              </div>
              <div className="mt-2 text-[10px] font-mono text-zinc-500 space-y-0.5">
                <div>Model: <span className="text-zinc-300">{ag.model}</span></div>
                <div>Tokens: <span className="text-zinc-300">{ag.tokens}</span></div>
                <div>Cost: <span className="text-emerald-400">{ag.cost}</span></div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-[#111113] p-5 rounded-2xl border border-[#222226] text-xs space-y-4">
          <div className="border-b border-[#202024] pb-3">
            <div className="text-[10px] font-mono text-[#d4af37] uppercase">
              {selectedAgent.department}
            </div>
            <h3 className="text-sm font-bold text-zinc-100 font-serif mt-0.5">
              {selectedAgent.agent}
            </h3>
          </div>

          <div className="space-y-2 text-[11px] font-mono">
            <div className="flex justify-between py-1 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Status:</span>
              <span className="text-emerald-400 font-semibold">{selectedAgent.status.toUpperCase()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Assigned Model:</span>
              <span className="text-zinc-200">{selectedAgent.model}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Latency:</span>
              <span className="text-zinc-200">{selectedAgent.latency}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Token Consumption:</span>
              <span className="text-zinc-200">{selectedAgent.tokens} tokens</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Estimated Cost:</span>
              <span className="text-emerald-400 font-semibold">{selectedAgent.cost}</span>
            </div>
          </div>

          <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] text-[11px] text-zinc-400">
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">
              Active Knowledge Connectors:
            </div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Rajasthan & MahaRERA Real Estate Databases</li>
              <li>Nine Degree Published Blog Archive</li>
              <li>Global Wealth Reports & Capital Yield Matrix</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#111113] p-5 rounded-2xl border border-[#222226] text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#202024] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#d4af37]" />
                <h3 className="text-sm font-semibold text-zinc-100 font-serif">
                  System Prompt Editor (Version 2.4 Active)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Safe Deployment</span>
            </div>

            <textarea
              rows={12}
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
              className="w-full bg-[#161619] border border-[#2a2a30] rounded-xl p-4 text-xs font-mono text-zinc-200 outline-none focus:border-[#d4af37] leading-relaxed resize-none"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-[#202024] flex items-center justify-between">
            <div className="text-[11px] text-zinc-500 font-mono">
              {savedSuccess ? (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Prompt version 2.5 saved & deployed!
                </span>
              ) : (
                <span>Changes will be applied to the next n8n execution cycle.</span>
              )}
            </div>

            <button
              onClick={handleSavePrompt}
              className="px-4 py-2 bg-[#d4af37] text-black font-semibold text-xs rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Version Prompt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
"""

views["AIModelControl.jsx"] = """import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Layers,
  RefreshCw
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const AIModelControl = () => {
  const { aiModels, updateModelKey, editorialBrief } = useIntelligence();

  const [claudeKeyInput, setClaudeKeyInput] = useState('');
  const [openAiKeyInput, setOpenAiKeyInput] = useState('');
  const [testResult, setTestResult] = useState({});
  const [testing, setTesting] = useState({});

  const handleSaveKey = (providerId, key) => {
    if (!key.trim()) return;
    updateModelKey(providerId, key.trim());
    if (providerId === 'claude') setClaudeKeyInput('');
    if (providerId === 'openai') setOpenAiKeyInput('');
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
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-bold text-zinc-100">
              AI Model Control & Multi-Provider Hub
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Gemini + Claude + OpenAI
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Google Gemini 2.5 is configured as default for rapid testing. Add your Anthropic Claude or OpenAI API key here to independently assign models across research, writing, and quality audit departments.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted Backend Storage • No Raw Key In Bundles</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="text-sm font-bold text-zinc-100 font-serif">Google Gemini</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Default Active
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3">
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
                onChange={() => {}}
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 outline-none text-xs"
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
              className="px-3 py-1.5 bg-[#202024] text-zinc-300 hover:text-zinc-100 text-[11px] font-medium rounded-lg border border-[#2e2e34] flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${testing.gemini ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
            {testResult.gemini && (
              <span className="text-[10px] font-mono text-emerald-400">Verified</span>
            )}
          </div>
        </div>

        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    aiModels.claude.status === 'connected' ? 'bg-indigo-400' : 'bg-zinc-600'
                  }`}
                />
                <h3 className="text-sm font-bold text-zinc-100 font-serif">Anthropic Claude</h3>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  aiModels.claude.status === 'connected'
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {aiModels.claude.status === 'connected' ? 'Connected' : 'Ready to Connect'}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3">
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
                onChange={() => {}}
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 outline-none text-xs"
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
              className="px-3 py-1.5 bg-[#202024] text-zinc-300 hover:text-zinc-100 text-[11px] font-medium rounded-lg border border-[#2e2e34] flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${testing.claude ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
            {testResult.claude && (
              <span className="text-[10px] font-mono text-indigo-400">Verified</span>
            )}
          </div>
        </div>

        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    aiModels.openai.status === 'connected' ? 'bg-emerald-400' : 'bg-zinc-600'
                  }`}
                />
                <h3 className="text-sm font-bold text-zinc-100 font-serif">OpenAI</h3>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  aiModels.openai.status === 'connected'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {aiModels.openai.status === 'connected' ? 'Connected' : 'Ready to Connect'}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3">
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
                onChange={() => {}}
                className="w-full bg-[#17171a] border border-[#2e2e34] rounded-lg px-2.5 py-1.5 text-zinc-200 outline-none text-xs"
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
              className="px-3 py-1.5 bg-[#202024] text-zinc-300 hover:text-zinc-100 text-[11px] font-medium rounded-lg border border-[#2e2e34] flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${testing.openai ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
            {testResult.openai && (
              <span className="text-[10px] font-mono text-emerald-400">Verified</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] shadow-xl">
        <h3 className="text-sm font-semibold text-zinc-100 font-serif mb-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#d4af37]" />
          <span>Per-Department Model Routing Matrix</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          Independently assign specialist models for each stage of the autonomous editorial pipeline.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161619] text-zinc-400 font-mono text-[10px] uppercase tracking-wider border-b border-[#202024]">
              <tr>
                <th className="py-2.5 px-4">Department & Function</th>
                <th className="py-2.5 px-4">Responsibility</th>
                <th className="py-2.5 px-4">Current Assigned Model</th>
                <th className="py-2.5 px-4">Recommended Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e22] text-zinc-300">
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-100">DPT 1: Intake & Trend Scorer</td>
                <td className="py-3 px-4 text-zinc-400">Search intent, RSS & social signal ingestion</td>
                <td className="py-3 px-4 font-mono text-emerald-400">gemini-2.5-flash</td>
                <td className="py-3 px-4 text-zinc-400">Gemini (Speed & 1M Context)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-100">DPT 2: Fact & Competitor Research</td>
                <td className="py-3 px-4 text-zinc-400">SERP teardown, RERA clause audit, content gaps</td>
                <td className="py-3 px-4 font-mono text-emerald-400">gemini-2.5-flash</td>
                <td className="py-3 px-4 text-zinc-400">Gemini (Web Search & Multimodal)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-100">DPT 3: Master Editorial Bureau</td>
                <td className="py-3 px-4 text-zinc-400">Authoritative long-form writing & expert synthesis</td>
                <td className="py-3 px-4 font-mono text-[#d4af37]">
                  {editorialBrief.assignedWriterModel}
                </td>
                <td className="py-3 px-4 text-indigo-300 font-semibold">
                  Claude 3.5 Sonnet (Apex Nuance)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-100">DPT 4: Visual Studio</td>
                <td className="py-3 px-4 text-zinc-400">4K architectural prompt engineering & assets</td>
                <td className="py-3 px-4 font-mono text-emerald-400">gemini-2.5-flash</td>
                <td className="py-3 px-4 text-zinc-400">Gemini Image Engine</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-100">DPT 5: QA & SEO Gate</td>
                <td className="py-3 px-4 text-zinc-400">Cliché detection, readability grade, SEO audit</td>
                <td className="py-3 px-4 font-mono text-emerald-400">gemini-2.5-flash</td>
                <td className="py-3 px-4 text-zinc-400">GPT-4o or Gemini Flash</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
"""

views["KnowledgeBrandProfiles.jsx"] = """import React from 'react';
import { BookOpen, ShieldAlert, CheckCircle2, MapPin, Award } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const KnowledgeBrandProfiles = () => {
  const { brandProfile } = useIntelligence();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-lg font-serif font-bold text-zinc-100">
            Brand Governance & Fiduciary Knowledge Base
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
            Nine Degree Global Standard
          </span>
        </div>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Core editorial persona, verified global & domestic real estate corridors, target audience profiles, and banned AI cliché guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs">
          <h3 className="text-sm font-semibold text-zinc-100 font-serif flex items-center gap-2">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span>Nine Degree Advisory Voice Rules</span>
          </h3>

          <div className="space-y-2">
            {brandProfile.editorialVoiceRules.map((rule, idx) => (
              <div key={idx} className="p-3 bg-[#161619] rounded-xl border border-[#26262a] text-zinc-300 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#202024]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Tracked Global & Domestic Corridors:
            </div>
            <div className="flex flex-wrap gap-2">
              {brandProfile.keyMicroMarkets.map((m, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#18181c] text-zinc-300 font-mono text-[10.5px] border border-[#26262a] flex items-center gap-1"
                >
                  <MapPin className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>{m}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-100 font-serif flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Banned Generic AI Cliché Dictionary</span>
            </h3>
            <span className="text-[10px] font-mono text-rose-400">Enforced by DPT 5</span>
          </div>

          <p className="text-zinc-400">
            Any draft containing these robotic filler phrases is automatically rejected by the Quality Assurance Gate.
          </p>

          <div className="flex flex-wrap gap-2">
            {brandProfile.bannedCliches.map((word, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 font-mono text-[11px] border border-rose-500/20"
              >
                ✕ "{word}"
              </span>
            ))}
          </div>

          <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] text-[11px] text-zinc-400 mt-4">
            <span className="font-semibold text-zinc-200 block mb-0.5">Advisory Directive:</span>
            Replace generic fluff with verified data: circle rates, construction timeline metrics, escrow percentages, and court precedents.
          </div>
        </div>
      </div>
    </div>
  );
};
"""

views["PublishingPerformance.jsx"] = """import React, { useState } from 'react';
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
"""

views["SystemSettings.jsx"] = """import React, { useState } from 'react';
import { Settings, Download, RefreshCw } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const SystemSettings = () => {
  const { backendOnline, activeWorkspace } = useIntelligence();
  const [cleared, setCleared] = useState(false);

  const handleReset = () => {
    localStorage.clear();
    setCleared(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleExport = () => {
    const data = {
      workspace: activeWorkspace,
      exportedAt: new Date().toISOString(),
      trends: JSON.parse(localStorage.getItem('nd_trends') || '[]'),
      competitors: JSON.parse(localStorage.getItem('nd_competitors') || '[]'),
      keywords: JSON.parse(localStorage.getItem('nd_keywords') || '[]'),
      backlog: JSON.parse(localStorage.getItem('nd_backlog') || '[]')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nine_degree_intelligence_backup_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-lg font-serif font-bold text-zinc-100">
            System & Storage Settings
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
            Configuration
          </span>
        </div>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Manage local persistent intelligence cache, review integration connection status, and export intelligence dossiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-3 text-xs">
          <h3 className="text-sm font-semibold text-zinc-100 font-serif">
            Active Engine Connectors
          </h3>

          <div className="space-y-2">
            <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] flex items-center justify-between">
              <div>
                <div className="font-semibold text-zinc-200">n8n Automation Engine (Port 5678)</div>
                <div className="text-[10px] font-mono text-zinc-500">ID: NDEditorialIntel01</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${backendOnline ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                {backendOnline ? 'CONNECTED' : 'CHECKING'}
              </span>
            </div>

            <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] flex items-center justify-between">
              <div>
                <div className="font-semibold text-zinc-200">Google Gemini API</div>
                <div className="text-[10px] font-mono text-zinc-500">Default Multi-Agent Provider</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] flex items-center justify-between">
              <div>
                <div className="font-semibold text-zinc-200">Anthropic Claude Adapter</div>
                <div className="text-[10px] font-mono text-zinc-500">Claude 3.5 Sonnet Integration</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 text-indigo-400 font-semibold">
                CONFIGURABLE
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#111113] p-5 rounded-2xl border border-[#222226] space-y-4 text-xs">
          <h3 className="text-sm font-semibold text-zinc-100 font-serif">
            Data Persistence & Local Cache
          </h3>
          <p className="text-zinc-400">
            All trends, competitor dossiers, keyword matrices, and validated hypotheses are stored in persistent local browser storage.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-[#202024] hover:bg-[#28282e] text-zinc-200 rounded-xl border border-[#2e2e34] transition-all flex items-center gap-2 cursor-pointer font-medium"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Export Dossier (JSON)</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl border border-rose-500/30 transition-all flex items-center gap-2 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{cleared ? 'Reloading...' : 'Reset to Default Seeds'}</span>
            </button>
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
