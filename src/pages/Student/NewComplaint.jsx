import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '../../layouts/PortalLayout';
import { Card, CardHeader } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { HOSTELS } from '../../constants/hostels';
import { 
  ArrowLeft, 
  Zap, 
  Droplet, 
  Brush, 
  Wifi, 
  MoreHorizontal, 
  MapPin, 
  FileText, 
  AlertTriangle,
  Send,
  ZapOff,
  LayoutGrid,
  Plus,
  FlameKindling,
  Hammer,
  Home,
  Palette,
  Wrench,
  Sparkles
} from 'lucide-react';

const categories = [
  { id: 'Electrical', icon: Zap, emoji: '⚡', color: '#facc15' },
  { id: 'Plumbing', icon: Wrench, emoji: '🔧', color: '#94a3b8' },
  { id: 'Water', icon: Droplet, emoji: '💧', color: '#38bdf8' },
  { id: 'Cleaning', icon: Sparkles, emoji: '🧹', color: '#22c55e' },
  { id: 'Internet', icon: Wifi, emoji: '🌐', color: '#ffffff' },
  { id: 'Carpentry', icon: Hammer, emoji: '🪑', color: '#854d0e' },
  { id: 'Housekeeping', icon: Home, emoji: '🏠', color: '#f97316' },
  { id: 'Painting', icon: Brush, emoji: '🎨', color: '#a855f7' },
  { id: 'Other', icon: MoreHorizontal, emoji: '💬', color: '#64748b' },
];

