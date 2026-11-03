import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  ShieldCheck, 
  MessageCircle, 
  Check, 
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import { useLanguage } from '../context/LanguageContext';

export default function BookingPage({ 
  selectedBike = BIKES_DATA[0], 
  onNavigate, 
  onOpenQuote, 
  onShowToast, 
  onOpenWhatsApp,
  onGoBack,
  user
}) {
  const { t, language } = useLanguage();
  const todayDateStr = new Date().toISOString().split('T')[0];
  const [step, setStep] = useState(1); // 1: DateSelection, 2: BookingSummary, 3: Confirmation
  const [pickupDate, setPickupDate] = useState(todayDateStr);
  const [pickupTime, setPickupTime] = useState('09:00 AM');
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [returnTime, setReturnTime] = useState('08:00 PM');
  
  // Rider details with default +91 country code and 10-digit mobile
  const [riderName, setRiderName] = useState(user?.name || 'Rahul Verma');
  const [riderPhone, setRiderPhone] = useState(user?.phone ? user.phone.replace('+91 ', '').replace(/\D/g, '') : '9876543210');
  const [riderEmail, setRiderEmail] = useState(user?.email || 'rahul.verma@example.com');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  // Field validation errors
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Validation functions
  const validateEmail = (str) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(str || '').trim().toLowerCase());
  };

  const validatePhone = (str) => {
    const clean = String(str || '').replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(clean);
  };

  const handlePhoneChange = (val) => {
    const clean = val.replace(/\D/g, '');
    setRiderPhone(clean);
    if (clean.length > 0 && !validatePhone(clean)) {
      setPhoneError(
        language === 'hi' 
          ? 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें (6-9 से शुरू)।' 
          : 'Please enter a valid 10-digit Indian mobile number (starting with 6-9).'
      );
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (val) => {
    setRiderEmail(val);
    if (val.length > 0 && !validateEmail(val)) {
      setEmailError(
        language === 'hi' 
          ? 'कृपया एक मान्य ईमेल पता दर्ज करें (उदा. rider@example.com)।' 
          : 'Please enter a valid email address (e.g. rider@example.com).'
      );
    } else {
      setEmailError('');
    }
  };

  const handleNameChange = (val) => {
    setRiderName(val);
    if (val.trim().length > 0) {
      setNameError('');
    }
  };

  useEffect(() => {
    if (user) {
      if (user.name) setRiderName(user.name);
      if (user.phone) setRiderPhone(user.phone.replace('+91 ', '').replace(/\D/g, ''));
      if (user.email) setRiderEmail(user.email);
    }
  }, [user]);

  const bike = selectedBike || BIKES_DATA[0];

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    try {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays + 1 : 1;
    } catch {
      return 3;
    }
  }, [pickupDate, returnDate]);

  const rentalTotal = rentalDays * bike.pricePerDay;
  const securityDeposit = bike.deposit;
  const totalPayable = rentalTotal + securityDeposit;
  const bookingRefId = 'RDE-' + Math.floor(100000 + Math.random() * 900000);

  const handleContinueToSummary = () => {
    setFormError('');
    if (!pickupDate || !returnDate) {
      setFormError(language === 'hi' ? 'कृपया पिकअप और वापसी की तिथि चुनें।' : 'Please select both pickup and return dates.');
      return;
    }
    if (new Date(returnDate) < new Date(pickupDate)) {
      setFormError(
        language === 'hi' 
          ? 'वापसी की तिथि पिकअप तिथि से पहले की नहीं हो सकती।' 
          : 'Return date cannot be earlier than pickup date.'
      );
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedPayment = () => {
    setFormError('');
    let hasError = false;

    // 1. Name check
    if (!riderName || !riderName.trim()) {
      setNameError(language === 'hi' ? 'कृपया राइडर का पूरा नाम दर्ज करें।' : 'Please enter the rider full name.');
      hasError = true;
    } else {
      setNameError('');
    }

    // 2. Strict Phone check (10 digits starting with 6-9)
    const cleanPhone = riderPhone.replace(/\D/g, '');
    if (!validatePhone(cleanPhone)) {
      setPhoneError(
        language === 'hi' 
          ? 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें (6, 7, 8 या 9 से शुरू)।' 
          : 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).'
      );
      hasError = true;
    } else {
      setPhoneError('');
    }

    // 3. Strict Email regex check
    if (!riderEmail || !validateEmail(riderEmail)) {
      setEmailError(
        language === 'hi' 
          ? 'कृपया एक मान्य ईमेल पता दर्ज करें (उदा. rider@example.com)।' 
          : 'Please enter a valid email address (e.g. rider@example.com).'
      );
      hasError = true;
    } else {
      setEmailError('');
    }

    if (hasError) {
      setFormError(
        language === 'hi' 
          ? 'कृपया फॉर्म में हाइलाइट की गई गलतियां सुधारें (मान्य ईमेल और 10 अंकों का मोबाइल नंबर अनिवार्य है)।' 
          : 'Please correct highlighted errors (valid email & 10-digit mobile number required).'
      );
      if (onShowToast) {
        onShowToast(
          language === 'hi' 
            ? 'कृपया मान्य ईमेल व 10 अंकों का मोबाइल नंबर दर्ज करें।' 
            : 'Please enter a valid email and 10-digit mobile number.'
        );
      }
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      if (onShowToast) {
        onShowToast(language === 'hi' ? `बुकिंग सफल! आपकी संदर्भ संख्या #${bookingRefId} है` : `Booking confirmed! Your reservation ref is #${bookingRefId}`);
      }
    }, 1200);
  };

  const handleDownloadQuote = () => {
    if (onOpenQuote) {
      onOpenQuote({
        refId: bookingRefId,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        days: rentalDays,
        rentalCharge: rentalTotal,
        deposit: securityDeposit,
        total: totalPayable
      });
    }
  };

  return (
    <div className="booking-page">
      <div className="container">
        {/* Top Back Navigation Button */}
        {onGoBack && (
          <button 
            type="button" 
            className="page-back-btn" 
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                onGoBack();
              }
            }}
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
            <span>{step > 1 ? (language === 'hi' ? 'पिछला स्टेप' : 'Previous Step') : (language === 'hi' ? 'पिछला पेज' : 'Back')}</span>
          </button>
        )}

        {/* ================= 18+ MANDATORY REMINDER BANNER ================= */}
        <div style={{
          background: 'rgba(255, 59, 48, 0.1)',
          border: '1.5px solid rgba(255, 59, 48, 0.4)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 16px rgba(255, 59, 48, 0.15)'
        }}>
          <div style={{
            background: '#FF3B30',
            color: '#ffffff',
            borderRadius: '6px',
            padding: '2px 8px',
            fontWeight: 900,
            fontSize: '0.82rem',
            letterSpacing: '0.04em',
            flexShrink: 0
          }}>
            18+ ONLY
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#ff857f', fontWeight: 600 }}>
            {t('ageReminderBanner')}
          </p>
        </div>

        {/* Stepper Header */}
        <div className="stepper-header">
          <div className={`step-indicator ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
            <div className="step-badge">{step > 1 ? <Check size={16} /> : '1'}</div>
            <span>{language === 'hi' ? '1. तिथियों का चयन' : '1. DATE SELECTION'}</span>
          </div>

          <div style={{ width: '40px', height: '2px', background: step > 1 ? '#00A3FF' : '#1e293b' }}></div>

          <div className={`step-indicator ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
            <div className="step-badge">{step > 2 ? <Check size={16} /> : '2'}</div>
            <span>{language === 'hi' ? '2. विवरण और भुगतान' : '2. SUMMARY & PAYMENT'}</span>
          </div>
        </div>

        {formError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #EF4444',
            color: '#EF4444',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            {formError}
          </div>
        )}

        {/* STEP 1: DATE SELECTION */}
        {step === 1 && (
          <div className="booking-layout">
            {/* Left Box: Date Inputs */}
            <div className="booking-card">
              <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('bookingTitle')}</h1>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '28px' }}>
                {t('bookingSubtitle')}
              </p>

              <div className="booking-form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    {t('pickupDate')}
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    min={todayDateStr}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    {t('pickupTime')}
                  </label>
                  <select
                    className="form-select"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  >
                    <option value="09:00 AM">09:00 AM (Hub Opens)</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    {t('returnDate')}
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    min={pickupDate || todayDateStr}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    {t('returnTime')}
                  </label>
                  <select
                    className="form-select"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                  >
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM (Hub Closes)</option>
                    <option value="10:00 AM">10:00 AM (Next Day)</option>
                  </select>
                </div>
              </div>

              {/* Security Deposit Notice */}
              <div className="notice-box">
                <Info size={22} color="#00A3FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p>
                  {language === 'hi' 
                    ? <>पिकअप के समय <strong>₹{bike.deposit.toLocaleString()}*</strong> की सुरक्षा जमा राशि ली जाएगी। बाइक वापसी पर निरीक्षण के बाद यह पूरी तरह से वापस कर दी जाती है।</>
                    : <>A security deposit of <strong>₹{bike.deposit.toLocaleString()}*</strong> will be collected at pickup. This is 100% fully refundable upon vehicle handover inspection.</>}
                </p>
              </div>

              {/* Continue Button */}
              <button
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1.05rem', justifyContent: 'center' }}
                onClick={handleContinueToSummary}
              >
                <span>{t('continueSummary')}</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Box: Selected Bike Preview Card */}
            <div className="booking-card" style={{ padding: '24px' }}>
              <div style={{ height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '18px' }}>
                <img
                  src={bike.image}
                  alt={bike.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{bike.name}</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '18px' }}>
                {bike.model} • {bike.specs.displacement}
              </p>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>{t('rentalCharges')}</span>
                  <span style={{ fontWeight: 700 }}>₹{bike.pricePerDay.toLocaleString()} {t('perDay')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>{t('securityDeposit')}</span>
                  <span style={{ fontWeight: 700, color: '#00A3FF' }}>₹{bike.deposit.toLocaleString()}*</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>{language === 'hi' ? 'अवधि' : 'Estimated Days'}</span>
                  <span style={{ fontWeight: 700 }}>{rentalDays} {language === 'hi' ? 'दिन' : 'Days'}</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => onNavigate('motorbikes')}
                  style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  {language === 'hi' ? 'दूसरी बाइक चुनें' : 'Need a different bike? Change Selection'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BOOKING SUMMARY & PAYMENT */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <button
                className="btn-outline"
                style={{ padding: '8px 18px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} />
                <span>{t('backToDates')}</span>
              </button>
            </div>

            <div className="booking-layout">
              {/* Left Column: Summary & Cost Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Bike & Schedule Card */}
                <div className="booking-card">
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 160px) 1fr', gap: '20px', alignItems: 'center' }}>
                    <div style={{ height: '130px', borderRadius: '10px', overflow: 'hidden' }}>
                      <img src={bike.image} alt={bike.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.45rem', marginBottom: '4px' }}>{bike.name}</h2>
                      <p style={{ color: '#94A3B8', fontSize: '0.86rem', marginBottom: '12px' }}>
                        {bike.model} • {bike.specs.displacement} • {bike.specs.transmission}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem' }}>
                        <div>
                          <span style={{ color: '#64748B', display: 'block' }}>{language === 'hi' ? 'पिकअप' : 'PICKUP'}</span>
                          <strong>{pickupDate} • {pickupTime}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748B', display: 'block' }}>{language === 'hi' ? 'वापसी' : 'RETURN'}</span>
                          <strong>{returnDate} • {returnTime}</strong>
                        </div>
                      </div>
                      <div style={{ marginTop: '10px', color: '#00A3FF', fontSize: '0.84rem', fontWeight: 600 }}>
                        🔄 {rentalDays} {language === 'hi' ? 'दिनों का किराया' : 'Billing Days'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Breakdown Card */}
                <div className="booking-card">
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>{t('paymentBreakdown')}</h3>
                  
                  <div className="breakdown-row">
                    <span style={{ color: '#cbd5e1' }}>{t('rentalCharges')} (₹{bike.pricePerDay.toLocaleString()} × {rentalDays} {language === 'hi' ? 'दिन' : 'days'})</span>
                    <span style={{ fontWeight: 600 }}>₹{rentalTotal.toLocaleString()}</span>
                  </div>

                  <div className="breakdown-row">
                    <span style={{ color: '#00A3FF' }}>{t('securityDeposit')}</span>
                    <span style={{ fontWeight: 600, color: '#00A3FF' }}>₹{securityDeposit.toLocaleString()}*</span>
                  </div>

                  <div className="breakdown-row total">
                    <span>{t('totalPayable')}</span>
                    <span style={{ color: '#00A3FF' }}>₹{totalPayable.toLocaleString()}</span>
                  </div>

                  <div className="notice-box" style={{ marginTop: '20px', marginBottom: 0 }}>
                    <Info size={20} color="#00A3FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.82rem' }}>
                      {language === 'hi'
                        ? <><strong>सुरक्षा जमा रिफंड:</strong> ₹{bike.deposit.toLocaleString()}* की सुरक्षा जमा राशि वाहन वापसी और निरीक्षण के 24-48 घंटों के भीतर पूर्ण रूप से वापस कर दी जाती है।</>
                        : <><strong>Refund Information:</strong> The deposit of ₹{bike.deposit.toLocaleString()}* is fully refundable within 24-48 hours post return vehicle inspection.</>}
                    </p>
                  </div>
                </div>

                {/* Rider Details with +91 Country Code and 10 Digits */}
                <div className="booking-card">
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>{t('riderInfo')}</h3>
                  <div className="booking-form-grid" style={{ margin: 0 }}>
                    <div className="form-group">
                      <label className="form-label">{t('riderName')}</label>
                      <input
                        type="text"
                        className={`form-input ${nameError ? 'is-invalid' : ''}`}
                        value={riderName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Rahul Verma"
                        required
                      />
                      {nameError && (
                        <div className="form-error-text">
                          <span>{nameError}</span>
                        </div>
                      )}
                    </div>

                    {/* Strict +91 and 10-digit mobile number */}
                    <div className="form-group">
                      <label className="form-label">{t('riderPhone')}</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: phoneError ? '1px solid #EF4444' : '1px solid var(--border-card)',
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
                          className={`form-input ${phoneError ? 'is-invalid' : ''}`}
                          placeholder="9876543210"
                          maxLength={10}
                          value={riderPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          style={{ flex: 1 }}
                          required
                        />
                      </div>
                      {phoneError ? (
                        <div className="form-error-text">
                          <span>{phoneError}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                          {t('countryCodeNote')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '14px' }}>
                    <label className="form-label">{t('riderEmail')}</label>
                    <input
                      type="email"
                      className={`form-input ${emailError ? 'is-invalid' : ''}`}
                      placeholder="e.g. rahul.verma@example.com"
                      value={riderEmail}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      required
                    />
                    {emailError && (
                      <div className="form-error-text">
                        <span>{emailError}</span>
                      </div>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', marginTop: '24px', marginBottom: '12px' }}>
                    {language === 'hi' ? 'भुगतान का तरीका' : 'Payment Method'}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                    {[
                      { id: 'upi', label: language === 'hi' ? 'तुरंत UPI / QR' : 'Instant UPI / QR' },
                      { id: 'card', label: language === 'hi' ? 'क्रेडिट / डेबिट कार्ड' : 'Credit / Debit Card' },
                      { id: 'pickup', label: language === 'hi' ? 'पिकअप पर भुगतान' : 'Pay at Hub Pickup' }
                    ].map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        style={{
                          background: paymentMethod === m.id ? 'rgba(0, 163, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${paymentMethod === m.id ? '#00A3FF' : 'var(--border-card)'}`,
                          borderRadius: '8px',
                          padding: '12px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        {m.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Confirm & Pay Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="booking-card">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{t('confirmAndPay')}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '20px' }}>
                    {language === 'hi' 
                      ? 'आगे बढ़ने पर आप हमारे रेंटल नियमों और 18+ उम्र पात्रता से सहमत होते हैं।'
                      : 'By proceeding, you agree to our Rental Policies and confirm vehicle availability.'}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                      className="btn-primary"
                      style={{ 
                        width: '100%', 
                        padding: '15px', 
                        justifyContent: 'center', 
                        fontSize: '1rem',
                        background: '#FF3B30',
                        color: '#ffffff',
                        fontWeight: 700,
                        boxShadow: '0 4px 16px rgba(255, 59, 48, 0.35)'
                      }}
                      onClick={handleProceedPayment}
                      disabled={isProcessing}
                    >
                      <span>{isProcessing ? (language === 'hi' ? 'बुकिंग जारी है...' : 'Confirming Reservation...') : t('confirmAndPay')}</span>
                      <ArrowRight size={18} />
                    </button>

                    <button
                      className="btn-outline"
                      style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
                      onClick={handleDownloadQuote}
                    >
                      <FileText size={16} />
                      <span>{language === 'hi' ? 'कोटेशन डाउनलोड करें (PDF)' : 'Download Quote (PDF)'}</span>
                    </button>
                  </div>
                </div>

                {/* Required at Pickup Checklist with 18+ requirement */}
                <div className="booking-card">
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: '#ffffff' }}>
                    {language === 'hi' ? 'पिकअप के समय आवश्यक दस्तावेज:' : 'Required at Pickup:'}
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF3B30', fontWeight: 600 }}>
                      <AlertTriangle size={16} color="#FF3B30" />
                      <span>{language === 'hi' ? '18+ आयु का सरकारी पहचान प्रमाण' : '18+ Age Government Identity Proof'}</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8' }}>
                      <CheckCircle2 size={16} color="#00A3FF" />
                      <span>{language === 'hi' ? 'मूल ड्राइविंग लाइसेंस (टू-व्हीलर)' : 'Original Driving License (2-Wheeler)'}</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8' }}>
                      <CheckCircle2 size={16} color="#00A3FF" />
                      <span>{language === 'hi' ? 'आधार कार्ड / पासपोर्ट' : 'Aadhaar / Passport / Voter ID'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMATION & SUCCESS SCREEN */}
        {step === 3 && (
          <div style={{ maxWidth: '640px', margin: '20px auto', textAlign: 'center' }}>
            <div className="booking-card" style={{ padding: '40px 24px' }}>
              <div style={{
                width: '68px',
                height: '68px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px'
              }}>
                <CheckCircle2 size={38} />
              </div>

              <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>{t('bookingConfirmed')}</h1>
              <p style={{ color: '#94A3B8', fontSize: '1rem', marginBottom: '24px' }}>
                {language === 'hi' 
                  ? `आपकी ${bike.name} ${pickupDate} (${pickupTime}) के लिए आरक्षित कर दी गई है।`
                  : `Your ${bike.name} is reserved for ${pickupDate} (${pickupTime}).`}
              </p>

              {/* Reservation Code Badge */}
              <div style={{
                background: 'rgba(0, 163, 255, 0.1)',
                border: '1.5px dashed #00A3FF',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '28px'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {language === 'hi' ? 'बुकिंग संदर्भ संख्या' : 'Booking Reference Number'}
                </span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00A3FF', marginTop: '4px' }}>
                  #{bookingRefId}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  onClick={() => onNavigate('home')}
                >
                  <span>{language === 'hi' ? 'होम पेज पर जाएं' : 'Return to Home'}</span>
                </button>
                <button
                  className="btn-whatsapp"
                  onClick={() => onOpenWhatsApp(bike)}
                >
                  <MessageCircle size={18} />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर सहायता लें' : 'WhatsApp Concierge'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
