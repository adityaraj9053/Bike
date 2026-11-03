import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2, PhoneCall, Smartphone, AlertCircle } from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import { useLanguage } from '../context/LanguageContext';

export default function EnquiryModal({ isOpen, onClose, selectedBike, onShowToast, user }) {
  const { t, language } = useLanguage();
  const [bikeId, setBikeId] = useState(selectedBike?.id || 'night-hawk-cruiser');
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone ? user.phone.replace('+91 ', '') : '');
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
    if (user) {
      if (user.name && !fullName) setFullName(user.name);
      if (user.phone && !phone) setPhone(user.phone.replace('+91 ', ''));
    }
  }, [user]);

  if (!isOpen) return null;

  const currentBike = BIKES_DATA.find((b) => b.id === bikeId) || BIKES_DATA[0];

  // Needs phone asked only if user logged in by email and has no phone
  const isEmailOnlyUser = user && user.email && (!user.phone || !user.phone.trim());

  const handleCallRedirect = () => {
    if (onShowToast) {
      onShowToast(language === 'hi' ? 'द रोड ईगल कंसीयज को कॉल मिलाई जा रही है (+91 98765 43210)...' : 'Connecting direct call to The Road Eagle (+91 98765 43210)...');
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
      onShowToast(language === 'hi' ? `${currentBike.name} पूछताछ के लिए व्हाट्सएप खोला जा रहा है!` : `Redirecting to WhatsApp for ${currentBike.name} enquiry!`);
    }
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailOnlyUser && (!phone || phone.length !== 10)) {
      if (onShowToast) {
        onShowToast(language === 'hi' ? 'कृपया कॉलबैक के लिए 10 अंकों का फोन नंबर प्रदान करें।' : 'Please enter a valid 10-digit mobile number for callback.');
      }
      return;
    }
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(language === 'hi' 
        ? `${currentBike.name} के लिए पूछताछ प्राप्त हुई! हमारी टीम शीघ्र ही आपसे संपर्क करेगी।` 
        : `Enquiry received for ${currentBike.name}! Our team will connect with you shortly.`);
    }
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px', width: '92%' }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
            <MessageCircle size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{t('enquiryTitle')}</h3>
          <p style={{ color: '#94A3B8', fontSize: '0.86rem' }}>
            {t('enquirySubtitle')}
          </p>
        </div>

        {/* Call and WhatsApp Quick Contact Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={handleCallRedirect}
            style={{
              background: '#0284C7',
              color: '#ffffff',
              padding: '12px 14px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <PhoneCall size={18} />
            <span>{language === 'hi' ? 'सीधे कॉल करें' : 'Call Concierge'}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppRedirect}
            style={{
              background: '#25D366',
              color: '#ffffff',
              padding: '12px 14px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <MessageCircle size={18} />
            <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'Chat WhatsApp'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '14px 0 18px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            {language === 'hi' ? 'या पूछताछ फॉर्म भरें' : 'or submit enquiry form'}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
              {language === 'hi' ? 'पूछताछ दर्ज कर ली गई है!' : 'Enquiry Received!'}
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
              {language === 'hi' 
                ? `${currentBike.name} के लिए आपकी पूछताछ हमारे रेंटल कंसीयज को भेज दी गई है।`
                : `We received your request for ${currentBike.name}. Our concierge will connect with you shortly.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">{language === 'hi' ? 'पसंदीदा बाइक' : 'Preferred Bike'}</label>
              <select
                className="form-select"
                value={bikeId}
                onChange={(e) => setBikeId(e.target.value)}
              >
                {BIKES_DATA.map((bike) => (
                  <option key={bike.id} value={bike.id}>
                    {bike.name} ({bike.model}) - ₹{bike.pricePerDay}/day
                  </option>
                ))}
              </select>
            </div>

            {/* Email-only user reminder notice */}
            {isEmailOnlyUser && (
              <div style={{
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '0.82rem',
                color: '#FBBF24',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{t('emailLoggedInPhoneNotice')}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">{t('riderName')}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Phone number input with +91 default */}
              <div className="form-group">
                <label className="form-label">
                  {t('riderPhone')} {isEmailOnlyUser ? ' *' : ''}
                </label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '8px',
                    padding: '12px 10px',
                    color: '#cbd5e1',
                    fontWeight: 700,
                    fontSize: '0.85rem'
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
                    required={!!isEmailOnlyUser}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">{t('pickupDate')}</label>
                <input
                  type="date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('returnDate')}</label>
                <input
                  type="date"
                  className="form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{language === 'hi' ? 'विशेष अनुरोध या प्रश्न (वैकल्पिक)' : 'Special Requests / Notes (Optional)'}</label>
              <textarea
                rows="2"
                className="form-textarea"
                placeholder={language === 'hi' ? 'कोई विशेष प्रश्न या पूछताछ...' : 'Any questions about helmets, delivery or dates...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '13px', justifyContent: 'center', marginTop: '4px' }}
            >
              <Send size={16} />
              <span>{t('submitFormBtn')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
