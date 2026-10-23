import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Heart, ImageOff, SearchX } from 'lucide-react';

function GalleryPhoto({ photo, onOpen, isFavorite, onToggleFavorite, index }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return <article className="photo-card" style={{ '--card-index': Math.min(index, 7) }}>
    <div className={`photo-image ${loaded ? 'is-loaded' : ''}`}>
      <button className="photo-open" onClick={() => onOpen(photo)} aria-label={`Xem ảnh: ${photo.title}`}>
        {!failed ? <img src={`/previews/${photo.id}.webp`} alt={photo.title} width={photo.width} height={photo.height} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} onError={e => { if (!e.currentTarget.dataset.fallback) { e.currentTarget.dataset.fallback = 'true'; e.currentTarget.src = photo.src; } else { setFailed(true); setLoaded(true); } }} /> : <span className="photo-error"><ImageOff size={28} />Không tải được ảnh<span>Nhấn để mở ảnh gốc</span></span>}
        <span className="photo-hover"><span>Xem khoảnh khắc</span><ArrowUpRight size={21} /></span>
      </button>
      <span className="photo-badge">{/^(cut\d|video_frame)/.test(photo.fileName) ? 'KHUNG HÌNH PHIM' : photo.isReal && photo.id !== '5' ? 'ẢNH TƯ LIỆU' : 'TẠO HÌNH KỶ NIỆM'}</span>
      <button className={`photo-save ${isFavorite ? 'is-saved' : ''}`} aria-label={`${isFavorite ? 'Bỏ lưu ảnh' : 'Lưu ảnh'}: ${photo.title}`} aria-pressed={isFavorite} onClick={() => onToggleFavorite(photo.id)}><Heart size={16} strokeWidth={1.6} fill={isFavorite ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="photo-caption"><span>{photo.albumName.replace(/ #\d+$/, '')}</span><button onClick={() => onOpen(photo)}>{photo.title.replace(/\s*\(.*?\)/g, '').replace(/ #\d+$/, '')}</button><small>{String(photo.id).padStart(3, '0')} <span>—</span> {photo.resolution}</small></div>
  </article>;
}

export default function MasonryGallery({ photos, viewMode, onOpenPhoto, favorites, onToggleFavorite, visibleCount, onShowMore, onReset, favoritesOnly }) {
  if (!photos.length) return <div className="gallery-empty"><SearchX size={34} strokeWidth={1} /><h3>{favoritesOnly ? 'Gìn giữ những điều bạn thích.' : 'Chưa tìm thấy khoảnh khắc này.'}</h3><p>{favoritesOnly ? 'Chạm vào trái tim trên mỗi tấm ảnh để lưu vào bộ sưu tập riêng trên thiết bị này.' : 'Thử từ khoá khác hoặc mở lại toàn bộ bộ sưu tập.'}</p><button className="button-primary" onClick={onReset}>Xem tất cả ảnh <ArrowUpRight size={16} /></button></div>;
  return <><div className={`gallery-grid view-${viewMode}`} key={viewMode}>{photos.slice(0, visibleCount).map((photo, index) => <GalleryPhoto key={photo.id} photo={photo} index={index} onOpen={onOpenPhoto} isFavorite={favorites.includes(photo.id)} onToggleFavorite={onToggleFavorite} />)}</div><div className="gallery-end"><span>Đã xem {Math.min(visibleCount, photos.length)} / {photos.length} khoảnh khắc</span>{visibleCount < photos.length ? <button className="button-outline" onClick={onShowMore}>Thêm những ký ức <ArrowDown size={16} /></button> : <p>Những ký ức đẹp luôn còn ở lại.</p>}</div></>;
}
