import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Edit3, Globe, Zap, Image as ImageIcon } from 'lucide-react';
import Swal from 'sweetalert2';

const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(true); // ধরি ইউজার প্রিমিয়াম

  // নির্দিষ্ট লেসন ডাটা লোড করা
  useEffect(() => {
    // API Call: fetch(`/lessons/${id}`)
    // আপাতত ডামি ডাটা ব্যবহার করছি
    setLesson({
      title: 'Power of Consistency',
      description: 'This is a deep dive into how consistency works...',
      category: 'Mindset',
      emotionalTone: 'Motivational',
      privacy: 'Public',
      accessLevel: 'Free',
      image: ''
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update API logic here...
    Swal.fire({
      title: 'Updated!',
      text: 'Lesson updated successfully.',
      icon: 'success',
      confirmButtonColor: '#4F46E5'
    }).then(() => navigate('/dashboard/my-lessons'));
  };

  if(!lesson) return <div className="p-20 text-center font-black animate-pulse">Loading Lesson...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 font-bold mb-6 transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-3">
          <Edit3 className="text-indigo-600" /> Update Lesson
        </h2>
        <p className="text-gray-500 font-medium">আপনার লেসনের তথ্যগুলো এখান থেকে পরিবর্তন করতে পারেন।</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          {/* টাইটেল */}
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Lesson Title</label>
            <input 
              type="text" name="title" defaultValue={lesson.title} required
              className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-bold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ক্যাটাগরি */}
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Category</label>
              <select name="category" defaultValue={lesson.category} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl outline-none font-bold">
                <option value="Personal Growth">Personal Growth</option>
                <option value="Career">Career</option>
                <option value="Mindset">Mindset</option>
                <option value="Mistakes Learned">Mistakes Learned</option>
              </select>
            </div>
            
            {/* ইমোশনাল টোন */}
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Emotional Tone</label>
              <select name="emotionalTone" defaultValue={lesson.emotionalTone} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl outline-none font-bold">
                <option value="Motivational">Motivational</option>
                <option value="Sad">Sad</option>
                <option value="Realization">Realization</option>
              </select>
            </div>
          </div>

          {/* ডেসক্রিপশন */}
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1">Description</label>
            <textarea 
              name="description" defaultValue={lesson.description} rows="5"
              className="w-full p-5 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium resize-none"
            ></textarea>
          </div>

          {/* ইমেজ */}
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1 flex items-center gap-2">
              <ImageIcon size={16}/> Image URL (Optional)
            </label>
            <input 
              type="url" name="image" defaultValue={lesson.image}
              className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl outline-none font-medium"
            />
          </div>
        </div>

        {/* Visibility & Access Settings */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-800 flex items-center gap-2"><Globe size={18}/> Visibility</label>
            <select name="privacy" defaultValue={lesson.privacy} className="w-full px-5 py-3 bg-gray-50 rounded-xl font-bold">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black text-gray-800 flex items-center gap-2"><Zap size={18}/> Access Level</label>
            <select 
              name="accessLevel" 
              defaultValue={lesson.accessLevel} 
              disabled={!isPremiumUser}
              className="w-full px-5 py-3 bg-gray-50 rounded-xl font-bold disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium ⭐</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
          <Save size={20} /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;