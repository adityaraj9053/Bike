import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
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
import { LinearGradient } from 'expo-linear-gradient';
import { BIKES_DATA } from '../data/bikes';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export default function ContactScreen({ onShowToast, onOpenWhatsApp }) {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isWide = width >= 860;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBike, setSelectedBike] = useState(
    BIKES_DATA[0]?.name || 'Night Hawk Cruiser'
  );
  const [specialReqs, setSpecialReqs] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!fullName.trim() && !phone.trim()) {
      if (onShowToast) {
        onShowToast('Please enter your name and phone number');
      }
      return;
    }
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(
        t('contactScreen.toastSuccess', { name: fullName || 'Rider' })
      );
    }
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhone('');
      setEmail('');
      setSpecialReqs('');
    }, 3500);
  };

  const handleOpenMaps = () => {
    Linking.openURL(
      'https://maps.google.com/?q=Plot+42+Speed+Lane+Sector+18+Gurugram'
    ).catch(() => {});
  };

  const handleOpenCall = () => {
    Linking.openURL('tel:+919876543210').catch(() => {});
  };

  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      Linking.openURL('https://wa.me/919876543210').catch(() => {});
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        isWide && styles.contentContainerWide,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={isWide ? styles.innerWrapperWide : styles.innerWrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pretitle}>
            {t('contactScreen.pretitle', 'GET IN TOUCH')}
          </Text>
          <h1 style={{ display: 'none' }}>Contact The Road Eagle</h1>
          <Text style={styles.title}>
            {t('contactScreen.title', 'Contact The Road Eagle')}
          </Text>
          <Text style={styles.subtitle}>
            {t(
              'contactScreen.subtitle',
              'Have questions about machines, security deposits, or outstation tours? Reach out via WhatsApp or visit our central pickup hub.'
            )}
          </Text>
        </View>

        {/* 2-Column or Stacked Grid */}
        <View style={[styles.mainLayout, isWide && styles.mainLayoutWide]}>
          {/* Left Column: Contact Methods & Location */}
          <View style={[styles.leftColumn, isWide && styles.leftColumnWide]}>
            {/* Top 2 Mini Cards: Call & WhatsApp */}
            <View style={styles.miniCardsRow}>
              {/* Instant Call */}
              <TouchableOpacity
                style={[styles.callCard, SHADOWS.card]}
                onPress={handleOpenCall}
                activeOpacity={0.8}
              >
                <View style={styles.callIconCircle}>
                  <Phone size={19} color="#00A3FF" strokeWidth={2} />
                </View>
                <Text style={styles.miniCardTitle}>
                  {t('contactScreen.instantCall', 'Instant Call')}
                </Text>
                <Text style={styles.miniCardSub}>
                  {t('contactScreen.instantCallNumber', '+91 98765 43210')}
                </Text>
              </TouchableOpacity>

              {/* WhatsApp Concierge */}
              <TouchableOpacity
                style={[styles.callCard, SHADOWS.card]}
                onPress={handleWhatsApp}
                activeOpacity={0.8}
              >
                <View style={styles.whatsappIconCircle}>
                  <MessageCircle size={19} color="#25D366" strokeWidth={2} />
                </View>
                <Text style={styles.miniCardTitle}>
                  {t('contactScreen.whatsappConcierge', 'WhatsApp Concierge')}
                </Text>
                <Text style={styles.miniCardSub}>
                  {t('contactScreen.whatsappStatus', 'Live chat 24/7')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Unified Hub & Hours Card */}
            <View style={[styles.unifiedCard, SHADOWS.card]}>
              {/* Garage & Hub */}
              <View style={styles.infoRow}>
                <View style={styles.infoIconCircle}>
                  <MapPin size={18} color="#00A3FF" strokeWidth={2} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>
                    {t('contactScreen.mainGarageHub', 'Main Garage & Hub')}
                  </Text>
                  <Text style={styles.infoText}>
                    {t(
                      'contactScreen.mainGarageAddress',
                      'Plot 42, Speed Lane, Near Central Metro Station, Sector 18, Gurugram / Delhi NCR - 122001'
                    )}
                  </Text>
                  <TouchableOpacity onPress={handleOpenMaps} activeOpacity={0.7}>
                    <Text style={styles.mapLink}>
                      {t('contactScreen.openInMaps', 'Open in Google Maps →')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Operating Hours */}
              <View style={styles.infoRow}>
                <View style={styles.infoIconCircle}>
                  <Clock size={18} color="#00A3FF" strokeWidth={2} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>
                    {t('contactScreen.operatingHours', 'Operating Hours')}
                  </Text>
                  <Text style={styles.infoText}>
                    {t(
                      'contactScreen.operatingHoursSchedule',
                      'Monday – Sunday: 08:00 AM – 09:30 PM'
                    )}
                  </Text>
                  <Text style={styles.infoSubtext}>
                    {t(
                      'contactScreen.operatingHoursSub',
                      'Emergency roadside assistance operates 24/7'
                    )}
                  </Text>
                </View>
              </View>

              {/* Email Enquiries */}
              <View style={styles.infoRow}>
                <View style={styles.infoIconCircle}>
                  <Mail size={18} color="#00A3FF" strokeWidth={2} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>
                    {t('contactScreen.emailEnquiries', 'Email Enquiries')}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL('mailto:support@theroadeagle.com').catch(
                        () => {}
                      )
                    }
                    activeOpacity={0.7}
                  >
                    <Text style={styles.infoText}>
                      {t(
                        'contactScreen.emailAddressVal',
                        'support@theroadeagle.com'
                      )}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.infoSubtext}>
                    {t(
                      'contactScreen.emailResponseTime',
                      'Response within 2 hours'
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Right Column: Send an Instant Enquiry Form */}
          <View style={[styles.rightColumn, isWide && styles.rightColumnWide]}>
            <View style={[styles.formCard, SHADOWS.card]}>
              <Text style={styles.formTitle}>
                {t('contactScreen.formTitle', 'Send an Instant Enquiry')}
              </Text>
              <Text style={styles.formSubtitle}>
                {t(
                  'contactScreen.formSubtitle',
                  'Leave your details below and our concierge team will reach out with availability & best tariff.'
                )}
              </Text>

              {submitted ? (
                <View style={styles.submittedWrap}>
                  <CheckCircle2 size={52} color="#10B981" />
                  <Text style={styles.submittedTitle}>
                    {t('contactScreen.submittedTitle', 'Enquiry Received!')}
                  </Text>
                  <Text style={styles.submittedDesc}>
                    {t(
                      'contactScreen.submittedDesc',
                      'Thank you for reaching out. Our team will contact you shortly with the best tariff.'
                    )}
                  </Text>
                </View>
              ) : (
                <View style={styles.formFields}>
                  {/* Full Name */}
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>
                      {t('contactScreen.fullNameLabel', 'FULL NAME')}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t(
                        'contactScreen.fullNamePlaceholder',
                        'e.g. Rahul Verma'
                      )}
                      placeholderTextColor="#475569"
                      value={fullName}
                      onChangeText={setFullName}
                    />
                  </View>

                  {/* Mobile & Email Row */}
                  <View
                    style={[
                      styles.inputsRow,
                      !isWide && width < 500 && styles.inputsRowStacked,
                    ]}
                  >
                    <View style={[styles.inputWrap, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>
                        {t('contactScreen.mobileNumberLabel', 'MOBILE NUMBER')}
                      </Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder={t(
                          'contactScreen.mobileNumberPlaceholder',
                          '10-digit number'
                        )}
                        placeholderTextColor="#475569"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                      />
                    </View>
                    <View style={[styles.inputWrap, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>
                        {t('contactScreen.emailAddressLabel', 'EMAIL ADDRESS')}
                      </Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder={t(
                          'contactScreen.emailAddressPlaceholder',
                          'rider@example.com'
                        )}
                        placeholderTextColor="#475569"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>
                  </View>

                  {/* Motorbike Selection Pills */}
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>
                      {t(
                        'contactScreen.selectMotorbikeLabel',
                        'SELECT MOTORBIKE OF INTEREST'
                      )}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.bikePillsScroll}
                    >
                      {BIKES_DATA.map((b) => {
                        const active = b.name === selectedBike;
                        return (
                          <TouchableOpacity
                            key={b.id}
                            style={[
                              styles.bikePill,
                              active && styles.bikePillActive,
                            ]}
                            onPress={() => setSelectedBike(b.name)}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={[
                                styles.bikePillText,
                                active && styles.bikePillTextActive,
                              ]}
                            >
                              {b.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>

                  {/* Special Requirements */}
                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>
                      {t(
                        'contactScreen.specialRequirementsLabel',
                        'SPECIAL REQUIREMENTS / TRIP DETAILS (OPTIONAL)'
                      )}
                    </Text>
                    <TextInput
                      style={[styles.textInput, styles.textArea]}
                      placeholder={t(
                        'contactScreen.specialRequirementsPlaceholder',
                        'e.g. Need extra helmet, planning weekend trip to Rishikesh...'
                      )}
                      placeholderTextColor="#475569"
                      multiline
                      numberOfLines={3}
                      value={specialReqs}
                      onChangeText={setSpecialReqs}
                    />
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    activeOpacity={0.85}
                    style={styles.submitBtnWrapper}
                  >
                    <LinearGradient
                      colors={['#0284C7', '#00A3FF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.submitBtn}
                    >
                      <Send size={16} color="#FFFFFF" strokeWidth={2.5} />
                      <Text style={styles.submitBtnText}>
                        {t(
                          'contactScreen.submitEnquiryBtn',
                          'Submit Rental Enquiry'
                        )}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B13',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  contentContainerWide: {
    paddingHorizontal: 36,
    paddingVertical: 36,
  },
  innerWrapper: {
    width: '100%',
  },
  innerWrapperWide: {
    maxWidth: 1140,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 28,
  },
  pretitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#00A3FF',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 13.5,
    color: '#94A3B8',
    lineHeight: 20,
    maxWidth: 680,
  },
  mainLayout: {
    flexDirection: 'column',
    gap: 20,
  },
  mainLayoutWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  leftColumn: {
    width: '100%',
    gap: 16,
  },
  leftColumnWide: {
    flex: 1,
  },
  rightColumn: {
    width: '100%',
  },
  rightColumnWide: {
    flex: 1.2,
  },
  miniCardsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  callCard: {
    flex: 1,
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.lg,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  whatsappIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(37, 211, 102, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(37, 211, 102, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  miniCardTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  miniCardSub: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00A3FF',
    textAlign: 'center',
  },
  unifiedCard: {
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.lg,
    padding: 22,
    gap: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  infoIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 163, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 18,
  },
  infoSubtext: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 3,
  },
  mapLink: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#00A3FF',
    marginTop: 6,
  },
  formCard: {
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.lg,
    padding: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 20,
  },
  formFields: {
    gap: 14,
  },
  inputWrap: {
    width: '100%',
  },
  inputsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputsRowStacked: {
    flexDirection: 'column',
  },
  inputLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#070C15',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 13,
  },
  textArea: {
    height: 75,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  bikePillsScroll: {
    gap: 8,
    paddingBottom: 2,
  },
  bikePill: {
    backgroundColor: '#0E1626',
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  bikePillActive: {
    backgroundColor: '#00A3FF',
    borderColor: '#00A3FF',
  },
  bikePillText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  bikePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  submitBtnWrapper: {
    marginTop: 6,
    borderRadius: RADIUS.full,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  submitBtn: {
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  submittedWrap: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 10,
  },
  submittedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  submittedDesc: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 16,
  },
});
