import fs from "fs"
import sharp from 'sharp'
import node_cach from "node-cache"
import { blog_model }from "../Modules/BlogModel.js"
import { user_model } from"../Modules/UserModel.js"
import cloudinary from'../Config/Coludinery.js'
import {cetagory_model} from "../Modules/Cetagory.js" 
import {createClient} from 'redis'
 export let create_blog=async(req,res)=>{
     let data=JSON.parse(req.body.content)
   //   let image_index=0
   // for (let i = 0; i < data.blocks.length; i++) {
    
   //    // console.log(data.blocks[image_index].data.file={
   //    //    secure_ur:"faiz ansari"
   //    // });
    
   //    if(data.blocks[i].type=="Image"){
     
   // //  let urls= `data:image/jpg;base64,${req.files.images[image_index].buffer.toString("base64")}`
   
   // //  let result=  await cloudinary.uploader.upload(urls)
   // // console.log(result.secure_url);
   
   
   // console.log(req.files.images[image_index]);
   
   // image_index++
   // console.log(image_index);
   
   
   
   
   // // let time=new Date()
   // // let hours=time.getHours()
   // // let minutes=time.getMinutes()
   
   // // data.blocks[image_index].data.file={
   // //    secure_url:result.secure_url,
   // //    public_id:result.public_id
   // // }
   
   
   
   //    }  

      
      
   //   }
     


    

try {
   let {title,content,cetagory,subcetagory,metaTitle,metaDescription,metaSlug}=req.body
let {image}=req.files

   
   



  let data=JSON.parse(req.body.content)
 
 
 
//   console.log(req.files.image[0].buffer);
  

   
   if(!title)return res.status(200).json({success:false,"message":"please enter all the fields"})
   if(!cetagory)return res.status(200).json({success:false,"message":"please enter all the cetagory"})
   if(!subcetagory)return res.status(200).json({success:false,"message":"please enter all the subcetagory"})
   if(!image)return res.status(200).json({success:false,"message":"enter your image"})
   if (data.blocks.length==0) return res.status(200).json({success:false,"message":"enter your blog content"})
   
   
         
      
       
   let image_index=0 
for (let i = 0; i < data.blocks.length; i++) {
 
   
   // console.log(data.blocks[image_index].data.file={
   //    secure_ur:"faiz ansari"
   // });
  
   if(data.blocks[i].type=="Image"){
 let compress =await sharp(req.files.images[image_index].buffer).webp({quality:80}).toBuffer()
  let urls= `data:image/jpg;base64,${compress.toString("base64")}`

  let result=  await cloudinary.uploader.upload(urls)

 data.blocks[i].data.file={
   url:result.secure_url,
   public_id:result.public_id
}


image_index++
 

let time=new Date()
let hours=time.getHours()
let minutes=time.getMinutes()


  



   }
   

  }
  let compress=await sharp(req.files.image[0].buffer).webp({quality:80}).toBuffer()
  let single_image_result=  await cloudinary.uploader.upload(`data:image/jpg;base64,${compress.toString("base64")}`)
  let create_blog=await blog_model.create({
   title:title,
   content:data,
   user:req.user,
   image:single_image_result.secure_url,
   public_id:single_image_result.public_id,
   cetagory:cetagory,
   subcetagory:subcetagory,
   metaDescription:metaDescription,
   metaTitle:metaTitle,
   Slug:metaSlug
})



  await cetagory_model.findOneAndUpdate({cetagory:cetagory},{$push:{blogs:create_blog._id}},{new:true})

await user_model.findByIdAndUpdate(req.user,{$push:{blogs:create_blog._id}},{new:true})
res.status(200).json({success:true,"message":"blog created successfully",create_blog})
      

}catch(eror){
console.log(eror);

}
}
export let getblog=async (req,res)=>{
   let {current_page}=req.params
  let cache=new node_cach()
   
   if (!req.paramscurrent_page) {
      current_page=1
   }
   let perpage_result=10*current_page




   const client = createClient({
      url:'redis://default:hDSDep7lIuP6v655YpkE95i8xD8lPzOW@redis-17748.crce182.ap-south-1-1.ec2.redns.redis-cloud.com:17748',
      // username: 'default',
      // password: 'hDSDep7lIuP6v655YpkE95i8xD8lPzOW',
      // socket: {
      //     host: 'redis-17748.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
      //     port: 17748
      // }
  });
  
  
  client.on('error', err => console.log('Redis Client Error', err));


  await client.connect();

  // let get_blog=await (await blog_model.find().sort({createdAt:-1}).limit(perpage_result).populate({path:"comments",populate:{path:"user"}}))
  //    //  await client.set('foo', JSON.stringify(get_blog));
  //      res.status(200).json({success:true,"message":"blog get successfully",get_blog})
  
  
   const result = await client.get('foo'); 
   
  if (result) {
  
     console.log("else mai gaya");
     let get_blog=JSON.parse(result)
    return res.status(200).json({success:true,"message":"blog get successfully",get_blog})
  
  
     
  }
  
     console.log("if mai gaya");
     
     let get_blog=await (await blog_model.find().sort({createdAt:-1}).limit(perpage_result).populate({path:"comments",populate:{path:"user"}}))
     let string=JSON.stringify(get_blog)
       await client.set('foo', string);
       await client.expire("foo",600)
       res.status(200).json({success:true,"message":"blog get successfully",get_blog})





// let get_blog=await (await blog_model.find().sort({createdAt:-1}).limit(perpage_result).populate({path:"comments",populate:{path:"user"}}))

// res.status(200).json({success:true,"message":"blog get successfully",get_blog})
}
export let update_blog=async (req,res)=>{
   try {
       let content=JSON.parse(req.body.content)
      let {title,cetagory,subcetagory,public_id,metaTitle,metaDescription,metaSlug}=req.body 
    let {id}=req.params
//   console.log(public_id);
  let find_blog=await blog_model.findById(id)
  let filter=find_blog?.content[0]?.blocks.filter((data)=>data.type=="Image")
  let string=null
  if (public_id) {
   string=public_id.toString()
  }

 
 let filter_2=  filter.filter((data)=>data.data.file.public_id!==string
 )
 
  filter_2.forEach(async element => { 
   try {
      
      
     let result= await cloudinary.v2.uploader.destroy(element.data.file.public_id)
     console.log(element.data.file.public_id);
     
   } catch (error) {
      console.log(error);
      
   }
   
  }); 
   
   
 if (req.files.image) {

   let find_blog=await blog_model.findById(id)
   let result=await cloudinary.v2.uploader.destroy(find_blog.public_id[0])
   
   let compress=await sharp(req.files.image[0].buffer).webp({quality:80}).toBuffer()
   
    let img_url=  `data:image/jpg;base64,${compress.toString("base64")}`
   let add_image_in_cloudinery=await cloudinary.v2.uploader.upload(img_url)
   console.log(add_image_in_cloudinery);
    await blog_model.findByIdAndUpdate(id,{image:add_image_in_cloudinery.secure_url,public_id:add_image_in_cloudinery.public_id},{new:true})
   
 }

 let get=await blog_model.findByIdAndUpdate(id,{title:title,cetagory:cetagory,subcetagory:subcetagory})



 if(req.files){


content?.blocks?.forEach(async element => {
try {
   if (element.data?.file?.image) {
  
      req.files.images.forEach(async(data)=>{
try {
      // let img_url=  `data:image/jpg;base64,${data.buffer.toString("base64")}`
       let compress=await sharp(data.buffer).webp({quality:80}).toBuffer()
      

      
      let img_url=  `data:image/jpg;base64,${data.buffer.toString("base64")}`
     

      
     let result=await cloudinary.v2.uploader.upload(img_url)
     console.log(result);
     
     element.data.file={
        url:result.secure_url,
        public_id:result.public_id
        
     }
       await blog_model.findByIdAndUpdate(id,{content:content},{new:true})
} catch (error) {
   console.log(error);
   
}
   
      })
      
   }   
} catch (error) {
   console.log(error);
   
}
});



 }

if (metaDescription) {
   await blog_model.findByIdAndUpdate(id,{metaDescription:metaDescription},{new:true})
}if (metaSlug) {
   await blog_model.findByIdAndUpdate(id,{Slug:metaSlug},{new:true})
}
if (metaTitle) {
   await blog_model.findByIdAndUpdate(id,{metaTitle:metaTitle},{new:true})
}
   await blog_model.findByIdAndUpdate(id,{content:content},{new:true})
  res.status(200).json({success:true,"message":"blog updated"}) 
   } catch (error) {
      console.log(error);
      
   }
// let content=JSON.parse(req.body.content)
// let {title,cetagory,subcetagory}=req.body 
// let {id}=req.params 
// console.log(content);


 
  
   } 
