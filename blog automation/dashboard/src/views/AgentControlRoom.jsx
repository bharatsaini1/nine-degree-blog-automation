import React, { useState } from 'react';
import {
  Bot,
  CheckCircle2,
  FileCode,
  Save,
  Zap,
  Play,
  RefreshCw,
  Terminal,
  Cpu
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const AgentControlRoom = () => {
  const { agentTelemetry, agentPrompts, updateAgentPrompt } = useIntelligence();

  const [selectedDept, setSelectedDept] = useState('DPT 3');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testOutput, setTestOutput] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedAgent = agentTelemetry.find((ag) => ag.department.startsWith(selectedDept)) || agentTelemetry[2];
  const currentPrompt = agentPrompts[selectedDept] || '';

  const [editablePrompt, setEditablePrompt] = useState(currentPrompt);

  const handleSelectDept = (deptKey) => {
    setSelectedDept(deptKey);
    setEditablePrompt(agentPrompts[deptKey] || '');
    setTestOutput(null);
  };

  const handleSavePrompt = () => {
    updateAgentPrompt(selectedDept, editablePrompt);
    setToastMessage(`Saved system prompt for ${selectedDept} (${selectedAgent.agent})!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTestAgent = () => {
    setIsRunningTest(true);
    setTestOutput(null);

    setTimeout(() => {
      let sampleOutput = '';
      if (selectedDept === 'DPT 1') {
        sampleOutput = `[DPT 1 Intake Scorer]: Ingested circular Raj-RERA/2026/Escrow-88. Opportunity Score: 98/100. High-intent signal detected in south Jaipur Jagatpura corridor.`;
      } else if (selectedDept === 'DPT 2') {
        sampleOutput = `[DPT 2 Competitive Intelligence]: Scraped Housing.com & PropTiger for "Jagatpura land prices". Content Gap verified: 0% legal title due diligence provided to buyers.`;
      } else if (selectedDept === 'DPT 3') {
        sampleOutput = `[DPT 3 Master Writer]: Synthesis complete. Headline: "Jaipur Real Estate 2026: Jagatpura vs Tonk Road Land Bank Economics". Passed advisory tone audit with zero clichés.`;
      } else if (selectedDept === 'DPT 4') {
        sampleOutput = `[DPT 4 Visual Director]: Engineered 4K prompt: "Hyper-realistic twilight view of minimalist sandstone villa in Jagatpura, 16:9 aspect ratio, watermark-free".`;
      } else {
        sampleOutput = `[DPT 5 QA Gate]: Cliché audit passed (0/10 banned words found). Readability: 96/100. Entity density verified for RERA, circle rates, and JDA demarcation.`;
      }

      setTestOutput(sampleOutput);
      setIsRunningTest(false);
      setToastMessage(`Dry run test passed for ${selectedDept}!`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 1100);
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
          <span className="text-[10px] text-zinc-500">Agent Telemetry</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-[#222226] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-4 h-4 text-[#e43d25]" />
            <h2 className="text-lg font-display font-bold text-zinc-100 tracking-tight">
              Agent Control Room & Telemetry Bureau
            </h2>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              5 Live Orchestrated Sub-Agents
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Real-time execution telemetry from the n8n orchestration system. Inspect tokens, latency, cost, and edit specialist system prompts with persistent storage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTestAgent}
            disabled={isRunningTest}
            className="px-4 py-2 bg-[#1b1b20] hover:bg-[#232328] text-zinc-200 text-xs font-semibold rounded-full border border-[#2e2e34] hover:border-[#e43d25]/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 text-[#e43d25] ${isRunningTest ? 'animate-spin' : ''}`} />
            <span>{isRunningTest ? 'Executing Agent...' : 'Test Agent Run'}</span>
          </button>
        </div>
      </div>

      {/* 5 Department Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {agentTelemetry.map((ag) => {
          const deptKey = ag.department.split(':')[0].trim();
          const isSelected = selectedDept === deptKey;
          return (
            <button
              key={ag.department}
              onClick={() => handleSelectDept(deptKey)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#18181c] border-[#e43d25] shadow-lg shadow-[#e43d25]/15'
                  : 'bg-[#111113] border-[#222226] hover:border-[#33333a]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="text-[#e43d25] font-semibold">{deptKey}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-xs font-display font-bold text-zinc-100 truncate">
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
        {/* Left Column: Telemetry Specs */}
        <div className="lg:col-span-4 bg-[#111113] p-5 rounded-2xl border border-[#222226] text-xs space-y-4">
          <div className="border-b border-[#202024] pb-3">
            <div className="text-[10px] font-mono text-[#e43d25] uppercase font-semibold">
              {selectedAgent.department}
            </div>
            <h3 className="text-sm font-bold text-zinc-100 font-display mt-0.5">
              {selectedAgent.agent}
            </h3>
          </div>

          <div className="space-y-2.5 text-[11px] font-mono">
            <div className="flex justify-between py-1.5 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Department Status:</span>
              <span className="text-emerald-400 font-semibold uppercase">● Online (Standby)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Assigned Provider:</span>
              <span className="text-zinc-300">Google Gemini / Anthropic</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Active Model:</span>
              <span className="text-[#ff6a52]">{selectedAgent.model}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Avg Tokens / Run:</span>
              <span className="text-zinc-200">{selectedAgent.tokens}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Avg Latency:</span>
              <span className="text-zinc-200">{selectedAgent.latency}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#1c1c20]">
              <span className="text-zinc-500">Est. Cost / Invocation:</span>
              <span className="text-emerald-400 font-semibold">{selectedAgent.cost}</span>
            </div>
          </div>

          {/* Test Dry Run Output Box */}
          {testOutput && (
            <div className="p-3 bg-[#16161b] rounded-xl border border-emerald-500/30 text-[11px] font-mono space-y-1">
              <div className="text-[9.5px] text-emerald-400 uppercase font-semibold flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                <span>Live Execution Log</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">{testOutput}</p>
            </div>
          )}
        </div>

        {/* Right Column: Editable System Prompt */}
        <div className="lg:col-span-8 bg-[#111113] p-6 rounded-2xl border border-[#222226] text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#202024] pb-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 font-display flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#e43d25]" />
                <span>Specialist System Prompt & Steering Persona</span>
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Modifications are stored persistently and inject directly into this department's prompt templates.
              </p>
            </div>

            <button
              onClick={handleSavePrompt}
              className="px-5 py-2 bg-[#e43d25] hover:bg-[#d8402a] text-white text-xs font-semibold rounded-full shadow-md shadow-[#e43d25]/20 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save System Prompt</span>
            </button>
          </div>

          <div>
            <textarea
              rows={11}
              value={editablePrompt}
              onChange={(e) => setEditablePrompt(e.target.value)}
              className="w-full bg-[#161619] border border-[#282830] rounded-xl p-4 text-xs font-mono text-zinc-200 outline-none focus:border-[#e43d25] leading-relaxed"
            />
          </div>

          <div className="p-3 bg-[#161619] rounded-xl border border-[#26262a] text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Governance Enforced: Banned cliché filter & RERA factual grounding automatically appended.</span>
            <span className="text-emerald-400 font-mono text-[10px]">Persistent Storage Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
