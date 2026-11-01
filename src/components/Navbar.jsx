import React, { useState } from 'react';
import { Compass, MessageCircle, User, Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenWhatsApp, onOpenAuth, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'motorbikes', label: 'Motorbikes' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about-us', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
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
          <span>THE ROAD EAGLE</span>
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
          <button 
            className="btn-whatsapp"
            onClick={() => onOpenWhatsApp()}
            title="Chat directly on WhatsApp"
          >
            <MessageCircle size={18} />
            <span>Enquire on WhatsApp</span>
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
              <span>Log In</span>
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
                color: activePage === item.id ? '#00A3FF' : '#ffffff',
                fontWeight: activePage === item.id ? 700 : 500,
                fontSize: '1.05rem',
                cursor: 'pointer',
                padding: '8px 0'
              }}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
