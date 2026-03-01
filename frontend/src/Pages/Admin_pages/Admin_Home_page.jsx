import { useBlogsQuery, useAll_usersQuery } from "../../Redux/Api";
import StatsCard from "../../Components/shared/StatsCard";
import { LineChart, BarChart, PieChart } from "../../Components/shared/Chart";
import BlogCard from "../../Components/shared/BlogCard";
import Avatar from "../../Components/shared/Avatar";
import Badge from "../../Components/shared/Badge";
import { 
  HiDocumentText, 
  HiChatBubbleLeftRight, 
  HiHeart, 
  HiUsers,
  HiArrowTrendingUp,
  HiClock,
} from "react-icons/hi2";
import { 
  processDataForLineChart, 
  processCategoryData, 
  processEngagementData,
  getTopPerformingBlogs,
  calculateTrend
} from "../../utils/chartHelpers";
import { Link } from "react-router-dom";

function Admin_Home_page() {
  const { data: blogsData, isLoading: blogsLoading } = useBlogsQuery();
  const { data: usersData } = useAll_usersQuery();
  
  const blogs = blogsData?.get_blog || [];
  const users = usersData?.data || [];

  // Calculate stats
  const totalBlogs = blogs.length;
  const totalComments = blogs.reduce((sum, blog) => sum + (blog.comments?.length || 0), 0);
  const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
  const totalUsers = users.length;

  // Get recent data (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentBlogs = blogs.filter(blog => new Date(blog.createdAt) > sevenDaysAgo).length;
  const previousBlogs = totalBlogs - recentBlogs;

  // Calculate trends
  const blogTrend = calculateTrend(recentBlogs, previousBlogs);
  
  // Chart data
  const blogActivityData = processDataForLineChart(blogs, 'createdAt', 30);
  const categoryData = processCategoryData(blogs);
  const engagementData = processEngagementData(blogs);
  const topBlogs = getTopPerformingBlogs(blogs, 'likes', 5);

  // Recent activity
  const recentComments = blogs
    .flatMap(blog => 
      (blog.comments || []).map(comment => ({ ...comment, blogTitle: blog.title, blogId: blog._id }))
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">Dashboard</h1>
        <p className="text-brand-muted">Welcome back! Here's what's happening with your blog.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Blogs"
          value={totalBlogs}
          icon={HiDocumentText}
          trend={blogTrend.trend}
          trendValue={blogTrend.value}
          color="accent"
          loading={blogsLoading}
        />
        <StatsCard
          title="Comments"
          value={totalComments}
          icon={HiChatBubbleLeftRight}
          color="primary"
          loading={blogsLoading}
        />
        <StatsCard
          title="Total Likes"
          value={totalLikes}
          icon={HiHeart}
          color="error"
          loading={blogsLoading}
        />
        <StatsCard
          title="Users"
          value={totalUsers}
          icon={HiUsers}
          color="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Blog Activity Chart */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <HiArrowTrendingUp className="text-brand-accent text-xl" />
            <h2 className="text-lg font-bold text-brand-primary">Blog Activity</h2>
          </div>
          <p className="text-sm text-brand-muted mb-4">Posts published over the last 30 days</p>
          <LineChart data={blogActivityData} title="Blogs" height={250} />
        </div>

        {/* Category Distribution */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-brand-primary mb-4">Category Distribution</h2>
          <p className="text-sm text-brand-muted mb-4">Posts by category</p>
          <BarChart data={categoryData} title="Posts" height={250} />
        </div>
      </div>

      {/* Engagement & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Engagement Pie Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-brand-primary mb-4">Engagement</h2>
          <PieChart data={engagementData} height={250} />
        </div>

        {/* Recent Comments */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HiClock className="text-brand-accent text-xl" />
              <h2 className="text-lg font-bold text-brand-primary">Recent Comments</h2>
            </div>
            <Link to="/all/comments" className="text-sm text-brand-accent hover:text-brand-accent-hover font-semibold">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentComments.length === 0 ? (
              <p className="text-brand-muted text-sm text-center py-8">No comments yet</p>
            ) : (
              recentComments.map((comment, idx) => (
                <div key={idx} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0">
                  <Avatar src={comment.user?.image} alt={comment.user?.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-brand-primary">{comment.user?.name}</p>
                      <span className="text-xs text-brand-muted">•</span>
                      <p className="text-xs text-brand-muted">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-brand-muted line-clamp-2 mb-1">{comment.text}</p>
                    <Link 
                      to={`/single/blog/${comment.blogId}`}
                      className="text-xs text-brand-accent hover:text-brand-accent-hover"
                    >
                      on "{comment.blogTitle?.substring(0, 50)}{comment.blogTitle?.length > 50 ? '...' : ''}"
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-brand-primary">Top Performing Posts</h2>
          <Badge variant="primary">Most Liked</Badge>
        </div>
        {topBlogs.length === 0 ? (
          <p className="text-brand-muted text-center py-8">No blogs yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} variant="grid" showAuthor={false} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/create/blog" className="btn-primary text-center">
          Create New Blog
        </Link>
        <Link to="/All_blogs/admin" className="btn-secondary text-center">
          Manage Blogs
        </Link>
        <Link to="/create/cetagory" className="btn-outline text-center">
          Add Category
        </Link>
        <Link to="/users" className="btn-ghost text-center">
          Manage Users
        </Link>
      </div>
    </div>
  );
}

export default Admin_Home_page;
