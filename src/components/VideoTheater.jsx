import React, { useState, useRef } from 'react';
import { Play, Film, CheckCircle2, Sparkles, Volume2, Maximize } from 'lucide-react';
import { videoList } from '../data/videoData';

export default function VideoTheater() {
  const [selectedVideo, setSelectedVideo] = useState(videoList[0]);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const handleSelect = (vid) => {
    setSelectedVideo(vid);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy until user gesture
      });
    }
  };

  return (
    <section className="video-cinema-section">
      <div className="container-wide">
        {/* Section Header */}
        <div className="cinema-header-meta">
          <div className="cinema-meta-tag">
            <Film size={14} className="text-gold" />
            <span>PHÒNG CHIẾU PHIM TƯ LIỆU GỐC • 5 HỒI ĐIỆN ẢNH</span>
          </div>
          <h2 className="cinema-section-title font-serif">
            Thước Phim Lễ Tế Đình Làng Hoà Châu 2023
          </h2>
          <p className="cinema-section-sub">
            Trực tiếp theo dõi từng hồi nghi lễ, tiếng chiêng trống linh thiêng và nét tôn nghiêm của các Bác bô lão qua các đoạn phim ghi hình thực tế.
          </p>
        </div>

        {/* Master Cinema Stage */}
        <div className="cinema-theater-grid">
          {/* Main Player Column */}
          <div className="main-player-col">
            <div className="player-viewport-box">
              {videoError ? (
                <div className="video-cloud-notice">
                  <div className="cloud-notice-icon font-cinzel">HC</div>
                  <h4 className="cloud-notice-title">Tư Liệu Video Gốc (Dung Lượng 2.5 GB)</h4>
                  <p className="cloud-notice-desc">
                    Do giới hạn dung lượng tải lên 100MB của GitHub & Vercel, các tệp video gốc 4K/FullHD được phát mượt mà khi chạy cục bộ (Localhost). Khi đưa lên Vercel, bạn có thể tải video lên YouTube (chế độ Không Công Khai) hoặc Google Drive rồi gắn link để xem trực tuyến mọi nơi.
                  </p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  key={selectedVideo.src}
                  controls
                  playsInline
                  preload="metadata"
                  poster={selectedVideo.poster}
                  className="main-html5-video"
                  onError={() => setVideoError(true)}
                >
                  <source src={selectedVideo.src} type={selectedVideo.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                  Trình duyệt của bạn không hỗ trợ phát video HTML5.
                </video>
              )}
            </div>

            {/* Video Meta Info */}
            <div className="player-info-deck">
              <div className="deck-title-row">
                <div>
                  <div className="deck-episode-pill">
                    <span>{selectedVideo.episode}</span>
                    <span className="deck-quality-tag">{selectedVideo.quality}</span>
                    <span className="deck-size-tag">{selectedVideo.size}</span>
                  </div>
                  <h3 className="deck-video-title">{selectedVideo.title}</h3>
                </div>
              </div>

              <p className="deck-desc">{selectedVideo.description}</p>

              {/* Highlights List */}
              <div className="deck-highlights-box">
                <span className="hl-label">Điểm nổi bật trong hồi này:</span>
                <div className="hl-grid">
                  {selectedVideo.highlights.map((hl, i) => (
                    <div key={i} className="hl-item">
                      <CheckCircle2 size={14} className="text-gold" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Column */}
          <div className="playlist-sidebar-col">
            <div className="playlist-header">
              <span className="playlist-heading">Danh Sách 5 Tập Phim</span>
              <span className="playlist-count">5 Hồi</span>
            </div>

            <div className="playlist-cards-list">
              {videoList.map((vid) => {
                const isActive = vid.id === selectedVideo.id;
                return (
                  <div
                    key={vid.id}
                    className={`playlist-item-card ${isActive ? 'is-playing' : ''}`}
                    onClick={() => handleSelect(vid)}
                  >
                    <div className="item-poster-frame">
                      <img src={vid.poster} alt={vid.title} className="item-poster-img" />
                      <div className="item-play-icon-overlay">
                        <Play size={18} fill={isActive ? "#d4af37" : "#fff"} />
                      </div>
                      <span className="item-ep-badge">{vid.episode}</span>
                    </div>

                    <div className="item-text-info">
                      <h4 className="item-title">{vid.title}</h4>
                      <p className="item-sub">{vid.subtitle}</p>
                      <div className="item-meta-tags">
                        <span className="meta-size">{vid.size}</span>
                        <span className="meta-sep">•</span>
                        <span className="meta-quality">{vid.quality}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
