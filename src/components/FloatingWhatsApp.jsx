import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../theme/colors';

export default function FloatingWhatsApp({ onPress, phone = '919876543210' }) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      const url = `https://wa.me/${phone}?text=${encodeURIComponent('Hello The Road Eagle! I would like to enquire about renting a motorbike.')}`;
      Linking.openURL(url).catch(() => {});
    }
  };

  return (
    <TouchableOpacity
      style={[styles.floatingButton, SHADOWS.glowCyan]}
      onPress={handlePress}
      activeOpacity={0.85}
      accessibilityLabel="Chat on WhatsApp"
    >
      <MessageCircle size={26} color="#060C18" strokeWidth={2.5} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 95 : 85,
    left: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accentCyan,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
