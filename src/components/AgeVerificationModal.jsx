import React, { useState } from 'react';
import { X, Calendar, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AgeVerificationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  onCancel,
  userEmail = ''
}) {
  const { t, language } = useLanguage();
  const [dob, setDob] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Calculate age accurately from date of birth
  const calculateAge = (birthDateStr) => {
    if (!birthDateStr) return 0;
    const today = new Date();
    const birthDate = new Date(birthDateStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleVerifyAge = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!dob) {
      setErrorMsg(
        language === 'hi' 
          ? 'कृपया अपनी जन्म तिथि (Date of Birth) दर्ज करें।' 
          : 'Please select your Date of Birth to verify.'
      );
      return;
    }

    const calculatedAge = calculateAge(dob);

    if (calculatedAge < 18) {
      setErrorMsg(
        language === 'hi'
          ? `अस्वीकृत: आपकी आयु ${calculatedAge} वर्ष है। मोटरबाइक रेंटल के लिए न्यूनतम आयु 18+ अनिवार्य है।`
          : `Underage: You are ${calculatedAge} years old. You must be strictly 18+ to rent motorcycles.`
      );
      return;
    }

    // 18+ verified successfully!
    onConfirm(dob);
    onClose();
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  // Max selectable date is today (cannot pick future birth date)
  const todayStr = new Date().toISOString().split('T')[0];

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
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
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

        {userEmail && (
          <div style={{
            background: 'rgba(0, 163, 255, 0.08)',
            border: '1px solid rgba(0, 163, 255, 0.2)',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '0.86rem',
            color: '#38BDF8',
            textAlign: 'center'
          }}>
            <span>Verifying rider for: <strong>{userEmail}</strong></span>
          </div>
        )}

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          fontSize: '0.9rem',
          lineHeight: '1.55',
          color: '#cbd5e1'
        }}>
          <p style={{ margin: 0 }}>{t('ageDescription')}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', color: '#F59E0B', fontSize: '0.82rem', fontWeight: 600 }}>
            <AlertTriangle size={15} style={{ flexShrink: 0 }} />
            <span>
              {language === 'hi' 
                ? 'मूल ड्राइविंग लाइसेंस पिकअप के समय अनिवार्य है।' 
                : 'Physical original driving license will be verified during vehicle handover.'}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#EF4444',
            border: '1px solid #EF4444',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '0.86rem',
            marginBottom: '16px',
            fontWeight: 600
          }}>
            {errorMsg}
          </div>
        )}

        {/* Date of Birth Verification Form */}
        <form onSubmit={handleVerifyAge} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} color="#00A3FF" />
              <span>{language === 'hi' ? 'अपनी जन्म तिथि (DOB) दर्ज करें' : 'ENTER YOUR DATE OF BIRTH (DOB)'}</span>
            </label>
            <input
              type="date"
              className="form-input"
              max={todayStr}
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              required
              autoFocus
              style={{ width: '100%', fontSize: '0.95rem', padding: '12px 14px' }}
            />
            <span style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
              {language === 'hi' 
                ? 'सत्यापन के लिए आपकी आयु कम से कम 18 वर्ष होनी चाहिए।' 
                : 'System will verify that you are strictly 18 years or older.'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ 
                width: '100%', 
                padding: '13px', 
                fontSize: '0.96rem', 
                fontWeight: 700,
                background: '#FF3B30',
                color: '#ffffff',
                boxShadow: '0 4px 18px rgba(255, 59, 48, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle2 size={18} />
              <span>{language === 'hi' ? 'आयु सत्यापित करें और आगे बढ़ें' : 'Verify Age & Proceed'}</span>
            </button>

            <button
              type="button"
              className="btn-outline"
              style={{ width: '100%', padding: '11px', fontSize: '0.88rem', color: '#94A3B8' }}
              onClick={handleCancelClick}
            >
              {language === 'hi' ? 'रद्द करें (18 से कम)' : 'Cancel (Under 18)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
