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
import BookDropdown from '../components/BookDropdown';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage({ 
  onNavigate, 
  onSelectBike, 
  onStartBooking, 
  onOpenWhatsApp,
  onShowToast
}) {
  const { t, language } = useLanguage();
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
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <span className="hero-tag-pill">
              <span className="pulse-dot"></span>
              {t('heroTag')}
            </span>
          </div>

          <h1 className="hero-title">
            {t('heroTitlePart1')}<br />
            <span className="text-gradient">{t('heroTitlePart2')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('heroSubtitle')}
          </p>

          <div className="hero-buttons">
            <button 
              className="btn-primary" 
              onClick={() => onNavigate('motorbikes')}
            >
              <Bike size={18} />
              <span>{t('exploreBikes')}</span>
            </button>
            <button 
              className="btn-whatsapp-dark" 
              onClick={() => onOpenWhatsApp()}
            >
              <MessageCircle size={18} color="#25D366" />
              <span>{t('enquireWhatsApp')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURE STRIP ================= */}
      <section className="feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Bike size={22} /></div>
              <span className="feature-strip-title">{t('featMultipleBikes')}</span>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Tag size={22} /></div>
              <span className="feature-strip-title">{t('featPricing')}</span>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Headphones size={22} /></div>
              <span className="feature-strip-title">{t('featSupport')}</span>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><CalendarCheck size={22} /></div>
              <span className="feature-strip-title">{t('featEnquiries')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHILOSOPHY STATEMENT ================= */}
      <section style={{ padding: '75px 0 35px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {language === 'hi' ? 'ज्यादा घूमें। ' : 'Ride More. '}
            <span className="text-gradient">{language === 'hi' ? 'तनाव मुक्त रहें।' : 'Worry Less.'}</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: '1.8' }}>
            {language === 'hi' 
              ? 'द रोड ईगल में, हम मानते हैं कि यात्रा का सबसे सच्चा आनंद दो पहियों पर है। चाहे आप दैनिक आवागमन कर रहे हों या किसी नए साहसिक सफर पर निकले हों, हमारा फ्लीट पूरी सुरक्षा और स्वतंत्रता प्रदान करता है।'
              : 'At The Road Eagle, we believe that the best way to experience the open road is on two wheels. Whether you are a local rider or an adventurous traveler, our curated fleet ensures safety, comfort, and top performance.'}
          </p>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{language === 'hi' ? 'अपनी पसंदीदा श्रेणी चुनें' : 'Choose Your Ride'}</h2>
            <p className="section-subtitle">
              {language === 'hi' ? 'हर प्रकार के राइडर और सफर के लिए अनुकूलित मोटरसाइकिलें।' : 'Tailored categories engineered for every type of rider and journey.'}
            </p>
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
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <h3 className="category-card-title">{cat.label}</h3>
                    <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '4px' }}>
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
            <span className="section-pretitle">
              {language === 'hi' ? 'हमारा चुनिंदा फ्लीट' : 'OUR CURATED FLEET'}
            </span>
            <h2 className="section-title">
              {language === 'hi' ? 'अपनी परफेक्ट बाइक खोजें' : 'Find Your Perfect Ride'}
            </h2>
            <p className="section-subtitle">
              {language === 'hi' ? 'प्रमाणित रखरखाव, 24-पॉइंट निरीक्षण और किफायती दैनिक दरें।' : 'Pristine condition, verified maintenance, and competitive day rates.'}
            </p>
          </div>

          <div className="bikes-grid">
            {featuredBikes.map((bike) => (
              <div 
                key={bike.id} 
                className="bike-card"
              >
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
                    <span className="bike-price-unit">{t('perDay')}</span>
                  </div>

                  <div className="bike-specs-strip">
                    <div className="bike-spec-item">
                      <Zap size={13} color="#00A3FF" />
                      <span>{bike.specs.displacement}</span>
                    </div>
                    <div className="bike-spec-item">
                      <Cog size={13} color="#00A3FF" />
                      <span>{bike.specs.transmission || 'Manual'}</span>
                    </div>
                    <div className="bike-spec-item">
                      <Fuel size={13} color="#00A3FF" />
                      <span>{bike.specs.fuelType}</span>
                    </div>
                  </div>

                  <div className="bike-card-actions">
                    <BookDropdown
                      bike={bike}
                      buttonText={t('bookThisBike')}
                      size="compact"
                      onShowToast={onShowToast}
                      onStartBooking={onStartBooking}
                    />
                    <button 
                      className="btn-card-action btn-outline"
                      onClick={() => onSelectBike(bike)}
                    >
                      <span>{t('viewDetails')}</span>
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
              style={{ 
                padding: '12px 32px', 
                fontSize: '0.95rem',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                maxWidth: '300px'
              }}
            >
              <span>{language === 'hi' ? `सभी मोटरसाइकिलें देखें (${BIKES_DATA.length})` : `View All Motorbikes (${BIKES_DATA.length})`}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <h2 className="why-us-title">{language === 'hi' ? 'हमें क्यों चुनें?' : 'Why Choose Us?'}</h2>
            <p style={{ color: 'rgba(7, 14, 27, 0.85)', fontSize: '1.05rem', marginTop: '8px' }}>
              {language === 'hi' ? 'विश्वसनीयता, सुरक्षा और बेहतरीन सर्विस का भरोसा।' : 'Trusted for reliability, top safety standards, and unmatched support.'}
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-us-card">
              <div className="why-us-icon-wrap">
                <Bike size={24} />
              </div>
              <h3 className="why-us-card-title">{t('featMultipleBikes')}</h3>
              <p className="why-us-card-text">
                {language === 'hi' 
                  ? 'शहरी स्कूटरों से लेकर शक्तिशाली क्रूजर और सुपरबाइक्स तक, हर सफर के लिए सही वाहन।'
                  : 'From nimble city scooters to high-performance superbikes and cruisers, we have an exact ride for your adventure.'}
              </p>
            </div>

            <div className="why-us-card">
              <div className="why-us-icon-wrap">
                <Tag size={24} />
              </div>
              <h3 className="why-us-card-title">{language === 'hi' ? 'किफायती और पारदर्शी किराया' : 'Affordable Rentals'}</h3>
              <p className="why-us-card-text">
                {language === 'hi' 
                  ? 'कोई छिपा हुआ शुल्क नहीं। पूरी पारदर्शिता और 100% रिफंडेबल सिक्योरिटी डिपॉजिट।'
                  : 'Competitive pricing with no hidden charges. What you see is what you pay—transparent as it gets.'}
              </p>
            </div>

            <div className="why-us-card">
              <div className="why-us-icon-wrap">
                <MessageCircle size={24} />
              </div>
              <h3 className="why-us-card-title">{language === 'hi' ? 'व्हाट्सएप व कॉल पूछताछ' : 'Easy Booking Enquiries'}</h3>
              <p className="why-us-card-text">
                {language === 'hi' 
                  ? 'व्हाट्सएप चैट या सीधे कॉल द्वारा तुरंत उपलब्धता और बुकिंग सहायता प्राप्त करें।'
                  : 'Book and enquire instantly via WhatsApp or direct call for an effortless reservation experience.'}
              </p>
            </div>

            <div className="why-us-card">
              <div className="why-us-icon-wrap">
                <Headphones size={24} />
              </div>
              <h3 className="why-us-card-title">{t('featSupport')}</h3>
              <p className="why-us-card-text">
                {language === 'hi' 
                  ? 'सड़क किनारे 24/7 सहायता और समर्पित ग्राहक सेवा दल हमेशा आपके साथ।'
                  : '24/7 dedicated roadside support and customer care to ensure your entire trip is worry-free and safe.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4-STEP PROCESS ================= */}
      <section className="steps-section">
        <div className="container">
          <div className="section-header">
            <span className="section-pretitle">{language === 'hi' ? 'सरल प्रक्रिया' : 'SIMPLE RENTAL STEPS'}</span>
            <h2 className="section-title">{language === 'hi' ? '4 आसान चरणों में राइड शुरू करें' : 'Start Riding in 4 Easy Steps'}</h2>
            <p className="section-subtitle">
              {language === 'hi' ? 'बिना किसी परेशानी के त्वरित और पारदर्शी मोटरसाइकिल आरक्षण।' : 'Quick, paperless, and hassle-free vehicle reservations.'}
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h4 className="step-title">{language === 'hi' ? 'बाइक खोजें' : 'Explore Bikes'}</h4>
              <p className="step-description">{language === 'hi' ? 'हमारी प्रमाणित बाइक्स और स्कूटर देखें।' : 'Browse our curated collection of motorcycles and scooters.'}</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h4 className="step-title">{language === 'hi' ? 'बाइक चुनें' : 'Select Your Bike'}</h4>
              <p className="step-description">{language === 'hi' ? 'अपने रूट और सुविधा के अनुसार सही मॉडल चुनें।' : 'Pick the machine that perfectly matches your trip route.'}</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h4 className="step-title">{language === 'hi' ? '18+ पुष्टि एवं विवरण' : '18+ Compliance'}</h4>
              <p className="step-description">{language === 'hi' ? '18+ आयु और ड्राइविंग लाइसेंस की पुष्टि करें।' : 'Confirm 18+ age and driving license requirement.'}</p>
            </div>
            <div className="step-card">
              <div className="step-number">04</div>
              <h4 className="step-title">{language === 'hi' ? 'बुकिंग की पुष्टि' : 'Confirm Booking'}</h4>
              <p className="step-description">{language === 'hi' ? 'पिकअप तिथि चुनें और अपनी यात्रा शुरू करें।' : 'Finalize your pickup dates and kickstart your adventure.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQS ACCORDION ================= */}
      <section className="faqs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}</h2>
            <p className="section-subtitle">
              {language === 'hi' ? 'सुरक्षा जमा, 18+ लाइसेंस नियम और रेंटल नीतियों के बारे में सभी जानकारी।' : 'Everything you need to know about deposits, licences, and rental rules.'}
            </p>
          </div>

          <div className="faqs-list" style={{ maxWidth: '780px', margin: '0 auto' }}>
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
              <span>{language === 'hi' ? 'सभी रेंटल नियम एवं दिशानिर्देश देखें →' : 'View All Rental FAQs & Guidelines →'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION BANNER ================= */}
      <section className="container">
        <div className="cta-banner">
          <div className="cta-banner-bg-graphic"></div>
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">
              {language === 'hi' ? 'अपनी अगली राइड के लिए तैयार हैं?' : 'Ready for Your Next Ride?'}
            </h2>
            <p className="cta-banner-subtitle">
              {language === 'hi' 
                ? 'आपका सफर आपका इंतजार कर रहा है। आज ही अपनी पसंदीदा बाइक चुनें और तुरंत बुकिंग करें।'
                : 'Your journey is waiting. Explore our premium fleet of bikes and start your adventure today with instant confirmation.'}
            </p>
            <div className="cta-banner-buttons">
              <button 
                className="btn-primary" 
                style={{ background: '#080C14', color: '#ffffff' }}
                onClick={() => onNavigate('motorbikes')}
              >
                <Bike size={18} />
                <span>{t('exploreBikes')}</span>
              </button>
              <button 
                className="btn-whatsapp-dark" 
                style={{ background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)', color: '#080C14' }}
                onClick={() => onOpenWhatsApp()}
              >
                <MessageCircle size={18} color="#080C14" />
                <span style={{ fontWeight: 700 }}>{language === 'hi' ? 'व्हाट्सएप पूछताछ' : 'Contact on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
