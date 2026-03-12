import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiHeart, HiChatBubbleLeftRight, HiEye } from 'react-icons/hi2';
import Avatar from './Avatar';

function BlogCard({ 
  blog, 
  variant = "grid",
  showAuthor = true,
  showStats = true,
  className = ""
}) {
  const { _id, title, image, images, user, likes = [], comments = [], Slug, createdAt, excerpt } = blog;
  const blogImage = Array.isArray(image) ? image[0] : image;
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  if (variant === "featured") {
    return (
      <Link to={`/single/blog/${_id}/${Slug || "slug"}`} className={`group ${className}`}>
        <article className="card-elevated overflow-hidden hover-lift">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={blogImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 gradient-overlay" />
            {showStats && (
              <div className="absolute top-4 right-4 flex gap-2">
                {likes.length > 0 && (
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold flex items-center gap-1">
                    <HiHeart className="text-red-500" /> {likes.length}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-brand-primary mb-3 line-clamp-2 group-hover:text-brand-accent transition-colors">
              {title}
            </h2>
            {excerpt && (
              <p className="text-brand-muted text-sm mb-4 line-clamp-2">{excerpt}</p>
            )}
            {showAuthor && user && (
              <div className="flex items-center gap-3">
                <Avatar src={user?.image} alt={user?.name} size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-brand-primary">{user?.name}</p>
                  <p className="text-xs text-brand-muted">{formattedDate}</p>
                </div>
              </div>
            )}
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link to={`/single/blog/${_id}/${Slug || "slug"}`} className={`group ${className}`}>
        <article className="card p-4 flex gap-4 hover-lift">
          <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
            <img
              src={blogImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-brand-primary mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-brand-muted">
              {showAuthor && user && (
                <span className="flex items-center gap-1">
                  <Avatar src={user?.image} alt={user?.name} size="xs" />
                  {user?.name}
                </span>
              )}
              <span>{formattedDate}</span>
              {showStats && (
                <>
                  <span className="flex items-center gap-1">
                    <HiHeart className="text-red-500" /> {likes.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <HiChatBubbleLeftRight className="text-brand-accent" /> {comments.length}
                  </span>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default: grid variant
  return (
    <Link to={`/single/blog/${_id}/${Slug || "slug"}`} className={`group ${className}`}>
      <article className="card overflow-hidden hover-lift hover-glow">
        <div className="relative h-48 overflow-hidden">
          <img
            src={blogImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-brand-primary mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
            {title}
          </h3>
          {showStats && (
            <div className="flex items-center gap-4 text-xs text-brand-muted mb-3">
              <span className="flex items-center gap-1">
                <HiHeart className="text-red-500" /> {likes.length}
              </span>
              <span className="flex items-center gap-1">
                <HiChatBubbleLeftRight className="text-brand-accent" /> {comments.length}
              </span>
            </div>
          )}
          {showAuthor && user && (
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <Avatar src={user?.image} alt={user?.name} size="xs" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-brand-primary truncate">{user?.name}</p>
                <p className="text-xs text-brand-muted">{formattedDate}</p>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    images: PropTypes.array,
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    likes: PropTypes.array,
    comments: PropTypes.array,
    Slug: PropTypes.string,
    createdAt: PropTypes.string,
    excerpt: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(["grid", "list", "featured"]),
  showAuthor: PropTypes.bool,
  showStats: PropTypes.bool,
  className: PropTypes.string,
};

export default BlogCard;
