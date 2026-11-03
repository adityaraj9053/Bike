import React from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AgeVerificationModal({ isOpen, onClose, onConfirm, onCancel }) {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000 }}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '460px', 
          border: '2px solid rgba(255, 59, 48, 0.4)',
          boxShadow: '0 20px 50px rgba(255, 59, 48, 0.25)',
          background: '#0e1422'
        }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(255, 59, 48, 0.15)',
            border: '2px solid #FF3B30',
            color: '#FF3B30',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '1.6rem',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)'
          }}>
            18+
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
            {t('ageTitle')}
          </h3>
          <p style={{ color: '#FF3B30', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('ageNotice')}
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          fontSize: '0.92rem',
          lineHeight: '1.55',
          color: '#cbd5e1'
        }}>
          <p>{t('ageDescription')}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', color: '#F59E0B', fontSize: '0.85rem', fontWeight: 600 }}>
            <AlertTriangle size={16} />
            <span>
              {language === 'hi' 
                ? 'बाइक डिलीवरी के समय मूल ड्राइविंग लाइसेंस जांचा जाएगा।' 
                : 'Physical Driving License verification is mandatory at hub pickup.'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            type="button"
            className="btn-primary"
            style={{ 
              width: '100%', 
              padding: '14px', 
              fontSize: '1rem', 
              fontWeight: 700,
              background: '#FF3B30',
              color: '#ffffff',
              boxShadow: '0 4px 18px rgba(255, 59, 48, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onClick={handleConfirm}
          >
            <CheckCircle2 size={18} />
            <span>{t('ageConfirm')}</span>
          </button>

          <button
            type="button"
            className="btn-outline"
            style={{ width: '100%', padding: '12px', fontSize: '0.9rem', color: '#94A3B8' }}
            onClick={handleCancel}
          >
            {t('ageCancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
