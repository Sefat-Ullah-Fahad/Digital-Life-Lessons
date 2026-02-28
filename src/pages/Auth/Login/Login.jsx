import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import { AuthContext } from "../../../providers/AuthProvider";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

 const handleLogin = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  logIn(email, password)
    .then(() => {
      // লগইন সফল হলে এই ব্লকের কাজ হবে
      Swal.fire({
        title: 'Success!',
        text: 'Welcome Back!',
        icon: 'success',
        confirmButtonText: 'Cool'
      });
      navigate('/');
    })
    .catch((error) => {
      // লগইন ব্যর্থ হলে এই ব্লকের কাজ হবে
      console.error(error.message);
      toast.error("Invalid credentials. Please try again.");
    });
};

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate('/');
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6 relative">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white">
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-col justify-center p-16 bg-indigo-600 text-white relative">
          <div className="relative z-10">
            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 backdrop-blur-xl border border-white/20">
              <Sparkles size={32} />
            </div>
            <h2 className="text-4xl font-black mb-6 leading-[1.2]">Welcome Back! <br /> Glad to see you.</h2>
            <p className="text-indigo-100 text-lg mb-12 font-medium">Log in to your account to continue exploring priceless life lessons.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <ShieldCheck size={24} className="text-white" />
                <p className="font-bold text-sm tracking-wide text-white">Secure Login System</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase italic text-center lg:text-left">Account Login</h2>
          <p className="text-slate-400 font-medium text-center lg:text-left mb-10">Please enter your credentials to proceed</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input name="email" type="email" placeholder="Email Address" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-semibold" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" required className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl py-4 pl-12 pr-12 outline-none transition-all font-semibold" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group">
              LOG IN NOW <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-full border-t border-slate-100"></div>
              <span className="absolute bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or connect with</span>
            </div>
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-3.5 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
              <img src="https://www.svgrepo.com/show/475656/google.svg" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>
          </div>
          <p className="mt-10 text-center text-slate-500 font-medium text-sm">
            New here? <Link to="/register" className="text-indigo-600 font-black hover:underline">Create an Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}