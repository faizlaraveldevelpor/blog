import { useEffect } from "react"
import { useShow_data_from_cetagoryMutation } from "../Redux/Api";
import { Link } from "react-router-dom";



function Show_cetagory_in_home() {

  
    // let form_data=new FormData()
    // form_data.append("cetagory_name","faiz")
let [fnc,{data}]=useShow_data_from_cetagoryMutation()



  let filter=data?.fin_data.slice(0,2)


let form_data=new FormData()
form_data.append("cetagory_name",'faiz')
form_data.append("cetagory_name",'fashion')

useEffect(()=>{
    fnc(form_data)
},[])



  return (
    <div className="w-full space-y-10 md:space-y-12">
      {data && filter.map((cat, i) => (
        <section key={cat?.cetagory || i} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5">
            <h2 className="text-lg md:text-xl font-bold text-white font-merriweather flex items-center gap-3">
              <span className="w-1 h-6 bg-teal-400 rounded-full" />
              {cat?.cetagory}
            </h2>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left - Main featured + grid */}
              <div className="lg:flex-1 min-w-0 space-y-6">
                <Link
                  to={`/single/blog/${cat?.blogs[0]?._id}/${cat?.blogs[0]?.Slug || "Slug"}`}
                  className="block group"
                >
                  <article className="overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50/50 hover:border-teal-300 hover:shadow-lg transition-all duration-300 active:scale-[0.99]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={Array.isArray(cat?.blogs[0]?.image)?cat?.blogs[0]?.image[0]:cat?.blogs[0]?.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <span className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-teal-600 text-white text-xs font-bold rounded-lg shadow">
                        {cat?.cetagory}
                      </span>
                    </div>
                    <div className="p-3 sm:p-4 md:p-5">
                      <h3 className="font-bold text-sm sm:text-base md:text-lg text-slate-800 group-hover:text-teal-700 line-clamp-2 transition-colors">
                        {cat?.blogs[0]?.title}
                      </h3>
                    </div>
                  </article>
                </Link>

                {/* Grid of 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[3, 4, 5, 6].map(idx => cat?.blogs[idx] && (
                    <Link key={cat.blogs[idx]._id} to={`/single/blog/${cat.blogs[idx]._id}/${cat.blogs[idx]?.Slug || "Slug"}`} className="group">
                      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-teal-200 hover:shadow-md transition-all duration-300 active:scale-98">
                        <div className="relative aspect-video overflow-hidden">
                          <img src={Array.isArray(cat.blogs[idx].image)?cat.blogs[idx].image[0]:cat.blogs[idx].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h4 className="p-3 text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-teal-700 transition-colors">
                          {cat.blogs[idx].title?.substring(0, 60)}{cat.blogs[idx].title?.length > 60 && "..."}
                        </h4>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right - Sidebar list */}
              <aside className="lg:w-[300px] flex-shrink-0">
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">More from {cat?.cetagory}</p>
                  {[1, 2, 7].map(idx => cat?.blogs[idx] && (
                    <Link
                      key={cat.blogs[idx]._id}
                      to={`/single/blog/${cat.blogs[idx]._id}/${cat.blogs[idx]?.Slug || "Slug"}`}
                      className="flex gap-2 sm:gap-3 group p-2 sm:p-3 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all active:scale-[0.98]"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <img src={Array.isArray(cat.blogs[idx].image)?cat.blogs[idx].image[0]:cat.blogs[idx].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-3 group-hover:text-teal-700 flex-1 min-w-0 transition-colors">
                        {cat.blogs[idx].title?.substring(0, 70)}{cat.blogs[idx].title?.length > 70 && "..."}
                      </h4>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Show_cetagory_in_home