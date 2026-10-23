import { ArrowDown, ArrowUpRight, MoveUpRight, Play } from 'lucide-react';

export default function HeroSpotlight({ photo, onOpen, onExplore, onWatchVideo }) {
  if (!photo) return null;
  return (
    <section className="heritage-hero container-wide" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> MỘT MIỀN DI SẢN. MỘT ĐỜI THƯƠNG NHỚ.</div>
        <h1 id="hero-heading">Nếp làng xưa.<br /><em>Ký ức còn mãi.</em></h1>
        <p className="hero-description">Có những khoảnh khắc đi qua, nhưng tình quê còn ở lại. Cùng gìn giữ nét đẹp lễ tế đình làng Hoà Châu qua từng thước phim, từng tấm ảnh.</p>
        <div className="hero-actions">
          <button className="button-primary" onClick={onExplore}>Khám phá triển lãm <ArrowUpRight size={17} /></button>
          <button className="button-play" onClick={onWatchVideo}><span className="play-circle"><Play size={13} fill="currentColor" /></span> Xem phim tư liệu</button>
        </div>
        <div className="hero-location"><span className="location-seal">HC</span><span>Đình làng Hoà Châu<small>Nơi nếp xưa được tiếp nối</small></span><span className="location-rule" /><span className="hero-edition">KÝ SỰ<br /><strong>2023</strong></span></div>
      </div>
      <div className="hero-art">
        <div className="hero-art-outline" aria-hidden="true" />
        <span className="hero-vertical-label">NÉT XƯA TRONG TỪNG KHUÔN HÌNH</span>
        <button className="hero-photo-button" onClick={() => onOpen(photo)} aria-label="Mở ảnh Tôi và Bác đứng cùng nhau">
          <img src="/previews/hero.webp" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = photo.src; }} alt="Hai thế hệ trong tà áo tế lễ xanh trước đình làng Hoà Châu" width={photo.width} height={photo.height} fetchPriority="high" />
          <span className="hero-image-label"><span>TÁC PHẨM KỶ NIỆM<span>Tôi & Bác, trước sân đình</span></span><span className="image-open"><MoveUpRight size={20} /></span></span>
        </button>
        <div className="hero-inset"><img src="/previews/hero-detail.webp" alt="Khoảnh khắc đoàn tế lễ trước sân đình" width="170" height="108" /><span>Một thoáng hồn quê.</span></div>
        <span className="hero-photo-note">Ảnh tạo hình kỷ niệm <span>01 / 183</span></span>
      </div>
      <button className="hero-scroll" onClick={onExplore} aria-label="Cuộn đến bộ sưu tập"><ArrowDown size={14} /> CUỘN ĐỂ KHÁM PHÁ</button>
    </section>
  );
}
