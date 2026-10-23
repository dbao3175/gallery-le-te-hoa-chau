import React, { useState } from 'react';
import { ArrowRight, Film, Play, RotateCcw } from 'lucide-react';
import { videoList } from '../data/videoData';
import './VideoTheater.css';

export default function VideoTheater() {
  const [selectedVideo, setSelectedVideo] = useState(videoList[0]);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const selectedIndex = videoList.findIndex((video) => video.id === selectedVideo.id);

  const selectVideo = (video) => {
    if (video.id === selectedVideo.id) return;
    setSelectedVideo(video);
    setIsPlayerOpen(false);
    setVideoError(false);
  };

  const openPlayer = () => {
    setVideoError(false);
    setIsPlayerOpen(true);
  };

  return (
    <section className="archive-film" id="video-section-target" aria-labelledby="film-heading">
      <div className="container-wide">
        <div className="archive-film-heading">
          <div>
            <p className="archive-film-eyebrow"><Film size={15} aria-hidden="true" /> Thước phim tư liệu</p>
            <h2 id="film-heading">Một ngày lễ,<br /><em>vẹn nguyên ký ức.</em></h2>
          </div>
          <p className="archive-film-intro">Theo từng bước chân đoàn tế lễ, lắng nghe tiếng chiêng trống và trở về với không khí ngày hội đình làng Hoà Châu năm 2023.</p>
        </div>

        <div className="archive-film-layout">
          <div className="archive-film-main">
            <div className="archive-film-screen">
              {isPlayerOpen && !videoError ? (
                <video
                  key={selectedVideo.id}
                  className="archive-film-player"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  src={selectedVideo.src}
                  poster={selectedVideo.poster}
                  onError={() => setVideoError(true)}
                  aria-label={selectedVideo.title}
                >
                  Trình duyệt của bạn không hỗ trợ phát video.
                </video>
              ) : (
                <div className="archive-film-cover">
                  <img src={selectedVideo.poster} alt={`Khung hình từ ${selectedVideo.title}`} />
                  <span className="archive-film-cover-label">Hoà Châu · 2023</span>
                  <div className="archive-film-cover-action">
                    <button className="archive-film-play" onClick={openPlayer} aria-label={videoError ? 'Thử phát lại video' : `Phát ${selectedVideo.title}`}>
                      {videoError ? <RotateCcw size={24} aria-hidden="true" /> : <Play size={25} fill="currentColor" aria-hidden="true" />}
                    </button>
                    <span>{videoError ? 'Thử phát lại' : 'Xem thước phim'}</span>
                  </div>
                  <span className="archive-film-cover-episode">{selectedVideo.episode}</span>
                </div>
              )}
            </div>

            {videoError && (
              <p className="archive-film-notice" role="status">Video hiện chưa khả dụng. Bạn vẫn có thể khám phá các khung hình trong thư viện ảnh hoặc thử phát lại sau.</p>
            )}

            <div className="archive-film-detail">
              <div className="archive-film-meta"><span>{selectedVideo.episode}</span><span>Tư liệu năm 2023</span><span>{selectedVideo.quality}</span></div>
              <h3>{selectedVideo.title}</h3>
              <p className="archive-film-description">{selectedVideo.description}</p>
              <div className="archive-film-highlights">
                <p>Trong thước phim</p>
                <ul>
                  {selectedVideo.highlights.map((highlight) => (
                    <li key={highlight}><span aria-hidden="true">—</span>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="archive-film-playlist" aria-label="Danh sách thước phim">
            <div className="archive-film-playlist-heading"><h3>Các thước phim</h3><span>{String(selectedIndex + 1).padStart(2, '0')} / {String(videoList.length).padStart(2, '0')}</span></div>
            <div className="archive-film-episodes">
              {videoList.map((video, index) => {
                const isSelected = video.id === selectedVideo.id;
                return (
                  <button className={`archive-film-episode${isSelected ? ' is-selected' : ''}`} key={video.id} onClick={() => selectVideo(video)} aria-pressed={isSelected}>
                    <div className="archive-film-thumbnail"><img src={video.poster} alt="" loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div>
                    <div className="archive-film-episode-info"><span>{video.episode}</span><h4>{video.title}</h4><p>{isSelected ? 'Đang chọn' : 'Chọn thước phim'}<ArrowRight size={12} aria-hidden="true" /></p></div>
                  </button>
                );
              })}
            </div>
            <p className="archive-film-playlist-note">Những thanh âm và hình ảnh của một ngày hội làng, được gìn giữ để cùng trở về.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
