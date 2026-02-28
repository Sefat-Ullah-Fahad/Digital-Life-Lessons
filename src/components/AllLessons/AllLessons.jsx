import React, { useState, useMemo } from 'react';
import { Search, Lock, User, Clock, Tag, Smile, ArrowRight, Star, Filter, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllLessons = () => {
  // ১. ১০টি ডামি লেসন ডাটা (Requirement অনুযায়ী)
  const [lessons] = useState([
    { id: 1, title: "The Art of Saying No", desc: "কিভাবে নিজের সীমানা নির্ধারণ করতে হয় এবং মানসিক শান্তি বজায় রাখতে হয়...", category: "Personal Growth", tone: "Realization", author: "Alif Ahmed", authorImg: "https://i.pravatar.cc/150?u=1", date: "Oct 20, 2025", accessLevel: "public" },
    { id: 2, title: "Wealth Management Secrets", desc: "আর্থিক স্বাধীনতা অর্জনের জন্য জমানোর চেয়ে সঠিক বিনিয়োগ বেশি জরুরি...", category: "Finance", tone: "Motivational", author: "Sarah Kabir", authorImg: "https://i.pravatar.cc/150?u=2", date: "Oct 22, 2025", accessLevel: "premium" },
    { id: 3, title: "Career Switch at 30", desc: "ত্রিশ বছর বয়সে নতুন ক্যারিয়ার শুরু করার ঝুঁকি ও সম্ভাবনা নিয়ে বাস্তব অভিজ্ঞতা...", category: "Career", tone: "Realization", author: "Rakibul Islam", authorImg: "https://i.pravatar.cc/150?u=3", date: "Oct 25, 2025", accessLevel: "public" },
    { id: 4, title: "Mindfulness in Digital Age", desc: "সোশ্যাল মিডিয়া এবং ইন্টারনেটের ভিড়ে কিভাবে নিজের ফোকাস ধরে রাখবেন...", category: "Mindset", tone: "Gratitude", author: "Dr. Nabila", authorImg: "https://i.pravatar.cc/150?u=4", date: "Nov 02, 2025", accessLevel: "public" },
    { id: 5, title: "Startup Failures to Success", desc: "আমার প্রথম স্টার্টআপ কেন ব্যর্থ হয়েছিল এবং সেখান থেকে আমি কী শিখেছি...", category: "Business", tone: "Motivational", author: "Siam Hossain", authorImg: "https://i.pravatar.cc/150?u=5", date: "Nov 05, 2025", accessLevel: "premium" },
    { id: 6, title: "Healthy Eating on a Budget", desc: "অল্প খরচে কিভাবে পুষ্টিকর খাবার নিশ্চিত করবেন এবং সুস্থ থাকবেন...", category: "Health", tone: "Educational", author: "Nutri Saima", authorImg: "https://i.pravatar.cc/150?u=6", date: "Nov 10, 2025", accessLevel: "public" },
    { id: 7, title: "React Development Roadmap", desc: "একজন ফুলস্ট্যাক ডেভেলপার হওয়ার সঠিক গাইডলাইন এবং টিপস...", category: "Career", tone: "Educational", author: "Dev Ariful", authorImg: "https://i.pravatar.cc/150?u=7", date: "Nov 12, 2025", accessLevel: "premium" },
    { id: 8, title: "Power of Emotional Intelligence", desc: "বুদ্ধিমত্তার চেয়ে ইমোশনাল ইন্টেলিজেন্স কেন বেশি জরুরি...", category: "Personal Growth", tone: "Realization", author: "Mitu Zaman", authorImg: "https://i.pravatar.cc/150?u=8", date: "Nov 15, 2025", accessLevel: "public" },
    { id: 9, title: "Handling Relationship Conflict", desc: "যেকোনো ঝগড়াকে কিভাবে সুন্দরভাবে সমাধান করে সম্পর্ক মজবুত করা যায়...", category: "Relationships", tone: "Sad", author: "Rony Khan", authorImg: "https://i.pravatar.cc/150?u=9", date: "Nov 18, 2025", accessLevel: "public" },
    { id: 10, title: "Minimalist Life Benefits", desc: "কম জিনিসে বেশি সুখে থাকার আধুনিক জীবনব্যবস্থা...", category: "Mindset", tone: "Motivational", author: "Asif Iqbal", authorImg: "https://i.pravatar.cc/150?u=10", date: "Nov 20, 2025", accessLevel: "premium" },
  ]);

  // ২. ফিল্টার স্টেট
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // এই ভেরিয়েবলটি পরে Firebase/Context থেকে আসবে
  const isCurrentUserPremium = false; 

  // ৩. ফিল্টার লজিক
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch = 
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lesson.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, lessons]);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* --- SECTION 1: HERO & SEARCH HEADER --- */}
      <section className="pt-32 pb-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black mb-6 tracking-widest uppercase">
            <BookOpen size={14} /> Shared Wisdom Library
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            Browse All Public <span className="text-indigo-600 italic">Lessons</span>
          </h1>

          {/* Search Bar & Category Filter */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3 bg-white p-3 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-100">
            <div className="flex-grow relative w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by lesson title or keywords..." 
                className="w-full py-4 pl-14 pr-6 rounded-2xl bg-slate-50 border-none outline-none text-slate-700 font-semibold"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto flex items-center gap-2 bg-slate-50 px-5 rounded-2xl border border-slate-100">
              <Filter size={18} className="text-indigo-600" />
              <select 
                className="bg-transparent py-4 font-black text-slate-600 outline-none cursor-pointer text-sm"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Personal Growth">Personal Growth</option>
                <option value="Finance">Finance</option>
                <option value="Career">Career</option>
                <option value="Mindset">Mindset</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: LESSONS GRID --- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredLessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col min-h-[500px]"
                >
                  
                  {/* ⭐ Requirement: Premium Blur Logic ⭐ */}
                  {lesson.accessLevel === 'premium' && !isCurrentUserPremium && (
                    <div className="absolute inset-2 z-20 bg-white/70 backdrop-blur-md rounded-[2.3rem] flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-indigo-200">
                      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4 rotate-6 shadow-xl">
                        <Lock size={28} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2 italic">Premium Lesson</h3>
                      <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Upgrade to Premium Plan to unlock this valuable wisdom.</p>
                      <Link to="/pricing" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2">
                        <Star size={16} className="text-yellow-400" /> Upgrade Plan
                      </Link>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-8 flex flex-col h-full">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider border border-indigo-100 flex items-center gap-1">
                        <Tag size={12} /> {lesson.category}
                      </span>
                      <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1">
                        <Smile size={12} /> {lesson.tone}
                      </span>
                    </div>

                    {/* Title & Desc Preview */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {lesson.desc}
                    </p>

                    {/* Bottom Info Section */}
                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={lesson.authorImg} alt={lesson.author} className="w-10 h-10 rounded-full border-2 border-indigo-100 shadow-sm" />
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 w-3.5 h-3.5 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 tracking-tight">{lesson.author}</p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                            <Calendar size={10} /> {lesson.date}
                          </div>
                        </div>
                      </div>

                      {/* Detail Button */}
                      <Link 
                        to={`/lesson/${lesson.id}`} 
                        className="p-3 bg-slate-50 rounded-2xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                      >
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-400 italic">No lessons found matching your criteria.</h2>
              <button onClick={() => {setSearchTerm(""); setSelectedCategory("All")}} className="mt-4 text-indigo-600 font-bold hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllLessons;