import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ShieldCheck, Trash2, Mail, Award, BookCheck, Activity } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const queryClient = useQueryClient();

    // লাইভ ডাটা ফেচিং (প্রতি ৫ সেকেন্ডে অটো রিফ্রেশ)
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://life-lesson-server-nine.vercel.app/users');
            return res.json();
        },
        refetchInterval: 5000, 
    });

    // রোল আপডেট (Promote to Admin)
    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Promote to Admin?",
            text: `Are you sure you want to promote ${user.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            confirmButtonText: "Yes, Promote"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://life-lesson-server-nine.vercel.app/users/admin/${user._id}`, { method: 'PATCH' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            queryClient.invalidateQueries(['users']);
                            Swal.fire("Success!", "User is now an Admin.", "success");
                        }
                    });
            }
        });
    };

    // ইউজার ডিলিট
    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be permanently removed!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://life-lesson-server-nine.vercel.app/users/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            queryClient.invalidateQueries(['users']);
                            Swal.fire("Deleted!", "User account removed.", "success");
                        }
                    });
            }
        });
    };

    if (isLoading) return <div className="h-96 flex items-center justify-center animate-pulse text-indigo-600 font-bold">Loading Community Data...</div>;

    return (
        <div className="animate-in fade-in duration-700 p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">User <span className="text-indigo-600">Directory</span></h1>
                    <p className="text-slate-500 font-bold mt-1">Manage roles and monitor contributions.</p>
                </div>
                <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl text-indigo-600">
                    <Activity size={18} className="animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">Live Syncing: {users.length} Users</span>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/80 border-b border-slate-100">
                            <tr>
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member</th>
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email</th>
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lessons Added</th>
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img className="w-12 h-12 rounded-2xl object-cover ring-4 ring-slate-50 group-hover:ring-indigo-100 transition-all shadow-sm" src={user.photo || "https://i.ibb.co/0Q9SX9y/user.png"} alt="" />
                                                {user.role === 'admin' && <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1 rounded-lg border-2 border-white shadow-lg"><Award size={10} /></div>}
                                            </div>
                                            <p className="font-black text-slate-800 text-sm">{user.name || "N/A"}</p>
                                        </div>
                                    </td>
                                    <td className="p-6 text-slate-500 font-bold text-xs">
                                        <div className="flex items-center gap-2"><Mail size={14} className="text-slate-300" /> {user.email}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl text-xs font-black border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <BookCheck size={14} /> 
                                            <span>{user.totalLessons || 0} Lessons</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        {user.role === 'admin' ? 
                                            <span className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-amber-200">Admin</span> : 
                                            <span className="text-slate-400 bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">User</span>
                                        }
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-center items-center gap-3">
                                            {user.role !== 'admin' && (
                                                <button onClick={() => handleMakeAdmin(user)} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90"><ShieldCheck size={18} /></button>
                                            )}
                                            <button onClick={() => handleDeleteUser(user._id)} className="p-2.5 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;