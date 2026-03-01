import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { 
  Camera, Mail, User, ShieldCheck, 
  Save, Edit2, BookOpen, Heart, 
  Star, ArrowRight, Loader2 
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [myLessons, setMyLessons] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // প্রিমিয়াম স্ট্যাটাস চেক (যদি আপনার ইউজার ডাটাতে role: 'premium' থাকে)
  const isPremium = user?.role === 'premium' || false; 

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      
      // ১. ইউজারের নিজের লেসনগুলো লোড করা
      const fetchLessons = fetch(`http://localhost:3000/my-lessons/${user?.email}`)
        .then(res => res.json());

      // ২. ইউজারের ফেভারিট কাউন্ট লোড করা
      const fetchFavorites = fetch(`http://localhost:3000/my-favorites?email=${user?.email}`)
        .then(res => res.json());

      Promise.all([fetchLessons, fetchFavorites])
        .then(([lessonsData, favoritesData]) => {
          // শুধু পাবলিক লেসনগুলো ফিল্টার করে প্রোফাইলে দেখানো (ঐচ্ছিক)
          setMyLessons(lessonsData);
          setFavoriteCount(favoritesData.length);
          setLoading(false);
        })
        .catch(err => {
          console.error("Profile Data Fetch Error:", err);
          setLoading(false);
        });
    }
  }, [user]);

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
          timer: 1500,
          showConfirmButton: false
        });
        setIsEditing(false);
      })
      .catch((error) => {
        Swal.fire('Error!', error.message, 'error');
      });
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-indigo-600 font-black tracking-widest uppercase text-[10px]">
      <Loader2 className="animate-spin mb-4" size={32} />
      Loading Profile...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      {/* ১. হেডার সেকশন */}
      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">My Profile</h2>
        <p className="text-slate-500 font-medium mt-1">আপনার প্রোফাইল এবং অবদানের বিস্তারিত তথ্য এখানে দেখুন।</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ২. বাম পাশ: প্রোফাইল স্ট্যাটাস কার্ড */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            {/* Premium Badge */}
            {isPremium && (
              <div className="absolute top-6 right-6 bg-yellow-400 text-white p-2.5 rounded-full shadow-lg border-4 border-white animate-bounce">
                <Star size={20} fill="currentColor" />
              </div>
            )}

            <div className="relative group">
              <img 
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                alt="profile" 
                className="w-36 h-36 rounded-[2.5rem] object-cover border-8 border-slate-50 shadow-inner"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-3 rounded-2xl border-4 border-white shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                <Camera size={18} />
              </div>
            </div>
            
            <h3 className="mt-8 text-2xl font-black text-slate-900">{user?.displayName}</h3>
            {isPremium ? (
              <span className="mt-3 px-5 py-1.5 bg-yellow-50 text-yellow-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 border border-yellow-100">
                 Premium Member ⭐
              </span>
            ) : (
              <span className="mt-3 px-5 py-1.5 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100">
                Standard Explorer
              </span>
            )}
            
            {/* Stats Counter */}
            <div className="grid grid-cols-2 gap-8 mt-10 w-full border-t border-slate-50 pt-10">
               <div className="text-center">
                  <p className="text-3xl font-black text-slate-900">{myLessons.length}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lessons</p>
               </div>
               <div className="text-center border-l border-slate-50 px-4">
                  <p className="text-3xl font-black text-slate-900">{favoriteCount}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Saved</p>
               </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
             <div className="relative z-10">
                <h4 className="font-black text-xl tracking-tight">Growth Journey</h4>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">আপনার শেয়ার করা জ্ঞান অন্যদের অনুপ্রাণিত করছে।</p>
                <div className="mt-8">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                      <span>Progress</span>
                      <span className="text-indigo-400">65%</span>
                   </div>
                   <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[65%] rounded-full group-hover:w-[70%] transition-all duration-1000"></div>
                   </div>
                </div>
             </div>
             <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* ৩. ডান পাশ: অ্যাকাউন্ট এডিট ফর্ম */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden h-fit">
          <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div>
                <h4 className="font-black text-slate-900 uppercase tracking-tighter text-sm">Account Settings</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Manage your identity</p>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
              >
                <Edit2 size={14} /> Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleUpdate} className="p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                            type="text" name="name" defaultValue={user?.displayName} disabled={!isEditing}
                            className={`w-full pl-14 pr-6 py-4 rounded-2xl outline-none transition-all font-bold text-sm ${
                            isEditing ? 'bg-white border-2 border-indigo-50 focus:border-indigo-500 shadow-sm' : 'bg-slate-50 border-transparent text-slate-500 cursor-not-allowed'
                            }`}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                            type="email" defaultValue={user?.email} disabled
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent text-slate-400 rounded-2xl font-bold text-sm cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            {isEditing && (
              <div className="pt-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Photo URL</label>
                  <input 
                    type="url" name="photo" defaultValue={user?.photoURL}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-6 py-4 bg-white border-2 border-indigo-50 focus:border-indigo-500 rounded-2xl outline-none font-bold text-sm shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                  <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center gap-2 active:scale-95">
                    <Save size={16} /> Save Changes
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-100 text-slate-500 px-10 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* ৪. নিচের অংশ: User's Public Lessons Grid */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-10">
            <div>
                <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4 tracking-tight">
                <BookOpen className="text-indigo-600" size={32} /> My Shared Wisdom
                </h3>
                <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-widest ml-12">Publicly available lessons</p>
            </div>
            <Link to="/dashboard/my-lessons" className="bg-white border border-slate-100 text-slate-900 font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">View All</Link>
        </div>
        
        {myLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myLessons.slice(0, 6).map((lesson) => (
                <div key={lesson._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl uppercase tracking-widest">
                    {lesson.category}
                </span>
                <h4 className="mt-6 font-black text-slate-800 text-xl leading-snug group-hover:text-indigo-600 transition-colors">{lesson.title}</h4>
                <p className="text-slate-400 text-sm mt-4 line-clamp-2 leading-relaxed">এই লেসনটি পাবলিকলি শেয়ার করা হয়েছে যাতে অন্যরাও আপনার অভিজ্ঞতা থেকে শিখতে পারে...</p>
                
                <Link to={`/lesson-details/${lesson._id}`} className="mt-10 flex items-center justify-between group/btn">
                    <span className="text-slate-900 font-black text-xs uppercase tracking-widest group-hover/btn:translate-x-1 transition-transform">Read Details</span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover/btn:bg-indigo-600 group-hover/btn:text-white transition-all shadow-inner">
                        <ArrowRight size={20} />
                    </div>
                </Link>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 mb-6 shadow-sm">
                    <BookOpen size={40} />
                </div>
                <h4 className="text-xl font-black text-slate-900">No lessons shared yet</h4>
                <p className="text-slate-400 mt-2 font-medium">আপনার প্রথম লেসনটি আজই পাবলিশ করুন!</p>
                <Link to="/dashboard/add-lesson" className="mt-8 inline-flex bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all">Start Writing</Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;