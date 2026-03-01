import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Bell, Search, UserCircle } from 'lucide-react';

const AdminHeader = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 shrink-0">
           <div>

           </div>

            {/* ডান দিক: নোটিফিকেশন ও প্রোফাইল */}
            <div className="flex items-center gap-6">
                
                
                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-800 leading-none">{user?.displayName || "Admin"}</p>
                        <p className="text-[10px] font-semibold text-amber-600 uppercase mt-1">Super Admin</p>
                    </div>
                    {user?.photoURL ? (
                        <img src={user.photoURL} className="w-10 h-10 rounded-full border-2 border-amber-500 p-0.5" alt="admin" />
                    ) : (
                        <UserCircle size={40} className="text-slate-300" />
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;