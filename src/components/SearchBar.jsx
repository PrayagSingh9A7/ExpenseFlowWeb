import { FaFilter, FaMagnifyingGlass } from 'react-icons/fa6';
import { categories } from '../utils/categories.js';

function SearchBar({ filters, onFilterChange }) {
  function updateFilter(e) {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="searchBar">
      <label className="searchInput">
        <FaMagnifyingGlass />
        <input
          name="query"
          type="search"
          placeholder="Search by title or category"
          value={filters.query}
          onChange={updateFilter}
        />
      </label>

      <label className="compactSelect">
        <FaFilter />
        <select name="type" value={filters.type} onChange={updateFilter}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label className="compactSelect">
        <select name="category" value={filters.category} onChange={updateFilter}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
