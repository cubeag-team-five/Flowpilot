import React, { useState } from 'react';
import { 
  Inbox, 
  ClipboardList, 
  ListTodo, 
  PlayCircle, 
  Code2, 
  TestTube2, 
  CheckCircle2, 
  Rocket 
} from 'lucide-react';

export const PipelineSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(4);

  const stages = [
    {
      id: 1,
      title: 'Backlog',
      icon: <Inbox size={20} className="text-blue-500" />,
      desc: 'Product requirements and user stories. Prioritized by the Product Owner.',
      details: 'Automated backlog grooming with story point estimation poker and epic linking.'
    },
    {
      id: 2,
      title: 'Sprint Planning',
      icon: <ClipboardList size={20} className="text-amber-500" />,
      desc: 'Scrum Master facilitates. Team selects backlog items for the sprint goal.',
      details: 'Team capacity balancing calculator and velocity forecasting.'
    },
    {
      id: 3,
      title: 'To Do',
      icon: <ListTodo size={20} className="text-teal-500" />,
      desc: 'Sprint backlog committed. Story points estimated per task.',
      details: 'Unassigned queue ready for developer pull request assignment.'
    },
    {
      id: 4,
      title: 'In Progress',
      icon: <PlayCircle size={20} className="text-purple-500" />,
      desc: 'Active development. Daily standup tracks progress and blockers.',
      details: 'GitHub/GitLab branch link sync with automatic WIP limit enforcement.'
    },
    {
      id: 5,
      title: 'Code Review',
      icon: <Code2 size={20} className="text-indigo-500" />,
      desc: 'Peer review and automated tests. Requires 2 approvals to advance.',
      details: 'SonarQube quality gate integration and pull request status checks.'
    },
    {
      id: 6,
      title: 'Testing',
      icon: <TestTube2 size={20} className="text-pink-500" />,
      desc: 'QA validation, regression checks, and bug filing. Linked to task.',
      details: 'Automated test suite execution and bug ticket cross-referencing.'
    },
    {
      id: 7,
      title: 'Done',
      icon: <CheckCircle2 size={20} className="text-emerald-500" />,
      desc: 'Accepted by the Product Owner. Counts toward sprint velocity.',
      details: 'Definition of Done (DoD) checklist verification and velocity addition.'
    },
    {
      id: 8,
      title: 'Deploy',
      icon: <Rocket size={20} className="text-emerald-600" />,
      desc: 'Released to production. CI/CD triggered. Audit log updated.',
      details: 'Zero-downtime deployment trigger with instant release notes summary.'
    }
  ];

  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="max-w-[1300px] mx-auto">
      <div className="text-center max-w-[850px] mx-auto mb-14">
        <span className="inline-block text-xs font-extrabold tracking-[0.2em] text-emerald-500 uppercase mb-4">
          SCRUM LIFECYCLE
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
          The full Agile pipeline, visualized
        </h2>
        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium max-w-[620px] mx-auto">
          Each stage tracked, each blocker surfaced. Flowpilot enforces Scrum without friction.
        </p>
      </div>

      {/* Connected Nodes Pipeline with Mouse Enter Hover Interaction */}
      <div className="relative mt-10">
        <div className="hidden lg:block absolute top-6 left-12 right-12 h-[2px] bg-gradient-to-r from-emerald-200 via-teal-200 to-purple-200 z-0"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <div 
                key={stage.id} 
                onMouseEnter={() => setActiveStage(stage.id)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-full bg-white border-2 flex items-center justify-center mb-4 shadow-sm transition-all duration-300 group-hover:scale-115 group-hover:border-emerald-500 group-hover:bg-emerald-50 group-hover:shadow-emerald-500/20 ${
                  isActive ? 'border-emerald-500 bg-emerald-50 scale-110 shadow-emerald-500/20' : 'border-slate-200'
                }`}>
                  {stage.icon}
                </div>
                <div className={`w-full bg-white border rounded-2xl p-4 text-center flex flex-col justify-between h-full transition-all duration-300 group-hover:border-emerald-500 group-hover:shadow-xl group-hover:shadow-emerald-500/10 group-hover:-translate-y-1.5 ${
                  isActive ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' : 'border-slate-100 shadow-xs'
                }`}>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{stage.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight mb-3">{stage.desc}</p>
                  </div>
                  <span className={`text-[10px] font-extrabold ${isActive ? 'text-emerald-500' : 'text-slate-300 group-hover:text-emerald-500'}`}>
                    0{stage.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
};
