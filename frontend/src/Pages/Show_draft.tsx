import { useDraft_getQuery } from "../Redux/Api"
import { Link } from "react-router-dom";

function Show_draft() {
  let local_storage_data=JSON.parse(localStorage.getItem("user"))||[]
let {data}=useDraft_getQuery(local_storage_data?.id)

  return (
    <div className="">
      <div className="bg-black w-full text-white flex justify-center items-center h-20 ">
      <span className="font-semibold text-[24px]">ALL DRAFT</span>
      </div>
      <div className="md:px-20 px-12">
       <div className="flex items-center mt-12 gap-10 flex-wrap pb-12 ">
        {
          data&&
          data?.
          find_draft.map((data)=>{
            console.log(data);
            
         return(
          <>
          <Link to={`/single/blog/${data?._id}`}>
          <div className="w-[270px] md:flex-none flex flex-col items-center   ">
            <span><img src={data?.image} alt="" className="max-w-[100px] h-[80px]  mb-5" /></span>
            <span className="font-bold">{data?.title}</span>
          </div>
          </Link>
          </>
         )
          })
        }
       </div>
      </div>
    </div>
  )
}

export default Show_draft