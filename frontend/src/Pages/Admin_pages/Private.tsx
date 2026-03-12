import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/Admin/Sidebar'
import { useSelector } from 'react-redux'

function Private() {
  let [hover, sethover] = useState(false)
  let user_data = useSelector((state) => state.All_moduls.login_user)
  
  if (user_data) {
    if (user_data.role == 'admin') {
      return (
        <div className='min-h-screen bg-brand-surface'>
          <Sidebar hover={hover} sethover={sethover} />
          <div className={`transition-all duration-300 ${hover ? "ml-64" : "ml-20"}`}>
            <Outlet />
          </div>
        </div>
      )
    } else {
      return (
        <div className='flex items-center justify-center min-h-screen bg-brand-surface'>
          <div className='text-center'>
            <h1 className='text-6xl font-bold text-brand-primary mb-4'>404</h1>
            <p className='text-xl text-brand-muted'>Access Denied</p>
          </div>
        </div>
      )
    }
  }
}

export default Private