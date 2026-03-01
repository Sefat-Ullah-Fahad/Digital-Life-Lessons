import React, { useState, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User, Mail, ShieldCheck, Camera, Save, Edit3, CheckCircle2, ListChecks, History } from 'lucide-react';
import { updateProfile } from "firebase/auth"; // Firebase profile update করার জন্য
import Swal from 'sweetalert2';
import { AuthContext } from "../../providers/AuthProvider";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [updating, setUpdating] = useState(false);

    // ১. অ্যাডমিন ডাটা এবং মডারেশন স্ট্যাটস ফেচ করা
    const { data: adminData = {}, isLoading } = useQuery({
        queryKey: ['admin-profile', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://life-lesson-server-nine.vercel.app/users`);
            const allUsers = await res.json();
            return allUsers.find(u => u.email === user?.email);
        },
        enabled: !!user?.email
    });

    // ২. প্রোফাইল আপডেট হ্যান্ডলার (Firebase + MongoDB)
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const bio = form.bio.value;

        try {
            // STEP 1: Firebase Auth আপডেট (যাতে Navbar/Sidebar সাথে সাথে চেঞ্জ হয়)
            await updateProfile(user, {
                displayName: name,
                photoURL: photo
            });

            // STEP 2: MongoDB আপডেট
            const updatedInfo = { name, photo, bio };
            const res = await fetch(`https://life-lesson-server-nine.vercel.app/users/update/${user?.email}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(updatedInfo)
            });
            const data = await res.json();

            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                queryClient.invalidateQueries(['admin-profile']);
                setIsEditing(false);
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated!",
                    text: "Your information has been synced across the entire platform.",
                    showConfirmButton: false,
                    timer: 2000
                });
                // তথ্যগুলো সব জায়গায় রিফ্রেশ করার জন্য
                window.location.reload(); 
            }
        } catch (error) {
            console.error("Update Error:", error);
            Swal.fire("Error", "Failed to update profile", "error");
        } finally {
            setUpdating(false);
        }
    };

    if (isLoading) return <div className="h-96 flex items-center justify-center text-indigo-600 font-black animate-pulse">Loading Admin Profile...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
            
            {/* --- প্রোফাইল হেডার কার্ড (Name, Email, Photo, Badge) --- */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden mb-10">
                <div className="h-40 bg-slate-900 relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
                <div className="px-10 pb-10">
                    <div className="relative -mt-20 flex flex-col md:flex-row items-end gap-8">
                        <div className="relative group">
                            <img 
                                className="w-44 h-44 rounded-[2.5rem] object-cover border-8 border-white shadow-2xl" 
                                src={adminData.photo || user?.photoURL || "https://i.ibb.co/mRpg6Ph/user-placeholder.png"} 
                                alt="Admin" 
                            />
                            {isEditing && <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center text-white"><Camera size={30} /></div>}
                        </div>

                        <div className="flex-1 pb-4">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-4xl font-black text-slate-800 tracking-tighter">{adminData.name || user?.displayName}</h1>
                                <span className="px-4 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-full flex items-center gap-1.5 shadow-lg shadow-indigo-200 ring-4 ring-indigo-50">
                                    <ShieldCheck size={14} /> Admin
                                </span>
                            </div>
                            <p className="text-slate-400 font-bold mt-2 flex items-center gap-2">
                                <Mail size={16} className="text-indigo-500" /> {user?.email}
                            </p>
                        </div>

                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isEditing ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white'}`}
                        >
                            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* --- ৪. Activity Summary (Stats) --- */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <History size={14} className="text-indigo-500" /> Activity Summary
                        </h3>
                        <div className="space-y-4">
                            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><ListChecks size={18} /></div>
                                    <span className="text-sm font-bold text-slate-600">Moderated</span>
                                </div>
                                <span className="text-xl font-black text-slate-800">{adminData.totalLessons || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ৫. Profile Update Form (Update Name & Photo) --- */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Update Display Name</label>
                                        <input 
                                            name="name" 
                                            required
                                            defaultValue={adminData.name || user?.displayName} 
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-700" 
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Update Photo URL</label>
                                        <input 
                                            name="photo" 
                                            required
                                            defaultValue={adminData.photo || user?.photoURL} 
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-700" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Admin Biography</label>
                                    <textarea 
                                        name="bio" 
                                        rows="4" 
                                        defaultValue={adminData.bio || "System Administrator at Digital Life Lessons."} 
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-700 resize-none"
                                    ></textarea>
                                </div>
                                <button 
                                    disabled={updating}
                                    type="submit" 
                                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <Save size={20} /> {updating ? "Syncing..." : "Save New Settings"}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-8 text-center md:text-left">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <User size={14} className="text-indigo-500" /> Admin Profile Details
                                </h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Full Name</p>
                                            <p className="font-bold text-slate-700 text-lg">{adminData.name || user?.displayName}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Account Role</p>
                                            <p className="font-bold text-indigo-600 text-lg">System Administrator</p>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-slate-50">
                                        <p className="text-[10px] font-black text-slate-300 uppercase mb-2">Biography</p>
                                        <p className="text-slate-500 font-medium leading-relaxed italic">
                                            "{adminData.bio || "No biography added yet."}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;