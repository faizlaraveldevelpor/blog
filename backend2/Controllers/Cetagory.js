import {cetagory_model} from "../Modules/Cetagory.js"

export let create_cetagory=async(req,res)=>{
let {cetagory}=req.body
console.log(req.body); 

if(!cetagory)return res.status(200).json({success:false,"message":"enter your cetagory"})
  let find=  await cetagory_model.findOne({cetagory:cetagory})
if (find) {
    return res.status(400).json({success:false,"message":"this cetagory is already exist "})
}
    let create_cetagory=await cetagory_model.create({
cetagory:cetagory})
res.status(200).json({success:true,"message":"cetagory created successfully"})
}
export let get_cetagory=async(req,res)=>{
    let getCetagory=await cetagory_model.find().populate({path:"blogs"})
    res.status(200).json({success:true,"message":"cetagory get successfully",getCetagory})
}
export let delete_cetagory=async(req,res)=>{
let {cetagory}=req.params

if(!cetagory)return res.status(400).json({success:true,"message":"enter your cetagory"})
await cetagory_model.deleteOne({cetagory:cetagory})
res.status(200).json({success:true,"message":"cetagory deleted successfully"})
}
export let delete_subcetagory=async(req,res)=>{
     let {cetagory,subcetagory}=req.params
   let data=JSON.parse(cetagory)   
   console.log(data);
   
   
    //  console.log(subetagory[1]);
    
    if(!cetagory)return res.status(400).json({success:true,"message":"enter your cetagory"})
    await cetagory_model.findOneAndUpdate({cetagory:data.cetagory},{$pull:{subCetagory:data.subCetagory}},{new:true})
    res.status(200).json({success:true,"message":"cetagory deleted successfully"})
    }
export let update_cetagory=async(req,res)=>{
let {cetagory}=req.body
if(!cetagory)return res.status(400).json({success:true,"message":"enter your cetagory"})
await cetagory_model.findOneAndUpdate({cetagory:cetagory},{cetagory:cetagory},{new:true})
res.status(200).json({success:true,"message":"cetagory updated successfully"})
}
export let update_subcetagory=async(req,res)=>{
    let {subCetagory}=req.body
    if(!subCetagory)return res.status(400).json({success:true,"message":"enter your cetagory"})
    await cetagory_model.findOneAndUpdate({cetagory:cetagory},{subCetagory:subCetagory},{new:true})
    res.status(200).json({success:true,"message":"subcetagory updated successfully"})
    }
    export let create_subcetagory=async(req,res)=>{
        let {subCetagory,cetagory}=req.body
    
        
        if(!subCetagory)return res.status(400).json({success:true,"message":"enter your subcetagory"})
        if(!cetagory)return res.status(400).json({success:true,"message":"enter your cetagory"})
let find=await cetagory_model.findOne({cetagory:cetagory})
       let data= await cetagory_model.findOneAndUpdate({cetagory:find.cetagory},{$push:{subCetagory:subCetagory}},{new:true})
    
        res.status(200).json({success:true,"message":"subcetagory creatd successfully"})
        }
   export let one_cetagory_get=async(req,res)=>{
let {cetagory}=req.body
console.log(cetagory);

if(!cetagory)return res.status(400).json({success:false,"messsage":"enter your cetagory"})
let find_data=await cetagory_model.find({cetagory:cetagory})

 res.status(200).json({success:true,"message":"single comment get successfully",find_data})
   }
   export let get_data_from_cetagory=async(req,res)=>{
    let {cetagory_name}=req.body
    if(!cetagory_name){
       cetagory_name=[
          "fashion","sports"
       ]
    }
    console.log(cetagory_name);
    
    let fin_data=await cetagory_model.find().populate({path:"blogs"})
    console.log(fin_data);
    
    res.status(200).json({
       success:true,"message":"get data",fin_data
    }) 
    
    
    }

