import PropTypes from 'prop-types';

function Avatar({ src, alt = "Avatar", size = "md", className = "" }) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
  };

  const fallback = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(alt || "user")}`;

  return (
    <img
      src={src || fallback}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0 ${className}`}
      onError={(e) => {
        e.target.src = fallback;
      }}
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "2xl"]),
  className: PropTypes.string,
};

export default Avatar;
