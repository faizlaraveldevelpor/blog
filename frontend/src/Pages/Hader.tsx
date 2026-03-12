import { IoMenuSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { LuSparkles } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { Auth_moduls_fnc, cetagory_toggle_fnc, register_toggle, user_profile } from "../Redux/ALL_moduls._Slice";
import { Link } from "react-router-dom";
import Avatar from "../Components/shared/Avatar";

function Hader() {
  let disptach = useDispatch()
  let user_data_local_storage = useSelector((state) => state.All_moduls.login_user)
  let cetagory_toggle_useslactor = useSelector((state) => state.All_moduls.cetagory_module_state)

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#0f172a] shadow-lg">
      <nav className="relative h-14 sm:h-16 w-full max-w-7xl mx-auto px-3 sm:px-6 flex justify-between items-center gap-2">
        <button
          onClick={() => disptach(cetagory_toggle_fnc(!cetagory_toggle_useslactor))}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-white/10 text-white transition-colors touch-manipulation"
          aria-label={cetagory_toggle_useslactor ? "Close menu" : "Open menu"}
        >
          {cetagory_toggle_useslactor ? <ImCross className="text-xl" /> : <IoMenuSharp className="text-xl" />}
        </button>

        <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 group min-w-0">
          <span className="font-merriweather font-bold text-base sm:text-xl md:text-2xl text-white group-hover:text-teal-300 transition-colors truncate">
            Thoughtlab360
          </span>
          <LuSparkles className="text-amber-400 text-sm hidden sm:inline flex-shrink-0" />
        </Link>

        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          <Link to="/search" className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors touch-manipulation" aria-label="Search">
            <IoIosSearch className="text-lg sm:text-xl" />
          </Link>

          {user_data_local_storage && (user_data_local_storage?.id || user_data_local_storage?.name) ? (
            <>
              <button
                onClick={() => disptach(user_profile())}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
              >
                <Avatar
                  src={user_data_local_storage?.image}
                  alt={user_data_local_storage?.name || "User"}
                  size="sm"
                  className="ring-2 ring-teal-400/50 flex-shrink-0"
                />
                <span className="hidden sm:inline text-sm font-medium text-white max-w-[80px] lg:max-w-[100px] truncate">{user_data_local_storage?.name}</span>
              </button>
              {user_data_local_storage?.role === "admin" && (
                <Link to="/admin" className="hidden sm:inline-flex items-center px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg transition-colors">
                  Dashboard
                </Link>
              )}
            </>
          ) : (
            <div className="flex items-center gap-1 sm:gap-3">
              <button onClick={() => disptach(register_toggle(true))} className="text-xs sm:text-sm text-white/90 hover:text-white font-medium px-2 py-1.5 touch-manipulation">
                Register
              </button>
              <button onClick={() => disptach(Auth_moduls_fnc(true))} className="text-xs sm:text-sm bg-teal-500 hover:bg-teal-600 text-white font-semibold px-2 sm:px-3 py-1.5 rounded-lg transition-colors touch-manipulation">
                Sign in
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Hader