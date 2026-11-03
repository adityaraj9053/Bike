import React, { useState, useRef } from 'react';
import './src/i18n';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import RootNavigator from './src/navigation/RootNavigator';
import BookDropdownModal from './src/components/BookDropdownModal';
import EnquiryModal from './src/components/EnquiryModal';
import AuthModal from './src/components/AuthModal';
import QuoteModal from './src/components/QuoteModal';
import FloatingWhatsApp from './src/components/FloatingWhatsApp';
import Toast from './src/components/Toast';

import { BIKES_DATA } from './src/data/bikes';
import { COLORS } from './src/theme/colors';

export default function App() {
  const navigationRef = useRef(null);

  // User State
  const [user, setUser] = useState(null);

  // Modals & Sheets
  const [selectedBike, setSelectedBike] = useState(BIKES_DATA[0]);
  const [bookModalBike, setBookModalBike] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryBike, setEnquiryBike] = useState(null);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
  };

  const handleOpenBookModal = (bike) => {
    handleStartBooking(bike);
  };

  const handleStartBooking = (bike) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    if (bike) {
      setSelectedBike(bike);
    }
    if (navigationRef.current) {
      navigationRef.current.navigate('Booking', { bike: bike || selectedBike });
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

  return (
    <SafeAreaProvider style={styles.root}>
      <StatusBar style="light" backgroundColor={COLORS.bgDark} />
      <NavigationContainer ref={navigationRef}>
        <View style={styles.appContainer}>
          <RootNavigator
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenWhatsApp={handleOpenWhatsApp}
            onOpenQuote={handleOpenQuote}
            onSelectBike={handleSelectBike}
            onStartBooking={handleStartBooking}
            onOpenBookModal={handleOpenBookModal}
            onShowToast={showToast}
          />

          {/* Floating WhatsApp Quick Action Button */}
          <FloatingWhatsApp
            onPress={() => handleOpenWhatsApp()}
            phone="919876543210"
          />

          {/* Action Modals */}
          <BookDropdownModal
            visible={isBookModalOpen}
            onClose={() => setIsBookModalOpen(false)}
            bike={bookModalBike}
            onStartBooking={handleStartBooking}
            onShowToast={showToast}
          />

          <EnquiryModal
            visible={isEnquiryOpen}
            onClose={() => setIsEnquiryOpen(false)}
            selectedBike={enquiryBike}
            onShowToast={showToast}
          />

          <AuthModal
            visible={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLogin={(userData) => {
              setUser(userData);
              if (userData) {
                showToast(`Welcome back, ${userData.name}!`);
              } else {
                showToast('Signed out successfully.');
              }
            }}
            user={user}
          />

          <QuoteModal
            visible={isQuoteOpen}
            onClose={() => setIsQuoteOpen(false)}
            bookingData={quoteData}
            bike={selectedBike}
          />

          {/* Floating Toast Notification Layer */}
          <Toast toasts={toasts} />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
    position: 'relative',
  },
});
