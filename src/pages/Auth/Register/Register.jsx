import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Image, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Zap, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from "../../../providers/AuthProvider"; 
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // অ্যাডমিন টগল স্টেট
  const [error, setError] = useState('');
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // ডাটাবেসে ইউজার সেভ করার কমন ফাংশন
  const saveUserToDb = (name, email, photo, role = 'user') => {
    const userInfo = {
      name,
      email,
      photo,
      role: role, 
      status: 'free',
      createdAt: new Date()
    };

    return fetch('https://life-lesson-server-nine.vercel.app/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userInfo)
    }).then(res => res.json());
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const selectedRole = isAdmin ? 'admin' : 'user'; // টগল অনুযায়ী রোল

    if (password.length < 6) { setError("Min 6 characters required."); return; }
    if (!/[A-Z]/.test(password)) { setError("Need an Uppercase letter."); return; }
    if (!/[a-z]/.test(password)) { setError("Need a Lowercase letter."); return; }

    setError('');

    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photo)
          .then(() => {
            saveUserToDb(name, email, photo, selectedRole)
              .then(data => {
                if (data.insertedId || data.message === 'User already exists') {
                  toast.success(`Registered as ${selectedRole}!`);
                  navigate('/');
                }
              });
          })
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    const selectedRole = isAdmin ? 'admin' : 'user';
    googleSignIn()
      .then(result => {
        const user = result.user;
        saveUserToDb(user.displayName, user.email, user.photoURL, selectedRole)
          .then(() => {
            toast.success("Google Login Successful!");
            navigate('/');
          });
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6 relative overflow-hidden font-sans">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 z-50">
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white z-10">
        
        {/* Left Side Branding */}
        <div className="hidden lg:flex flex-col justify-center p-16 bg-indigo-600 text-white relative overflow-hidden">
          <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-10 w-32 h-32 bg-indigo-400 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 leading-tight">Start Your Journey With Us!</h2>
            <p className="text-indigo-100 text-lg mb-12 font-medium">Join our community to share and learn priceless life lessons.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <ShieldCheck className="text-indigo-300" />
                <p className="font-bold text-sm tracking-wide">Secure & Encrypted</p>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <Zap className="text-amber-300" />
                <p className="font-bold text-sm tracking-wide">Instant Admin Access (Testing Mode)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase italic">Create Account</h2>
          <p className="text-slate-400 font-medium text-sm mb-8">Join Digital Life Lessons Today</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input name="name" type="text" placeholder="Full Name" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-semibold" />
            <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-semibold" />
            <input name="photo" type="text" placeholder="Photo URL" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-semibold" />
            
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-semibold" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* --- Admin Toggle Section --- */}
            <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isAdmin ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}>
                        <User size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Account Type</p>
                        <p className="text-sm font-bold text-slate-700">{isAdmin ? "Admin Privileges" : "Standard User"}</p>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" onChange={(e) => setIsAdmin(e.target.checked)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
            </div>

            {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl">⚠️ {error}</p>}
            
            <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group">
              REGISTER NOW <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Google Login Section */}
          <div className="mt-6">
            <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Or Continue With</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>
            
            <button 
                onClick={handleGoogleLogin}
                className="w-full mt-4 bg-white border-2 border-slate-100 hover:border-indigo-600 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-slate-700 shadow-sm"
            >
                <Chrome size={20} className="text-indigo-600" /> GOOGLE SIGN IN
            </button>
          </div>

          <div className="mt-8 text-center">
             <p className="text-slate-500 text-sm font-medium">Already have an account? <Link to="/login" className="text-indigo-600 font-black hover:underline">Login Here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}