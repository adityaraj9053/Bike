import React, { useState } from 'react';
import { 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Cog, 
  Fuel, 
  MessageCircle, 
  ArrowRight, 
  MapPin, 
  Clock, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import BookDropdown from '../components/BookDropdown';

export default function BikeDetailsPage({ 
  bike = BIKES_DATA[0], 
  onNavigate, 
  onStartBooking, 
  onOpenWhatsApp, 
  onSelectBike,
  onShowToast,
  user,
  onOpenAuth,
}) {
  const [activeImage, setActiveImage] = useState(bike.image);

  const handleBooking = (targetBike) => {
    if (!user) {
      if (onOpenAuth) onOpenAuth();
      return;
    }
    if (onStartBooking) onStartBooking(targetBike || bike);
  };

  // Fallback to bike.image if bike changes
  const gallery = bike.gallery || [bike.image];

  const similarBikes = BIKES_DATA.filter((b) => b.id !== bike.id).slice(0, 3);

  return (
    <div className="details-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
          <ChevronRight size={14} />
          <a href="#motorbikes" onClick={(e) => { e.preventDefault(); onNavigate('motorbikes'); }}>Motorbikes</a>
          <ChevronRight size={14} />
          <span style={{ color: '#00A3FF', fontWeight: 600 }}>{bike.name}</span>
        </div>

        {/* Hero Section: Gallery & Booking Info */}
        <div className="details-hero-grid">
          {/* Left: Image Gallery */}
          <div>
            <div className="gallery-main">
              <img src={activeImage} alt={bike.name} />
            </div>
            <div className="gallery-thumbs">
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`gallery-thumb ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${bike.name} thumb ${idx}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bike Quick Overview & Action Card */}
          <div className="details-info-box">
            <div className="details-title-row">
              <h1 className="details-name">{bike.name}</h1>
              <span className={`bike-badge ${bike.badgeType}`}>
                {bike.badge}
              </span>
            </div>
            
            <p className="details-model">{bike.model}</p>

            <div className="details-rating">
              <div style={{ display: 'flex', color: '#00A3FF' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#00A3FF" color="#00A3FF" />
                ))}
              </div>
              <span style={{ fontWeight: 700 }}>{bike.rating}</span>
              <span style={{ color: '#94A3B8' }}>({bike.reviewsCount} verified reviews)</span>
            </div>

            {/* Price Card */}
            <div className="details-price-card">
              <div className="details-price-row" style={{ alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.25rem', color: '#cbd5e1', fontWeight: 500 }}>from</span>
                    <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#FF3B30', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                      ${Math.round(bike.pricePerDay / 50)}
                    </span>
                    <span style={{ fontSize: '1rem', color: '#94A3B8' }}>/ day</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
                    (₹{bike.pricePerDay.toLocaleString()} INR / day)
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase' }}>Refundable Deposit</span>
                  <div style={{ color: '#00A3FF', fontWeight: 700, fontSize: '1.1rem' }}>
                    ₹{bike.deposit.toLocaleString()}*
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#34D399' }}>
                  <CheckCircle2 size={16} />
                  <span>{bike.availability}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#38BDF8' }}>
                  <ShieldCheck size={16} />
                  <span>Verified 24-Point Mechanical Inspection Completed</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '12px', alignItems: 'start' }}>
                <BookDropdown
                  bike={bike}
                  buttonText="Book this bike"
                  onShowToast={onShowToast}
                  onStartBooking={handleBooking}
                />
                <button
                  className="btn-whatsapp-dark"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                  onClick={() => onOpenWhatsApp(bike)}
                >
                  <MessageCircle size={18} color="#00A3FF" />
                  <span>Enquire</span>
                </button>
              </div>
            </div>

            {/* Quick Specs Icons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div>
                <Zap size={20} color="#00A3FF" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Engine</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{bike.specs.displacement}</div>
              </div>
              <div>
                <Cog size={20} color="#00A3FF" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Transmission</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Manual</div>
              </div>
              <div>
                <Fuel size={20} color="#00A3FF" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Fuel Type</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{bike.specs.fuelType}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Specification Details Grid */}
        <div className="details-specs-card">
          <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Specification Details</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Comprehensive factory technical specifications for this machine.</p>

          <div className="specs-table-grid">
            <div className="spec-cell">
              <div className="spec-cell-label">Engine Displacement</div>
              <div className="spec-cell-value">{bike.specs.displacement}</div>
            </div>
            <div className="spec-cell">
              <div className="spec-cell-label">Max Power</div>
              <div className="spec-cell-value">{bike.specs.power}</div>
            </div>
            <div className="spec-cell">
              <div className="spec-cell-label">Transmission</div>
              <div className="spec-cell-value">{bike.specs.transmission}</div>
            </div>
            <div className="spec-cell">
              <div className="spec-cell-label">Fuel System</div>
              <div className="spec-cell-value">{bike.specs.fuelSystem}</div>
            </div>
            <div className="spec-cell">
              <div className="spec-cell-label">Fuel Tank Capacity</div>
              <div className="spec-cell-value">{bike.specs.tankCapacity}</div>
            </div>
            <div className="spec-cell">
              <div className="spec-cell-label">Mileage / Range</div>
              <div className="spec-cell-value">{bike.specs.mileage}</div>
            </div>
            <div className="spec-cell">
              <div className="spec-cell-label">Seating Capacity</div>
              <div className="spec-cell-value">{bike.specs.seating}</div>
            </div>
            <div className="spec-cell">
              <div className="spec-cell-label">Kerb Weight</div>
              <div className="spec-cell-value">{bike.specs.weight}</div>
            </div>
            <div className="spec-cell">
              <div className="spec-cell-label">Braking System</div>
              <div className="spec-cell-value">{bike.specs.braking}</div>
            </div>
          </div>
        </div>

        {/* Rental Guidelines & Pickup Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '70px' }}>
          {/* Rental Guidelines */}
          <div className="details-specs-card" style={{ marginBottom: 0 }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="#00A3FF" />
              <span>Rental Guidelines</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <strong style={{ color: '#00A3FF', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                  Rental Duration
                </strong>
                <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  {bike.guidelines.duration}
                </p>
              </div>
              <div>
                <strong style={{ color: '#00A3FF', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                  Required Documents
                </strong>
                <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  {bike.guidelines.documents}
                </p>
              </div>
              <div>
                <strong style={{ color: '#00A3FF', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                  Security Deposit
                </strong>
                <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  {bike.guidelines.deposit}
                </p>
              </div>
            </div>
          </div>

          {/* Pickup & Return Information */}
          <div className="details-specs-card" style={{ marginBottom: 0 }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={20} color="#00A3FF" />
              <span>Pickup & Return Information</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <strong style={{ color: '#00A3FF', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                  Primary Hub Address
                </strong>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                  123 Rider Avenue, Sector 5, [City Name]
                </p>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>5 mins from Metro Station</span>
              </div>
              <div>
                <strong style={{ color: '#00A3FF', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                  Operational Timings
                </strong>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                  Monday - Sunday: 09:00 AM to 09:00 PM
                </p>
              </div>
              <div>
                <strong style={{ color: '#00A3FF', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                  Doorstep Delivery & Late Return
                </strong>
                <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  Doorstep bike delivery available within city limits (additional charge applies). Late returns have a 30-minute buffer window.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Motorbikes */}
        <div>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '28px' }}>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>Similar Motorbikes</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>Other riders also viewed these machines for similar journeys.</p>
          </div>

          <div className="bikes-grid">
            {similarBikes.map((simBike) => (
              <div 
                key={simBike.id} 
                className="bike-card"
                onClick={() => { onSelectBike(simBike); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ cursor: 'pointer' }}
              >
                <div className="bike-card-image-wrap" style={{ height: '180px' }}>
                  <img src={simBike.image} alt={simBike.name} className="bike-card-image" />
                </div>
                <div className="bike-card-body" style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{simBike.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '12px' }}>{simBike.model}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#00A3FF' }}>₹{simBike.pricePerDay}/day</span>
                    <span style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      View Details <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
