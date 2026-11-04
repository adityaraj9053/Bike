import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react-native';
import { COLORS, RADIUS } from '../theme/colors';

export default function LanguageSwitcher({ style, textStyle, compact = false }) {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language || 'en';
  const isHindi = currentLanguage.startsWith('hi');

  const toggleLanguage = () => {
    const nextLanguage = isHindi ? 'en' : 'hi';
    i18n.changeLanguage(nextLanguage);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('bikerent_lang', nextLanguage);
      window.dispatchEvent(new Event('bikerent_language_change'));
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, compact && styles.containerCompact, style]}
      onPress={toggleLanguage}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={t('switchLanguageButton')}
    >
      <Globe size={compact ? 14 : 16} color={isHindi ? '#00A3FF' : '#94A3B8'} />
      <Text style={[styles.text, compact && styles.textCompact, textStyle]}>
        {compact ? (isHindi ? 'हिंदी' : 'EN') : (isHindi ? 'हिंदी' : 'English')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.bgCard || '#0B1322',
    borderWidth: 1,
    borderColor: COLORS.borderCard || '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full || 9999,
  },
  containerCompact: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  textCompact: {
    fontSize: 12,
  },
});

