import React from 'react';
import { 
  Grid, 
  Sparkles, 
  Heart, 
  Users, 
  Flame, 
  Shirt, 
  Search,
  X
} from 'lucide-react';

const iconMap = {
  Grid: Grid,
  Sparkles: Sparkles,
  Heart: Heart,
  Users: Users,
  Flame: Flame,
  Shirt: Shirt,
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  photoCounts,
  totalResults
}) {
  return (
    <div className="filter-section">
      <div className="container">
        {/* Category Pills */}
        <div className="category-pill-list">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Grid;
            const count = photoCounts[cat.id] || 0;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <Icon size={18} className="pill-icon" />
                <span className="pill-name">{cat.name}</span>
                <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Result Summary */}
        <div className="filter-sub-bar">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên tư liệu, bác bô lão, hài tế, áo thụng..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="search-clear-btn" 
                onClick={() => onSearchChange('')}
                title="Xóa tìm kiếm"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="result-counter">
            Hiển thị <strong>{totalResults}</strong> bức ảnh
          </div>
        </div>
      </div>
    </div>
  );
}
