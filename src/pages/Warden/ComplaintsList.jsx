import React, { useState } from 'react';
import PortalLayout from '../../layouts/PortalLayout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  User, 
  MapPin, 
  Settings2, 
  X,
  ChevronRight,
  HardHat,
  Users,
  LayoutGrid,
  ShieldAlert,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { authService } from '../../lib/auth';

const mockComplaints = [
  { id: 'C-1045', student: 'Rajveer Singh', hostel: 'M-Block Hostel', category: 'Electrical', priority: 'High', status: 'Pending', date: '2026-04-01', assignedTo: null, isEmergency: true },
  { id: 'C-1042', student: 'Amit Kumar', hostel: 'M-Block Hostel', category: 'Plumbing', priority: 'Normal', status: 'In Progress', date: '2026-04-01', assignedTo: 'S-002', isEmergency: false },
  { id: 'C-1038', student: 'Rohan Sharma', hostel: 'Senbegam Hostel', category: 'Internet', priority: 'Normal', status: 'Resolved', date: '2026-03-30', assignedTo: 'S-005', isEmergency: false },
];

const mockStaff = [
  { id: 'S-001', name: 'Ramesh', role: 'Electrician', isBusy: false },
  { id: 'S-002', name: 'Suresh', role: 'Plumber', isBusy: true },
  { id: 'S-003', name: 'Alok', role: 'Electrician', isBusy: false },
];

