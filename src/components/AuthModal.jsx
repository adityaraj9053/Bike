import React, { useState } from 'react';
import { X, Mail, Smartphone, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import AgeVerificationModal from './AgeVerificationModal';

export default function AuthModal({ isOpen, onClose, onLogin, user }) {
  const { t, language } = useLanguage();

  // Tab: 'signin' | 'signup' | 'forgot'
  const [activeTab, setActiveTab] = useState('signin');
  const [showAgePopup, setShowAgePopup] = useState(false);

  // Input states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  if (!isOpen) return null;

  const resetState = () => {
    setOtp('');
    setOtpSent(false);
    setErrorMsg('');
    setInfoMsg('');
  };

  const handleTabSwitch = (tab) => {
    if (tab === 'signup') {
      const isAgeVerified = sessionStorage.getItem('road_eagle_age_verified') === 'true';
      if (!isAgeVerified) {
        setShowAgePopup(true);
        return;
      }
    }
    setActiveTab(tab);
    resetState();
  };

  const handleConfirmAgeSignup = () => {
    sessionStorage.setItem('road_eagle_age_verified', 'true');
    setShowAgePopup(false);
    setActiveTab('signup');
    resetState();
  };

  const handleCancelAgeSignup = () => {
    setShowAgePopup(false);
    setActiveTab('signin');
    setErrorMsg(
      language === 'hi'
        ? 'साइन अप केवल 18 वर्ष या उससे अधिक आयु के वैध लाइसेंस धारकों के लिए मान्य है।'
        : 'Sign up is strictly allowed for individuals aged 18+ with a valid driving license.'
    );
  };

  // Email validation regex (RFC 5322 compatible regex)
  const validateEmail = (emailStr) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(emailStr || '').trim().toLowerCase());
  };

  // Phone validation (10 digits starting with 6,7,8,9)
  const validatePhone = (phoneStr) => {
    const clean = String(phoneStr || '').replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(clean);
  };

  const handleGoogleLogin = () => {
    onLogin({
      name: 'Rider Alex',
      email: 'alex.rider@example.com',
      phone: '+91 98765 43210',
      loginMethod: 'google',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    });
    onClose();
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Strict Email validation
    if (!email || !validateEmail(email)) {
      setErrorMsg(
        language === 'hi' 
          ? 'कृपया एक मान्य ईमेल पता दर्ज करें (उदा. name@example.com)' 
          : 'Please enter a valid email address (e.g. name@example.com)'
      );
      return;
    }

    if (activeTab === 'signup') {
      const isAgeVerified = sessionStorage.getItem('road_eagle_age_verified') === 'true';
      if (!isAgeVerified) {
        setShowAgePopup(true);
        return;
      }

      if (!name.trim()) {
        setErrorMsg(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
        return;
      }
      const cleanPhone = phone.replace(/\D/g, '');
      if (!validatePhone(cleanPhone)) {
        setErrorMsg(
          language === 'hi' 
            ? 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें (6, 7, 8 या 9 से शुरू)।' 
            : 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).'
        );
        return;
      }
    }

    setOtpSent(true);
    setInfoMsg(
      language === 'hi' 
        ? `OTP ${email} पर भेजा गया! (डेमो कोड: 1234)` 
        : `Verification code sent to ${email}! (Demo Code: 1234)`
    );
  };

  const handleVerifyAndSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otp || otp.trim().length < 4) {
      setErrorMsg(language === 'hi' ? 'कृपया 4-अंकों का OTP कोड दर्ज करें।' : 'Please enter the 4-digit verification code.');
      return;
    }

    let newUser = null;

    if (activeTab === 'signin') {
      newUser = {
        name: email.split('@')[0],
        email: email.trim(),
        phone: '', // Email login without phone; enquiry modal will ask phone as per requirement
        loginMethod: 'email',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
    } else if (activeTab === 'signup') {
      newUser = {
        name: name.trim(),
        email: email.trim(),
        phone: `+91 ${phone.replace(/\D/g, '')}`,
        loginMethod: 'both',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
    } else if (activeTab === 'forgot') {
      setInfoMsg(language === 'hi' ? 'खाता एक्सेस सफलतापूर्वक पुनर्प्राप्त!' : 'Account access successfully restored!');
      setTimeout(() => {
        handleTabSwitch('signin');
      }, 1500);
      return;
    }

    if (newUser) {
      onLogin(newUser);
      onClose();
    }
  };

  const handleSignOut = () => {
    onLogin(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000 }}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '440px', width: '92%' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {user ? (
          /* User Profile View when Logged In */
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
              alt={user.name}
              style={{ width: '68px', height: '68px', borderRadius: '50%', marginBottom: '14px', border: '2px solid #00A3FF' }}
            />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{user.name}</h3>
            
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', margin: '16px 0 24px', textAlign: 'left', fontSize: '0.88rem' }}>
              {user.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', marginBottom: '6px' }}>
                  <Mail size={16} color="#00A3FF" />
                  <span>{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                  <Smartphone size={16} color="#10B981" />
                  <span>{user.phone}</span>
                </div>
              )}
              <div style={{ marginTop: '8px', fontSize: '0.78rem', color: '#64748B' }}>
                {language === 'hi' ? 'सत्यापित राइडर प्रोफ़ाइल' : 'Verified Rider Profile'}
              </div>
            </div>

            <button
              className="btn-outline"
              style={{ width: '100%', borderColor: '#EF4444', color: '#EF4444' }}
              onClick={handleSignOut}
            >
              {t('navSignOut')}
            </button>
          </div>
        ) : (
          <div>
            {/* Separate Tabs within the same window */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '9999px',
              padding: '4px',
              marginBottom: '20px'
            }}>
              <button
                type="button"
                onClick={() => handleTabSwitch('signin')}
                style={{
                  background: activeTab === 'signin' ? '#00A3FF' : 'transparent',
                  color: activeTab === 'signin' ? '#040810' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '9px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                {language === 'hi' ? 'साइन इन' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch('signup')}
                style={{
                  background: activeTab === 'signup' ? '#00A3FF' : 'transparent',
                  color: activeTab === 'signup' ? '#040810' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '9px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                {language === 'hi' ? 'साइन अप' : 'Sign Up'}
              </button>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '6px' }}>
              {activeTab === 'signup' 
                ? (language === 'hi' ? 'नया राइडर खाता बनाएं' : 'Create Rider Account')
                : (language === 'hi' ? 'द रोड ईगल में साइन इन करें' : 'Sign In to The Road Eagle')}
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.86rem', textAlign: 'center', marginBottom: '20px' }}>
              {language === 'hi' 
                ? 'अपनी मोटरसाइकिल बुकिंग प्रबंधित करें और त्वरित सत्यापन का लाभ उठाएं।'
                : 'Manage your motorcycle bookings, fast track document verification, and access exclusive member rates.'}
            </p>

            {/* Google OAuth Button - exactly matching the clean aesthetic */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                background: '#ffffff',
                color: '#000000',
                fontWeight: 600,
                padding: '12px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '0.92rem',
                marginBottom: '18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{language === 'hi' ? 'Google के साथ जारी रखें' : 'Continue with Google'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <span style={{ color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                {language === 'hi' ? 'या ईमेल से' : 'or with email'}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            {/* Password not required note */}
            <div style={{
              background: 'rgba(0, 163, 255, 0.08)',
              border: '1px solid rgba(0, 163, 255, 0.2)',
              borderRadius: '8px',
              padding: '9px 12px',
              marginBottom: '16px',
              fontSize: '0.82rem',
              color: '#38BDF8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ShieldCheck size={16} style={{ flexShrink: 0 }} />
              <span>{language === 'hi' ? 'पासवर्ड की आवश्यकता नहीं! त्वरित OTP सत्यापन।' : 'Password not required! Quick OTP login.'}</span>
            </div>

            {/* Error & Info Messages */}
            {errorMsg && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid #EF4444', borderRadius: '8px', padding: '10px', fontSize: '0.85rem', marginBottom: '14px' }}>
                {errorMsg}
              </div>
            )}
            {infoMsg && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid #10B981', borderRadius: '8px', padding: '10px', fontSize: '0.85rem', marginBottom: '14px' }}>
                {infoMsg}
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={otpSent ? handleVerifyAndSubmit : handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activeTab === 'signup' && (
                <>
                  <div className="form-group">
                    <label className="form-label">{language === 'hi' ? 'पूरा नाम' : 'FULL NAME'}</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder={language === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. John Doe'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{language === 'hi' ? 'मोबाइल नंबर' : 'MOBILE NUMBER'}</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border-card)',
                        borderRadius: '8px',
                        padding: '12px 12px',
                        color: '#cbd5e1',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                      }}>
                        +91
                      </div>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="9876543210"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        style={{ flex: 1 }}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email Address with validation check */}
              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'ईमेल पता' : 'EMAIL ADDRESS'}</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  disabled={otpSent}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  required
                />
              </div>

              {/* OTP Field if sent */}
              {otpSent && (
                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? '4-अंकों का OTP कोड दर्ज करें' : 'ENTER 4-DIGIT CODE'}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="1234"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.25rem', fontWeight: 800 }}
                    required
                    autoFocus
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setOtp('1234')}
                      style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                    >
                      {language === 'hi' ? 'डेमो कोड भरें (1234)' : 'Fill Demo Code (1234)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => resetState()}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                    >
                      {language === 'hi' ? 'ईमेल बदलें' : 'Change Email'}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '13px', marginTop: '4px' }}
              >
                <span>
                  {otpSent 
                    ? (language === 'hi' ? 'सत्यापित करें और आगे बढ़ें' : 'Verify & Continue')
                    : (activeTab === 'signup' 
                        ? (language === 'hi' ? 'खाता बनाएं' : 'Create Free Account') 
                        : (language === 'hi' ? 'ईमेल से जारी रखें' : 'Continue with email'))}
                </span>
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Bottom helper link */}
            <div style={{ textAlign: 'center', marginTop: '18px' }}>
              <button
                type="button"
                onClick={() => handleTabSwitch(activeTab === 'signin' ? 'signup' : 'signin')}
                style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.86rem', cursor: 'pointer' }}
              >
                {activeTab === 'signin'
                  ? (language === 'hi' ? 'खाता नहीं है? साइन अप करें' : "Don't have an account? Sign Up")
                  : (language === 'hi' ? 'क्या खाता पहले से है? साइन इन करें' : 'Already have an account? Sign In')}
              </button>
            </div>
          </div>
        )}

        {/* 18+ Mandatory Age Verification Pop-up before SignUp */}
        <AgeVerificationModal
          isOpen={showAgePopup}
          onClose={() => setShowAgePopup(false)}
          onConfirm={handleConfirmAgeSignup}
          onCancel={handleCancelAgeSignup}
        />
      </div>
    </div>
  );
}
