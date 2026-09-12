import React from 'react';
import { Maximize2, Sparkles, Camera } from 'lucide-react';

export default function MasonryGallery({ photos, viewMode, onOpenPhoto }) {
  if (photos.length === 0) {
    return (
      <div className="museum-empty-state">
        <p className="empty-title">Không tìm thấy tư liệu phù hợp</p>
        <p className="empty-sub">Vui lòng thử tìm kiếm từ khóa khác hoặc chọn xem "Tất Cả Tư Liệu".</p>
      </div>
    );
  }

  const containerClass = `gallery-grid-canvas view-${viewMode}`;

  return (
    <div className={containerClass}>
      {photos.map((photo) => (
        <article 
          key={photo.id} 
          className={`artwork-item ${photo.highlight ? 'is-spotlight' : ''}`}
          onClick={() => onOpenPhoto(photo)}
        >
          <div className="artwork-image-wrapper">
            <img 
              src={photo.src} 
              alt={photo.title} 
              loading="lazy"
              className="artwork-element"
            />

            {/* Subtle top pill */}
            <div className="artwork-top-tags">
              {photo.is4K && (
                <span className="tag-pill tag-4k">
                  <Sparkles size={10} /> 4K
                </span>
              )}
              {photo.isReal && (
                <span className="tag-pill tag-real">
                  <Camera size={10} /> Ảnh Thật
                </span>
              )}
            </div>

            {/* Mobile Always-Visible Compact Caption */}
            <div className="artwork-mobile-caption">
              <span className="mobile-cap-album">{photo.albumName}</span>
              <h3 className="mobile-cap-title">{photo.title}</h3>
            </div>

            {/* Desktop Minimalist Floating Hover Curtain */}
            <div className="artwork-hover-curtain">
              <div className="curtain-top-actions">
                <button 
                  className="curtain-circle-btn" 
                  title="Phóng to chi tiết"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPhoto(photo);
                  }}
                >
                  <Maximize2 size={18} />
                </button>
              </div>

              <div className="curtain-meta-content">
                <span className="curtain-album-label">{photo.albumName}</span>
                <h3 className="curtain-title">{photo.title}</h3>
                <span className="curtain-res-stamp">{photo.resolution}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
