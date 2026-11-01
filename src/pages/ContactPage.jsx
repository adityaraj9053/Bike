import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';

export default function ContactPage({ onShowToast, onOpenWhatsApp }) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBikeId, setSelectedBikeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast(`Thank you, ${fullName || 'Rider'}! Your enquiry has been received.`);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  const handleOpenMaps = () => {
    window.open('https://maps.google.com/?q=123+Rider+Avenue+Sector+5', '_blank');
  };

  return (
    <div className="contact-page" style={{ padding: '50px 0 90px' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ maxWidth: '780px', margin: '0 auto 40px' }}>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            Let’s Get You on the <span className="text-cyan">Road.</span>
          </h1>
          <p className="section-subtitle">
            Have questions about our bikes, rental prices, or availability? Get in touch with our team anytime.
          </p>
        </div>

        {/* 4 Contact Info Mini Cards */}
        <div className="contact-info-cards">
          <div className="contact-mini-card">
            <div className="contact-mini-icon"><Phone size={22} /></div>
            <div>
              <div className="contact-mini-label">Phone Number</div>
              <a href="tel:+919876543210" className="contact-mini-val">+91 98765 43210</a>
            </div>
          </div>

          <div className="contact-mini-card" style={{ cursor: 'pointer' }} onClick={() => onOpenWhatsApp()}>
            <div className="contact-mini-icon"><MessageCircle size={22} color="#00A3FF" /></div>
            <div>
              <div className="contact-mini-label">WhatsApp Concierge</div>
              <span className="contact-mini-val">+91 98765 43210</span>
            </div>
          </div>

          <div className="contact-mini-card">
            <div className="contact-mini-icon"><Mail size={22} /></div>
            <div>
              <div className="contact-mini-label">Email Address</div>
              <a href="mailto:support@theroadeagle.com" className="contact-mini-val">support@theroadeagle.com</a>
            </div>
          </div>

          <div className="contact-mini-card">
            <div className="contact-mini-icon"><MapPin size={22} /></div>
            <div>
              <div className="contact-mini-label">Business Address</div>
              <span className="contact-mini-val">123 Rider Avenue, Sector 5, [City Name]</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="contact-grid">
          {/* Left: Send an Enquiry Form */}
          <div className="booking-card">
            <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Send an Enquiry</h2>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fill in your rental request and our concierge will verify vehicle schedule and confirm within 15 minutes.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={54} color="#10B981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Enquiry Submitted Successfully!</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
                  Our team has received your request and will reach out via WhatsApp / phone immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">FULL NAME</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">PHONE NUMBER</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 00000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">EMAIL ADDRESS (OPTIONAL)</label>
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
                  <label className="form-label">PREFERRED BIKE</label>
                  <select
                    className="form-select"
                    value={selectedBikeId}
                    onChange={(e) => setSelectedBikeId(e.target.value)}
                  >
                    <option value="">Select a Bike (or All Options)</option>
                    {BIKES_DATA.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.model}) - ₹{b.pricePerDay}/day
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">START DATE</label>
                    <input
                      type="date"
                      className="form-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">END DATE</label>
                    <input
                      type="date"
                      className="form-input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">MESSAGE</label>
                  <textarea
                    rows="3"
                    className="form-textarea"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '1rem', marginTop: '8px' }}
                >
                  <Send size={16} />
                  <span>Submit Enquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Location, Hours & Quick WhatsApp */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Our Location */}
            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <MapPin size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>Our Location</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.6' }}>
                Find us at our main hub located in the heart of the city with convenient metro connectivity and parking.
              </p>
              <div style={{
                height: '140px',
                borderRadius: '10px',
                background: 'radial-gradient(circle at center, #1e293b 0%, #0d121c 100%)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '18px'
              }}>
                <MapPin size={32} color="#00A3FF" />
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>123 Rider Avenue, Sector 5</span>
              </div>
              <button
                className="btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleOpenMaps}
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={16} />
              </button>
            </div>

            {/* Business Hours */}
            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Clock size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>Business Hours</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                  <span style={{ color: '#94A3B8' }}>Monday - Friday</span>
                  <strong style={{ color: '#ffffff' }}>09:00 AM - 09:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                  <span style={{ color: '#94A3B8' }}>Saturday</span>
                  <strong style={{ color: '#ffffff' }}>09:00 AM - 10:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Sunday</span>
                  <strong style={{ color: '#ffffff' }}>10:00 AM - 08:00 PM</strong>
                </div>
              </div>
            </div>

            {/* Need a Quick Response? WhatsApp Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0284C7 0%, #00A3FF 100%)',
              borderRadius: '16px',
              padding: '28px 24px',
              color: '#070E1B'
            }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>Need a Quick Response?</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(7, 14, 27, 0.85)', marginBottom: '20px', lineHeight: '1.5' }}>
                Chat with our experts instantly on WhatsApp for any urgent questions or same-day bookings.
              </p>
              <button
                className="btn-whatsapp-dark"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onOpenWhatsApp()}
              >
                <MessageCircle size={18} />
                <span>Contact on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