export default function WardenComplaints() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentUser = authService.getCurrentUser();
  const wardenHostel = currentUser?.hostel_id || 'M-Block Hostel'; // Fallback for dev

  const filteredComplaints = mockComplaints.filter(c => 
    c.hostel === wardenHostel && 
    (c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
     c.student.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const menuItems = [
    { id: 'dashboard', label: 'Op Center', path: '/warden/dashboard', icon: LayoutGrid },
    { id: 'complaints', label: 'Grievances', path: '/warden/complaints', icon: ClipboardList },
    { id: 'staff', label: 'Maintenance', path: '/warden/staff', icon: HardHat },
    { id: 'students', label: 'Residents', path: '/warden/students', icon: Users }
  ];

  const stats = [
    { label: 'Total Logs', value: filteredComplaints.length, color: 'text-on-surface', icon: ClipboardList },
    { label: 'Unassigned', value: filteredComplaints.filter(c => !c.assignedTo).length, color: 'text-tertiary', icon: Clock },
    { label: 'Criticality', value: filteredComplaints.filter(c => c.isEmergency).length, color: 'text-error', icon: AlertOctagon },
    { label: 'Resolution', value: filteredComplaints.filter(c => c.status === 'Resolved').length, color: 'text-success', icon: CheckCircle2 }
  ];

  return (
    <PortalLayout menuItems={menuItems} roleName="Warden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <ShieldAlert size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Intelligence Terminal • Grievance Matrix</span>
          </div>
          <h1 className="display-font text-5xl md:text-6xl font-black text-on-surface leading-[0.8] tracking-tighter mb-4">
            Issue <span className="text-primary text-glow-primary">Tracking.</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg mb-2">
            Global lifecycle monitoring of all facility anomalies and tactical deployments.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="font-black uppercase text-xs tracking-widest gap-2 shadow-none border border-outline/10 h-14">
            <Download size={18} strokeWidth={2.5} />
            Export Archive
          </Button>
          <Button className="font-black uppercase text-xs tracking-widest gap-2 shadow-2xl shadow-primary/30 h-14 px-8">
            <Filter size={18} strokeWidth={2.5} />
            Advanced Matrix
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
          <CardHeader title="Grievance Registry" subtitle="Comprehensive list of reported incidents across all hostel sectors." className="mb-0 p-0" />
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Search ID, Student or Block..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline/10 rounded-xl py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest text-on-surface outline-none focus:border-primary/40 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/[0.02]">
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Inc. ID</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Resident Source</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Classification</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Specialist Assigned</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Tactical Status</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black text-right">Operational Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5 font-medium">
              {filteredComplaints.map((c, idx) => (
                <tr key={c.id} className={`hover:bg-primary/[0.03] transition-all duration-300 group ${c.isEmergency ? 'bg-error/[0.03]' : ''}`}>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-1.5 h-6 rounded-full ${c.isEmergency ? 'bg-error animate-pulse shadow-glow-error' : 'bg-primary/20 group-hover:bg-primary transition-colors'}`} />
                      <div className="flex flex-col">
                        <span className={`font-black text-sm tracking-widest ${c.isEmergency ? 'text-error' : 'text-on-surface'}`}>
                          {c.id}
                        </span>
                        {c.isEmergency && <span className="text-[8px] font-black uppercase text-error tracking-tighter">Emergency Alert</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-on-surface tracking-tight uppercase">{c.student}</span>
                      <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <MapPin size={10} strokeWidth={3} className="text-primary" />
                        {c.hostel}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-xs font-black text-on-surface-variant uppercase tracking-widest py-1.5 px-3 bg-surface-container-low rounded-lg border border-outline/5 italic">
                      {c.category}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    {c.assignedTo ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <HardHat size={14} strokeWidth={3} />
                        </div>
                        <span className="text-xs font-black uppercase text-on-surface tracking-widest">{c.assignedTo}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-tertiary animate-pulse">
                        <Clock size={16} strokeWidth={3} />
                        <span className="text-[10px] font-black uppercase tracking-widest font-black">Standby Deployment</span>
                      </div>
                    )}
                  </td>
                  <td className="px-10 py-8">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-10 py-8 text-right">
                    <Button 
                      variant="secondary" 
                      className="font-black uppercase text-[10px] tracking-[0.2em] gap-2 bg-surface hover:bg-primary/10 hover:text-primary border border-outline/10 shadow-none transition-all duration-500 hover:-translate-x-1"
                      onClick={() => setSelectedComplaint(c)}
                    >
                      Tactical Manage
                      <ChevronRight size={14} strokeWidth={4} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Management Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-surface/40 backdrop-blur-xl animate-in fade-in duration-500">
          <Card variant="glass" className="w-full max-w-4xl p-0 border border-outline/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden relative animate-in zoom-in-95 duration-500">
            <div className={`absolute top-0 left-0 w-full h-2 ${selectedComplaint.isEmergency ? 'bg-error' : 'bg-primary'}`} />
            
            <div className="p-12">
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${selectedComplaint.isEmergency ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                      <ShieldAlert size={32} strokeWidth={3} className={selectedComplaint.isEmergency ? 'animate-pulse' : ''} />
                    </div>
                    <div>
                      <h2 className="display-font text-4xl font-black text-on-surface tracking-tighter uppercase leading-none mb-2">
                        {selectedComplaint.id} <span className="text-on-surface-variant opacity-20">/ LOG</span>
                      </h2>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={selectedComplaint.status} />
                        {selectedComplaint.isEmergency && (
                          <span className="px-3 py-1 bg-error text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full">Crisis Event</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedComplaint(null)} 
                  className="p-3 bg-surface-container-low text-on-surface-variant hover:text-error hover:bg-error/10 rounded-2xl transition-all duration-300"
                >
                  <X size={24} strokeWidth={3} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 border-b border-outline/5 pb-2">Intelligence Source</h4>
                    <div className="flex items-center gap-4 bg-surface-container-low p-6 rounded-3xl border border-outline/5">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                        {selectedComplaint.student.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="block text-sm font-black text-on-surface uppercase tracking-tight">{selectedComplaint.student}</span>
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60 italic">{selectedComplaint.hostel} • Room 402</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-surface-container-low rounded-3xl border border-outline/5">
                      <div className="flex items-center gap-2 mb-2 opacity-40">
                        <ClipboardList size={14} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Category</span>
                      </div>
                      <span className="text-xs font-black text-on-surface uppercase">{selectedComplaint.category}</span>
                    </div>
                    <div className="p-6 bg-surface-container-low rounded-3xl border border-outline/5">
                      <div className="flex items-center gap-2 mb-2 opacity-40">
                        <Calendar size={14} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Entry Date</span>
                      </div>
                      <span className="text-xs font-black text-on-surface uppercase">{selectedComplaint.date}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 border-b border-outline/5 pb-2">Deployment Control</h4>
                  
                  {selectedComplaint.assignedTo ? (
                    <div className="bg-secondary/5 p-8 rounded-[2rem] border border-secondary/20 relative overflow-hidden group/assigned">
                      <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover/assigned:scale-110 transition-transform">
                        <HardHat size={80} strokeWidth={1} />
                      </div>
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary block mb-4">Tactical Lead Assigned</span>
                        <h5 className="display-font text-3xl font-black text-on-surface uppercase tracking-tighter mb-8">{selectedComplaint.assignedTo}</h5>
                        <Button variant="danger" size="lg" className="w-full py-5 text-[10px] font-black uppercase tracking-widest gap-2 bg-error shadow-xl shadow-error/20">
                          <ShieldAlert size={16} strokeWidth={3} />
                          Revoke Deployment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-2">Select Tactical Specialist</label>
                        <div className="relative">
                          <select className="w-full bg-surface-container-low border-2 border-outline/5 rounded-2xl p-5 pl-14 text-sm font-black uppercase tracking-widest text-on-surface appearance-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all">
                            <option value="">Awaiting Specialist Selection...</option>
                            {mockStaff.filter(s => !s.isBusy).map(staff => (
                              <option key={staff.id} value={staff.id}>{staff.id} - {staff.name} ({staff.role})</option>
                            ))}
                          </select>
                          <HardHat size={24} strokeWidth={3} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                        </div>
                      </div>
                      <Button className="w-full py-6 text-sm font-black uppercase tracking-[0.3em] gap-3 bg-primary shadow-2xl shadow-primary/30">
                        Initiate Deployment
                        <ArrowUpRight size={20} strokeWidth={4} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-surface-container-highest/30 p-6 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Live audit logging active for this session</span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4 decoration-2">
                  View full history log
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Decorative ambient background */}
      <div className="fixed top-1/4 right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] pointer-events-none z-[-1]" />
    </PortalLayout>
  );
}
