import { Outlet } from "react-router-dom"
let user_login_data_local_storage=JSON.parse(localStorage.getItem("user"))||[]
function User_private_routes() {
  if (user_login_data_local_storage?.length!==0) {
    return (
    
      <div>
  <Outlet/>
      </div>
    )
  }else{
return(
  <>
  <div className="flex justify-center mt-48 font-bold text-[40px] h-screen">
<span>Not found</span>
  </div>
  
  </>
)
  }

}

export default User_private_routes