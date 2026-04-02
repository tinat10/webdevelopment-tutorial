export default function FilterBar({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {filters.map((filterOption) => {
        const isActive = activeFilter === filterOption.id
        return (
          <button
            key={filterOption.id}
            type="button"
            className={`filter-btn${isActive ? ' is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onFilterChange(filterOption.id)}
          >
            {filterOption.label}
          </button>
        )
      })}
    </div>
  )
}
