import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
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
    <div style={{ display: 'inline-block', width: isCompact ? '100%' : 'auto' }}>
      <button
        type="button"
        onClick={handleBookClick}
        style={{
          background: '#FF3B30',
          color: '#ffffff',
          fontWeight: 700,
          borderRadius: '9999px',
          padding: isCompact ? '10px 16px' : '14px 26px',
          fontSize: isCompact ? '0.88rem' : '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          boxShadow: '0 4px 18px rgba(255, 59, 48, 0.4)',
          cursor: 'pointer',
          border: 'none',
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
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
