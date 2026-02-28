import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Bell, Menu } from 'lucide-react';

export default function DashboardHeader({ setIsOpen }) {
  const { user } = useContext(AuthContext);

  return (
    <header className="h-16 lg:h-20 bg-white border-b border-gray-100 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* হ্যামবার্গার মেনু বাটন (শুধুমাত্র মোবাইলে দেখা যাবে) */}
      <button 
        onClick={() => setIsOpen(prev => !prev)}
        className="p-2 lg:hidden text-gray-600 hover:bg-gray-50 rounded-lg"
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg font-bold text-gray-800 lg:hidden">Dashboard</h1>

      <div className="flex items-center gap-3 ml-auto">
        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full hidden sm:block">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center gap-3 pl-3 lg:pl-5 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-xs lg:text-sm font-black text-gray-800 leading-none">{user?.displayName}</p>
            <p className="text-[10px] font-bold text-indigo-500 mt-1 uppercase">Member</p>
          </div>
          <img 
            src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border shadow-sm object-cover"
            alt="profile"
          />
        </div>
      </div>
    </header>
  );
}