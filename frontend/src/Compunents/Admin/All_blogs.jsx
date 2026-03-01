import { Link } from "react-router-dom";
import { useBlogsQuery } from "../../Redux/Api";
import Button from "../../Components/shared/Button";
import { HiPencil, HiEye, HiDocumentText } from "react-icons/hi2";

function All_blogs_Admin() {
  const { data, isLoading } = useBlogsQuery();
  const blogs = data?.get_blog || [];

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <div className="h-9 w-48 bg-slate-200 rounded-lg skeleton" />
          <div className="h-5 w-64 mt-2 bg-slate-100 rounded skeleton" />
        </div>
        <div className="h-24 rounded-xl bg-slate-100 skeleton mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card p-4 flex items-center gap-4">
              <div className="w-24 h-20 rounded-lg bg-slate-200 skeleton shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-5 w-3/4 bg-slate-200 rounded skeleton mb-2" />
                <div className="h-4 w-1/3 bg-slate-100 rounded skeleton" />
              </div>
              <div className="flex gap-2 shrink-0">
                <div className="h-9 w-20 rounded-lg bg-slate-200 skeleton" />
                <div className="h-9 w-20 rounded-lg bg-slate-200 skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 min-h-screen bg-brand-surface">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary font-merriweather flex items-center gap-3">
          <HiDocumentText className="text-brand-accent" />
          All Blogs
        </h1>
        <p className="text-brand-muted mt-1 text-sm">
          Manage, edit and view all your blog posts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="card p-5 rounded-xl border border-slate-100">
          <p className="text-sm text-brand-muted font-medium">Total Posts</p>
          <p className="text-2xl font-bold text-brand-primary mt-1">{blogs.length}</p>
        </div>
        <div className="card p-5 rounded-xl border border-slate-100">
          <p className="text-sm text-brand-muted font-medium">Total Likes</p>
          <p className="text-2xl font-bold text-brand-primary mt-1">
            {blogs.reduce((sum, b) => sum + (b.likes?.length || 0), 0)}
          </p>
        </div>
        <div className="card p-5 rounded-xl border border-slate-100">
          <p className="text-sm text-brand-muted font-medium">Total Comments</p>
          <p className="text-2xl font-bold text-brand-primary mt-1">
            {blogs.reduce((sum, b) => sum + (b.comments?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* Blog list */}
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <div className="card p-12 text-center rounded-xl">
            <HiDocumentText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-brand-primary mb-2">No blogs yet</h3>
            <p className="text-brand-muted text-sm mb-6 max-w-sm mx-auto">
              Create your first blog post to see it listed here.
            </p>
            <Link to="/create/blog">
              <Button variant="primary">Create Blog</Button>
            </Link>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <article
              key={blog?._id}
              className="card p-4 md:p-5 rounded-xl border border-slate-100 hover:border-brand-accent/30 hover:shadow-card-hover transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-4 animation fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                to={`/single/blog/${blog?._id}/${blog?.Slug || blog?.slug || "slug"}`}
                className="flex flex-1 min-w-0 gap-4 sm:gap-5 group"
              >
                <div className="w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 flex-shrink-0">
                  <img
                    src={Array.isArray(blog?.image) ? blog.image[0] : blog?.image}
                    alt={blog?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-brand-primary group-hover:text-brand-accent transition-colors line-clamp-2 text-lg">
                    {blog?.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-brand-muted">
                    {blog?.cetagory && (
                      <span className="bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-md font-medium">
                        {typeof blog.cetagory === "object" ? blog.cetagory?.name : blog.cetagory}
                      </span>
                    )}
                    {blog?.createdAt && (
                      <span>{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    )}
                    {(blog?.likes?.length > 0 || blog?.comments?.length > 0) && (
                      <span className="text-brand-muted">
                        {blog.likes?.length || 0} likes · {blog.comments?.length || 0} comments
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 sm:pl-4 sm:border-l border-slate-100">
                <Link to={`/update/blog/${blog?._id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <HiPencil className="w-4 h-4" /> Edit
                  </Button>
                </Link>
                <Link to={`/single/blog/${blog?._id}/${blog?.Slug || blog?.slug || "slug"}`}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <HiEye className="w-4 h-4" /> View
                  </Button>
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default All_blogs_Admin;
