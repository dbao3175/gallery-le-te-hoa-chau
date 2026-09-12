import React from 'react';
import { Maximize2, Sparkles, Heart } from 'lucide-react';

export default function PhotoCard({ photo, onOpen }) {
  return (
    <div className={`photo-card ${photo.highlight ? 'highlight-card' : ''}`}>
      <div className="card-media-box" onClick={() => onOpen(photo)}>
        <img 
          src={photo.src} 
          alt={photo.title} 
          loading="lazy"
          className="card-image" 
        />
        <div className="card-hover-overlay">
          <button className="overlay-btn zoom-btn" title="Phóng to">
            <Maximize2 size={20} />
          </button>
        </div>

        <div className="card-top-badges">
          <span className={`badge-pill badge-${photo.category}`}>
            {photo.badge}
          </span>
          {photo.category === 'ky_niem' && (
            <span className="badge-pill badge-gold">
              <Sparkles size={12} /> 4K Ultra HD
            </span>
          )}
          {photo.category === 'bac_kinh_yeu' && (
            <span className="badge-pill badge-crimson">
              <Heart size={12} /> Bác Kính Yêu
            </span>
          )}
        </div>
      </div>

      <div className="card-body" onClick={() => onOpen(photo)}>
        <h3 className="card-title" title={photo.title}>{photo.title}</h3>
        <p className="card-desc">{photo.description}</p>
        <div className="card-footer-info">
          <span className="photo-date">{photo.date}</span>
          <span className="photo-file">{photo.fileName}</span>
        </div>
      </div>
    </div>
  );
}
