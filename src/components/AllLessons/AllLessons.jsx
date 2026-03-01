import React, { useState, useMemo, useEffect } from 'react';
import { Search, Lock, User, Clock, Tag, Smile, ArrowRight, Star, Filter, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllLessons = () => {
  // ১. ডাটাবেস থেকে আসা লেসন সেভ করার জন্য স্টেট
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // এই ভেরিয়েবলটি পরে ইউজারের প্রোফাইল/রোল থেকে আসবে
  const isCurrentUserPremium = false; 

  // ২. ডাটাবেস থেকে সব লেসন নিয়ে আসা (শুধুমাত্র Public গুলো)
  useEffect(() => {
    fetch('http://localhost:3000/lessons')
      .then(res => res.json())
      .then(data => {
        // শুধুমাত্র যেগুলোর privacy "Public", সেগুলো ফিল্টার করে নিচ্ছি
        const publicLessons = data.filter(lesson => lesson.privacy === "Public" || lesson.privacy === undefined);
        setLessons(publicLessons);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading lessons:", err);
        setLoading(false);
      });
  }, []);

  // ৩. ফিল্টার লজিক (Search & Category)
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch = 
        lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lesson.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, lessons]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-black text-indigo-600 italic">Wisdom is Loading...</div>;
  }

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
                <option value="Relationships">Relationships</option>
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
                  key={lesson._id} 
                  className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col min-h-[500px]"
                >
                  
                  {/* ⭐ Premium Blur Logic ⭐ */}
                  {lesson.accessLevel === 'Premium' && !isCurrentUserPremium && (
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
                        <Smile size={12} /> {lesson.emotionalTone || "Realization"}
                      </span>
                    </div>

                    {/* Title & Desc Preview */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {lesson.description}
                    </p>

                    {/* Bottom Info Section */}
                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={lesson.authorPhoto || "https://i.pravatar.cc/150"} alt={lesson.authorName} className="w-10 h-10 rounded-full border-2 border-indigo-100 shadow-sm" />
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 w-3.5 h-3.5 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 tracking-tight">{lesson.authorName || "Anonymous"}</p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                            <Calendar size={10} /> {new Date(lesson.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <Link 
                        to={`/lesson/${lesson._id}`} 
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
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllLessons;