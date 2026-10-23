import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import userFaceReal from '../assets/images/07_guong_mat_cua_toi/guong_mat_DSCN4772.JPG';
import uncleReal from '../assets/images/01_bac_va_ky_niem/bac_kinh_yeu_chan_dung_goc.png';
import commemorativeArtwork from '../assets/images/01_bac_va_ky_niem/toi_va_bac_ao_te_4K.jpg';
import './Viewer.css';

export default function FaceComparisonModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('user');
  const dialogRef = useRef(null);
  const tabRefs = useRef([]);
  const titleId = useId();
  const descriptionId = useId();
  const panelId = useId();
  const tabs = [
    { id: 'user', label: 'Chân dung của tôi', src: userFaceReal, caption: 'Ảnh chân dung · DSCN4772', alt: 'Chân dung gốc của chủ nhân bộ sưu tập' },
    { id: 'uncle', label: 'Chân dung của Bác', src: uncleReal, caption: 'Ảnh tư liệu · Bác trong đoàn tế lễ', alt: 'Ảnh tư liệu chân dung Bác trong áo tế lễ' },
  ];
  const selected = tabs.find((tab) => tab.id === activeTab);

  useEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  const handleTabKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') nextIndex = 1 - index;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="compare-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="compare-shell">
        <header className="compare-header">
          <div>
            <span className="viewer-eyebrow">GÓC NHÌN SÁNG TẠO</span>
            <h2 id={titleId}>Từ tư liệu đến tác phẩm</h2>
          </div>
          <button type="button" className="viewer-icon-button viewer-close" onClick={onClose} aria-label="Đóng đối chiếu ảnh" title="Đóng (Esc)" autoFocus><X size={20} /></button>
        </header>
        <p className="compare-intro" id={descriptionId}>Đặt chân dung tham chiếu cạnh tác phẩm tạo hình, để nhìn lại những nét thân quen trong một khung cảnh mới.</p>

        <div className="compare-tabs" role="tablist" aria-label="Chọn chân dung tham chiếu">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`${panelId}-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={tab.id === activeTab}
              aria-controls={panelId}
              tabIndex={tab.id === activeTab ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >{tab.label}</button>
          ))}
        </div>

        <div className="compare-panels" role="tabpanel" id={panelId} aria-labelledby={`${panelId}-${activeTab}`}>
          <figure className="compare-figure">
            <div className="compare-figure-label"><span>01 / TƯ LIỆU THAM CHIẾU</span><span>Ảnh gốc</span></div>
            <div className="compare-image-well"><img key={selected.src} src={selected.src} alt={selected.alt} /></div>
            <figcaption>{selected.caption}</figcaption>
          </figure>
          <span className="compare-connector" aria-hidden="true"><ArrowUpRight size={21} /></span>
          <figure className="compare-figure">
            <div className="compare-figure-label"><span>02 / TÁC PHẨM TẠO HÌNH</span><span>3584 × 4800</span></div>
            <div className="compare-image-well"><img src={commemorativeArtwork} alt="Tác phẩm tạo hình hai người trong áo tế lễ xanh đứng trước đình làng" /></div>
            <figcaption>Tôi và Bác · Kỷ niệm trong áo tế lễ</figcaption>
          </figure>
        </div>
        <p className="compare-note">Tác phẩm đã được tạo hình và có bố cục khác ảnh tham chiếu.</p>
      </div>
    </dialog>
  );
}
