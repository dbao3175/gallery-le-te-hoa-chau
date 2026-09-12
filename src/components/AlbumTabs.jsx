import React from 'react';
import { Search, X, Columns3, LayoutGrid, Grid3X3, Camera, Sparkles } from 'lucide-react';

export default function AlbumTabs({
  albums,
  selectedAlbum,
  onSelectAlbum,
  searchQuery,
  onSearchChange,
  albumCounts,
  viewMode,
  onChangeViewMode,
  filterType,
  onChangeFilterType,
  totalMatching
}) {
  return (
    <div className="dock-control-wrapper">
      <div className="container-wide">
        {/* Sleek Category Navigation */}
        <div className="dock-nav-strip">
          <div className="dock-tabs-list">
            {albums.map((alb) => {
              const count = albumCounts[alb.id] || 0;
              const isActive = selectedAlbum === alb.id;

              return (
                <button
                  key={alb.id}
                  className={`dock-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => onSelectAlbum(alb.id)}
                >
                  <span className="tab-name">{alb.name}</span>
                  <span className="tab-badge-num">{count}</span>
                  {isActive && <div className="tab-active-indicator" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="dock-sub-toolbar">
          {/* Integrated Search Box */}
          <div className="dock-search-wrap">
            <Search size={15} className="dock-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm tư liệu, bác bô lão, áo thụng, hài tế..."
              className="dock-search-input"
            />
            {searchQuery && (
              <button 
                className="dock-search-clear" 
                onClick={() => onSearchChange('')}
                title="Xóa tìm kiếm"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="dock-filter-pills">
            <button
              className={`filter-pill-item ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => onChangeFilterType('all')}
            >
              Tất Cả
            </button>
            <button
              className={`filter-pill-item ${filterType === 'real' ? 'active' : ''}`}
              onClick={() => onChangeFilterType('real')}
            >
              <Camera size={13} />
              <span>Ảnh Chụp Thật</span>
            </button>
            <button
              className={`filter-pill-item ${filterType === '4k' ? 'active' : ''}`}
              onClick={() => onChangeFilterType('4k')}
            >
              <Sparkles size={13} />
              <span>Chuẩn 4K</span>
            </button>
          </div>

          {/* View Modes */}
          <div className="dock-view-modes">
            <button
              className={`view-mode-btn ${viewMode === 'masonry' ? 'active' : ''}`}
              onClick={() => onChangeViewMode('masonry')}
              title="Bố cục Masonry tự nhiên (Không crop)"
            >
              <Columns3 size={16} />
              <span>Masonry</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'showcase' ? 'active' : ''}`}
              onClick={() => onChangeViewMode('showcase')}
              title="Ảnh lớn Showcase"
            >
              <LayoutGrid size={16} />
              <span>Lớn</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'compact' ? 'active' : ''}`}
              onClick={() => onChangeViewMode('compact')}
              title="Lưới nhỏ Compact"
            >
              <Grid3X3 size={16} />
              <span>Gọn</span>
            </button>
          </div>
        </div>

        {/* Counter hint */}
        <div className="dock-counter-hint">
          <span>Đang hiển thị <strong>{totalMatching}</strong> tư liệu</span>
        </div>
      </div>
    </div>
  );
}
