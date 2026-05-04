import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Github, Chrome, Facebook } from 'lucide-react';
import { Button } from '../ui/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleSSO = (provider: string) => {
    setIsLoading(true);
    // Simulate SSO
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({ name: 'Traveler OTW', email: 'user@example.com' });
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {mode === 'login' ? 'Welcome Back!' : 'Start Your Journey'}
            </h2>
            <p className="text-slate-500 font-sans">
              {mode === 'login' 
                ? 'The smartest hotel deals are waiting.' 
                : 'Join the top 1% value travelers today.'}
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex justify-between px-6" 
              leftIcon={<Chrome size={20} className="text-brand-600" />}
              onClick={() => handleSSO('google')}
              isLoading={isLoading}
            >
              Continue with Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex justify-between px-6" 
              leftIcon={<Facebook size={20} className="text-blue-600" />}
              onClick={() => handleSSO('facebook')}
              isLoading={isLoading}
            >
              Continue with Facebook
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex justify-between px-6" 
              leftIcon={<Github size={20} />}
              onClick={() => handleSSO('github')}
              isLoading={isLoading}
            >
              Continue with GitHub
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-slate-300">
                <span className="bg-white px-4">OR EMAIL</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-brand-500 font-medium"
                  />
                </div>
              </div>
              <Button className="w-full" size="lg">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-slate-500 font-sans">
            {mode === 'login' ? "Don't have an account?" : 'Already using otwhotel?'}
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="ml-2 text-brand-600 font-bold hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
