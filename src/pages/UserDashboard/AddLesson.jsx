import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { 
  PlusCircle, Book, FileText, 
  Image as ImageIcon, Globe, Lock, 
  Smile, Zap, Info 
} from 'lucide-react';
import Swal from 'sweetalert2';

const AddLesson = () => {
  const { user } = useContext(AuthContext);
  
  // পরবর্তীতে ডাটাবেস থেকে ইউজারের স্ট্যাটাস চেক করে এটি আপডেট করা হবে
  const [isPremiumUser, setIsPremiumUser] = useState(false); 

  const handleAddLesson = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const emotionalTone = form.emotionalTone.value;
    const privacy = form.privacy.value;
    const accessLevel = form.accessLevel.value;
    const image = form.image.value;

    const newLesson = {
      title,
      description,
      category,
      emotionalTone,
      privacy,
      accessLevel,
      image,
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorPhoto: user?.photoURL,
      createdAt: new Date().toISOString(),
      likes: [],
      favoritesCount: 0
    };

    // --- ব্যাকএন্ডে ডাটা পাঠানোর লজিক (নতুন অংশ) ---
    fetch('http://localhost:3000/lessons', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newLesson)
    })
    .then(res => res.json())
    .then(data => {
      if (data.insertedId) {
        // সফলভাবে সেভ হলে
        Swal.fire({
          title: 'Lesson Created!',
          text: 'Your wisdom has been shared successfully in our database.',
          icon: 'success',
          confirmButtonColor: '#4F46E5',
        });
        form.reset(); // ফর্ম ক্লিয়ার করা
      }
    })
    .catch(error => {
      console.error('Error adding lesson:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add lesson. Is the server running?',
        icon: 'error',
      });
    });
    // --- ব্যাকএন্ড লজিক শেষ ---
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Add New Life Lesson</h2>
        <p className="text-gray-500 font-medium mt-1">আপনার জীবনের অভিজ্ঞতা অন্যদের সাথে শেয়ার করুন।</p>
      </div>

      <form onSubmit={handleAddLesson} className="space-y-6">
        {/* মেইন কন্টেন্ট কার্ড */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          
          {/* ১. টাইটেল */}
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Lesson Title</label>
            <div className="relative">
              <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
              <input 
                type="text" name="title" required
                placeholder="একটি আকর্ষণীয় শিরোনাম দিন..."
                className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-bold"
              />
            </div>
          </div>

          {/* ২. ক্যাটাগরি এবং ইমোショナル টোন */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Category</label>
              <select name="category" required className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-bold appearance-none">
                <option value="Personal Growth">Personal Growth</option>
                <option value="Career">Career</option>
                <option value="Relationships">Relationships</option>
                <option value="Mindset">Mindset</option>
                <option value="Mistakes Learned">Mistakes Learned</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Emotional Tone</label>
              <div className="relative">
                <Smile className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                <select name="emotionalTone" required className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-bold appearance-none">
                  <option value="Motivational">Motivational</option>
                  <option value="Sad">Sad</option>
                  <option value="Realization">Realization</option>
                  <option value="Gratitude">Gratitude</option>
                </select>
              </div>
            </div>
          </div>

          {/* ৩. ডেসক্রিপশন */}
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Full Description</label>
            <textarea 
              name="description" required rows="6"
              placeholder="আপনার লেসন বা গল্পটি বিস্তারিত লিখুন..."
              className="w-full p-5 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium resize-none"
            ></textarea>
          </div>

          {/* ৪. ইমেজ (অপশনাল) */}
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Featured Image (Optional)</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="url" name="image"
                placeholder="ইমেজ ইউআরএল দিন..."
                className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border-none rounded-2xl outline-none font-medium"
              />
            </div>
          </div>
        </div>

        {/* ৫. সেটিংস কার্ড (Privacy & Access) */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-indigo-600" />
              <label className="text-sm font-black text-gray-800">Visibility</label>
            </div>
            <select name="privacy" className="w-full px-5 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-bold">
              <option value="Public">Public (সবাই দেখতে পাবে)</option>
              <option value="Private">Private (শুধু আমি দেখব)</option>
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={18} className={`${isPremiumUser ? 'text-yellow-500' : 'text-gray-400'}`} />
                <label className="text-sm font-black text-gray-800">Access Level</label>
              </div>
              {!isPremiumUser && (
                <div className="group relative flex items-center gap-1 cursor-help">
                  <Info size={14} className="text-gray-400" />
                  <span className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Upgrade to Premium to create paid lessons
                  </span>
                </div>
              )}
            </div>
            <select 
              name="accessLevel" 
              disabled={!isPremiumUser}
              className={`w-full px-5 py-3 rounded-xl border-none outline-none font-bold appearance-none ${
                !isPremiumUser ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-100'
              }`}
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium ⭐</option>
            </select>
          </div>
        </div>

        {/* সাবমিট বাটন */}
        <button 
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
        >
          Publish Lesson <PlusCircle size={20} />
        </button>
      </form>
    </div>
  );
};

export default AddLesson;