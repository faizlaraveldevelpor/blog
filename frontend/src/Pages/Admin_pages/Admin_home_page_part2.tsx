import { TiMessage } from "react-icons/ti";
import { BiSolidLike } from "react-icons/bi";
import { HiDocumentText, HiChatBubbleLeftRight, HiPlus, HiTrash, HiArrowRight } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDelete_commMutation } from "../../Redux/Api";
import { Avatar, Button, EmptyState, Badge } from "../../Components/shared";
import { formatDistanceToNow } from 'date-fns';

function Admin_home_page_part2() {
  let [fnc, { isLoading }] = useDelete_commMutation()
  let blog_data_useslactor = useSelector((state) => state.Api_data_slice.blogs_data)
  let navigate = useNavigate()

  let filter = blog_data_useslactor?.get_blog?.slice(0, 11) || []
  let filter_commnets = blog_data_useslactor?.get_blog?.find((data) => data.comments?.length > 0)

  let delete_comment = (id, blog_id) => {
    fnc({ id, blog_id })
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-2 flex items-center gap-3">
          <HiDocumentText className="text-brand-accent" />
          Content Management
        </h1>
        <p className="text-brand-muted text-sm">Manage your recent blogs and comments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Blogs - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                  <HiDocumentText className="text-xl text-brand-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-primary">Recent Blogs</h2>
                  <p className="text-xs text-brand-muted">{filter?.length || 0} latest posts</p>
                </div>
              </div>
              <Button
                onClick={() => navigate("/create/blog")}
                variant="primary"
                className="flex items-center gap-2"
              >
                <HiPlus /> Create Blog
              </Button>
            </div>

            {/* Blog List */}
            <div className="space-y-4">
              {filter && filter.length > 0 ? (
                filter.map((data, index) => (
                  <Link
                    key={data._id || index}
                    to={`/single/blog/${data._id}`}
                    className="group"
                  >
                    <div className="flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-accent hover:shadow-lg transition-all duration-300 bg-white">
                      {/* Blog Thumbnail */}
                      <div className="flex-shrink-0">
                        <img
                          src={data?.image}
                          alt={data?.title}
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Blog Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-brand-primary mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
                          {data?.title}
                        </h3>
                        
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-brand-muted mb-2">
                          <div className="flex items-center gap-1">
                            <TiMessage className="text-brand-accent" />
                            <span>{data?.comments?.length || 0} comments</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BiSolidLike className="text-brand-accent" />
                            <span>{data?.likes?.length || 0} likes</span>
                          </div>
                          {data?.cetagory && (
                            <Badge variant="default" className="text-xs">
                              {data.cetagory}
                            </Badge>
                          )}
                        </div>

                        {/* Date */}
                        {data?.createdAt && (
                          <p className="text-xs text-brand-muted">
                            {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
                          </p>
                        )}
                      </div>

                      {/* Arrow Icon */}
                      <div className="flex-shrink-0 flex items-center">
                        <HiArrowRight className="text-xl text-brand-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <EmptyState
                  title="No Blogs Yet"
                  description="Start creating your first blog post"
                  icon={HiDocumentText}
                />
              )}
            </div>
          </div>
        </div>

        {/* Comments Section - Takes 1 column */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <HiChatBubbleLeftRight className="text-xl text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-primary">Recent Comments</h2>
                  <p className="text-xs text-brand-muted">Latest activity</p>
                </div>
              </div>
            </div>

            <Link to="/all/comments" className="block mb-4">
              <Button variant="outline" fullWidth className="flex items-center justify-center gap-2">
                See all comments <HiArrowRight />
              </Button>
            </Link>

            {/* Comments List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto cusSc pr-2">
              {filter_commnets && filter_commnets.comments?.length > 0 ? (
                filter_commnets.comments.map((comment, index) => (
                  <div
                    key={comment._id || index}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar
                          src={comment?.user?.image}
                          alt={comment?.user?.name}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-brand-primary truncate">
                            {comment?.user?.name || "Anonymous"}
                          </h4>
                          {comment?.createdAt && (
                            <p className="text-xs text-brand-muted">
                              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => delete_comment(comment._id, comment.blog)}
                        variant="danger"
                        size="sm"
                        loading={isLoading}
                        className="flex items-center gap-1"
                      >
                        <HiTrash className="text-sm" />
                      </Button>
                    </div>

                    <p className="text-sm text-brand-primary line-clamp-3">
                      {comment?.text}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No Comments"
                  description="No comments to display yet"
                  icon={HiChatBubbleLeftRight}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin_home_page_part2
