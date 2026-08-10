import React from 'react';
import { Laptop, Cpu, Layers, Database, Zap, Rocket, Users, Activity } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-[1240px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 items-center">
        
        {/* Left Column: Heading, Subheading & Metric Cards */}
        <div>
          <span className="inline-block text-xs font-extrabold tracking-widest text-emerald-600 uppercase mb-3">
            ARCHITECTURE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6">
            Built on a layered, scalable architecture
          </h2>
          <p className="text-base text-slate-500 leading-relaxed font-medium mb-10">
            React SPA → REST API Gateway → Microservice application layer → PostgreSQL + Redis + S3. Every layer documented in the SRS. Horizontal scaling, Docker-ready, CI/CD with GitHub Actions.
          </p>

          {/* 2x2 Metric Cards matching Figma Screenshot 1 */}
          <div className="grid grid-cols-2 gap-4">
            
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-900/5">
              <Zap className="text-amber-500 mb-3" size={20} />
              <div className="text-2xl font-black text-emerald-600 mb-1">&lt; 2s</div>
              <div className="text-xs font-semibold text-slate-400">Response Time</div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-900/5">
              <Rocket className="text-emerald-500 mb-3" size={20} />
              <div className="text-2xl font-black text-emerald-600 mb-1">&lt; 500ms</div>
              <div className="text-xs font-semibold text-slate-400">API Response</div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-900/5">
              <Users className="text-blue-500 mb-3" size={20} />
              <div className="text-2xl font-black text-slate-900 mb-1">500+</div>
              <div className="text-xs font-semibold text-slate-400">Concurrent Users</div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-900/5">
              <Activity className="text-emerald-500 mb-3" size={20} />
              <div className="text-2xl font-black text-emerald-600 mb-1">99.9%</div>
              <div className="text-xs font-semibold text-slate-400">Availability</div>
            </div>

          </div>
        </div>

        {/* Right Column: 4 Architecture Layers Stack matching Figma Screenshot 1 */}
        <div className="flex flex-col gap-4">
          
          {/* Layer 1: Client Layer */}
          <div className="bg-white border-l-4 border-l-emerald-500 border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5 relative overflow-hidden">
            <span className="absolute top-5 right-6 text-[10px] font-bold text-slate-300 uppercase tracking-wider">Layer 1</span>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <Laptop className="text-emerald-600" size={20} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">Client Layer</h3>
                <p className="text-xs text-slate-500 font-medium mb-3">Single-page React app with real-time updates via WebSocket.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">React 19</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">Tailwind CSS</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">Redux Toolkit</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">React Router</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">Axios</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">Socket.IO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: API Gateway */}
          <div className="bg-white border-l-4 border-l-cyan-400 border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5 relative overflow-hidden">
            <span className="absolute top-5 right-6 text-[10px] font-bold text-slate-300 uppercase tracking-wider">Layer 2</span>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
                <Cpu className="text-cyan-600" size={20} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">API Gateway</h3>
                <p className="text-xs text-slate-500 font-medium mb-3">Centralized entry point with authentication and request routing.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-600">REST API</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-600">JWT Middleware</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-600">Rate Limiting</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-600">CORS</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-600">HTTPS</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-600">Routing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 3: Application Services */}
          <div className="bg-white border-l-4 border-l-purple-500 border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5 relative overflow-hidden">
            <span className="absolute top-5 right-6 text-[10px] font-bold text-slate-300 uppercase tracking-wider">Layer 3</span>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                <Layers className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">Application Services</h3>
                <p className="text-xs text-slate-500 font-medium mb-3">Microservice-ready Node.js/Express or Spring Boot services.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">Auth Service</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">Project Service</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">Task Service</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">Sprint Service</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">Notification</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">Report Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 4: Data & Storage Layer */}
          <div className="bg-white border-l-4 border-l-indigo-500 border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5 relative overflow-hidden">
            <span className="absolute top-5 right-6 text-[10px] font-bold text-slate-300 uppercase tracking-wider">Layer 4</span>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                <Database className="text-indigo-600" size={20} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">Data & Storage Layer</h3>
                <p className="text-xs text-slate-500 font-medium mb-3">PostgreSQL system of record, Redis sessions/cache, S3 file storage.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">PostgreSQL</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">Redis Cache</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">AWS S3/MinIO</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">Email Service</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">Activity Logs</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">Migrations</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
