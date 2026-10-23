import { ArrowUpRight } from 'lucide-react';

export default function StatsBar({ stats, albumCount, videoCount, onExplore }) {
  return <div className="archive-strip"><div className="container-wide archive-strip-inner">
    <p>Mỗi tấm ảnh, một câu chuyện.<br /><em>Mỗi câu chuyện, một phần di sản.</em></p>
    <div className="archive-numbers"><div><strong>{stats.total}</strong><span>Tấm ảnh lưu giữ</span></div><div><strong>{String(albumCount).padStart(2, '0')}</strong><span>Chủ đề ký ức</span></div><div><strong>{String(videoCount).padStart(2, '0')}</strong><span>Phần phim tư liệu</span></div></div>
    <button className="strip-link" onClick={onExplore}>Dạo bước cùng ký ức <ArrowUpRight size={18} /></button>
  </div></div>;
}
