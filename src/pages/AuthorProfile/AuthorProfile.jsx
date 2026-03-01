import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthorProfile = () => {
    const { email } = useParams(); // URL থেকে লেখকের ইমেইল নিচ্ছে
    const [authorLessons, setAuthorLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // আপনার ব্যাকএন্ডে অলরেডি '/my-lessons/:email' এপিআই আছে, সেটাই আমরা ব্যবহার করছি
        fetch(`http://localhost:3000/my-lessons/${email}`)
            .then(res => res.json())
            .then(data => {
                setAuthorLessons(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [email]);

    if (loading) return <div className="pt-40 text-center font-bold text-indigo-600">Loading author's wisdom...</div>;

    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-6 max-w-7xl mx-auto">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-10 transition-colors">
                <ArrowLeft size={20} /> Back
            </button>

            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900">
                    Lessons by <span className="text-indigo-600 italic underline">"{email}"</span>
                </h2>
                <p className="text-slate-500 mt-4 font-bold uppercase tracking-widest text-xs">
                   Total Published: {authorLessons.length} Lessons
                </p>
            </div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authorLessons.length > 0 ? (
                    authorLessons.map((lesson) => (
                        <div key={lesson._id} className="border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                             <img src={lesson.image || "https://via.placeholder.com/300"} alt="" className="w-full h-48 object-cover rounded-2xl mb-4" />
                             <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">{lesson.category}</span>
                             <h3 className="text-xl font-black text-slate-900 mt-3 group-hover:text-indigo-600 transition-colors">{lesson.title}</h3>
                             <p className="text-slate-500 text-sm mt-2 line-clamp-2">{lesson.description}</p>
                             <button 
                                onClick={() => navigate(`/lesson/${lesson._id}`)}
                                className="mt-6 text-sm font-black text-slate-900 border-b-2 border-slate-900 hover:text-indigo-600 hover:border-indigo-600 transition-all"
                             >
                                READ STORY
                             </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem]">
                        <p className="text-slate-400 font-bold italic">This author hasn't shared any public lessons yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthorProfile;