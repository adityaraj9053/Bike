import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Clock,
  MapPin,
  Check,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Download,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Bike,
} from 'lucide-react-native';
import { BIKES_DATA } from '../data/bikes';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';

export default function BookingScreen({
  route,
  navigation,
  onOpenQuote,
  onShowToast,
  onOpenWhatsApp,
}) {
  const selectedBike = route?.params?.bike || BIKES_DATA[0];
  const [step, setStep] = useState(1);

  // Dates & Times
  const [pickupDate, setPickupDate] = useState('2024-11-15');
  const [pickupTime, setPickupTime] = useState('09:00 AM');
  const [returnDate, setReturnDate] = useState('2024-11-17');
  const [returnTime, setReturnTime] = useState('08:00 PM');
  const [pickupLocation, setPickupLocation] = useState('hub'); // 'hub' or 'doorstep'

  // Rider details
  const [riderName, setRiderName] = useState('Rahul Verma');
  const [riderPhone, setRiderPhone] = useState('+91 98765 43210');
  const [riderEmail, setRiderEmail] = useState('rahul.verma@example.com');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    try {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays + 1 : 1;
    } catch {
      return 3;
    }
  }, [pickupDate, returnDate]);

  const rentalTotal = rentalDays * selectedBike.pricePerDay;
  const securityDeposit = selectedBike.deposit;
  const totalPayable = rentalTotal + securityDeposit;
  const [bookingRefId] = useState(() => 'RDE-' + Math.floor(100000 + Math.random() * 900000));

  const handleProceedPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      if (onShowToast) {
        onShowToast(`Booking confirmed! Reservation Ref #${bookingRefId}`);
      }
    }, 1200);
  };

  const handleDownloadQuote = () => {
    if (onOpenQuote) {
      onOpenQuote({
        refId: bookingRefId,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        days: rentalDays,
        rentalCharge: rentalTotal,
        deposit: securityDeposit,
        total: totalPayable,
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Stepper Header */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepIndicator}>
          <View style={[styles.stepBadge, step >= 1 && styles.stepBadgeActive]}>
            {step > 1 ? (
              <Check size={14} color="#050B14" strokeWidth={3} />
            ) : (
              <Text style={styles.stepBadgeText}>1</Text>
            )}
          </View>
          <Text style={[styles.stepLabel, step >= 1 && styles.stepLabelActive]}>
            DATES
          </Text>
        </View>

        <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]} />

        <View style={styles.stepIndicator}>
          <View style={[styles.stepBadge, step >= 2 && styles.stepBadgeActive]}>
            {step > 2 ? (
              <Check size={14} color="#050B14" strokeWidth={3} />
            ) : (
              <Text style={styles.stepBadgeText}>2</Text>
            )}
          </View>
          <Text style={[styles.stepLabel, step >= 2 && styles.stepLabelActive]}>
            SUMMARY
          </Text>
        </View>

        <View style={[styles.stepLine, step === 3 && styles.stepLineActive]} />

        <View style={styles.stepIndicator}>
          <View style={[styles.stepBadge, step === 3 && styles.stepBadgeActive]}>
            <Text style={styles.stepBadgeText}>3</Text>
          </View>
          <Text style={[styles.stepLabel, step === 3 && styles.stepLabelActive]}>
            CONFIRM
          </Text>
        </View>
      </View>

      {/* Selected Bike Mini Banner */}
      <View style={styles.bikeMiniBanner}>
        <Image source={selectedBike.imageSource} style={styles.bikeMiniImg} />
        <View style={styles.bikeMiniInfo}>
          <Text style={styles.bikeMiniName}>{selectedBike.name}</Text>
          <Text style={styles.bikeMiniModel}>{selectedBike.model}</Text>
          <Text style={styles.bikeMiniPrice}>₹{selectedBike.pricePerDay} / day</Text>
        </View>
      </View>

      {/* ================= STEP 1: DATE & TIME SELECTION ================= */}
      {step === 1 && (
        <View style={styles.stepCard}>
          <Text style={styles.cardTitle}>Choose Rental Period</Text>
          <Text style={styles.cardSubtitle}>
            Minimum duration is 24 hours. Free cancellation up to 6 hours before pickup.
          </Text>

          {/* Pickup */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionHeading}>Pickup Details</Text>
            <View style={styles.rowInputs}>
              <View style={[styles.inputWrap, { flex: 1.2 }]}>
                <Text style={styles.inputLabel}>Pickup Date</Text>
                <TextInput
                  style={styles.textInput}
                  value={pickupDate}
                  onChangeText={setPickupDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Pickup Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={pickupTime}
                  onChangeText={setPickupTime}
                  placeholder="09:00 AM"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
            </View>
          </View>

          {/* Return */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionHeading}>Drop-off Details</Text>
            <View style={styles.rowInputs}>
              <View style={[styles.inputWrap, { flex: 1.2 }]}>
                <Text style={styles.inputLabel}>Return Date</Text>
                <TextInput
                  style={styles.textInput}
                  value={returnDate}
                  onChangeText={setReturnDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
              <View style={[styles.inputWrap, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Return Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={returnTime}
                  onChangeText={setReturnTime}
                  placeholder="08:00 PM"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
            </View>
          </View>

          {/* Pickup Method */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionHeading}>Delivery / Pickup Hub</Text>
            <View style={styles.locationPills}>
              <TouchableOpacity
                style={[
                  styles.locationPill,
                  pickupLocation === 'hub' && styles.locationPillActive,
                ]}
                onPress={() => setPickupLocation('hub')}
                activeOpacity={0.8}
              >
                <MapPin size={16} color={pickupLocation === 'hub' ? '#050B14' : COLORS.textSecondary} />
                <Text
                  style={[
                    styles.locationPillText,
                    pickupLocation === 'hub' && styles.locationPillTextActive,
                  ]}
                >
                  Sector 5 Main Hub (Free)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.locationPill,
                  pickupLocation === 'doorstep' && styles.locationPillActive,
                ]}
                onPress={() => setPickupLocation('doorstep')}
                activeOpacity={0.8}
              >
                <Bike size={16} color={pickupLocation === 'doorstep' ? '#050B14' : COLORS.textSecondary} />
                <Text
                  style={[
                    styles.locationPillText,
                    pickupLocation === 'doorstep' && styles.locationPillTextActive,
                  ]}
                >
                  Doorstep Delivery (+₹200)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Duration Summary Pill */}
          <View style={styles.durationPill}>
            <Clock size={16} color={COLORS.accentCyan} />
            <Text style={styles.durationText}>
              Total Rental Duration:{' '}
              <Text style={{ fontWeight: '800', color: COLORS.accentCyan }}>
                {rentalDays} Billing Days
              </Text>{' '}
              (Estimated ₹{rentalTotal.toLocaleString()})
            </Text>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextBtn, SHADOWS.glowCyan]}
            onPress={() => setStep(2)}
            activeOpacity={0.8}
          >
            <Text style={styles.nextBtnText}>Continue to Summary</Text>
            <ArrowRight size={16} color="#050B14" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      )}

      {/* ================= STEP 2: SUMMARY & PAYMENT ================= */}
      {step === 2 && (
        <View style={styles.stepCard}>
          <Text style={styles.cardTitle}>Booking Summary & Details</Text>
          <Text style={styles.cardSubtitle}>
            Verify rider identity and select preferred payment channel.
          </Text>

          {/* Rental Breakdown Card */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>
                Base Rental ({rentalDays} Days @ ₹{selectedBike.pricePerDay})
              </Text>
              <Text style={styles.breakdownVal}>₹{rentalTotal.toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Refundable Security Deposit*</Text>
              <Text style={[styles.breakdownVal, { color: COLORS.accentCyan }]}>
                ₹{securityDeposit.toLocaleString()}
              </Text>
            </View>
            <View style={[styles.breakdownRow, styles.breakdownTotal]}>
              <Text style={styles.totalLabel}>Total Amount Payable</Text>
              <Text style={styles.totalVal}>₹{totalPayable.toLocaleString()}</Text>
            </View>
          </View>

          {/* Rider Form */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionHeading}>Rider Contact Details</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Full Legal Name</Text>
              <TextInput
                style={styles.textInput}
                value={riderName}
                onChangeText={setRiderName}
                placeholder="Rider's full name"
                placeholderTextColor={COLORS.textMuted}
              />
            </View>
            <View style={[styles.inputWrap, { marginTop: 10 }]}>
              <Text style={styles.inputLabel}>Mobile Phone Number</Text>
              <TextInput
                style={styles.textInput}
                value={riderPhone}
                onChangeText={setRiderPhone}
                placeholder="+91 98765 43210"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
              />
            </View>
            <View style={[styles.inputWrap, { marginTop: 10 }]}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                value={riderEmail}
                onChangeText={setRiderEmail}
                placeholder="email@example.com"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Payment Method Selector */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionHeading}>Select Payment Channel</Text>
            <View style={styles.paymentOptions}>
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'upi' && styles.paymentOptionActive,
                ]}
                onPress={() => setPaymentMethod('upi')}
                activeOpacity={0.8}
              >
                <Smartphone size={20} color={paymentMethod === 'upi' ? COLORS.accentCyan : COLORS.textSecondary} />
                <Text style={styles.paymentOptionText}>UPI / QR Code</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'card' && styles.paymentOptionActive,
                ]}
                onPress={() => setPaymentMethod('card')}
                activeOpacity={0.8}
              >
                <CreditCard size={20} color={paymentMethod === 'card' ? COLORS.accentCyan : COLORS.textSecondary} />
                <Text style={styles.paymentOptionText}>Credit / Debit Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'pickup' && styles.paymentOptionActive,
                ]}
                onPress={() => setPaymentMethod('pickup')}
                activeOpacity={0.8}
              >
                <ShieldCheck size={20} color={paymentMethod === 'pickup' ? COLORS.accentCyan : COLORS.textSecondary} />
                <Text style={styles.paymentOptionText}>Pay at Hub Pickup</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.step2Buttons}>
            <TouchableOpacity
              style={styles.backStepBtn}
              onPress={() => setStep(1)}
              activeOpacity={0.8}
            >
              <ArrowLeft size={16} color={COLORS.textSecondary} />
              <Text style={styles.backStepText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.payBtn, SHADOWS.glowRed]}
              onPress={handleProceedPayment}
              disabled={isProcessing}
              activeOpacity={0.8}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.payBtnText}>
                    Confirm & Reserve (₹{totalPayable.toLocaleString()})
                  </Text>
                  <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.5} />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ================= STEP 3: CONFIRMATION ================= */}
      {step === 3 && (
        <View style={styles.stepCard}>
          <View style={styles.successIconWrap}>
            <CheckCircle2 size={54} color={COLORS.statusAvailable} />
          </View>

          <Text style={styles.successTitle}>Reservation Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your booking reference is{' '}
            <Text style={{ fontWeight: '800', color: COLORS.accentCyan }}>
              #{bookingRefId}
            </Text>
          </Text>

          {/* Next Steps Box */}
          <View style={styles.nextStepsCard}>
            <Text style={styles.nextStepsTitle}>What Happens Next?</Text>
            <View style={styles.nextStepItem}>
              <Text style={styles.nextStepNumber}>1</Text>
              <Text style={styles.nextStepText}>
                Our concierge will verify vehicle schedule and call you within 15 minutes.
              </Text>
            </View>
            <View style={styles.nextStepItem}>
              <Text style={styles.nextStepNumber}>2</Text>
              <Text style={styles.nextStepText}>
                Bring your original Driving Licence and Govt ID proof to vehicle pickup.
              </Text>
            </View>
            <View style={styles.nextStepItem}>
              <Text style={styles.nextStepNumber}>3</Text>
              <Text style={styles.nextStepText}>
                Complete 2-minute physical inspection, collect your helmet, and ride!
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.step3Actions}>
            <TouchableOpacity
              style={styles.whatsAppConfirmBtn}
              onPress={() => onOpenWhatsApp(selectedBike)}
              activeOpacity={0.8}
            >
              <MessageCircle size={18} color="#050B14" />
              <Text style={styles.whatsAppConfirmText}>
                Confirm Directly on WhatsApp
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.voucherBtn}
              onPress={handleDownloadQuote}
              activeOpacity={0.8}
            >
              <Download size={16} color={COLORS.accentCyan} />
              <Text style={styles.voucherBtnText}>View Quotation Voucher</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.8}
            >
              <Text style={styles.homeBtnText}>Back to Home Fleet</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    paddingBottom: 50,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  stepIndicator: {
    alignItems: 'center',
    gap: 4,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeActive: {
    backgroundColor: COLORS.accentCyan,
    borderColor: COLORS.accentCyan,
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#050B14',
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  stepLabelActive: {
    color: COLORS.accentCyan,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.borderCard,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: COLORS.accentCyan,
  },
  bikeMiniBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 20,
  },
  bikeMiniImg: {
    width: 70,
    height: 50,
    borderRadius: RADIUS.sm,
  },
  bikeMiniInfo: {
    flex: 1,
  },
  bikeMiniName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  bikeMiniModel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bikeMiniPrice: {
    fontSize: 12,
    color: COLORS.accentCyan,
    fontWeight: '700',
    marginTop: 2,
  },
  stepCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.lg,
    padding: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 18,
  },
  inputSection: {
    marginBottom: 18,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  inputWrap: {},
  inputLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  locationPills: {
    gap: 8,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.md,
    padding: 12,
  },
  locationPillActive: {
    backgroundColor: COLORS.accentCyan,
    borderColor: COLORS.accentCyan,
  },
  locationPillText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  locationPillTextActive: {
    color: '#050B14',
    fontWeight: '700',
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.25)',
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 20,
  },
  durationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  nextBtn: {
    backgroundColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextBtnText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
  breakdownCard: {
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: RADIUS.md,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  breakdownTotal: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderCard,
    marginTop: 6,
    paddingTop: 10,
  },
  breakdownLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  breakdownVal: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  totalVal: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.accentRed,
  },
  paymentOptions: {
    gap: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.md,
    padding: 12,
  },
  paymentOptionActive: {
    borderColor: COLORS.accentCyan,
    backgroundColor: 'rgba(0, 163, 255, 0.08)',
  },
  paymentOptionText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  step2Buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  backStepBtn: {
    flex: 1,
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  backStepText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  payBtn: {
    flex: 2.2,
    backgroundColor: COLORS.accentRed,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  payBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  successIconWrap: {
    alignItems: 'center',
    marginVertical: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  nextStepsCard: {
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: RADIUS.md,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  nextStepsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  nextStepItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  nextStepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.accentCyan,
    color: '#050B14',
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 12,
    fontWeight: '800',
  },
  nextStepText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  step3Actions: {
    gap: 10,
  },
  whatsAppConfirmBtn: {
    backgroundColor: COLORS.whatsappGreen,
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  whatsAppConfirmText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
  voucherBtn: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  voucherBtnText: {
    color: COLORS.accentCyan,
    fontSize: 13,
    fontWeight: '700',
  },
  homeBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  homeBtnText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
});
