import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { 
  BookOpen, 
  Heart, 
  PlusCircle, 
  User, 
  ArrowUpRight,
  BarChart3,
  Loader2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Link } from 'react-router-dom';

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [userStats, setUserStats] = useState({ totalLessons: 0, totalFavorites: 0 });
  const [recentLessons, setRecentLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);

      // ১. ইউজারের নিজের লেসনগুলো নিয়ে আসা
      const fetchMyLessons = fetch(`http://localhost:3000/my-lessons/${user?.email}`)
        .then(res => res.json());

      // ২. ইউজারের ফেভারিট লিস্ট নিয়ে আসা (কাউন্ট করার জন্য)
      const fetchMyFavorites = fetch(`http://localhost:3000/my-favorites?email=${user?.email}`)
        .then(res => res.json());

      // সব ডাটা একসাথে হ্যান্ডেল করা
      Promise.all([fetchMyLessons, fetchMyFavorites])
        .then(([lessonsData, favoritesData]) => {
          // সাম্প্রতিক ৩টি লেসন ফিল্টার করা (নতুনগুলো আগে)
          const sortedRecent = [...lessonsData].reverse().slice(0, 3);
          setRecentLessons(sortedRecent);
          
          setUserStats({
            totalLessons: lessonsData.length,
            totalFavorites: favoritesData.length // এপিআই থেকে আসা অ্যারের লেংথ
          });
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching dashboard data:", err);
          setLoading(false);
        });
    }
  }, [user]);

  // চার্টের জন্য ডাটা (ইউজারের অ্যাক্টিভিটি অনুযায়ী ডাইনামিক করা সম্ভব, আপাতত স্টাইলিশ স্ট্যাটিক রাখা হলো)
  const chartData = [
    { name: 'Sat', lessons: 1 }, { name: 'Sun', lessons: 3 },
    { name: 'Mon', lessons: 2 }, { name: 'Tue', lessons: 5 },
    { name: 'Wed', lessons: 1 }, { name: 'Thu', lessons: 4 },
    { name: 'Fri', lessons: 2 },
  ];

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-indigo-600 font-black tracking-widest uppercase text-[10px] animate-pulse">
      <Loader2 className="animate-spin mb-4" size={32} />
      Analyzing your wisdom...
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      
      {/* ১. ওয়েলকাম ও কুইক অ্যাকশন সেকশন */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className="flex-1 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="relative z-10">
            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Dashboard Overview</span>
            <h2 className="text-3xl md:text-4xl font-black mt-6 tracking-tight">Hello, {user?.displayName?.split(' ')[0] || 'Explorer'}! 👋</h2>
            <p className="mt-3 text-indigo-100 font-medium text-lg max-w-md">আপনার আজকের নতুন জ্ঞান বা অভিজ্ঞতাটি পৃথিবীর সাথে শেয়ার করতে আপনি কি প্রস্তুত?</p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dashboard/add-lesson" className="bg-white text-indigo-600 px-7 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                <PlusCircle size={20} /> Create New Lesson
              </Link>
              <Link to="/dashboard/profile" className="bg-indigo-500/30 backdrop-blur-md text-white border border-indigo-400/30 px-7 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-indigo-500/50 transition-all">
                <User size={20} /> Edit Profile
              </Link>
            </div>
          </div>
          {/* Decorative Shapes */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute right-10 top-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>
        </div>

        {/* ডাইনামিক স্ট্যাটাস কার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full lg:w-72">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 text-indigo-600 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Lessons</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">{userStats.totalLessons}</h3>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-5 text-rose-600 group-hover:scale-110 transition-transform">
                <Heart size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Saved Favorites</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">{userStats.totalFavorites}</h3>
            </div>
        </div>
      </div>

      {/* ২. এনালিটিক্স চার্ট এবং রিসেন্ট অ্যাক্টিভিটি */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* এনালিটিক্স চার্ট */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><BarChart3 size={24}/></div>
                <div>
                    <h3 className="font-black text-slate-900 text-lg tracking-tight">Weekly Contributions</h3>
                    <p className="text-xs font-bold text-slate-400">Activity from last 7 days</p>
                </div>
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={15} />
                <YAxis hide />
                <Tooltip 
                    cursor={{fill: '#f8fafc'}} 
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px'}} 
                />
                <Bar dataKey="lessons" radius={[12, 12, 12, 12]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#4f46e5' : '#e2e8f0'} className="hover:fill-indigo-400 transition-colors" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ডান পাশে - রিসেন্টলি অ্যাডেড ডাইনামিক লেসনস */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-8">
            <h3 className="font-black text-slate-900 text-lg tracking-tight">Recent Insights</h3>
            <p className="text-xs font-bold text-slate-400 mt-1">Your latest shared wisdom</p>
          </div>

          <div className="space-y-6 flex-1">
            {recentLessons.length > 0 ? recentLessons.map((lesson) => (
              <Link to={`/lesson/${lesson._id}`} key={lesson._id} className="flex items-center gap-4 group cursor-pointer border-b border-slate-50 pb-5 last:border-0 hover:translate-x-1 transition-transform">
                <div className="w-14 h-14 bg-slate-50 rounded-[1.2rem] border border-slate-100 flex-shrink-0 flex items-center justify-center font-black text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all uppercase text-[10px]">
                  {lesson.category?.slice(0, 2) || 'LL'}
                </div>
                <div className="min-w-0">
                  <p className="font-black text-slate-800 text-sm truncate group-hover:text-indigo-600 transition-all capitalize leading-tight">{lesson.title}</p>
                  <p className="text-[10px] font-black text-indigo-500 uppercase mt-1.5 bg-indigo-50 w-fit px-2 py-0.5 rounded-md">{lesson.category}</p>
                </div>
              </Link>
            )) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                    <BookOpen size={32} />
                </div>
                <p className="text-slate-400 text-sm font-bold italic">No lessons shared yet.</p>
              </div>
            )}
          </div>

          <Link to="/dashboard/my-lessons" className="w-full mt-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95">
            Manage All Lessons <ArrowUpRight size={16}/>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UserHome;