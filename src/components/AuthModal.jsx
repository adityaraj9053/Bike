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
import { X, LogIn, Mail, User, ShieldCheck } from 'lucide-react-native';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';

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
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <X size={18} color={COLORS.textSecondary} />
              </TouchableOpacity>

              <ScrollView showsVerticalScrollIndicator={false}>
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
                      {isSignUp ? 'Create Rider Account' : 'Sign In to Road Eagle'}
                    </Text>
                    <Text style={styles.modalSubtitle}>
                      Manage motorcycle reservations, express KYC verification, and access exclusive rider club perks.
                    </Text>

                    {/* Google OAuth Button */}
                    <TouchableOpacity
                      style={styles.googleBtn}
                      onPress={handleGoogleLogin}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.googleBtnText}>Continue with Google</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerRow}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>or continue with email</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    {/* Inputs */}
                    {isSignUp && (
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Full Name</Text>
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
                      <Text style={styles.inputLabel}>Email Address</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="rider@example.com"
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
                      activeOpacity={0.8}
                    >
                      <Text style={styles.submitBtnText}>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                      </Text>
                    </TouchableOpacity>

                    {/* Toggle Mode */}
                    <TouchableOpacity
                      style={styles.toggleModeBtn}
                      onPress={() => setIsSignUp(!isSignUp)}
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
    backgroundColor: COLORS.bgOverlay,
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    padding: 24,
    maxHeight: '90%',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  googleBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderCard,
  },
  dividerText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
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
    color: COLORS.accentCyanLight,
    fontSize: 13,
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
