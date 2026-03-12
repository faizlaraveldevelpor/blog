import { MdMessage } from "react-icons/md";
import { HiHeart, HiBookmark, HiShare, HiPencil } from "react-icons/hi2";
import { useNavigate, useParams } from 'react-router-dom';
import { useLogin_userQuery, useSingle_blogQuery } from "../Redux/Api";
import { useDispatch } from "react-redux";
import { update_blog } from "../Redux/api_data_slice";
import { comment_fnc } from "../Redux/ALL_moduls._Slice";
import Like_Blog from "../Compunents/Like_Blog";
import Draft from "../Compunents/Draft";
import Helmet from 'react-helmet';
import EditorJSRenderer from "../Components/shared/EditorJSRenderer";
import Avatar from "../Components/shared/Avatar";
import Badge from "../Components/shared/Badge";
import { BlogCardSkeleton } from "../Components/shared/LoadingSkeleton";

function Single_Blog_page() {
  let local_storage = JSON.parse(localStorage.getItem("user")) || {};
  let { id } = useParams();
  
  let { data, isLoading } = useSingle_blogQuery(id);
  let { data: login_user } = useLogin_userQuery();
  
  let navigate = useNavigate();
  let dispacth = useDispatch();

  window.scrollTo(0, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-surface py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-slate-200 rounded w-3/4" />
            <div className="h-96 bg-slate-200 rounded" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  const blog = data?.blog_get;
  if (!blog) return null;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-brand-surface">
      <Helmet>
        <title>{blog?.metaTitle || blog?.title}</title>
        <meta name="description" content={blog?.metaDescription} />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-brand-surface border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Category Badge */}
          {blog.cetagory?.name && (
            <Badge variant="primary" className="mb-4">
              {blog.cetagory.name}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary mb-6 font-merriweather leading-tight">
            {blog.title}
          </h1>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Avatar 
                src={blog.user?.image || login_user?.user?.image} 
                alt={blog.user?.name || login_user?.user?.name}
                size="lg"
              />
              <div>
                <p className="font-semibold text-brand-primary">
                  {blog.user?.name || login_user?.user?.name || "Unknown Author"}
                </p>
                <p className="text-sm text-brand-muted">{formattedDate}</p>
              </div>
            </div>

            {/* Edit Button for Admins */}
            {local_storage.role === "admin" && (
              <button
                className="btn-outline flex items-center gap-2"
                onClick={() => {
                  dispacth(update_blog(data));
                  navigate(`/update/blog/${id}`);
                }}
              >
                <HiPencil /> Edit Blog
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 py-4 border-y border-slate-200">
            <Like_Blog data={data} />
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-brand-primary"
              onClick={() => dispacth(comment_fnc(true))}
            >
              <MdMessage className="text-xl" />
              <span className="text-sm font-semibold">{blog.comments?.length || 0}</span>
            </button>
            <Draft />
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-brand-primary ml-auto">
              <HiShare className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 mb-12">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={Array.isArray(blog.image) ? blog.image[0] : blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="prose prose-lg max-w-none">
          <EditorJSRenderer content={blog.content} />
        </div>
      </article>

      {/* Related Posts Section - Placeholder */}
      <div className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This can be populated with actual related blogs later */}
            <p className="text-brand-muted col-span-full text-center py-8">
              Related articles coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single_Blog_page;
