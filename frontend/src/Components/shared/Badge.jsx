import PropTypes from 'prop-types';

function Badge({ children, variant = "primary", size = "md", className = "" }) {
  const variants = {
    primary: "badge-primary",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
    default: "bg-slate-100 text-slate-700",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span className={`badge ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "success", "warning", "error", "default"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default Badge;
