import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useLike_blogMutation } from "../Redux/Api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'

function Like_Blog({ data }) {
  let user_data = useSelector((state) => state.All_moduls.login_user)
  let { id } = useParams()
  let [fnc] = useLike_blogMutation()

  let like_functionality = () => {
    // Check if user is logged in
    if (!user_data || (Array.isArray(user_data) && user_data.length === 0) || (!user_data._id && !user_data.id)) {
      return toast.error("Please login first")
    }

    fnc(id)
  }

  // Check if current user has liked the blog
  let isLiked = false
  if (data?.blog_get?.likes && user_data) {
    const userId = user_data._id || user_data.id
    isLiked = data.blog_get.likes.some(likeId => likeId === userId || likeId.toString() === userId?.toString())
  }

  return (
    <button 
      onClick={like_functionality}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-brand-primary"
    >
      {isLiked ? (
        <AiFillLike className="text-xl text-brand-accent" />
      ) : (
        <AiOutlineLike className="text-xl" />
      )}
      <span className="text-sm font-semibold">
        {data?.blog_get?.likes?.length || 0}
      </span>
    </button>
  )
}

export default Like_Blog
