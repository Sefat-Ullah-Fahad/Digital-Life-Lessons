import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, BookOpen, Home, BookText, 
  PlusSquare, LayoutDashboard, LogOut, ChevronDown, UserCircle, Sparkles, ShieldCheck
} from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider'; 
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin'; // আপনার তৈরি করা useAdmin হুক

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin(); // হুক ব্যবহার করে রোল চেক
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4F46E5',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: 'Logged Out!',
              text: 'Successfully signed out.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
            navigate('/login');
          })
          .catch(error => console.log(error));
      }
    });
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'All Lessons', path: '/public-lessons', icon: <BookText size={18} /> },
  ];

  // অ্যাডমিন এবং ইউজারের জন্য আলাদা ড্রপডাউন মেনু লজিক
  const dropdownMenus = isAdmin 
    ? [
        { name: 'Admin Panel', path: '/admin-panel', icon: <ShieldCheck size={18} /> },
        { name: 'Manage Users', path: '/admin-panel/manage-users', icon: <UserCircle size={18} /> },
        { name: 'Manage Lessons', path: '/admin-panel/manage-lessons', icon: <BookOpen size={18} /> },
      ]
    : [
        { name: 'My Dashboard', path: '/dashboard/user-home', icon: <LayoutDashboard size={18} /> },
        { name: 'Add Lesson', path: '/dashboard/add-lesson', icon: <PlusSquare size={18} /> },
        { name: 'My Lessons', path: '/dashboard/my-lessons', icon: <BookOpen size={18} /> },
      ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* লোগো সেকশন */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1772255440/Digital_Life_Lessons-removebg-preview_cbp6q7.png" 
                alt="Logo" 
                className="h-20 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </Link>
          </motion.div>

          {/* ডেস্কটপ ন্যাভিগেশন */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-black transition-all ${
                    isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {link.icon} {link.name}
              </NavLink>
            ))}
          </nav>

          {/* প্রোফাইল ড্রপডাউন */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 pr-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all active:scale-95"
                >
                  <img 
                    src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm" 
                    alt="profile"
                  />
                  <div className="text-left">
                    <p className="text-[11px] font-black text-slate-800 leading-none">{user?.displayName?.split(' ')[0] || "User"}</p>
                    <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${isAdmin ? 'text-amber-500' : 'text-indigo-500'}`}>
                      {isAdmin ? 'Admin' : 'Member'}
                    </p>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)}></div>
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-3xl shadow-2xl p-3 z-[60]"
                      >
                        <div className={`px-4 py-4 rounded-2xl mb-2 ${isAdmin ? 'bg-amber-50' : 'bg-slate-50'}`}>
                           <div className="flex items-center gap-2">
                              {isAdmin ? <ShieldCheck size={12} className="text-amber-600" /> : <Sparkles size={12} className="text-indigo-500" />}
                              <p className={`text-[10px] font-black uppercase tracking-widest ${isAdmin ? 'text-amber-600' : 'text-slate-500'}`}>
                                {isAdmin ? 'Admin Panel Access' : 'Verified Member'}
                              </p>
                           </div>
                           <p className="text-xs font-bold text-slate-800 truncate mt-1">{user?.email}</p>
                        </div>

                        <div className="space-y-1">
                          {dropdownMenus.map((menu) => (
                            <Link
                              key={menu.name}
                              to={menu.path}
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm font-black text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                            >
                              <span className="p-1.5 bg-slate-50 rounded-lg">{menu.icon}</span>
                              {menu.name}
                            </Link>
                          ))}
                        </div>

                        <div className="border-t border-slate-50 mt-2 pt-2">
                          <button 
                            onClick={handleLogOut}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          >
                            <LogOut size={18} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95">
                Sign In
              </Link>
            )}
          </div>

          {/* মোবাইল মেনু বাটন */}
          <div className="lg:hidden flex items-center gap-3">
             {!user && <Link to="/login" className="text-xs font-black text-indigo-600 mr-2">Login</Link>}
             <button onClick={() => setIsOpen(!isOpen)} className="p-3 text-indigo-600 bg-indigo-50 rounded-2xl">
               {isOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রয়ার */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-8 space-y-3">
              {[...navLinks, ...(user ? dropdownMenus : [])].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-[1.2rem] bg-slate-50 text-slate-700 font-black text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  {link.icon} {link.name}
                </Link>
              ))}
              {user && (
                 <button 
                   onClick={handleLogOut}
                   className="w-full flex items-center gap-4 p-4 rounded-[1.2rem] bg-rose-50 text-rose-600 font-black text-sm mt-4"
                 >
                   <LogOut size={18} /> Logout
                 </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;