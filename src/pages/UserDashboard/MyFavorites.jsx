import React, { useState, useEffect, useContext } from 'react';
import { HeartOff, Eye, Search, Filter, BookOpen } from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('');

  // ডামি ডাটা (পরবর্তীতে আপনার favorites collection থেকে fetch করবেন)
  useEffect(() => {
    setFavorites([
      { _id: '101', title: 'The Art of Living', category: 'Personal Growth', author: 'John Doe', tone: 'Motivational' },
      { _id: '102', title: 'Handling Failure', category: 'Mistakes Learned', author: 'Jane Smith', tone: 'Realization' }
    ]);
  }, []);

  const handleRemoveFavorite = (id) => {
    Swal.fire({
      title: 'Remove from Favorites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Remove'
    }).then((result) => {
      if (result.isConfirmed) {
        setFavorites(favorites.filter(item => item._id !== id));
        Swal.fire('Removed!', 'লেসনটি আপনার ফেভারিট লিস্ট থেকে মুছে ফেলা হয়েছে।', 'success');
      }
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">My Favorites</h2>
          <p className="text-gray-500 font-medium text-sm">আপনার সেভ করা অনুপ্রেরণামূলক লেসনগুলো এখানে রয়েছে।</p>
        </div>
        
        {/* ফিল্টার অপশন */}
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-gray-400" />
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Mindset">Mindset</option>
            <option value="Relationships">Relationships</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase">Lesson Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase">Category & Tone</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {favorites.length > 0 ? favorites.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/30 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="font-black text-gray-800 text-sm leading-tight">{item.title}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">By {item.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-indigo-500 uppercase">{item.category}</span>
                      <span className="text-[10px] font-medium text-gray-400 italic">#{item.tone}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/lesson-details/${item._id}`} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                        <Eye size={18} />
                      </Link>
                      <button onClick={() => handleRemoveFavorite(item._id)} className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
                        <HeartOff size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="p-20 text-center font-bold text-gray-300 italic">এখনো কোনো লেসন ফেভারিট করেননি।</td>
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