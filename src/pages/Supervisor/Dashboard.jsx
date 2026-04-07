import React, { useState } from 'react';
import PortalLayout from '../../layouts/PortalLayout';
import { Card, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  Database, 
  Users, 
  ShieldCheck, 
  HardHat, 
  Building2, 
  Upload, 
  Download, 
  Plus, 
  Search, 
  Filter,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Settings2
} from 'lucide-react';

const tabs = [
  { id: 'Hostels', icon: Building2 },
  { id: 'Students', icon: Users },
  { id: 'Wardens', icon: ShieldCheck },
  { id: 'Staff', icon: HardHat }
];

export default function SupervisorDashboard() {
  const [activeTab, setActiveTab] = useState('Hostels');

  const menuItems = [
    { id: 'dashboard', label: 'Master Arch', path: '/supervisor/dashboard', icon: Database },
    { id: 'settings', label: 'Sys Config', path: '/supervisor/settings', icon: Settings2 }
  ];

  return (
    <PortalLayout menuItems={menuItems} roleName="System Supervisor">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <Database size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Master Directory • Core Intelligence</span>
          </div>
          <h1 className="display-font text-5xl md:text-6xl font-black text-on-surface leading-[0.8] tracking-tighter mb-4">
            Master <span className="text-primary text-glow-primary">Arch.</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg">
            Architect and manage the central whitelists, facility data, and authentication tiers.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="font-black uppercase text-xs tracking-widest gap-2 shadow-none border border-outline/10 h-14">
            <Upload size={18} strokeWidth={2.5} />
            Import
          </Button>
          <Button className="font-black uppercase text-xs tracking-widest gap-2 shadow-2xl shadow-primary/30 h-14 px-8">
            <Download size={18} strokeWidth={2.5} />
            Export
          </Button>
        </div>
      </div>

      {/* Modern Tabs Selection */}
      <div className="flex space-x-3 overflow-x-auto pb-4 mb-10 no-scrollbar animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3
                ${isActive 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 ring-4 ring-primary/10' 
                  : 'bg-surface-container-low text-on-surface-variant border border-outline/5 hover:border-primary/30 hover:text-on-surface'
                }
              `}
            >
              <Icon size={16} strokeWidth={3} className={isActive ? 'animate-pulse' : ''} />
              {tab.id}
            </button>
          );
        })}
      </div>

      {/* Main Data Exploration Area */}
      <Card variant="glass" className="p-0 overflow-hidden border border-outline/10 shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-500 relative">
        <div className="p-10 border-b border-outline/10 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/30">
          <CardHeader title={`${activeTab} Registry`} subtitle="Centralized administrative data management and synchronization." className="mb-0 p-0" />
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab.toLowerCase()}...`} 
              className="w-full bg-surface-container-high/50 border border-outline/10 rounded-xl py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest text-on-surface outline-none focus:border-primary/40 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-32 px-10 relative overflow-hidden">
          {/* Abstract background for empty state */}
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
            <Database size={600} strokeWidth={0.5} className="text-on-surface absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10 space-y-10 max-w-xl">
            <div className="inline-flex p-8 bg-surface-container-low text-on-surface-variant/20 rounded-[3rem] border border-outline/5 shadow-inner">
              <Database size={80} strokeWidth={1} className="animate-pulse" />
            </div>
            
            <div className="space-y-4">
              <h3 className="display-font text-3xl font-black text-on-surface tracking-tighter uppercase leading-none">
                Data Stream <span className="text-primary">Standby.</span>
              </h3>
              <p className="text-on-surface-variant font-medium text-lg leading-relaxed opacity-60">
                The <span className="text-primary font-black">{activeTab}</span> configuration matrix is waiting for an active Supabase session synchronization.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <Button size="lg" className="w-full md:w-auto px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30">
                Force Sync Data
              </Button>
              <Button variant="secondary" size="lg" className="w-full md:w-auto px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] border border-outline/10 group">
                <Plus size={18} strokeWidth={3} className="text-primary group-hover:rotate-90 transition-transform duration-500" />
                Manual Entry
              </Button>
            </div>
          </div>
        </div>

        <div className="px-10 py-6 bg-surface-container-highest/50 flex items-center justify-between border-t border-outline/5">
          <div className="flex items-center gap-3">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Awaiting cloud integration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-on-surface-variant/20 animate-pulse" />
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Offline Registry Mod</span>
          </div>
        </div>
      </Card>
      
      {/* Dynamic Ambient Blur */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[160px] pointer-events-none z-[-1]" />
    </PortalLayout>
  );
}

// Re-import icons potentially used but not handled in thought
import { HardHat as HardHatIcon } from 'lucide-react';
