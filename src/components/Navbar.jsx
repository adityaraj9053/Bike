import React, { useState } from 'react';
import { Compass, User, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  onOpenAuth, 
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

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => handleNavClick('home')}>
          <div className="brand-logo-icon">
            <Compass size={20} />
          </div>
          <span className="brand-logo-text">THE ROAD EAGLE</span>
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

        {/* Action Buttons: Clean & Compact */}
        <div className="nav-actions">
          {/* Language Switcher */}
          <button
            type="button"
            className="btn-outline"
            onClick={toggleLanguage}
            title={language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
            style={{
              padding: '7px 14px',
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

          {/* User Auth Button */}
          {user ? (
            <button 
              className="btn-outline" 
              style={{ padding: '7px 16px', fontSize: '0.85rem' }}
              onClick={onOpenAuth}
            >
              <User size={15} color="#00A3FF" />
              <span>{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button 
              className="btn-outline" 
              style={{ padding: '7px 16px', fontSize: '0.85rem' }}
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

      {/* Mobile Menu Dropdown */}
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

          {/* Language Toggle in Mobile Drawer */}
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
              borderRadius: '9999px',
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
