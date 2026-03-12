// import { useState } from "react";
import { GoHome } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
// import { MdOutlineUpdate } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { RiPriceTagLine } from "react-icons/ri";
import { PiArticleThin } from "react-icons/pi";
import { FaRegCommentAlt } from "react-icons/fa";
import sidebar_start from '../../assets/side bar_start.png'
import { MdOutlineRoundaboutLeft } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { PiTerminalWindowLight } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";

import { Link } from "react-router-dom";
function Sidebar({hover,sethover}) {

  
  return (
    <div>
      <div className={`${hover?"w-[200px] ":"w-[60px] "}  border-2  bg-white rounded-3xl`} onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)}>
<div className=" mt-5 ml-4 mb-4 h-full">
 <span className="flex gap-3">
 <img src={sidebar_start} alt="" className={` w-[25px]`} />
 <span className={`font-bold ${hover?"block":"hidden"}`}>Forbes</span>
 </span>
 <Link to={'/admin'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[25px]">
<GoHome/>
</span>
<span className={`${hover?"block duration-500":"hidden  duration-500"} duration-500 font-semibold`}>Home</span>
</div></Link>
<Link to={'All_blogs/admin'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[25px]">
<PiArticleThin/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Update blogs</span>
</div>
</Link>
<Link to={'/all_cetagories/admin'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[25px]">
<RiPriceTagLine/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>All cetagory</span>
</div></Link>
<Link to={"/create/blog"}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[25px]">
<IoCreateOutline/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Create blog</span>
</div>
</Link>
{/* <Link to={'/update/blog'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[25px]">
<MdOutlineUpdate/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Update blog</span>
</div>
</Link> */}
<Link to={"/delete/blog"}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[25px]">
<AiOutlineDelete/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Delete blog</span>
</div>
</Link>
<Link to={'/create/cetagory'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[25px]">
<IoCreateOutline/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Create cetagory</span>
</div>
</Link>
<Link to={"/delete/cetagory"}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[25px]">
<AiOutlineDelete/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Delete cetagory</span>
</div>
</Link>
<Link to={'/all/comments'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[20px]">
<FaRegCommentAlt/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>All Comments</span>
</div>
</Link>
<Link to={'/create/About'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[20px]">
<MdOutlineRoundaboutLeft/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>About</span>
</div>
</Link>
<Link to={'/create/privacy'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[20px]">
<MdOutlinePrivacyTip/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Privacy plicy</span>
</div>
</Link>
<Link to={'/create/disclamer'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[20px]">
<CiWarning/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Disclamer</span>
</div>
</Link>
<Link to={'/create/term'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[20px]">
<PiTerminalWindowLight/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>Term&condition</span>
</div>
</Link>
<Link to={'/users'}>
<div className="mt-10 flex gap-3 items-center cursor-pointer">
<span className="text-[20px]">
<PiTerminalWindowLight/>
</span>
<span className={`${hover?"block duration-500":"hidden  "} duration-500 font-semibold`}>All users</span>
</div>
</Link>

</div>
      </div>
    </div>
  )
}

export default Sidebar