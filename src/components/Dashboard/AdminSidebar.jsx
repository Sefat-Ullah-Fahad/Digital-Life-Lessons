import { NavLink, useNavigate } from "react-router"; // react-router-dom হলে সেটি ব্যবহার করুন
import { useContext, useState } from "react"; 
import { AuthContext } from "../../providers/AuthProvider"; // পাথ ২ লেভেল পেছনে (../../) করা হয়েছে
import Swal from 'sweetalert2';
import { 
    LayoutDashboard, Users, BookOpen, AlertCircle, 
    UserCircle, LogOut, Home, ShieldCheck, Menu, X 
} from "lucide-react";

const AdminSidebar = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু কন্ট্রোল

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out from the admin panel!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4F46E5',
            cancelButtonColor: '#f43f5e',
            confirmButtonText: 'Yes, Logout!',
            background: '#1e293b',
            color: '#f8fafc'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut().then(() => {
                    Swal.fire({
                        title: 'Logged Out!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                        background: '#1e293b',
                        color: '#f8fafc'
                    });
                    navigate('/');
                }).catch(err => console.log(err));
            }
        });
    };

    const navLinkStyles = ({ isActive }) => 
        `flex items-center gap-3 px-6 py-3.5 transition-all duration-300 relative group ${
            isActive 
            ? "text-indigo-400 bg-indigo-500/5 font-semibold" 
            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
        }`;

    return (
        <>
            {/* মোবাইল মেনু বাটন (Small screen only) */}
            <div className="lg:hidden fixed top-4 left-4 z-[60]">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-[#0f172a] text-white rounded-lg shadow-lg border border-slate-700"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* মোবাইল ওভারলে */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50] lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* সাইডবার মেইন বডি */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-[55]
                w-72 bg-[#0f172a] text-white h-screen 
                flex flex-col border-r border-slate-800/50
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                <div className="p-8 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                            <ShieldCheck className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black tracking-tight leading-none uppercase">
                                Admin<span className="text-indigo-500">Hub</span>
                            </h2>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Control Center</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto">
                    <p className="px-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 opacity-50">General</p>
                    
                    <NavLink to="/admin-panel/home" onClick={() => setIsOpen(false)} className={navLinkStyles}>
                        {({ isActive }) => (
                            <>
                                {isActive && <span className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />}
                                <LayoutDashboard size={19} className={isActive ? "text-indigo-400" : "text-slate-500"} />
                                <span>Overview</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink to="/admin-panel/manage-users" onClick={() => setIsOpen(false)} className={navLinkStyles}>
                        {({ isActive }) => (
                            <>
                                {isActive && <span className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />}
                                <Users size={19} className={isActive ? "text-indigo-400" : "text-slate-500"} />
                                <span>Users</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink to="/admin-panel/manage-lessons" onClick={() => setIsOpen(false)} className={navLinkStyles}>
                        {({ isActive }) => (
                            <>
                                {isActive && <span className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />}
                                <BookOpen size={19} className={isActive ? "text-indigo-400" : "text-slate-500"} />
                                <span>Lessons</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink to="/admin-panel/reported-lessons" onClick={() => setIsOpen(false)} className={navLinkStyles}>
                        {({ isActive }) => (
                            <>
                                {isActive && <span className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />}
                                <AlertCircle size={19} className={isActive ? "text-indigo-400" : "text-slate-500"} />
                                <span>Reports</span>
                            </>
                        )}
                    </NavLink>

                    <div className="pt-10">
                        <p className="px-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 opacity-50">Settings</p>
                        <NavLink to="/admin-panel/profile" onClick={() => setIsOpen(false)} className={navLinkStyles}>
                            <UserCircle size={19} />
                            <span>Profile</span>
                        </NavLink>
                        <NavLink to="/" className={navLinkStyles}>
                            <Home size={19} />
                            <span>View Site</span>
                        </NavLink>
                    </div>
                </nav>

                <div className="p-6 mt-auto">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-6 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all duration-300 font-semibold group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;