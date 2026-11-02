import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
} from 'react-native';
import { X, MessageCircle, Send, CheckCircle2 } from 'lucide-react-native';
import { BIKES_DATA } from '../data/bikes';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';

export default function EnquiryModal({
  visible,
  onClose,
  selectedBike,
  onShowToast,
}) {
  const [bikeId, setBikeId] = useState(selectedBike?.id || BIKES_DATA[0].id);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedBike) {
      setBikeId(selectedBike.id);
    }
  }, [selectedBike]);

  const currentBike = BIKES_DATA.find((b) => b.id === bikeId) || BIKES_DATA[0];

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello The Road Eagle! I would like to enquire about renting the ${currentBike.name} (${currentBike.model}).\n` +
      `Dates: ${startDate || 'Flexible'} to ${endDate || 'Flexible'}\n` +
      `My Name: ${fullName || 'Rider'}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      (message ? `Note: ${message}` : '')
    );
    Linking.openURL(`https://wa.me/919876543210?text=${text}`).catch(() => {});
    if (onShowToast) onShowToast(`Redirecting to WhatsApp for ${currentBike.name}!`);
    onClose();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(`Enquiry received for ${currentBike.name}! Our team will call you shortly.`);
    }
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
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
                {/* Header */}
                <View style={styles.header}>
                  <View style={styles.iconCircle}>
                    <MessageCircle size={26} color={COLORS.accentCyan} />
                  </View>
                  <Text style={styles.title}>Enquire on WhatsApp</Text>
                  <Text style={styles.subtitle}>
                    Instant response from our concierge (+91 98765 43210)
                  </Text>
                </View>

                {submitted ? (
                  <View style={styles.submittedWrap}>
                    <CheckCircle2 size={48} color={COLORS.statusAvailable} />
                    <Text style={styles.submittedTitle}>Enquiry Submitted!</Text>
                    <Text style={styles.submittedSubtitle}>
                      We have received your enquiry for {currentBike.name}. A representative will connect with you right away.
                    </Text>
                  </View>
                ) : (
                  <View style={styles.form}>
                    {/* Bike Selector Chips */}
                    <Text style={styles.label}>Select Motorcycle</Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.bikeChipsScroll}
                      contentContainerStyle={styles.bikeChipsContent}
                    >
                      {BIKES_DATA.map((b) => {
                        const active = b.id === bikeId;
                        return (
                          <TouchableOpacity
                            key={b.id}
                            style={[styles.bikeChip, active && styles.bikeChipActive]}
                            onPress={() => setBikeId(b.id)}
                            activeOpacity={0.8}
                          >
                            <Text style={[styles.bikeChipText, active && styles.bikeChipTextActive]}>
                              {b.name} (₹{b.pricePerDay})
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>

                    {/* Rider info */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Full Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Your name"
                        placeholderTextColor={COLORS.textMuted}
                        value={fullName}
                        onChangeText={setFullName}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Contact Phone Number</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="+91 98765 43210"
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                      />
                    </View>

                    {/* Dates */}
                    <View style={styles.datesRow}>
                      <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Start Date</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="YYYY-MM-DD"
                          placeholderTextColor={COLORS.textMuted}
                          value={startDate}
                          onChangeText={setStartDate}
                        />
                      </View>
                      <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.label}>End Date</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="YYYY-MM-DD"
                          placeholderTextColor={COLORS.textMuted}
                          value={endDate}
                          onChangeText={setEndDate}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Questions or Delivery Requirements</Text>
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Need doorstep delivery, extra helmets, or custom touring duration..."
                        placeholderTextColor={COLORS.textMuted}
                        multiline
                        numberOfLines={3}
                        value={message}
                        onChangeText={setMessage}
                      />
                    </View>

                    {/* WhatsApp CTA Button */}
                    <TouchableOpacity
                      style={styles.whatsAppBtn}
                      onPress={handleWhatsAppRedirect}
                      activeOpacity={0.8}
                    >
                      <MessageCircle size={18} color="#050B14" />
                      <Text style={styles.whatsAppBtnText}>Send Enquiry on WhatsApp</Text>
                    </TouchableOpacity>

                    {/* Direct Submit */}
                    <TouchableOpacity
                      style={styles.submitBtn}
                      onPress={handleSubmit}
                      activeOpacity={0.8}
                    >
                      <Send size={16} color={COLORS.accentCyan} />
                      <Text style={styles.submitBtnText}>Submit Lead Directly</Text>
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
    padding: 16,
  },
  modalCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    padding: 20,
    maxHeight: '92%',
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  form: {
    gap: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  bikeChipsScroll: {
    marginBottom: 6,
  },
  bikeChipsContent: {
    gap: 8,
  },
  bikeChip: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  bikeChipActive: {
    backgroundColor: COLORS.accentCyan,
    borderColor: COLORS.accentCyan,
  },
  bikeChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  bikeChipTextActive: {
    color: '#050B14',
    fontWeight: '700',
  },
  inputGroup: {},
  input: {
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
  datesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  whatsAppBtn: {
    backgroundColor: COLORS.accentCyan,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    marginTop: 6,
  },
  whatsAppBtnText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
  submitBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: RADIUS.full,
    paddingVertical: 11,
  },
  submitBtnText: {
    color: COLORS.accentCyan,
    fontSize: 13,
    fontWeight: '600',
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
  submittedSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
});
