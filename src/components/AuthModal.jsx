
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
//=======
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Image,
//   ScrollView,
// } from 'react-native';
// import Svg, { Path } from 'react-native-svg';
// import {
//   X,
//   ShieldCheck,
//   AlertCircle,
//   CheckCircle2,
//   Mail,
//   Clock,
//   RotateCcw,
//   ArrowLeft,
// } from 'lucide-react-native';
// import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from './LanguageSwitcher';

// function GoogleIcon({ size = 18 }) {
//   return (
//     <Svg width={size} height={size} viewBox="0 0 24 24">
//       <Path
//         fill="#4285F4"
//         d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
//       />
//       <Path
//         fill="#34A853"
//         d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
//       />
//       <Path
//         fill="#FBBC05"
//         d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
//       />
//       <Path
//         fill="#EA4335"
//         d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
//       />
//     </Svg>
//   );
// }

// export default function AuthModal({
//   visible,
//   isOpen,
//   onClose,
//   onLogin,
//   user,
// }) {
//   const { t } = useTranslation();
//   const isModalVisible = visible !== undefined ? visible : Boolean(isOpen);
//   const otpInputRef = useRef(null);

//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [ageVerified, setAgeVerified] = useState(false);
//   const [showAgePrompt, setShowAgePrompt] = useState(false);
//   const [underAgeError, setUnderAgeError] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null); // 'google' | 'signup_toggle' | 'signup_submit'

//   // Forgot Password State
//   // const [showForgotPassword, setShowForgotPassword] = useState(false);
//   // const [resetEmail, setResetEmail] = useState('');
//   // const [resetEmailError, setResetEmailError] = useState('');
//   // const [resetEmailSent, setResetEmailSent] = useState(false);

//   // OTP Verification State
//   const [showOtpPage, setShowOtpPage] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [otpTimer, setOtpTimer] = useState(30);
//   const [otpError, setOtpError] = useState('');
//   const [otpResent, setOtpResent] = useState(false);
//   const [emailError, setEmailError] = useState('');

//   // Reset modal state on open or user login/out
//   useEffect(() => {
//     if (isModalVisible && !user) {
//       setIsSignUp(false);
//       setShowAgePrompt(false);
//       setUnderAgeError(false);
//       setPendingAction(null);
//       setShowOtpPage(false);
//       // setShowForgotPassword(false);
//       // setResetEmail('');
//       // setResetEmailError('');
//       // setResetEmailSent(false);
//       setOtp('');
//       setOtpError('');
//       setOtpResent(false);
//       setEmailError('');
//     }
//   }, [isModalVisible, user]);

//   // OTP Countdown Timer
//   useEffect(() => {
//     let interval = null;
//     if (showOtpPage && otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [showOtpPage, otpTimer]);

//   const handleModalClose = () => {
//     setShowAgePrompt(false);
//     setUnderAgeError(false);
//     setPendingAction(null);
//     setShowOtpPage(false);
//     // setShowForgotPassword(false);
//     // setResetEmail('');
//     // setResetEmailError('');
//     // setResetEmailSent(false);
//     setOtp('');
//     setOtpError('');
//     setOtpResent(false);
//     setEmailError('');
//     setIsSignUp(false);
//     onClose();
//   };

//   // const handleSendResetLink = () => {
//   //   setResetEmailError('');
//   //   if (!resetEmail.trim()) {
//   //     setResetEmailError(t('authModal.emailPlaceholder') ? 'Please enter your email address.' : 'Please enter your email address.');
//   //     return;
//   //   }
//   //   if (!resetEmail.includes('@') || !resetEmail.includes('.')) {
//   //     setResetEmailError('Please enter a valid email address.');
//   //     return;
//   //   }
//   //   setResetEmailSent(true);
//   // };

//   const proceedGoogleLogin = () => {
//     onLogin({
//       name: 'Rider Alex',
//       email: 'alex.rider@example.com',
//       avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
//     });
//     handleModalClose();
//   };

//   const handleGoogleClick = () => {
//     if (ageVerified) {
//       proceedGoogleLogin();
//     } else {
//       setPendingAction('google');
//       setUnderAgeError(false);
//       setShowAgePrompt(true);
//     }
//   };

