import React from 'react';
import { Landmark, Sparkles, BookOpen, Heart } from 'lucide-react';

export default function Navbar({ totalPhotos, onSelectMemorial }) {
  return (
    <header className="site-header">
      <div className="container header-container">
        <div className="header-brand">
          <div className="brand-logo-container">
            <Landmark className="brand-icon" size={28} />
          </div>
          <div>
            <div className="brand-badge">DI SẢN VĂN HÓA ĐÀ NẴNG</div>
            <h1 className="brand-title">ĐÌNH LÀNG HOÀ CHÂU 2023</h1>
            <p className="brand-sub">Không Gian Triển Lãm Tư Liệu Lễ Tế Truyền Thống & Ban Bô Lão</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="btn-memorial-shortcut"
            onClick={onSelectMemorial}
          >
            <Sparkles size={16} className="text-gold" />
            <span>Xem Ảnh Kỷ Niệm 4K</span>
          </button>
          <div className="photo-count-pill">
            <BookOpen size={16} />
            <span>{totalPhotos} Tư Liệu Quý</span>
          </div>
        </div>
      </div>
    </header>
  );
}
