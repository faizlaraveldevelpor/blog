import PropTypes from 'prop-types';

export function SkeletonLine({ className = "" }) {
  return <div className={`skeleton-line ${className}`} />;
}

export function SkeletonCircle({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };
  return <div className={`skeleton-circle ${sizes[size]} ${className}`} />;
}

export function SkeletonBox({ className = "" }) {
  return <div className={`skeleton-box ${className}`} />;
}

export function BlogCardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <SkeletonBox className="w-full h-48 rounded-lg" />
      <SkeletonLine className="w-3/4" />
      <SkeletonLine className="w-1/2" />
      <div className="flex gap-2">
        <SkeletonCircle size="sm" />
        <SkeletonLine className="w-24" />
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="card p-6 space-y-3">
      <div className="flex justify-between items-start">
        <SkeletonBox className="w-12 h-12 rounded-lg" />
        <SkeletonLine className="w-16" />
      </div>
      <SkeletonLine className="w-32" />
      <SkeletonLine className="w-24 h-8" />
    </div>
  );
}

SkeletonLine.propTypes = {
  className: PropTypes.string,
};

SkeletonCircle.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

SkeletonBox.propTypes = {
  className: PropTypes.string,
};

export default {
  Line: SkeletonLine,
  Circle: SkeletonCircle,
  Box: SkeletonBox,
  BlogCard: BlogCardSkeleton,
  StatsCard: StatsCardSkeleton,
};
