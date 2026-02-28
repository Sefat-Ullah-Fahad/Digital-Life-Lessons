import React from 'react';
import { Award, Star, CheckCircle, ArrowRight, Users } from 'lucide-react';

const TopContributors = () => {
  const contributors = [
    {
      id: 1,
      name: "Alif Ahmed",
      role: "Life Coach",
      lessons: 24,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500"
    },
    {
      id: 2,
      name: "Sarah Kabir",
      role: "Financial Advisor",
      lessons: 18,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500"
    },
    {
      id: 3,
      name: "Rakibul Islam",
      role: "Mindset Expert",
      lessons: 15,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500"
    },
    {
      id: 4,
      name: "Nabila Zaman",
      role: "Career Mentor",
      lessons: 12,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500"
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Featured Lessons এর স্টাইলে */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3">
              <Award size={18} />
              <span>Top Contributors of the Week</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Meet Our Knowledge <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Sharers</span>
            </h2>
          </div>
          <button className="group flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-full font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
            View All Experts <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Contributors Grid - Featured Card এর স্টাইলে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contributors.map((person) => (
            <div 
              key={person.id} 
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500 relative flex flex-col"
            >
              {/* Profile Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                
                {/* Rating on Image */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white text-xs font-bold">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  {person.rating}
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-indigo-600 text-[10px] font-black uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-md">
                    {person.role}
                  </span>
                  <CheckCircle size={16} className="text-blue-500" />
                </div>

                <h4 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
                  {person.name}
                </h4>

                {/* Stats Footer */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                    <Users size={16} className="text-indigo-500" />
                    {person.lessons} Lessons
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;