import { useBlogsQuery, useDelete_blogMutation } from "../../Redux/Api";
import { toast } from 'react-toastify'
import { useEffect, useState } from "react";
import { HiTrash, HiExclamationTriangle, HiMagnifyingGlass, HiEye } from "react-icons/hi2";
import { BiSolidLike } from "react-icons/bi";
import { TiMessage } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Button from "../../Components/shared/Button";
import EmptyState from "../../Components/shared/EmptyState";
import Badge from "../../Components/shared/Badge";

function Delete() {
  let { data } = useBlogsQuery()
  let [fnc, { data: dele_blog_data, isLoading }] = useDelete_blogMutation()
  let [searchTerm, setSearchTerm] = useState("")
  let [confirmDelete, setConfirmDelete] = useState(null)
  let [deletingBlogId, setDeletingBlogId] = useState(null)

  let delete_blog = (id) => {
    setDeletingBlogId(id)
    fnc(id)
    setConfirmDelete(null)
  }

  // Filter blogs by search term
  let filteredBlogs = data?.get_blog?.filter((blog) => {
    let searchLower = searchTerm.toLowerCase()
    return (
      blog.title?.toLowerCase().includes(searchLower) ||
      blog.cetagory?.toLowerCase().includes(searchLower) ||
      blog.user?.name?.toLowerCase().includes(searchLower)
    )
  }) || []

  useEffect(() => {
    if (dele_blog_data) {
      setDeletingBlogId(null)
      if (dele_blog_data.success == false) {
        toast.error(dele_blog_data.message)
      }
      if (dele_blog_data.success == true) {
        toast.success(dele_blog_data.message)
      }
    }
  }, [dele_blog_data])

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-2 flex items-center gap-3">
          <HiTrash className="text-red-500" />
          Delete Blogs
        </h1>
        <p className="text-brand-muted text-sm">
          Permanently remove blog posts from your website
        </p>
      </div>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scaleIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <HiExclamationTriangle className="text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary">Confirm Deletion</h3>
                <p className="text-sm text-brand-muted">This action cannot be undone</p>
              </div>
            </div>

            {/* Blog Preview */}
            <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex gap-3">
                <img
                  src={confirmDelete.image}
                  alt={confirmDelete.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-brand-primary mb-1 line-clamp-2">
                    {confirmDelete.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-brand-muted">
                    <span className="flex items-center gap-1">
                      <BiSolidLike /> {confirmDelete.likes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <TiMessage /> {confirmDelete.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                Are you sure you want to delete this blog post? This will permanently remove:
              </p>
              <ul className="text-xs text-red-700 mt-2 space-y-1 ml-4">
                <li>• The blog post content</li>
                <li>• All associated comments ({confirmDelete.comments?.length || 0})</li>
                <li>• All likes and interactions ({confirmDelete.likes?.length || 0})</li>
                <li>• All uploaded images</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setConfirmDelete(null)}
                variant="outline"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                onClick={() => delete_blog(confirmDelete._id)}
                variant="danger"
                fullWidth
                loading={isLoading && deletingBlogId === confirmDelete._id}
                className="flex items-center justify-center gap-2"
              >
                <HiTrash /> Delete Permanently
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-6 bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 mb-1">Total Blogs</p>
              <p className="text-3xl font-bold text-red-600">{data?.get_blog?.length || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center">
              <HiTrash className="text-2xl text-red-600" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 card p-6">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-brand-muted" />
            <input
              type="text"
              className="input pl-12"
              placeholder="Search blogs by title, category, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Blogs List */}
      <div className="card p-6">
        {filteredBlogs.length > 0 ? (
          <div className="space-y-4">
            {filteredBlogs.map((blog, idx) => (
              <div
                key={blog._id || idx}
                className="group p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-brand-primary mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
                          {blog.title}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-brand-muted mb-2">
                          {blog.cetagory && (
                            <Badge variant="default" className="text-xs">
                              {blog.cetagory}
                            </Badge>
                          )}
                          <span className="flex items-center gap-1">
                            <BiSolidLike className="text-brand-accent" />
                            {blog.likes?.length || 0} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <TiMessage className="text-brand-accent" />
                            {blog.comments?.length || 0} comments
                          </span>
                          {blog.user?.name && (
                            <>
                              <span>•</span>
                              <span>by {blog.user.name}</span>
                            </>
                          )}
                        </div>

                        {/* Date */}
                        {blog.createdAt && (
                          <p className="text-xs text-brand-muted">
                            Created {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Link to={`/single/blog/${blog._id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <HiEye /> View
                          </Button>
                        </Link>
                        <Button
                          onClick={() => setConfirmDelete(blog)}
                          variant="danger"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <HiTrash /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title={searchTerm ? "No Blogs Found" : "No Blogs Yet"}
            description={
              searchTerm
                ? "Try adjusting your search terms"
                : "Create your first blog post to get started"
            }
            icon={HiTrash}
          />
        )}
      </div>

      {/* Footer Info */}
      {filteredBlogs.length > 0 && (
        <div className="mt-6 text-center text-sm text-brand-muted">
          Showing {filteredBlogs.length} of {data?.get_blog?.length || 0} total blogs
        </div>
      )}

      {/* Warning Notice */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-4xl">
        <div className="flex gap-3">
          <HiExclamationTriangle className="text-xl text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-900 mb-1">⚠️ Important Warning</h3>
            <p className="text-xs text-amber-800">
              Deleting a blog post is permanent and cannot be undone. All associated data including comments, 
              likes, and images will be permanently removed. Consider backing up important content before deletion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete
