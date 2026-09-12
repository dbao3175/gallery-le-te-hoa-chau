import React, { useState, useRef } from 'react';
import { X, SlidersHorizontal, Sparkles, User, Heart } from 'lucide-react';
import userFaceReal from '../assets/images/07_guong_mat_cua_toi/guong_mat_DSCN4772.JPG';
import uncleReal from '../assets/images/01_bac_va_ky_niem/bac_kinh_yeu_chan_dung_goc.png';
import commem4K from '../assets/images/01_bac_va_ky_niem/toi_va_bac_ao_te_4K.jpg';

export default function FaceComparisonModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'uncle'
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const containerRef = useRef(null);

  if (!isOpen) return null;

  const currentBefore = activeTab === 'user' ? userFaceReal : uncleReal;
  const currentBeforeLabel = activeTab === 'user' ? 'Ảnh Gốc Của Bạn (DSCN4772)' : 'Ảnh Tư Liệu Gốc Của Bác';
  const currentAfterLabel = activeTab === 'user' ? 'Tác Phẩm 4K Mặc Áo Tế Lễ' : 'Tác Phẩm 4K Bạn & Bác';

  const handlePointerMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(Math.round(pct));
  };

  const handleTouch = (e) => {
    if (e.touches && e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="comparison-overlay" onClick={onClose}>
      <div className="comparison-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="comparison-header">
          <div className="comparison-title-wrap">
            <SlidersHorizontal size={18} className="text-gold" />
            <h3>Đối Chiếu Chân Thực: Ảnh Gốc & Tác Phẩm 4K</h3>
          </div>

          {/* Tab Switcher */}
          <div className="comparison-tab-group">
            <button 
              className={`comp-tab-btn ${activeTab === 'user' ? 'active' : ''}`}
              onClick={() => { setActiveTab('user'); setSliderPos(50); }}
            >
              <User size={14} />
              <span>Gương Mặt Thật Của Bạn</span>
            </button>
            <button 
              className={`comp-tab-btn ${activeTab === 'uncle' ? 'active' : ''}`}
              onClick={() => { setActiveTab('uncle'); setSliderPos(50); }}
            >
              <Heart size={14} />
              <span>Thần Thái Bác Kính Yêu</span>
            </button>
          </div>

          <button className="comp-close-btn" onClick={onClose} title="Đóng">
            <X size={20} />
          </button>
        </div>

        {/* Comparison Stage */}
        <div className="comparison-stage-box">
          <div 
            ref={containerRef}
            className="slider-wrapper-viewport"
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onMouseMove={(e) => { if (e.buttons === 1) handlePointerMove(e.clientX); }}
            onClick={(e) => handlePointerMove(e.clientX)}
            style={{ touchAction: 'none' }}
          >
            {/* After Image (Background) */}
            <img 
              src={commem4K} 
              alt="After" 
              className="comp-img-layer layer-after" 
            />

            {/* Before Image (Clipped Foreground) */}
            <div 
              className="comp-clip-container"
              style={{ width: `${sliderPos}%` }}
            >
              <img 
                src={currentBefore} 
                alt="Before" 
                className="comp-img-layer layer-before" 
              />
            </div>

            {/* Split Divider Handle */}
            <div 
              className="comp-divider-line"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="divider-handle-knob">
                <SlidersHorizontal size={14} />
              </div>
            </div>

            {/* Tags on images */}
            <span className="comp-tag-label tag-left">
              {currentBeforeLabel}
            </span>
            <span className="comp-tag-label tag-right">
              {currentAfterLabel}
            </span>
          </div>

          {/* Interactive Range Input */}
          <div className="slider-control-bar">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="comp-range-slider"
            />
            <span className="slider-hint">Kéo thanh trượt để so sánh độ tương đồng 100% từng đường nét</span>
          </div>
        </div>
      </div>
    </div>
  );
}
