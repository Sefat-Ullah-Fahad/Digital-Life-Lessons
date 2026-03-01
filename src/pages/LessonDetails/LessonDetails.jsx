import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Bookmark, Loader2, User } from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const LessonDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // আসল ইউজার ডাটা ব্যবহার করা হচ্ছে
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ১. ডাটা লোড করা
  useEffect(() => {
    fetch(`http://localhost:3000/lessons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // ২. লাইক ফাংশন (PATCH)
  const handleLike = async () => {
    if (!user) return Swal.fire('Login First!', 'লাইক দিতে আগে লগইন করুন।', 'warning');

    const res = await fetch(`http://localhost:3000/lessons/like/${lesson._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.uid || user?.email })
    });
    const data = await res.json();
    
    if (data.modifiedCount > 0) {
      // লোকালি স্টেট আপডেট করা (পেজ রিলোড না করে)
      const updatedLikes = lesson.likes?.includes(user?.email) 
        ? lesson.likes.filter(id => id !== user?.email)
        : [...(lesson.likes || []), user?.email];
      
      setLesson({ 
        ...lesson, 
        likes: updatedLikes, 
        likesCount: updatedLikes.length 
      });
    }
  };

  // ৩. সেভ/ফেভারিট ফাংশন (POST)
  const handleSaveFavorite = () => {
    if (!user) return Swal.fire('Login Required', 'সেভ করতে লগইন করুন।', 'warning');

    const favoriteData = {
      lessonId: lesson._id,
      title: lesson.title,
      category: lesson.category,
      authorName: lesson.authorName,
      authorEmail: lesson.authorEmail,
      emotionalTone: lesson.emotionalTone,
      userEmail: user?.email, // কোন ইউজার সেভ করছে
    };

    fetch('http://localhost:3000/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(favoriteData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'লেসনটি আপনার ফেভারিট লিস্টে যোগ করা হয়েছে।',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire('Info', 'এটি আপনার লিস্টে আগেই সেভ করা আছে।', 'info');
        }
      });
  };

  // ৪. রিপোর্ট ফাংশন (POST)
  const handleReport = (e) => {
    const reason = e.target.value;
    if (!reason) return;

    if (!user) return Swal.fire('Login First!', 'রিপোর্ট করতে লগইন করুন।', 'warning');

    const reportInfo = {
      lessonId: lesson._id,
      lessonTitle: lesson.title,
      reporterEmail: user?.email,
      reason: reason,
      timestamp: new Date()
    };

    fetch('http://localhost:3000/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportInfo)
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire("Reported!", "আপনার অভিযোগটি গ্রহণ করা হয়েছে।", "success");
        e.target.value = ""; // সিলেক্ট বক্স রিসেট
      });
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center text-indigo-600 font-black italic">
      <Loader2 className="animate-spin mb-4" size={40} />
      Gathering Wisdom...
    </div>
  );

  if (!lesson) return (
    <div className="h-screen flex flex-col items-center justify-center text-red-500 font-bold italic">
      <p className="text-2xl mb-4 text-slate-300">404</p>
      Lesson not found!
      <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 underline">Back to home</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-10 transition-all bg-white px-5 py-2.5 rounded-full shadow-sm w-fit border border-slate-100 hover:shadow-md active:scale-95">
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative">
          
          {/* Header Info */}
          <div className="space-y-6 mb-12">
            <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">{lesson.category}</span>
                <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">{lesson.emotionalTone}</span>
                {lesson.accessLevel === 'Premium' && <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">⭐ Premium</span>}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">{lesson.title}</h1>
            
            {/* Stats Summary */}
            <div className="flex gap-6 text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-50 pb-8">
                <span className="flex items-center gap-1.5 text-slate-500 font-black">❤️ {lesson.likesCount || 0} Likes</span>
                <span className="flex items-center gap-1.5">🔖 {lesson.favoritesCount || 0} Saves</span>
                <span className="flex items-center gap-1.5">📅 {new Date(lesson.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Featured Image */}
          {lesson.image && (
            <div className="mb-12 rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-100/50">
              <img src={lesson.image} alt={lesson.title} className="w-full h-auto object-cover max-h-[550px]" />
            </div>
          )}

          {/* Main Description */}
          <div className="text-slate-700 text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium mb-16 text-justify">
            {lesson.description}
          </div>

          {/* Interaction Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-10 border-y border-slate-50 mb-16">
             <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike} 
                  className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all active:scale-95 ${lesson.likes?.includes(user?.email) ? 'bg-red-500 text-white shadow-lg shadow-red-100' : 'bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500'}`}
                >
                    <Heart size={20} fill={lesson.likes?.includes(user?.email) ? "white" : "none"} /> 
                    {lesson.likesCount || 0}
                </button>
                <button 
                  onClick={handleSaveFavorite}
                  className="flex items-center gap-2 bg-slate-50 text-slate-500 px-8 py-4 rounded-2xl font-black hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95"
                >
                    <Bookmark size={20} /> Save
                </button>
             </div>

             <div className="flex items-center gap-3">
                <select onChange={handleReport} className="bg-red-50 text-red-500 text-[10px] font-black p-4 rounded-2xl outline-none cursor-pointer hover:bg-red-100 transition-colors uppercase tracking-widest">
                    <option value="">🚩 Report</option>
                    <option value="Inappropriate Content">Inappropriate Content</option>
                    <option value="Hate Speech">Hate Speech</option>
                    <option value="Spam">Spam</option>
                </select>
                <button className="p-4 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                    <Share2 size={20} />
                </button>
             </div>
          </div>

          {/* Author Card */}
          <div className="bg-slate-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                <User size={120} />
            </div>
            
            <img 
              src={lesson.authorPhoto || "https://i.pravatar.cc/150"} 
              alt={lesson.authorName} 
              className="w-24 h-24 rounded-3xl border-4 border-white shadow-xl object-cover relative z-10" 
            />
            
            <div className="text-center md:text-left flex-1 relative z-10">
                <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mb-1.5 flex items-center justify-center md:justify-start gap-2">
                    <span className="w-4 h-[2px] bg-indigo-200"></span> Shared By
                </p>
                <h3 className="text-2xl font-black text-slate-900">{lesson.authorName}</h3>
                <p className="text-sm text-slate-500 font-bold mt-1 tracking-tight">{lesson.authorEmail}</p>
            </div>

            <Link 
                to={`/author/${lesson.authorEmail}`}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs shadow-sm hover:shadow-xl hover:bg-indigo-600 hover:text-white transition-all border border-slate-100 block text-center relative z-10 uppercase tracking-widest"
            >
                View Profile
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LessonDetails;