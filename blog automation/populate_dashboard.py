import os

BASE = r"D:\BrightLoom\cleints works\Nine Degree\blog automation\dashboard\src"

files = {}

files["components/navigation/Sidebar.jsx"] = """import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Compass,
  CheckCircle2,
  Users,
  Search,
  ListTodo,
  PenTool,
  Image as ImageIcon,
  Bot,
  Cpu,
  BookOpen,
  Send,
  Settings
} from 'lucide-react';
import { useIntelligence } from '../../context/IntelligenceContext';

export const Sidebar = () => {
  const { activeTab, setActiveTab, perspective, setPerspective, backendOnline } = useIntelligence();

  const navigationItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, group: 'Executive' },
    { id: 'feed', label: 'Intelligence Feed', icon: Radio, group: 'Executive' },
    { id: 'trendRadar', label: 'Trend Radar', icon: Compass, badge: 'Global', group: 'Research & Signals' },
    { id: 'topicValidator', label: 'Topic Validator', icon: CheckCircle2, badge: 'Core', group: 'Research & Signals' },
    { id: 'competitor', label: 'Competitor Intel', icon: Users, group: 'Research & Signals' },
    { id: 'seo', label: 'SEO Intelligence', icon: Search, badge: 'GEO', group: 'Research & Signals' },
    { id: 'backlog', label: 'Opportunity Backlog', icon: ListTodo, group: 'Research & Signals' },
    { id: 'contentStudio', label: 'Content Studio', icon: PenTool, badge: 'Live', group: 'Editorial & Production' },
    { id: 'visualStudio', label: 'Visual Studio', icon: ImageIcon, group: 'Editorial & Production' },
    { id: 'agents', label: 'Agent Control Room', icon: Bot, group: 'Orchestration & AI' },
    { id: 'models', label: 'AI Model Control', icon: Cpu, badge: 'Claude/Gemini', group: 'Orchestration & AI' },
    { id: 'brand', label: 'Brand & Knowledge', icon: BookOpen, group: 'Governance' },
    { id: 'publishing', label: 'Publishing & Stats', icon: Send, group: 'Governance' },
    { id: 'settings', label: 'System Settings', icon: Settings, group: 'Governance' }
  ];

  return (
    <aside className="w-72 bg-[#0c0c0e] border-r border-[#26262a] flex flex-col justify-between select-none h-screen sticky top-0">
      <div>
        <div className="p-5 border-b border-[#202024]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#996515] to-[#593e10] p-[1px] shadow-lg shadow-[#d4af37]/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#0c0c0e] rounded-[11px] flex items-center justify-center font-serif text-lg font-bold text-[#d4af37]">
                9°
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-zinc-100 flex items-center gap-1.5 font-serif">
                Nine Degree
                <span className="text-[10px] tracking-widest uppercase bg-[#d4af37]/10 text-[#d4af37] px-1.5 py-0.5 rounded font-mono font-normal">
                  OS 2.0
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono tracking-tight">
                Market & Editorial Intelligence
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e1e22]">
            <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-1.5 flex items-center justify-between">
              <span>Executive Perspective</span>
              <span className="text-[#d4af37] text-[10px]">Active</span>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-[#141417] p-1 rounded-lg border border-[#26262a]">
              <button
                onClick={() => setPerspective('cmo')}
                className={`text-[10.5px] py-1 rounded font-medium transition-all cursor-pointer ${
                  perspective === 'cmo'
                    ? 'bg-[#d4af37] text-black shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                CMO/VP
              </button>
              <button
                onClick={() => setPerspective('strategist')}
                className={`text-[10.5px] py-1 rounded font-medium transition-all cursor-pointer ${
                  perspective === 'strategist'
                    ? 'bg-[#d4af37] text-black shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Strategist
              </button>
              <button
                onClick={() => setPerspective('vc')}
                className={`text-[10.5px] py-1 rounded font-medium transition-all cursor-pointer ${
                  perspective === 'vc'
                    ? 'bg-[#d4af37] text-black shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                VC/Fund
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 overflow-y-auto max-h-[calc(100vh-220px)] space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-[#1a1815] text-[#d4af37] border border-[#d4af37]/30 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#141417]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#d4af37]' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-[#d4af37]/20 text-[#d4af37]'
                        : 'bg-[#1f1f23] text-zinc-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-[#202024] bg-[#09090b]">
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-zinc-400 font-mono">n8n Engine :5678</span>
          </div>
          <span className="text-emerald-400 font-mono text-[10px]">
            {backendOnline ? 'Online' : 'Checking'}
          </span>
        </div>
        <div className="text-[10px] text-zinc-400 mt-1 font-sans">
          Persona: <span className="text-zinc-300">Swapnil Soni (VP)</span>
        </div>
      </div>
    </aside>
  );
};
"""

files["components/common/Header.jsx"] = """import React from 'react';
import { Sparkles } from 'lucide-react';
import { useIntelligence } from '../../context/IntelligenceContext';

export const Header = () => {
  const { setActiveTab, aiModels, perspective } = useIntelligence();

  const getPerspectiveLabel = () => {
    switch (perspective) {
      case 'cmo':
        return 'CMO & Strategic Growth Cockpit';
      case 'strategist':
        return 'Head of Content & SEO Architecture';
      case 'vc':
        return 'VC, Real Estate Fund & Due Diligence';
      default:
        return 'Executive Editorial Bureau';
    }
  };

  const isClaudeActive = aiModels.claude.status === 'connected';

  return (
    <header className="h-16 border-b border-[#26262a] bg-[#0c0c0e]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold text-zinc-100 font-serif tracking-wide">
            Nine Degree Strategic Editorial OS
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
            {getPerspectiveLabel()}
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 font-sans">
          Global market signal ingestion, competitive teardown & multi-agent publishing
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 bg-[#141417] px-3 py-1.5 rounded-lg border border-[#26262a] text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300 font-mono">Gemini 2.5 (Default)</span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isClaudeActive ? 'bg-indigo-400' : 'bg-zinc-600'
              }`}
            />
            <span
              className={`font-mono ${
                isClaudeActive ? 'text-indigo-300' : 'text-zinc-400'
              }`}
            >
              {isClaudeActive ? 'Claude 3.5 Sonnet' : 'Claude Ready'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('topicValidator')}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black text-xs font-semibold rounded-lg shadow-sm hover:brightness-110 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Validate Idea</span>
        </button>
      </div>
    </header>
  );
};
"""

for rel_path, code in files.items():
    full_path = os.path.join(BASE, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Written: {rel_path} ({len(code)} bytes)")
