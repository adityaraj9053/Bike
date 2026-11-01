import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import AuthModal from './components/AuthModal';
import QuoteModal from './components/QuoteModal';

import HomePage from './pages/HomePage';
import MotorbikesPage from './pages/MotorbikesPage';
import BikeDetailsPage from './pages/BikeDetailsPage';
import BookingPage from './pages/BookingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';

import { BIKES_DATA } from './data/bikes';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedBike, setSelectedBike] = useState(BIKES_DATA[0]);
  const [catalogCategory, setCatalogCategory] = useState('all');

  // Modals
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryBike, setEnquiryBike] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  // User state
  const [user, setUser] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleNavigate = (page, category = 'all') => {
    setActivePage(page);
    if (category) {
      setCatalogCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setActivePage('bike-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartBooking = (bike) => {
    setSelectedBike(bike);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhatsApp = (bike = null) => {
    setEnquiryBike(bike || selectedBike || BIKES_DATA[0]);
    setIsEnquiryOpen(true);
  };

  const handleOpenQuote = (data) => {
    setQuoteData(data);
    setIsQuoteOpen(true);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
      />

      {/* Main Page View */}
      <main>
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectBike={handleSelectBike}
            onStartBooking={handleStartBooking}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activePage === 'motorbikes' && (
          <MotorbikesPage
            onSelectBike={handleSelectBike}
            onStartBooking={handleStartBooking}
            onOpenWhatsApp={handleOpenWhatsApp}
            initialCategory={catalogCategory}
          />
        )}

        {activePage === 'bike-details' && (
          <BikeDetailsPage
            bike={selectedBike}
            onNavigate={handleNavigate}
            onStartBooking={handleStartBooking}
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectBike={handleSelectBike}
          />
        )}

        {activePage === 'booking' && (
          <BookingPage
            selectedBike={selectedBike}
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
            onShowToast={showToast}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorksPage onNavigate={handleNavigate} />
        )}

        {activePage === 'about-us' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onShowToast={showToast}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={handleNavigate} />

      {/* Floating WhatsApp Quick Action Button */}
      <div 
        onClick={() => handleOpenWhatsApp()}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 999,
          background: '#00A3FF',
          color: '#060C18',
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(0, 163, 255, 0.45)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background 0.2s ease'
        }}
        title="Chat on WhatsApp"
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#00A3FF'; e.currentTarget.style.color = '#060C18'; }}
      >
        <MessageCircle size={26} />
      </div>

      {/* Interactive Modals */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedBike={enquiryBike}
        onShowToast={showToast}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(userData) => {
          setUser(userData);
          if (userData) {
            showToast(`Welcome, ${userData.name}!`);
          } else {
            showToast('Signed out successfully.');
          }
        }}
        user={user}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        bookingData={quoteData}
        bike={selectedBike}
      />

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <CheckCircle2 size={18} color="#00A3FF" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
