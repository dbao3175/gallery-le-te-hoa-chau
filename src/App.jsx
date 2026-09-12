import React, { useState, useMemo } from 'react';
import { Camera, Film, SlidersHorizontal } from 'lucide-react';
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
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('gallery'); // 'gallery' | 'video'
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'real' | '4k'
  const [viewMode, setViewMode] = useState('masonry'); // 'masonry' | 'showcase' | 'compact'
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // The 4K Memorial centerpiece
  const memorialPhoto = useMemo(() => {
    return allPhotos.find(p => p.album === '01_bac_va_ky_niem' && p.fileName.includes('toi_va_bac_ao_te_4K')) ||
           allPhotos.find(p => p.album === '01_bac_va_ky_niem' && p.is4K) ||
           allPhotos[0];
  }, []);

  // Stats
  const stats = useMemo(() => {
    return {
      total: allPhotos.length,
      realPhotos: allPhotos.filter(p => p.isReal).length,
      processionPhotos: allPhotos.filter(p => p.album === '03_doan_te_le').length,
      ceremonyPhotos: allPhotos.filter(p => p.album === '04_nghi_thuc_chinh_dien').length,
      detailPhotos: allPhotos.filter(p => p.album === '05_chi_tiet_le_phuc').length,
      fourKPhotos: allPhotos.filter(p => p.is4K).length,
    };
  }, []);

  // Album counts
  const albumCounts = useMemo(() => {
    const counts = { all: allPhotos.length };
    albumCategories.forEach(alb => {
      if (alb.id !== 'all') {
        counts[alb.id] = allPhotos.filter(p => p.album === alb.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return allPhotos.filter(photo => {
      const matchAlbum = selectedAlbum === 'all' || photo.album === selectedAlbum;

      let matchFilter = true;
      if (filterType === 'real') matchFilter = photo.isReal;
      if (filterType === '4k') matchFilter = photo.is4K;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch = q === '' ||
        photo.title.toLowerCase().includes(q) ||
        photo.description.toLowerCase().includes(q) ||
        photo.fileName.toLowerCase().includes(q) ||
        photo.albumName.toLowerCase().includes(q);

      return matchAlbum && matchFilter && matchSearch;
    });
  }, [selectedAlbum, filterType, searchQuery]);

  // Lightbox handlers
  const openLightbox = (photo) => setLightboxPhoto(photo);
  const closeLightbox = () => setLightboxPhoto(null);

  const currentIndex = lightboxPhoto 
    ? filteredPhotos.findIndex(p => p.id === lightboxPhoto.id) 
    : -1;

  const prevPhoto = () => {
    if (currentIndex > 0) {
      setLightboxPhoto(filteredPhotos[currentIndex - 1]);
    }
  };

  const nextPhoto = () => {
    if (currentIndex < filteredPhotos.length - 1) {
      setLightboxPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-wrapper">
      <Header 
        activeSection={activeSection}
        onChangeSection={(sec) => {
          setActiveSection(sec);
          scrollToTop();
        }}
        onOpenComparison={() => setIsComparisonOpen(true)}
        totalPhotos={allPhotos.length}
      />

      <main className="main-content-flow">
        {/* Spotlight Masterpiece (Always visible as the soul of the site) */}
        <HeroSpotlight 
          photo={memorialPhoto} 
          onOpen={openLightbox} 
          onOpenComparison={() => setIsComparisonOpen(true)}
        />

        {/* Global Stats Overview */}
        <StatsBar stats={stats} />

        {/* SECTION 1: PHOTO GALLERY */}
        {activeSection === 'gallery' && (
          <>
            <div id="gallery-section-target">
              <AlbumTabs 
                albums={albumCategories}
                selectedAlbum={selectedAlbum}
                onSelectAlbum={setSelectedAlbum}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                albumCounts={albumCounts}
                viewMode={viewMode}
                onChangeViewMode={setViewMode}
                filterType={filterType}
                onChangeFilterType={setFilterType}
                totalMatching={filteredPhotos.length}
              />
            </div>

            <section className="gallery-viewport-area">
              <div className="container-wide">
                <MasonryGallery 
                  photos={filteredPhotos}
                  viewMode={viewMode}
                  onOpenPhoto={openLightbox}
                />
              </div>
            </section>
          </>
        )}

        {/* SECTION 2: VIDEO CINEMA THEATER */}
        {activeSection === 'video' && (
          <VideoTheater />
        )}
      </main>

      {/* Pro Lightbox Modal */}
      {lightboxPhoto && (
        <ProLightbox 
          photo={lightboxPhoto}
          allFilteredPhotos={filteredPhotos}
          onClose={closeLightbox}
          onSelectPhoto={setLightboxPhoto}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < filteredPhotos.length - 1}
        />
      )}

      {/* Before/After Face Comparison Modal */}
      <FaceComparisonModal 
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

      <Footer onBackToTop={scrollToTop} />

      {/* Mobile Bottom Navigation Dock */}
      <nav className="mobile-bottom-dock" aria-label="Điều hướng di động">
        <button
          className={`mobile-dock-tab ${activeSection === 'gallery' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('gallery');
            scrollToTop();
          }}
        >
          <Camera size={20} />
          <span>Triển Lãm</span>
        </button>

        <button
          className={`mobile-dock-tab ${activeSection === 'video' ? 'active' : ''}`}
          onClick={() => {
            setActiveSection('video');
            scrollToTop();
          }}
        >
          <Film size={20} />
          <span>Video (5 Hồi)</span>
        </button>

        <button
          className="mobile-dock-tab highlight-comp"
          onClick={() => setIsComparisonOpen(true)}
        >
          <SlidersHorizontal size={20} />
          <span>Đối Chiếu</span>
        </button>
      </nav>
    </div>
  );
}
