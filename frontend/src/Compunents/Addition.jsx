import Home_page_Slider from "./Home_page_Slider";
import { useDispatch, useSelector } from "react-redux";
import Most_like_post from "./Premium";
import { register_toggle } from "../Redux/ALL_moduls._Slice";
import { Link } from "react-router-dom";

function Addition() {
   let blog_data_useslactor=useSelector((state)=>state.Api_data_slice.blogs_data)
   console.log(blog_data_useslactor?.get_blog);
   
   let disptach=useDispatch()
  return (
 <>
 
 <div className="md:px-12    ">
      <div className="px-4 h-full  pb-11  border-black ">
     
       <div className="flex  md:flex-row flex-col mt-6   ">
       <Link to={`/single/blog/${blog_data_useslactor?.get_blog[0]?._id}/${blog_data_useslactor?.get_blog[0]?.Slug?blog_data_useslactor?.get_blog[0]?.Slug:"Slug"}`}>
       <div className=" ">
             <span className="flex justify-center"><img src={blog_data_useslactor?.get_blog[0]?.image} alt="" className="w-[800px]  lg:h-[500px] md:h-[400px]    " /></span>
        <h4 className="text-[20px] font-semibold text-center mt-1">{blog_data_useslactor?.get_blog[0]?.title.substring(0,200)}...</h4>
    
        
        </div>
       </Link>
        
        <div className=" md:ml-3 border-l">
            <div className="md:border-l md:pl-3 mt-3 border-black flex flex-col  ">
            <span className="font-bold mb-1">New For You</span>
            <p className=""> Create an account for tailored recommendations based on your interests and preferences.</p>
            <button className="md:w-40 w-full h-10 mt-3 bg-black text-white rounded-lg px-2 font-semibold" onClick={()=>disptach(register_toggle(true))} >Register</button>
          
            </div>
            <Most_like_post/>
        </div>
       </div>
    </div>
 
  
  </div>
  <Home_page_Slider/>
 </>
  )
}

export default Addition