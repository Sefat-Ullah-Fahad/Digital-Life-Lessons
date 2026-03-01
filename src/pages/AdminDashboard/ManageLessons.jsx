import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; 
import { Trash2, Star, Search, AlertTriangle, Eye, CheckCircle, Globe, Lock, ShieldAlert } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageLessons = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // --- ১. লাইভ স্ট্যাটাস ডাটা (আপনার Admin Home এর মতো) ---
    const { data: adminStats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await fetch('https://life-lesson-server-nine.vercel.app/admin-stats');
            return res.json();
        },
        refetchInterval: 5000, // প্রতি ৫ সেকেন্ডে অটো আপডেট হবে
    });

    // --- ২. লেসন লিস্ট ডাটা ফেচিং ---
    const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
        queryKey: ['manage-lessons'],
        queryFn: async () => {
            const res = await fetch('https://life-lesson-server-nine.vercel.app/lessons');
            return res.json();
        }
    });

    // --- ৩. ডিলিট হ্যান্ডলার ---
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This lesson will be removed permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, Delete It!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://life-lesson-server-nine.vercel.app/lessons/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            // লিস্ট এবং স্ট্যাটাস উভয়ই ইনভ্যালিডেট হবে
                            queryClient.invalidateQueries(['manage-lessons']);
                            queryClient.invalidateQueries(['admin-stats']); 
                            Swal.fire("Deleted!", "The lesson has been removed.", "success");
                        }
                    });
            }
        });
    };

    // --- ৪. ফিচারড হ্যান্ডলার ---
    const handleToggleFeatured = (id, currentStatus) => {
        fetch(`https://life-lesson-server-nine.vercel.app/lessons/feature/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ isFeatured: !currentStatus })
        })
        .then(res => res.json())
        .then(() => {
            queryClient.invalidateQueries(['manage-lessons']);
            Swal.fire({ title: !currentStatus ? "Featured!" : "Removed!", icon: "success", timer: 800, showConfirmButton: false });
        });
    };

    // --- ৫. রিভিউড মার্ক হ্যান্ডলার ---
    const handleMarkReviewed = (id) => {
        fetch(`https://life-lesson-server-nine.vercel.app/lessons/review/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ isReviewed: true, isReported: false })
        })
        .then(res => res.json())
        .then(() => {
            queryClient.invalidateQueries(['manage-lessons']);
            queryClient.invalidateQueries(['admin-stats']); // Flagged count সাথে সাথে কমবে
            Swal.fire("Reviewed!", "Content marked as safe.", "success");
        });
    };

    // --- ৬. ফিল্টারিং লজিক ---
    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = lesson.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory;
        
        let matchesStatus = true;
        const visibility = lesson.visibility?.toLowerCase();
        
        if (statusFilter === "Public") matchesStatus = visibility === "public";
        if (statusFilter === "Private") matchesStatus = visibility === "private";
        if (statusFilter === "Flagged") matchesStatus = lesson.isReported === true;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    if (lessonsLoading || statsLoading) return (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold animate-pulse">Synchronizing Moderator Data...</p>
        </div>
    );

    return (
        <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            
            {/* --- ১. প্ল্যাটফর্ম অ্যানালিটিক্স (Admin Home স্টাইলে) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard 
                    title="Public Lessons" 
                    value={adminStats.lessonsCount} 
                    icon={<Globe size={24}/>} 
                    color="bg-emerald-500" 
                />
                <StatCard 
                    title="Private Lessons" 
                    value={adminStats.privateCount || 0} // আপনার এপিআই থেকে privateCount পাঠাতে হবে
                    icon={<Lock size={24}/>} 
                    color="bg-amber-500" 
                />
                <StatCard 
                    title="Flagged Content" 
                    value={adminStats.reportedCount} 
                    icon={<ShieldAlert size={24}/>} 
                    color="bg-rose-500" 
                />
            </div>

            {/* --- Header & Filters --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 px-2">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Lesson <span className="text-indigo-600">Moderation</span></h1>
                    <p className="text-slate-500 font-bold mt-1 text-xs uppercase tracking-widest opacity-70">Live platform management</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search lessons..." 
                            className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] outline-none w-72 text-sm font-bold shadow-sm focus:ring-4 ring-indigo-500/10 transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select 
                        className="bg-white border border-slate-200 px-6 py-4 rounded-[1.5rem] text-xs font-black text-slate-600 uppercase tracking-widest outline-none cursor-pointer"
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Visibility</option>
                        <option value="Public">Public Only</option>
                        <option value="Private">Private Only</option>
                        <option value="Flagged">⚠️ Flagged</option>
                    </select>

                    <select 
                        className="bg-white border border-slate-200 px-6 py-4 rounded-[1.5rem] text-xs font-black text-slate-600 uppercase tracking-widest outline-none cursor-pointer"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Personal Growth">Personal Growth</option>
                        <option value="Career">Career</option>
                        <option value="Mindset">Mindset</option>
                        <option value="Relationships">Relationships</option>
                        <option value="Mistakes Learned">Mistakes Learned</option>
                    </select>
                </div>
            </div>

            {/* --- Table Section --- */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900 border-b border-slate-800">
                            <tr>
                                <th className="p-7 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lesson Detail</th>
                                <th className="p-7 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Visibility</th>
                                <th className="p-7 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Review</th>
                                <th className="p-7 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Featured</th>
                                <th className="p-7 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredLessons.map((lesson) => (
                                <tr key={lesson._id} className={`group hover:bg-indigo-50/30 transition-all ${lesson.isReported ? 'bg-rose-50/30' : ''}`}>
                                    <td className="p-7">
                                        <div className="flex items-center gap-5">
                                            <div className="relative">
                                                <img className="w-16 h-16 rounded-[1.2rem] object-cover shadow-md transition-transform group-hover:scale-105" src={lesson.image} alt="" />
                                                {lesson.isReported && <div className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full animate-bounce shadow-lg"><AlertTriangle size={14} /></div>}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 text-base leading-tight">{lesson.title}</p>
                                                <span className="text-[10px] text-indigo-600 font-black uppercase bg-indigo-50 px-2 py-0.5 rounded mt-1 inline-block">By: {lesson.authorName}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-7 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border flex items-center justify-center gap-2 mx-auto w-fit ${lesson.visibility?.toLowerCase() === 'public' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                            {lesson.visibility?.toLowerCase() === 'public' ? <Globe size={12}/> : <Lock size={12}/>} {lesson.visibility}
                                        </span>
                                    </td>
                                    <td className="p-7 text-center">
                                        {lesson.isReviewed ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <CheckCircle size={22} className="text-emerald-500" />
                                                <span className="text-[9px] font-black text-emerald-500 uppercase">Verified</span>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => handleMarkReviewed(lesson._id)}
                                                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                    <td className="p-7 text-center">
                                        <button 
                                            onClick={() => handleToggleFeatured(lesson._id, lesson.isFeatured)}
                                            className={`p-3 rounded-xl transition-all border-2 ${lesson.isFeatured ? 'bg-amber-400 text-white border-amber-300 shadow-lg scale-110' : 'bg-slate-50 text-slate-300 border-slate-100 hover:border-amber-200'}`}
                                        >
                                            <Star size={20} fill={lesson.isFeatured ? "currentColor" : "none"} />
                                        </button>
                                    </td>
                                    <td className="p-7 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => navigate(`/lesson/${lesson._id}`)} className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><Eye size={20}/></button>
                                            <button onClick={() => handleDelete(lesson._id)} className="p-3 bg-rose-50 border border-rose-100 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={20}/></button>
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

// Admin Home এর মতো কার্ড কম্পোনেন্ট
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
        <div className={`${color} p-5 rounded-[1.5rem] text-white shadow-lg group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
            <h2 className="text-3xl font-black text-slate-800">{value || 0}</h2>
        </div>
    </div>
);

export default ManageLessons;