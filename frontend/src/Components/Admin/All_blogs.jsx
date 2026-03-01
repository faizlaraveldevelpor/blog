import { Link } from "react-router-dom";
import { useBlogsQuery } from "../../Redux/Api";
import DataTable from "../../Components/shared/DataTable";
import Badge from "../../Components/shared/Badge";
import Button from "../../Components/shared/Button";
import { HiPencil, HiEye } from "react-icons/hi2";

function All_blogs_Admin() {
  const { data, isLoading } = useBlogsQuery();
  const blogs = data?.get_blog || [];

  const columns = [
    {
      header: "Image",
      accessor: "image",
      render: (blog) => (
        <img 
          src={Array.isArray(blog.image) ? blog.image[0] : blog.image} 
          alt={blog.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
      ),
    },
    {
      header: "Title",
      accessor: "title",
      sortable: true,
      render: (blog) => (
        <div className="max-w-md">
          <Link 
            to={`/single/blog/${blog._id}`}
            className="font-semibold text-brand-primary hover:text-brand-accent transition-colors line-clamp-2"
          >
            {blog.title}
          </Link>
          <p className="text-xs text-brand-muted mt-1">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "cetagory",
      sortable: true,
      render: (blog) => (
        <Badge variant="default">
          {blog.cetagory?.name || "Uncategorized"}
        </Badge>
      ),
    },
    {
      header: "Stats",
      accessor: "likes",
      render: (blog) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-brand-muted">Likes:</span>
            <span className="font-semibold text-brand-primary">{blog.likes?.length || 0}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-brand-muted">Comments:</span>
            <span className="font-semibold text-brand-primary">{blog.comments?.length || 0}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Author",
      accessor: "user",
      render: (blog) => (
        <div className="text-sm">
          <p className="font-medium text-brand-primary">{blog.user?.name || "Unknown"}</p>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      render: (blog) => (
        <div className="flex items-center gap-2">
          <Link to={`/update/blog/${blog._id}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <HiPencil /> Edit
            </Button>
          </Link>
          <Link to={`/single/blog/${blog._id}`}>
            <Button variant="ghost" size="sm">
              <HiEye />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-48" />
          <div className="h-64 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary mb-2">All Blogs</h1>
          <p className="text-brand-muted">Manage and edit your blog posts</p>
        </div>
        <Link to="/create/blog">
          <Button variant="primary">Create New Blog</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-brand-muted mb-1">Total Posts</p>
          <p className="text-2xl font-bold text-brand-primary">{blogs.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-brand-muted mb-1">Total Likes</p>
          <p className="text-2xl font-bold text-brand-primary">
            {blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0)}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-brand-muted mb-1">Total Comments</p>
          <p className="text-2xl font-bold text-brand-primary">
            {blogs.reduce((sum, blog) => sum + (blog.comments?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="card p-6">
        <DataTable
          data={blogs}
          columns={columns}
          searchable
          searchPlaceholder="Search blogs by title, category..."
          emptyMessage="No blogs found"
        />
      </div>
    </div>
  );
}

export default All_blogs_Admin;
