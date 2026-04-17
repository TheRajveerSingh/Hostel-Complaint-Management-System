import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '../../layouts/PortalLayout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  X, 
  Star, 
  MessageSquare,
  LayoutGrid,
  FileText,
  Activity,
  History,
  MapPin,
  Hash,
  Sparkles,
  Trash2,
  Trash,
  ChevronRight
} from 'lucide-react';

import { supabase } from '../../lib/supabase';
import { authService } from '../../lib/auth';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Feedback States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    const loadComplaints = async () => {
      const user = authService.getCurrentUser();
      if (!user) return;
      
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setComplaints(data);
      }
      setLoading(false);
    };
    loadComplaints();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("CONFIRMATION: Delete this complaint permanently?")) return;
    
    // Optimistic UI update
    setComplaints(complaints.filter(c => c.id !== id));
    
    try {
      const { error } = await supabase.from('complaints').delete().eq('id', id);
      if (error) throw error;
    } catch(err) {
      alert("Failed to delete complaint.");
      // Rollback would happen via reloading but we keep it simple here
    }
  };

  const handleFeedbackSubmit = async () => {
    if (rating === 0) {
      alert("Please provide a star rating.");
      return;
    }
    
    setIsSubmittingFeedback(true);
    const user = authService.getCurrentUser();
    
    try {
      const { error } = await supabase.from('feedback').insert([{
        complaint_id: selectedComplaint.id,
        student_id: user.id,
        rating: rating,
        comment: feedbackText
      }]);
      
      if (error) throw error;
      
      alert("Feedback submitted officially.");
      setSelectedComplaint(null);
      setRating(0);
      setHoverRating(0);
      setFeedbackText('');
    } catch(err) {
      console.error(err);
      alert("Failed to submit feedback.");
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Overview', path: '/student/dashboard', icon: LayoutGrid },
    { id: 'new', label: 'Raise Issue', path: '/student/new-complaint', icon: Plus }
  ];

  const stats = [
    { label: 'All Cases', value: complaints.length, color: 'text-primary', icon: FileText, bg: 'bg-primary/5' },
    { label: 'Pending', value: complaints.filter(c => c.status === 'pending').length, color: 'text-tertiary', icon: Clock, bg: 'bg-tertiary/5' },
    { label: 'Active', value: complaints.filter(c => c.status === 'in_progress').length, color: 'text-secondary', icon: Activity, bg: 'bg-secondary/5' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'resolved').length, color: 'text-success', icon: CheckCircle2, bg: 'bg-success/5' }
  ];

  return (
    <PortalLayout menuItems={menuItems} roleName="Student">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Student Command Center</span>
          </div>
          <h1 className="display-font text-5xl md:text-6xl font-black text-on-surface leading-[0.8] tracking-tighter mb-4">
            My <span className="text-primary text-glow-primary">Overview.</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg">
            Track and manage your institutional grievances with real-time updates and seamless interactions.
          </p>
        </div>
        <Button onClick={() => navigate('/student/new-complaint')} className="py-4 px-8 text-sm font-black uppercase tracking-widest gap-2 shadow-2xl shadow-primary/30">
          <Plus size={20} strokeWidth={3} />
          New Complaint
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        {stats.map((stat, idx) => {
          const Icon = stat.icon || Activity;
          return (
            <Card key={stat.label} variant="glass" className="p-8 border border-outline/10 group hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
              <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity`}>
                <Icon size={80} strokeWidth={1} />
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-black mb-1 block group-hover:text-primary transition-colors">{stat.label}</span>
              <span className={`display-font text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</span>
            </Card>
          );
        })}
      </div>

      {/* Main Table Area */}
      <Card variant="glass" className="p-0 overflow-hidden border border-outline/10 shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
        <div className="p-10 border-b border-outline/10 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/30">
          <CardHeader title="Grievance Repository" subtitle="All reports filed by you in the current academic year." className="mb-0" />
          <div className="flex gap-4">
            <Button variant="secondary" size="icon" className="shadow-none border border-outline/10 group">
              <Filter size={18} strokeWidth={2.5} className="group-hover:text-primary transition-colors" />
            </Button>
            <Button variant="secondary" className="font-black uppercase text-xs tracking-widest gap-2 shadow-none border border-outline/10 group">
              <Download size={18} strokeWidth={2.5} className="group-hover:text-primary transition-colors" />
              Download Log
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/[0.02]">
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Tracking ID</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Classification</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Timeline</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black">Current Status</th>
                <th className="px-10 py-6 text-[10px] tracking-[0.25em] uppercase text-on-surface-variant font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {loading ? (
                <tr><td colSpan="5" className="px-10 py-8 text-center text-on-surface-variant font-bold text-sm">Synchronizing data stream...</td></tr>
              ) : complaints.length === 0 ? (
                <tr><td colSpan="5" className="px-10 py-8 text-center text-on-surface-variant font-bold text-sm">No grievances reported yet.</td></tr>
              ) : complaints.map((c) => (
                <tr key={c.id} className="hover:bg-primary/[0.03] transition-all duration-300 group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      {c.status === 'resolved' && (
                        <div className="w-2 h-2 bg-tertiary rounded-full animate-ping shadow-lg shadow-tertiary/50" />
                      )}
                      <span className="font-black text-sm text-on-surface tracking-widest">
                        {c.id.substring(0, 8).toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-on-surface tracking-tight">{c.category}</span>
                      <span className="text-xs text-on-surface-variant/70 font-medium">{c.location}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2 text-on-surface-variant font-black text-[10px] tracking-widest">
                      <Calendar size={12} strokeWidth={3} className="text-primary" />
                      {new Date(c.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-10 py-8"><StatusBadge status={c.status} /></td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-3 items-center">
                      {c.status === 'pending' && (
                        <button 
                          onClick={(e) => handleDelete(e, c.id)}
                          className="p-2 text-error/60 hover:text-error hover:bg-error/10 rounded-lg transition-all"
                          title="Revoke File"
                        >
                          <Trash size={16} strokeWidth={2.5} />
                        </button>
                      )}
                      <button 
                        onClick={() => setSelectedComplaint(c)}
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all group/btn"
                      >
                        Audit Trail
                        <ChevronRight size={14} strokeWidth={4} className="transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail Modal Overlay */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-surface/80 animate-in fade-in duration-500 overflow-y-auto pt-20">
          <div className="absolute inset-0 z-[-1] mesh-gradient opacity-20" />
          
          <Card className="w-full max-w-2xl bg-surface-container-low border-2 border-outline-variant p-0 relative shadow-[0_64px_96px_-12px_rgba(30,27,75,0.2)] overflow-hidden">
            <div className="p-8 md:p-12">
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="absolute top-8 right-8 p-3 rounded-2xl bg-surface-container-high text-on-surface-variant hover:text-tertiary hover:rotate-90 transition-all duration-500"
              >
                <X size={20} strokeWidth={3} />
              </button>

              <div className="inline-flex p-5 bg-primary/10 text-primary rounded-2xl mb-10 ring-4 ring-primary/5">
                <FileText size={40} strokeWidth={2.5} />
              </div>
              
              <h2 className="display-font text-4xl md:text-5xl font-black text-on-surface leading-[0.9] tracking-tighter mb-6 uppercase tracking-wider">
                Case ID: {selectedComplaint.id.substring(0,8)}
              </h2>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-on-surface-variant/50 uppercase tracking-[0.2em] block">Category</span>
                  <span className="text-lg font-black text-on-surface uppercase tracking-tight">{selectedComplaint.category}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-on-surface-variant/50 uppercase tracking-[0.2em] block">Status</span>
                  <StatusBadge status={selectedComplaint.status} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-on-surface-variant/50 uppercase tracking-[0.2em] block">Location</span>
                  <div className="flex items-center gap-2 text-on-surface font-bold">
                    <MapPin size={16} className="text-secondary" strokeWidth={2.5} />
                    {selectedComplaint.location}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-on-surface-variant/50 uppercase tracking-[0.2em] block">Logged Date</span>
                  <div className="flex items-center gap-2 text-on-surface font-bold">
                    <Calendar size={16} className="text-primary" strokeWidth={2.5} />
                    {new Date(selectedComplaint.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-high/50 p-8 rounded-2xl border border-outline/5 mb-10 group hover:border-primary/10 transition-colors">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">Issue Description</h4>
                <p className="text-on-surface font-medium leading-relaxed italic text-lg opacity-80">
                  "{selectedComplaint.description || selectedComplaint.desc || 'Operational anomaly reported.'}"
                </p>
              </div>

              {selectedComplaint.status === 'resolved' && (
                <div className="p-10 bg-primary/5 rounded-3xl border-2 border-primary/20 relative group/feedback overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity">
                    <Star size={100} strokeWidth={1} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="display-font text-2xl font-black text-primary mb-2 uppercase tracking-tight">Resolution Feedback</h4>
                    <p className="text-sm text-on-surface-variant font-bold mb-8 leading-relaxed max-w-sm uppercase tracking-widest opacity-60">Please authenticate the quality of maintenance services provided.</p>
                    
                    <div className="flex space-x-2 text-tertiary mb-6">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} 
                          className="p-1 hover:scale-125 hover:rotate-12 transition-all duration-300"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star 
                            size={40} 
                            className={`transition-colors ${(hoverRating || rating) >= star ? 'fill-primary text-primary' : 'text-on-surface-variant/30'}`} 
                          />
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Enter operational commentary or details regarding the repair quality..."
                      className="w-full bg-surface-container border-2 border-outline/10 text-on-surface text-sm font-medium rounded-2xl p-5 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all mb-8 resize-none shadow-inner"
                      rows="3"
                    />

                    <Button 
                      onClick={handleFeedbackSubmit} 
                      disabled={isSubmittingFeedback || rating === 0} 
                      className={`w-full py-5 text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 active:scale-[0.98] ${rating === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmittingFeedback ? 'Transmitting Data...' : 'Verify & Submit Transcript'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-12 py-8 bg-surface-container-highest/50 flex items-center gap-4">
              <MessageSquare size={16} className="text-on-surface-variant" strokeWidth={3} />
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Connect with Warden for priority resolution</span>
            </div>
          </Card>
        </div>
      )}
    </PortalLayout>
  );
}

// Re-import icons that might have been missing in the original thought process but used in code
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react';
