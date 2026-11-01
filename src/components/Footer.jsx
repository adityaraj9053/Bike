import React from 'react';
import { Compass, Heart } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="brand-logo" onClick={() => handleNav('home')}>
              <div className="brand-logo-icon">
                <Compass size={20} />
              </div>
              <span>THE ROAD EAGLE</span>
            </div>
            <p>
              Your Ride, Your Route, Your Freedom. Providing premium motorcycle and scooter rentals with transparency, precision maintenance, and absolute reliability.
            </p>
            <div className="footer-socials">
              <a href="#instagram" className="footer-social-btn" title="Instagram" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#facebook" className="footer-social-btn" title="Facebook" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#twitter" className="footer-social-btn" title="Twitter / X" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
              </a>
              <a href="#youtube" className="footer-social-btn" title="YouTube" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Home</a></li>
              <li><a href="#motorbikes" onClick={(e) => { e.preventDefault(); handleNav('motorbikes'); }}>Motorbikes Fleet</a></li>
              <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNav('how-it-works'); }}>How It Works</a></li>
              <li><a href="#about-us" onClick={(e) => { e.preventDefault(); handleNav('about-us'); }}>About Us</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="footer-col-title">Legal & Support</h4>
            <ul className="footer-links">
              <li><a href="#faqs" onClick={(e) => { e.preventDefault(); handleNav('how-it-works'); }}>FAQs</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); handleNav('how-it-works'); }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); handleNav('how-it-works'); }}>Terms & Conditions</a></li>
              <li><a href="#rental-policies" onClick={(e) => { e.preventDefault(); handleNav('how-it-works'); }}>Rental Policies</a></li>
              <li><a href="#hub-location" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>Hub Locations</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>© 2024 The Road Eagle. All Rights Reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Made with <Heart size={14} color="#EF4444" fill="#EF4444" /> for riders.
          </div>
        </div>
      </div>
    </footer>
  );
}
