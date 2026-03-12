import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { HiHeart } from "react-icons/hi2";
import { useState } from 'react';

function Most_like_post() {
  let blog_data_useslactor = useSelector((state) => state.Api_data_slice.blogs_data)
  let [value, setvalue] = useState(0)

  let max = 1
  blog_data_useslactor?.get_blog?.forEach(element => {
    if (element?.likes?.length > max) max = element?.likes?.length
  })

  let length = blog_data_useslactor?.get_blog?.filter((data) => data?.likes?.length == max) || []

  let decriment = () => {
    if (value >= 240) setvalue((prev) => prev - 240)
  }

  let increament = () => {
    const maxScroll = length.length > 1 ? (length.length * 240) - 240 : 0
    if (value < maxScroll) setvalue((prev) => prev + 240)
    else setvalue(0)
  }

  if (!length?.length) return null

  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-5 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
          <HiHeart className="text-rose-600 text-lg" />
        </span>
        <h3 className="font-bold text-lg text-slate-800">Most Liked</h3>
      </div>
      <div className="relative -mx-1">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 flex justify-between px-0 pointer-events-none">
          <button
            onClick={decriment}
            className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 text-brand-primary hover:bg-brand-accent hover:text-white shadow-md border border-slate-200/80 flex items-center justify-center transition-all touch-manipulation"
            aria-label="Previous"
          >
            <IoIosArrowDropleft className="text-xl sm:text-2xl" />
          </button>
          <button
            onClick={increament}
            className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 text-brand-primary hover:bg-brand-accent hover:text-white shadow-md border border-slate-200/80 flex items-center justify-center transition-all touch-manipulation"
            aria-label="Next"
          >
            <IoIosArrowDropright className="text-xl sm:text-2xl" />
          </button>
        </div>
        <div style={{ transform: `translateX(-${value}px)` }} className="flex gap-3 sm:gap-4 duration-300 overflow-hidden pl-1 pr-1">
          {length.map((data) => (
            <Link key={data._id} to={`/single/blog/${data._id}/${data?.Slug || "Slug"}`} className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] group">
              <article className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 hover:border-teal-200 hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={Array.isArray(data?.image) ? data?.image[0] : data?.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {data?.likes?.length > 0 && (
                    <span className="absolute top-2 right-2 px-2.5 py-1 bg-rose-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow">
                      <HiHeart className="text-sm" /> {data.likes.length}
                    </span>
                  )}
                </div>
                <p className="p-3 text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-teal-700 transition-colors">
                  {data?.title?.substring(0,90)}{data?.title?.length > 90 && "..."}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Most_like_post