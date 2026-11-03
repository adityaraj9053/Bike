import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react-native';
import { BIKES_DATA } from '../data/bikes';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export default function ContactScreen({ onShowToast, onOpenWhatsApp }) {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBikeId, setSelectedBikeId] = useState(BIKES_DATA[0].id);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(t('contactScreen.toastSuccess', { name: fullName || 'Rider' }));
    }
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  const handleOpenMaps = () => {
    Linking.openURL('https://maps.google.com/?q=123+Rider+Avenue+Sector+5').catch(() => {});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pretitle}>{t('contactScreen.pretitle')}</Text>
        <Text style={styles.title}>
          {t('contactScreen.title1')}{'\n'}
          <Text style={{ color: COLORS.accentCyan }}>{t('contactScreen.title2')}</Text>
        </Text>
        <Text style={styles.subtitle}>
          {t('contactScreen.subtitle')}
        </Text>
      </View>

      {/* 4 Contact Info Mini Cards */}
      <View style={styles.cardsGrid}>
        {/* Phone */}
        <TouchableOpacity
          style={[styles.miniCard, SHADOWS.card]}
          onPress={() => Linking.openURL('tel:+919876543210').catch(() => {})}
          activeOpacity={0.8}
        >
          <View style={styles.miniIcon}>
            <Phone size={20} color={COLORS.accentCyan} />
          </View>
          <View style={styles.miniTextWrap}>
            <Text style={styles.miniLabel}>{t('contactScreen.phoneLabel')}</Text>
            <Text style={styles.miniValue}>+91 98765 43210</Text>
          </View>
        </TouchableOpacity>

        {/* WhatsApp */}
        <TouchableOpacity
          style={[styles.miniCard, SHADOWS.card]}
          onPress={onOpenWhatsApp}
          activeOpacity={0.8}
        >
          <View style={[styles.miniIcon, { backgroundColor: 'rgba(37, 211, 102, 0.12)' }]}>
            <MessageCircle size={20} color={COLORS.whatsappGreen} />
          </View>
          <View style={styles.miniTextWrap}>
            <Text style={styles.miniLabel}>{t('contactScreen.whatsappLabel')}</Text>
            <Text style={styles.miniValue}>+91 98765 43210</Text>
          </View>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity
          style={[styles.miniCard, SHADOWS.card]}
          onPress={() => Linking.openURL('mailto:support@theroadeagle.com').catch(() => {})}
          activeOpacity={0.8}
        >
          <View style={styles.miniIcon}>
            <Mail size={20} color={COLORS.accentCyan} />
          </View>
          <View style={styles.miniTextWrap}>
            <Text style={styles.miniLabel}>{t('contactScreen.emailLabel')}</Text>
            <Text style={styles.miniValue}>support@theroadeagle.com</Text>
          </View>
        </TouchableOpacity>

        {/* Address */}
        <TouchableOpacity
          style={[styles.miniCard, SHADOWS.card]}
          onPress={handleOpenMaps}
          activeOpacity={0.8}
        >
          <View style={styles.miniIcon}>
            <MapPin size={20} color={COLORS.accentCyan} />
          </View>
          <View style={styles.miniTextWrap}>
            <Text style={styles.miniLabel}>{t('contactScreen.locationLabel')}</Text>
            <Text style={styles.miniValue}>{t('contactScreen.locationAddress')}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Enquiry Form */}
      <View style={[styles.formCard, SHADOWS.card]}>
        <Text style={styles.formTitle}>{t('contactScreen.formTitle')}</Text>
        <Text style={styles.formSubtitle}>
          {t('contactScreen.formSubtitle')}
        </Text>

        {submitted ? (
          <View style={styles.submittedWrap}>
            <CheckCircle2 size={50} color={COLORS.statusAvailable} />
            <Text style={styles.submittedTitle}>{t('contactScreen.submittedTitle')}</Text>
            <Text style={styles.submittedDesc}>
              {t('contactScreen.submittedDesc')}
            </Text>
          </View>
        ) : (
          <View style={styles.formFields}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>{t('contactScreen.fullName')}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={t('contactScreen.fullNamePlaceholder')}
                placeholderTextColor={COLORS.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>{t('contactScreen.phoneNumber')}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={t('contactScreen.phonePlaceholder')}
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>{t('contactScreen.emailAddress')}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={t('contactScreen.emailPlaceholder')}
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>{t('contactScreen.preferredMotorcycle')}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bikePillsScroll}
              >
                {BIKES_DATA.map((b) => {
                  const active = b.id === selectedBikeId;
                  return (
                    <TouchableOpacity
                      key={b.id}
                      style={[styles.bikePill, active && styles.bikePillActive]}
                      onPress={() => setSelectedBikeId(b.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.bikePillText, active && styles.bikePillTextActive]}>
                        {b.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.datesRow}>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <Text style={styles.inputLabel}>{t('contactScreen.startDate')}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={t('contactScreen.datePlaceholder')}
                  placeholderTextColor={COLORS.textMuted}
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <Text style={styles.inputLabel}>{t('contactScreen.endDate')}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={t('contactScreen.datePlaceholder')}
                  placeholderTextColor={COLORS.textMuted}
                  value={endDate}
                  onChangeText={setEndDate}
                />
              </View>
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>{t('contactScreen.messageLabel')}</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder={t('contactScreen.messagePlaceholder')}
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={3}
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, SHADOWS.glowCyan]}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Send size={16} color="#050B14" />
              <Text style={styles.submitBtnText}>{t('contactScreen.sendEnquiryBtn')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Operating Hours Card */}
      <View style={styles.hoursCard}>
        <View style={styles.hoursIconWrap}>
          <Clock size={22} color={COLORS.accentCyan} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.hoursTitle}>{t('contactScreen.operatingHours')}</Text>
          <Text style={styles.hoursDesc}>
            {t('contactScreen.hoursDetail')}{'\n'}
            {t('contactScreen.doorstepDetail')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  pretitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accentCyan,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  cardsGrid: {
    gap: 10,
    marginBottom: 28,
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.md,
    padding: 14,
  },
  miniIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniTextWrap: {
    flex: 1,
  },
  miniLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  miniValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  formCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.lg,
    padding: 20,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 20,
  },
  formFields: {
    gap: 14,
  },
  inputWrap: {},
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  bikePillsScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  bikePill: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  bikePillActive: {
    backgroundColor: COLORS.accentCyan,
    borderColor: COLORS.accentCyan,
  },
  bikePillText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  bikePillTextActive: {
    color: '#050B14',
    fontWeight: '700',
  },
  datesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  submitBtn: {
    backgroundColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  submitBtnText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
  submittedWrap: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 10,
  },
  submittedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  submittedDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 12,
  },
  hoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.md,
    padding: 16,
  },
  hoursIconWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoursTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  hoursDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
