import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, BookOpen, AlertTriangle, Crown, CalendarDays, TrendingUp } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AdminHome = () => {
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await fetch('https://life-lesson-server-nine.vercel.app/admin-stats');
            return res.json();
        },
        refetchInterval: 5000, // প্রতি ৫ সেকেন্ডে লাইভ ডাটা আপডেট হবে
    });

    if (isLoading) return (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold animate-pulse">Loading Live Stats...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* ১. প্ল্যাটফর্ম অ্যানালিটিক্স (Stats Card) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.usersCount} icon={<Users size={20}/>} color="bg-blue-500" />
                <StatCard title="Public Lessons" value={stats.lessonsCount} icon={<BookOpen size={20}/>} color="bg-green-500" />
                <StatCard title="Reported" value={stats.reportedCount} icon={<AlertTriangle size={20}/>} color="bg-red-500" />
                <StatCard title="Today's New" value={stats.todayLessonsCount} icon={<CalendarDays size={20}/>} color="bg-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ২. গ্রাফিকাল প্রেজেন্টেশন (Recharts) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Growth Analytics</h3>
                        <div className="flex items-center gap-2 text-green-500 bg-green-50 px-2 py-1 rounded text-[10px] font-bold">
                             <TrendingUp size={12}/> LIVE
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.chartData || [{name: 'Loading', lessons: 0}]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="lessons" 
                                    stroke="#6366f1" 
                                    strokeWidth={3}
                                    fill="#6366f1" 
                                    fillOpacity={0.1} 
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ৩. অ্যাক্টিভিটি মনিটরিং (Top Contributors) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 text-amber-600 font-bold uppercase tracking-wider text-sm">
                        <Crown size={18} /> Top Contributors
                    </div>
                    <div className="space-y-4">
                        {stats.topContributors?.map((user, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src={user.photo || "https://i.ibb.co/0Q9SX9y/user.png"} alt="" />
                                    <p className="text-sm font-bold text-slate-700 truncate w-24 md:w-full">{user.name || "Anonymous"}</p>
                                </div>
                                <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 border shadow-sm whitespace-nowrap">
                                    {user.count} Lessons
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ছোট কার্ড কম্পোনেন্ট
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className={`${color} p-3 rounded-xl text-white shadow-lg shadow-opacity-20`}>
            {icon}
        </div>
        <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{title}</p>
            <h2 className="text-2xl font-black text-slate-800 leading-none">{value || 0}</h2>
        </div>
    </div>
);

export default AdminHome;