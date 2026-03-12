import { useState } from "react"
import { useCreate_newPssMutation } from "../Redux/Api"
import {toast} from 'react-toastify'

function Create_new_password({mail,logintoggle}) {
    let [create_newPassFnc,{data}]=useCreate_newPssMutation()
    let [create_password_data,setcreate_password_data]=useState({
        newPassword:"",
        confirmnewPassword:"",
        mail:mail
    })


    let Create_new_pass=()=>{
        create_newPassFnc(create_password_data)
        
        if (data?.success==true) {
            toast.success("change password successfully")
            window.location.reload()
        }
  
    }


  return (
<>
<div className="border py-10 rounded-lg px-10">

<h3 className=" text-black w-[75%] text-[22px] merriweather-bold mb-10 text-center ">Create new password</h3>
    <label htmlFor="" className=" font-bold text-[#737373] text-[17px]  relative  " >Enter new  password</label>
<span>
<input type="text" name="" id=""  className=" border outline-none h-12 w-[100%]  text-[#737373]  rounded-r-sm  font-semibold relative border-[#737373] px-4 my-3"  readOnly value={mail} onChange={(e)=>setcreate_password_data((perv)=>({...perv,newPassword:e.target.value}))}/>

</span>


    <h3 className=" text-black w-[75%] text-[22px] merriweather-bold mb-10 text-center ">Create new password</h3>
    <label htmlFor="" className=" font-bold text-[#737373] text-[17px]  relative  " >Enter new  password</label>
<span>
<input type="text" name="" id=""  className=" border outline-none h-12 w-[100%]  text-[#737373]  rounded-r-sm  font-semibold relative border-[#737373] px-4 my-3"  placeholder="Enter your new password" value={create_password_data.newPassword} onChange={(e)=>setcreate_password_data((perv)=>({...perv,newPassword:e.target.value}))}/>

</span>
    <label htmlFor="" className=" font-bold text-[#737373] text-[17px]  relative  " >Confirm new  password</label>
<span>
<input type="text" name="" id=""  className=" border outline-none h-12 w-[100%]  text-[#737373]  rounded-r-sm  font-semibold relative border-[#737373] px-4 my-3"  placeholder="Confirm your new password" value={create_password_data.confirmnewPassword} onChange={(e)=>setcreate_password_data((perv)=>({...perv,confirmnewPassword:e.target.value}))}/>

</span>
<button className="w-[100%] bg-[#007AC8] rounded-md h-[50px] mt-3 font-semibold pb-1 text-[18px]" onClick={()=>Create_new_pass()} >submit</button>

  </div>

</>
)
}

export default Create_new_password