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

export default function ContactScreen({ onShowToast, onOpenWhatsApp }) {
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
      onShowToast(`Thank you, ${fullName || 'Rider'}! Your enquiry has been received.`);
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
        <Text style={styles.pretitle}>GET IN TOUCH</Text>
        <Text style={styles.title}>
          Let's Get You on the{'\n'}
          <Text style={{ color: COLORS.accentCyan }}>Road.</Text>
        </Text>
        <Text style={styles.subtitle}>
          Have questions about our bikes, rental prices, or availability? Get in touch with our team anytime.
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
            <Text style={styles.miniLabel}>Phone Number</Text>
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
            <Text style={styles.miniLabel}>WhatsApp Concierge</Text>
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
            <Text style={styles.miniLabel}>Email Address</Text>
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
            <Text style={styles.miniLabel}>Business Hub Location</Text>
            <Text style={styles.miniValue}>123 Rider Avenue, Sector 5</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Enquiry Form */}
      <View style={[styles.formCard, SHADOWS.card]}>
        <Text style={styles.formTitle}>Send an Enquiry</Text>
        <Text style={styles.formSubtitle}>
          Fill in your details and our concierge will verify vehicle schedule and confirm within 15 minutes.
        </Text>

        {submitted ? (
          <View style={styles.submittedWrap}>
            <CheckCircle2 size={50} color={COLORS.statusAvailable} />
            <Text style={styles.submittedTitle}>Message Received!</Text>
            <Text style={styles.submittedDesc}>
              Thank you for reaching out. A representative will contact you at your provided phone number shortly.
            </Text>
          </View>
        ) : (
          <View style={styles.formFields}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Rider name"
                placeholderTextColor={COLORS.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="+91 98765 43210"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <View style={styles.inputWrap}>
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

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Preferred Motorcycle</Text>
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
                <Text style={styles.inputLabel}>Start Date</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={COLORS.textMuted}
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <Text style={styles.inputLabel}>End Date</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={COLORS.textMuted}
                  value={endDate}
                  onChangeText={setEndDate}
                />
              </View>
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Message / Tour Itinerary</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Let us know your destination, gear requirements, or queries..."
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
              <Text style={styles.submitBtnText}>Send Rental Enquiry</Text>
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
          <Text style={styles.hoursTitle}>Operating Hours</Text>
          <Text style={styles.hoursDesc}>
            Monday - Sunday: 7:00 AM - 10:00 PM{'\n'}
            Doorstep delivery & pickup available on prior schedule.
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
