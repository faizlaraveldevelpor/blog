import { useEffect, useState } from "react"
import { useGet_cetagoryQuery } from "../Redux/Api"
import { Link } from "react-router-dom"
import { cetagory_toggle_fnc } from "../Redux/ALL_moduls._Slice"
import { useDispatch } from "react-redux"
import { HiOutlineFolder, HiOutlineDocumentText } from "react-icons/hi"

function Cetagory() {
  let dispatch = useDispatch()
  let { data } = useGet_cetagoryQuery()
  let [index, setindex] = useState(0)
  let [filter_array, setfilter_array] = useState()

  useEffect(() => {
    if (data?.getCetagory && index != null) setfilter_array(data.getCetagory[index])
  }, [index, data])

  return (
    <div className="flex flex-col min-h-full py-6 px-5">
      <div className="flex items-center gap-2 mb-6">
        <HiOutlineFolder className="text-2xl text-teal-400" />
        <h3 className="text-white font-bold text-lg">Categories</h3>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2" onMouseLeave={() => { setfilter_array(null); setindex(null) }}>
        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap">
          {data?.getCetagory?.map((cat, i) => (
            <Link key={cat.cetagory || i} to={`/blogs/${cat.cetagory}`} onClick={() => dispatch(cetagory_toggle_fnc(false))}>
              <span className="block px-4 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all text-sm font-medium touch-manipulation border border-transparent hover:border-white/20" onMouseEnter={() => setindex(i)}>
                {cat.cetagory}
              </span>
            </Link>
          ))}
        </div>
        {filter_array?.subCetagory?.length > 0 && (
          <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-white/20">
            <span className="text-xs text-slate-400 uppercase tracking-wide px-2 mb-1">Subcategories</span>
            {filter_array.subCetagory.map((item, i) => (
              <Link key={i} to={`/blogs/subcetagory/sub.${item}`} onClick={() => dispatch(cetagory_toggle_fnc(false))}>
                <span className="block py-2.5 px-4 rounded-lg hover:bg-teal-500/20 cursor-pointer text-slate-300 hover:text-white text-sm transition-colors touch-manipulation ml-1">
                  {item}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 mb-2 px-2">
          <HiOutlineDocumentText className="text-lg text-teal-400" />
          <span className="text-xs text-slate-400 uppercase tracking-wide">Links</span>
        </div>
        <Link to="/About" className="px-4 py-2.5 rounded-lg text-slate-300 hover:text-teal-400 hover:bg-white/5 text-sm transition-colors" onClick={() => dispatch(cetagory_toggle_fnc(false))}>About Us</Link>
        <Link to="/privacy" className="px-4 py-2.5 rounded-lg text-slate-300 hover:text-teal-400 hover:bg-white/5 text-sm transition-colors" onClick={() => dispatch(cetagory_toggle_fnc(false))}>Privacy Policy</Link>
        <Link to="/Disclamer" className="px-4 py-2.5 rounded-lg text-slate-300 hover:text-teal-400 hover:bg-white/5 text-sm transition-colors" onClick={() => dispatch(cetagory_toggle_fnc(false))}>Disclaimer</Link>
        <Link to="/term" className="px-4 py-2.5 rounded-lg text-slate-300 hover:text-teal-400 hover:bg-white/5 text-sm transition-colors" onClick={() => dispatch(cetagory_toggle_fnc(false))}>Terms & Conditions</Link>
      </div>
    </div>
  )
}

export default Cetagory