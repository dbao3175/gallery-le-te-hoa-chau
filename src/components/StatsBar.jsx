import React from 'react';

export default function StatsBar({ stats }) {
  return (
    <div className="stats-ticker-section">
      <div className="container-wide">
        <div className="stats-ticker-row">
          <div className="ticker-item">
            <span className="ticker-num">183</span>
            <span className="ticker-txt">Tư Liệu Lưu Trữ</span>
          </div>
          <div className="ticker-divider">/</div>
          <div className="ticker-item highlight-item">
            <span className="ticker-num">{stats.realPhotos || 66}</span>
            <span className="ticker-txt">Ảnh Chụp Thực Tế</span>
          </div>
          <div className="ticker-divider">/</div>
          <div className="ticker-item">
            <span className="ticker-num">{stats.processionPhotos || 57}</span>
            <span className="ticker-txt">Đoàn Tế Bô Lão</span>
          </div>
          <div className="ticker-divider">/</div>
          <div className="ticker-item">
            <span className="ticker-num">{stats.ceremonyPhotos || 40}</span>
            <span className="ticker-txt">Nghi Thức Chính Điện</span>
          </div>
          <div className="ticker-divider">/</div>
          <div className="ticker-item">
            <span className="ticker-num">3584 × 4800</span>
            <span className="ticker-txt">Chuẩn 4K Siêu Nét</span>
          </div>
        </div>
      </div>
    </div>
  );
}
