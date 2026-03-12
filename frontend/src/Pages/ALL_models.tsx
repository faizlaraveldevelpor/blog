import { Outlet } from "react-router-dom"
import Login from "../Models/Login"
import Header from './Hader'
import { useSelector, useDispatch } from 'react-redux'
import Register from "../Models/Register"
import Cetagory from "../Models/Cetagory"
import User_profile from "../Models/User_profile"
import Footer from "./Footer"
import Comment from '../Models/Comment'
import { cetagory_toggle_fnc, user_profile, comment_fnc } from "../Redux/ALL_moduls._Slice"

function Layout() {
     const dispatch = useDispatch()
     let useslactor=useSelector((state)=>state.All_moduls.Auth_moduls_state)
     let resgiste_toggle_useslactor=useSelector((state)=>state.All_moduls.register_moduls_state)
     let cetagory_toggle_useslactor=useSelector((state)=>state.All_moduls.cetagory_module_state)
     let comment_toggle_useslactor=useSelector((state)=>state.All_moduls.comment_initial_state)
     let User_profile_state=useSelector((state)=>state.All_moduls.user_profile_state)



   

//      <Helmet>
//      <title>My Title</title>
//      <meta name="description" content="Helmet application" />
//  </Helmet>

//  <Child>
//      <Helmet>
//          <title>Nested Title</title>
//          <meta name="description" content="Nested component" />
//      </Helmet>





     if (!navigator.onLine) {
        return (
          <div className="min-h-screen bg-brand-surface">
            <Header/>
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
              <div className="bg-white rounded-xl shadow-card p-8 text-center max-w-md">
                <p className="text-xl font-semibold text-brand-primary">You're offline</p>
                <p className="text-brand-muted mt-2 text-sm">Please check your connection and try again.</p>
              </div>
            </div>
          </div>
        )
     }

  const backdrop = useslactor || resgiste_toggle_useslactor || cetagory_toggle_useslactor || comment_toggle_useslactor || User_profile_state

  return (
    <div className="w-full relative min-h-screen bg-brand-surface">
      {/* Modal Overlays */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity ${useslactor ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animation">
          <Login/>
        </div>
      </div>
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity ${resgiste_toggle_useslactor ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          <Register/>
        </div>
      </div>

      {/* Sidebar Backdrop - click to close */}
      <div 
        className={`fixed inset-0 z-[45] bg-black/40 transition-opacity duration-300 ${(cetagory_toggle_useslactor || User_profile_state) ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => {
          if (cetagory_toggle_useslactor) dispatch(cetagory_toggle_fnc(false))
          if (User_profile_state) dispatch(user_profile())
        }}
        aria-hidden="true"
      />

      {/* Category Sidebar */}
      <aside className={`fixed top-14 sm:top-16 left-0 bottom-0 z-50 w-[280px] sm:w-72 max-w-[calc(100vw-2rem)] bg-[#0f172a] text-white overflow-y-auto cusSc transition-transform duration-300 ease-out shadow-2xl ${cetagory_toggle_useslactor ? "translate-x-0" : "-translate-x-full"}`}>
        <Cetagory/>
      </aside>

      {/* Comment Backdrop */}
      <div
        className={`fixed inset-0 z-[45] bg-black/40 transition-opacity duration-300 ${comment_toggle_useslactor ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => dispatch(comment_fnc(false))}
        aria-hidden="true"
      />
      {/* Comment Panel - stop propagation so backdrop doesn't close when clicking panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] sm:max-h-[80vh] bg-white rounded-t-2xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-300 ease-out ${comment_toggle_useslactor ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Comment/>
      </div>

      {/* User Profile Sidebar */}
      <aside className={`fixed top-14 sm:top-16 right-0 bottom-0 z-50 w-[280px] sm:w-80 max-w-[calc(100vw-2rem)] bg-white shadow-2xl overflow-y-auto cusSc transition-transform duration-300 ease-out ${User_profile_state ? "translate-x-0" : "translate-x-full"}`}>
        <User_profile/>
      </aside>

      {/* Main Content */}
      <div className={`w-full min-h-screen transition-opacity duration-300 ${backdrop ? "opacity-50 pointer-events-none" : ""}`}>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default Layout