import React from 'react';
import { Sparkles, Target, Users, ShieldCheck } from 'lucide-react';

const WhyLifeMatters = () => {
  const benefits = [
    {
      id: 1,
      title: "Real-World Experience",
      desc: "Boi-er thikeo jiboner bastob obhiggotai amader beshi shikkhito kore.",
      icon: <Sparkles className="w-12 h-12 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      id: 2,
      title: "Accelerated Growth",
      desc: "Onner bhul theke shikhe apni nijer unnoti druto korte parben.",
      icon: <Target className="w-12 h-12 text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      id: 3,
      title: "Community Wisdom",
      desc: "Hajaro manusher jiboner shikkha ek jagay paben, ja amulya.",
      icon: <Users className="w-12 h-12 text-emerald-500" />,
      color: "bg-emerald-50"
    },
    {
      id: 4,
      title: "Avoid Repetitive Mistakes",
      desc: "Socheton bhabe jibon gorle eki bhul bar bar korar bhoy thake na.",
      icon: <ShieldCheck className="w-12 h-12 text-amber-500" />,
      color: "bg-amber-50"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Why Learning From Life Matters
          </h2>
          <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Jiboner protiti obhiggota amader kisu na kisu shekhay. Ei shikkhai amader sothik pothe niye jay.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2 text-center lg:text-left"
            >
              <div className={`${benefit.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 group-hover:rotate-6 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {benefit.name}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLifeMatters;