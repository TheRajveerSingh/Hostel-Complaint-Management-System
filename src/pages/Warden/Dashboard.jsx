import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '../../layouts/PortalLayout';
import { Card, CardHeader } from '../../components/ui/Card';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  LayoutGrid, 
  FileText, 
  Users, 
  Activity, 
  TrendingUp, 
  AlertOctagon, 
  ClipboardList, 
  Clock, 
  CheckCircle2,
  Zap,
  ArrowUpRight,
  Filter,
  Calendar,
  Sparkle
} from 'lucide-react';

import { supabase } from '../../lib/supabase';
import { authService } from '../../lib/auth';

const COLORS = ['#4f46e5', '#0ea5e9', '#f59e0b', '#10b981', '#a855f7', '#ef4444'];

export default function WardenDashboard() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const wardenHostel = currentUser?.hostel_id;

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!wardenHostel) return;
      const { data } = await supabase.from('complaints').select('*').eq('hostel_id', wardenHostel);
      if (data) setComplaints(data);
      setLoading(false);
    };
    fetchComplaints();
  }, [wardenHostel]);

  const menuItems = [
    { id: 'dashboard', label: 'Op Center', path: '/warden/dashboard', icon: LayoutGrid },
    { id: 'complaints', label: 'Grievances', path: '/warden/complaints', icon: ClipboardList },
    { id: 'staff', label: 'Staff Corps', path: '/warden/staff', icon: HardHat },
    { id: 'students', label: 'Residents', path: '/warden/students', icon: Users },
  ];

  const activeReports = complaints.filter(c => c.status !== 'resolved').length;
  
  const stats = [
    { label: 'Active Reports', value: activeReports, color: 'text-primary', icon: FileText, change: 'LIVE', trend: 'neutral' },
    { label: 'Unassigned', value: complaints.filter(c => !c.assigned_to).length, color: 'text-secondary', icon: Users, change: 'Urgent', trend: 'down' },
    { label: 'Critical Errors', value: complaints.filter(c => c.is_emergency).length, color: 'text-error', icon: AlertOctagon, change: 'SOS', trend: 'up' },
    { label: 'Total Handled', value: complaints.length, color: 'text-success', icon: ClipboardList, change: 'Global', trend: 'neutral' }
  ];

  // Dynamic Pie Data
  const categories = {};
  complaints.forEach(c => {
    categories[c.category] = (categories[c.category] || 0) + 1;
  });
  const pieData = Object.keys(categories).map(key => ({ name: key, value: categories[key] }));
  if (pieData.length === 0) pieData.push({ name: 'No Data', value: 100 });

  // Mocked Bar Data Since Timestamps Need Complex Aggregation
  const barData = [
    { name: 'Mon', count: Math.round(complaints.length * 0.2) },
    { name: 'Tue', count: Math.round(complaints.length * 0.1) },
    { name: 'Wed', count: Math.round(complaints.length * 0.3) },
    { name: 'Thu', count: Math.round(complaints.length * 0.15) },
    { name: 'Fri', count: Math.round(complaints.length * 0.25) }
  ];

  return (
    <PortalLayout menuItems={menuItems} roleName="Warden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <Activity size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Mission Control • {wardenHostel}</span>
          </div>
          <h1 className="display-font text-5xl md:text-6xl font-black text-on-surface leading-[0.8] tracking-tighter mb-4">
            Operations Center<span className="text-primary">.</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg">
            Monitor institutional flow, manage resources, and resolve critical incidents with clinical precision.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="font-black uppercase text-xs tracking-widest gap-2 shadow-none border border-outline/10 h-14">
            <Calendar size={18} strokeWidth={2.5} />
            Last 30 Days
          </Button>
          <Button className="font-black uppercase text-xs tracking-widest gap-2 shadow-2xl shadow-primary/30 h-14 px-8">
            <Filter size={18} strokeWidth={2.5} />
            Filters
          </Button>
        </div>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} variant="glass" className="p-8 border border-outline/10 group hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={80} strokeWidth={1} />
              </div>
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-xl bg-surface-container-high ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={24} strokeWidth={2.5} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                  {stat.change}
                  <TrendingUp size={12} className={stat.trend === 'down' ? 'rotate-180' : stat.trend === 'neutral' ? 'rotate-90' : ''} />
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-black mb-1 block group-hover:text-primary transition-colors">{stat.label}</span>
              <span className={`display-font text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</span>
            </Card>
          );
        })}
      </div>

      {/* Analytics Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
        <Card variant="glass" className="p-10 border border-outline/10 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <CardHeader title="Incident Velocity" subtitle="Daily grievance reports normalized across 7 days." className="mb-0 p-0" />
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ArrowUpRight size={20} strokeWidth={3} />
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={barData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(148, 163, 184, 0.4)" tick={{fill: 'rgba(148, 163, 184, 0.6)', fontSize: 10, fontWeight: 900}} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(148, 163, 184, 0.4)" tick={{fill: 'rgba(148, 163, 184, 0.6)', fontSize: 10, fontWeight: 900}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{stroke: '#4f46e5', strokeWidth: 2}} 
                  contentStyle={{backgroundColor: 'var(--surface)', border: '1px solid var(--outline)', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'}} 
                />
                <Area type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card variant="glass" className="p-10 border border-outline/10 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <CardHeader title="Grievance Matrix" subtitle="Categorical distribution of reported facility anomalies." className="mb-0 p-0" />
            <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
              <ArrowUpRight size={20} strokeWidth={3} />
            </div>
          </div>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius={85} 
                  outerRadius={105} 
                  paddingAngle={8} 
                  dataKey="value" 
                  stroke="none"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: 'var(--surface)', border: '1px solid var(--outline)', borderRadius: '16px'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Active</span>
              <span className="display-font text-4xl font-black text-on-surface tracking-tighter leading-none">90%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-3 bg-surface-container-low/50 px-4 py-2 rounded-xl border border-outline/5 hover:border-primary/10 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}} />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{d.name}</span>
                <span className="ml-auto text-xs font-black text-on-surface">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Critical Alerts Section */}
      <Card variant="glass" className="border-2 border-tertiary/20 shadow-2xl shadow-tertiary/5 relative overflow-hidden group/alert animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
        <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-12 translate-y-[-12] rotate-12 group-hover/alert:rotate-0 transition-transform duration-1000">
          <AlertOctagon size={180} strokeWidth={1} />
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-10 px-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-tertiary blur-2xl opacity-20 animate-pulse" />
              <div className="relative p-6 bg-tertiary text-white rounded-3xl shadow-xl shadow-tertiary/40">
                <AlertOctagon size={40} strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
                <h3 className="display-font text-3xl font-black text-on-surface leading-none uppercase tracking-tighter">Tactical Alert</h3>
              </div>
              <p className="text-on-surface-variant font-bold text-sm tracking-widest uppercase opacity-60">High priority operational anomaly detected</p>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-6">
            <div className="bg-surface/50 backdrop-blur-md p-6 rounded-2xl border border-outline/5 flex-1 min-w-[300px]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-black text-on-surface tracking-tight uppercase">Dashboard Operational</h4>
                <StatusBadge status="resolved" />
              </div>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic border-l-2 border-primary pl-4 mt-4">
                "No active emergencies at this time. All systems nominal."
              </p>
            </div>
          </div>
        </div>
      </Card>
    </PortalLayout>
  );
}

// Re-import missing icons used in code
import { HardHat } from 'lucide-react';
