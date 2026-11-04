import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BookDropdown({ 
  bike, 
  buttonText, 
  buttonStyle = {},
  onShowToast,
  onStartBooking,
  size = "normal" // "normal" or "compact"
}) {
  const { t } = useLanguage();
  const label = buttonText || t('bookThisBike');
  const isCompact = size === "compact";

  const handleBookClick = (e) => {
    e.stopPropagation();
    if (onStartBooking && bike) {
      onStartBooking(bike);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <button
        type="button"
//<<<<<<< feature/client-requirements
        onClick={handleBookClick}
//=======
//         onClick={(e) => {
//           e.stopPropagation();
//           if (onStartBooking && bike) {
//             onStartBooking(bike);
//           } else {
//             toggleDropdown(!isOpen);
//           }
//         }}
// >>>>>>> app
        style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
          color: '#ffffff',
          fontWeight: 600,
          borderRadius: '9999px',
          padding: '10px 14px',
          fontSize: '0.84rem',
          letterSpacing: '0.01em',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '6px',
          width: '100%',
          boxSizing: 'border-box',
          boxShadow: '0 2px 10px rgba(37, 99, 235, 0.25)',
          cursor: 'pointer',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          ...buttonStyle
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.35)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = buttonStyle.background || 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(37, 99, 235, 0.25)';
        }}
      >
        <span>{label}</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
