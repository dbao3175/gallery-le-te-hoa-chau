import { ArrowUpRight, Heart } from 'lucide-react';

export function HeritageMark({ className = '' }) {
  return <svg className={className} width="42" height="44" viewBox="0 0 42 44" fill="none" aria-hidden="true"><path d="M4 17c7 0 12-4 17-9 5 5 10 9 17 9M2 21h38M6 26h30M10 26v12m22-12v12M6 39h30M16 26v13m10-13v13M21 3v6M8 16v5m26-5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M17 33h8" stroke="currentColor" strokeWidth="1.4"/></svg>;
}

export default function Header({ activeSection, onChangeSection, onOpenComparison, favoriteCount, onOpenFavorites, favoritesOnly }) {
  return (
    <header className="site-header">
      <div className="container-wide header-row">
        <button className="brand" onClick={() => onChangeSection('gallery', true)} aria-label="Hoà Châu Ký Sự — về đầu trang">
          <HeritageMark />
          <span><strong>Hoà Châu Ký Sự<span className="brand-dot">.</span></strong><small>DI SẢN & KÝ ỨC LÀNG</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          <button className={activeSection === 'gallery' && !favoritesOnly ? 'nav-link active' : 'nav-link'} onClick={() => onChangeSection('gallery')}>Triển lãm ảnh</button>
          <button className={activeSection === 'video' ? 'nav-link active' : 'nav-link'} onClick={() => onChangeSection('video')}>Phim tư liệu</button>
          <button className="nav-link" onClick={onOpenComparison}>Góc đối chiếu <ArrowUpRight size={13} /></button>
        </nav>
        <button className={`saved-button ${favoritesOnly ? 'is-active' : ''}`} onClick={onOpenFavorites} aria-label={`Ảnh đã lưu: ${favoriteCount}`} aria-pressed={favoritesOnly}>
          <Heart size={17} strokeWidth={1.6} /><span>Đã lưu</span><span className="saved-count">{favoriteCount}</span>
        </button>
      </div>
    </header>
  );
}
