import React from 'react';
import PortalLayout from '../../layouts/PortalLayout';
import { Card, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MapPin, 
  Mail, 
  Hash, 
  Calendar, 
  ChevronRight,
  ClipboardList,
  LayoutGrid,
  HardHat,
  GraduationCap
} from 'lucide-react';

const mockStudents = [
  { name: 'Rajveer Singh', reg: '21BCE0456', email: 'rajveer@college.edu', hostel: 'Hostel B', room: '102', join: '2023-08-01' },
  { name: 'Amit Kumar', reg: '21BCE0123', email: 'amit@college.edu', hostel: 'Hostel A', room: '304', join: '2023-08-01' }
];

export default function WardenStudentList() {
  const menuItems = [
    { id: 'dashboard', label: 'Op Center', path: '/warden/dashboard', icon: LayoutGrid },
    { id: 'complaints', label: 'Grievances', path: '/warden/complaints', icon: ClipboardList },
    { id: 'staff', label: 'Maintenance', path: '/warden/staff', icon: HardHat },
    { id: 'students', label: 'Residents', path: '/warden/students', icon: Users }
  ];

  const stats = [
    { label: 'Total Residents', value: 1240, color: 'text-on-surface', icon: Users },
    { label: 'Active Logs', value: 42, color: 'text-primary', icon: ClipboardList },
    { label: 'New This Month', value: 12, color: 'text-success', icon: Calendar },
    { label: 'Expiring Soon', value: 5, color: 'text-tertiary', icon: Hash }
  ];

  return (
    <PortalLayout menuItems={menuItems} roleName="Warden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <GraduationCap size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Resident Management • Student Registry</span>
          </div>
          <h1 className="display-font text-5xl md:text-6xl font-black text-on-surface leading-[0.8] tracking-tighter mb-4">
            Resident <span className="text-primary text-glow-primary">Directory.</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg mb-2">
            Centralized database of all active residents, housing allocations, and contact intelligence.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="font-black uppercase text-xs tracking-widest gap-2 shadow-none border border-outline/10 h-14">
            <Download size={18} strokeWidth={2.5} />
            Export Registry
          </Button>
          <Button className="font-black uppercase text-xs tracking-widest gap-2 shadow-2xl shadow-primary/30 h-14 px-8">
            <Filter size={18} strokeWidth={2.5} />
            Sector Filter
          </Button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} variant="glass" className="p-8 border border-outline/10 group hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={80} strokeWidth={1} />
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-6 border border-outline/5 group-hover:scale-110 transition-transform duration-500">
                <Icon size={24} strokeWidth={2.5} className={stat.color} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-black mb-1 block group-hover:text-primary transition-colors">{stat.label}</span>
              <span className={`display-font text-5xl font-black ${stat.color} tracking-tighter shadow-sm`}>{stat.value}</span>
            </Card>
          );
        })}
      </div>

      {/* Main Table Area */}
      <Card variant="glass" className="p-0 overflow-hidden border border-outline/10 shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
        <div className="p-10 border-b border-outline/10 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/30">
          <CardHeader title="Resident Registry" subtitle="Active student personnel currently allocated to hostel blocks." className="mb-0 p-0" />
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Search by Registration or Name..." 
              className="w-full bg-surface-container-low border border-outline/10 rounded-xl py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest text-on-surface outline-none focus:border-primary/40 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/[0.02]">
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Resident Identity</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Registration</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Communication Loop</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Strategic Allocation</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black text-right">Registry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5 font-medium">
              {mockStudents.map((s, idx) => (
                <tr key={s.reg} className="hover:bg-primary/[0.03] transition-all duration-300 group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs group-hover:scale-110 transition-transform">
                        {s.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-black text-sm text-on-surface tracking-tight uppercase">
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <Hash size={12} className="text-on-surface-variant opacity-60" strokeWidth={3} />
                      <span className="font-mono text-sm text-on-surface-variant tracking-widest font-black uppercase">
                        {s.reg}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2 text-primary hover:underline underline-offset-4 cursor-pointer decoration-2 transition-all">
                      <Mail size={12} strokeWidth={3} />
                      <span className="text-xs font-black uppercase tracking-tight">{s.email}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={12} className="text-primary" strokeWidth={3} />
                        <span className="text-sm font-black text-on-surface tracking-tight uppercase">{s.hostel}</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-60">
                        Room {s.room} • Wing East
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-black text-on-surface-variant tracking-widest uppercase">{s.join}</span>
                      <span className="text-[8px] text-on-surface-variant font-black uppercase tracking-widest opacity-40">System Synced</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Decorative ambient background */}
      <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[160px] pointer-events-none z-[-1]" />
    </PortalLayout>
  );
}
