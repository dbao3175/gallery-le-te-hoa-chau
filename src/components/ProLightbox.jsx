import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info,
  Maximize, 
  Minimize, 
  Play, 
  Pause,
  Layers
} from 'lucide-react';

export default function ProLightbox({
  photo,
  allFilteredPhotos,
  onClose,
  onSelectPhoto,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showFilmstrip, setShowFilmstrip] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const filmstripRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const lastTapRef = useRef(0);

  // Reset zoom on photo change
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [photo]);

  // Auto-scroll active thumbnail in filmstrip
  useEffect(() => {
    if (filmstripRef.current && photo) {
      const activeEl = filmstripRef.current.querySelector('.filmstrip-cell.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [photo]);

  // Slideshow
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        if (hasNext) {
          onNext();
        } else {
          onSelectPhoto(allFilteredPhotos[0]);
        }
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, hasNext, onNext, onSelectPhoto, allFilteredPhotos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') handleResetZoom();
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
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

  // Mobile Touch Handlers: Swipe left/right & Touch Drag
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      touchEndRef.current = { x: touch.clientX, y: touch.clientY };

      if (zoom > 1) {
        setIsDragging(true);
        dragStartRef.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
      }
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchEndRef.current = { x: touch.clientX, y: touch.clientY };

      if (isDragging && zoom > 1) {
        setPosition({
          x: touch.clientX - dragStartRef.current.x,
          y: touch.clientY - dragStartRef.current.y,
        });
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (zoom <= 1) {
      const dx = touchEndRef.current.x - touchStartRef.current.x;
      const dy = touchEndRef.current.y - touchStartRef.current.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        if (dx < 0 && hasNext) {
          onNext();
        } else if (dx > 0 && hasPrev) {
          onPrev();
        }
      }
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (zoom > 1) {
        handleResetZoom();
      } else {
        setZoom(2.2);
      }
    }
    lastTapRef.current = now;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  if (!photo) return null;

  const currentIndex = allFilteredPhotos.findIndex((p) => p.id === photo.id);

  return (
    <div className="darkroom-modal-overlay" onClick={onClose}>
      <div 
        className="darkroom-lightbox-frame" 
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Minimalist Glass Control Bar */}
        <div className="darkroom-nav-bar">
          <div className="darkroom-title-block">
            <span className="darkroom-index-tag">
              {currentIndex + 1} / {allFilteredPhotos.length}
            </span>
            <span className="darkroom-photo-title">{photo.title}</span>
            <span className="darkroom-res-pill">{photo.resolution}</span>
          </div>

          <div className="darkroom-action-cluster">
            {/* Zoom controls */}
            <div className="cluster-zoom-group">
              <button 
                className="action-icon-btn" 
                onClick={handleZoomOut} 
                disabled={zoom <= 1}
                title="Thu nhỏ (-)"
              >
                <ZoomOut size={16} />
              </button>
              <span className="zoom-text-val">{Math.round(zoom * 100)}%</span>
              <button 
                className="action-icon-btn" 
                onClick={handleZoomIn} 
                disabled={zoom >= 4}
                title="Phóng to (+)"
              >
                <ZoomIn size={16} />
              </button>
              <button 
                className="action-icon-btn" 
                onClick={handleResetZoom} 
                title="Kích thước gốc (0)"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            {/* Slideshow */}
            <button 
              className={`action-icon-btn ${isPlaying ? 'is-active' : ''}`}
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Dừng trình chiếu" : "Bật trình chiếu tự động (Phím cách)"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            {/* Fullscreen */}
            <button 
              className="action-icon-btn" 
              onClick={toggleFullscreen}
              title="Toàn màn hình"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>

            {/* Filmstrip toggle */}
            <button 
              className={`action-icon-btn ${showFilmstrip ? 'is-active' : ''}`}
              onClick={() => setShowFilmstrip(!showFilmstrip)}
              title="Bật/tắt thanh ảnh thu nhỏ"
            >
              <Layers size={16} />
            </button>

            {/* Info toggle */}
            <button 
              className={`action-icon-btn ${showInfo ? 'is-active' : ''}`}
              onClick={() => setShowInfo(!showInfo)}
              title="Xem thông tin tư liệu"
            >
              <Info size={16} />
            </button>

            {/* Close */}
            <button 
              className="action-icon-btn btn-close-modal" 
              onClick={onClose}
              title="Đóng (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Centerpiece Image Stage */}
        <div 
          className="darkroom-viewport-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {hasPrev && (
            <button 
              className="stage-nav-arrow stage-nav-prev"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              title="Ảnh trước (Mũi tên Trái)"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <div 
            className="stage-canvas-area"
            onMouseDown={handleMouseDown}
            onClick={handleDoubleTap}
            style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <img 
              src={photo.src} 
              alt={photo.title}
              className="stage-display-img"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              draggable={false}
            />
          </div>

          {hasNext && (
            <button 
              className="stage-nav-arrow stage-nav-next"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              title="Ảnh kế tiếp (Mũi tên Phải)"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Minimalist Info Sheet */}
          {showInfo && (
            <div className="stage-info-flyout">
              <h4 className="flyout-title">{photo.title}</h4>
              <p className="flyout-desc">{photo.description}</p>
              
              <div className="flyout-meta-row">
                <div className="meta-pair">
                  <span className="lbl">Bộ Sưu Tập:</span>
                  <span className="val text-gold">{photo.albumName}</span>
                </div>
                <div className="meta-pair">
                  <span className="lbl">Kích Thước:</span>
                  <span className="val">{photo.resolution}</span>
                </div>
                <div className="meta-pair">
                  <span className="lbl">Tên Tệp:</span>
                  <span className="val font-mono">{photo.fileName}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Filmstrip */}
        {showFilmstrip && (
          <div className="darkroom-filmstrip-strip" ref={filmstripRef}>
            <div className="filmstrip-scroll-track">
              {allFilteredPhotos.map((p, idx) => {
                const isSelected = p.id === photo.id;
                return (
                  <button
                    key={p.id}
                    className={`filmstrip-cell ${isSelected ? 'active' : ''}`}
                    onClick={() => onSelectPhoto(p)}
                    title={`${idx + 1}. ${p.title}`}
                  >
                    <img 
                      src={p.src} 
                      alt="" 
                      loading="lazy" 
                      className="filmstrip-img" 
                    />
                    {p.is4K && <span className="cell-4k-mark"></span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
