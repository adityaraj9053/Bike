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