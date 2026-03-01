import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Bell, Menu, Sparkles } from 'lucide-react';

export default function DashboardHeader({ setIsOpen }) {
  const { user } = useContext(AuthContext);

  // ইউজারের রোল ডাইনামিক করা (যদি আপনার ডাটাবেসে role থাকে)
  const userRole = user?.role === 'admin' ? 'Administrator' : 'Explorer';

  return (
    <header className="h-16 lg:h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
      
      {/* ১. লেফট সেকশন: হ্যামবার্গার মেনু (Mobile Only) */}
      <div className="flex items-center gap-4 lg:hidden">
        <button 
          onClick={() => setIsOpen(prev => !prev)}
          className="p-2.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all active:scale-95"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-black text-slate-900 tracking-tighter">Dashboard</h1>
      </div>

      {/* ২. মিডল সেকশন: সার্চ বা অন্য কিছু (ঐচ্ছিক - আপাতত খালি রাখা হলো) */}
      <div className="hidden lg:block">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Digital Life Lessons <span className="text-indigo-500 ml-2">v2.0</span>
         </p>
      </div>

      {/* ৩. রাইট সেকশন: ইউজার ইনফো */}
      <div className="flex items-center gap-4 lg:gap-6">
        
        {/* নোটিফিকেশন বাটন */}
        <button className="p-3 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all relative group hidden sm:block">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:animate-ping"></span>
        </button>
        
        {/* ইউজার প্রোফাইল ডিটেইলস */}
        <div className="flex items-center gap-4 pl-4 lg:pl-8 border-l border-slate-100 h-10">
          <div className="text-right hidden sm:block">
            <h4 className="text-sm font-black text-slate-900 leading-none tracking-tight">
                {user?.displayName || 'User'}
            </h4>
            <div className="flex items-center justify-end gap-1.5 mt-1.5">
               {user?.role === 'admin' && <Sparkles size={10} className="text-amber-500 fill-amber-500" />}
               <p className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                  user?.role === 'admin' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-500'
               }`}>
                  {userRole}
               </p>
            </div>
          </div>

          <div className="relative">
            <img 
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-[1.2rem] border-2 border-slate-100 shadow-sm object-cover hover:border-indigo-500 transition-all cursor-pointer p-0.5 bg-white"
                alt="profile"
            />
            {/* অনলাইন ইন্ডিকেটর */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white"></span>
          </div>
        </div>
      </div>
    </header>
  );
}