export default function NewComplaint() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    description: '',
    severity: 'normal'
  });

  const menuItems = [
    { id: 'dashboard', label: 'Overview', path: '/student/dashboard', icon: LayoutGrid },
    { id: 'new', label: 'Raise Issue', path: '/student/new-complaint', icon: Plus }
  ];

  const handleSubmit = (e, isEmergency = false) => {
    e.preventDefault();
    console.log("Submitting:", { ...formData, isEmergency });
    navigate('/student/dashboard');
  };

  return (
    <PortalLayout menuItems={menuItems} roleName="Student">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <button 
            onClick={() => navigate('/student/dashboard')} 
            className="group mb-8 inline-flex items-center gap-3 text-on-surface-variant hover:text-primary transition-all duration-300"
          >
            <div className="p-2 rounded-xl glass-panel group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <ArrowLeft size={18} strokeWidth={3} />
            </div>
            <span className="text-xs tracking-widest uppercase font-black">Back to Overview</span>
          </button>
          
          <h1 className="display-font text-5xl md:text-6xl font-black text-on-surface leading-[0.8] tracking-tighter mb-4 animate-in fade-in slide-in-from-left-6 duration-700">
            Report an <span className="text-primary text-glow-primary">Issue.</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg animate-in fade-in slide-in-from-left-8 duration-1000">
            Detailed intelligence helps us prioritize and resolve your grievance with clinical precision.
          </p>
        </div>

        <Card variant="glass" className="p-10 md:p-16 border-2 border-outline/5 relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary via-secondary to-tertiary opacity-80" />
          
          <form className="space-y-12" onSubmit={handleSubmit}>
            
            {/* Category Selection */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-outline/10 pb-4">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                  <LayoutGrid size={20} strokeWidth={3} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">1. Classification</h3>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const isActive = formData.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat.id})}
                      style={{ 
                        borderColor: isActive ? cat.color : '',
                        boxShadow: isActive ? `0 0 25px ${cat.color}30` : ''
                      }}
                      className={`
                        group relative p-8 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center gap-5 overflow-hidden
                        ${isActive 
                          ? `bg-surface-container-high border-primary scale-[1.02] ring-8 ring-white/5` 
                          : `bg-surface-container-low border-outline/5 text-on-surface-variant hover:bg-surface-container-high`
                        }
                      `}
                    >
                      {/* Accent Glow Background */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 opacity-10 animate-pulse pointer-events-none"
                          style={{ background: `radial-gradient(circle at center, ${cat.color} 0%, transparent 70%)` }}
                        />
                      )}
                      
                      <div className={`
                        p-5 rounded-2xl transition-all duration-500 relative
                        ${isActive ? 'bg-surface shadow-inner' : 'bg-surface opacity-40 group-hover:opacity-100 group-hover:scale-110'}
                      `}>
                        <Icon size={28} strokeWidth={isActive ? 3 : 2.5} style={{ color: isActive ? cat.color : '' }} />
                        
                        {/* Emoji Overlay */}
                        <div className="absolute -top-2 -right-2 text-xl drop-shadow-lg">
                          {cat.emoji}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                          {cat.id}
                        </span>
                        {isActive && (
                          <div className="h-1 w-8 rounded-full animate-in zoom-in duration-500" style={{ backgroundColor: cat.color }} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location & Description */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b border-outline/10 pb-4">
                <div className="p-2.5 bg-secondary/10 text-secondary rounded-xl">
                  <MapPin size={20} strokeWidth={3} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary">2. Situational Intel</h3>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <Select 
                  label="Hostel Block" 
                  icon={MapPin}
                  options={HOSTELS}
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  required
                />
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant/50 ml-1 block">Detailed Description</label>
                  <div className="relative group transition-all duration-300">
                    <div className="absolute left-5 top-5 text-on-surface-variant group-focus-within:text-primary transition-colors duration-300">
                      <FileText size={20} strokeWidth={2.5} />
                    </div>
                    <textarea 
                      rows="5" 
                      className="
                        w-full bg-surface-container-low border-2 border-outline/5 rounded-2xl p-6 pl-14 
                        text-on-surface outline-none transition-all duration-300 font-medium
                        focus:border-primary/40 focus:ring-8 focus:ring-primary/5
                        hover:border-primary/20 resize-none
                        placeholder:text-on-surface-variant/30
                      "
                      placeholder="Explain the technical or mechanical anomaly in detail..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Severity Selection */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-outline/10 pb-4">
                <div className="p-2.5 bg-tertiary/10 text-tertiary rounded-xl">
                  <AlertTriangle size={20} strokeWidth={3} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-tertiary">3. Criticality</h3>
              </div>
              
              <div className="flex flex-wrap gap-3 bg-surface-container-low p-2 rounded-2xl border-2 border-outline/5 w-fit">
                {[
                  { id: 'mild', label: 'Mild Anomaly', color: 'bg-emerald-500' },
                  { id: 'normal', label: 'Standard Case', color: 'bg-primary' },
                  { id: 'extreme', label: 'High Priority', color: 'bg-tertiary' }
                ].map(sev => (
                  <button
                    key={sev.id}
                    type="button"
                    onClick={() => setFormData({...formData, severity: sev.id})}
                    className={`
                      px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all duration-500 flex items-center gap-3
                      ${formData.severity === sev.id 
                        ? 'bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.1)] text-on-surface scale-105' 
                        : 'text-on-surface-variant opacity-50 hover:opacity-100 hover:bg-surface/50'
                      }
                    `}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${sev.color} ${formData.severity === sev.id ? 'animate-pulse' : ''}`} />
                    {sev.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Footer Actions */}
            <div className="pt-10 border-t border-outline/10 flex flex-col md:flex-row gap-6">
              <Button type="submit" className="flex-1 py-6 text-sm font-black uppercase tracking-[0.3em] gap-3 shadow-2xl shadow-primary/30 active:scale-[0.98] transition-transform">
                <Send size={20} strokeWidth={3} />
                Transmit Grievance
              </Button>
              
              <Button 
                type="button" 
                variant="danger" 
                onClick={(e) => handleSubmit(e, true)}
                className="py-6 px-10 text-sm font-black uppercase tracking-[0.3em] gap-3 bg-tertiary shadow-2xl shadow-tertiary/30 active:scale-[0.98] transition-transform"
              >
                <ZapOff size={20} strokeWidth={3} />
                Immediate Crisis
              </Button>
            </div>

            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant opacity-40">
              System generated logs will be archived for audit
            </p>
          </form>
        </Card>
      </div>
    </PortalLayout>
  );
}
