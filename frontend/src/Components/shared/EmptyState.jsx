import PropTypes from 'prop-types';
import { HiOutlineInboxIn } from 'react-icons/hi';

function EmptyState({ 
  title = "No items found", 
  description = "Get started by creating a new item",
  icon: Icon = HiOutlineInboxIn,
  action,
  actionLabel,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-brand-primary mb-2">{title}</h3>
      <p className="text-brand-muted text-sm max-w-sm mb-6">{description}</p>
      {action && actionLabel && (
        <button onClick={action} className="btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.elementType,
  action: PropTypes.func,
  actionLabel: PropTypes.string,
  className: PropTypes.string,
};

export default EmptyState;
