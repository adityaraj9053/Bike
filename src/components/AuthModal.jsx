import React, { useState } from 'react';
import { X, Smartphone, Mail, ShieldCheck, ArrowRight, RefreshCw, KeyRound, CheckCircle2, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AuthModal({ isOpen, onClose, onLogin, user }) {
  const { t, language } = useLanguage();

  // Mode: 'phone-login' | 'email-login' | 'signup' | 'forgot'
  const [mode, setMode] = useState('phone-login');
  
  // Form fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  if (!isOpen) return null;

  const resetFormState = () => {
    setOtp('');
    setOtpSent(false);
    setErrorMsg('');
    setInfoMsg('');
  };

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    resetFormState();
  };

  // 1. Send OTP Handler
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'phone-login' || mode === 'signup') {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        setErrorMsg(language === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    if (mode === 'email-login' || mode === 'signup') {
      if (!email || !email.includes('@')) {
        setErrorMsg(language === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें।' : 'Please enter a valid email address.');
        return;
      }
    }

    if (mode === 'signup' && !fullName.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }

    setOtpSent(true);
    setInfoMsg(language === 'hi' ? 'OTP भेजा गया! डेमो OTP: 1234' : 'OTP sent successfully! Demo OTP: 1234');
  };

  // 2. Verify OTP & Log In
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otp || otp.trim().length < 4) {
      setErrorMsg(language === 'hi' ? 'कृपया 4-अंकों का OTP दर्ज करें।' : 'Please enter the 4-digit OTP.');
      return;
    }

    let newUser = null;

    if (mode === 'phone-login') {
      newUser = {
        name: `Rider ${phoneNumber.slice(-4)}`,
        phone: `+91 ${phoneNumber}`,
        email: '',
        loginMethod: 'phone',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
    } else if (mode === 'email-login') {
      newUser = {
        name: email.split('@')[0],
        phone: '',
        email: email,
        loginMethod: 'email',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
    } else if (mode === 'signup') {
      newUser = {
        name: fullName.trim(),
        phone: `+91 ${phoneNumber}`,
        email: email.trim(),
        loginMethod: 'both',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
    } else if (mode === 'forgot') {
      setInfoMsg(language === 'hi' ? 'खाता पासवर्ड / OTP सफलतापूर्वक रीसेट कर दिया गया।' : 'Account access successfully restored!');
      setTimeout(() => {
        handleSwitchMode('phone-login');
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
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '440px', width: '92%' }}
      >
        <button className="modal-close-btn" onClick={onClose}>
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
            
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px', margin: '16px 0 24px', textAlign: 'left', fontSize: '0.88rem' }}>
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
                {language === 'hi' ? 'सत्यापित राइडर खाता' : 'Verified Rider Profile'}
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
          /* Authentication Forms */
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '6px' }}>
              {mode === 'signup' 
                ? t('signUpTitle') 
                : mode === 'forgot' 
                  ? t('forgotTitle') 
                  : t('signInTitle')}
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.86rem', textAlign: 'center', marginBottom: '20px' }}>
              {mode === 'forgot' ? t('forgotSubtitle') : t('authSubtitle')}
            </p>

            {/* Mode Selector Tabs (Login / Signup) */}
            {mode !== 'forgot' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '10px',
                padding: '4px',
                marginBottom: '20px',
                gap: '4px'
              }}>
                <button
                  type="button"
                  onClick={() => handleSwitchMode('phone-login')}
                  style={{
                    background: mode === 'phone-login' ? '#00A3FF' : 'transparent',
                    color: mode === 'phone-login' ? '#060C18' : '#cbd5e1',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    padding: '8px 4px',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {language === 'hi' ? 'फोन OTP' : 'Phone OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchMode('email-login')}
                  style={{
                    background: mode === 'email-login' ? '#00A3FF' : 'transparent',
                    color: mode === 'email-login' ? '#060C18' : '#cbd5e1',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    padding: '8px 4px',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {language === 'hi' ? 'ईमेल OTP' : 'Email OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signup')}
                  style={{
                    background: mode === 'signup' ? '#00A3FF' : 'transparent',
                    color: mode === 'signup' ? '#060C18' : '#cbd5e1',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    padding: '8px 4px',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {language === 'hi' ? 'साइन अप' : 'Sign Up'}
                </button>
              </div>
            )}

            {/* Password Not Required Reminder */}
            {(mode === 'phone-login' || mode === 'email-login') && (
              <div style={{
                background: 'rgba(0, 163, 255, 0.08)',
                border: '1px solid rgba(0, 163, 255, 0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '16px',
                fontSize: '0.82rem',
                color: '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={18} style={{ flexShrink: 0 }} />
                <span>{t('phoneNoPasswordNote')}</span>
              </div>
            )}

            {/* Error & Info Alerts */}
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

            {/* Form */}
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Full Name field in Signup */}
              {mode === 'signup' && (
                <div className="form-group">
                  <label className="form-label">{t('riderName')}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={language === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Mobile Input with +91 Country Code */}
              {(mode === 'phone-login' || mode === 'signup' || (mode === 'forgot' && !email)) && (
                <div className="form-group">
                  <label className="form-label">{t('phoneNumberLabel')}</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#cbd5e1',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="9876543210"
                      maxLength={10}
                      value={phoneNumber}
                      disabled={otpSent}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      style={{ flex: 1 }}
                      required={mode === 'phone-login' || mode === 'signup'}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                    {t('countryCodeNote')}
                  </span>
                </div>
              )}

              {/* Email Input */}
              {(mode === 'email-login' || mode === 'signup' || (mode === 'forgot' && !phoneNumber)) && (
                <div className="form-group">
                  <label className="form-label">{t('riderEmail')}</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    disabled={otpSent}
                    onChange={(e) => setEmail(e.target.value)}
                    required={mode === 'email-login' || mode === 'signup'}
                  />
                </div>
              )}

              {/* OTP Input Field */}
              {otpSent && (
                <div className="form-group" style={{ animation: 'fadeIn 0.2s ease' }}>
                  <label className="form-label">{t('enterOtpLabel')}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="1234"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.3rem', fontWeight: 800 }}
                    required
                    autoFocus
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setOtp('1234')}
                      style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                    >
                      {language === 'hi' ? 'डेमो OTP भरें (1234)' : 'Fill Demo OTP (1234)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => resetFormState()}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                    >
                      {language === 'hi' ? 'नंबर बदलें' : 'Change Number'}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '6px', fontSize: '0.95rem' }}
              >
                <span>
                  {otpSent 
                    ? t('verifyAndLoginBtn') 
                    : mode === 'signup' 
                      ? t('signUpBtn') 
                      : mode === 'forgot' 
                        ? t('sendResetOtp') 
                        : t('sendOtpBtn')}
                </span>
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Bottom Links: Forgot Password & Alternate Mode */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px', textAlign: 'center' }}>
              {mode !== 'forgot' && (
                <button
                  type="button"
                  onClick={() => handleSwitchMode('forgot')}
                  style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  {t('forgotPasswordText')}
                </button>
              )}

              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => handleSwitchMode('phone-login')}
                  style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  {t('backToLogin')}
                </button>
              )}

              {mode === 'signup' ? (
                <button
                  type="button"
                  onClick={() => handleSwitchMode('phone-login')}
                  style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.86rem', cursor: 'pointer' }}
                >
                  {t('alreadyAccount')}
                </button>
              ) : (
                mode !== 'forgot' && (
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('signup')}
                    style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.86rem', cursor: 'pointer' }}
                  >
                    {t('noAccount')}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
