import { useDispatch, useSelector } from "react-redux"
import { user_profile } from "../Redux/ALL_moduls._Slice"
import { useLogout_ApiMutation } from "../Redux/Api"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { HiOutlineUser, HiOutlineDocumentText, HiOutlineLogout } from "react-icons/hi"

function User_profile() {
  let [fnc] = useLogout_ApiMutation()
  let dispatch = useDispatch()
  let user = useSelector((state) => state.Api_data_slice.login_user)

  const handleLogout = () => {
    fnc()
    dispatch(user_profile())
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
  }

  const NavItem = ({ to, icon: Icon, children, onClick }) => {
    const className = "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-teal-600 transition-colors cursor-pointer"
    const content = (
      <>
        <Icon className="text-xl text-slate-500" />
        <span className="font-medium">{children}</span>
      </>
    )
    if (to) return <Link to={to} className={className} onClick={onClick}>{content}</Link>
    return <button className={`w-full text-left ${className}`} onClick={onClick}>{content}</button>
  }

  return (
    <div className="w-full h-full bg-white py-6 px-4">
      <div className="flex flex-col items-center pb-6 border-b border-slate-200">
        {user?.image && <img src={user.image} alt="" className="w-20 h-20 rounded-full object-cover ring-2 ring-teal-100" />}
        <h3 className="mt-3 font-semibold text-slate-800">{user?.name || "User"}</h3>
        <p className="text-sm text-slate-500 truncate max-w-full px-2">{user?.email}</p>
      </div>
      <nav className="flex flex-col gap-1 mt-6">
        <NavItem to="/User/profile" icon={HiOutlineUser} onClick={() => dispatch(user_profile())}>Profile</NavItem>
        <NavItem to="/draft" icon={HiOutlineDocumentText} onClick={() => dispatch(user_profile())}>Drafts</NavItem>
        <NavItem icon={HiOutlineLogout} onClick={handleLogout}>Logout</NavItem>
      </nav>
    </div>
  )
}

export default User_profile