//   const proceedEmailSubmit = (userName, userEmail) => {
//     const finalEmail = userEmail || email;
//     if (!finalEmail) return;
//     onLogin({
//       name: (userName !== undefined ? userName : name) || finalEmail.split('@')[0],
//       email: finalEmail,
//       avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
//     });
//     handleModalClose();
//   };

//   const handleEmailSubmit = () => {
//     setEmailError('');
//     if (!email.trim()) {
//       setEmailError('Please enter your email address.');
//       return;
//     }
//     if (!email.includes('@') || !email.includes('.')) {
//       setEmailError('Please enter a valid email address.');
//       return;
//     }

//     if (isSignUp) {
//       if (!ageVerified) {
//         setPendingAction('signup_submit');
//         setUnderAgeError(false);
//         setShowAgePrompt(true);
//         return;
//       }
//       // Open OTP verification page
//       setShowOtpPage(true);
//       setOtp('');
//       setOtpTimer(30);
//       setOtpError('');
//       setOtpResent(false);
//       return;
//     }

//     proceedEmailSubmit();
//   };

//   const handleToggleMode = () => {
//     setEmailError('');
//     if (isSignUp) {
//       setIsSignUp(false);
//       setShowOtpPage(false);
//     } else {
//       if (ageVerified) {
//         setIsSignUp(true);
//       } else {
//         setPendingAction('signup_toggle');
//         setUnderAgeError(false);
//         setShowAgePrompt(true);
//       }
//     }
//   };

//   const handleAgeYes = () => {
//     setAgeVerified(true);
//     setShowAgePrompt(false);
//     setUnderAgeError(false);

//     const action = pendingAction;
//     setPendingAction(null);

//     if (action === 'google') {
//       proceedGoogleLogin();
//     } else if (action === 'signup_toggle') {
//       setIsSignUp(true);
//     } else if (action === 'signup_submit') {
//       // Proceed to OTP page
//       setShowOtpPage(true);
//       setOtp('');
//       setOtpTimer(30);
//       setOtpError('');
//       setOtpResent(false);
//     } else {
//       setIsSignUp(true);
//     }
//   };

//   const handleAgeNo = () => {
//     setShowAgePrompt(false);
//     setUnderAgeError(true);
//     setPendingAction(null);
//   };

//   const handleBackFromOtp = () => {
//     setShowOtpPage(false);
//     setOtp('');
//     setOtpError('');
//     setOtpResent(false);
//   };

//   const handleResendOtp = () => {
//     setOtpTimer(30);
//     setOtp('');
//     setOtpError('');
//     setOtpResent(true);
//     setTimeout(() => {
//       setOtpResent(false);
//     }, 3000);
//   };

//   const handleOtpChange = (val) => {
//     const cleaned = val.replace(/[^0-9]/g, '').slice(0, 4);
//     setOtp(cleaned);
//     if (otpError) setOtpError('');
//     if (cleaned.length === 4) {
//       setTimeout(() => {
//         proceedEmailSubmit();
//       }, 350);
//     }
//   };

//   const handleVerifyOtp = () => {
//     if (otp.length < 4) {
//       setOtpError('Please enter the complete 4-digit OTP code.');
//       return;
//     }
//     proceedEmailSubmit();
//>>>>>>> app
  };

  const handleSignOut = () => {
    resetAllFields();
    onLogin(null);
    setIsSignUp(false);
    setAgeVerified(false);
    setEmail('');
    setName('');
    handleModalClose();
  };

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  return (
//<<<<<<< feature/client-requirements
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
//=======
//     <Modal
//       visible={isModalVisible}
//       transparent
//       animationType="fade"
//       onRequestClose={handleModalClose}
//     >
//       <TouchableWithoutFeedback onPress={handleModalClose}>
//         <View style={styles.overlay}>
//           <TouchableWithoutFeedback>
//             <View style={[styles.modalCard, SHADOWS.card]}>
//               <View style={styles.modalHeaderRow}>
//                 <LanguageSwitcher compact />
//                 <TouchableOpacity style={styles.closeBtn} onPress={handleModalClose} activeOpacity={0.8}>
//                   <X size={18} color={COLORS.textSecondary} />
//                 </TouchableOpacity>
//               </View>

//               <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
//                 {showOtpPage ? (
//                   /* OTP Verification View */
//                   <View style={styles.otpContainer}>
//                     <TouchableOpacity
//                       style={styles.otpBackBtn}
//                       onPress={handleBackFromOtp}
//                       activeOpacity={0.7}
//                     >
//                       <ArrowLeft size={16} color={COLORS.textSecondary} />
//                       <Text style={styles.otpBackBtnText}>{t('authModal.backToSignIn')}</Text>
//                     </TouchableOpacity>

//                     <View style={styles.otpBadgeCircle}>
//                       <Mail size={28} color={COLORS.accentCyan} />
//                     </View>

//                     <Text style={styles.modalTitle}>{t('authModal.otpTitle')}</Text>
//                     <Text style={styles.modalSubtitle}>
//                       {t('authModal.otpSubtitle')}{'\n'}
//                       <Text style={styles.otpTargetEmail}>{email}</Text>
//                     </Text>

//                     {/* 4 Digit Boxes with touchable focus */}
//                     <TouchableOpacity
//                       activeOpacity={1}
//                       style={styles.otpInputWrapper}
//                       onPress={() => otpInputRef.current?.focus()}
//                     >
//                       <View style={styles.otpBoxesRow}>
//                         {[0, 1, 2, 3].map((index) => {
//                           const digit = otp[index] || '';
//                           const isCurrent = otp.length === index;
//                           return (
//                             <View
//                               key={index}
//                               style={[
//                                 styles.otpBox,
//                                 digit ? styles.otpBoxFilled : null,
//                                 isCurrent ? styles.otpBoxActive : null,
//                               ]}
//                             >
//                               <Text style={styles.otpDigitText}>{digit}</Text>
//                             </View>
//                           );
//                         })}
//                       </View>
//                       <TextInput
//                         ref={otpInputRef}
//                         style={styles.hiddenOtpInput}
//                         value={otp}
//                         onChangeText={handleOtpChange}
//                         keyboardType="number-pad"
//                         maxLength={4}
//                         autoFocus
//                       />
//                     </TouchableOpacity>

//                     {otpError ? (
//                       <View style={styles.otpErrorWrap}>
//                         <AlertCircle size={14} color={COLORS.statusBooked} />
//                         <Text style={styles.otpErrorText}>{otpError}</Text>
//                       </View>
//                     ) : null}

//                     {otpResent ? (
//                       <View style={styles.otpResentWrap}>
//                         <CheckCircle2 size={14} color={COLORS.statusAvailable} />
//                         <Text style={styles.otpResentText}>{t('authModal.otpResentSuccess')}</Text>
//                       </View>
//                     ) : (
//                       <View style={styles.demoOtpWrap}>
//                         <Text style={styles.demoOtpText}>
//                           {t('authModal.demoOtpHint')}
//                         </Text>
//                       </View>
//                     )}

//                     {/* Timer / Resend Row */}
//                     <View style={styles.timerRow}>
//                       {otpTimer > 0 ? (
//                         <View style={styles.timerCountWrap}>
//                           <Clock size={15} color={COLORS.textMuted} />
//                           <Text style={styles.timerCountText}>
//                             {t('authModal.resendOtpIn', { timer: otpTimer < 10 ? `0${otpTimer}` : otpTimer })}
//                           </Text>
//                         </View>
//                       ) : (
//                         <TouchableOpacity
//                           style={styles.resendBtn}
//                           onPress={handleResendOtp}
//                           activeOpacity={0.8}
//                         >
//                           <RotateCcw size={15} color={COLORS.accentCyan} />
//                           <Text style={styles.resendBtnText}>{t('authModal.resendOtp')}</Text>
//                         </TouchableOpacity>
//                       )}
//                     </View>

//                     {/* Verify & Complete CTA */}
//                     <TouchableOpacity
//                       style={[
//                         styles.submitBtn,
//                         otp.length === 4 ? null : styles.submitBtnDisabled,
//                       ]}
//                       onPress={handleVerifyOtp}
//                       activeOpacity={0.85}
//                     >
//                       <Text style={styles.submitBtnText}>{t('authModal.verifyAndComplete')}</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={styles.changeEmailBtn}
//                       onPress={handleBackFromOtp}
//                       activeOpacity={0.7}
//                     >
//                       <Text style={styles.changeEmailText}>
//                         {t('authModal.wrongEmail')}{' '}
//                         <Text style={{ color: COLORS.accentCyan, fontWeight: '600' }}>
//                           {t('authModal.changeEmail')}
//                         </Text>
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 ) : showAgePrompt ? (
//                   /* Age Verification Prompt View */
//                   <View style={styles.agePromptContainer}>
//                     <View style={styles.ageBadgeCircle}>
//                       <Text style={styles.ageBadgeNumber}>18+</Text>
//                     </View>

//                     <Text style={styles.modalTitle}>{t('authModal.areYou18')}</Text>
//                     <Text style={styles.modalSubtitle}>
//                       {t('authModal.agePolicyDesc')}
//                     </Text>

//                     <View style={styles.ageActionsContainer}>
//                       <TouchableOpacity
//                         style={styles.ageYesBtn}
//                         onPress={handleAgeYes}
//                         activeOpacity={0.85}
//                       >
//                         <CheckCircle2 size={18} color="#050B14" />
//                         <Text style={styles.ageYesBtnText}>{t('authModal.yes18')}</Text>
//                       </TouchableOpacity>

//                       <TouchableOpacity
//                         style={styles.ageNoBtn}
//                         onPress={handleAgeNo}
//                         activeOpacity={0.8}
//                       >
//                         <Text style={styles.ageNoBtnText}>{t('authModal.noUnder18')}</Text>
//                       </TouchableOpacity>

//                       <TouchableOpacity
//                         style={styles.cancelLink}
//                         onPress={() => {
//                           setShowAgePrompt(false);
//                           setPendingAction(null);
//                         }}
//                         activeOpacity={0.7}
//                       >
//                         <Text style={styles.cancelLinkText}>{t('authModal.cancel')}</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ) : underAgeError ? (
//                   /* Under-age Restriction View */
//                   <View style={styles.agePromptContainer}>
//                     <View style={[styles.ageBadgeCircle, styles.ageBadgeRestricted]}>
//                       <AlertCircle size={32} color={COLORS.statusBooked} />
//                     </View>

//                     <Text style={styles.modalTitle}>{t('authModal.ageNotMetTitle')}</Text>
//                     <Text style={styles.modalSubtitle}>
//                       {t('authModal.ageNotMetDesc')}
//                     </Text>

//                     <View style={styles.underAgeActionsContainer}>
//                       <TouchableOpacity
//                         style={styles.underAgeBackBtn}
//                         onPress={() => {
//                           setUnderAgeError(false);
//                           setPendingAction(null);
//                           setIsSignUp(false);
//                           handleModalClose();
//                         }}
//                         activeOpacity={0.85}
//                       >
//                         <Text style={styles.underAgeBackBtnText}>{t('authModal.ok')}</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 // ) : showForgotPassword ? (
//                 //   /* Forgot Password View */
//                 //   <View style={styles.forgotPasswordContainer}>
//                 //     <TouchableOpacity
//                 //       style={styles.otpBackBtn}
//                 //       onPress={() => {
//                 //         setShowForgotPassword(false);
//                 //         setResetEmailSent(false);
//                 //       }}
//                 //       activeOpacity={0.7}
//                 //     >
//                 //       <ArrowLeft size={16} color={COLORS.textSecondary} />
//                 //       <Text style={styles.otpBackBtnText}>{t('authModal.backToSignIn')}</Text>
//                 //     </TouchableOpacity>

//                 //     <View style={styles.otpBadgeCircle}>
//                 //       <RotateCcw size={26} color={COLORS.accentCyan} />
//                 //     </View>

//                 //     <Text style={styles.modalTitle}>{t('authModal.resetPasswordTitle')}</Text>
//                 //     <Text style={styles.modalSubtitle}>{t('authModal.resetPasswordSubtitle')}</Text>

//                 //     {resetEmailSent ? (
//                 //       <View style={styles.resetSuccessWrap}>
//                 //         <CheckCircle2 size={44} color={COLORS.statusAvailable} style={{ marginBottom: 12 }} />
//                 //         <Text style={styles.resetSuccessTitle}>{t('authModal.resetSentTitle')}</Text>
//                 //         <Text style={styles.resetSuccessDesc}>
//                 //           {t('authModal.resetSentDesc', { email: resetEmail })}
//                 //         </Text>
//                 //         <TouchableOpacity
//                 //           style={[styles.submitBtn, { marginTop: 24, width: '100%' }]}
//                 //           onPress={() => {
//                 //             setShowForgotPassword(false);
//                 //             setResetEmailSent(false);
//                 //           }}
//                 //           activeOpacity={0.85}
//                 //         >
//                 //           <Text style={styles.submitBtnText}>{t('authModal.backToSignIn')}</Text>
//                 //         </TouchableOpacity>
//                 //       </View>
//                 //     ) : (
//                 //       <View style={{ width: '100%', marginTop: 8 }}>
//                 //         <View style={styles.inputGroup}>
//                 //           <Text style={styles.inputLabel}>{t('authModal.emailAddress')}</Text>
//                 //           <TextInput
//                 //             style={[
//                 //               styles.textInput,
//                 //               resetEmailError ? { borderColor: COLORS.statusBooked } : null,
//                 //             ]}
//                 //             placeholder={t('authModal.emailPlaceholder')}
//                 //             placeholderTextColor={COLORS.textMuted}
//                 //             keyboardType="email-address"
//                 //             autoCapitalize="none"
//                 //             value={resetEmail}
//                 //             onChangeText={(val) => {
//                 //               setResetEmail(val);
//                 //               if (resetEmailError) setResetEmailError('');
//                 //             }}
//                 //           />
//                 //           {resetEmailError ? (
//                 //             <Text style={styles.fieldErrorText}>{resetEmailError}</Text>
//                 //           ) : null}
//                 //         </View>

//                 //         <TouchableOpacity
//                 //           style={styles.submitBtn}
//                 //           onPress={handleSendResetLink}
//                 //           activeOpacity={0.85}
//                 //         >
//                 //           <Text style={styles.submitBtnText}>{t('authModal.sendResetLink')}</Text>
//                 //         </TouchableOpacity>

//                 //         <TouchableOpacity
//                 //           style={styles.toggleModeBtn}
//                 //           onPress={() => {
//                 //             setShowForgotPassword(false);
//                 //             setResetEmailSent(false);
//                 //           }}
//                 //           activeOpacity={0.7}
//                 //         >
//                 //           <Text style={styles.toggleModeText}>{t('authModal.backToSignIn')}</Text>
//                 //         </TouchableOpacity>
//                 //       </View>
//                 //     )}
//                 //   </View>
//                 ) : user ? (
//                   /* Profile / Logged In View */
//                   <View style={styles.profileContainer}>
//                     <Image
//                       source={{ uri: user.avatar }}
//                       style={styles.avatarImage}
//                     />
//                     <Text style={styles.welcomeText}>{t('authModal.welcomeBack')}</Text>
//                     <Text style={styles.userNameText}>{user.name}!</Text>
//                     <Text style={styles.userEmailText}>{user.email}</Text>

//                     <View style={styles.verifiedBadge}>
//                       <ShieldCheck size={16} color={COLORS.accentCyan} />
//                       <Text style={styles.verifiedText}>{t('authModal.verifiedRider')}</Text>
//                     </View>

//                     <TouchableOpacity
//                       style={styles.signOutBtn}
//                       onPress={handleSignOut}
//                       activeOpacity={0.8}
//                     >
//                       <Text style={styles.signOutText}>{t('authModal.signOut')}</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ) : (
//                   /* Sign In / Sign Up View */
//                   <View>
//                     <Text style={styles.modalTitle}>
//                       {isSignUp ? t('authModal.createAccountTitle') : t('authModal.signInTitle')}
//                     </Text>
//                     <Text style={styles.modalSubtitle}>
//                       {isSignUp
//                         ? t('authModal.createAccountSubtitle')
//                         : t('authModal.signInSubtitle')}
//                     </Text>

//                     {isSignUp && ageVerified && (
//                       <View style={styles.ageVerifiedPill}>
//                         <ShieldCheck size={14} color={COLORS.statusAvailable} />
//                         <Text style={styles.ageVerifiedPillText}>{t('authModal.ageVerifiedPill')}</Text>
//                       </View>
//                     )}

//                     {/* Google OAuth Button */}
//                     <TouchableOpacity
//                       style={styles.googleBtn}
//                       onPress={handleGoogleClick}
//                       activeOpacity={0.85}
//                     >
//                       <GoogleIcon size={18} />
//                       <Text style={styles.googleBtnText}>{t('authModal.continueGoogle')}</Text>
//                     </TouchableOpacity>

//                     <View style={styles.dividerRow}>
//                       <View style={styles.dividerLine} />
//                       <Text style={styles.dividerText}>{t('authModal.or')}</Text>
//                       <View style={styles.dividerLine} />
//                     </View>

//                     {/* Inputs */}
//                     {isSignUp && (
//                       <View style={styles.inputGroup}>
//                         <Text style={styles.inputLabel}>{t('authModal.fullName')}</Text>
//                         <TextInput
//                           style={styles.textInput}
//                           placeholder={t('authModal.namePlaceholder')}
//                           placeholderTextColor={COLORS.textMuted}
//                           value={name}
//                           onChangeText={setName}
//                         />
//                       </View>
//                     )}

//                     <View style={styles.inputGroup}>
//                       <Text style={styles.inputLabel}>{t('authModal.emailAddress')}</Text>
//                       <TextInput
//                         style={[
//                           styles.textInput,
//                           emailError ? { borderColor: COLORS.statusBooked } : null,
//                         ]}
//                         placeholder={t('authModal.emailPlaceholder')}
//                         placeholderTextColor={COLORS.textMuted}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                         value={email}
//                         onChangeText={(val) => {
//                           setEmail(val);
//                           if (emailError) setEmailError('');
//                         }}
//                       />
//                       {emailError ? (
//                         <Text style={styles.fieldErrorText}>{emailError}</Text>
//                       ) : null}
//                     </View>

//                     {/* Forgot Password link (Sign In mode only) */}
//                     {/* {!isSignUp && (
//                       <View style={styles.forgotPasswordRow}>
//                         <TouchableOpacity
//                           style={styles.forgotPasswordBtn}
//                           onPress={() => {
//                             setShowForgotPassword(true);
//                             setResetEmail(email);
//                             setResetEmailError('');
//                             setResetEmailSent(false);
//                           }}
//                           activeOpacity={0.7}
//                         >
//                           <Text style={styles.forgotPasswordText}>{t('authModal.forgotPassword')}</Text>
//                         </TouchableOpacity>
//                       </View>
//                     )} */}

//                     <TouchableOpacity
//                       style={styles.submitBtn}
//                       onPress={handleEmailSubmit}
//                       activeOpacity={0.85}
//                     >
//                       <Text style={styles.submitBtnText}>
//                         {isSignUp ? t('authModal.signUpBtn') : t('authModal.signInBtn')}
//                       </Text>
//                     </TouchableOpacity>

//                     {/* Toggle Mode */}
//                     <TouchableOpacity
//                       style={styles.toggleModeBtn}
//                       onPress={handleToggleMode}
//                       activeOpacity={0.7}
//                     >
//                       <Text style={styles.toggleModeText}>
//                         {isSignUp
//                           ? t('authModal.haveAccountSignIn')
//                           : t('authModal.dontHaveAccountSignUp')}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               </ScrollView>
//             </View>
//           </TouchableWithoutFeedback>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
// >>>>>>> app
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 11, 20, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#0D1524',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 24,
    paddingTop: 20,
    width: 440,
    maxWidth: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 20,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    zIndex: 10,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  // },
  // forgotPasswordRow: {
  //   alignItems: 'flex-end',
  //   marginTop: -6,
  //   marginBottom: 16,
  // },
  // forgotPasswordBtn: {
  //   paddingVertical: 4,
  //   paddingHorizontal: 2,
  // },
  // forgotPasswordText: {
  //   color: COLORS.accentCyan || '#00A3FF',
  //   fontSize: 13,
  //   fontWeight: '600',
  // },
  // forgotPasswordContainer: {
  //   alignItems: 'center',
  //   paddingTop: 4,
  // },
  // resetSuccessWrap: {
  //   alignItems: 'center',
  //   paddingVertical: 18,
  //   width: '100%',
  // },
  // resetSuccessTitle: {
  //   fontSize: 18,
  //   fontWeight: '800',
  //   color: '#FFFFFF',
  //   marginBottom: 8,
  //   textAlign: 'center',
  // },
  // resetSuccessDesc: {
  //   fontSize: 13,
  //   color: '#94A3B8',
  //   textAlign: 'center',
  //   lineHeight: 20,
  //   paddingHorizontal: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 4,
    letterSpacing: -0.3,
  },
  modalSubtitle: {
    fontSize: 13.5,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  agePromptContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  ageBadgeCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    borderWidth: 2,
    borderColor: '#00A3FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  ageBadgeNumber: {
    color: '#00A3FF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  ageBadgeRestricted: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: '#EF4444',
  },
  ageActionsContainer: {
    width: '100%',
    marginTop: 8,
  },
  ageYesBtn: {
    backgroundColor: '#00A3FF',
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  ageYesBtnText: {
    color: '#050B14',
    fontSize: 15,
    fontWeight: '800',
  },
  ageNoBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  ageNoBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelLinkText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
  ageVerifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: 16,
  },
  ageVerifiedPillText: {
    color: COLORS.statusAvailable,
    fontSize: 12,
    fontWeight: '600',
  },
  underAgeActionsContainer: {
    width: '100%',
    marginTop: 10,
  },
  underAgeBackBtn: {
    width: '100%',
    backgroundColor: '#00A3FF',
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  underAgeBackBtnText: {
    color: '#050B14',
    fontSize: 15,
    fontWeight: '800',
  },
  googleBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  googleBtnText: {
    color: '#050B14',
    fontSize: 15,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dividerText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#090F1A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  fieldErrorText: {
    color: COLORS.statusBooked,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
    fontWeight: '500',
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#00A3FF',
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 16,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  submitBtnText: {
    color: '#050B14',
    fontSize: 15,
    fontWeight: '700',
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  toggleModeBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleModeText: {
    color: '#00A3FF',
    fontSize: 13.5,
    fontWeight: '600',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: COLORS.accentCyan,
    marginBottom: 14,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmailText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginBottom: 24,
  },
  verifiedText: {
    color: COLORS.accentCyan,
    fontSize: 12,
    fontWeight: '600',
  },
  signOutBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.statusBooked,
    borderRadius: RADIUS.full,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: COLORS.statusBooked,
    fontSize: 14,
    fontWeight: '700',
  },

  /* OTP Screen Styles */
  otpContainer: {
    paddingVertical: 6,
    alignItems: 'center',
    width: '100%',
  },
  otpBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingVertical: 4,
  },
  otpBackBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  otpBadgeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    borderWidth: 2,
    borderColor: '#00A3FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
    marginTop: 2,
  },
  otpTargetEmail: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  otpInputWrapper: {
    width: '100%',
    position: 'relative',
    marginVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  otpBox: {
    width: 56,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#090F1A',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxActive: {
    borderColor: '#00A3FF',
    backgroundColor: 'rgba(0, 163, 255, 0.05)',
  },
  otpBoxFilled: {
    borderColor: '#38BDF8',
  },
  otpDigitText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  hiddenOtpInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.01,
    fontSize: 1,
    color: 'transparent',
  },
  otpErrorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  otpErrorText: {
    color: COLORS.statusBooked,
    fontSize: 13,
    fontWeight: '600',
  },
  otpResentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginBottom: 10,
  },
  otpResentText: {
    color: COLORS.statusAvailable,
    fontSize: 12,
    fontWeight: '600',
  },
  demoOtpWrap: {
    marginBottom: 10,
  },
  demoOtpText: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  timerCountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerCountText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  resendBtnText: {
    color: COLORS.accentCyan,
    fontSize: 13.5,
    fontWeight: '700',
  },
  changeEmailBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  changeEmailText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
});
