import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Bike, 
  CheckCircle2, 
  Plus, 
  AlertTriangle,
  HelpCircle 
} from 'lucide-react';
import { FAQS_DATA } from '../data/bikes';

export default function HowItWorksPage({ onNavigate }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const steps = [
    {
      num: "01",
      title: "Explore Our Bikes",
      desc: "Browse our diverse fleet of scooters, daily commuters, highway cruisers, and track-ready superbikes. Filter by budget, engine capacity, or transmission."
    },
    {
      num: "02",
      title: "Select Your Bike",
      desc: "Review detailed factory specifications, clear photos, rider reviews, and daily rental rates with zero hidden charges or surprises."
    },
    {
      num: "03",
      title: "Send Your Enquiry",
      desc: "Enquire directly via WhatsApp or book online. Select your preferred pickup date, time, and optional doorstep delivery."
    },
    {
      num: "04",
      title: "Confirm Your Booking",
      desc: "Present your driving licence and ID at our pickup hub or on delivery, inspect the vehicle, and ride off into the open road!"
    }
  ];

  return (
    <div className="how-it-works-page" style={{ padding: '50px 0 90px' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ maxWidth: '800px', margin: '0 auto 50px' }}>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            Getting Your Ride Is <br />
            <span className="text-cyan">Easier Than You Think.</span>
          </h1>
          <p className="section-subtitle">
            Follow four simple steps to find, book, and ride your preferred motorcycle with zero hassle.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="steps-grid" style={{ marginBottom: '80px' }}>
          {steps.map((s, idx) => (
            <div 
              key={idx} 
              className="step-card" 
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '16px',
                padding: '36px 24px',
                textAlign: 'left'
              }}
            >
              <div className="step-number" style={{ fontSize: '2.4rem' }}>{s.num}</div>
              <h3 className="step-title" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{s.title}</h3>
              <p className="step-description" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Rental Guidelines & Details */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <h2 className="section-title">Rental Guidelines & Details</h2>
            <p className="section-subtitle">Everything you need to know for a smooth and compliant ride.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <FileText size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>Documents Required</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7' }}>
                • <strong>Original Driving Licence:</strong> Must hold a valid Two-Wheeler / Motorcycle license (A-Category). Learners licenses are not acceptable.<br />
                • <strong>Government Photo ID:</strong> Aadhaar Card, Passport, or Voter ID for address verification.<br />
                • <strong>Photographs:</strong> 2 passport-size photographs or quick instant biometric selfie verification at hub pickup.
              </p>
            </div>

            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <ShieldCheck size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>Security Deposit</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7' }}>
                • A refundable security deposit starting from <strong>₹1,500 to ₹5,000*</strong> is collected at the time of vehicle handover.<br />
                • <strong>100% Refundable:</strong> Credited back to your original payment mode or bank account within 24 to 48 hours following vehicle return and quick condition inspection.
              </p>
            </div>

            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Clock size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>Rental Duration & Fuel Policy</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7' }}>
                • <strong>Minimum Rental:</strong> 24 hours. The rental clock starts from pickup time until the exact same time the following day.<br />
                • <strong>Fuel Policy:</strong> Same-to-same fuel level return. If picked up with a full tank, return with a full tank.<br />
                • <strong>Grace Period:</strong> A 30-minute buffer window is provided for return before overtime billing applies.
              </p>
            </div>

            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <AlertTriangle size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>Important Safety Guidelines</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7' }}>
                • <strong>Helmets:</strong> 1 complimentary sanitized ISI-approved helmet is provided with every bike rental.<br />
                • <strong>Rider Authorization:</strong> Only the registered, licence-verified rider is authorized to drive.<br />
                • <strong>Interstate / Mountain Travel:</strong> Prior intimation is required if planning to cross state borders.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <h2 className="section-title">Rental FAQs</h2>
            <p className="section-subtitle">Quick answers to frequently asked questions.</p>
          </div>

          <div className="faqs-list">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <span className="faq-icon"><Plus size={20} /></span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="cta-banner" style={{ margin: 0 }}>
          <div className="cta-banner-bg-graphic"></div>
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">Ready to Get Started?</h2>
            <p className="cta-banner-subtitle">
              Skip the paperwork and hit the road. Your perfect ride is just a few clicks away.
            </p>
            <button 
              className="btn-primary" 
              style={{ background: '#080C14', color: '#ffffff' }}
              onClick={() => onNavigate('motorbikes')}
            >
              <Bike size={18} />
              <span>Browse Motorbikes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
