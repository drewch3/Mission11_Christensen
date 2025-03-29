//drew section 3
import React from 'react';

interface Props {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onSelect }) => {
  return (
    <div className="mb-4" style={{ maxWidth: '300px' }}>
      <select
        className="form-select"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
