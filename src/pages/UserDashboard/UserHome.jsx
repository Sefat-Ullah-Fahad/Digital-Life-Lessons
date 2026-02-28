import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { 
  BookOpen, 
  Heart, 
  PlusCircle, 
  User, 
  ArrowUpRight,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Link } from 'react-router-dom';

const UserHome = () => {
  const { user } = useContext(AuthContext);

  // ডামি ডাটা (পরবর্তীতে API থেকে আসবে)
  const stats = [
    { id: 1, label: 'Total Lessons', value: '12', icon: <BookOpen className="text-indigo-600" />, bg: 'bg-indigo-50' },
    { id: 2, label: 'Saved (Favorites)', value: '08', icon: <Heart className="text-rose-600" />, bg: 'bg-rose-50' },
  ];

  // চার্টের জন্য ডাটা (Weekly Reflections/Contributions)
  const chartData = [
    { name: 'Sat', lessons: 1 },
    { name: 'Sun', lessons: 3 },
    { name: 'Mon', lessons: 2 },
    { name: 'Tue', lessons: 5 },
    { name: 'Wed', lessons: 1 },
    { name: 'Thu', lessons: 4 },
    { name: 'Fri', lessons: 2 },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* ১. ওয়েলকাম ও কুইক অ্যাকশন সেকশন */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white w-full relative overflow-hidden shadow-xl shadow-indigo-100">
          <div className="relative z-10">
            <h2 className="text-2xl font-black">Hello, {user?.displayName || 'User'}! 👋</h2>
            <p className="mt-2 text-indigo-100 font-medium">আজকের নতুন জ্ঞান শেয়ার করার জন্য আপনি প্রস্তুত?</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/dashboard/add-lesson" className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 transition-all">
                <PlusCircle size={18} /> Create Lesson
              </Link>
              <Link to="/dashboard/profile" className="bg-indigo-500/30 backdrop-blur-md text-white border border-indigo-400/30 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-500/50 transition-all">
                <User size={18} /> My Profile
              </Link>
            </div>
          </div>
          {/* Decorative Shape */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* ছোট স্ট্যাটাস কার্ডগুলো */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm min-w-[180px]">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-800 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ২. এনালিটিক্স চার্ট এবং রিসেন্ট অ্যাক্টিভিটি */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* এনালিটিক্স চার্ট (২ কলাম জুড়ে) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><BarChart3 size={20}/></div>
            <h3 className="font-black text-gray-800 uppercase tracking-tight">Weekly Contributions</h3>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="lessons" radius={[10, 10, 10, 10]} barSize={35}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#4f46e5' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ডান পাশে - রিসেন্টলি অ্যাডেড লেসনস */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-800 uppercase tracking-tight mb-6">Recently Added</h3>
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl border border-gray-100 flex-shrink-0 flex items-center justify-center font-bold text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                  {i}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate group-hover:text-indigo-600 transition-all">How to manage time effectively</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Personal Growth</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-gray-50 text-gray-500 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
            View All Lessons <ArrowUpRight size={14}/>
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserHome;