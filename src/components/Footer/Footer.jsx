import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Brand & About */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">Digital Life</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            জীবনের ছোট ছোট শিক্ষাই আমাদের বড় সফলতার মূল চাবিকাঠি। আমাদের সাথে যুক্ত হয়ে আপনার অভিজ্ঞতা শেয়ার করুন এবং অন্যের জীবন বদলে দিন।
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-indigo-600 rounded-full"></span>
          </h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /> Home</Link></li>
            <li><Link to="/lessons" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /> All Lessons</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /> About Us</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /> Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
            Categories
            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-indigo-600 rounded-full"></span>
          </h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Personal Growth</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Financial Freedom</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Relationships</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Health & Wellness</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
            Contact Us
            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-indigo-600 rounded-full"></span>
          </h4>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <div className="bg-slate-800 p-2 rounded-lg text-indigo-500">
                <MapPin size={18} />
              </div>
              <span className="text-slate-400">Dhanmondi, Dhaka, <br /> Bangladesh</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-slate-800 p-2 rounded-lg text-indigo-500">
                <Phone size={18} />
              </div>
              <span className="text-slate-400">+880 1234 567 890</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-slate-800 p-2 rounded-lg text-indigo-500">
                <Mail size={18} />
              </div>
              <span className="text-slate-400">info@digitallife.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Digital Life Lessons. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
          Developed by <span className="text-indigo-500">Alif Ahmed</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;