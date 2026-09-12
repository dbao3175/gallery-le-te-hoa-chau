import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info,
  Sparkles,
  Calendar,
  FileText
} from 'lucide-react';

export default function LightboxModal({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) {
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Reset zoom on photo change
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [photo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrev, hasNext, onClose, onPrev, onNext]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 4));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.5, 1));
  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  if (!photo) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div 
        className="lightbox-dialog" 
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Top Control Bar */}
        <div className="lightbox-header">
          <div className="lightbox-title-area">
            <span className={`badge-pill badge-${photo.category}`}>
              {photo.badge}
            </span>
            <span className="lightbox-photo-title">{photo.title}</span>
          </div>

          <div className="lightbox-controls">
            <button 
              className="ctrl-btn" 
              onClick={handleZoomOut} 
              disabled={zoom <= 1}
              title="Thu nhỏ (-)"
            >
              <ZoomOut size={20} />
            </button>
            <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
            <button 
              className="ctrl-btn" 
              onClick={handleZoomIn} 
              disabled={zoom >= 4}
              title="Phóng to (+)"
            >
              <ZoomIn size={20} />
            </button>
            <button 
              className="ctrl-btn" 
              onClick={handleResetZoom} 
              title="Khôi phục kích thước ban đầu (0)"
            >
              <RotateCcw size={18} />
            </button>
            <button 
              className={`ctrl-btn ${showInfo ? 'active' : ''}`} 
              onClick={() => setShowInfo(!showInfo)} 
              title="Bật/tắt thông tin tư liệu"
            >
              <Info size={20} />
            </button>
            <button className="ctrl-btn btn-close" onClick={onClose} title="Đóng (Esc)">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="lightbox-body">
          {/* Previous button */}
          {hasPrev && (
            <button 
              className="nav-arrow nav-prev" 
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              title="Ảnh trước (Mũi tên Trái)"
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {/* Main image container */}
          <div 
            className="lightbox-img-stage"
            onMouseDown={handleMouseDown}
            style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="lightbox-main-img"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              draggable={false}
            />
          </div>

          {/* Next button */}
          {hasNext && (
            <button 
              className="nav-arrow nav-next" 
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              title="Ảnh kế tiếp (Mũi tên Phải)"
            >
              <ChevronRight size={36} />
            </button>
          )}
        </div>

        {/* Info Drawer */}
        {showInfo && (
          <div className="lightbox-info-drawer">
            <div className="info-content">
              <h4>{photo.title}</h4>
              <p className="info-desc">{photo.description}</p>
              <div className="info-meta-row">
                <span className="meta-item">
                  <Calendar size={14} /> {photo.date}
                </span>
                <span className="meta-item">
                  <FileText size={14} /> {photo.fileName}
                </span>
                {photo.category === 'ky_niem' && (
                  <span className="meta-item text-gold">
                    <Sparkles size={14} /> Độ phân giải 4K (3584 × 4800)
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
