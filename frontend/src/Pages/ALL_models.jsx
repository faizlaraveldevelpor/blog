import { Outlet } from "react-router-dom"
import Login from "../Models/Login"
import Header from './Hader'
import { useSelector} from 'react-redux'
import Register from "../Models/Register"
import Cetagory from "../Models/Cetagory"
import User_profile from "../Models/User_profile"
import Footer from "./Footer"
import Comment from '../Models/Comment'
import { useLogin_userQuery } from "../Redux/Api"
//  import { Auth_moduls_fnc } from "../Redux/ALL_moduls._Slice"
function Layout() {
     let useslactor=useSelector((state)=>state.All_moduls.Auth_moduls_state)
     let {data}=useLogin_userQuery()
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
        return(
            <>
            <div>
            <Header/>
                <h3 className="text-center mt-36 font-bold text-[25px]">You are offline in this time</h3>
            </div>
            
            </>
        )
        
     }else{
  return (
    
    <div className="w-full relative   ">
        
        
        <div className={`flex absolute left-[3%] top-10 bottom-20 justify-center bg-[#FFFFFF]  w-[97%] h-fit ${useslactor?"block":"hidden"} `}>
            <Login/></div>

        <div className={`flex absolute left-[3%] top-10 bottom-20 justify-center bg-[#FFFFFF]  w-[97%] h-fit ${resgiste_toggle_useslactor?"block":"hidden"} `}>
            <Register/></div>

        <div className={`flex fixed left-[0%] top-[48.4px] bottom-20 z-10 h-screen     w-fit   ${cetagory_toggle_useslactor?"translate-x-0 duration-300":"-translate-x-[140px] duration-300  "} `}>
            <div className="overflow-scroll cusSc ">
            <Cetagory/>
            </div>
            </div>
        <div className={`flex fixed left-[0%] top-[250px] bottom-20 z-10 h-screen   justify-center     w-full   ${comment_toggle_useslactor?"translate-y-0 duration-300":"translate-y-full duration-300  "} `}>
            <div className=" ">
            <Comment/>
            </div>
            </div>
            <div className={`flex fixed  top-[48.4px] bottom-20 z-50 h-screen md:left-[90%] lg:left-[100%] left-[78%]    w-fit   ${User_profile_state?"translate-x-0 duration-300":"translate-x-[120px] duration-300  "} `}>
            <div className="overflow-scroll cusSc ">
            <User_profile/>
            </div>
            </div>
       
       <div className={`w-full h-full overflow-hidden  ${useslactor?"opacity-5 pointer-events-none select-none":""}${resgiste_toggle_useslactor?"opacity-15 pointer-events-none select-none ":""} ${cetagory_toggle_useslactor?"fixed   max-h-screen overflow-hidden":""} ${comment_toggle_useslactor?"fixed   max-h-screen overflow-hidden":""} ${User_profile_state?"fixed   max-h-screen overflow-hidden":""}`}>
       
          <Header/>
        <Outlet/>
        <Footer/>
        </div>
 
     
    </div>
  )}
}

export default Layout