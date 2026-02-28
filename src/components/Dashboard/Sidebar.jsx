import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusSquare, 
  BookOpen, 
  UserCircle, 
  Home, 
  LogOut, 
  X,
  Heart // নতুন আইকন ইম্পোর্ট করা হয়েছে
} from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4F46E5',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          navigate('/');
        });
      }
    });
  };

  // ডামি ডাটা অনুযায়ী মেনু আইটেম আপডেট করা হয়েছে
  const menuItems = [
    { name: 'Dashboard Home', path: '/dashboard/user-home', icon: <LayoutDashboard size={20} /> },
    { name: 'Add New Lesson', path: '/dashboard/add-lesson', icon: <PlusSquare size={20} /> },
    { name: 'My Lessons', path: '/dashboard/my-lessons', icon: <BookOpen size={20} /> },
    { name: 'My Favorites', path: '/dashboard/my-favorites', icon: <Heart size={20} /> }, // নতুন মেনু যোগ করা হয়েছে
    { name: 'My Profile', path: '/dashboard/profile', icon: <UserCircle size={20} /> },
  ];

  return (
    <>
      {/* মোবাইলের জন্য ওভারলে */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* সাইডবার কন্টেন্ট */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col p-6 shadow-sm`}>
        
        {/* মোবাইল ক্লোজ বাটন */}
        <button onClick={() => setIsOpen(false)} className="lg:hidden absolute right-4 top-6 text-gray-500 hover:bg-gray-50 p-1 rounded-lg">
          <X size={24} />
        </button>

        <div className="mb-10 text-indigo-600 font-black text-2xl tracking-tighter italic">
          LIFE <span className="text-gray-800">LESSONS</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
                }`
              }
            >
              {item.icon} <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-100 pt-6 space-y-2">
          <NavLink to="/" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <Home size={20} /> Back to Home
          </NavLink>
          <button onClick={handleLogOut} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </>
  );
}