import { Search, X, Columns3, LayoutGrid, Grid3X3, Camera, ScanLine } from 'lucide-react';

const names = { all: 'Tất cả', '01_bac_va_ky_niem': 'Bác & kỷ niệm', '02_anh_that_thu_thap': 'Ảnh thực tế', '03_doan_te_le': 'Đoàn tế lễ', '04_nghi_thuc_chinh_dien': 'Nghi thức', '05_chi_tiet_le_phuc': 'Lễ phục', '06_kho_tu_lieu_video': 'Khung hình phim', '07_guong_mat_cua_toi': 'Chân dung' };

export default function AlbumTabs({ albums, selectedAlbum, onSelectAlbum, searchQuery, onSearchChange, albumCounts, viewMode, onChangeViewMode, filterType, onChangeFilterType, totalMatching, favoritesOnly, onClearFavorites, sortOrder, onSortChange }) {
  return <div className="collection-controls">
    <div className="album-navigation" aria-label="Chọn chủ đề">
      {albums.map(album => <button key={album.id} className={`album-tab ${selectedAlbum === album.id ? 'active' : ''}`} onClick={() => onSelectAlbum(album.id)} aria-pressed={selectedAlbum === album.id}>{names[album.id] || album.name}<span>{albumCounts[album.id] || 0}</span></button>)}
    </div>
    <div className="gallery-toolbar">
      <label className="search-field"><Search size={17} strokeWidth={1.6} /><span className="sr-only">Tìm trong bộ sưu tập</span><input type="search" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Tìm một khoảnh khắc…" />{searchQuery && <button aria-label="Xoá từ khoá" onClick={() => onSearchChange('')}><X size={15} /></button>}</label>
      <div className="photo-filters" aria-label="Loại ảnh">{[{ id: 'all', label: 'Tất cả ảnh' }, { id: 'real', label: 'Ảnh thực tế', Icon: Camera }, { id: '4k', label: 'Độ nét cao', Icon: ScanLine }].map(({ id, label, Icon }) => <button key={id} aria-pressed={filterType === id} className={filterType === id ? 'active' : ''} onClick={() => onChangeFilterType(id)}>{Icon && <Icon size={13} />}{label}</button>)}</div>
      <div className="view-controls" aria-label="Bố cục ảnh">{[{ id: 'masonry', label: 'Tự nhiên', Icon: Columns3 }, { id: 'showcase', label: 'Ảnh lớn', Icon: LayoutGrid }, { id: 'compact', label: 'Lưới gọn', Icon: Grid3X3 }].map(({ id, label, Icon }) => <button key={id} className={viewMode === id ? 'active' : ''} aria-label={label} title={label} aria-pressed={viewMode === id} onClick={() => onChangeViewMode(id)}><Icon size={17} strokeWidth={1.5} /></button>)}</div>
    </div>
    <div className="gallery-results-bar"><p role="status"><strong>{totalMatching}</strong> khoảnh khắc{favoritesOnly && <button className="saved-filter" onClick={onClearFavorites}>Đã lưu <X size={12} /></button>}</p><label>Sắp xếp: <select value={sortOrder} onChange={e => onSortChange(e.target.value)} aria-label="Sắp xếp ảnh"><option value="curated">Tuyển chọn</option><option value="name">Tên A–Z</option></select></label></div>
  </div>;
}
