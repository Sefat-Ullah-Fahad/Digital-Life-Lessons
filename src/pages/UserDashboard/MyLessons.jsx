import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { 
  Edit3, Trash2, Eye, EyeOff, 
  Zap, Globe, Calendar, BarChart2,
  MoreVertical, ExternalLink
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyLessons = () => {
  const { user } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডামি ডাটা (আপনি যখন API কানেক্ট করবেন তখন এটি ফেলে দেবেন)
  useEffect(() => {
    setTimeout(() => {
      setLessons([
        { 
          _id: '1', title: 'Power of Consistency', category: 'Mindset', 
          privacy: 'Public', accessLevel: 'Free', createdAt: '2026-02-15',
          likesCount: 120, favoritesCount: 45 
        },
        { 
          _id: '2', title: 'Learning from Mistakes', category: 'Personal Growth', 
          privacy: 'Private', accessLevel: 'Premium', createdAt: '2026-02-20',
          likesCount: 85, favoritesCount: 12 
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "আপনি কি নিশ্চিতভাবে এই লেসনটি মুছে ফেলতে চান?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6366f1',
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Lesson removed successfully.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">My Lessons</h2>
          <p className="text-gray-500 font-medium">আপনার তৈরি করা সকল লেসন এখানে ম্যানেজ করুন।</p>
        </div>
        <Link to="/dashboard/add-lesson" className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all">
          <Zap size={18} fill="currentColor" /> Add New
        </Link>
      </div>

      {/* টেবিল কার্ড */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lesson Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stats</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Settings</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="4" className="p-20 text-center font-bold text-gray-300">Loading Lessons...</td></tr>
              ) : (
                lessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-gray-50/30 transition-colors group">
                    {/* লেসন টাইটেল ও ক্যাটাগরি */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold">
                          {lesson.category[0]}
                        </div>
                        <div>
                          <p className="font-black text-gray-800 text-base mb-1">{lesson.title}</p>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            <span className="flex items-center gap-1"><Calendar size={12}/> {lesson.createdAt}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{lesson.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* স্ট্যাটস (Likes, Saves) */}
                    <td className="px-6 py-6 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-600 flex items-center gap-1">❤️ {lesson.likesCount}</span>
                          <span className="text-xs font-bold text-gray-600 flex items-center gap-1">🔖 {lesson.favoritesCount}</span>
                        </div>
                        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Engagement</p>
                      </div>
                    </td>

                    {/* সেটিংস (Visibility & Access) */}
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          {lesson.privacy === 'Public' ? <Globe size={14} className="text-green-500" /> : <EyeOff size={14} className="text-gray-400" />}
                          <span className={`text-[10px] font-black uppercase ${lesson.privacy === 'Public' ? 'text-green-600' : 'text-gray-500'}`}>
                            {lesson.privacy}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap size={14} className={lesson.accessLevel === 'Premium' ? 'text-yellow-500' : 'text-blue-500'} />
                          <span className={`text-[10px] font-black uppercase ${lesson.accessLevel === 'Premium' ? 'text-yellow-600' : 'text-blue-600'}`}>
                            {lesson.accessLevel}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* অ্যাকশন বাটনসমূহ */}
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/dashboard/update-lesson/${lesson._id}`}
                          className="p-2.5 bg-gray-50 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm"
                        >
                          <Edit3 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(lesson._id)}
                          className="p-2.5 bg-gray-50 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyLessons;