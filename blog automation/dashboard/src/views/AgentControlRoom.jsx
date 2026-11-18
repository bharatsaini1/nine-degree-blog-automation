import React, { useState } from 'react';
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
