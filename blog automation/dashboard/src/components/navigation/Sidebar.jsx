import React from 'react';
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
  const { activeTab, setActiveTab, backendOnline } = useIntelligence();

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
    <aside className="w-72 bg-[#111114] border-r border-[#26262b] flex flex-col justify-between select-none h-screen sticky top-0">
      <div>
        <div className="p-5 border-b border-[#202024]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ffb3a8] via-[#e43d25] to-[#8f1e10] p-[1.5px] shadow-lg shadow-[#e43d25]/25 flex items-center justify-center">
              <div className="w-full h-full bg-[#111114] rounded-[14px] flex items-center justify-center font-bold text-lg text-[#e43d25] tracking-tighter">
                9°
              </div>
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-zinc-100 flex items-center gap-1.5 font-display">
                Nine Degree
                <span className="text-[10px] tracking-widest uppercase bg-[#e43d25]/15 text-[#ff573d] border border-[#e43d25]/30 px-1.5 py-0.5 rounded-full font-mono font-medium">
                  OS 2.0
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 font-mono tracking-tight">
                Real Estate Brand Advisory
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 overflow-y-auto max-h-[calc(100vh-140px)] space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-[#e43d25]/12 text-white border border-[#e43d25]/35 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181d]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#e43d25]' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-medium ${
                      isActive
                        ? 'bg-[#e43d25]/25 text-[#ff6a52] border border-[#e43d25]/40'
                        : 'bg-[#1e1e24] text-zinc-400 border border-[#2b2b32]'
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

      <div className="p-4 border-t border-[#202026] bg-[#0c0c0f]">
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
