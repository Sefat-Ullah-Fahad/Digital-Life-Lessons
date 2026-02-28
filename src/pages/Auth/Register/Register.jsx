import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Image, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from "../../../providers/AuthProvider"; // আপনার পাথ অনুযায়ী ঠিক করে নিন
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Validation
    if (password.length < 6) { setError("Min 6 characters required."); return; }
    if (!/[A-Z]/.test(password)) { setError("Need an Uppercase letter."); return; }
    if (!/[a-z]/.test(password)) { setError("Need a Lowercase letter."); return; }

    setError('');

    // Firebase Create User
    createUser(email, password)
      .then(() => {
        // Update Profile (Name and Photo)
        updateUserProfile(name, photo)
          .then(() => {
            toast.success("Account created successfully!");
            navigate('/');

            Swal.fire({
  title: 'Success!',
  text: 'Account created successfully',
  icon: 'success',
  confirmButtonText: 'Cool'
});

          })
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6 relative overflow-hidden">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 z-50">
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white z-10">
        {/* Left Side: Animated Branding */}
        <div className="hidden lg:flex flex-col justify-center p-16 bg-indigo-600 text-white relative overflow-hidden">
          <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-10 w-32 h-32 bg-indigo-400 rounded-full blur-3xl" />
          <div className="relative z-10">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 backdrop-blur-xl border border-white/20">
              <Sparkles size={32} />
            </motion.div>
            <h2 className="text-4xl font-black mb-6 leading-tight">Start Your Journey With Us!</h2>
            <p className="text-indigo-100 text-lg mb-12 font-medium">Join our community to share and learn priceless life lessons.</p>
            <div className="space-y-6">
              {[ { icon: <ShieldCheck />, text: "Secure & Encrypted" }, { icon: <Zap />, text: "Premium Access" } ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                  <div className="bg-indigo-500/30 p-2 rounded-xl text-white">{item.icon}</div>
                  <p className="font-bold text-sm tracking-wide text-white">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase italic">Create Account</h2>
          <p className="text-slate-400 font-medium text-sm mb-10">Join Digital Life Lessons Today</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <input name="name" type="text" placeholder="Full Name" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-semibold" />
            <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-semibold" />
            <input name="photo" type="text" placeholder="Photo URL" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-semibold" />
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-semibold" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl">⚠️ {error}</p>}
            <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group">
              REGISTER NOW <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          <div className="mt-8 text-center">
             <p className="text-slate-500 text-sm font-medium">Already have an account? <Link to="/login" className="text-indigo-600 font-black hover:underline">Login Here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}