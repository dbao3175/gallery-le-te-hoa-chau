import { useState, useMemo, useEffect, useRef } from 'react';
import { Camera, Film, SlidersHorizontal, ArrowUpRight, Heart, Flower2 } from 'lucide-react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import HeroSpotlight from './components/HeroSpotlight';
import AlbumTabs from './components/AlbumTabs';
import MasonryGallery from './components/MasonryGallery';
import VideoTheater from './components/VideoTheater';
import FaceComparisonModal from './components/FaceComparisonModal';
import ProLightbox from './components/ProLightbox';
import Footer from './components/Footer';
import { albumCategories, allPhotos } from './data/galleryManifest';
import { videoList } from './data/videoData';
import './App.css';

const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
const isFilmFrame = photo => /^(cut\d|video_frame)/.test(photo.fileName);
const matchesAlbum = (photo, album) => album === 'all' || (album === '06_kho_tu_lieu_video' ? isFilmFrame(photo) : photo.album === album);
const featuredIds = ['4', '9', '80', '6', '113', '2', '34', '1'];
const curatedPhotos = [...featuredIds.map(id => allPhotos.find(photo => photo.id === id)).filter(Boolean), ...allPhotos.filter(photo => !featuredIds.includes(photo.id))];
const readFavorites = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('hoachau-favorites') || '[]');
    return Array.isArray(saved) ? saved.filter(id => typeof id === 'string' && allPhotos.some(photo => photo.id === id)) : [];
  } catch { return []; }
};

