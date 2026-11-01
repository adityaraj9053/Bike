import React, { useState } from 'react';
import { 
  Bike, 
  Tag, 
  Headphones, 
  CalendarCheck, 
  ArrowRight, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Zap, 
  Fuel, 
  Cog, 
  Plus, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { BIKES_DATA, CATEGORIES_DATA, FAQS_DATA, TESTIMONIALS_DATA } from '../data/bikes';

export default function HomePage({ 
  onNavigate, 
  onSelectBike, 
  onStartBooking, 
  onOpenWhatsApp 
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const featuredBikes = BIKES_DATA.filter(b => b.isFeatured);

  return (
    <div className="home-page">
      {/* ================= HERO SECTION ================= */}
      <section 
        className="hero-section" 
        style={{ backgroundImage: `url('/images/hero-bike.jpg')` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-tag">THEROADEAGLE.COM</p>
          <h1 className="hero-title">
            Your Ride, Your Route,<br />
            <span className="text-gradient">Your Freedom.</span>
          </h1>
          <p className="hero-subtitle">
            Discover [City Name] on two wheels. Find the perfect bike for your journey, from agile urban scooters to high-performance cruisers and superbikes.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary" 
              onClick={() => onNavigate('motorbikes')}
            >
              <Bike size={18} />
              <span>Explore Bikes</span>
            </button>
            <button 
              className="btn-whatsapp-dark" 
              onClick={() => onOpenWhatsApp()}
            >
              <MessageCircle size={18} color="#00A3FF" />
              <span>Enquire on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURE STRIP ================= */}
      <section className="feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Bike size={24} /></div>
              <span className="feature-strip-title">Multiple Bike Options</span>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Tag size={24} /></div>
              <span className="feature-strip-title">Transparent Pricing</span>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Headphones size={24} /></div>
              <span className="feature-strip-title">Customer Assistance</span>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><CalendarCheck size={24} /></div>
              <span className="feature-strip-title">Easy Enquiries</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHILOSOPHY STATEMENT ================= */}
      <section style={{ padding: '80px 0 30px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '18px' }}>
            Ride More. <span className="text-cyan">Worry Less.</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: '1.8' }}>
            At The Road Eagle, we believe that the best way to experience [City Name] is on two wheels. Whether you're a local commuter or a traveler seeking adventure, our curated fleet of premium motorcycles and scooters ensures you have the freedom to navigate your route with absolute convenience and style.
          </p>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Ride</h2>
            <p className="section-subtitle">Tailored categories engineered for every type of rider and journey.</p>
          </div>

          <div className="category-cards-grid">
            {CATEGORIES_DATA.filter(c => c.id !== 'all').map((cat) => (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => onNavigate('motorbikes', cat.categoryKey)}
              >
                <img src={cat.image} alt={cat.label} className="category-card-img" />
                <div className="category-card-overlay">
                  <div>
                    <h3 className="category-card-title">{cat.label}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED FLEET ================= */}
      <section style={{ padding: '40px 0 90px' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-pretitle">OUR CURATED FLEET</span>
            <h2 className="section-title">Find Your Perfect Ride</h2>
            <p className="section-subtitle">Pristine condition, verified maintenance, and competitive day rates.</p>
          </div>

          <div className="bikes-grid">
            {featuredBikes.map((bike) => (
              <div key={bike.id} className="bike-card">
                <div className="bike-card-image-wrap">
                  <img src={bike.image} alt={bike.name} className="bike-card-image" />
                  <span className={`bike-badge ${bike.badgeType}`}>
                    {bike.badge}
                  </span>
                </div>
                <div className="bike-card-body">
                  <h3 className="bike-card-title">{bike.name}</h3>
                  <p className="bike-card-tagline">{bike.tagline}</p>
                  
                  <div className="bike-card-price-row">
                    <span className="bike-price">₹{bike.pricePerDay.toLocaleString()}</span>
                    <span className="bike-price-unit">/ day</span>
                  </div>

                  <div className="bike-specs-strip">
                    <div className="bike-spec-item">
                      <Zap size={14} />
                      <span>{bike.specs.displacement}</span>
                    </div>
                    <div className="bike-spec-item">
                      <Cog size={14} />
                      <span>Manual</span>
                    </div>
                    <div className="bike-spec-item">
                      <Fuel size={14} />
                      <span>{bike.specs.fuelType}</span>
                    </div>
                  </div>

                  <div className="bike-card-actions">
                    <button 
                      className="btn-card-action btn-primary"
                      onClick={() => onStartBooking(bike)}
                    >
                      <span>Book Now</span>
                      <ArrowRight size={16} />
                    </button>
                    <button 
                      className="btn-card-action btn-outline"
                      onClick={() => onSelectBike(bike)}
                    >
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button 
              className="btn-outline" 
              onClick={() => onNavigate('motorbikes')}
              style={{ padding: '14px 36px', fontSize: '1rem' }}
            >
              <span>View All Motorbikes ({BIKES_DATA.length})</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US (VIBRANT BLUE BANNER) ================= */}
      <section className="why-us-section">
        <div className="container">
          <h2 className="why-us-title">Why Choose Us?</h2>
          <div className="why-us-grid">
            <div className="why-us-card">
              <div className="why-us-icon-wrap">
                <Bike size={24} />
              </div>
              <h3 className="why-us-card-title">Multiple Bike Options</h3>
              <p className="why-us-card-text">
                From nimble city scooters to high-performance superbikes and cruisers, we have an exact ride for your adventure.
              </p>
            </div>

            <div className="why-us-card">
              <div className="why-us-icon-wrap">
                <Tag size={24} />
              </div>
              <h3 className="why-us-card-title">Affordable Rentals</h3>
              <p className="why-us-card-text">
                Competitive pricing with no hidden charges. What you see is what you pay—transparent as it gets.
              </p>
            </div>

            <div className="why-us-card">
              <div className="why-us-icon-wrap">
                <MessageCircle size={24} />
              </div>
              <h3 className="why-us-card-title">Easy Booking Enquiries</h3>
              <p className="why-us-card-text">
                Book and enquire instantly via WhatsApp or web for an effortless and paperless reservation experience.
              </p>
            </div>

            <div className="why-us-card">
              <div className="why-us-icon-wrap">
                <Headphones size={24} />
              </div>
              <h3 className="why-us-card-title">Customer Assistance</h3>
              <p className="why-us-card-text">
                24/7 dedicated roadside support and customer care to ensure your entire trip is worry-free and safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4-STEP PROCESS ================= */}
      <section className="steps-section">
        <div className="container">
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h4 className="step-title">Explore Bikes</h4>
              <p className="step-description">Browse our curated collection of motorcycles and scooters.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h4 className="step-title">Select Your Bike</h4>
              <p className="step-description">Pick the machine that perfectly matches your trip route.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h4 className="step-title">Contact Us</h4>
              <p className="step-description">Enquire availability via WhatsApp or instant online reservation.</p>
            </div>
            <div className="step-card">
              <div className="step-number">04</div>
              <h4 className="step-title">Confirm Booking</h4>
              <p className="step-description">Finalize your pickup dates and kickstart your adventure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY SECTION ================= */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image-wrap">
              <img src="/images/workshop.jpg" alt="Motorcycle Service Workshop" className="story-image" />
            </div>
            <div className="story-content">
              <span className="story-tag">OUR STORY</span>
              <h2 className="story-title">Your Trusted Travel Companion</h2>
              <p className="story-text">
                The Road Eagle was born from a deep passion for exploration and the raw thrill of the open road. We started with a simple goal: to make premium motorcycle rentals accessible, safe, and hassle-free in [City Name].
              </p>
              <p className="story-text" style={{ marginTop: '-8px' }}>
                Every single machine in our garage undergoes a rigorous 24-point pre-delivery inspection by certified mechanics, ensuring pristine brakes, fresh oil, and peak performance before you ever turn the key.
              </p>
              <a 
                href="#about-us" 
                className="story-link" 
                onClick={(e) => { e.preventDefault(); onNavigate('about-us'); }}
              >
                <span>Read More About Us</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-pretitle">TESTIMONIALS</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real experiences from our passionate community of riders.</p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div>
                  <div className="testimonial-stars">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#00A3FF" color="#00A3FF" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{t.review}"</p>
                </div>
                <div className="testimonial-user">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <h4 className="testimonial-name">{t.name}</h4>
                    <span className="testimonial-city">{t.city} • {t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQS ACCORDION ================= */}
      <section className="faqs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about deposits, licences, and rental rules.</p>
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

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <button 
              className="btn-outline" 
              style={{ border: 'none', color: '#00A3FF' }}
              onClick={() => onNavigate('how-it-works')}
            >
              <span>View All Rental FAQs & Guidelines →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION BANNER ================= */}
      <section className="container">
        <div className="cta-banner">
          <div className="cta-banner-bg-graphic"></div>
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">Ready for Your Next Ride?</h2>
            <p className="cta-banner-subtitle">
              Your journey is waiting. Explore our premium fleet of bikes and start your adventure today with instant confirmation.
            </p>
            <div className="cta-banner-buttons">
              <button 
                className="btn-primary" 
                style={{ background: '#080C14', color: '#ffffff' }}
                onClick={() => onNavigate('motorbikes')}
              >
                <Bike size={18} />
                <span>Explore Bikes</span>
              </button>
              <button 
                className="btn-whatsapp-dark" 
                style={{ background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)', color: '#080C14' }}
                onClick={() => onOpenWhatsApp()}
              >
                <MessageCircle size={18} color="#080C14" />
                <span style={{ fontWeight: 700 }}>Contact on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
