import React, { useState, useEffect, useRef } from 'react';
import { Compass, User, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function GlobeIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function ChevronDownIcon({ size = 14, color = 'currentColor', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const LANGUAGES = [
  { code: 'en', name: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी (Hindi)', short: 'HI', flag: '🇮🇳' },
];

const TRANSLATIONS = {
  en: {
    home: 'Home',
    fleet: 'Fleet',
    howItWorks: 'How It Works',
    aboutUs: 'About Us',
    contact: 'Contact Us',
    book: 'Book',
    login: 'Log In',
    language: 'Language',
  },
  hi: {
    home: 'होम',
    fleet: 'फ्लीट',
    howItWorks: 'यह कैसे काम करता है',
    aboutUs: 'हमारे बारे में',
    contact: 'संपर्क करें',
    book: 'बुक करें',
    login: 'लॉग इन',
    language: 'भाषा',
  },
};

export default function Navbar({
  activePage,
  setActivePage,
  onOpenWhatsApp,
  onOpenAuth,
  onStartBooking,
  user,
  language: propLanguage,
  onLanguageChange,
}) {
  const { i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalLang, setInternalLang] = useState(() => {
    if (i18n && i18n.language) return i18n.language;
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('bikerent_lang') || 'en';
    }
    return 'en';
  });

  const currentLang = propLanguage || (i18n && i18n.language) || internalLang;
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langMenuRef = useRef(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Sync with global storage and custom event
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const syncLang = () => {
      const stored = localStorage.getItem('bikerent_lang') || 'en';
      setInternalLang(stored);
      if (i18n && i18n.changeLanguage && i18n.language !== stored) {
        i18n.changeLanguage(stored);
      }
    };
    window.addEventListener('storage', syncLang);
    window.addEventListener('bikerent_language_change', syncLang);
    return () => {
      window.removeEventListener('storage', syncLang);
      window.removeEventListener('bikerent_language_change', syncLang);
    };
  }, [i18n]);

  // Close language dropdown on outside click
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  const handleSelectLanguage = (code) => {
    setInternalLang(code);
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(code);
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('bikerent_lang', code);
      window.dispatchEvent(new Event('bikerent_language_change'));
    }
    if (onLanguageChange) {
      onLanguageChange(code);
    }
    setLangDropdownOpen(false);
  };

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'motorbikes', label: t.fleet },
    { id: 'how-it-works', label: t.howItWorks },
    { id: 'about-us', label: t.aboutUs },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (id) => {
    if (setActivePage) {
      setActivePage(id);
    }
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isItemActive = (itemId) => {
    if (itemId === 'motorbikes') {
      return activePage === 'motorbikes' || activePage === 'fleet';
    }
    return activePage === itemId;
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => handleNavClick('home')}>
          <div className="brand-logo-icon">
            <Compass size={20} />
          </div>
          <span>THE ROAD EAGLE</span>
        </div>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`nav-link ${isItemActive(item.id) ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Language Switcher Dropdown */}
          <div ref={langMenuRef} style={{ position: 'relative' }}>
            <button
              className="btn-outline"
              style={{
                padding: '8px 14px',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                borderColor: langDropdownOpen ? '#00A3FF' : 'rgba(255, 255, 255, 0.18)',
                background: langDropdownOpen ? 'rgba(0, 163, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
              }}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              title={t.language}
              aria-expanded={langDropdownOpen}
              aria-haspopup="true"
            >
              <GlobeIcon size={16} color={currentLang === 'hi' ? '#00A3FF' : '#94A3B8'} />
              <span style={{ fontWeight: 600 }}>
                {currentLang === 'hi' ? 'हिंदी' : 'English'}
              </span>
              <ChevronDownIcon
                size={14}
                color="#94A3B8"
                style={{
                  transform: langDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>

            {langDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#0B1322',
                  border: '1px solid #1E293B',
                  borderRadius: '12px',
                  padding: '6px',
                  minWidth: '160px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 163, 255, 0.15)',
                  zIndex: 1100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '8px 12px',
                        background: isSelected ? 'rgba(0, 163, 255, 0.12)' : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: isSelected ? '#00A3FF' : '#E2E8F0',
                        fontSize: '0.88rem',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {isSelected && (
                        <span style={{ color: '#00A3FF', fontWeight: 800 }}>✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button 
            className="btn-primary"
            style={{ 
              padding: '8px 20px', 
              fontSize: '0.9rem', 
              fontWeight: 700, 
              borderRadius: '9999px',
              background: '#FF3B30',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(255, 59, 48, 0.35)',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={() => handleNavClick('motorbikes')}
            title="Explore Fleet"
          >
            <span>{t.book}</span>
          </button>

          {user ? (
            <button 
              className="btn-outline" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={onOpenAuth}
            >
              <User size={16} />
              <span>{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button 
              className="btn-outline" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={onOpenAuth}
            >
              <User size={16} />
              <span>{t.login}</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="btn-outline" 
            style={{ display: 'none', padding: '8px', border: 'none' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          background: '#0e1420',
          borderBottom: '1px solid #1e293b',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navItems.map((item) => (
            <div
              key={item.id}
              style={{
                color: isItemActive(item.id) ? '#00A3FF' : '#ffffff',
                fontWeight: isItemActive(item.id) ? 700 : 500,
                fontSize: '1.05rem',
                cursor: 'pointer',
                padding: '8px 0'
              }}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </div>
          ))}

          {/* Mobile Language Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid #1e293b',
            marginTop: '4px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '0.9rem' }}>
              <GlobeIcon size={16} color="#00A3FF" />
              <span>{t.language}:</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {LANGUAGES.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      border: isSelected ? '1px solid #00A3FF' : '1px solid #1E293B',
                      background: isSelected ? 'rgba(0, 163, 255, 0.15)' : '#070D18',
                      color: isSelected ? '#00A3FF' : '#94A3B8',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    {lang.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
