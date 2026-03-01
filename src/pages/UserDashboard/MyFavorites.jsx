import React, { useState, useEffect, useContext } from 'react';
import { HeartOff, Eye, Filter, BookOpen, Loader2 } from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  // ১. ডাটাবেস থেকে ফেভারিট লিস্ট ফেচ করা
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:3000/my-favorites?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  // ২. ফেভারিট থেকে রিমুভ করা
  const handleRemoveFavorite = (id) => {
    Swal.fire({
      title: 'Remove from Favorites?',
      text: "আপনি কি আপনার ফেভারিট লিস্ট থেকে এটি সরাতে চান?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Remove'
    }).then((result) => {
      if (result.isConfirmed) {
        // এপিআই দিয়ে ডাটাবেস থেকে ডিলিট করা
        fetch(`http://localhost:3000/my-favorites/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setFavorites(favorites.filter(item => item._id !== id));
              Swal.fire('Removed!', 'লেসনটি আপনার ফেভারিট লিস্ট থেকে মুছে ফেলা হয়েছে।', 'success');
            }
          });
      }
    });
  };

  // ৩. ক্যাটাগরি অনুযায়ী ফিল্টার করা
  const filteredFavorites = filter 
    ? favorites.filter(item => item.category === filter)
    : favorites;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">My Favorites</h2>
          <p className="text-gray-500 font-medium text-sm">আপনার সেভ করা অনুপ্রেরণামূলক লেসনগুলো এখানে রয়েছে।</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-gray-400" />
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Mindset">Mindset</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lesson Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category & Tone</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-20 text-center text-indigo-500 font-bold italic">
                    <Loader2 className="animate-spin inline-block mb-2" size={30} />
                    <p>Loading your favorite wisdom...</p>
                  </td>
                </tr>
              ) : filteredFavorites.length > 0 ? (
                filteredFavorites.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/30 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <p className="font-black text-gray-800 text-sm leading-tight group-hover:text-indigo-600 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-tighter">
                            By {item.authorName || 'Unknown Author'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-indigo-500 uppercase bg-indigo-50 w-fit px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 italic">#{item.emotionalTone || 'Neutral'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* URL টি আপনার রাউট অনুযায়ী lesson/:id বা lesson-details/:id হতে পারে */}
                        <Link to={`/lesson/${item.lessonId || item._id}`} className="p-2.5 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                          <Eye size={18} />
                        </Link>
                        <button 
                          onClick={() => handleRemoveFavorite(item._id)} 
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <HeartOff size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-20 text-center font-bold text-gray-300 italic">
                    {filter ? `"${filter}" ক্যাটাগরিতে কোনো ফেভারিট নেই।` : "এখনো কোনো লেসন ফেভারিট করেননি।"}
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

export default MyFavorites;