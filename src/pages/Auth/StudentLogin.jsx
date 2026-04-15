import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardFooter } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { HOSTELS } from '../../constants/hostels';
import { Mail, Lock, User, Building2, MapPin, Hash, ArrowLeft, ShieldCheck } from 'lucide-react';
import { authService } from '../../lib/auth';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    college_email: '',
    hostel_id: '',
    room_number: '',
    registration_number: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        // Login flow
        await authService.login(formData.college_email, formData.password);
        navigate('/student/dashboard');
      } else {
        // Register flow
        await authService.register({ ...formData, email: formData.college_email, role: 'student' });
        setError('Registration successful! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mesh-gradient relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[10%] right-[10%] w-[35%] h-[50%] rounded-full bg-primary/20 blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[35%] h-[50%] rounded-full bg-secondary/10 blur-[130px] animate-pulse pointer-events-none" />
      
      <div className="w-full max-w-xl z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <button 
          className="mb-10 group inline-flex items-center space-x-3 text-on-surface-variant hover:text-primary transition-all duration-300" 
          onClick={() => navigate('/')}
        >
          <div className="p-2 rounded-xl glass-panel group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
            <ArrowLeft size={18} strokeWidth={3} />
          </div>
          <span className="text-xs tracking-widest uppercase font-black">Back to Portals</span>
        </button>

        <Card className="glass-panel p-10 md:p-14 border border-outline/10 shadow-2xl overflow-hidden relative group/card">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary via-secondary to-tertiary opacity-80" />
          
          <div className="mb-12 relative">
            <div className="inline-flex p-4 bg-primary/10 text-primary rounded-2xl mb-8 ring-4 ring-primary/5">
              <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
            
            <h2 className="display-font text-4xl md:text-5xl font-black text-on-surface leading-[0.9] tracking-tighter mb-4">
              {isLogin ? 'Student Login' : 'Student Registry'}
            </h2>
            <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-md">
              {isLogin ? 'Secure access for verified hostel residents.' : 'Register below to access your institutional grievance dashboard.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest border ${error.includes('successful') ? 'bg-success/10 border-success/20 text-success' : 'bg-error/10 border-error/20 text-error'}`}>
                {error}
              </div>
            )}
            {!isLogin && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-500">
                <Input 
                  label="Full Name" 
                  icon={User}
                  placeholder="e.g. John Doe" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
                <Input 
                  label="Registration Number" 
                  icon={Hash}
                  placeholder="e.g. 21BCE0456" 
                  value={formData.registration_number}
                  onChange={e => setFormData({...formData, registration_number: e.target.value})}
                  required 
                />
                <Select 
                  label="Hostel" 
                  icon={Building2}
                  options={HOSTELS}
                  value={formData.hostel_id}
                  onChange={e => setFormData({...formData, hostel_id: e.target.value})}
                  required 
                />
                <Input 
                  label="Room Number" 
                  icon={MapPin}
                  placeholder="e.g. 420" 
                  value={formData.room_number}
                  onChange={e => setFormData({...formData, room_number: e.target.value})}
                  required 
                />
              </div>
            )}
            
            <Input 
              label="College Email" 
              type="email" 
              icon={Mail}
              placeholder="john.doe@college.edu" 
              value={formData.college_email}
              onChange={e => setFormData({...formData, college_email: e.target.value})}
              containerClassName={!isLogin ? '' : 'animate-in slide-in-from-top-4 duration-500'}
              required 
            />
            
            <Input 
              label="Password" 
              type="password" 
              icon={Lock}
              placeholder="••••••••" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              containerClassName={!isLogin ? '' : 'animate-in slide-in-from-top-4 duration-500 delay-100'}
              required 
            />

            <Button type="submit" className="w-full mt-10 py-5 text-lg font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 group relative overflow-hidden">
              <span className="relative z-10">{isLogin ? 'Access Portal' : 'Submit Application'}</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-45deg]" />
            </Button>
          </form>

          <CardFooter className="text-center pt-10 mt-10">
            <span className="text-sm font-semibold text-on-surface-variant">
              {isLogin ? "Don't have an account yet? " : "Already verified? "}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-secondary-container transition-colors font-black decoration-primary/40 decoration-2 underline-offset-8 underline"
              >
                {isLogin ? 'Register Portal' : 'Login Access'}
              </button>
            </span>
          </CardFooter>
        </Card>
      </div>
      
      
    </div>
  );
}
