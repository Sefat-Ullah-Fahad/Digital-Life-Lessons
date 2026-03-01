import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2, ShieldCheck, AlertCircle, Eye, User, MessageSquare } from 'lucide-react';
import Swal from 'sweetalert2';

const ReportedLessons = () => {
    const queryClient = useQueryClient();

    // ১. ডাইনামিক রিপোর্ট ফেচ করা
    const { data: reports = [], isLoading } = useQuery({
        queryKey: ['reported-lessons'],
        queryFn: async () => {
            const res = await fetch('https://life-lesson-server-nine.vercel.app/reports-admin');
            return res.json();
        }
    });

    // ২. রিপোর্ট খারিজ করা (Dismiss)
    const handleDismiss = (id) => {
        fetch(`https://life-lesson-server-nine.vercel.app/reports/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    queryClient.invalidateQueries(['reported-lessons']);
                    Swal.fire({
                        title: "Report Dismissed",
                        text: "The report has been removed, but the lesson remains.",
                        icon: "success",
                        timer: 1500
                    });
                }
            });
    };

    // ৩. লেসন ডিলিট করা (রিপোর্টের ভিত্তিতে কঠোর ব্যবস্থা)
    const handleDeleteLesson = (lessonId, reportId) => {
        Swal.fire({
            title: "Delete This Lesson?",
            text: "This will permanently remove the lesson and its report!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, Delete Everything"
        }).then((result) => {
            if (result.isConfirmed) {
                // প্রথমে লেসন ডিলিট, তারপর রিপোর্ট ডিলিট
                fetch(`https://life-lesson-server-nine.vercel.app/lessons/${lessonId}`, { method: 'DELETE' })
                    .then(() => fetch(`https://life-lesson-server-nine.vercel.app/reports/${reportId}`, { method: 'DELETE' }))
                    .then(() => {
                        queryClient.invalidateQueries(['reported-lessons']);
                        Swal.fire("Action Taken", "Lesson and report both deleted.", "success");
                    });
            }
        });
    };

    if (isLoading) return <div className="p-20 text-center font-black text-rose-500 animate-pulse">Scanning for reports...</div>;

    return (
        <div className="p-8 animate-in fade-in duration-700">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <AlertCircle className="text-rose-500" size={28} />
                    Reported <span className="text-rose-500">Content</span>
                </h1>
                <p className="text-slate-500 font-medium mt-1 text-sm">Review community flags and maintain safety standards.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <div key={report._id} className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <img 
                                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-rose-50 shadow-sm" 
                                        src={report.lessonDetails?.image} 
                                        alt="" 
                                    />
                                    <div>
                                        <h3 className="font-bold text-slate-800 leading-tight line-clamp-1">{report.lessonDetails?.title}</h3>
                                        <p className="text-[10px] font-black text-indigo-500 uppercase mt-1 tracking-widest">
                                            By: {report.lessonDetails?.authorName}
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-rose-50 text-rose-500 text-[10px] font-black uppercase rounded-lg border border-rose-100">
                                    {report.reportReason || "Policy Violation"}
                                </span>
                            </div>

                            <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-2 text-slate-400">
                                    <MessageSquare size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Report Detail</span>
                                </div>
                                <p className="text-sm text-slate-600 font-medium italic">
                                    "{report.reportDescription || "No detailed description provided by the user."}"
                                </p>
                                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                        <User size={12} /> Reported by: {report.reporterEmail}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <button 
                                    onClick={() => handleDismiss(report._id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                                >
                                    <ShieldCheck size={16} /> Dismiss Report
                                </button>
                                <button 
                                    onClick={() => handleDeleteLesson(report.lessonId, report._id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-500 rounded-xl font-bold text-xs hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                                >
                                    <Trash2 size={16} /> Delete Lesson
                                </button>
                                <button className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                                    <Eye size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300">
                        <ShieldCheck size={64} className="mb-4 opacity-20" />
                        <p className="font-black uppercase tracking-[0.3em] text-sm">All clean! No reports found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportedLessons;