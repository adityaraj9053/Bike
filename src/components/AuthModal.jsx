import React, { useState, useEffect } from 'react';
import { X, Mail, ShieldCheck, ArrowRight, User, Calendar, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AuthModal({ isOpen, onClose, onLogin, user }) {
  const { t, language } = useLanguage();

  // Tab: 'signin' | 'signup' | 'forgot'
  const [activeTab, setActiveTab] = useState('signin');

  // Input states - empty strings, only placeholders in UI!
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Complete reset of all input fields and states
  const resetAllFields = () => {
    setEmail('');
    setName('');
    setDob('');
    setOtp('');
    setOtpSent(false);
    setErrorMsg('');
    setInfoMsg('');
    setActiveTab('signin');
  };

  const resetOtpOnly = () => {
    setOtp('');
    setOtpSent(false);
    setErrorMsg('');
    setInfoMsg('');
  };

  // Reset all states and inputs when user logs out
  useEffect(() => {
    if (!user) {
      resetAllFields();
    }
  }, [user]);

  // Reset OTP whenever modal opens or closes
  useEffect(() => {
    setOtp('');
    setOtpSent(false);
    setErrorMsg('');
    setInfoMsg('');
    if (!isOpen && !user) {
      resetAllFields();
    }
  }, [isOpen, user]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    resetOtpOnly();
  };

  // Exact age calculation logic from DOB
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

  // Strict RFC 5322 Email regex
  const validateEmail = (emailStr) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(emailStr || '').trim().toLowerCase());
  };

  // Handle Send OTP (Includes 18+ Age verification logic for Signup!)
  const handleSendCode = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setOtp(''); // Always clear old OTP when requesting a code

    // 1. Validate Email
    if (!email || !validateEmail(email)) {
      setErrorMsg(
        language === 'hi' 
          ? 'कृपया एक मान्य ईमेल पता दर्ज करें (उदा. name@example.com)' 
          : 'Please enter a valid email address (e.g. name@example.com)'
      );
      return;
    }

    // 2. Signup Specific Checks: Name & 18+ Age from DOB!
    if (activeTab === 'signup') {
      if (!name.trim()) {
        setErrorMsg(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
        return;
      }

      if (!dob) {
        setErrorMsg(
          language === 'hi' 
            ? 'कृपया अपनी जन्म तिथि (Date of Birth) दर्ज करें।' 
            : 'Please enter your Date of Birth to verify age.'
        );
        return;
      }

      const riderAge = calculateAge(dob);

      // Strict 18+ check logic
      if (riderAge < 18) {
        setErrorMsg(
          language === 'hi' 
            ? `अस्वीकृत: आपकी आयु ${riderAge} वर्ष है। मोटरबाइक रेंटल और पंजीकरण के लिए न्यूनतम आयु 18+ अनिवार्य है।` 
            : `Underage (${riderAge} yrs): Registration is strictly restricted to riders aged 18+ with a valid license.`
        );
        return;
      }

      // Mark age verified in session
      sessionStorage.setItem('road_eagle_age_verified', 'true');
    }

    // If verification passes: move to OTP enter screen!
    setOtpSent(true);
    setInfoMsg(
      language === 'hi' 
        ? `सत्यापन कोड ${email} पर भेजा गया! (डेमो कोड: 1234)` 
        : `Verification code sent to ${email}! (Demo Code: 1234)`
    );
  };

  // Verify OTP and complete login / registration
  const handleVerifyAndSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const submittedOtp = (otp || '').trim();
    // Requirement: OTP must be immediately removed from the input field after filling once!
    setOtp('');

    if (!submittedOtp || submittedOtp.length < 4) {
      setErrorMsg(language === 'hi' ? 'कृपया 4-अंकों का OTP कोड दर्ज करें।' : 'Please enter the 4-digit verification code.');
      return;
    }

    if (submittedOtp !== '1234') {
      setErrorMsg(language === 'hi' ? 'अमान्य OTP कोड! कृपया 1234 दर्ज करें।' : 'Invalid OTP code! Please enter 1234.');
      return;
    }

    let newUser = null;

    if (activeTab === 'signin') {
      newUser = {
        name: email.split('@')[0],
        email: email.trim(),
        phone: '', // Mobile asked strictly during booking
        loginMethod: 'email',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
    } else if (activeTab === 'signup') {
      newUser = {
        name: name.trim(),
        email: email.trim(),
        dob: dob,
        phone: '', // Mobile asked strictly during booking
        loginMethod: 'email',
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
      // Clear all inputs on success so no old credentials or OTP ever persist
      resetAllFields();
      onLogin(newUser);
      onClose();
    }
  };

  const handleSignOut = () => {
    resetAllFields();
    onLogin(null);
    onClose();
  };

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

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
              {user.dob && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                  <Calendar size={16} color="#10B981" />
                  <span>DOB: {user.dob} (18+ Verified)</span>
                </div>
              )}
              <div style={{ marginTop: '8px', fontSize: '0.78rem', color: '#64748B' }}>
                {language === 'hi' ? 'सत्यापित 18+ राइडर खाता' : 'Verified 18+ Rider Account'}
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
                {language === 'hi' ? 'साइन अप (18+)' : 'Sign Up (18+)'}
              </button>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '6px' }}>
              {activeTab === 'signup' 
                ? (language === 'hi' ? 'नया राइडर खाता बनाएं' : 'Create Rider Account')
                : (language === 'hi' ? 'द रोड ईगल में साइन इन करें' : 'Sign In to The Road Eagle')}
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.86rem', textAlign: 'center', marginBottom: '20px' }}>
              {activeTab === 'signup'
                ? (language === 'hi' ? 'नाम, ईमेल व जन्म तिथि दर्ज करें। ईमेल OTP द्वारा सत्यापन।' : 'Enter Name, Email & Date of Birth. Verification via Email OTP.')
                : (language === 'hi' ? 'ईमेल OTP से त्वरित साइन इन करें।' : 'Quick passwordless sign in via Email OTP.')}
            </p>

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
              <span>{language === 'hi' ? 'पासवर्ड की आवश्यकता नहीं! ईमेल OTP सत्यापन।' : 'Password not required! Email OTP verification.'}</span>
            </div>

            {/* Error & Info Messages */}
            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#EF4444',
                border: '1.5px solid #EF4444',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '0.86rem',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                lineHeight: 1.45
              }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{errorMsg}</span>
              </div>
            )}
            {infoMsg && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid #10B981', borderRadius: '8px', padding: '10px', fontSize: '0.85rem', marginBottom: '14px' }}>
                {infoMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={otpSent ? handleVerifyAndSubmit : handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* If OTP not sent yet: Show Name, Email, DOB fields */}
              {!otpSent ? (
                <>
                  {activeTab === 'signup' && (
                    <div className="form-group">
                      <label className="form-label">{language === 'hi' ? 'पूरा नाम' : 'FULL NAME'}</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rahul Verma"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        required
                      />
                    </div>
                  )}

                  {/* Email Address with placeholder */}
                  <div className="form-group">
                    <label className="form-label">{language === 'hi' ? 'ईमेल पता' : 'EMAIL ADDRESS'}</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="rider@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      required
                    />
                  </div>

                  {/* DOB field on signup form */}
                  {activeTab === 'signup' && (
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} color="#00A3FF" />
                        <span>{language === 'hi' ? 'जन्म तिथि (DOB - 18+ अनिवार्य)' : 'DATE OF BIRTH (18+ MANDATORY)'}</span>
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
                      />
                      <span style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                        {language === 'hi' 
                          ? 'Send OTP पर क्लिक करने पर 18+ आयु सत्यापित की जाएगी।' 
                          : 'Age will be verified automatically when clicking Send OTP.'}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                /* OTP Screen when 18+ check passed */
                <div className="form-group">
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    marginBottom: '14px',
                    fontSize: '0.84rem',
                    color: '#34D399',
                    textAlign: 'center'
                  }}>
                    <span>{language === 'hi' ? `18+ आयु सत्यापित! OTP भेजा गया:` : `18+ Verified! OTP sent to:`} <strong>{email}</strong></span>
                  </div>

                  <label className="form-label">{language === 'hi' ? '4-अंकों का ईमेल OTP दर्ज करें' : 'ENTER 4-DIGIT EMAIL OTP'}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="• • • •"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.25rem', fontWeight: 800 }}
                    required
                    autoFocus
                    autoComplete="off"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setOtp('1234')}
                      style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                    >
                      {language === 'hi' ? 'डेमो कोड भरें (1234)' : 'Fill Demo Code (1234)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => resetOtpOnly()}
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
                        ? (language === 'hi' ? 'OTP भेजें' : 'Send OTP') 
                        : (language === 'hi' ? 'ईमेल OTP प्राप्त करें' : 'Get Email OTP'))}
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
      </div>
    </div>
  );
}
