import Home_page_Slider from "./Home_page_Slider";
import { useDispatch, useSelector } from "react-redux";
import Most_like_post from "./Premium";
import { register_toggle } from "../Redux/ALL_moduls._Slice";
import { Link } from "react-router-dom";

function Addition() {
   let blog_data_useslactor=useSelector((state)=>state.Api_data_slice.blogs_data)
   let disptach=useDispatch()
   
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Hero - Featured Post */}
          <Link to={`/single/blog/${blog_data_useslactor?.get_blog[0]?._id}/${blog_data_useslactor?.get_blog[0]?.Slug||"Slug"}`} className="flex-1 min-w-0 group">
            <article className="overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl border border-slate-100 transition-all duration-300">
              <div className="relative aspect-[16/10] sm:aspect-[2/1] overflow-hidden">
                <img 
                  src={Array.isArray(blog_data_useslactor?.get_blog[0]?.image) ? blog_data_useslactor?.get_blog[0]?.image[0] : blog_data_useslactor?.get_blog[0]?.image} 
                  alt="Featured" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg shadow-lg">FEATURED</span>
                {blog_data_useslactor?.get_blog[0]?.cetagory && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 bg-teal-600/90 text-white text-xs font-medium rounded-lg">
                    {blog_data_useslactor.get_blog[0].cetagory}
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 line-clamp-2 group-hover:text-teal-700 transition-colors">
                  {blog_data_useslactor?.get_blog[0]?.title?.substring(0,120)}
                  {blog_data_useslactor?.get_blog[0]?.title?.length > 120 && "..."}
                </h2>
              </div>
            </article>
          </Link>
        
          {/* Sidebar - CTA & Most Liked */}
          <aside className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-6 min-w-0">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-700/30">
              <span className="inline-block px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">NEW FOR YOU</span>
              <h3 className="font-bold text-lg mt-3 mb-2">Personalized Experience</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                Create an account for tailored recommendations based on your interests.
              </p>
              <button 
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-teal-900/20" 
                onClick={()=>disptach(register_toggle(true))}
              >
                Register Free
              </button>
            </div>
            <Most_like_post/>
          </aside>
        </div>
      </div>
      <Home_page_Slider/>
    </>
  )
}

export default Addition