
import { MdMessage } from "react-icons/md";


import {useNavigate, useParams} from'react-router-dom'
import {  useLogin_userQuery, useSingle_blogQuery } from "../Redux/Api";
import { useDispatch } from "react-redux";
import { update_blog } from "../Redux/api_data_slice";
import { comment_fnc } from "../Redux/ALL_moduls._Slice";
import Like_Blog from "../Compunents/Like_Blog";
import Draft from "../Compunents/Draft";
import Helmet from 'react-helmet'
function Single_Blog_page() {
//  let dispatch=useDispatch()
let local_storage=JSON.parse(localStorage.getItem("user"))||[]
  let {id}=useParams()
 
  let {data}=useSingle_blogQuery(id)
  let {data:login_user}=useLogin_userQuery()
  
  
console.log(data);

  

  let navigate=useNavigate()
window.scrollTo(0,0)
let dispacth=useDispatch()


// if (data) {
//   dispacth(like(filter_like.length))
// }


  // console.log(data?.blog_get?.likes?.length);
  
  // console.log(data);
  



  return (
    <div className=" flex flex-col text-center   items-center  my-10 ">
      <Helmet>
     <title>{data?.blog_get?.metaTitle}</title>
     <meta name="description" content={data?.blog_get?.metaDescription} />
 </Helmet>

  <div className="  flex flex-col text-center    w-[94%] md:w-[60%] break-words	 ">
  <div className="   ">
    <div className="break-all		">
      <h1 className="font-bold text-[30px]">
      {data&&
      data?.blog_get?.title}
      </h1>
      <div className="flex justify-between items-center mt-6 px-8 md:px-0 w-full ">
      <div className={`${login_user?.user?.image?"block":"hidden"}`}>
      <img src={login_user?.user?.image} alt="" className="w-[50px] rounded-full h-[50px]" />
      <h5 className="font-semibold">{login_user?.user?.name}</h5>
      
      </div>
      <div>
        <button className={`w-[90px] h-[30px] cursor-pointer rounded-md bg-black text-white ${local_storage.role=="admin"?"block":"hidden"}`} onClick={()=>{
          dispacth(update_blog(data)),
          navigate(`/update/blog/${id}`)
        }}>Edit blog</button>
      </div>
      </div>
      <div className="border-y mt-4 flex justify-between py-2 md:px-0 px-8  ">
<Like_Blog data={data}/>
<span>
<MdMessage className="text-[23px] cursor-pointer" onClick={()=>dispacth(comment_fnc(true))} single_blog_data={data}/>
</span>
<span>
  <Draft/>

</span>
      </div>
      
    </div>
    </div>
  <div className="  text-start flex flex-col items-center md:px-20 px-10 leading-8 break-all		    mt-10    ">
  {data&&
 
 data?.blog_get?.content[0]?.content?
      data?.blog_get?.content[0]?.content?.blocks.map((data)=>{
        if (data.type=='header'&& data.data.level==1) {
         return(
         <>
          <span className="text-[30px] font-bold mt-10 line break-words	 ">
          <h1 dangerouslySetInnerHTML={{__html:data.data.text}}>

          </h1>
        </span>
         
         </>
         )
        }  if(data.type=='header'&& data.data.level==2){
             return(
              <>
              <span className="text-[25px] font-bold mt-10 break-words	">
              <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>
    
              </h2>
            </span>
             
             </>
             )
        } if(data.type=='header'&& data.data.level==3){
          return(
           <>
           <span className="text-[20px] font-bold mt-10 ">
           <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>
 
           </h2>
         </span>
          
          </>
          )
     } if(data.type=='header'&& data.data.level==4){
      return(
       <>
       <span className="text-[16px] font-bold mt-10">
       <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

       </h2>
     </span>
      
      </>
      )
 } 
 if(data.type=='header'&& data.data.level==5){
  return(
   <>
   <span className="text-[15px] font-bold mt-10">
   <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

   </h2>
 </span>
  
  </>
  )
} 
if(data.type=='header'&& data.data.level==6){
  return(
   <>
   <span className="text-[13px] font-bold mt-10">
   <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

   </h2>
 </span>
  
  </>
  )
} 
if(data.type=='header'&& data.data.level==7){
  return(
   <>
   <span className="text-[12px] font-bold mt-10">
   <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

   </h2>
 </span>
  
  </>
  )
} 
if(data.type=='paragraph'){
  return(
   <>
   <span className="text-[17px] mt-10 ">
   <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

   </h2>
 </span>
  
  </>
  )
} 
if(data.type=='Image'){
  return(
   <>
   <span className="text-[17px] mt-5 flex flex-col items-center ">
   <img src={data.data.file.url} alt={data.data.caption} className="" />
 </span>
  
  </>
  )
} 
if(data.type=='List'|| data.data.style=="unordered"){
  return(
   <>
 
  <div>
  {
    
    data.data.items.map((data)=>{
    
      return(
        <>
        
        
       <div className="mb-5 mt-10">
       <li dangerouslySetInnerHTML={{__html:data.content}}></li>
       </div>
        
        </>
        )
     
    })
    
  }
  </div>
  
  </>
  )
} 
if(data.type=='List'|| data.data.style=="ordered"){
  return(
   <>
 <div>

 
  {
    data&&
    data.data.items.map((data,i)=>{
    
      return(
        <>
        
        <span>
         <span>{i}</span>
        <span dangerouslySetInnerHTML={{__html:data.content}}></span>
        </span>
        
        
        </>
        )
     
    })
    
  }

  </div>
  </>
  )
} 

if(data.type=='table'){
  return(
   <>
 <div>

 <table className="border-2 border-collapse">
  {
    
    // data.data.content.map((data,i)=>{
    
    //   return(
    //     <>
        
    //    <th>
    //     <tr dangerouslySetInnerHTML={{__html:data[0]}}></tr>
    //    </th>
        
        
    //     </>
    //     )
     
    // })

    
  }
</table>
  </div>
  </>
  )
} 
      }):      data?.blog_get?.content[0]?.blocks.map((data)=>{
        if (data.type=='header'&& data.data.level==1) {
         return(
         <>
          <span className="text-[30px] font-bold mt-10 line ">
          <h1 dangerouslySetInnerHTML={{__html:data.data.text}}>

          </h1>
        </span>
         
         </>
         )
        }  if(data.type=='header'&& data.data.level==2){
             return(
              <>
              <span className="text-[25px] font-bold mt-10">
              <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>
    
              </h2>
            </span>
             
             </>
             )
        } if(data.type=='header'&& data.data.level==3){
          return(
           <>
           <span className="text-[20px] font-bold mt-10 ">
           <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>
 
           </h2>
         </span>
          
          </>
          )
     } if(data.type=='header'&& data.data.level==4){
      return(
       <>
       <span className="text-[16px] font-bold mt-10">
       <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

       </h2>
     </span>
      
      </>
      )
 } 
 if(data.type=='header'&& data.data.level==5){
  return(
   <>
   <span className="text-[15px] font-bold mt-10">
   <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

   </h2>
 </span>
  
  </>
  )
} 
if(data.type=='header'&& data.data.level==6){
  return(
   <>
   <span className="text-[13px] font-bold mt-10">
   <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

   </h2>
 </span>
  
  </>
  )
} 
if(data.type=='header'&& data.data.level==7){
  return(
   <>
   <span className="text-[12px] font-bold mt-10">
   <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

   </h2>
 </span>
  
  </>
  )
} 
if(data.type=='paragraph'){
  return(
   <>
   <span className="text-[17px] mt-10 ">
   <h2 dangerouslySetInnerHTML={{__html:data.data.text}}>

   </h2>
 </span>
  
  </>
  )
} 
if(data.type=='Image'){
  return(
   <>
   <span className="text-[17px] mt-5 flex flex-col items-center ">
   <img src={data.data.file.url} alt={data.data.caption} className="" />
   
 </span>
  
  </>
  )
} 
if(data.type=='List'|| data.data.style=="unordered"){
  return(
   <>
 
  <div>
  {
    
    data.data.items.map((data)=>{
    
      return(
        <>
        
        
       <div className="mb-5 mt-10">
       <li dangerouslySetInnerHTML={{__html:data.content}}></li>
       </div>
        
        </>
        )
     
    })
    
  }
  </div>
  
  </>
  )
} 
if(data.type=='List'|| data.data.style=="ordered"){
  return(
   <>
 <div>

 
  {
    
    data.data.items.map((data,i)=>{
    
      return(
        <>
        
        <span>
         <span>{i}</span>
        <span dangerouslySetInnerHTML={{__html:data.content}}></span>
        </span>
        
        
        </>
        )
     
    })
    
  }

  </div>
  </>
  )
} 


      })
    }
  </div>
  </div>
    </div>
  )

}

export default Single_Blog_page