import React, { useState, useEffect } from 'react';
import PortalLayout from '../../layouts/PortalLayout';
import { Card, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  HardHat, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Activity, 
  ChevronRight,
  ClipboardList,
  LayoutGrid,
  Zap,
  ShieldCheck,
  Star,
  Phone
} from 'lucide-react';

import { supabase } from '../../lib/supabase';

export default function WardenStaffList() {
  const menuItems = [
    { id: 'dashboard', label: 'Op Center', path: '/warden/dashboard', icon: LayoutGrid },
    { id: 'complaints', label: 'Grievances', path: '/warden/complaints', icon: ClipboardList },
    { id: 'staff', label: 'Maintenance', path: '/warden/staff', icon: HardHat },
    { id: 'students', label: 'Residents', path: '/warden/students', icon: Users }
  ];

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data: sData, error } = await supabase.from('users').select('*').eq('role', 'staff');
      const { data: cData } = await supabase.from('complaints').select('assigned_to, status');
      
      if (!error && sData) {
        const enriched = sData.map(u => {
          const active = cData?.filter(c => c.assigned_to === u.id && c.status !== 'resolved').length || 0;
          return {
            ...u,
            activeCount: active,
            statusBadge: active > 0 ? 'Busy' : 'Free'
          };
        });
        setStaffList(enriched);
      }
      setLoading(false);
    };
    fetchStaff();
  }, []);

  const stats = [
    { label: 'Total Personnel', value: staffList.length, color: 'text-on-surface', icon: Users },
    { label: 'Active Duty', value: staffList.filter(s => s.statusBadge === 'Busy').length, color: 'text-secondary', icon: Activity },
    { label: 'Available Now', value: staffList.filter(s => s.statusBadge === 'Free').length, color: 'text-success', icon: CheckCircle2 },
    { label: 'Avg Efficiency', value: '98%', color: 'text-primary', icon: Zap }
  ];

  return (
    <PortalLayout menuItems={menuItems} roleName="Warden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/5 border border-secondary/10 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <HardHat size={14} className="text-secondary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Personnel Management • Field Staff</span>
          </div>
          <h1 className="display-font text-5xl md:text-6xl font-black text-on-surface leading-[0.8] tracking-tighter mb-4">
            Maintenance <span className="text-secondary text-glow-primary">Corps.</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg mb-2">
            Monitor technician availability, operational zones, and performance metrics across the hostel grid.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="font-black uppercase text-xs tracking-widest gap-2 shadow-none border border-outline/10 h-14">
            <Download size={18} strokeWidth={2.5} />
            Export Personnel
          </Button>
          <Button className="font-black uppercase text-xs tracking-widest gap-2 shadow-2xl shadow-secondary/30 h-14 px-8 bg-secondary hover:bg-secondary/90">
            <Filter size={18} strokeWidth={2.5} />
            Skill Filter
          </Button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} variant="glass" className="p-8 border border-outline/10 group hover:border-secondary/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={80} strokeWidth={1} />
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-6 border border-outline/5 group-hover:scale-110 transition-transform duration-500">
                <Icon size={24} strokeWidth={2.5} className={stat.color} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-black mb-1 block group-hover:text-secondary transition-colors">{stat.label}</span>
              <span className={`display-font text-5xl font-black ${stat.color} tracking-tighter shadow-sm`}>{stat.value}</span>
            </Card>
          );
        })}
      </div>

      {/* Main Table Area */}
      <Card variant="glass" className="p-0 overflow-hidden border border-outline/10 shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
        <div className="p-10 border-b border-outline/10 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/30">
          <CardHeader title="Technician Directory" subtitle="Operational status of all maintenance and utility personnel." className="mb-0 p-0" />
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Search by name or skill..." 
              className="w-full bg-surface-container-low border border-outline/10 rounded-xl py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest text-on-surface outline-none focus:border-secondary/40 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/[0.02]">
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">ID Ref</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Personnel Info</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Skills & Intel</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Tactical Area</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Status</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black text-right">Metrics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5 font-medium">
              {loading ? (
                <tr><td colSpan="6" className="px-10 py-8 text-center text-on-surface-variant font-bold text-sm">Syncing with personnel database...</td></tr>
              ) : staffList.length === 0 ? (
                <tr><td colSpan="6" className="px-10 py-8 text-center text-on-surface-variant font-bold text-sm">No maintenance staff found in intelligence array.</td></tr>
              ) : staffList.map((s) => (
                <tr key={s.id} className="hover:bg-secondary/[0.03] transition-all duration-300 group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-6 bg-secondary/20 rounded-full group-hover:bg-secondary transition-colors" />
                      <span className="font-black text-sm text-on-surface tracking-widest">
                        {s.id.substring(0,8).toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant border border-outline/5 group-hover:border-secondary transition-colors">
                        <Phone size={16} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-on-surface tracking-tight uppercase">{s.name}</span>
                        <div className="flex items-center gap-1.5">
                          <Star size={10} className="text-tertiary fill-tertiary" />
                          <span className="text-[10px] text-tertiary font-black uppercase tracking-widest">Global Field</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-wrap gap-2">
                       <span className="text-[8px] font-black text-secondary uppercase tracking-widest py-1 px-2 bg-secondary/10 rounded-md border border-secondary/10">
                          {s.category || 'Maintenance Generalist'}
                       </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-on-surface-variant opacity-60" strokeWidth={3} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Cross-Hostel Tactical Units</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-black rounded-xl backdrop-blur-md border ${
                      s.statusBadge === 'Free' 
                        ? 'bg-success/10 text-success border-success/20' 
                        : 'bg-tertiary/10 text-tertiary border-tertiary/20 animate-pulse'
                    }`}>
                      {s.statusBadge === 'Free' ? 'Standby' : 'Deployed'}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-black text-on-surface tracking-widest uppercase">{s.activeCount} Active Duties</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Decorative ambient background */}
      <div className="fixed bottom-0 left-[10%] w-[50%] h-[30%] bg-secondary/5 blur-[120px] pointer-events-none z-[-1]" />
    </PortalLayout>
  );
}
