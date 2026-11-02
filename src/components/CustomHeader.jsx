import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Compass, MessageCircle, User, ChevronLeft } from 'lucide-react-native';
import { COLORS, RADIUS } from '../theme/colors';

export default function CustomHeader({
  navigation,
  showBack = false,
  title,
  user,
  onOpenAuth,
  onOpenWhatsApp,
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.brandContainer}
            onPress={() => navigation?.navigate('Home')}
            activeOpacity={0.8}
          >
            <View style={styles.logoIcon}>
              <Compass size={18} color="#050B14" strokeWidth={2.5} />
            </View>
            <Text style={styles.brandTitle}>THE ROAD EAGLE</Text>
          </TouchableOpacity>
        )}

        {showBack && title && (
          <Text style={styles.screenTitle} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      <View style={styles.headerRight}>
        {/* Quick WhatsApp Action */}
        <TouchableOpacity
          style={styles.headerWhatsAppBtn}
          onPress={onOpenWhatsApp}
          activeOpacity={0.8}
        >
          <MessageCircle size={18} color={COLORS.accentCyan} />
        </TouchableOpacity>

        {/* User Account Button */}
        <TouchableOpacity
          style={styles.userButton}
          onPress={onOpenAuth}
          activeOpacity={0.8}
        >
          <User size={16} color={COLORS.accentCyan} />
          <Text style={styles.userButtonText} numberOfLines={1}>
            {user ? user.name.split(' ')[0] : 'Log In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === 'ios' ? 56 : 60,
    backgroundColor: COLORS.bgDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderCard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentCyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerWhatsAppBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  userButtonText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    maxWidth: 70,
  },
});
