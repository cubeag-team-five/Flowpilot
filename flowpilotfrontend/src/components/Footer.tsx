import React from 'react';
import { LayoutGrid, Globe, Share2, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070a12] text-slate-400 py-16 px-6 border-t border-slate-900">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Main Footer Links Columns Grid matching Figma Screenshot 4 */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold shadow-sm">
                <LayoutGrid size={18} />
              </div>
              <span className="font-black text-xl text-white tracking-tight">IPMT</span>
            </div>

            <p className="text-xs text-slate-500 max-w-[260px] leading-relaxed mb-6 font-medium">
              The enterprise Agile workspace for distributed teams. Built from a 19-page SRS.
            </p>

            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                <Globe size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                <Share2 size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Col 3: PRODUCT */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">PRODUCT</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scrum Board</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sprint Planning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Notifications</a></li>
              <li><a href="#" className="hover:text-white transition-colors">What's New</a></li>
            </ul>
          </div>

          {/* Col 4: MODULES */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">MODULES</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tasks</a></li>
              <li><a href="#" className="hover:text-white font-bold text-white transition-colors">Sprint Mgmt</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Administration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">User Mgmt</a></li>
            </ul>
          </div>

          {/* Col 5: SOLUTIONS */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">SOLUTIONS</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Startups</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Agencies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Remote Teams</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IT Organizations</a></li>
            </ul>
          </div>

          {/* Col 6: RESOURCES & LEGAL */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">RESOURCES</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium mb-6">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Newsletter Subscription matching Figma Screenshot 4 */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 max-w-[360px] w-full">
            <input 
              type="email" 
              placeholder="your@company.com" 
              className="bg-slate-900/90 border border-slate-800 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 flex-1"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-xs">
              Subscribe
            </button>
          </div>

          <div className="text-xs text-slate-600 font-medium">
            © 2026 IPMT • Built for Agile teams that ship faster.
          </div>
        </div>

      </div>
    </footer>
  );
};
