import bycript from "bcrypt"
import JWT from "jsonwebtoken"
import cloudinary from '../Config/Coludinery.js'
import { user_model }  from "../Modules/UserModel.js"
import {validate} from 'email-validator'
import nodemailer from 'nodemailer'
// import { nodemailerfnc } from "../Config/Nodemailr.js"
export let user_register=async(req,res)=>{
try {
    let {name,email,password}=req.body
    let user=await user_model.findOne({email:email})
if(user)return res.status(201).json({success:false,"message":"enter unique email"})
let result;
if (req.file) {
    
    let url=`data:image/jpg;base64,${req.file.buffer.toString("base64")}`
     result=  await cloudinary.v2.uploader.upload(url)
}
   console.log(result);
   let check_email=validate(email)

if (!check_email) return res.status(200).json({success:false,"message":"enter corrent email format"})
    console.log(req.body);
    

if(!name)return res.status(200).json({success:false,"message":"enter your name"})
if(!email)return res.status(200).json({success:false,"message":"enter your email"})
if(!password)return res.status(200).json({success:false,"message":"enter your password"})

    let password_hash=await bycript.hash(password,10)
let create=user_model.create({
    name:name,
    email:email,
    password:password_hash,
    image:result?.secure_url,
    public_id:result?.public_id
}) 



res.status(200).json({success:true,"message":"user created succssfully"})
} catch (error) {
    console.log(error);
    
}
}
 export let loginUser=async(req,res)=>{
    let {email,password}=req.body
    if(!email)return res.status(200).json({success:false,"message":"enter your email"})
    if(!password)return res.status(200).json({success:false,"message":"enter your password"})
        let user=await user_model.findOne({email:email}).populate({path:"draft"})        
    if(!user)return res.status(200).json({success:false,"message":"enter your correct email"})
        console.log(user.password);
        
        let verify_password=await bycript.compare(password,user.password)
  
    if(!verify_password)return res.status(200).json({success:false,"message":"enter your correct Password"})
        let Token=await JWT.sign({id:user._id},process.env.TOKEN,{expiresIn:"1d"})
    let user_data={
        email:user.email,
        name:user.name,
        role:user.role,
        id:user._id,
        draft:user.draft,
        image:user.image
     }
    res.cookie("Token", Token, {
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
        sameSite: "lax",
        httpOnly: true
    }).status(200).json({ success: true, "message": "user login successfully", user_data })
  
}
export let logoutUser=async(req,res)=>{
res.cookie("Token","")
res.status(200).json({success:true,"message":"logout successfully"})
}
export let profile_update=async(req,res)=>{
try {
    let{name,email,password}=req.body
let avtar=req.file

let login_user=req.user
let check_email=validate(email)




 
let find_user=await user_model.findById(login_user) 
let public_id=find_user?.public_id
if (avtar) {
    console.log("faiz");
    
       if (public_id) {
        let delete_image= await cloudinary.v2.uploader.destroy(public_id)
       }
       
       
       
  
        let url=`data:image/jpg;base64,${avtar.buffer.toString("base64")}`
        let rsult= await cloudinary.v2.uploader.upload(url)
       console.log(rsult);
       await user_model.findByIdAndUpdate(login_user,{image:rsult.secure_url,public_id:rsult.public_id})
    

}
 if (password) {
   
   let hash_password= await bycript.hash(password,10)
   await user_model.findByIdAndUpdate(login_user,{password:hash_password})
 }

 
if (name) {
    await user_model.findByIdAndUpdate(login_user,{name:name})
}
if (email) {
    if(!check_email)return res.status(401).json({success:false,"message":"enter corrent email format"})
     await user_model.findByIdAndUpdate(login_user,{email:email})
}


res.status(200).json({success:true,"message":"profile updated successfully"})


    

} catch (error) {
    console.log(error);
    
}
}

export let forget_passwword=async(req,res)=>{
let find_user=await user_model.findOne({email:req.params.email})

 if (find_user==null) return res.status(200).json({success:false,"message":"user not found"})

let transmeter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"faizansari2025@gmail.com",
        pass:"qcse mhre yzvr vghe"
    }
})
let code=Math.floor(Math.random()*10000)
 let nodemailerfnc=async(email)=> {
    
console.log(req.params.email);
    

    let info=await transmeter.sendMail({
        from:"faizansari2025@gmail.com",
        to:req.params.email,
        text:code.toString(),
        subject:"this is test email"
         
    })
}
nodemailerfnc().catch(console.log("error")
)

await user_model.findOneAndUpdate({email:req.params.email},{otp:code},{new:true})
res.status(200).json({success:true,"message":"opt send successfully"})
}
export let checkOtp=async(req,res)=>{
    console.log(req.params);
    
let check=await user_model.findOne({otp:req.params.otp})
if (!req.params.otp) return res.status(200).json({success:false,"message":"enter  otp"})
     
    
if (!check) return res.status(200).json({success:false,"message":"enter correct otp"})
    
    return res.status(200).json({success:true,"message":" otp submit"})
}

export let create_newPassword=async(req,res)=>{
let {newPassword,confirmnewPassword,mail}=req.body
console.log(mail);
console.log(newPassword);


if (newPassword!==confirmnewPassword) return res.status(200).json({success:false,"message":"new password not matched from confirm password"})
    let hash= await bycript.hash(newPassword,10)

  let docoment= await user_model.findOneAndUpdate({email:mail},{password:hash},{new:true})
  console.log(docoment);
  docoment.otp=''
  docoment.save({validateBeforeSave:false})
  res.status(200).json({success:true,"message":"password change successfully"})
}
export let change_role=async(req,res)=>{
let {id}=req.params
let {role}=req.query
console.log(id);
console.log(role);


if (!id) return res.status(200).json({success:false,"message":"add user id"})
 await user_model.findByIdAndUpdate(id,{role:role})   
res.status(200).json({success:true,"message":"change role successfully"})
}
export let All_userget=async(req,res)=>{
   let users= await user_model.find()
   res.status(200).json({success:true,"message":"user successfully",users})
}
export let delete_user=async(req,res)=>{
    let {id}=req.params
    if (!id) {
        return  res.status(200).json({success:false,"message":" add the id",users})
    }
    let users= await user_model.findOneAndDelete({_id:id})
    res.status(200).json({success:true,"message":"user delete successfully"})
 }
 export let single_user=async(req,res)=>{
    let login_user=req.user
    // console.log(login_user);
    
    if (!login_user) return res.status(200).json({success:false,"message":"user not login"})
        
    
   let user= await user_model.findById(login_user)
   res.status(200).json({success:true,"message":"user login data",user})
}