export default function App() {
  const [activeSection, setActiveSection] = useState('gallery');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('masonry');
  const [sortOrder, setSortOrder] = useState('curated');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [favorites, setFavorites] = useState(readFavorites);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);
  const collectionRef = useRef(null);
  const shouldScroll = useRef(false);
  const memorialPhoto = allPhotos.find(photo => photo.id === '4') || allPhotos[0];

  useEffect(() => {
    try { localStorage.setItem('hoachau-favorites', JSON.stringify(favorites)); } catch { /* Saving remains available in this session. */ }
  }, [favorites]);

  useEffect(() => {
    if (shouldScroll.current && collectionRef.current) {
      collectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      shouldScroll.current = false;
    }
  }, [activeSection, favoritesOnly]);

  const albumCounts = useMemo(() => {
    const photos = favoritesOnly ? allPhotos.filter(photo => favorites.includes(photo.id)) : allPhotos;
    return Object.fromEntries(albumCategories.map(album => [album.id, photos.filter(photo => matchesAlbum(photo, album.id)).length]));
  }, [favoritesOnly, favorites]);

  const filteredPhotos = useMemo(() => {
    const query = normalize(searchQuery.trim());
    const photos = curatedPhotos.filter(photo => matchesAlbum(photo, selectedAlbum)
      && (filterType === 'all' || (filterType === 'real' ? photo.isReal && photo.id !== '5' : photo.is4K))
      && (!favoritesOnly || favorites.includes(photo.id))
      && (!query || normalize([photo.title, photo.description, photo.fileName, photo.albumName].join(' ')).includes(query)));
    return sortOrder === 'name' ? [...photos].sort((a, b) => a.title.localeCompare(b.title, 'vi', { numeric: true })) : photos;
  }, [selectedAlbum, filterType, searchQuery, favoritesOnly, favorites, sortOrder]);

  const lightboxPhotos = lightboxPhoto && !filteredPhotos.some(photo => photo.id === lightboxPhoto.id) ? [lightboxPhoto, ...filteredPhotos] : filteredPhotos;
  const currentIndex = lightboxPhoto ? lightboxPhotos.findIndex(photo => photo.id === lightboxPhoto.id) : -1;
  const updateFilter = setter => value => { setter(value); setVisibleCount(24); };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const navigate = (section, top = false) => {
    if (top) { setActiveSection(section); setFavoritesOnly(false); scrollToTop(); return; }
    if (activeSection === section && !favoritesOnly) collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    else { shouldScroll.current = true; setActiveSection(section); setFavoritesOnly(false); }
  };
  const resetFilters = () => {
    setSelectedAlbum('all'); setFilterType('all'); setSearchQuery(''); setFavoritesOnly(false); setVisibleCount(24);
  };
  const openFavorites = () => {
    if (favoritesOnly) { collectionRef.current?.scrollIntoView({ behavior: 'smooth' }); return; }
    resetFilters();
    shouldScroll.current = true; setActiveSection('gallery'); setFavoritesOnly(true);
  };
  const toggleFavorite = id => setFavorites(previous => previous.includes(id) ? previous.filter(saved => saved !== id) : [...previous, id]);

  return <div className="site-wrapper">
    <a href="#collection" className="skip-link">Đến bộ sưu tập</a>
    <Header activeSection={activeSection} onChangeSection={navigate} onOpenComparison={() => setIsComparisonOpen(true)} favoriteCount={favorites.length} onOpenFavorites={openFavorites} favoritesOnly={favoritesOnly} />
    <main>
      <HeroSpotlight photo={memorialPhoto} onOpen={setLightboxPhoto} onExplore={() => navigate('gallery')} onWatchVideo={() => navigate('video')} />
      <StatsBar stats={{ total: allPhotos.length }} albumCount={albumCategories.length - 1} videoCount={videoList.length} onExplore={() => navigate('gallery')} />
      <section className="collection-section container-wide" id="collection" ref={collectionRef} aria-labelledby="collection-heading">
        <div className="collection-heading">
          <div><div className="eyebrow"><span className="section-number">01</span> / {activeSection === 'gallery' ? 'PHÒNG TRIỂN LÃM' : 'THƯỚC PHIM LÀNG'}</div><h2 id="collection-heading">{activeSection === 'gallery' ? favoritesOnly ? 'Những ký ức đã lưu' : 'Những mảnh ký ức' : 'Nếp xưa trong chuyển động'}<span>.</span></h2></div>
          <p>{activeSection === 'gallery' ? 'Từ sân đình rộn ràng đến phút giây thành kính. Mời bạn dừng lại, ngắm nhìn và cảm nhận.' : 'Nhịp bước đoàn tế, tiếng chiêng trống và những nghi lễ được gìn giữ qua bao thế hệ.'}</p>
        </div>
        {activeSection === 'gallery' ? <>
          <AlbumTabs albums={albumCategories} selectedAlbum={selectedAlbum} onSelectAlbum={updateFilter(setSelectedAlbum)} searchQuery={searchQuery} onSearchChange={updateFilter(setSearchQuery)} albumCounts={albumCounts} viewMode={viewMode} onChangeViewMode={setViewMode} filterType={filterType} onChangeFilterType={updateFilter(setFilterType)} totalMatching={filteredPhotos.length} favoritesOnly={favoritesOnly} onClearFavorites={() => setFavoritesOnly(false)} sortOrder={sortOrder} onSortChange={updateFilter(setSortOrder)} />
          <MasonryGallery photos={filteredPhotos} viewMode={viewMode} onOpenPhoto={setLightboxPhoto} favorites={favorites} onToggleFavorite={toggleFavorite} visibleCount={visibleCount} onShowMore={() => setVisibleCount(count => count + 24)} onReset={resetFilters} favoritesOnly={favoritesOnly} />
          <aside className="collection-note"><Flower2 className="note-flower" size={38} strokeWidth={1} aria-hidden="true" /><div><h3>Ký ức thật. Tình cảm vẹn nguyên.</h3><p>Bộ sưu tập gồm ảnh tư liệu và ảnh tạo hình kỷ niệm. Mỗi hình ảnh đều có nhãn để bạn dễ nhận biết.</p></div><button onClick={() => setIsComparisonOpen(true)}>Khám phá góc đối chiếu <ArrowUpRight size={17} /></button></aside>
        </> : <VideoTheater />}
      </section>
    </main>
    {lightboxPhoto && <ProLightbox photo={lightboxPhoto} allFilteredPhotos={lightboxPhotos} onClose={() => setLightboxPhoto(null)} onSelectPhoto={setLightboxPhoto} onPrev={() => currentIndex > 0 && setLightboxPhoto(lightboxPhotos[currentIndex - 1])} onNext={() => currentIndex < lightboxPhotos.length - 1 && setLightboxPhoto(lightboxPhotos[currentIndex + 1])} hasPrev={currentIndex > 0} hasNext={currentIndex < lightboxPhotos.length - 1} />}
    <FaceComparisonModal isOpen={isComparisonOpen} onClose={() => setIsComparisonOpen(false)} />
    <Footer onBackToTop={scrollToTop} />
    <nav className="mobile-nav" aria-label="Điều hướng di động">
      <button className={activeSection === 'gallery' && !favoritesOnly ? 'active' : ''} onClick={() => navigate('gallery')}><Camera size={19} /><span>Triển lãm</span></button>
      <button className={activeSection === 'video' ? 'active' : ''} onClick={() => navigate('video')}><Film size={19} /><span>Phim tư liệu</span></button>
      <button onClick={() => setIsComparisonOpen(true)}><SlidersHorizontal size={19} /><span>Đối chiếu</span></button>
      <button className={favoritesOnly ? 'active' : ''} onClick={openFavorites}><Heart size={19} /><span>Đã lưu{favorites.length > 0 ? ` (${favorites.length})` : ''}</span></button>
    </nav>
  </div>;
}
