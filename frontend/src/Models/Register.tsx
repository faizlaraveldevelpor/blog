import { useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi"
import { RiLockPasswordLine } from "react-icons/ri"
import { IoCloudUploadOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { register_toggle } from "../Redux/ALL_moduls._Slice"
import { useRegisterMutation } from "../Redux/Api"
import FormField from "../Compunents/FormField"
import { toast } from 'react-toastify'

function RegisterCard({ children, onClose }) {
  return (
    <div className="p-6 sm:p-8">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-slate-800">Create Account</h2>
        <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
          <IoMdClose className="text-2xl" />
        </button>
      </div>
      {children}
    </div>
  )
}

function Register() {
  let toast_ref = useRef()
  let disptach = useDispatch()
  let [step, setstep] = useState(1)
  let image_ref = useRef()

  let [signupdata, setsignupdata] = useState({
    email: "", name: "", password: "", avtar: ""
  })

  let [register_api_fnc, { data: api_data, isLoading }] = useRegisterMutation()

  let handle_auth = async () => {
    if (signupdata.password == "") return
    const form = new FormData()
    form.append("email", signupdata.email)
    form.append("password", signupdata.password)
    form.append("name", signupdata.name)
    form.append("avtar", signupdata.avtar)
    await register_api_fnc(form)
  }

  useEffect(() => {
    if (isLoading) toast_ref.current = toast.loading("Creating account...")
    if (!isLoading) toast.dismiss(toast_ref.current)
    if (api_data) {
      if (api_data.success == false) toast.error(api_data.message)
      if (api_data.success == true) toast.success(api_data.message)
      if (api_data.success) {
        disptach(register_toggle(false))
        setsignupdata({ email: "", name: "", password: "", avtar: "" })
        setstep(1)
      }
    }
  }, [api_data, isLoading])

  const closeDialog = () => disptach(register_toggle(false))

  if (step == 1) {
    return (
      <RegisterCard onClose={closeDialog}>
        <div className="space-y-4">
          <FormField label="Name" type="text" value={signupdata.name} onChange={(e) => setsignupdata(p => ({ ...p, name: e.target.value }))} placeholder="Enter your name" icon={HiOutlineUser} />
          <FormField label="Email" type="email" value={signupdata.email} onChange={(e) => setsignupdata(p => ({ ...p, email: e.target.value }))} placeholder="Enter your email" icon={HiOutlineMail} />
          <button type="button" className={`w-full mt-6 h-12 rounded-xl font-semibold transition-colors flex items-center justify-center ${signupdata.name && signupdata.email ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`} onClick={() => (signupdata.name && signupdata.email) && setstep(2)} disabled={!signupdata.name || !signupdata.email}>Continue</button>
        </div>
      </RegisterCard>
    )
  }

  return (
    <RegisterCard onClose={closeDialog}>
      <div className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex-1"><FormField label="Name" value={signupdata.name} readOnly icon={HiOutlineUser} /></div>
          <button onClick={() => setstep(1)} className="h-12 px-3 text-sm font-medium text-teal-600 hover:text-teal-700 whitespace-nowrap">Edit</button>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1"><FormField label="Email" type="email" value={signupdata.email} readOnly icon={HiOutlineMail} /></div>
          <button onClick={() => setstep(1)} className="h-12 px-3 text-sm font-medium text-teal-600 hover:text-teal-700 whitespace-nowrap">Edit</button>
        </div>
        <FormField label="Password" type="password" value={signupdata.password} onChange={(e) => setsignupdata(p => ({ ...p, password: e.target.value }))} placeholder="Create a password" icon={RiLockPasswordLine} />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Profile Photo</label>
          <input type="file" className="hidden" ref={image_ref} accept="image/*" onChange={(e) => setsignupdata(p => ({ ...p, avtar: e.target.files[0] }))} />
          <button type="button" onClick={() => image_ref.current?.click()} className="w-full h-24 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-teal-500 hover:bg-teal-50/50 transition-colors group">
            {signupdata.avtar ? (
              <img src={URL.createObjectURL(signupdata.avtar)} alt="" className="w-14 h-14 rounded-full object-cover" />
            ) : (
              <>
                <IoCloudUploadOutline className="text-3xl text-slate-400 group-hover:text-teal-500" />
                <span className="text-sm text-slate-500 group-hover:text-teal-600">Click to upload photo</span>
              </>
            )}
          </button>
        </div>

        <button type="button" className={`w-full mt-6 h-12 rounded-xl font-semibold transition-colors flex items-center justify-center ${signupdata.password ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`} onClick={handle_auth} disabled={!signupdata.password}>Create Account</button>
      </div>
    </RegisterCard>
  )
}

export default Register
