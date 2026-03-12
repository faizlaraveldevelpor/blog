import { useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordLine } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { Auth_moduls_fnc, login_user_data } from "../Redux/ALL_moduls._Slice"
import { useCheck_otpMutation, useLoginMutation, useSendMailMutation } from "../Redux/Api"
import Create_new_password from "../Compunents/Create_new_password"
import FormField from "../Compunents/FormField"
import { toast } from 'react-toastify'

function Login() {
  let disptach = useDispatch()
  let [check_otp_fnc, { data: check_otp_data }] = useCheck_otpMutation()
  let mail_ref = useRef()
  let [otp, setotp] = useState()
  let [reset_passwordToggle, setreset_passwordToggle] = useState(null)
  let [send_mail_fnc, { data }] = useSendMailMutation()
  let [login, setlogin] = useState(1)
  let [forget_password, setforget_password] = useState(false)
  let [backup_email, setbackup_email] = useState(mail_ref.current?.value)

  let [login_data, setlogindata] = useState({ email: "", password: '' })
  let [login_api_fnc, login_api_data] = useLoginMutation()

  let send_mail = () => send_mail_fnc(mail_ref.current.value)
  let handle_auth = async () => login_api_fnc(login_data)

  useEffect(() => {
    if (check_otp_data?.success == true) setreset_passwordToggle(3)
  }, [check_otp_data])

  useEffect(() => {
    if (data?.message == "opt send successfully") {
      setbackup_email(mail_ref.current?.value)
      setreset_passwordToggle(2)
      toast.success(data?.message)
    }
  }, [data])

  useEffect(() => {
    if (login_api_data.error) {
      const err = login_api_data.error
      const msg = err?.data?.message || err?.data?.error || (err?.status === "FETCH_ERROR" ? "Network error - backend check karein (port 3000)" : "Login fail")
      toast.error(msg)
      return
    }
    if (login_api_data.data) {
      if (login_api_data.data.success == false) toast.error(login_api_data.data.message)
      if (login_api_data.data.success == true) toast.success(login_api_data.data.message)
      if (login_api_data.data.success) {
        disptach(Auth_moduls_fnc(false))
        setlogindata({ email: "", name: "", password: "" })
        setlogin(1)
        setreset_passwordToggle(1)
        disptach(login_user_data(login_api_data.data?.user_data))
      }
    }
  }, [login_api_data.data, login_api_data.error])

  if (reset_passwordToggle == 3) {
    return <Create_new_password mail={backup_email} logintoggle={setlogin} />
  }

  if (forget_password) {
    return (
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-slate-800">Forgot Password</h2>
          <button onClick={() => disptach(Auth_moduls_fnc(false))} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
            <IoMdClose className="text-2xl" />
          </button>
        </div>
        {reset_passwordToggle == 2 ? (
          <>
            <FormField label="Enter OTP" type="number" value={otp} onChange={(e) => setotp(e.target.value)} placeholder="Enter OTP" icon={RiLockPasswordLine} />
            <button className="w-full mt-6 h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors" onClick={() => { check_otp_fnc(otp); setotp("") }}>Verify OTP</button>
          </>
        ) : (
          <>
            <FormField ref={mail_ref} label="Email" type="email" value={backup_email || ""} onChange={(e) => setbackup_email(e.target.value)} placeholder="Enter your email" icon={HiOutlineMail} />
            <button className="w-full mt-6 h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors" onClick={send_mail}>Send OTP</button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-slate-800">Sign In</h2>
        <button onClick={() => disptach(Auth_moduls_fnc(false))} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
          <IoMdClose className="text-2xl" />
        </button>
      </div>

      {login == 1 ? (
        <>
          <FormField label="Email" type="email" value={login_data.email} onChange={(e) => setlogindata(p => ({ ...p, email: e.target.value }))} placeholder="Enter your email" icon={HiOutlineMail} />
          <button className={`w-full mt-6 h-12 rounded-xl font-semibold transition-colors flex items-center justify-center ${login_data.email ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`} onClick={() => login_data.email && setlogin(2)} disabled={!login_data.email}>Continue</button>
        </>
      ) : (
        <>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <FormField label="Email" type="email" value={login_data.email} readOnly icon={HiOutlineMail} />
            </div>
            <button onClick={() => setlogin(1)} className="h-12 px-3 text-sm font-medium text-teal-600 hover:text-teal-700 whitespace-nowrap">Edit</button>
          </div>
          <FormField label="Password" type="password" value={login_data.password} onChange={(e) => setlogindata(p => ({ ...p, password: e.target.value }))} placeholder="Enter password" icon={RiLockPasswordLine} />
          <button className="text-sm text-teal-600 hover:text-teal-700 font-medium mt-1" onClick={() => setforget_password(true)}>Forgot password?</button>
          <button className="w-full mt-6 h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors" onClick={handle_auth}>Sign In</button>
        </>
      )}
    </div>
  )
}

export default Login
