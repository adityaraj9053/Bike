import React, { useState } from 'react';
import { Compass, MessageCircle, User, Menu, X, Globe, Bike } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  onOpenWhatsApp, 
  onOpenAuth, 
  onBookNow,
  user 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  const navItems = [
    { id: 'home', label: t('navHome') },
    { id: 'motorbikes', label: t('navMotorbikes') },
    { id: 'how-it-works', label: t('navHowItWorks') },
    { id: 'about-us', label: t('navAboutUs') },
    { id: 'contact', label: t('navContactUs') },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNowClick = () => {
    setMobileMenuOpen(false);
    if (onBookNow) {
      onBookNow();
    } else {
      setActivePage('motorbikes');
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => handleNavClick('home')}>
          <div className="brand-logo-icon">
            <Compass size={20} />
          </div>
          <span style={{ letterSpacing: '0.04em' }}>THE ROAD EAGLE</span>
        </div>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Language Switcher Button */}
          <button
            type="button"
            className="btn-outline lang-toggle-btn"
            onClick={toggleLanguage}
            title={language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
            style={{
              padding: '7px 12px',
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '9999px',
              borderColor: 'rgba(255,255,255,0.2)'
            }}
          >
            <Globe size={15} color="#00A3FF" />
            <span style={{ fontWeight: 700 }}>{language === 'en' ? 'हिंदी' : 'EN'}</span>
          </button>

          {/* Red Book Now Button in Top Navigation */}
          <button
            type="button"
            className="nav-book-now-btn"
            onClick={handleBookNowClick}
            style={{
              background: '#FF3B30',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.88rem',
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(255, 59, 48, 0.4)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FF5247';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FF3B30';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Bike size={16} />
            <span>{t('navBookNow')}</span>
          </button>

          {/* Enquire on WhatsApp Desktop Button */}
          <button 
            className="btn-whatsapp nav-desktop-whatsapp"
            onClick={() => onOpenWhatsApp()}
            title="Chat directly on WhatsApp"
          >
            <MessageCircle size={17} />
            <span>{t('navEnquireWhatsApp')}</span>
          </button>

          {/* User Auth Button */}
          {user ? (
            <button 
              className="btn-outline" 
              style={{ padding: '7px 14px', fontSize: '0.84rem' }}
              onClick={onOpenAuth}
            >
              <User size={15} color="#00A3FF" />
              <span>{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button 
              className="btn-outline" 
              style={{ padding: '7px 14px', fontSize: '0.84rem' }}
              onClick={onOpenAuth}
            >
              <User size={15} />
              <span>{t('navLogin')}</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            className="mobile-hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`mobile-nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </div>
          ))}

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '8px 0' }}></div>

          {/* Red Book Now in Mobile Menu */}
          <button
            type="button"
            onClick={handleBookNowClick}
            style={{
              background: '#FF3B30',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '12px 20px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              boxShadow: '0 4px 14px rgba(255, 59, 48, 0.4)'
            }}
          >
            <Bike size={18} />
            <span>{t('navBookNow')}</span>
          </button>

          {/* Enquire on WhatsApp in Mobile Menu */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWhatsApp();
            }}
            style={{
              background: '#25D366',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '12px 20px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%'
            }}
          >
            <MessageCircle size={18} />
            <span>{t('navEnquireWhatsApp')}</span>
          </button>

          {/* Language Toggle in Mobile Menu */}
          <button
            type="button"
            onClick={toggleLanguage}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '10px 16px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            <Globe size={17} color="#00A3FF" />
            <span>{language === 'en' ? 'हिंदी में बदलें (Switch to Hindi)' : 'Switch to English'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
