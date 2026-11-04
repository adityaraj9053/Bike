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
          <span className="brand-logo-text">THE ROAD EAGLE</span>
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