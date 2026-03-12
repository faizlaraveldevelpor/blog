import { useGet_cetagoryQuery } from "../Redux/Api"
import { FaFacebook, FaInstagram, FaPinterest, FaReddit, FaYoutube } from "react-icons/fa"
import { CiLinkedin } from "react-icons/ci"
import { Link } from 'react-router-dom'

function Footer() {
  let { data } = useGet_cetagoryQuery()

  return (
    <footer className="bg-[#0f172a] text-white mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block font-merriweather font-bold text-xl sm:text-2xl mb-3 sm:mb-4 text-white hover:text-teal-300 transition-colors">
              Thoughtlab360
            </Link>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
              In-depth coverage on science, politics, current affairs, world events, and history. 
              A platform for individuals to publish articles and share insights with a wider audience.
            </p>
            {data?.getCetagory?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {data.getCetagory.slice(0,6).map((cat, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded text-slate-300 transition-colors">
                    {cat.cetagory}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4 text-white">Quick Links</h3>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <Link to="/" className="text-slate-300 hover:text-teal-400 text-xs sm:text-sm transition-colors hover:translate-x-1 inline-block">Home</Link>
              <Link to="/About" className="text-slate-300 hover:text-teal-400 text-xs sm:text-sm transition-colors hover:translate-x-1 inline-block">About Us</Link>
              <Link to="/privacy" className="text-slate-300 hover:text-teal-400 text-xs sm:text-sm transition-colors hover:translate-x-1 inline-block">Privacy Policy</Link>
              <Link to="/Disclamer" className="text-slate-300 hover:text-teal-400 text-xs sm:text-sm transition-colors hover:translate-x-1 inline-block">Disclaimer</Link>
              <Link to="/term" className="text-slate-300 hover:text-teal-400 text-xs sm:text-sm transition-colors hover:translate-x-1 inline-block">Terms & Conditions</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4 text-white">Stay Updated</h3>
            <div className="flex gap-3 sm:gap-4 text-slate-400 mb-3 sm:mb-4">
              <a href="#" className="hover:text-teal-400 hover:scale-110 transition-all" aria-label="Facebook"><FaFacebook className="text-lg sm:text-xl" /></a>
              <a href="#" className="hover:text-teal-400 hover:scale-110 transition-all" aria-label="Instagram"><FaInstagram className="text-lg sm:text-xl" /></a>
              <a href="#" className="hover:text-teal-400 hover:scale-110 transition-all" aria-label="LinkedIn"><CiLinkedin className="text-lg sm:text-xl" /></a>
              <a href="#" className="hover:text-teal-400 hover:scale-110 transition-all" aria-label="YouTube"><FaYoutube className="text-lg sm:text-xl" /></a>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" />
              <button className="px-4 py-2 sm:py-2.5 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-semibold rounded-lg transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center text-slate-400 text-xs sm:text-sm">
          © {new Date().getFullYear()} Thoughtlab360. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer