import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Heart, 
  Award, 
  Bike, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  Compass
} from 'lucide-react';

export default function AboutUsPage({ onNavigate }) {
  const values = [
    {
      title: "Affordability",
      desc: "Premium motorcycles and scooters at competitive, transparent day rates with zero hidden fees.",
      icon: Award
    },
    {
      title: "Unmatched Satisfaction",
      desc: "Dedicated concierge team focused on making your road adventure effortless and memorable.",
      icon: Heart
    },
    {
      title: "Mechanical Precision",
      desc: "In-house certified mechanics performing rigorous 24-point inspections on every vehicle before departure.",
      icon: Wrench
    },
    {
      title: "Rider Safety First",
      desc: "Complimentary certified helmets, comprehensive insurance coverage, and 24/7 roadside assistance.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="about-us-page" style={{ padding: '50px 0 90px' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ maxWidth: '820px', margin: '0 auto 48px' }}>
          <span className="section-pretitle">OUR STORY & VISION</span>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            More Than a Ride.<br />
            <span className="text-cyan">It's Your Freedom.</span>
          </h1>
          <p className="section-subtitle">
            Founded by passionate motorcyclists, The Road Eagle was built to bridge the gap between high-end touring machines and everyday accessible rentals.
          </p>
        </div>

        {/* Stats Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: '16px',
          padding: '36px 24px',
          textAlign: 'center',
          marginBottom: '70px'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A3FF', fontFamily: 'var(--font-heading)' }}>500+</div>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              ACTIVE RIDERS MONTHLY
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A3FF', fontFamily: 'var(--font-heading)' }}>98%</div>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              CUSTOMER SATISFACTION
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A3FF', fontFamily: 'var(--font-heading)' }}>50+</div>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              CURATED MOTORBIKES
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A3FF', fontFamily: 'var(--font-heading)' }}>24/7</div>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              ROADSIDE SUPPORT
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="story-grid" style={{ marginBottom: '80px' }}>
          <div className="story-image-wrap" style={{ height: '420px' }}>
            <img src="/images/workshop.jpg" alt="The Road Eagle Workshop" className="story-image" />
          </div>
          <div className="story-content">
            <span className="story-tag">OUR MISSION</span>
            <h2 className="story-title" style={{ fontSize: '2.4rem' }}>
              Redefining Urban & Touring Mobility
            </h2>
            <p className="story-text">
              We started The Road Eagle with a clear vision: to become the most trusted motorcycle rental partner in the region, recognized for uncompromising vehicle maintenance, transparent policies, and stellar customer service.
            </p>
            <p className="story-text">
              Whether you need an efficient scooter to bypass morning traffic, a classic cruiser to conquer mountain passes on the weekend, or a precision sport bike to experience true throttle response, our team ensures every ride is pristine, fully fueled, and ready for departure.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <h2 className="section-title">Our Guiding Values</h2>
            <p className="section-subtitle">What sets us apart on every kilometer of your journey.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(0, 163, 255, 0.15)',
                    color: '#00A3FF',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem' }}>{val.title}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6' }}>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-banner" style={{ margin: 0 }}>
          <div className="cta-banner-bg-graphic"></div>
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">Experience the Eagle Difference</h2>
            <p className="cta-banner-subtitle">
              Choose from our latest models and set off on your next unforgettable ride today.
            </p>
            <button 
              className="btn-primary" 
              style={{ background: '#080C14', color: '#ffffff' }}
              onClick={() => onNavigate('motorbikes')}
            >
              <Bike size={18} />
              <span>Explore Fleet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
