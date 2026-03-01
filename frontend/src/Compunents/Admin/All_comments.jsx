import { useBlogsQuery, useDelete_commMutation } from "../../Redux/Api";
import { toast } from 'react-toastify'
import { useEffect, useState } from "react";
import { HiChatBubbleLeftRight, HiTrash, HiMagnifyingGlass, HiDocumentText } from "react-icons/hi2";
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import Button from "../../Components/shared/Button";
import Avatar from "../../Components/shared/Avatar";
import EmptyState from "../../Components/shared/EmptyState";
import Badge from "../../Components/shared/Badge";

function All_comments() {
  let { data } = useBlogsQuery()
  let [fnc, { data: delete_comment_data, isLoading }] = useDelete_commMutation()
  let [searchTerm, setSearchTerm] = useState("")
  let [deletingCommentId, setDeletingCommentId] = useState(null)

  // Get all comments with their associated blog data
  let allComments = []
  if (data?.get_blog) {
    data.get_blog.forEach((blog) => {
      if (blog.comments && blog.comments.length > 0) {
        blog.comments.forEach((comment) => {
          allComments.push({
            ...comment,
            blogTitle: blog.title,
            blogId: blog._id,
            blogImage: blog.image
          })
        })
      }
    })
  }

  // Filter comments by search term
  let filteredComments = allComments.filter((comment) => {
    let searchLower = searchTerm.toLowerCase()
    return (
      comment.text?.toLowerCase().includes(searchLower) ||
      comment.user?.name?.toLowerCase().includes(searchLower) ||
      comment.blogTitle?.toLowerCase().includes(searchLower)
    )
  })

  // Sort by newest first
  filteredComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  let handleDelete = (commentId, blogId) => {
    setDeletingCommentId(commentId)
    fnc({ id: commentId, blog_id: blogId })
  }

  useEffect(() => {
    if (delete_comment_data) {
      setDeletingCommentId(null)
      if (delete_comment_data.success == false) {
        toast.error(delete_comment_data.message)
      }
      if (delete_comment_data.success == true) {
        toast.success(delete_comment_data.message)
      }
    }
  }, [delete_comment_data])

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-2 flex items-center gap-3">
          <HiChatBubbleLeftRight className="text-brand-accent" />
          All Comments
        </h1>
        <p className="text-brand-muted text-sm">
          Manage and moderate all comments across your blog
        </p>
      </div>

      {/* Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-6 bg-gradient-to-br from-brand-accent/10 to-teal-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-muted mb-1">Total Comments</p>
              <p className="text-3xl font-bold text-brand-primary">{allComments.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
              <HiChatBubbleLeftRight className="text-2xl text-brand-accent" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 card p-6">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-brand-muted" />
            <input
              type="text"
              className="input pl-12"
              placeholder="Search comments by text, author, or blog title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="card p-6">
        {filteredComments.length > 0 ? (
          <div className="space-y-4">
            {filteredComments.map((comment, idx) => (
              <div
                key={comment._id || idx}
                className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar
                    src={comment.user?.image}
                    alt={comment.user?.name}
                    size="md"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* User Info & Meta */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-brand-primary mb-1">
                          {comment.user?.name || "Anonymous User"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                          {comment.createdAt && (
                            <span>
                              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </span>
                          )}
                          <span>•</span>
                          <Link
                            to={`/single/blog/${comment.blogId}`}
                            className="hover:text-brand-accent transition-colors flex items-center gap-1"
                          >
                            <HiDocumentText />
                            <span className="truncate max-w-xs">{comment.blogTitle}</span>
                          </Link>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleDelete(comment._id, comment.blogId)}
                        variant="danger"
                        size="sm"
                        loading={isLoading && deletingCommentId === comment._id}
                        className="flex items-center gap-1 flex-shrink-0"
                      >
                        <HiTrash /> Delete
                      </Button>
                    </div>

                    {/* Comment Text */}
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <p className="text-sm text-brand-primary whitespace-pre-wrap break-words">
                        {comment.text}
                      </p>
                    </div>

                    {/* Blog Preview (if image exists) */}
                    {comment.blogImage && (
                      <Link
                        to={`/single/blog/${comment.blogId}`}
                        className="mt-3 flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <img
                          src={comment.blogImage}
                          alt={comment.blogTitle}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <Badge variant="default" className="text-xs mb-1">
                            Related Post
                          </Badge>
                          <p className="text-sm font-medium text-brand-primary truncate">
                            {comment.blogTitle}
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title={searchTerm ? "No Comments Found" : "No Comments Yet"}
            description={
              searchTerm
                ? "Try adjusting your search terms"
                : "Comments from readers will appear here"
            }
            icon={HiChatBubbleLeftRight}
          />
        )}
      </div>

      {/* Footer Info */}
      {filteredComments.length > 0 && (
        <div className="mt-6 text-center text-sm text-brand-muted">
          Showing {filteredComments.length} of {allComments.length} total comments
        </div>
      )}
    </div>
  )
}

export default All_comments
