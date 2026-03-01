import PropTypes from 'prop-types';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';

function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  color = "accent",
  loading = false,
  className = ""
}) {
  const colors = {
    accent: "bg-brand-accent/10 text-brand-accent",
    primary: "bg-brand-primary/10 text-brand-primary",
    success: "bg-success-500/10 text-success-600",
    warning: "bg-warning-500/10 text-warning-600",
    error: "bg-error-500/10 text-error-600",
  };

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-lg" />
          <div className="w-16 h-4 bg-slate-200 rounded" />
        </div>
        <div className="w-32 h-4 bg-slate-200 rounded mb-2" />
        <div className="w-24 h-8 bg-slate-200 rounded" />
      </div>
    );
  }

  return (
    <div className={`card p-6 hover-lift ${className}`}>
      <div className="flex justify-between items-start mb-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-success-600' : 'text-error-600'}`}>
            {trend === 'up' ? <HiArrowUp /> : <HiArrowDown />}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-brand-muted text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-brand-primary">{value}</p>
    </div>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  trend: PropTypes.oneOf(['up', 'down']),
  trendValue: PropTypes.string,
  color: PropTypes.oneOf(['accent', 'primary', 'success', 'warning', 'error']),
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default StatsCard;
