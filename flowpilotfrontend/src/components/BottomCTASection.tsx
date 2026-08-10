import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface BottomCTASectionProps {
  onOpenDemo?: () => void;
}

export const BottomCTASection: React.FC<BottomCTASectionProps> = ({ onOpenDemo }) => {
  return (
    <section className="bg-[#0b0f19] text-white py-28 px-6 relative overflow-hidden">
      {/* Background Ambient Glow & Floating 3D Cubes */}
      <div className="absolute top-1/2 left-10 w-[50vw] h-[50vw] bg-emerald-500/15 blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-[40vw] h-[40vw] bg-purple-500/10 blur-[150px] pointer-events-none"></div>

      {/* Floating Translucent 3D Glass Cubes matching Figma Screenshot 5 */}
      <div className="absolute top-12 left-16 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md rotate-12 animate-cube-1 pointer-events-none shadow-2xl"></div>
      <div className="absolute bottom-20 right-16 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md -rotate-12 animate-cube-2 pointer-events-none shadow-2xl"></div>

      <div className="max-w-[900px] mx-auto text-center relative z-10">
        <span className="inline-block text-xs font-extrabold tracking-widest text-emerald-400 uppercase mb-4">
          GET STARTED
        </span>

        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          Ready to transform <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">project management?</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-[650px] mx-auto leading-relaxed mb-10 font-medium">
          Join 500+ engineering teams who replaced scattered spreadsheets, email threads, and siloed tools with one unified Agile workspace built to the IPMT SRS specification.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer">
            <span>Start Free Trial</span>
            <ArrowRight size={16} />
          </button>
          
          <button 
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-extrabold text-sm transition-all cursor-pointer shadow-sm"
          >
            Schedule Demo
          </button>
        </div>

        {/* Sub-features checklist */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> No credit card required</span>
          <span className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Free 14-day trial</span>
          <span className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Cancel anytime</span>
        </div>

      </div>
    </section>
  );
};