export let delete_blog=async (req,res)=>{
try {
   let {title,description}=req.body
   let {id}=req.params
   let get=await blog_model.findOne({_id:id})
let result= await cloudinary.v2.uploader.destroy(get.public_id)
console.log(result);

if (get.content[0]?.blocks!==null) {
   get.content[0]?.blocks.forEach(async( data)=>{ 
      
      try {
         if (data.data.file?.public_id) {
            console.log(data.data.file?.public_id);
            let delete_blog=  await cloudinary.v2.uploader.destroy(data.data.file?.public_id)
            console.log(delete_blog);
            
         }
       

    
      
      } catch (error) {
         console.log(error);
         
      }
   
   
}) 
}

 
    if(get.user.toString()!==req.user.toString()) return res.status(400).json({success:true,"message":"this is not your blog"})
      await blog_model.findByIdAndDelete({_id:id},{new:true})
      await user_model.findByIdAndUpdate(req.user,{$pull:{blogs:id}},{new:true})
    res.status(200).json({success:true,"message":"blog delete successfully"})
}
 catch (error) {
   console.log(error);
   
}
   } 
export let get_single_blog=async(req,res)=>{
let {id}=req.params
let blog_get=await blog_model.findById(id).populate({path:"comments" ,populate:{path:"user"}})
res.status(200).json({success:true,"message":"single blog get successfully",blog_get})
}
export let like=async(req,res)=>{
let{id}=req.params
console.log(id);
console.log(req.user);
let blog_find=await blog_model.findById(id)
if(blog_find.likes.includes(req.user)){
   await blog_model.findByIdAndUpdate(id,{$pull:{likes:req.user}},{new:true})
   await user_model.findByIdAndUpdate(req.user,{$pull:{likes_blog:id}},{new:true})
   res.status(200).json({success:true,"message":"dislike successfully"})
}
else{
   await blog_model.findByIdAndUpdate(id,{$push:{likes:req.user}},{new:true})
await user_model.findByIdAndUpdate(req.user,{$push:{likes_blog:id}},{new:true})
res.status(200).json({success:true,"message":"like successfully"})
}
}    
export let premium_blogs=async(req,res)=>{
let {current_page}=req.params

 
if (!current_page) {
   current_page=1
}
let perPage=2
let skip=current_page *perPage -1




let blogs= await blog_model.find().limit(2).skip(skip)
let length_find= await blog_model.find()
if(blogs.length==0){
   current_page=1
}
res.status(200).json({success:true,"message":"prmiu blogs get successfully",blogs})
}
export let draft_blog=async(req,res)=>{
   let{id}=req.params
   console.log(id);
   // console.log(req.user);
   if(!id) return res.status(401).json({success:false,"messgae":"login first"})
    let user_find=await user_model.findById(req.user)
   if(user_find.draft.includes(id)){
      await user_model.findByIdAndUpdate(req.user,{$pull:{draft:id}},{new:true})
      res.status(200).json({success:true,"message":"undraft successfully"})
      
   }
   else{
      await user_model.findByIdAndUpdate(req.user,{$push:{draft:id}},{new:true})
   res.status(200).json({success:true,"message":"draft successfully"})
   }

}
export let search=async(req,res)=>{
try {
   let {title}=req.params
   

      

   let find_blog=await blog_model.find({title:{$regex:title,$options:"i"}})
res.status(200).json({success:true,"message":"blog get",find_blog})


} catch (error) {
   console.log(error);
   
}

}

export let get_draft=async(req,res)=>{
let {id}=req.params
if(!id)return res.status(400).sjon({success:false,"message":"user not login"})
let find_draft=await user_model.findById(id).populate({path:"draft"})
   res.status(200).json({success:false,"message":"blog get successfully","find_draft":find_draft.draft})   
} 
