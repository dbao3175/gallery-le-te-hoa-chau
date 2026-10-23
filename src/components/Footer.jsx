import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Footer.css';

export default function Footer({ onBackToTop }) {
  return (
    <footer className="heritage-footer">
      <div className="container-wide">
        <div className="heritage-footer-main">
          <div className="heritage-footer-brand">
            <span className="heritage-footer-seal" aria-hidden="true">HC<span>2023</span></span>
            <div><p>Hoà Châu Ký Sự</p><span>Một miền quê. Một miền ký ức.</span></div>
          </div>
          <p className="heritage-footer-statement">Lưu giữ hôm nay.<br /><em>Trao lại mai sau.</em></p>
          <button className="heritage-footer-top" onClick={onBackToTop}><span>Về đầu trang</span><ArrowUpRight size={18} aria-hidden="true" /></button>
        </div>
        <div className="heritage-footer-bottom">
          <p>Trân trọng những người gìn giữ nếp xưa, và những ký ức còn mãi.</p>
          <span>Đình làng Hoà Châu · Lễ tế 2023</span>
        </div>
      </div>
    </footer>
  );
}
