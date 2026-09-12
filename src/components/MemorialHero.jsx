import React from 'react';
import { Sparkles, Maximize2, ShieldCheck, Heart, User, CheckCircle2 } from 'lucide-react';

export default function MemorialHero({ memorialPhoto, onOpenPhoto }) {
  if (!memorialPhoto) return null;

  return (
    <section className="memorial-hero-section">
      <div className="container">
        <div className="memorial-card">
          <div className="memorial-badge-bar">
            <span className="memorial-chip-primary">
              <Sparkles size={16} /> Tác Phẩm Kỷ Niệm Thiêng Liêng 4K
            </span>
            <span className="memorial-chip-secondary">
              <Heart size={14} className="text-crimson" /> Bác Kính Yêu & Bạn
            </span>
          </div>

          <div className="memorial-grid">
            {/* Visual presentation */}
            <div className="memorial-visual-col">
              <div 
                className="memorial-image-wrapper"
                onClick={() => onOpenPhoto(memorialPhoto)}
              >
                <img 
                  src={memorialPhoto.src} 
                  alt={memorialPhoto.title}
                  className="memorial-main-image" 
                />
                <div className="image-overlay-action">
                  <Maximize2 size={24} />
                  <span>Chạm để phóng to xem chuẩn 4K</span>
                </div>
                <div className="resolution-tag">3584 × 4800 (4K Ultra HD)</div>
              </div>
            </div>

            {/* Content & Details */}
            <div className="memorial-content-col">
              <h2 className="memorial-title">Tôi & Bác Đứng Cùng Nhau Trong Nghi Lễ Tế Đình</h2>
              <p className="memorial-quote">
                "Một tác phẩm phục dựng trang trọng, lưu giữ tình cảm tôn kính sâu đậm với Bác trong đoàn bô lão Đình làng Hoà Châu."
              </p>

              <div className="feature-checklist">
                <div className="feature-item">
                  <CheckCircle2 size={20} className="feature-icon" />
                  <div>
                    <strong>Thần thái Bác từ hòa, tôn nghiêm:</strong>
                    <p>Ánh mắt nhìn nghiêng xuống khiêm nhường, đầy đặn đôn hậu chuẩn xác theo ảnh tư liệu, mũ thêu loan phượng và dải lụa đỏ sau tai.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <CheckCircle2 size={20} className="feature-icon" />
                  <div>
                    <strong>Gương mặt thật & vóc dáng của bạn:</strong>
                    <p>Giữ trọn vẹn nét mặt thật, đôi mắt đôn hậu, nụ cười an hòa và thân hình đầy đặn tự nhiên, đứng cạnh Bác.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <CheckCircle2 size={20} className="feature-icon" />
                  <div>
                    <strong>Quy chuẩn lễ phục cung đình:</strong>
                    <p>Cả hai cùng mặc áo thụng xanh cobalt dệt hoa triện tròn chữ Thọ, hai tay chắp trước bụng giấu kín trong ống tay thụng buông dài, quần lụa trắng, xà cạp bó chân và hài tế đế bánh chưng mũi vuông vểnh 90 độ.</p>
                  </div>
                </div>
              </div>

              <div className="memorial-cta-group">
                <button 
                  className="btn-primary-gold"
                  onClick={() => onOpenPhoto(memorialPhoto)}
                >
                  <Maximize2 size={18} />
                  <span>Phóng To Chi Tiết 4K</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
