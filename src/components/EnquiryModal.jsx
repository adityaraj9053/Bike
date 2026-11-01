import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2, Calendar, Phone, User } from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';

export default function EnquiryModal({ isOpen, onClose, selectedBike, onShowToast }) {
  const [bikeId, setBikeId] = useState(selectedBike?.id || 'night-hawk-cruiser');
  const [fullName, setFullName] = useState('');
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

  if (!isOpen) return null;

  const currentBike = BIKES_DATA.find((b) => b.id === bikeId) || BIKES_DATA[0];

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello The Road Eagle! I would like to enquire about renting the ${currentBike.name} (${currentBike.model}).\n` +
      `Dates: ${startDate || 'Flexible'} to ${endDate || 'Flexible'}\n` +
      `My Name: ${fullName || 'Rider'}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      (message ? `Note: ${message}` : '')
    );
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, '_blank');
    onShowToast(`Redirecting to WhatsApp for ${currentBike.name} enquiry!`);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast(`Enquiry received for ${currentBike.name}! Our team will call you at ${phone || 'your number'} shortly.`);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            background: 'rgba(0, 163, 255, 0.15)',
            color: '#00A3FF',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <MessageCircle size={26} />
          </div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Enquire on WhatsApp</h3>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
            Instant response from our rental concierge team (+91 98765 43210)
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Enquiry Submitted!</h4>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
              We have received your enquiry for <strong>{currentBike.name}</strong>. An agent will connect with you right away.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Preferred Bike</label>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message / Questions (Optional)</label>
              <textarea
                rows="2"
                className="form-textarea"
                placeholder="Any special requests or queries..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                className="btn-whatsapp"
                style={{ width: '100%', padding: '13px', justifyContent: 'center', fontSize: '0.95rem' }}
                onClick={handleWhatsAppRedirect}
              >
                <MessageCircle size={18} />
                <span>Open WhatsApp Chat Directly</span>
              </button>

              <button
                type="submit"
                className="btn-outline"
                style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
              >
                <Send size={16} />
                <span>Submit Form Instead</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
