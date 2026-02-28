import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, BookOpen, Home, BookText, 
  PlusSquare, LayoutDashboard, LogOut, ChevronDown, UserCircle 
} from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider'; 
import Swal from 'sweetalert2';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // আপনার ডাটাবেস থেকে পাওয়া রোল অনুযায়ী এটি পরিবর্তন করবেন
  const isAdmin = user?.role === 'admin'; 

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

  // সবার জন্য সাধারণ লিঙ্ক
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'All Lessons', path: '/public-lessons', icon: <BookText size={18} /> },
  ];

  // ড্রপডাউনের ভেতরে ইউজারের রোল অনুযায়ী মেনু
  const dropdownMenus = isAdmin 
    ? [
        { name: 'Admin Home', path: '/dashboard/admin-home', icon: <LayoutDashboard size={18} /> },
        { name: 'Manage Users', path: '/dashboard/manage-users', icon: <UserCircle size={18} /> },
        { name: 'Manage Lessons', path: '/dashboard/manage-lessons', icon: <BookOpen size={18} /> },
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
                className="h-24 w-24 object-contain" 
              />
            </Link>
          </motion.div>

          {/* ডেস্কটপ ন্যাভিগেশন (শুধু সাধারণ লিঙ্কগুলো) */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {link.icon} {link.name}
              </NavLink>
            ))}
          </nav>

          {/* প্রোফাইল ড্রপডাউন সেকশন */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 pr-4 bg-gray-50 rounded-full border border-gray-200 hover:shadow-md transition-all active:scale-95"
                >
                  <img 
                    src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" 
                    alt="profile"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.target.src = "https://i.ibb.co/5GzXkwq/user.png" }}
                  />
                  <span className="text-sm font-black text-gray-700">{user?.displayName || "User"}</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-[60]"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 mb-2">
                         <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Account Status: {isAdmin ? 'Admin' : 'User'}</p>
                         <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
                      </div>

                      {/* রোল অনুযায়ী ড্যাশবোর্ড মেনু */}
                      <div className="space-y-1">
                        {dropdownMenus.map((menu) => (
                          <Link
                            key={menu.name}
                            to={menu.path}
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                          >
                            {menu.icon} {menu.name}
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-gray-50 mt-2 pt-2">
                        <button 
                          onClick={handleLogOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="bg-indigo-600 text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                Login
              </Link>
            )}
          </div>

          {/* মোবাইল মেনু টগল */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-indigo-600 bg-indigo-50 rounded-xl">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রয়ার (সব লিঙ্ক এখানে থাকবে) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {[...navLinks, ...(user ? dropdownMenus : [])].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-gray-700 font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                >
                  {link.icon} {link.name}
                </Link>
              ))}
              {user && (
                 <button 
                   onClick={handleLogOut}
                   className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 text-red-600 font-bold"
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