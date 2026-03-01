import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useBlogsQuery } from "../Redux/Api";
import { useState } from "react";
function All_blogs() {
    let {id}=useParams()
    let [current_page,setcurrent_page]=useState(1)
    let {data}=useBlogsQuery(current_page)
    // console.log(data);
    
    let spilit=id.split(".")
    console.log(spilit);
    
    
    let filter_data;
if (data) {
     filter_data=data.get_blog.filter((data)=>spilit[0]!=="sub"?data.cetagory==id:data?.subcetagory==spilit[1])
}
console.log(filter_data);


let slice
 if (filter_data) {
  if(filter_data?.length>4){
   slice=filter_data.slice(7)}

 }else{
  return
 }
   console.log(slice);
   
if (spilit[0]!=="sub") {
    return (
    <div className="">
 
        <div className="border-[1px] flex  gap-x-2 my-4 items-center pl-6 py-1">
      <Link to={'/'}>
      <span className="text-gray-400 text-[12px] cursor-pointer">
        FORBES
        </span>
      </Link>
        <span>
            <MdKeyboardArrowRight/>
        </span>
        <span className="uppercase text-gray-600 text-[12px] cursor-pointer" >
            {id}
        </span>
        </div>

        <div className="mt-10 px-10 border-b-2">
                {
                 filter_data&&
                      <>
                      <div>
                        <h3 className="border-b border-black pb-2 font-bold text-[25px]   pt-5">{filter_data[0]?.cetagory}</h3>
                      <div className="md:flex  mt-7">
                      <div className="md:w-[65%] mb-10 ">
                       <Link to={`/single/blog/${filter_data[0]?._id}/${filter_data[0]?.Slug?filter_data[0]?.Slug:"Slug"}`}>
                       <img src={filter_data[0]?.image} alt="" className="w-full" />
                        <span>
                          <h3 className="mt-5 font-bold text-[15px] pl-2 mb-5 border-b-2 pb-5">{filter_data[0]?.title}</h3>
                         </span>
                       </Link>
                         {/* <div className="md:block hidden">
                          <div className="flex mb-8  ">
                        <Link to={`/single/blog/${filter_data[3]?._id}`}>  <div className="flex w-[50%] ">
                              <span> <img src={filter_data[3]?.image} alt="" className="w-[150px] h-[90px] object-cover" /></span>
                              <h3 className=" ml-4 text-[16px] font-normal">{filter_data[3]?.title.substring(0,40)}</h3>
                            </div></Link>
                          <Link to={`/single/blog/${filter_data[4]?._id}`}>
                          <div className="flex w-[50%]">
                              <span> <img src={filter_data[4]?.image} alt="" className="w-[150px] h-[90px] object-cover" /></span>
                              <h3 className=" ml-4 text-[16px] font-normal ">{filter_data[4]?.title.substring(0,40)}</h3>
                            </div>
                          </Link>
                          </div>
                          <div>
                          <div className="flex  ">
                           <Link to={`/single/blog/${filter_data[5]?._id}`}>
                           <div className="flex w-[50%]  ">
                              <span> <img src={filter_data[5]?.image} alt="" className="w-[150px] h-[90px] object-cover" /></span>
                              <h3 className=" ml-4 text-[16px] font-normal">{filter_data[5]?.title.substring(0,40)}</h3>
                            </div>
                           </Link>
                           <Link to={`/single/blog/${filter_data[6]?._id}`}> <div className="flex w-[50%]">
                              <span> <img src={filter_data[6]?.image} alt="" className="w-[150px] h-[90px] object-cover" /></span>
                              <h3 className="  ml-4 text-[16px] font-normal">{filter_data[6]?.title.substring(0,40)}</h3>
                            </div></Link>
                          </div>
                          </div>
                         </div> */}
                           {/* <div className="md:block hidden">
                          <div className="flex gap-10   mb-40 ">
                        <Link to={`/single/blog/${filter_data[3]?._id}`}>  <div className=" border w-[300px] h-[200px] ">
                              <span className="break-all"> <img src={filter_data?.[3]?.image} alt="" className="  w-full h-full " /></span>
                              <h3 className=" ml-4 text-[16px] font-normal break-all">{filter_data?.[3]?.title}</h3>
                            </div></Link>
                          <Link to={`/single/blog/${filter_data?.[4]?._id}`}>
                          <div className="w-[300px] h-[200px] border ">
                              <span className="break-all"> <img src={filter_data?.[4]?.image} alt="" className="   w-full h-full" /></span>
                              <h3 className=" ml-4 text-[16px] font-normal break-all ">{filter_data?.[4]?.title}</h3>
                            </div>
                          </Link>
                          </div>
                          <div>
                          <div className="flex gap-x-9 mb-24 ">
                           <Link to={`/single/blog/${filter_data[5]?._id}`}>
                           <div className="w-[300px] h-[200px]  ">
                              <span className="break-all"> <img src={filter_data[5]?.image} alt="" className="    h-full w-full" /></span>
                              <h3 className=" ml-4 text-[16px] font-normal break-all">{filter_data[5]?.title}</h3>
                            </div>
                           </Link>
                           <Link to={`/single/blog/${filter_data[6]?._id}`}> <div className=" w-[300px] h-[200px]">
                              <span className="break-all"> <img src={filter_data[6]?.image} alt="" className="  h-full w-full" /></span>
                              <h3 className="  ml-4 text-[16px] font-normal break-all">{filter_data[6]?.title}</h3>
                            </div></Link>
                          </div>
                          </div>
                         </div> */}
                          <div className="md:block hidden">
                          <div className="flex gap-6 mb-8">
                        <Link to={`/single/blog/${filter_data[3]?._id}/${filter_data[3]?.Slug?filter_data[3]?.Slug:"Slug"}`}>  <div className=" border lg:w-[300px] md:w-[150px] lg:h-[200px]  md:h-[100px] ">
                              <span className="break-all"> <img src={filter_data[3]?.image} alt="" className="  w-full h-full " /></span>
                              <h3 className=" ml-4 text-[16px] font-semibold">{filter_data[3]?.title.substring(0,50)}</h3>
                            </div></Link>
                          <Link to={`/single/blog/${filter_data[4]?._id}/${filter_data[4]?.Slug?filter_data[4]?.Slug:"Slug"}`}>
                          <div className="lg:w-[300px] md:w-[150px] lg:h-[200px]  md:h-[100px] border ">
                              <span className="break-all"> <img src={filter_data[4]?.image} alt="" className="   w-full h-full" /></span>
                              <h3 className=" ml-4 text-[16px] font-semibold ">{filter_data[4]?.title.substring(0,50)}</h3>
                            </div>
                          </Link>
                          </div>
                          <div>
                          <div className="flex gap-x-9 mt-28 mb-20 ">
                           <Link to={`/single/blog/${filter_data[5]?._id}/${filter_data[5]?.Slug?filter_data[5]?.Slug:"Slug"}`}>
                           <div className="lg:w-[300px] md:w-[150px] lg:h-[200px]  md:h-[100px]  ">
                              <span className="break-all"> <img src={filter_data[5]?.image} alt="" className="    h-full w-full" /></span>
                              <h3 className=" ml-4 text-[16px] font-semibold">{filter_data[5]?.title.substring(0,50)}</h3>
                            </div>
                           </Link>
                           <Link to={`/single/blog/${filter_data[6]?._id}/${filter_data[6]?.Slug?filter_data[6]?.Slug:"Slug"}`}> <div className=" lg:w-[300px] md:w-[150px] lg:h-[200px]  md:h-[100px]">
                              <span className="break-all"> <img src={filter_data[6]?.image} alt="" className="  h-full w-full" /></span>
                              <h3 className="  ml-4 text-[16px] font-semibold">{filter_data[6]?.title.substring(0,50)}</h3>
                            </div></Link>
                          </div>
                          </div>
                         </div>
                        </div>
                        {/* <div className="md:border-l-2  md:ml-2 md:pl-2  md:w-[30%]">
                       <Link to={`/single/blog/${filter_data[1]?._id}`}>  <img src={filter_data[1]?.image} alt="" className="md:ml-2" />
                         <span>
                          <h3 className="mt-5 font-bold text-[15px] pl-2 mb-5">{filter_data[1]?.title}</h3>
                         </span></Link>
                       <Link to={`/single/blog/${filter_data[2]?._id}`}>  <img src={filter_data[2]?.image} alt="" className="md:ml-2" />
                         <span>
                          <h3 className="mt-5 font-bold text-[15px] pl-2 mb-5">{filter_data[2]?.title}</h3>
                         </span></Link>
                        </div> */}
                          <div className="md:border-l-2  md:ml-2 md:pl-2  md:w-[40%] break-all ">
                       <Link to={`/single/blog/${filter_data[1]?._id}/${filter_data[1]?.Slug?filter_data[1]?.Slug:"Slug"}`}>  <img src={filter_data[1]?.image} alt="" className="md:ml-2 lg:w-[500px] md:w-[300px] w-[300px]" />
                         <span>
                          <h3 className="mt-5 font-semibold text-[15px] pl-2 mb-5">{filter_data[1]?.title}</h3>
                         </span></Link>
                       <Link to={`/single/blog/${filter_data[2]?._id}/${filter_data[2]?.Slug?filter_data[2]?.Slug:"Slug"}`}>  <img src={filter_data[2]?.image} alt="" className="md:ml-2 lg:w-[500px] md:w-[300px] w-[300px]" />
                         <span>
                          <h3 className="mt-5 font-semibold text-[15px] pl-2 mb-5">{filter_data[2]?.title}</h3>
                         </span></Link>
                        </div>
                      </div>
                      </div>
                      
                      </>
              
                }
              </div>
<div className="flex md:flex-wrap md:justify-center md:items-stretch gap-6 mt-12 px-6 md:px-10 overflow-x-auto md:overflow-visible pb-4">

{
  
  slice&&
  slice.map((data,i)=>{
    const imgSrc = Array.isArray(data.image) ? data.image[0] : data.image
    return(
      <Link 
        key={data._id||i} 
        to={`/single/blog/${data._id}/${data?.Slug?data?.Slug:"Slug"}`} 
        className="flex-shrink-0 w-[260px] sm:w-[280px] group"
      >
        <article className="h-full overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={imgSrc} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {data.cetagory && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-teal-600 text-white text-xs font-medium rounded-md">
                {data.cetagory}
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-800 text-[15px] line-clamp-2 group-hover:text-teal-700 transition-colors">
              {data.title?.substring(0,50)}{data.title?.length > 50 && "..."}
            </h3>
          </div>
        </article>
      </Link>
    )
  })
 }

</div>
<div className="flex justify-center"><button className="bg-teal-600 hover:bg-teal-700 text-white w-[140px] my-6 h-11 rounded-xl font-semibold cursor-pointer transition-colors shadow-lg shadow-teal-900/20" onClick={()=>setcurrent_page((perv)=>perv+1)}>Show more</button></div>
    </div>
  )
}else{
  return (
    <div className="">
        <div className="border-[1px] flex  gap-x-2 my-4 items-center pl-6 py-1">
        <span className="text-gray-400 text-[12px] cursor-pointer">
        FORBES
        </span>
        <span>
            <MdKeyboardArrowRight/>
        </span>
        <span className="uppercase text-gray-600 text-[12px] cursor-pointer" >
            {id}
        </span>
        </div>

        <div className="mt-10 px-10 border-b-2">
                {
                 filter_data&&
                      <>
                      <div>
                        
                        <h3 className="border-b border-black pb-2 font-bold text-[25px]   pt-5">{filter_data[0].subcetagory}</h3>
                      <div className="md:flex  mt-7">
                      <div className="md:w-[65%] mb-10 ">
                       <Link to={`/single/blog/${filter_data[0]?._id}/${filter_data[0]?.Slug?filter_data[0]?.Slug:"Slug"}`}>
                       <img src={filter_data[0]?.image} alt="" className="w-[500px] h-[400px]" />
                        <span>
                          <h3 className="mt-5 font-bold text-[15px] pl-2 mb-5 border-b-2 pb-5">{filter_data[0]?.title}</h3>
                         </span>
                       </Link>
                       <div className="md:block hidden">
                          <div className="flex gap-6 mb-8">
                        <Link to={`/single/blog/${filter_data[3]?._id}/${filter_data[3]?.Slug?filter_data[3]?.Slug:"Slug"}`}>  <div className=" border lg:w-[300px] md:w-[150px] lg:h-[200px]  md:h-[100px] ">
                              <span className="break-all"> <img src={filter_data[3]?.image} alt="" className="  w-full h-full " /></span>
                              <h3 className=" ml-4 text-[16px] font-semibold">{filter_data[3]?.title.substring(0,50)}</h3>
                            </div></Link>
                          <Link to={`/single/blog/${filter_data[4]?._id}/${filter_data[4]?.Slug?filter_data[4]?.Slug:"Slug"}`}>
                          <div className="lg:w-[300px] md:w-[150px] lg:h-[200px]  md:h-[100px] border ">
                              <span className="break-all"> <img src={filter_data[4]?.image} alt="" className="   w-full h-full" /></span>
                              <h3 className=" ml-4 text-[16px] font-semibold ">{filter_data[4]?.title.substring(0,50)}</h3>
                            </div>
                          </Link>
                          </div>
                          <div>
                          <div className="flex gap-x-9 mt-28 mb-20 ">
                           <Link to={`/single/blog/${filter_data[5]?._id}/${filter_data[5]?.Slug?filter_data[5]?.Slug:"Slug"}`}>
                           <div className="lg:w-[300px] md:w-[150px] lg:h-[200px]  md:h-[100px]  ">
                              <span className="break-all"> <img src={filter_data[5]?.image} alt="" className="    h-full w-full" /></span>
                              <h3 className=" ml-4 text-[16px] font-semibold">{filter_data[5]?.title.substring(0,50)}</h3>
                            </div>
                           </Link>
                           <Link to={`/single/blog/${filter_data[6]?._id}/${filter_data[6]?.Slug?filter_data[6]?.Slug:"Slug"}`}> <div className=" lg:w-[300px] md:w-[150px] lg:h-[200px]   md:h-[100px]">
                              <span className="break-all"> <img src={filter_data[6]?.image} alt="" className="  h-full w-full" /></span>
                              <h3 className="  ml-4 text-[16px] font-semibold ">{filter_data[6]?.title.substring(0,50)}</h3>
                            </div></Link>
                          </div>
                          </div>
                         </div>
                        </div>
                        <div className="md:border-l-2  md:ml-2 md:pl-2  md:w-[40%] break-all ">
                       <Link to={`/single/blog/${filter_data[1]?._id}/${filter_data[1]?.Slug?filter_data[1]?.Slug:"Slug"}`}>  <img src={filter_data[1]?.image} alt="" className="md:ml-2 lg:w-[500px] md:w-[300px] w-[300px]" />
                         <span>
                          <h3 className="mt-5 font-semibold text-[15px] pl-2 mb-5">{filter_data[1]?.title}</h3>
                         </span></Link>
                       <Link to={`/single/blog/${filter_data[2]?._id}/${filter_data[2]?.Slug?filter_data[2]?.Slug:"Slug"}`}>  <img src={filter_data[2]?.image} alt="" className="md:ml-2 lg:w-[500px] md:w-[300px] w-[300px]" />
                         <span>
                          <h3 className="mt-5 font-semibold text-[15px] pl-2 mb-5">{filter_data[2]?.title}</h3>
                         </span></Link>
                        </div>
                      </div>
                    
                      </div>
                      
                      </>
              
                }
              </div>
<div className="flex md:flex-wrap md:justify-center md:items-stretch gap-6 mt-12 px-6 md:px-10 overflow-x-auto md:overflow-visible pb-4">
{
  slice&&
  slice.map((data,i)=>{
    const imgSrc = Array.isArray(data.image) ? data.image[0] : data.image
    return(
      <Link 
        key={data._id||i} 
        to={`/single/blog/${data._id}/${data?.Slug?data?.Slug:"Slug"}`} 
        className="flex-shrink-0 w-[260px] sm:w-[280px] group"
      >
        <article className="h-full overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={imgSrc} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {data.cetagory && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-teal-600 text-white text-xs font-medium rounded-md">
                {data.cetagory}
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-800 text-[15px] line-clamp-2 group-hover:text-teal-700 transition-colors">
              {data.title?.substring(0,50)}{data.title?.length > 50 && "..."}
            </h3>
          </div>
        </article>
      </Link>
    )
  })
  
 }

</div>
<div className="flex justify-center"><button className="bg-teal-600 hover:bg-teal-700 text-white w-[140px] my-6 h-11 rounded-xl font-semibold cursor-pointer transition-colors shadow-lg shadow-teal-900/20" onClick={()=>setcurrent_page((perv)=>perv+1)}>Show more</button></div>

    </div>
  )
}
}

export default All_blogs