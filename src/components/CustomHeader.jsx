import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import { Compass, User, ChevronLeft, Globe, ChevronDown, Check, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, RADIUS } from '../theme/colors';

export default function CustomHeader({
  navigation,
  showBack = false,
  title,
  user,
  onOpenAuth,
  onOpenWhatsApp,
  onStartBooking,
}) {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const handleSelectLanguage = (code) => {
    i18n.changeLanguage(code);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('bikerent_lang', code);
      window.dispatchEvent(new Event('bikerent_language_change'));
    }
    setIsLangModalOpen(false);
  };

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
        {/* Language Switcher Button */}
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => setIsLangModalOpen(true)}
          activeOpacity={0.8}
          accessibilityLabel="Change Language"
        >
          <Globe size={14} color={currentLang === 'hi' ? '#00A3FF' : '#94A3B8'} />
          <Text style={styles.langButtonText}>
            {currentLang === 'hi' ? 'हिंदी' : 'EN'}
          </Text>
          <ChevronDown size={11} color="#64748B" />
        </TouchableOpacity>

        {/* Quick Book Action - Redirect to Fleet tab */}
        <TouchableOpacity
          style={styles.headerBookBtn}
          onPress={() => {
            if (navigation) {
              try {
                navigation.navigate('MainTabs', { screen: 'Motorbikes' });
              } catch (e) {
                navigation.navigate('Motorbikes');
              }
            } else if (onStartBooking) {
              onStartBooking();
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.headerBookBtnText}>
            {currentLang === 'hi' ? 'बुक करें' : 'Book'}
          </Text>
        </TouchableOpacity>

        {/* User Account Button */}
        <TouchableOpacity
          style={styles.userButton}
          onPress={onOpenAuth}
          activeOpacity={0.8}
        >
          <User size={16} color={COLORS.accentCyan} />
          <Text style={styles.userButtonText} numberOfLines={1}>
            {user ? user.name.split(' ')[0] : currentLang === 'hi' ? 'लॉग इन' : 'Log In'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Language Selection Modal */}
      <Modal
        visible={isLangModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLangModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsLangModalOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Globe size={18} color="#00A3FF" />
                <Text style={styles.modalTitle}>
                  {currentLang === 'hi' ? 'भाषा चुनें' : 'Select Language'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setIsLangModalOpen(false)}>
                <X size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View style={styles.langList}>
              {[
                { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
                { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
              ].map((item) => {
                const isSelected = currentLang === item.code;
                return (
                  <TouchableOpacity
                    key={item.code}
                    style={[
                      styles.langItem,
                      isSelected && styles.langItemActive,
                    ]}
                    onPress={() => handleSelectLanguage(item.code)}
                    activeOpacity={0.7}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <Text style={{ fontSize: 18 }}>{item.flag}</Text>
                      <View>
                        <Text style={[styles.langItemText, isSelected && styles.langItemTextActive]}>
                          {item.native}
                        </Text>
                        <Text style={styles.langItemSubtext}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                    {isSelected && <Check size={16} color="#00A3FF" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  headerBookBtn: {
    backgroundColor: COLORS.accentRed,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accentRed,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  headerBookBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
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
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  langButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 11, 20, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#0B1322',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 16,
    width: 300,
    maxWidth: '100%',
    padding: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  langList: {
    gap: 8,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  langItemActive: {
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    borderColor: 'rgba(0, 163, 255, 0.35)',
  },
  langItemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  langItemTextActive: {
    color: '#00A3FF',
    fontWeight: '700',
  },
  langItemSubtext: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
  },
});
