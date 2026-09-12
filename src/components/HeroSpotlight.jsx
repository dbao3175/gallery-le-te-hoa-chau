import React from 'react';
import { Maximize2, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function HeroSpotlight({ photo, onOpen, onOpenComparison }) {
  if (!photo) return null;

  return (
    <section className="hero-cinema-stage">
      <div className="container-wide">
        <div className="cinema-card">
          {/* Ambient Museum Spotlight Glow */}
          <div className="cinema-ambient-light"></div>

          <div className="cinema-content-split">
            {/* Left: Framed Artwork */}
            <div className="cinema-artwork-box">
              <div 
                className="museum-frame"
                onClick={() => onOpen(photo)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.title} 
                  className="artwork-img" 
                />
                
                <div className="artwork-pill-4k">
                  <Sparkles size={13} className="text-gold" />
                  <span>3584 × 4800 (4K Ultra HD)</span>
                </div>

                <div className="artwork-hover-prompt">
                  <Maximize2 size={28} />
                  <span>Phóng to chi tiết cực nét</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="cinema-narrative">
              <div className="editorial-meta-tag">
                <span className="gold-line"></span>
                <span>TÁC PHẨM TRỌNG TÂM • NĂM QUÝ MÃO 2023</span>
              </div>

              <h2 className="editorial-headline font-serif">
                Tôi & Bác Đứng Cùng Nhau
              </h2>
              
              <p className="editorial-lead">
                Bức ảnh phục dựng thiêng liêng lưu giữ tình cảm tôn kính sâu đậm với Bác trong Ban Tế Lễ Đình Làng Hoà Châu. Hai thế hệ cùng chung một lòng thành kính hướng về tổ tiên trong tà áo thụng xanh truyền thống.
              </p>

              {/* 3 Refined Artistry Markers */}
              <div className="artistry-markers">
                <div className="marker-item">
                  <div className="marker-dot"></div>
                  <div>
                    <strong>Thần Thái Bác Kính Yêu:</strong>
                    <span>Ánh mắt nhìn nghiêng xuống khiêm nhường từ tốn, nét mặt đầy đặn đôn hậu như trong ảnh tư liệu gốc của Bác.</span>
                  </div>
                </div>

                <div className="marker-item">
                  <div className="marker-dot"></div>
                  <div>
                    <strong>Gương Mặt Thật Đôn Hậu Của Bạn:</strong>
                    <span>Giữ nguyên vẹn 100% đường nét từ ảnh gốc [DSCN4772], nụ cười an hòa, thân hình mập mạp tự nhiên.</span>
                  </div>
                </div>

                <div className="marker-item">
                  <div className="marker-dot"></div>
                  <div>
                    <strong>Lễ Phục Chuẩn Đình Làng:</strong>
                    <span>Áo thụng gấm xanh cobalt dệt hoa triện tròn chữ Thọ, hai tay chắp kín trong ống tay buông dài, xà cạp và hài tế đế bánh chưng mũi vuông vểnh 90 độ.</span>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="editorial-actions">
                <button 
                  className="btn-museum-primary"
                  onClick={() => onOpen(photo)}
                >
                  <Maximize2 size={16} />
                  <span>Chiêm Ngưỡng Chuẩn 4K</span>
                </button>
                {onOpenComparison && (
                  <button 
                    className="btn-museum-secondary"
                    onClick={onOpenComparison}
                  >
                    <SlidersHorizontal size={16} className="text-gold" />
                    <span>Đối Chiếu Gương Mặt</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
