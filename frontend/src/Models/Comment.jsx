import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { comment_fnc } from "../Redux/ALL_moduls._Slice";
import { useCommentMutation, useDelete_commMutation } from "../Redux/Api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Comment() {
  let local_storage_data = JSON.parse(localStorage.getItem("user")) || {};
  let [comment_del] = useDelete_commMutation();
  let disptach = useDispatch();
  let single_blog_data = useSelector((state) => state.Api_data_slice.single_blog_data);
  let [comment_data, setcomment_data] = useState({ text: "" });
  let { id } = useParams();
  let [fnc] = useCommentMutation();

  let create_comment = () => {
    if (local_storage_data && (Array.isArray(local_storage_data) ? local_storage_data.length === 0 : !local_storage_data._id && !local_storage_data.id)) {
      toast.error("Please login first");
      return;
    }
    fnc({ id, comment_data });
    setcomment_data({ text: "" });
  };

  let delete_comment = (cid, blog_id) => {
    comment_del({ id: cid, blog_id });
  };

  let currentUserId = local_storage_data?._id || local_storage_data?.id;
  const comments = single_blog_data?.blog_get?.comments || [];

  return (
    <div className="w-full min-h-0 flex flex-col">
      {/* Handle bar */}
      <div className="flex-shrink-0 flex justify-center pt-2 pb-1">
        <div className="w-10 h-1 rounded-full bg-slate-200" aria-hidden="true" />
      </div>

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 pb-4 border-b border-slate-200">
        <h2 className="text-lg sm:text-xl font-bold text-brand-primary">Comments</h2>
        <button
          onClick={() => disptach(comment_fnc(false))}
          className="p-2 -m-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-brand-primary transition-colors touch-manipulation"
          aria-label="Close comments"
        >
          <IoClose className="text-2xl sm:text-[28px]" />
        </button>
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 bg-brand-surface">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <input
            type="text"
            className="flex-1 min-w-0 h-11 sm:h-12 px-4 rounded-xl border border-slate-200 bg-white text-base sm:text-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-shadow"
            placeholder="Write a comment..."
            value={comment_data?.text ?? ""}
            onChange={(e) => setcomment_data({ text: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && create_comment()}
          />
          <button
            onClick={create_comment}
            className="h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-brand-accent text-white font-semibold text-sm sm:text-base hover:bg-brand-accent-hover transition-colors whitespace-nowrap touch-manipulation"
          >
            Post
          </button>
        </div>
      </div>

      {/* Comments list */}
      <div className="flex-1 min-h-0 overflow-y-auto cusSc px-4 sm:px-6 py-4">
        {comments.length === 0 ? (
          <p className="text-center text-brand-muted py-8 text-sm sm:text-base">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((data) => (
              <div
                key={data._id}
                className="flex gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-soft"
              >
                <img
                  src={data?.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (data?.user?.name || "user")}
                  alt=""
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-brand-primary text-sm sm:text-base">
                      {data?.user?.name || "Anonymous"}
                    </span>
                    {data?.user?._id === currentUserId && (
                      <button
                        onClick={() => delete_comment(data._id, data.blog)}
                        className="text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base mt-1 break-words">{data?.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
