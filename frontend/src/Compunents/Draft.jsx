import { FaRegSave, FaSave } from "react-icons/fa";
import { useDraftMutation } from "../Redux/Api";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Draft() {
  let { id } = useParams()
  let [fnc, { data, isLoading }] = useDraftMutation()
  let user_data = useSelector((state) => state.All_moduls.login_user)

  let blog_draft = () => {
    // Check if user is logged in
    if (!user_data || (Array.isArray(user_data) && user_data.length === 0) || (!user_data._id && !user_data.id)) {
      return toast.error("Please login first")
    }

    fnc(id)
  }

  useEffect(() => {
    if (data) {
      if (data.success) {
        toast.success(data.message || "Saved to drafts")
      } else if (data.success === false) {
        toast.error(data.message || "Failed to save")
      }
    }
  }, [data])

  return (
    <button 
      onClick={blog_draft}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-brand-primary disabled:opacity-50"
    >
      {isLoading ? (
        <FaSave className="text-xl animate-pulse text-brand-accent" />
      ) : (
        <FaRegSave className="text-xl" />
      )}
    </button>
  )
}

export default Draft
