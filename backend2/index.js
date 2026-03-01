 import express from "express"
import {connect_DB}  from"./Config/DB.js"
import cookie_parser from"cookie-parser"
import cors from"cors"
import dotenv from"dotenv"
import {User_routes } from"./Routes/UserRoutes.js"
import blog_routes  from"./Routes/BlogRoutes.js"
import Cetagory_routes from './Routes/cetagory_routes.js'
import {Basicpages_routes}  from "./Routes/Basic_pagesRoutes.js"
import cluster from 'node:cluster'
import os from 'os'

dotenv.config({path:"./Config/SC.env"})

let app=express()
app.use(cors({
    origin:true,
    credentials:true
})) 
app.use(cookie_parser())
app.use(express.json({ limit: "10mb" })) 
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use('/api/v1',User_routes)
     app.use("/api/v1",blog_routes)
 app.use("/api/v1",Cetagory_routes)
 app.use("/api/v1",Basicpages_routes)

// Global error handler - connection reset se bachne ke liye
app.use((err, req, res, next) => {
  console.error("Server error:", err)
  if (!res.headersSent) {
    res.status(500).json({ success: false, message: err?.message || "Server error" })
  }
})

 let cpu=os.cpus().length
 const useCluster = process.env.NODE_ENV === "production"

 
if (useCluster && cluster.isPrimary) {
    for (let i = 0; i < cpu; i++) {
        cluster.fork()
    }
} else {
    app.listen(3000,()=>{
        console.log("server chall gaya hai");
        connect_DB()
    })     
}

  

  