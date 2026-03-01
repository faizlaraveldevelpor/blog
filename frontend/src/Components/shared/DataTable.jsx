import PropTypes from 'prop-types';
import { useState } from 'react';
import { HiChevronUp, HiChevronDown, HiMagnifyingGlass } from 'react-icons/hi2';
import EmptyState from './EmptyState';

function DataTable({ 
  data = [], 
  columns = [], 
  searchable = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No data available",
  className = ""
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Search functionality
  const filteredData = searchable
    ? data.filter(row =>
        columns.some(col => {
          const value = col.accessor ? row[col.accessor] : '';
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    : data;

  // Sort functionality
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={className}>
      {/* Search Bar */}
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full md:w-96"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`
                    px-6 py-4 text-left text-xs font-semibold text-brand-muted uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:bg-slate-100' : ''}
                  `}
                  onClick={() => column.sortable && requestSort(column.accessor)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortConfig.key === column.accessor && (
                      sortConfig.direction === 'asc' 
                        ? <HiChevronUp className="text-brand-accent" />
                        : <HiChevronDown className="text-brand-accent" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12">
                  <EmptyState title={emptyMessage} />
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
                  {columns.map((column, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 text-sm text-brand-primary">
                      {column.render ? column.render(row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results count */}
      {searchable && sortedData.length > 0 && (
        <div className="mt-4 text-sm text-brand-muted">
          Showing {sortedData.length} of {data.length} results
        </div>
      )}
    </div>
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    accessor: PropTypes.string,
    sortable: PropTypes.bool,
    render: PropTypes.func,
  })).isRequired,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
};

export default DataTable;
