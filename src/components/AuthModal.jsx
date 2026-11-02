import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { X, ShieldCheck } from 'lucide-react-native';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';

function GoogleIcon({ size = 18 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <Path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <Path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
      />
      <Path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </Svg>
  );
}

export default function AuthModal({
  visible,
  onClose,
  onLogin,
  user,
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGoogleLogin = () => {
    onLogin({
      name: 'Rider Alex',
      email: 'alex.rider@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    });
    onClose();
  };

  const handleEmailSubmit = () => {
    if (!email) return;
    onLogin({
      name: name || email.split('@')[0],
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    });
    onClose();
  };

  const handleSignOut = () => {
    onLogin(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalCard, SHADOWS.card]}>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
                <X size={18} color={COLORS.textSecondary} />
              </TouchableOpacity>

              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {user ? (
                  /* Profile / Logged In View */
                  <View style={styles.profileContainer}>
                    <Image
                      source={{ uri: user.avatar }}
                      style={styles.avatarImage}
                    />
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.userNameText}>{user.name}!</Text>
                    <Text style={styles.userEmailText}>{user.email}</Text>

                    <View style={styles.verifiedBadge}>
                      <ShieldCheck size={16} color={COLORS.accentCyan} />
                      <Text style={styles.verifiedText}>Verified Motorcycle Rider</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.signOutBtn}
                      onPress={handleSignOut}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  /* Sign In / Sign Up View */
                  <View>
                    <Text style={styles.modalTitle}>
                      {isSignUp ? 'Create Rider Account' : 'Sign In to The Road Eagle'}
                    </Text>
                    <Text style={styles.modalSubtitle}>
                      {isSignUp
                        ? 'Join The Road Eagle community to rent top-tier motorcycles, access member discounts, and hit the open road.'
                        : 'Manage your motorcycle bookings, fast track document verification, and access exclusive member rates.'}
                    </Text>

                    {/* Google OAuth Button */}
                    <TouchableOpacity
                      style={styles.googleBtn}
                      onPress={handleGoogleLogin}
                      activeOpacity={0.85}
                    >
                      <GoogleIcon size={18} />
                      <Text style={styles.googleBtnText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerRow}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>OR</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    {/* Inputs */}
                    {isSignUp && (
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>FULL NAME</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="e.g. Rahul Sharma"
                          placeholderTextColor={COLORS.textMuted}
                          value={name}
                          onChangeText={setName}
                        />
                      </View>
                    )}

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="name@example.com"
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.submitBtn}
                      onPress={handleEmailSubmit}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.submitBtnText}>
                        {isSignUp ? 'Create Account' : 'Continue with email'}
                      </Text>
                    </TouchableOpacity>

                    {/* Toggle Mode */}
                    <TouchableOpacity
                      style={styles.toggleModeBtn}
                      onPress={() => setIsSignUp(!isSignUp)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.toggleModeText}>
                        {isSignUp
                          ? 'Already have an account? Sign In'
                          : "Don't have an account? Sign Up"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 11, 20, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#0D1524',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 28,
    width: 440,
    maxWidth: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 4,
    letterSpacing: -0.3,
  },
  modalSubtitle: {
    fontSize: 13.5,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  googleBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  googleBtnText: {
    color: '#050B14',
    fontSize: 15,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dividerText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#090F1A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: '#00A3FF',
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 16,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  submitBtnText: {
    color: '#050B14',
    fontSize: 15,
    fontWeight: '700',
  },
  toggleModeBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleModeText: {
    color: '#00A3FF',
    fontSize: 13.5,
    fontWeight: '600',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: COLORS.accentCyan,
    marginBottom: 14,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmailText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginBottom: 24,
  },
  verifiedText: {
    color: COLORS.accentCyan,
    fontSize: 12,
    fontWeight: '600',
  },
  signOutBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.statusBooked,
    borderRadius: RADIUS.full,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: COLORS.statusBooked,
    fontSize: 14,
    fontWeight: '700',
  },
});

