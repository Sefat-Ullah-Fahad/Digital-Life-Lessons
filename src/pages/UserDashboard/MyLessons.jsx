import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { 
  Edit3, Trash2, Globe, Calendar, Zap, EyeOff, Loader2 
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyLessons = () => {
  const { user } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ডাটাবেস থেকে ইউজারের লেসন ফেচ করা
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-lessons/${user?.email}`)
        .then(res => res.json())
        .then(data => {
          setLessons(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  // ২. ডিলিট ফাংশন (Backend Connect)
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "একবার ডিলিট করলে এটি আর ফিরে পাওয়া যাবে না!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6366f1',
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        // ব্যাকএন্ডে ডিলিট রিকোয়েস্ট পাঠানো
        fetch(`http://localhost:3000/lessons/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'আপনার লেসনটি মুছে ফেলা হয়েছে।', 'success');
              // ৩. UI থেকে ডিলিট করা ডাটা রিমুভ করা
              const remainingLessons = lessons.filter(lesson => lesson._id !== id);
              setLessons(remainingLessons);
            }
          })
          .catch(err => {
            Swal.fire('Error!', 'মুছে ফেলতে সমস্যা হয়েছে।', 'error');
          });
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
        <Link to="/dashboard/add-lesson" className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95">
          <Zap size={18} fill="currentColor" /> Add New
        </Link>
      </div>

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
                <tr>
                  <td colSpan="4" className="p-20 text-center font-bold text-indigo-400 italic">
                    <Loader2 className="animate-spin inline-block mr-2" /> Loading your wisdom...
                  </td>
                </tr>
              ) : lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black uppercase">
                          {lesson.category?.charAt(0) || 'L'}
                        </div>
                        <div>
                          <p className="font-black text-gray-800 text-base mb-1 truncate max-w-[200px]">{lesson.title}</p>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(lesson.createdAt).toLocaleDateString()}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{lesson.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-600 flex items-center gap-1">❤️ {lesson.likesCount || 0}</span>
                          <span className="text-xs font-bold text-gray-600 flex items-center gap-1">🔖 {lesson.favoritesCount || 0}</span>
                        </div>
                        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Engagement</p>
                      </div>
                    </td>

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
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center font-bold text-gray-400 italic">
                    You haven't added any lessons yet. Start sharing your wisdom!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyLessons;