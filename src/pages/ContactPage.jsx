import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Compass,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import { COUNTRY_CODES } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage({ onShowToast, onOpenWhatsApp, onGoBack }) {
  const { t, language } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBikeId, setSelectedBikeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = phoneNumber.replace(/\D/g, '');
    if (!clean || (countryCode === '+91' ? clean.length !== 10 : clean.length < 7)) {
      if (onShowToast) {
        onShowToast(language === 'hi' ? 'कृपया एक मान्य मोबाइल नंबर दर्ज करें।' : 'Please enter a valid mobile number.');
      }
      return;
    }
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(language === 'hi' ? 'संदेश प्राप्त हुआ! हमारी टीम शीघ्र ही आपसे संपर्क करेगी।' : 'Inquiry received! Our team will contact you shortly.');
    }
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setMessage('');
    }, 2500);
  };

  return (
    <div className="contact-page" style={{ padding: '40px 0 90px' }}>
      <div className="container">
        {/* Top Back Navigation Button */}
        {onGoBack && (
          <button 
            type="button" 
            className="page-back-btn" 
            onClick={onGoBack}
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={16} />
            <span>{language === 'hi' ? 'पिछला पेज' : 'Back'}</span>
          </button>
        )}

        {/* Page Header */}
        <div className="section-header" style={{ marginBottom: '60px' }}>
          <span className="section-pretitle">{language === 'hi' ? 'हमसे संपर्क करें' : 'GET IN TOUCH'}</span>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            {language === 'hi' ? 'हम आपकी सहायता के लिए तैयार हैं' : "We're Here to Help You Ride"}
          </h1>
          <p className="section-subtitle">
            {language === 'hi'
              ? 'बाइक्स, रेंटल नीतियों या कस्टम टूरिंग पैकेज के बारे में कोई प्रश्न? सीधे कॉल करें या संदेश भेजें।'
              : 'Have questions about bike availability, rental rules, or custom route requirements? Reach out directly.'}
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact Form */}
          <div className="booking-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
              {language === 'hi' ? 'त्वरित संदेश या पूछताछ भेजें' : 'Send an Instant Message'}
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '28px' }}>
              {language === 'hi' ? 'फॉर्म भरें और हमारी टीम 15 मिनट में आपसे संपर्क करेगी।' : 'Fill out the form and our concierge team will respond within 15 minutes.'}
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
                  {language === 'hi' ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Message Sent Successfully!'}
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.92rem' }}>
                  {language === 'hi'
                    ? 'आपकी पूछताछ प्राप्त हो गई है। हमारी टीम जल्द ही आपसे जुड़ेगी।'
                    : 'We have received your enquiry. A rental concierge agent will call or message you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">{t('riderName')}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">{t('riderPhone')}</label>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <select
                        className="form-select"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        style={{
                          width: 'auto',
                          minWidth: '95px',
                          maxWidth: '115px',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--border-card)',
                          borderRadius: '8px',
                          padding: '11px 8px',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={`contact-${c.country}-${c.code}`} value={c.code} style={{ background: '#0e1422', color: '#ffffff' }}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder={countryCode === '+91' ? (language === 'hi' ? '10 अंकों का मोबाइल नंबर' : 'Enter 10-digit mobile number') : (language === 'hi' ? 'मोबाइल नंबर' : 'Enter mobile number')}
                        maxLength={15}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        style={{ flex: 1 }}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('riderEmail')}</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'पसंदीदा बाइक' : 'PREFERRED BIKE'}</label>
                  <select
                    className="form-select"
                    value={selectedBikeId}
                    onChange={(e) => setSelectedBikeId(e.target.value)}
                  >
                    <option value="">{language === 'hi' ? 'बाइक चुनें (या सभी विकल्प)' : 'Select a Bike (or All Options)'}</option>
                    {BIKES_DATA.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.model}) - ₹{b.pricePerDay}/day
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row-2">
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
                  <label className="form-label">{language === 'hi' ? 'संदेश / विशेष आवश्यकताएं' : 'YOUR MESSAGE / SPECIAL REQUIREMENTS'}</label>
                  <textarea
                    rows="3"
                    className="form-textarea"
                    placeholder={language === 'hi' ? 'रूट, डिलीवरी या अन्य प्रश्न...' : 'Tell us about your trip plans, helmet sizes, or pickup hub questions...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', justifyContent: 'center', marginTop: '6px' }}
                >
                  <Send size={18} />
                  <span>{language === 'hi' ? 'पूछताछ भेजें' : 'Submit Rental Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Phone & Direct Concierge */}
            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(0, 163, 255, 0.15)',
                  color: '#00A3FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>{language === 'hi' ? 'सीधा फोन कॉल' : 'Direct Phone Support'}</h3>
                  <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>{language === 'hi' ? '24/7 तुरंत सहायता' : 'Instant 24/7 Roadside Assistance'}</span>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '16px' }}>
                Speak directly with our vehicle dispatchers for urgent bookings or route emergencies.
              </p>
              <a
                href="tel:+919876543210"
                className="btn-primary"
                style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
              >
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </a>
            </div>

            {/* WhatsApp Quick Action */}
            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(37, 211, 102, 0.15)',
                  color: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MessageCircle size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WhatsApp Concierge'}</h3>
                  <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>{language === 'hi' ? 'औसत जवाब समय: 2 मिनट' : 'Average Response: 2 Minutes'}</span>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '16px' }}>
                Get live bike walk-around photos, check real-time hub availability, and fast-track identity document verification.
              </p>
              <button
                type="button"
                className="btn-whatsapp"
                style={{ width: '100%', padding: '12px', justifyContent: 'center', background: '#25D366', color: '#ffffff' }}
                onClick={() => onOpenWhatsApp()}
              >
                <MessageCircle size={16} />
                <span>{language === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat on WhatsApp'}</span>
              </button>
            </div>

            {/* Hub Locations & Operational Timings */}
            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#00A3FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>{language === 'hi' ? 'मुख्य हब पता' : 'Primary Hub Location'}</h3>
                  <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Central Dispatch Hub</span>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
                123 Rider Avenue, Sector 5, [City Name]<br />
                <span style={{ color: '#64748B', fontSize: '0.82rem' }}>Landmark: 500m from Central Metro Station</span>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '0.85rem' }}>
                <Clock size={16} />
                <span>Open 7 Days a Week: 09:00 AM – 09:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
