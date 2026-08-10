import React from 'react';
import { MessageSquare, Paperclip, Video, Zap } from 'lucide-react';

export const CollaborationSection: React.FC = () => {
  const teamMembers = [
    { name: 'Aryan Kapoor', role: 'Scrum Master', tasks: '8 tasks', avatar: 'AK', bg: 'bg-emerald-500', dot: 'bg-emerald-400' },
    { name: 'Sneha Rao', role: 'Frontend Dev', tasks: '12 tasks', avatar: 'SR', bg: 'bg-purple-500', dot: 'bg-purple-400' },
    { name: 'Mihir Khatri', role: 'Backend Dev', tasks: '9 tasks', avatar: 'MK', bg: 'bg-cyan-400', dot: 'bg-cyan-300' },
    { name: 'Priya Rajan', role: 'QA Engineer', tasks: '6 tasks', avatar: 'PR', bg: 'bg-emerald-400', dot: 'bg-emerald-300' },
    { name: 'Ankush Nair', role: 'Product Owner', tasks: '4 tasks', avatar: 'AN', bg: 'bg-indigo-500', dot: 'bg-indigo-400' },
    { name: 'Divya Mehta', role: 'UI Designer', tasks: '7 tasks', avatar: 'DM', bg: 'bg-teal-400', dot: 'bg-teal-300' }
  ];

  return (
    <section className="py-24 px-6 max-w-[1240px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 items-center">
        
        {/* Left Column: Heading & 4 Feature Items */}
        <div>
          <span className="inline-block text-xs font-extrabold tracking-widest text-emerald-600 uppercase mb-3">
            REAL-TIME COLLABORATION
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6">
            Your team, in perfect <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">sync</span>
          </h2>
          <p className="text-base text-slate-500 leading-relaxed font-medium mb-10">
            Online presence indicators, @mention notifications, threaded comments with attachments, video meeting links embedded in sprint ceremonies, and real-time task editing across time zones.
          </p>

          {/* 4 Feature Rows matching Figma Screenshot 2 */}
          <div className="flex flex-col gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <MessageSquare className="text-slate-600" size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">Threaded Comments</h4>
                <p className="text-xs text-slate-500 font-medium">Task discussions with @mentions, edit history, and emoji reactions.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <Paperclip className="text-slate-600" size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">File Attachments</h4>
                <p className="text-xs text-slate-500 font-medium">Attach designs, specs, and assets directly to tasks. Version-tracked.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <Video className="text-slate-600" size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">Meeting Integration</h4>
                <p className="text-xs text-slate-500 font-medium">One-click video links embedded into sprint ceremonies.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <Zap className="text-slate-600" size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">Live Task Editing</h4>
                <p className="text-xs text-slate-500 font-medium">Multiple team members update fields simultaneously via Socket.IO.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: 6 Avatar Grid & Live Activity Thread matching Figma Screenshot 2 */}
        <div className="flex flex-col gap-6">
          
          {/* 6 Avatar Presence Grid */}
          <div className="grid grid-cols-3 gap-4">
            {teamMembers.map((mem, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm shadow-slate-900/5 flex flex-col items-center">
                <div className="relative mb-2">
                  <div className={`w-12 h-12 rounded-full ${mem.bg} text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                    {mem.avatar}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ${mem.dot} border-2 border-white`}></span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{mem.name}</h4>
                <p className="text-[10px] text-slate-400 font-medium">{mem.role}</p>
                <span className="text-[10px] font-bold text-emerald-600 mt-1">{mem.tasks}</span>
              </div>
            ))}
          </div>

          {/* Live Thread Activity Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-extrabold text-slate-900">IPMT-028 • Auth Module</div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 uppercase">
                IN PROGRESS
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-slate-50 p-3 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  AK
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 font-medium">JWT refresh token logic needs edge case for concurrent requests.</span>
                    <span className="text-[10px] text-slate-400">3m</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-cyan-400 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  MK
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 font-medium">On it — using Redis lock. PR by EOD.</span>
                    <span className="text-[10px] text-slate-400">1m</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-purple-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  SR
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 font-medium">@MK ping me before merge — token storage on frontend needs to match.</span>
                    <span className="text-[10px] text-slate-400">30s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
