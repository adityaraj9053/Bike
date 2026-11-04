import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2, PhoneCall, AlertCircle } from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import { COUNTRY_CODES } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';

export default function EnquiryModal({ isOpen, onClose, selectedBike, onShowToast, user }) {
  const { t, language } = useLanguage();
  const [bikeId, setBikeId] = useState(selectedBike?.id || 'night-hawk-cruiser');
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedBike) {
      setBikeId(selectedBike.id);
    }
  }, [selectedBike]);

  useEffect(() => {
    // Keep inputs strictly clean with placeholders visible
  }, [user]);

  if (!isOpen) return null;

  const currentBike = BIKES_DATA.find((b) => b.id === bikeId) || BIKES_DATA[0];

  // Needs phone asked only if user logged in by email and has no phone
  const isEmailOnlyUser = user && user.email && (!user.phone || !user.phone.trim());

  const handleCallRedirect = () => {
    if (onShowToast) {
      onShowToast(
        language === 'hi' 
          ? 'द रोड ईगल कंसीयज को कॉल मिलाई जा रही है (+91 98765 43210)...' 
          : 'Connecting direct call to The Road Eagle (+91 98765 43210)...'
      );
    }
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello The Road Eagle! I would like to enquire about renting the ${currentBike.name} (${currentBike.model}).\n` +
      `Dates: ${startDate || 'Flexible'} to ${endDate || 'Flexible'}\n` +
      `My Name: ${fullName || user?.name || 'Rider'}\n` +
      `Contact Phone: ${phone ? `+91 ${phone}` : user?.phone || 'Not provided'}\n` +
      (user?.email ? `Email: ${user.email}\n` : '') +
      (message ? `Note: ${message}` : '')
    );
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, '_blank');
    if (onShowToast) {
      onShowToast(
        language === 'hi' 
          ? `${currentBike.name} पूछताछ के लिए व्हाट्सएप खोला जा रहा है!` 
          : `Redirecting to WhatsApp for ${currentBike.name} enquiry!`
      );
    }
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailOnlyUser && (!phone || phone.length !== 10)) {
      if (onShowToast) {
        onShowToast(
          language === 'hi' 
            ? 'कृपया कॉलबैक के लिए 10 अंकों का फोन नंबर प्रदान करें।' 
            : 'Please enter a valid 10-digit mobile number for callback.'
        );
      }
      return;
    }
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(
        language === 'hi' 
          ? `${currentBike.name} के लिए पूछताछ प्राप्त हुई! हमारी टीम शीघ्र ही आपसे संपर्क करेगी।` 
          : `Enquiry received for ${currentBike.name}! Our team will connect with you shortly.`
      );
    }
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000, overflowX: 'hidden' }}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '480px', 
          width: '92%',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            background: 'rgba(37, 211, 102, 0.15)',
            color: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <MessageCircle size={26} />
          </div>
          <h3 style={{ fontSize: '1.45rem', marginBottom: '4px' }}>{t('enquiryTitle')}</h3>
          <p style={{ color: '#94A3B8', fontSize: '0.86rem' }}>
            {t('enquirySubtitle')}
          </p>
        </div>

        {/* Call and WhatsApp Quick Contact Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
          <button
            type="button"
            onClick={handleCallRedirect}
            style={{
              background: '#0284C7',
              color: '#ffffff',
              padding: '11px 14px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <PhoneCall size={16} />
            <span>{language === 'hi' ? 'सीधे कॉल करें' : 'Call Concierge'}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppRedirect}
            style={{
              background: '#25D366',
              color: '#ffffff',
              padding: '11px 14px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <MessageCircle size={16} />
            <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'Chat WhatsApp'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '14px 0 16px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ color: '#64748B', fontSize: '0.74rem', textTransform: 'uppercase' }}>
            {language === 'hi' ? 'या पूछताछ फॉर्म भरें' : 'or submit enquiry form'}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 14px' }} />
            <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>
              {language === 'hi' ? 'पूछताछ दर्ज कर ली गई है!' : 'Enquiry Received!'}
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '0.86rem' }}>
              {language === 'hi' 
                ? `${currentBike.name} के लिए आपकी पूछताछ हमारे रेंटल कंसीयज को भेज दी गई है।`
                : `We received your request for ${currentBike.name}. Our concierge will connect with you shortly.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">{language === 'hi' ? 'पसंदीदा बाइक' : 'Preferred Bike'}</label>
              <select
                className="form-select"
                value={bikeId}
                onChange={(e) => setBikeId(e.target.value)}
                style={{ width: '100%', boxBoxSizing: 'border-box' }}
              >
                {BIKES_DATA.map((bike) => (
                  <option key={bike.id} value={bike.id}>
                    {bike.name} ({bike.model}) - ₹{bike.pricePerDay}/day
                  </option>
                ))}
              </select>
            </div>

            {/* Email-only user notice */}
            {isEmailOnlyUser && (
              <div style={{
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '9px 12px',
                fontSize: '0.8rem',
                color: '#FBBF24',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{t('emailLoggedInPhoneNotice')}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t('riderName')}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  required
                />
              </div>

              {/* Phone number input with international country code dropdown */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  {t('riderPhone')} {isEmailOnlyUser ? ' *' : ''}
                </label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <select
                    className="form-select"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{
                      width: 'auto',
                      minWidth: '95px',
                      maxWidth: '110px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '8px',
                      padding: '11px 6px',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      flexShrink: 0,
                      cursor: 'pointer'
                    }}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={`enq-${c.country}-${c.code}`} value={c.code} style={{ background: '#0e1422', color: '#ffffff' }}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder={countryCode === '+91' ? (language === 'hi' ? '10 अंकों का मोबाइल नंबर' : 'Enter 10-digit mobile number') : (language === 'hi' ? 'मोबाइल नंबर' : 'Enter mobile number')}
                    maxLength={15}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    style={{ flex: 1, minWidth: 0, boxSizing: 'border-box' }}
                    required={!!isEmailOnlyUser}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t('pickupDate')}</label>
                <input
                  type="date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{t('returnDate')}</label>
                <input
                  type="date"
                  className="form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">{language === 'hi' ? 'विशेष अनुरोध (वैकल्पिक)' : 'Special Requests (Optional)'}</label>
              <textarea
                rows="2"
                className="form-textarea"
                placeholder={language === 'hi' ? 'कोई विशेष प्रश्न या पूछताछ...' : 'Any questions about helmets, delivery or dates...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '12px', justifyContent: 'center', marginTop: '4px' }}
            >
              <Send size={15} />
              <span>{t('submitFormBtn')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
