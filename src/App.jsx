import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
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

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw) return { page: 'home', bikeId: null, category: 'all' };
  const [page, queryString] = raw.split('?');
  const params = new URLSearchParams(queryString || '');
  return {
    page: page || 'home',
    bikeId: params.get('bike'),
    category: params.get('cat') || 'all'
  };
}

function MainApp() {
  const { t, language } = useLanguage();

  const initialHash = parseHash();
  const initialBike = initialHash.bikeId 
    ? BIKES_DATA.find(b => b.id === initialHash.bikeId) || BIKES_DATA[0]
    : BIKES_DATA[0];

  const [activePage, setActivePage] = useState(initialHash.page || 'home');
  const [selectedBike, setSelectedBike] = useState(initialBike);
  const [catalogCategory, setCatalogCategory] = useState(initialHash.category || 'all');

  // Internal navigation history stack for responsive back navigation
  const [navHistory, setNavHistory] = useState([]);

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

  // ================= BROWSER BACK / FORWARD NAVIGATION (POPSTATE) =================
  useEffect(() => {
    // Initialize history state on load
    const currentHash = window.location.hash || '#home';
    const initData = parseHash();
    window.history.replaceState(
      { page: initData.page || 'home', category: initData.category || 'all', bikeId: initData.bikeId },
      '',
      currentHash
    );

    const handlePopState = (event) => {
      // Close open modals if any was open
      if (isEnquiryOpen || isAuthOpen || isQuoteOpen || isAgeModalOpen) {
        setIsEnquiryOpen(false);
        setIsAuthOpen(false);
        setIsQuoteOpen(false);
        setIsAgeModalOpen(false);
      }

      let targetPage = 'home';
      let targetBikeId = null;
      let targetCat = 'all';

      if (event.state && event.state.page) {
        targetPage = event.state.page;
        targetBikeId = event.state.bikeId;
        targetCat = event.state.category || 'all';
      } else {
        const parsed = parseHash();
        targetPage = parsed.page;
        targetBikeId = parsed.bikeId;
        targetCat = parsed.category;
      }

      if (targetPage === 'booking' && !user) {
        targetPage = 'motorbikes';
        setIsAuthOpen(true);
        showToast(
          language === 'hi'
            ? 'बुकिंग जारी रखने के लिए कृपया पहले लॉग इन या साइन अप करें।'
            : 'Please log in or sign up first to proceed with booking.'
        );
      }

      setActivePage(targetPage);
      if (targetCat) setCatalogCategory(targetCat);
      if (targetBikeId) {
        const found = BIKES_DATA.find((b) => b.id === targetBikeId);
        if (found) setSelectedBike(found);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isEnquiryOpen, isAuthOpen, isQuoteOpen, isAgeModalOpen]);

  // Navigate with history push and internal stack tracking
  const handleNavigate = (page, category = 'all', pushHistory = true) => {
    if (page !== activePage) {
      setNavHistory((prev) => [...prev, { page: activePage, bike: selectedBike, category: catalogCategory }]);
    }
    setActivePage(page);
    if (category) {
      setCatalogCategory(category);
    }

    if (pushHistory) {
      const hash = `#${page}${category !== 'all' ? `?cat=${category}` : ''}`;
      window.history.pushState(
        { page, category, bikeId: selectedBike?.id },
        '',
        hash
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBike = (bike, pushHistory = true) => {
    setNavHistory((prev) => [...prev, { page: activePage, bike: selectedBike, category: catalogCategory }]);
    setSelectedBike(bike);
    setActivePage('bike-details');

    if (pushHistory) {
      window.history.pushState(
        { page: 'bike-details', bikeId: bike.id, category: catalogCategory },
        '',
        `#bike-details?bike=${bike.id}`
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const proceedToBookingPage = (bike) => {
    const target = bike || selectedBike || BIKES_DATA[0];
    setNavHistory((prev) => [...prev, { page: activePage, bike: selectedBike, category: catalogCategory }]);
    setSelectedBike(target);
    setActivePage('booking');

    window.history.pushState(
      { page: 'booking', bikeId: target.id, category: catalogCategory },
      '',
      `#booking?bike=${target.id}`
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button handler for on-screen back buttons
  const handleGoBack = () => {
    if (navHistory.length > 0) {
      const prev = navHistory[navHistory.length - 1];
      setNavHistory((stack) => stack.slice(0, -1));
      setActivePage(prev.page);
      if (prev.category) setCatalogCategory(prev.category);
      if (prev.bike) setSelectedBike(prev.bike);

      const hash = `#${prev.page}${prev.category && prev.category !== 'all' ? `?cat=${prev.category}` : ''}${prev.bike && prev.page === 'bike-details' ? `?bike=${prev.bike.id}` : ''}`;
      window.history.replaceState(
        { page: prev.page, category: prev.category, bikeId: prev.bike?.id },
        '',
        hash
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      handleNavigate('home', 'all', true);
    }
  };

  // Booking flow: Login check required before booking, followed by 18+ verification
  const handleStartBooking = (bike) => {
    const targetBike = bike || selectedBike || BIKES_DATA[0];
    setPendingBookingBike(targetBike);

    if (!user) {
      setIsAuthOpen(true);
      showToast(
        language === 'hi'
          ? 'बुकिंग जारी रखने के लिए कृपया पहले लॉग इन या साइन अप करें।'
          : 'Please log in or sign up first to proceed with booking.'
      );
      return;
    }

    if (!isAgeVerified) {
      setIsAgeModalOpen(true);
    } else {
      proceedToBookingPage(targetBike);
    }
  };

  const handleConfirmAge = () => {
    setIsAgeVerified(true);
    sessionStorage.setItem('road_eagle_age_verified', 'true');
    const target = pendingBookingBike || selectedBike || BIKES_DATA[0];
    setPendingBookingBike(null);
    proceedToBookingPage(target);
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
      // Seamlessly continue booking if user clicked book before logging in
      if (pendingBookingBike) {
        const target = pendingBookingBike;
        setPendingBookingBike(null);
        if (!isAgeVerified) {
          setIsAgeModalOpen(true);
        } else {
          proceedToBookingPage(target);
        }
      }
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
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => handleNavigate(page, 'all', true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
      />

      {/* Main Page View */}
      <main style={{ minHeight: '80vh', paddingBottom: '90px' }}>
        {activePage === 'home' && (
          <HomePage
            onNavigate={(page, cat) => handleNavigate(page, cat, true)}
            onSelectBike={(bike) => handleSelectBike(bike, true)}
            onStartBooking={handleStartBooking}
            onOpenWhatsApp={handleOpenWhatsApp}
            onShowToast={showToast}
          />
        )}

        {activePage === 'motorbikes' && (
          <MotorbikesPage
            onSelectBike={(bike) => handleSelectBike(bike, true)}
            onStartBooking={handleStartBooking}
            onOpenWhatsApp={handleOpenWhatsApp}
            onShowToast={showToast}
            onGoBack={handleGoBack}
            initialCategory={catalogCategory}
          />
        )}

        {activePage === 'bike-details' && (
          <BikeDetailsPage
            bike={selectedBike}
            onNavigate={(page) => handleNavigate(page, 'all', true)}
            onStartBooking={handleStartBooking}
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectBike={(bike) => handleSelectBike(bike, true)}
            onShowToast={showToast}
            onGoBack={handleGoBack}
          />
        )}

        {activePage === 'booking' && (
          <BookingPage
            selectedBike={selectedBike}
            onNavigate={(page) => handleNavigate(page, 'all', true)}
            onOpenQuote={handleOpenQuote}
            onShowToast={showToast}
            onOpenWhatsApp={handleOpenWhatsApp}
            onGoBack={handleGoBack}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorksPage 
            onNavigate={(page) => handleNavigate(page, 'all', true)}
            onGoBack={handleGoBack}
          />
        )}

        {activePage === 'about-us' && (
          <AboutUsPage 
            onNavigate={(page) => handleNavigate(page, 'all', true)}
            onGoBack={handleGoBack}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onShowToast={showToast}
            onOpenWhatsApp={handleOpenWhatsApp}
            onGoBack={handleGoBack}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={(page) => handleNavigate(page, 'all', true)} />

      {/* Floating WhatsApp Quick Action Button in Green on Left Side */}
      <div 
        onClick={() => handleOpenWhatsApp()}
        className="floating-whatsapp-btn"
        title="Chat on WhatsApp (+91 98765 43210)"
      >
        <MessageCircle size={28} />
      </div>

      {/* Persistent Bottom Navigation Bar on Every Page */}
      <BottomNav
        activePage={activePage}
        onNavigate={(page) => handleNavigate(page, 'all', true)}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
      />

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
