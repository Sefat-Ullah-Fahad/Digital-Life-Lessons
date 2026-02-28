import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      {/* Visual Illustration */}
      <div className="relative mb-8">
        <h1 className="text-[180px] font-black text-gray-50 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AlertTriangle size={64} className="text-indigo-600 animate-bounce mb-4" />
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">Lost in Wisdom?</h2>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md space-y-4">
        <p className="text-gray-500 font-medium text-lg">
          The page you are looking for doesn't exist or has been moved to another universe. 
          Let's get you back on track!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95"
        >
          <ArrowLeft size={20} /> Go Back
        </button>
        
        <Link 
          to="/" 
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Home size={20} /> Return Home
        </Link>
      </div>

      {/* Decorative Circles */}
      <div className="fixed top-20 left-20 w-32 h-32 bg-indigo-50 rounded-full -z-10 blur-3xl opacity-60"></div>
      <div className="fixed bottom-20 right-20 w-48 h-48 bg-rose-50 rounded-full -z-10 blur-3xl opacity-60"></div>
    </div>
  );
};

export default NotFound;