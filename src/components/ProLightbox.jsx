import { useEffect, useId, useRef, useState } from 'react';
import {
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw,
  Info, Maximize, Minimize, Play, Pause, Layers, ImageOff,
} from 'lucide-react';
import './Viewer.css';

export default function ProLightbox({
  photo,
  allFilteredPhotos = [],
  onClose,
  onSelectPhoto,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  const [imageView, setImageView] = useState({ src: photo?.src, zoom: 1, position: { x: 0, y: 0 } });
  const [draggedSrc, setDraggedSrc] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showFilmstrip, setShowFilmstrip] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageResult, setImageResult] = useState({ src: photo?.src, status: 'loading' });
  const [notice, setNotice] = useState('');
  const dialogRef = useRef(null);
  const imageRef = useRef(null);
  const filmstripRef = useRef(null);
  const pointerRef = useRef(null);
  const lastTapRef = useRef(0);
  const titleId = useId();
  const infoId = useId();
  const filmstripId = useId();
  const hasPhoto = Boolean(photo);
  const zoom = imageView.src === photo?.src ? imageView.zoom : 1;
  const position = imageView.src === photo?.src ? imageView.position : { x: 0, y: 0 };
  const isDragging = draggedSrc === photo?.src;
  const imageState = imageResult.src === photo?.src ? imageResult.status : 'loading';
  const setImageState = (status) => setImageResult({ src: photo.src, status });

  // Native modal dialogs trap focus, make the page inert, and handle Tab navigation.
  useEffect(() => {
    if (!hasPhoto) return undefined;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      if (document.fullscreenElement === dialog) {
        document.exitFullscreen?.().catch(() => {});
      }
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [hasPhoto]);

  useEffect(() => {
    filmstripRef.current?.querySelector('[aria-current="true"]')?.scrollIntoView({
      behavior: 'instant', inline: 'center', block: 'nearest',
    });
  }, [photo?.id, showFilmstrip]);

  useEffect(() => {
    const updateFullscreen = () => setIsFullscreen(document.fullscreenElement === dialogRef.current);
    document.addEventListener('fullscreenchange', updateFullscreen);
    return () => document.removeEventListener('fullscreenchange', updateFullscreen);
  }, []);

  useEffect(() => {
    if (!isPlaying || allFilteredPhotos.length < 2) return undefined;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      if (hasNext) onNext?.();
      else onSelectPhoto?.(allFilteredPhotos[0]);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [isPlaying, hasNext, onNext, onSelectPhoto, allFilteredPhotos]);

  const resetZoom = () => {
    setImageView({ src: photo.src, zoom: 1, position: { x: 0, y: 0 } });
  };

  const clampPosition = (nextPosition, scale = zoom) => {
    const image = imageRef.current;
    const maxX = image ? image.clientWidth * (scale - 1) / 2 : 0;
    const maxY = image ? image.clientHeight * (scale - 1) / 2 : 0;
    return {
      x: Math.max(-maxX, Math.min(maxX, nextPosition.x)),
      y: Math.max(-maxY, Math.min(maxY, nextPosition.y)),
    };
  };

  const changeZoom = (value) => {
    const nextZoom = Math.max(1, Math.min(4, value));
    setImageView({
      src: photo.src,
      zoom: nextZoom,
      position: nextZoom === 1 ? { x: 0, y: 0 } : clampPosition(position, nextZoom),
    });
  };

  const handleKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input, textarea, select')) return;
    if (event.key === 'ArrowLeft' && hasPrev) {
      event.preventDefault();
      onPrev?.();
    } else if (event.key === 'ArrowRight' && hasNext) {
      event.preventDefault();
      onNext?.();
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      changeZoom(zoom + 0.5);
    } else if (event.key === '-') {
      event.preventDefault();
      changeZoom(zoom - 0.5);
    } else if (event.key === '0') {
      event.preventDefault();
      resetZoom();
    } else if (event.key === ' ' && event.target === event.currentTarget && allFilteredPhotos.length > 1) {
      event.preventDefault();
      setIsPlaying((playing) => !playing);
    }
  };

  const handlePointerDown = (event) => {
    if (event.target.closest('button')) return;
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current = {
      x: event.clientX, y: event.clientY,
      startPosition: position, pointerId: event.pointerId, src: photo.src,
    };
    if (zoom > 1) setDraggedSrc(photo.src);
  };

  const handlePointerMove = (event) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.src !== photo.src || zoom <= 1) return;
    setImageView({ src: photo.src, zoom, position: clampPosition({
      x: pointer.startPosition.x + event.clientX - pointer.x,
      y: pointer.startPosition.y + event.clientY - pointer.y,
    }) });
  };

  const handlePointerUp = (event) => {
    const pointer = pointerRef.current;
    pointerRef.current = null;
    setDraggedSrc(null);
    if (!pointer || pointer.src !== photo.src) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (zoom === 1 && event.pointerType !== 'mouse' && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0 && hasNext) onNext?.();
      else if (dx > 0 && hasPrev) onPrev?.();
    } else if (event.pointerType === 'touch' && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) changeZoom(zoom > 1 ? 1 : 2);
      lastTapRef.current = now;
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement === dialogRef.current) await document.exitFullscreen();
      else await dialogRef.current.requestFullscreen();
    } catch {
      setNotice('Trình duyệt chưa hỗ trợ chế độ toàn màn hình.');
    }
  };

  if (!photo) return null;
  const currentIndex = allFilteredPhotos.findIndex((item) => item.id === photo.id);

  return (
    <dialog
      ref={dialogRef}
      className="viewer-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={handleKeyDown}
    >
      <div className="viewer-shell">
        <header className="viewer-header">
          <div className="viewer-heading">
            <span className="viewer-eyebrow">HÒA CHÂU / TƯ LIỆU ẢNH</span>
            <h2 id={titleId}>{photo.title}</h2>
          </div>
          <button type="button" className="viewer-icon-button viewer-close" onClick={onClose} aria-label="Đóng ảnh" title="Đóng (Esc)" autoFocus>
            <X size={20} />
          </button>
        </header>

        <div className="viewer-toolbar" aria-label="Công cụ xem ảnh">
          <span className="viewer-count" aria-live="polite" aria-atomic="true">
            {currentIndex >= 0 ? `${String(currentIndex + 1).padStart(2, '0')} / ${String(allFilteredPhotos.length).padStart(2, '0')}` : 'Ảnh được chọn'}
          </span>
          <div className="viewer-zoom-controls">
            <button type="button" className="viewer-icon-button" onClick={() => changeZoom(zoom - 0.5)} disabled={zoom <= 1} aria-label="Thu nhỏ" title="Thu nhỏ (-)"><ZoomOut size={17} /></button>
            <output className="viewer-zoom-value" aria-label="Mức phóng to">{Math.round(zoom * 100)}%</output>
            <button type="button" className="viewer-icon-button" onClick={() => changeZoom(zoom + 0.5)} disabled={zoom >= 4} aria-label="Phóng to" title="Phóng to (+)"><ZoomIn size={17} /></button>
            <button type="button" className="viewer-icon-button" onClick={resetZoom} aria-label="Đặt lại kích thước ảnh" title="Đặt lại (0)"><RotateCcw size={16} /></button>
          </div>
          <div className="viewer-extra-controls">
            <button type="button" className="viewer-icon-button" onClick={() => setIsPlaying((playing) => !playing)} disabled={allFilteredPhotos.length < 2} aria-pressed={isPlaying} aria-label={isPlaying ? 'Dừng trình chiếu' : 'Bắt đầu trình chiếu'} title={isPlaying ? 'Dừng trình chiếu' : 'Trình chiếu'}>
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            </button>
            {typeof document !== 'undefined' && document.fullscreenEnabled && (
              <button type="button" className="viewer-icon-button" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'} title="Toàn màn hình">
                {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
              </button>
            )}
            <button type="button" className="viewer-icon-button" onClick={() => setShowFilmstrip((show) => !show)} aria-pressed={showFilmstrip} aria-controls={filmstripId} aria-label="Hiện thanh ảnh thu nhỏ" title="Ảnh thu nhỏ"><Layers size={17} /></button>
            <button type="button" className="viewer-icon-button" onClick={() => setShowInfo((show) => !show)} aria-expanded={showInfo} aria-controls={infoId} aria-label="Thông tin ảnh" title="Thông tin ảnh"><Info size={17} /></button>
          </div>
        </div>

        <div className="viewer-stage">
          <div
            className={`viewer-canvas${zoom > 1 ? ' is-zoomed' : ''}${isDragging ? ' is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerRef.current = null; setDraggedSrc(null); }}
            onDoubleClick={() => changeZoom(zoom > 1 ? 1 : 2)}
          >
            {imageState === 'loading' && <span className="viewer-loading" role="status">Đang mở tư liệu…</span>}
            {imageState === 'error' && <div className="viewer-error" role="alert"><ImageOff size={30} /><p>Chưa thể tải ảnh này.</p><button type="button" onClick={() => { setImageState('loading'); imageRef.current.src = photo.src; }}>Thử lại</button></div>}
            <img
              key={photo.src}
              ref={imageRef}
              src={photo.src}
              alt={photo.title}
              className={`viewer-image${imageState === 'loaded' ? ' is-loaded' : ''}`}
              style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}
              onLoad={() => setImageState('loaded')}
              onError={() => setImageState('error')}
              draggable={false}
            />
          </div>
          <button type="button" className="viewer-arrow viewer-arrow-prev" onClick={onPrev} disabled={!hasPrev} aria-label="Ảnh trước" title="Ảnh trước (←)"><ChevronLeft size={26} /></button>
          <button type="button" className="viewer-arrow viewer-arrow-next" onClick={onNext} disabled={!hasNext} aria-label="Ảnh tiếp theo" title="Ảnh tiếp theo (→)"><ChevronRight size={26} /></button>
          {showInfo && (
            <aside className="viewer-info" id={infoId} aria-label="Thông tin tư liệu">
              <div className="viewer-info-heading"><span>THÔNG TIN TƯ LIỆU</span><button type="button" className="viewer-icon-button" onClick={() => setShowInfo(false)} aria-label="Ẩn thông tin ảnh"><X size={16} /></button></div>
              {photo.description && <p>{photo.description}</p>}
              <dl>
                <div><dt>Bộ sưu tập</dt><dd>{photo.albumName}</dd></div>
                <div><dt>Kích thước</dt><dd>{photo.resolution}</dd></div>
                <div><dt>Tên tệp</dt><dd>{photo.fileName}</dd></div>
              </dl>
            </aside>
          )}
        </div>

        <div className="viewer-caption"><span>{photo.albumName}</span><span>{photo.resolution}</span></div>
        {showFilmstrip && (
          <nav className="viewer-filmstrip" ref={filmstripRef} id={filmstripId} aria-label="Chọn ảnh trong bộ sưu tập">
            {allFilteredPhotos.map((item, index) => (
              <button key={item.id} type="button" className="viewer-thumbnail" onClick={() => onSelectPhoto(item)} aria-current={item.id === photo.id ? 'true' : undefined} aria-label={`Ảnh ${index + 1}: ${item.title}`} title={item.title}>
                <img src={`/previews/${item.id}.webp`} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = item.src; }} alt="" loading="lazy" draggable={false} />
              </button>
            ))}
          </nav>
        )}
        <p className="viewer-status" role="status">{notice || (isPlaying ? 'Đang trình chiếu · Mỗi ảnh 4 giây' : '← → Chuyển ảnh · + − Phóng to · Esc Đóng')}</p>
      </div>
    </dialog>
  );
}
