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
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '100%' }}>
      <button
        type="button"
        onClick={handleBookClick}
        style={{
          background: '#FF3B30',
          color: '#ffffff',
          fontWeight: 700,
          borderRadius: '9999px',
          padding: isCompact ? '8px 14px' : '10px 18px',
          fontSize: isCompact ? '0.84rem' : '0.88rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '6px',
          width: '100%',
          maxWidth: '220px',
          boxShadow: '0 3px 14px rgba(255, 59, 48, 0.35)',
          cursor: 'pointer',
          border: 'none',
          whiteSpace: 'nowrap',
          transition: 'all 0.15s ease',
          ...buttonStyle
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#FF5247';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = buttonStyle.background || '#FF3B30';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span>{label}</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
