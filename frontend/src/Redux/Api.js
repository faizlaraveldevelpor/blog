import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { blogs_api_data, cetagory_api_data, login_user_sl_fn, single_blog_data_fnc } from './api_data_slice';

export let Api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:import.meta.env.DEV?"/api/v1/":(import.meta.env.VITE_API_BASE_URL||"https://blogapi.mfaizansari.tech/api/v1/"),credentials:"include"}),tagTypes:["user","blog","like","comment","cetagory"],keepUnusedDataFor:24*60*60*1000,
    
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                url:"resgister",
                method:"POST",
                body:data
            }),
            invalidatesTags:["user"]
        }), 
        
        login:builder.mutation({
            query:(data)=>({
                url:"login",
                method:"POST",
                body:data
            }),
            invalidatesTags:["user","blog","cetagory"]
        }),
        cetagory_create:builder.mutation({
            query:(data)=>({
             url:"create/cetagory",
             method:"POST",
             body:data
            }),
            invalidatesTags:["cetagory"]
        }),
        subcetagory_create:builder.mutation({
            query:(data)=>({
             url:"update/subcetagory",
             method:"POST",
             body:data
            }),
            invalidatesTags:["cetagory"]
        }),
        get_cetagory:builder.query({
            query:()=>({
             url:"cetagory",
             method:"GET",
             
            }),
            providesTags:["cetagory"],
            onQueryStarted:async(args,{dispatch,queryFulfilled})=>{
              try {
               (await queryFulfilled).data
                if((await queryFulfilled).data){
                   await dispatch(cetagory_api_data((await queryFulfilled).data))
                }
              } catch (error) {
                console.log(error);
                
              }
            }
        }),
        blogs:builder.query({
            query:(data)=>({
             url:`blogs/${data}`,
             method:"GET",
             
            }),
            providesTags:["blog","cetagory","comment","like","user"],
            onQueryStarted:async(args,{dispatch,queryFulfilled})=>{
              try {
                await (await queryFulfilled)
                if((await queryFulfilled).data){
                   await dispatch(blogs_api_data((await queryFulfilled).data))
                }
              } catch (error) {
                console.log(error);
                
              }
            }
        }),
    get_for_blog_premium:builder.mutation({
        query:(current_page)=>({
            
            
            url:`blogs/premium/${current_page}`,
            method:"POST",
            
        }),
        invalidatesTags:["blog"]
    }),
    show_data_from_cetagory:builder.mutation({
        query:(cetagory_name)=>({
            url:"get/blogs/cetagory",
            method:"POST",
            body:cetagory_name
        }),
        invalidatesTags:["blog"]
    }),  
    main_blog_in_blogs_page:builder.mutation({
        query:(cetagory_name)=>({
            url:"blog/main/page",
            method:"POST",
            body:cetagory_name
        }),
        invalidatesTags:["blog"]
    }),  
    create_blog:builder.mutation({    
        query:(form)=>({
            url:"create",
            method:"POST",
            body:form
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"]
    }),  
    single_blog:builder.query({    
        query:(id)=>({
            url:`/single/blog/${id}`,
            method:"GET",
            
        }),
        providesTags:["blog","cetagory","comment","like","user"],
        onQueryStarted:async(args,{dispatch,queryFulfilled})=>{
            try {
              await (await queryFulfilled)
              if((await queryFulfilled).data){
                 await dispatch(single_blog_data_fnc((await queryFulfilled).data))
              }
            } catch (error) {
              console.log(error);
              
            }
          }
    }),  
    update_blog:builder.mutation({    
        query:({id,form})=>({
            url:`/update/${id}`,
            method:"PUT",
             body:form
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"]
    }),  
    like_blog:builder.mutation({    
        query:(id)=>({
            url:`like/${id}`,
            method:"PUT",
             
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"]
    }),  
    comment:builder.mutation({    
        query:({id,comment_data})=>(
            console.log(comment_data),
            
            {
            url:`/create/comments/${id}`,
            method:"POST",
             body:comment_data
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"]
    }),  
    draft:builder.mutation({    
        query:(id)=>(   
            console.log(id),
                     
            {
            url:`/blog/draft/${id}`,
            method:"PUT",
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"]
    }),  
    
    Search:builder.query({    
        query:(data)=>(   
                     console.log(data),
                     
            {
            url:`search/${data}`,
            method:"GET",
            
        }),
        providesTags:["blog","cetagory","comment","like","user"],
        onQueryStarted:async(args,{dispatch,queryFulfilled})=>{
            try {
              await (await queryFulfilled)
              if((await queryFulfilled).data){
                 await dispatch(single_blog_data_fnc((await queryFulfilled).data))
              }
            } catch (error) {
              console.log(error);
              
            }
          }
    }),  
    
    delete_blog:builder.mutation({    
        query:(id)=>(   
                  
                     
            {
            url:`/delete/${id}`,
            method:"Delete",
            
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 


    delete_comm:builder.mutation({    
        query:({id,blog_id})=>({
            url:`/delete/comment/${id}`,
            method:"Delete",
            body:{blog_id}
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    create_cetagory:builder.mutation({    
        query:(cetagory)=>(   
                  console.log(cetagory),
                  
                     
            {
            url:`/create/cetagory`,
            method:"POST",
            body:cetagory
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    create_subcetagory:builder.mutation({    
        query:(cetagory)=>(   
                  console.log(cetagory),
                  
                     
            {
            url:`/create/subcetagory`,
            method:"POST",
            body:cetagory
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    deletecetagory:builder.mutation({    
        query:(cetagory)=>(   
                  console.log(cetagory),
                  
                     
            {
            url:`/delete/cetagory/${cetagory}`,
            method:"Delete",
            
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 

    deletesubcetagory:builder.mutation({    
        query:(cetagory)=>(   
                  console.log(cetagory),
                  
                     
            {
            url:`/delete/subcetagory/${JSON.stringify(cetagory)}`,
            method:"Delete",
            
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    AboutCreate_Api:builder.mutation({    
        query:(data)=>(   
                  
                     
            {
            url:`/About`,
            method:"Put",
            body:data
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    privacy_Api:builder.mutation({    
        query:(data)=>(   
                  
                     
            {
            url:`/privacy`,
            method:"Put",
            body:data
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    Disclamer_Api:builder.mutation({    
        query:(data)=>(   
                  
                     
            {
            url:`/Disclamer`,
            method:"Put",
            body:data
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    term_Api:builder.mutation({    
        query:(data)=>(   
                  
                     
            {
            url:`/terms`,
            method:"Put",
            body:data
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    getAbout_Api:builder.query({    
        query:(data)=>(   
                  
                     
            {
            url:`/get/About`,
            method:"GET",
            body:data
        }),
        providesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    getterm_Api:builder.query({    
        query:(data)=>(   
                  
                     
            {
            url:`/get/term`,
            method:"GET",
            body:data
        }),
        providesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    getA_Disclamer:builder.query({    
        query:(data)=>(   
                  
                     
            {
            url:`/get/Disclamer`,
            method:"GET",
            body:data
        }),
        providesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    getPrivacy_Api:builder.query({    
        query:(data)=>(   
                  
                     
            {
            url:`/get/privacy`,
            method:"GET",
            body:data
        }),
        providesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    logout_Api:builder.mutation({    
        query:(data)=>(   
                  
                     
            {
            url:`/logout`,
            method:"POST",
            body:data
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    draft_get:builder.query({    
        query:(data)=>(   
                  
                     
            {
            url:`/get_draft/${data}`,
            method:"GET",
        }),
        providesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    update_profile:builder.mutation({    
        query:(data)=>(   
                  
                     
            {
            url:`/update/profile`,
            method:"POST",
            body:data
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    sendMail:builder.mutation({    
        query:(data)=>(   
                  console.log(data),
                  
                     
            {
            url:`/forget/password/${data}`,
            method:"POST",
            
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    Check_otp:builder.mutation({    
        query:(data)=>(   
                  console.log(data),
                  
                     
            {
            url:`/check/otp/${data}`,
            method:"POST",
            
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    Create_newPss:builder.mutation({    
        query:(data)=>(   
                  console.log(data),
                  
                     
            {
            url:`/create/new/password`,
            method:"POST",
            body:data
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    Change_role:builder.mutation({    
        query:({id,role})=>(   
                  console.log(id,role),
                  
                     
            {
            url:`/user/role/${id}?role=${role}`,
            method:"PUT",
        
        }),
        invalidatesTags:["user","blog","cetagory","comment"],
       
    }), 
    All_users:builder.query({    
        query:()=>(   
                  
                  
                     
            {
            url:`/users`,
            method:"GET",
        
        }),
        providesTags:["blog","cetagory","comment","like","user"],
       
    }), 
    delete_users:builder.mutation({    
        query:(id)=>(   
                  
                  
                     
            {
            url:`/users/delete/${id}`,
            method:"DELETE",
        
        }),
        invalidatesTags:["blog","cetagory","comment","like","user"],
       
    }), 

    login_user:builder.query({    
        query:()=>(   
                  
                  
                     
            {
            url:`/login/user`,
            method:"get",
        
        }),
        providesTags:["blog","cetagory","comment","like","user"],
        onQueryStarted:async(args,{dispatch,queryFulfilled})=>{
            try {
              await (await queryFulfilled)
              console.log(await queryFulfilled);
              
              if((await queryFulfilled).data){
                 await dispatch(login_user_sl_fn((await queryFulfilled).data?.user))
              }
            } catch (error) {
              console.log(error);
              
            }
          }
    }), 
   
    })
})
export const {useRegisterMutation,useLoginMutation,useCetagory_createMutation,useGet_cetagoryQuery,useSubcetagory_createMutation,useBlogsQuery,useGet_for_blog_premiumMutation,useShow_data_from_cetagoryMutation,useMain_blog_in_blogs_pageMutation,useCreate_blogMutation,useSingle_blogQuery,useUpdate_blogMutation,useLike_blogMutation,useCommentMutation,useDraftMutation,useSearchQuery,useDelete_blogMutation,useDelete_commMutation,useCreate_cetagoryMutation,useCreate_subcetagoryMutation,useDeletecetagoryMutation,useDeletesubcetagoryMutation,useAboutCreate_ApiMutation,useGetAbout_ApiQuery,usePrivacy_ApiMutation,useGetPrivacy_ApiQuery,useDisclamer_ApiMutation,useGetA_DisclamerQuery,useTerm_ApiMutation,useGetterm_ApiQuery,useLogout_ApiMutation,useDraft_getQuery,useUpdate_profileMutation,useSendMailMutation,useCheck_otpMutation,useCreate_newPssMutation,useChange_roleMutation,useAll_usersQuery,useDelete_usersMutation,useLogin_userQuery}=Api