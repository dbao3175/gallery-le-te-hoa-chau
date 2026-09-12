import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onBackToTop }) {
  return (
    <footer className="museum-footer">
      <div className="container-wide footer-inner">
        <div className="footer-top-brand">
          <span className="footer-brand-title font-cinzel">HOÀ CHÂU KÝ SỰ</span>
          <span className="footer-brand-sep">•</span>
          <span className="footer-brand-sub">Kho Tàng Di Sản & Kỷ Niệm Lễ Tế Bô Lão Đình Làng Hoà Châu</span>
        </div>

        <p className="footer-tribute-msg">
          Kính dâng lòng tôn kính và tri ân sâu sắc đến chư vị bô lão và các Bác trong Ban Tế Lễ Đình Làng Hoà Châu 2023.
        </p>

        <div className="footer-bottom-bar">
          <span className="footer-copy">
            © 2023 - 2026 HOÀ CHÂU KÝ SỰ. 183 tác phẩm tư liệu được lưu trữ nguyên bản trong mã nguồn <code>src/assets/images</code>.
          </span>
          <button className="footer-top-link" onClick={onBackToTop}>
            <span>Đầu Trang</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
