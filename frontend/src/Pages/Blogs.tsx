import Addition from "../Compunents/Addition"
import Breaking_news from "../Compunents/Breaking_news"
import Show_cetagory_in_home from "../Compunents/Show_cetagory_in_home"
import Helmet from 'react-helmet'
import { Link } from "react-router-dom"
import { HiSparkles, HiArrowRight } from "react-icons/hi2"

function Blogs() {
  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-brand-surface to-slate-100">
        <Helmet>
          <title>Thoughtlab360 - Explore Insightful Articles & Stories</title>
          <meta name="description" content="Discover trending articles on science, politics, current affairs, technology, and more. Join our community of curious minds." />
        </Helmet>

        {/* Enhanced Hero Banner */}
        <div className="relative bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
          
          {/* Gradient orbs for depth */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 rounded-full mb-6 animate-slideDown">
                <HiSparkles className="text-teal-400 animate-spin-slow" />
                <span className="text-teal-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">Welcome to Thoughtlab360</span>
              </div>
              
              {/* Main heading */}
              <h1 className="font-merriweather font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight animate-fadeIn">
                Explore Ideas That 
                <span className="block text-teal-400 mt-2">Shape Tomorrow</span>
              </h1>
              
              {/* Description */}
              <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0 mb-8 animate-slideUp">
                Discover insightful articles on science, technology, politics, and current affairs. 
                A vibrant community where curious minds meet compelling stories.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-scaleIn">
                <Link 
                  to="/search" 
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base font-bold rounded-xl transition-all hover:scale-105 shadow-xl shadow-teal-900/30 active:scale-95"
                >
                  <span>Explore Articles</span>
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/About" 
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm sm:text-base font-semibold rounded-xl transition-all hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main content with improved spacing */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 -mt-8 sm:-mt-10 md:-mt-12 relative z-10">
          {/* Breaking News */}
          <div className="w-full mb-8 md:mb-10 animate-slideUp">
            <Breaking_news />
          </div>

          {/* Featured Section */}
          <section className="mb-12 md:mb-16 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-primary font-merriweather flex items-center gap-3">
                <span className="w-1.5 h-8 bg-gradient-to-b from-teal-600 to-teal-400 rounded-full" />
                Featured Today
              </h2>
              <Link to="/search" className="text-sm text-brand-accent hover:text-brand-accent-hover font-semibold flex items-center gap-1 group">
                <span>View All</span>
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <Addition />
          </section>

          {/* Category Sections */}
          <section className="mb-16 md:mb-20 animate-fadeIn">
            <Show_cetagory_in_home />
          </section>

          {/* Newsletter CTA Section */}
          <section className="mb-16 md:mb-20">
            <div className="card-elevated p-8 md:p-12 text-center bg-gradient-to-br from-brand-primary to-brand-secondary text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay in the Loop</h2>
                <p className="text-slate-200 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                  Get the latest articles, insights, and exclusive content delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Blogs