import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
function Breaking_news() {
  
  
    
 let bloga_data=useSelector((state)=>state.Api_data_slice.blogs_data)
    
    let [value,setvalue]=useState(0)
    
 if (bloga_data) {
  if(bloga_data.get_blog?.length<10) return 
 }
 

    let increament=()=>{
        const maxScroll = bloga_data ? (bloga_data.get_blog.length * 200) - 400 : 0
        if(value < maxScroll){
          setvalue((prev)=>prev+220)
        }else{
          setvalue(0)
        }
    }
    let decriment=()=>{
      if(value>0) setvalue((prev)=>Math.max(0, prev-220))
    }
  
   
    
    
  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="px-3 sm:px-6 py-3 sm:py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-white bg-red-600 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Breaking
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Latest updates</span>
        </div>
        <div className="relative">
          {/* Buttons - positioned on left/right, vertically centered */}
          <button 
            onClick={()=>decriment()} 
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 text-brand-primary hover:bg-brand-accent hover:text-white shadow-md border border-slate-200/80 flex items-center justify-center transition-all touch-manipulation"
            aria-label="Previous"
          >
            <IoMdArrowBack className="text-xl" />
          </button>
          <button 
            onClick={()=>increament()} 
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 text-brand-primary hover:bg-brand-accent hover:text-white shadow-md border border-slate-200/80 flex items-center justify-center transition-all touch-manipulation"
            aria-label="Next"
          >
            <IoMdArrowForward className="text-xl" />
          </button>
          {/* Scrollable content - padding so buttons don't overlap */}
          <div 
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-hidden py-2 pl-16 pr-16 sm:pl-20 sm:pr-20 touch-pan-x"
            style={{ transform: `translateX(-${value}px)` }}
          >
            {bloga_data?.get_blog.map((data,i)=> {
              let d = new Date(data.createdAt).toDateString()
              return (
                <Link 
                  to={`/single/blog/${data._id}/${data?.Slug||"Slug"}`} 
                  key={data._id||i}
                  className="flex-shrink-0 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] py-3 px-4 border-l-2 border-slate-200 pl-5 hover:border-teal-500 hover:bg-slate-50/80 rounded-r-lg transition-all duration-200 group"
                >
                  <p className="text-xs text-slate-500 font-medium">{d}</p>
                  <h4 className="text-xs sm:text-sm font-semibold text-brand-primary group-hover:text-teal-700 line-clamp-2 transition-colors mt-0.5">
                    {data.title?.substring(0,80)}{data.title?.length > 80 && "..."}
                  </h4>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breaking_news