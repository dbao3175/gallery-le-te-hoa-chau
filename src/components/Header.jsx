import React from 'react';
import { Sparkles, Camera, Film, SlidersHorizontal } from 'lucide-react';

export default function Header({ 
  activeSection, 
  onChangeSection, 
  onOpenComparison, 
  totalPhotos 
}) {
  return (
    <header className="site-header-lux">
      <div className="container-wide header-row">
        <div className="brand-group" onClick={() => onChangeSection('gallery')}>
          <div className="brand-sigil font-cinzel">HC</div>
          <div>
            <div className="brand-eyebrow">DI SẢN TRUYỀN THỐNG • 2023</div>
            <h1 className="brand-headline font-cinzel">HOÀ CHÂU KÝ SỰ</h1>
          </div>
        </div>

        <nav className="header-nav-lux">
          <button 
            className={`nav-item-btn ${activeSection === 'gallery' ? 'highlight-btn' : ''}`} 
            onClick={() => onChangeSection('gallery')}
          >
            <Camera size={14} />
            <span>Triển Lãm Ảnh ({totalPhotos})</span>
          </button>

          <button 
            className={`nav-item-btn ${activeSection === 'video' ? 'highlight-btn' : ''}`} 
            onClick={() => onChangeSection('video')}
          >
            <Film size={14} className="text-gold" />
            <span>Phim Video Tư Liệu (5 Hồi)</span>
          </button>

          <button 
            className="nav-item-btn comp-btn-link" 
            onClick={onOpenComparison}
            title="So sánh đối chiếu ảnh thật và ảnh 4K"
          >
            <SlidersHorizontal size={14} className="text-gold" />
            <span>Đối Chiếu Gương Mặt</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
