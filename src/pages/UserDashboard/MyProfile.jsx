import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { 
  Camera, Mail, User, ShieldCheck, 
  Save, Edit2, BookOpen, Heart, 
  Star, ArrowRight 
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  
  // ডামি ডাটা: এগুলো পরবর্তীতে আপনার API (MongoDB) থেকে আসবে
  const [myLessons, setMyLessons] = useState([
    { _id: '1', title: 'The Power of Early Rising', category: 'Habits', privacy: 'Public' },
    { _id: '2', title: 'Staying Positive in Crisis', category: 'Mindset', privacy: 'Public' },
  ]);
  const [isPremium, setIsPremium] = useState(true); // এটি চেক করবে ইউজার প্রিমিয়াম কি না

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    updateUserProfile(name, photo)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully!',
          icon: 'success',
          confirmButtonColor: '#4F46E5',
        });
        setIsEditing(false);
      })
      .catch((error) => {
        Swal.fire('Error!', error.message, 'error');
      });
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      {/* ১. হেডার সেকশন */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-800">My Profile</h2>
        <p className="text-gray-500 font-medium">আপনার প্রোফাইল এবং অবদানের বিস্তারিত তথ্য এখানে দেখুন।</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ২. বাম পাশ: প্রোফাইল স্ট্যাটাস কার্ড */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            {/* Premium Badge (ডকুমেন্ট অনুযায়ী) */}
            {isPremium && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-white p-2 rounded-full shadow-lg border-2 border-white animate-pulse">
                <Star size={20} fill="currentColor" />
              </div>
            )}

            <div className="relative group">
              <img 
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                alt="profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50 p-1 shadow-md"
              />
              <div className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full border-2 border-white shadow-lg">
                <Camera size={16} />
              </div>
            </div>
            
            <h3 className="mt-5 text-xl font-black text-gray-800">{user?.displayName}</h3>
            {isPremium ? (
              <span className="mt-2 px-4 py-1 bg-yellow-50 text-yellow-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                 Premium ⭐
              </span>
            ) : (
              <span className="mt-2 px-4 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                Free Plan
              </span>
            )}
            
            {/* Stats Counter (ডকুমেন্ট অনুযায়ী) */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full border-t border-gray-50 pt-8">
               <div className="text-center">
                  <p className="text-2xl font-black text-gray-800">{myLessons.length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lessons</p>
               </div>
               <div className="text-center border-l border-gray-50">
                  <p className="text-2xl font-black text-gray-800">08</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saved</p>
               </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-100">
             <h4 className="font-black text-lg">Growth Status</h4>
             <p className="text-indigo-100 text-sm mt-1">আপনি নিয়মিত নতুন জ্ঞান শেয়ার করছেন। এভাবেই এগিয়ে যান!</p>
             <div className="mt-6 h-2 bg-indigo-500 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[65%]"></div>
             </div>
          </div>
        </div>

        {/* ৩. ডান পাশ: অ্যাকাউন্ট এডিট ফর্ম */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden h-fit">
          <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h4 className="font-black text-gray-800 flex items-center gap-2 uppercase tracking-tighter">
              Account Details
            </h4>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all"
              >
                <Edit2 size={14} /> Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleUpdate} className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label>
              <input 
                type="text" name="name" defaultValue={user?.displayName} disabled={!isEditing}
                className={`w-full px-5 py-3.5 rounded-2xl outline-none transition-all font-bold ${
                  isEditing ? 'bg-white border border-indigo-100 focus:border-indigo-500 shadow-sm' : 'bg-gray-50 border-transparent text-gray-500 cursor-not-allowed'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase ml-1">Email Address</label>
              <input 
                type="email" defaultValue={user?.email} disabled
                className="w-full px-5 py-3.5 bg-gray-50 border-transparent text-gray-400 rounded-2xl font-bold cursor-not-allowed"
              />
            </div>

            {isEditing && (
              <>
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Photo URL</label>
                  <input 
                    type="url" name="photo" defaultValue={user?.photoURL}
                    className="w-full px-5 py-3.5 bg-white border border-indigo-100 focus:border-indigo-500 rounded-2xl outline-none font-bold shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <button type="submit" className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
                    <Save size={18} /> Save Changes
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-500 px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      {/* ৪. নিচের অংশ: User's Public Lessons Grid (ডকুমেন্ট অনুযায়ী) */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
             <BookOpen className="text-indigo-600" /> My Public Lessons
           </h3>
           <Link to="/dashboard/my-lessons" className="text-indigo-600 font-bold text-sm hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myLessons.map((lesson) => (
            <div key={lesson._id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full uppercase tracking-widest">
                {lesson.category}
              </span>
              <h4 className="mt-5 font-black text-gray-800 text-xl leading-snug">{lesson.title}</h4>
              <p className="text-gray-400 text-sm mt-3 line-clamp-2">এই লেসনটি পাবলিকলি শেয়ার করা হয়েছে যাতে অন্যরাও শিখতে পারে...</p>
              
              <Link to={`/lesson-details/${lesson._id}`} className="mt-8 flex items-center justify-between group">
                 <span className="text-gray-800 font-black text-sm group-hover:text-indigo-600 transition-colors">Details</span>
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                 </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;