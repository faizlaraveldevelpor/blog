import { Swiper, SwiperSlide } from 'swiper/react';
import { useBlogsQuery } from "../Redux/Api";
import { IoChevronBack, IoChevronForward, IoTrendingUpSharp } from "react-icons/io5";
import { HiEye, HiHeart, HiClock } from "react-icons/hi2";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function Home_page_Slider() {

  useBlogsQuery()
  let bloga_data = useSelector((state) => state.Api_data_slice.blogs_data)



  if (bloga_data) {
    if (bloga_data.get_blog.length < 10) return
  }

  // Get trending posts (most liked or most recent)
  const trendingPosts = bloga_data?.get_blog
    .slice()
    .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
    .slice(0, 10);

  return (
    <div className='w-full py-8 sm:py-10 md:py-14 bg-gradient-to-b from-white to-slate-50/50'>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-8 px-4 sm:px-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <IoTrendingUpSharp className="text-white text-xl animate-bounce-slow" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-primary font-merriweather flex items-center gap-2">
              Trending Now
              <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full animate-pulse">
                HOT
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">Most popular articles right now</p>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Premium Navigation Buttons */}
        <button
          type="button"
          className="swiper-button-prev absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-2xl border border-slate-200 text-brand-primary hover:from-brand-accent hover:to-teal-600 hover:text-white hover:border-brand-accent hover:scale-110 hover:-rotate-6 flex items-center justify-center transition-all duration-300 after:content-none touch-manipulation select-none group backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-accent/0 via-brand-accent/20 to-brand-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <IoChevronBack className="text-2xl sm:text-3xl group-hover:scale-125 group-hover:-translate-x-0.5 transition-all duration-300 relative z-10" />
        </button>
        <button
          type="button"
          className="swiper-button-next absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-2xl border border-slate-200 text-brand-primary hover:from-brand-accent hover:to-teal-600 hover:text-white hover:border-brand-accent hover:scale-110 hover:rotate-6 flex items-center justify-center transition-all duration-300 after:content-none touch-manipulation select-none group backdrop-blur-sm"
          aria-label="Next slide"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-accent/0 via-brand-accent/20 to-brand-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <IoChevronForward className="text-2xl sm:text-3xl group-hover:scale-125 group-hover:translate-x-0.5 transition-all duration-300 relative z-10" />
        </button>

        {/* Enhanced Swiper */}
        <div className="px-14 sm:px-16 md:px-20">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 24 },
              768: { slidesPerView: 2.5, spaceBetween: 28 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className="swiper_container pb-6"
          >
            {trendingPosts?.map((data, index) => (
              <SwiperSlide key={data._id}>
                <Link to={`/single/blog/${data._id}/${data?.Slug || "Slug"}`} className="block group">
                  <article className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 bg-white hover-lift hover-glow">
                    {/* Trending Badge */}
                    {index < 3 && (
                      <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                    )}

                    {/* Image Section */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={Array.isArray(data.image) ? data.image[0] : data.image}
                        alt={data.title}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      {/* Category Badge */}
                      {data.cetagory?.name && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-brand-accent text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm">
                          {data.cetagory.name}
                        </span>
                      )}

                      {/* Hover Stats */}
                      <div className="absolute top-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-brand-primary">
                          <HiHeart className="text-red-500" />
                          {data.likes?.length || 0}
                        </div>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-white font-bold text-base sm:text-lg line-clamp-2 drop-shadow-2xl mb-2 group-hover:text-teal-300 transition-colors">
                          {data.title?.substring(0, 100)}{data.title?.length > 100 && "..."}
                        </h4>
                        <div className="flex items-center gap-3 text-white/80 text-xs">
                          <span className="flex items-center gap-1">
                            <HiClock className="text-sm" />
                            {new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          {data.user?.name && (
                            <>
                              <span>•</span>
                              <span className="truncate max-w-[120px]">{data.user.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* View All Link */}
      <div className="text-center mt-6">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent-hover transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          View All Trending Articles
          <IoChevronForward />
        </Link>
      </div>
    </div>
  );
}

export default Home_page_Slider;