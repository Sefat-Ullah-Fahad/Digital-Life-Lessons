import React from 'react';
// Swiper Components এবং Modules ইম্পোর্ট
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper এর স্টাইল ফাইলগুলো ইম্পোর্ট
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Master Your Digital Life",
      desc: "জীবনের সেরা শিক্ষাগুলো শিখুন এবং নিজের দক্ষতাকে পরবর্তী ধাপে নিয়ে যান।",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
    },
    {
      id: 2,
      title: "Share Your Experiences",
      desc: "আপনার অভিজ্ঞতা অন্যের জন্য অনুপ্রেরণা হতে পারে। আজই আপনার লেসন শেয়ার করুন।",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070",
    },
    {
      id: 3,
      title: "Join Our Wisdom Community",
      desc: "হাজারো মানুষের জীবনের সারকথা থেকে শিখুন এবং সফলতার পথে এগিয়ে যান।",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070",
    }
  ];

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-hidden"> 
      {/* h-[calc(100vh-80px)] মানে হলো নেভবার বাদে পুরো স্ক্রিন */}
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade" // স্লাইডগুলো স্মুথলি ফেইড হবে
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.image})` }}
            >
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-pulse">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed">
                  {slide.desc}
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="btn btn-primary px-8 btn-lg rounded-full">Explore Now</button>
                  <button className="btn btn-outline text-white px-8 btn-lg rounded-full border-white hover:bg-white hover:text-black">Learn More</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* কাস্টম সিএসএস স্লাইডারের অ্যারো এবং ডট কালার ঠিক করার জন্য */}
      <style>{`
        .swiper-button-next, .swiper-button-prev { color: white !important; transform: scale(0.7); }
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #4f46e5 !important; opacity: 1; width: 25px; border-radius: 5px; transition: all 0.3s; }
      `}</style>
    </div>
  );
};

export default Banner;