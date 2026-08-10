import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: '"IPMT transformed our 60-person engineering org. Sprint planning went from a 3-hour meeting to 40 minutes. The burndown visibility alone saved us a failed quarter."',
      name: 'Radhika Mehta',
      title: 'VP Engineering • TechScale India',
      initials: 'RM',
      accentColor: 'border-t-emerald-500',
      avatarBg: 'bg-emerald-400'
    },
    {
      text: '"We replaced Jira, Confluence, and three Excel files with IPMT. Our Scrum Masters love the velocity tracking and management loves the live KPI dashboard."',
      name: 'Karan Sinha',
      title: 'Director of Product • NovaBuild Labs',
      initials: 'KS',
      accentColor: 'border-t-purple-500',
      avatarBg: 'bg-purple-400'
    },
    {
      text: '"The RBAC and audit logs made our security team very happy. We pulled SOC2 evidence reports in minutes that used to take days. Genuinely enterprise-ready."',
      name: 'Preethi Nair',
      title: 'Head of IT Operations • Finaxis Corp',
      initials: 'PN',
      accentColor: 'border-t-cyan-400',
      avatarBg: 'bg-cyan-400'
    }
  ];

  return (
    <section className="py-24 px-6 max-w-[1240px] mx-auto">
      <div className="text-center max-w-[700px] mx-auto mb-16">
        <span className="inline-block text-xs font-extrabold tracking-widest text-emerald-600 uppercase mb-3">
          TESTIMONIALS
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
          Teams that shipped faster
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div 
            key={idx} 
            className={`bg-white rounded-[28px] p-8 border border-slate-100 shadow-xl shadow-slate-900/5 border-t-4 ${t.accentColor} flex flex-col justify-between`}
          >
            <div>
              {/* 5 Yellow Stars */}
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium italic mb-8">
                {t.text}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${t.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                {t.initials}
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">{t.name}</h4>
                <p className="text-[11px] text-slate-400 font-medium">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
