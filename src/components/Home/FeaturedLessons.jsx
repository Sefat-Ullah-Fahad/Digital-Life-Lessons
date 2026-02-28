import React from 'react';
import { ArrowRight, Bookmark, Clock, User, Sparkles } from 'lucide-react';

const FeaturedLessons = () => {
  const lessons = [
    {
      id: 1,
      title: "The Silent Power of Emotional Intelligence",
      description: "কিভাবে আপনার আবেগ নিয়ন্ত্রণ করে কর্মক্ষেত্রে এবং ব্যক্তিজীবনে সফল হওয়া যায়, তার একটি পূর্ণাঙ্গ গাইড।",
      category: "Personal Growth",
      author: "Alif Ahmed",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500"
    },
    {
      id: 2,
      title: "Smart Investing: 10 Rules to Follow",
      description: "টাকা জমানো মানেই ধনী হওয়া নয়। সঠিক জায়গায় বিনিয়োগের মাধ্যমেই আর্থিক স্বাধীনতা সম্ভব।",
      category: "Finance",
      author: "Nabila Kabir",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=500"
    },
    {
      id: 3,
      title: "Mindfulness in a Digital World",
      description: "সোশ্যাল মিডিয়ার যুগে কিভাবে নিজের মানসিক শান্তি বজায় রাখবেন এবং ফোকাস ঠিক রাখবেন।",
      category: "Mindset",
      author: "Dr. Rakib",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500"
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3">
              <Sparkles size={18} />
              <span>Handpicked For You</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Featured Life <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Lessons</span>
            </h2>
          </div>
          <button className="group flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-full font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl">
            Explore All Lessons <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500 relative"
            >
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={lesson.image} 
                  alt={lesson.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-indigo-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {lesson.category}
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-indigo-600 transition-colors">
                  <Bookmark size={18} />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4 text-slate-400 text-xs font-semibold uppercase tracking-tighter">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-500" /> {lesson.readTime}
                  </span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="text-indigo-500" /> By {lesson.author}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors leading-snug">
                  {lesson.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
                  {lesson.description}
                </p>

                <div className="pt-6 border-t border-slate-50">
                  <button className="w-full py-4 rounded-2xl bg-slate-50 text-slate-700 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    Read Full Story <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;