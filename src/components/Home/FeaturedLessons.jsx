import React, { useEffect, useState } from 'react';
import { ArrowRight, Bookmark, Clock, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedLessons = () => {
  // ১. লেসন সেভ করার জন্য স্টেট
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // ২. ডাটাবেস থেকে লেসন নিয়ে আসা
  useEffect(() => {
    fetch('http://localhost:3000/lessons') // আপনার ব্যাকএন্ড এপিআই
      .then((res) => res.json())
      .then((data) => {
        // হোম পেজের জন্য আমরা শুধু শেষ ৩টি লেসন দেখাব
        setLessons(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lessons:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-20 text-center font-bold text-indigo-600">Loading Lessons...</div>;
  }

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
          <Link to="/public-lessons">
            <button className="group flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-full font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl">
              Explore All Lessons <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {lessons.map((lesson) => (
            <div 
              key={lesson._id} // MongoDB-তে id থাকে _id নামে
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500 relative"
            >
              {/* Image Section */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={lesson.image || "https://via.placeholder.com/500x300?text=Life+Lesson"} 
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
                    <Clock size={14} className="text-indigo-500" /> 5 min read
                  </span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="text-indigo-500" /> By {lesson.authorName || 'Anonymous'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors leading-snug">
                  {lesson.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
                  {lesson.description}
                </p>

                <div className="pt-6 border-t border-slate-50">
                 


                 
<Link to={`/lesson/${lesson._id}`} className="w-full py-4 rounded-2xl bg-slate-50 text-slate-700 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
  Read Full Story
</Link>



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