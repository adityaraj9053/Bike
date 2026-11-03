import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import AuthModal from './components/AuthModal';
import QuoteModal from './components/QuoteModal';
import AgeVerificationModal from './components/AgeVerificationModal';

import HomePage from './pages/HomePage';
import MotorbikesPage from './pages/MotorbikesPage';
import BikeDetailsPage from './pages/BikeDetailsPage';
import BookingPage from './pages/BookingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';

import { BIKES_DATA } from './data/bikes';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainApp() {
  const { t, language } = useLanguage();
  const [activePage, setActivePage] = useState('home');
  const [selectedBike, setSelectedBike] = useState(BIKES_DATA[0]);
  const [catalogCategory, setCatalogCategory] = useState('all');

  // Modals
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryBike, setEnquiryBike] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  // 18+ Verification Modal
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [pendingBookingBike, setPendingBookingBike] = useState(null);
  const [isAgeVerified, setIsAgeVerified] = useState(() => {
    return sessionStorage.getItem('road_eagle_age_verified') === 'true';
  });

  // User state persisted in localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('road_eagle_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

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

  // Strictly 18+ check on booking:
  // When user clicks book, verify 18+ popup first, then strictly show booking form!
  const handleStartBooking = (bike) => {
    const targetBike = bike || selectedBike || BIKES_DATA[0];
    setPendingBookingBike(targetBike);

    if (!isAgeVerified) {
      setIsAgeModalOpen(true);
    } else {
      setSelectedBike(targetBike);
      setActivePage('booking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmAge = () => {
    setIsAgeVerified(true);
    sessionStorage.setItem('road_eagle_age_verified', 'true');
    const target = pendingBookingBike || selectedBike || BIKES_DATA[0];
    setSelectedBike(target);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(
      language === 'hi' 
        ? '18+ आयु सत्यापित! कृपया आरक्षण फॉर्म भरें।' 
        : '18+ Age compliance confirmed! Please complete your booking form.'
    );
  };

  const handleCancelAge = () => {
    showToast(
      language === 'hi' 
        ? 'रेंटल केवल 18 वर्ष या उससे अधिक आयु के वैध लाइसेंस धारकों के लिए है।' 
        : 'Rental is strictly restricted to individuals 18+ with a valid driving license.'
    );
  };

  // Top Nav Book Now action:
  // If on details page, starts booking directly; otherwise opens bikes fleet ("Bikes khuljae")
  const handleTopBookNow = () => {
    if (activePage === 'bike-details') {
      handleStartBooking(selectedBike);
    } else {
      handleNavigate('motorbikes');
    }
  };

  const handleOpenWhatsApp = (bike = null) => {
    setEnquiryBike(bike || selectedBike || BIKES_DATA[0]);
    setIsEnquiryOpen(true);
  };

  const handleOpenQuote = (data) => {
    setQuoteData(data);
    setIsQuoteOpen(true);
  };

  const handleUserUpdate = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('road_eagle_user', JSON.stringify(userData));
      showToast(
        language === 'hi' 
          ? `स्वागत है, ${userData.name}!` 
          : `Welcome back, ${userData.name}!`
      );
    } else {
      localStorage.removeItem('road_eagle_user');
      showToast(
        language === 'hi' 
          ? 'सफलतापूर्वक साइन आउट किया गया।' 
          : 'Signed out successfully.'
      );
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar with Red Book Now & Language Selector */}
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        onOpenAuth={() => setIsAuthOpen(true)}
        onBookNow={handleTopBookNow}
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
            onShowToast={showToast}
          />
        )}

        {activePage === 'motorbikes' && (
          <MotorbikesPage
            onSelectBike={handleSelectBike}
            onStartBooking={handleStartBooking}
            onOpenWhatsApp={handleOpenWhatsApp}
            onShowToast={showToast}
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
            onShowToast={showToast}
          />
        )}

        {activePage === 'booking' && (
          <BookingPage
            selectedBike={selectedBike}
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
            onShowToast={showToast}
            onOpenWhatsApp={handleOpenWhatsApp}
            user={user}
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

      {/* ================= WHATSAPP ENQUIRE OPTION IN GREEN IN LEFT SIDE ================= */}
      <div 
        onClick={() => handleOpenWhatsApp()}
        className="floating-whatsapp-btn"
        title="Chat on WhatsApp (+91 98765 43210)"
      >
        <MessageCircle size={28} />
      </div>

      {/* Interactive Modals */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedBike={enquiryBike}
        onShowToast={showToast}
        user={user}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleUserUpdate}
        user={user}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        bookingData={quoteData}
        bike={selectedBike}
      />

      {/* 18+ Mandatory Verification Modal */}
      <AgeVerificationModal
        isOpen={isAgeModalOpen}
        onClose={() => setIsAgeModalOpen(false)}
        onConfirm={handleConfirmAge}
        onCancel={handleCancelAge}
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

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
