import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PortalLayout from '../../layouts/PortalLayout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import { 
  ArrowLeft, 
  MapPin, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Hammer,
  Send,
  User,
  Calendar,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function StaffComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('In Progress');

  const menuItems = [
    { id: 'tasks', label: 'My Queue', path: '/staff/dashboard', icon: Hammer }
  ];

  const complaintId = id || 'C-1042';

  return (
    <PortalLayout menuItems={menuItems} roleName="Staff">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-12">
          <button 
            onClick={() => navigate('/staff/dashboard')} 
            className="group mb-8 inline-flex items-center gap-3 text-on-surface-variant hover:text-secondary transition-all duration-300"
          >
            <div className="p-2 rounded-xl glass-panel group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
              <ArrowLeft size={18} strokeWidth={3} />
            </div>
            <span className="text-xs tracking-widest uppercase font-black">Back to Queue</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Reference: {complaintId}</span>
                </div>
                <StatusBadge status={status} />
              </div>
              <h1 className="display-font text-5xl md:text-6xl font-black text-on-surface leading-[0.8] tracking-tighter mb-4 animate-in fade-in slide-in-from-left-6 duration-700">
                Plumbing <span className="text-secondary text-glow-primary">Protocol.</span>
              </h1>
              <p className="text-on-surface-variant font-medium text-lg max-w-lg mb-2">
                Severe leakage identified in Bathroom Block A, 2nd Floor.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline/5 animate-in fade-in slide-in-from-right-6 duration-700">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                <Calendar size={20} strokeWidth={3} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block opacity-60">Deployment Date</span>
                <span className="text-sm font-black text-on-surface uppercase tracking-tight">Oct 24, 2023 • 14:30</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Intelligence Card */}
          <Card variant="glass" className="lg:col-span-2 p-10 md:p-14 border border-outline/10 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-secondary via-primary to-success opacity-80" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="space-y-3 p-6 bg-surface-container-low rounded-2xl border border-outline/5">
                <div className="flex items-center gap-3 text-secondary mb-1">
                  <MapPin size={18} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Operational Zone</span>
                </div>
                <span className="text-sm font-black text-on-surface uppercase tracking-tight block">Bathroom 2nd Floor, Hostel A</span>
              </div>
              
              <div className="space-y-3 p-6 bg-surface-container-low rounded-2xl border border-outline/5">
                <div className="flex items-center gap-3 text-primary mb-1">
                  <Tag size={18} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Classification</span>
                </div>
                <span className="text-sm font-black text-on-surface uppercase tracking-tight block">Mechanical / Plumbing</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-on-surface-variant font-black uppercase text-[10px] tracking-widest border-b border-outline/5 pb-4">
                  <FileText size={16} strokeWidth={3} />
                  Narrative Intelligence
                </div>
                <div className="p-8 bg-surface-container-low/50 rounded-3xl border border-outline/5 relative italic text-on-surface leading-relaxed font-medium text-lg">
                  <div className="absolute top-4 left-4 text-secondary/20">
                    <AlertCircle size={40} strokeWidth={1} />
                  </div>
                  "The main sink pipe is leaking heavily onto the floor. Needs a washer replacement. Water flow has been restricted as a temporary measure."
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-on-surface-variant font-black uppercase text-[10px] tracking-widest border-b border-outline/5 pb-4">
                  <ImageIcon size={16} strokeWidth={3} />
                  Visual Documentation
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="aspect-square bg-surface-container-high rounded-2xl border-2 border-outline/5 flex flex-col items-center justify-center gap-3 group hover:border-secondary transition-all cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ImageIcon className="text-on-surface-variant group-hover:text-secondary group-hover:scale-110 transition-all" size={24} strokeWidth={1.5} />
                      <span className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant">View Evidence</span>
                    </div>
                  ))}
                  <div className="aspect-square bg-surface-container-low rounded-2xl border border-dashed border-outline/20 flex flex-col items-center justify-center gap-3 opacity-40">
                    <ImageIcon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="aspect-square bg-surface-container-low rounded-2xl border border-dashed border-outline/20 flex flex-col items-center justify-center gap-3 opacity-40">
                    <ImageIcon size={24} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action & Status Card */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            <Card variant="glass" className="p-8 border border-outline/10 shadow-2xl relative overflow-hidden group/status">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <Clock size={20} strokeWidth={3} />
                </div>
                <h3 className="display-font text-2xl font-black text-on-surface tracking-tighter uppercase">Update Status</h3>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setStatus('In Progress')}
                  className={`
                    w-full p-6 rounded-2xl transition-all duration-500 flex items-center justify-between group/btn
                    ${status === 'In Progress' 
                      ? 'bg-secondary text-white shadow-xl shadow-secondary/30 ring-4 ring-secondary/10' 
                      : 'bg-surface-container-low border border-outline/5 text-on-surface-variant hover:border-secondary/40'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <Clock size={20} strokeWidth={3} className={status === 'In Progress' ? 'animate-spin-slow' : ''} />
                    <span className="text-xs font-black uppercase tracking-widest">In Progress</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={4} className={status === 'In Progress' ? 'opacity-100' : 'opacity-0'} />
                </button>
                
                <button 
                  onClick={() => setStatus('Resolved')}
                  className={`
                    w-full p-6 rounded-2xl transition-all duration-500 flex items-center justify-between group/btn
                    ${status === 'Resolved' 
                      ? 'bg-success text-white shadow-xl shadow-success/30 ring-4 ring-success/10' 
                      : 'bg-surface-container-low border border-outline/5 text-on-surface-variant hover:border-success/40'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle2 size={20} strokeWidth={3} />
                    <span className="text-xs font-black uppercase tracking-widest">Resolved</span>
                  </div>
                  <ChevronRight size={16} strokeWidth={4} className={status === 'Resolved' ? 'opacity-100' : 'opacity-0'} />
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-outline/5 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-on-surface-variant/10 text-on-surface-variant rounded-lg">
                    <ShieldAlert size={16} strokeWidth={2.5} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 leading-relaxed italic">
                    Resolution will trigger an automated alert to the resident and warden logs.
                  </p>
                </div>
                
                <Button className="w-full py-6 text-sm font-black uppercase tracking-[0.3em] gap-3 bg-surface hover:bg-secondary/10 border border-outline/10 text-on-surface shadow-none hover:text-secondary group transition-all">
                  <User size={18} strokeWidth={3} className="group-hover:translate-x-[-2px] transition-transform" />
                  Assign Co-worker
                </Button>
              </div>

              {/* Decorative background icon */}
              <div className="absolute bottom-[-20] right-[-20] opacity-[0.03] select-none pointer-events-none group-hover/status:scale-110 transition-transform duration-1000">
                <CheckCircle2 size={120} strokeWidth={1} />
              </div>
            </Card>

            <Card variant="glass" className="p-8 border border-outline/10 bg-secondary/[0.02]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                  <Send size={16} strokeWidth={3} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Communication</h4>
              </div>
              <textarea 
                className="w-full bg-surface-container-low border border-outline/5 rounded-xl p-4 text-sm font-medium outline-none focus:border-secondary/40 transition-all min-h-[120px] resize-none"
                placeholder="Transmitting log update? Enter technical notes here..."
              />
              <Button size="sm" className="mt-4 bg-secondary w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-secondary/20">
                Update Tactical Log
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
