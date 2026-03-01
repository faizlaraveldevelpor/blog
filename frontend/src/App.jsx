import {Route, Routes} from 'react-router-dom'
import { lazy } from 'react'

const Single_Blog_page=lazy(()=>import('./Pages/Single_Blog_page'))
const Create_blog=lazy(()=>import('./Pages/Admin_pages/Create_blog'))
const All_blogs=lazy(()=>import('./Pages/All_blogs'))
const Update_blog=lazy(()=>import('./Pages/Admin_pages/Update_blog'))
const Private=lazy(()=>import('./Pages/Admin_pages/Private'))
const Admin_Home_page =lazy(()=>import('./Pages/Admin_pages/Admin_Home_page'))
const All_blogs_Admin=lazy(()=>import('./Compunents/Admin/All_blogs'))
const All_cetagories=lazy(()=>import('./Compunents/Admin/All_cetagories'))
const Create_cetagory=lazy(()=>import('./Compunents/Admin/Create_cetagory'))
const Delete=lazy(()=>import('./Compunents/Admin/Delete'))
const Delete_Cetagory=lazy(()=>import('./Compunents/Delete_Cetagory'))
const All_comments=lazy(()=>import('./Compunents/Admin/All_comments'))
const Layout=lazy(()=>import('./Pages/ALL_models'))
const About=lazy(()=>import('./Pages/About'))
const CreateAbout=lazy(()=>import('./Pages/Admin_pages/About'))
const Privacy=lazy(()=>import('./Pages/Privacy_policy'))
const PrivacyAdmin=lazy(()=>import('./Pages/Admin_pages/Privacy'))
const Create_Disclamer=lazy(()=>import('./Pages/Admin_pages/Create_Disclamer'))
const Disclamer=lazy(()=>import('./Pages/Disclamer'))
const Termcontions=lazy(()=>import('./Pages/Admin_pages/Term&contions'))
const Term=lazy(()=>import('./Pages/Term'))
const Search=lazy(()=>import('./Pages/Search'))
const User_private_routes=lazy(()=>import('./Pages/User_private_routes'))
const Show_draft=lazy(()=>import('./Pages/Show_draft'))
const Blogs=lazy(()=>import('./Pages/Blogs'))
const All_users=lazy(()=>import("./Pages/Admin_pages/All_users"))
const User_profile_page=lazy(()=>import('./Pages/User_profile_page'))





function App() {
  return (
    <div className='min-h-screen bg-brand-surface'>
      
       
      <div className=' '>
     
      </div>
      <Routes>
        {/* /update/blog/:id - specific route taaki edit page open ho, Layout ke * mein na phanse */}
        <Route path='update/blog/:id' element={<Private/>}>
          <Route index element={<Update_blog/>}/>
        </Route>

        {/* Pehle Layout - taaki "/" par home (Blogs) open ho, admin nahi */}
        <Route path='/' element={<Layout/>}>
          <Route index element={<Blogs/>}/>
          <Route path='single/blog/:id/:slug' element={<Single_Blog_page/>}/>
          <Route path='search' element={<Search/>}/>
          <Route path='blogs/:id' element={<All_blogs/>}/>
          <Route path='blogs/subcetagory/:id' element={<All_blogs/>}/>
          <Route path='About' element={<About/>}/>
          <Route path='privacy' element={<Privacy/>}/>
          <Route path='Disclamer' element={<Disclamer/>}/>
          <Route path='term' element={<Term/>}/>
          <Route path='/' element={<User_private_routes/>}>
            <Route path='User/profile' element={<User_profile_page/>}/>
            <Route path='draft' element={<Show_draft/>}/>
            <Route path='change' element={<h1>Allah</h1>}/>
          </Route>
          <Route path='*' element={<div className="min-h-[60vh] flex items-center justify-center px-4"><div className="text-center"><h1 className="text-4xl font-bold text-brand-primary">404</h1><p className="mt-2 text-brand-muted">Page not found</p></div></div>}/>
        </Route>

        {/* Admin (baaki routes) - /admin, /create/blog, etc. */}
        <Route path='/' element={<Private/>}>
          <Route path='admin' element={<Admin_Home_page/>}/>
          <Route path='create/blog' element={<Create_blog/>}/>
          <Route path='All_blogs/admin' element={<All_blogs_Admin/>}/>
          <Route path='all_cetagories/admin' element={<All_cetagories/>}/>
          <Route path='delete/blog' element={<Delete/>}/>
          <Route path='create/cetagory' element={<Create_cetagory/>}/>
          <Route path='delete/cetagory' element={<Delete_Cetagory/>}/>
          <Route path='all/comments' element={<All_comments/>}/>
          <Route path='create/About' element={<CreateAbout/>}/>
          <Route path='create/privacy' element={<PrivacyAdmin/>}/>
          <Route path='create/disclamer' element={<Create_Disclamer/>}/>
          <Route path='create/term' element={<Termcontions/>}/>
          <Route path='users' element={<All_users/>}/>
          <Route path='*' element={<h1>PAGE NOT FOUND</h1>}/>
        </Route>
      </Routes>
      
    </div>
  )
}

export default App