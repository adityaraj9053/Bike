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
  useWindowDimensions,
  Modal,
  Platform,
} from 'react-native';
import {
  Calendar,
  Clock,
  Info,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Download,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react-native';
import { BIKES_DATA } from '../data/bikes';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
import { useTranslation } from 'react-i18next';


const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const HOURS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const MINUTES = ['00', '15', '30', '45'];

const PICKUP_TIMES = [
  '09:00 AM (Hub Opens)',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
];

const RETURN_TIMES = [
  '06:00 PM',
  '07:00 PM',
  '08:00 PM (Hub Closes)',
  '09:00 PM',
  '10:00 PM',
];

const COUNTRY_DIAL_CODES = [
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', dialCode: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'SG', dialCode: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: 'MY', dialCode: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'ID', dialCode: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'TH', dialCode: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: 'ZA', dialCode: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: 'IT', dialCode: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', dialCode: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', dialCode: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', dialCode: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NP', dialCode: '+977', name: 'Nepal', flag: '🇳🇵' },
  { code: 'LK', dialCode: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'BD', dialCode: '+880', name: 'Bangladesh', flag: '🇧🇩' },
];

export default function BookingScreen({
  route,
  navigation,
  onOpenQuote,
  onShowToast,
  onOpenWhatsApp,
}) {
  const { t } = useTranslation();
  const selectedBike = route?.params?.bike || BIKES_DATA[0];
  const [step, setStep] = useState(1);

  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  // Dates & Times (matching user reference mockup)
  const [pickupDate, setPickupDate] = useState('11/15/2024');
  const [pickupTime, setPickupTime] = useState('09:00 AM (Hub Opens)');
  const [returnDate, setReturnDate] = useState('11/17/2024');
  const [returnTime, setReturnTime] = useState('08:00 PM (Hub Closes)');

  // Country Code & Phone Number state
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_DIAL_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  // Dropdown modal state
  const [activePicker, setActivePicker] = useState(null); // 'pickup' | 'return' | null

  // Calendar picker state
  const [activeCalendarPicker, setActiveCalendarPicker] = useState(null); // 'pickup' | 'return' | null
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const openCalendarPicker = (type) => {
    const targetDateStr = type === 'pickup' ? pickupDate : returnDate;
    try {
      const parts = targetDateStr.split('/');
      if (parts.length === 3) {
        const m = parseInt(parts[0], 10) - 1;
        const y = parseInt(parts[2], 10);
        if (!isNaN(m) && !isNaN(y)) {
          setCalendarMonth(m);
          setCalendarYear(y);
        }
      }
    } catch (_) {}
    setActiveCalendarPicker(type);
  };

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day) => {
    const mm = String(calendarMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const yyyy = String(calendarYear);
    const formatted = `${mm}/${dd}/${yyyy}`;
    if (activeCalendarPicker === 'pickup') {
      setPickupDate(formatted);
    } else if (activeCalendarPicker === 'return') {
      setReturnDate(formatted);
    }
    setActiveCalendarPicker(null);
  };

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const blanks = Array(firstDayIndex).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...blanks, ...days];
  }, [calendarMonth, calendarYear]);

  const isDaySelected = (day) => {
    if (!day) return false;
    const targetStr = activeCalendarPicker === 'pickup' ? pickupDate : returnDate;
    const parts = targetStr.split('/');
    if (parts.length === 3) {
      const m = parseInt(parts[0], 10) - 1;
      const d = parseInt(parts[1], 10);
      const y = parseInt(parts[2], 10);
      return m === calendarMonth && y === calendarYear && d === day;
    }
    return false;
  };

  // Time picker state (Hours, Minutes, AM/PM)
  const [activeTimePicker, setActiveTimePicker] = useState(null); // 'pickup' | 'return' | null
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const openTimePicker = (type) => {
    const targetTimeStr = type === 'pickup' ? pickupTime : returnTime;
    try {
      const match = targetTimeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (match) {
        setSelectedHour(match[1].padStart(2, '0'));
        setSelectedMinute(match[2].padStart(2, '0'));
        setSelectedPeriod(match[3].toUpperCase());
      } else {
        setSelectedHour('09');
        setSelectedMinute('00');
        setSelectedPeriod('AM');
      }
    } catch (_) {}
    setActiveTimePicker(type);
  };

  const handleConfirmTime = () => {
    let formatted = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    if (selectedHour === '09' && selectedMinute === '00' && selectedPeriod === 'AM') {
      formatted += ' (Hub Opens)';
    } else if (selectedHour === '08' && selectedMinute === '00' && selectedPeriod === 'PM') {
      formatted += ' (Hub Closes)';
    }

    if (activeTimePicker === 'pickup') {
      setPickupTime(formatted);
    } else if (activeTimePicker === 'return') {
      setReturnTime(formatted);
    }
    setActiveTimePicker(null);
  };


  // Rider details for step 2
  const [riderName, setRiderName] = useState('Rahul Verma');
  const [riderEmail, setRiderEmail] = useState('rahul.verma@example.com');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter country codes by search
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRY_DIAL_CODES;
    const q = countrySearch.toLowerCase().trim();
    return COUNTRY_DIAL_CODES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  // Combined full international phone number
  const fullPhoneNumber = useMemo(() => {
    return phoneNumber ? `${selectedCountryCode} ${phoneNumber}` : '';
  }, [selectedCountryCode, phoneNumber]);

  // Handle phone number input: restrict to numeric digits only, max 10 digits
  const handlePhoneNumberChange = (val) => {
    const numeric = val.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(numeric);
    if (phoneError) setPhoneError('');
  };

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    try {
      const parse = (str) => {
        if (!str) return null;
        if (str.includes('/')) {
          const parts = str.split('/');
          if (parts.length === 3) {
            return new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
          }
        }
        return new Date(str);
      };
      const d1 = parse(pickupDate);
      const d2 = parse(returnDate);
      const diffMs = Math.abs(d2.getTime() - d1.getTime());
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return days > 0 ? days + 1 : 3;
    } catch {
      return 3;
    }
  }, [pickupDate, returnDate]);

  const rentalTotal = rentalDays * selectedBike.pricePerDay;
  const securityDeposit = selectedBike.deposit || 3000;
  const totalPayable = rentalTotal + securityDeposit;
  const [bookingRefId] = useState(() => 'RDE-' + Math.floor(100000 + Math.random() * 900000));

  const handleProceedPayment = () => {
    if (!selectedCountryCode) {
      setPhoneError('Please select a country code.');
      return;
    }
    if (!phoneNumber.trim()) {
      setPhoneError('Please enter your mobile phone number.');
      return;
    }
    if (phoneNumber.length < 10) {
      setPhoneError('Phone number must be exactly 10 digits.');
      return;
    }
    setPhoneError('');

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
        riderName,
        riderPhone: fullPhoneNumber,
        riderEmail,
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageInner}>
        {/* ================= STEPPER HEADER ================= */}
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepItem}
            onPress={() => step > 1 && setStep(1)}
            activeOpacity={step > 1 ? 0.7 : 1}
          >
            <View style={[styles.stepCircle, step >= 1 ? styles.stepCircleActive : styles.stepCircleInactive]}>
              {step > 1 ? (
                <Check size={14} color="#050B14" strokeWidth={3} />
              ) : (
                <Text style={styles.stepCircleNumActive}>1</Text>
              )}
            </View>
            <Text style={[styles.stepText, step === 1 ? styles.stepTextActive : styles.stepTextInactive]}>
              {t('reservation.dateSelection')}
            </Text>
          </TouchableOpacity>

          <View style={[styles.stepDividerLine, step >= 2 && styles.stepDividerLineActive]} />

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, step >= 2 ? styles.stepCircleActive : styles.stepCircleInactive]}>
              <Text style={step >= 2 ? styles.stepCircleNumActive : styles.stepCircleNumInactive}>2</Text>
            </View>
            <Text style={[styles.stepText, step >= 2 ? styles.stepTextActive : styles.stepTextInactive]}>
              {t('reservation.summaryPayment')}
            </Text>
          </View>
        </View>

        {/* ================= STEP 1 & 2: MAIN TWO-COLUMN CONTENT ================= */}
        {step < 3 && (
          <View style={[styles.mainLayout, isWide ? styles.mainLayoutRow : styles.mainLayoutCol]}>
            {/* LEFT COLUMN: FORM CARD */}
            <View style={[styles.leftColumn, isWide && { flex: 1.25 }]}>
              {step === 1 ? (
                /* STEP 1: DATE & TIME SELECTION */
                <View style={[styles.card, SHADOWS.card]}>
                  <Text style={styles.cardHeading}>{t('reservation.whenRiding')}</Text>
                  <Text style={styles.cardSubheading}>
                    {t('reservation.whenRidingSubtitle')}
                  </Text>

                  {/* 2x2 Form Inputs Grid */}
                  <View style={styles.formGrid}>
                    {/* Row 1: Pickup Date & Time */}
                    <View style={styles.formRow}>
                      <View style={styles.formFieldCol}>
                        <View style={styles.fieldLabelRow}>
                          <Calendar size={13} color="#94A3B8" />
                          <Text style={styles.fieldLabelText}>{t('reservation.pickupDate')}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.inputBoxWithIcon}
                          onPress={() => openCalendarPicker('pickup')}
                          activeOpacity={0.8}
                          accessibilityRole="button"
                          accessibilityLabel="Select Pickup Date Calendar"
                        >
                          <Text style={styles.textInputInside}>
                            {pickupDate}
                          </Text>
                          <Calendar size={16} color="#00A3FF" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.formFieldCol}>
                        <View style={styles.fieldLabelRow}>
                          <Clock size={13} color="#94A3B8" />
                          <Text style={styles.fieldLabelText}>{t('reservation.pickupTime')}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.dropdownBox}
                          onPress={() => openTimePicker('pickup')}
                          activeOpacity={0.8}
                          accessibilityRole="button"
                          accessibilityLabel="Select Pickup Time Clock"
                        >
                          <Text style={styles.dropdownValueText} numberOfLines={1}>
                            {pickupTime}
                          </Text>
                          <Clock size={16} color="#00A3FF" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Row 2: Return Date & Time */}
                    <View style={styles.formRow}>
                      <View style={styles.formFieldCol}>
                        <View style={styles.fieldLabelRow}>
                          <Calendar size={13} color="#94A3B8" />
                          <Text style={styles.fieldLabelText}>{t('reservation.returnDate')}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.inputBoxWithIcon}
                          onPress={() => openCalendarPicker('return')}
                          activeOpacity={0.8}
                          accessibilityRole="button"
                          accessibilityLabel="Select Return Date Calendar"
                        >
                          <Text style={styles.textInputInside}>
                            {returnDate}
                          </Text>
                          <Calendar size={16} color="#00A3FF" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.formFieldCol}>
                        <View style={styles.fieldLabelRow}>
                          <Clock size={13} color="#94A3B8" />
                          <Text style={styles.fieldLabelText}>{t('reservation.returnTime')}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.dropdownBox}
                          onPress={() => openTimePicker('return')}
                          activeOpacity={0.8}
                          accessibilityRole="button"
                          accessibilityLabel="Select Return Time Clock"
                        >
                          <Text style={styles.dropdownValueText} numberOfLines={1}>
                            {returnTime}
                          </Text>
                          <Clock size={16} color="#00A3FF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Security Deposit Notice Banner */}
                  <View style={styles.depositNoticeBox}>
                    <Info size={19} color="#00A3FF" style={{ flexShrink: 0, marginTop: 1 }} />
                    <Text style={styles.depositNoticeText}>
                      {t('reservation.depositNotice', { amount: securityDeposit.toLocaleString() })}
                    </Text>
                  </View>

                  {/* CTA Button */}
                  <TouchableOpacity
                    style={[styles.continueBtn, SHADOWS.glowCyan]}
                    onPress={() => setStep(2)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.continueBtnText}>{t('reservation.continueSummary')}</Text>
                    <ArrowRight size={17} color="#050B14" strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>
              ) : (
                /* STEP 2: RIDER & PAYMENT DETAILS */
                <View style={[styles.card, SHADOWS.card]}>
                  <Text style={styles.cardHeading}>{t('reservation.riderPaymentDetails')}</Text>
                  <Text style={styles.cardSubheading}>
                    {t('reservation.riderSubtitle')}
                  </Text>

                  {/* Rider Contact Inputs */}
                  <View style={styles.step2InputGroup}>
                    <Text style={styles.step2Label}>{t('reservation.riderFullName')}</Text>
                    <TextInput
                      style={styles.step2Input}
                      value={riderName}
                      onChangeText={setRiderName}
                      placeholder="e.g. Rahul Verma"
                      placeholderTextColor="#475569"
                    />
                  </View>

                  <View style={[styles.step2Row, width < 640 && styles.step2RowCol]}>
                    <View style={styles.phoneFieldColumn}>
                      <Text style={styles.step2Label}>{t('reservation.phoneNumber')}</Text>
                      <View style={styles.twoPartPhoneRow}>
                        {/* 1. Country Code Dropdown (First Box) */}
                        <TouchableOpacity
                          style={styles.countryCodeBox}
                          onPress={() => setIsCountryPickerOpen(true)}
                          activeOpacity={0.8}
                          accessibilityRole="button"
                          accessibilityLabel="Select Country Code"
                        >
                          <Text style={styles.countryCodeBoxText} numberOfLines={1}>
                            {selectedCountryCode}
                          </Text>
                          <ChevronDown size={14} color="#64748B" />
                        </TouchableOpacity>

                        {/* 2. Phone Number Input (Second Box) */}
                        <TextInput
                          style={[
                            styles.phoneNumberInput,
                            phoneError ? styles.inputErrorBorder : null,
                          ]}
                          value={phoneNumber}
                          onChangeText={handlePhoneNumberChange}
                          placeholder="9876543210"
                          placeholderTextColor="#475569"
                          keyboardType="number-pad"
                          maxLength={10}
                        />
                      </View>
                      {phoneError ? (
                        <Text style={styles.fieldErrorText}>{phoneError}</Text>
                      ) : null}
                    </View>

                    <View style={styles.emailFieldColumn}>
                      <Text style={styles.step2Label}>{t('reservation.emailAddress')}</Text>
                      <TextInput
                        style={styles.step2Input}
                        value={riderEmail}
                        onChangeText={setRiderEmail}
                        placeholder="rider@example.com"
                        placeholderTextColor="#475569"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  </View>

                  {/* Payment Methods */}
                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.step2Label}>{t('reservation.paymentMethod')}</Text>
                    <View style={styles.paymentMethodsRow}>
                      <TouchableOpacity
                        style={[
                          styles.paymentMethodCard,
                          paymentMethod === 'upi' && styles.paymentMethodCardActive,
                        ]}
                        onPress={() => setPaymentMethod('upi')}
                        activeOpacity={0.8}
                      >
                        <Smartphone size={18} color={paymentMethod === 'upi' ? '#00A3FF' : '#94A3B8'} />
                        <Text style={[styles.paymentMethodText, paymentMethod === 'upi' && styles.paymentMethodTextActive]}>
                          {t('reservation.payUpi')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.paymentMethodCard,
                          paymentMethod === 'card' && styles.paymentMethodCardActive,
                        ]}
                        onPress={() => setPaymentMethod('card')}
                        activeOpacity={0.8}
                      >
                        <CreditCard size={18} color={paymentMethod === 'card' ? '#00A3FF' : '#94A3B8'} />
                        <Text style={[styles.paymentMethodText, paymentMethod === 'card' && styles.paymentMethodTextActive]}>
                          {t('reservation.payCard')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.paymentMethodCard,
                          paymentMethod === 'pickup' && styles.paymentMethodCardActive,
                        ]}
                        onPress={() => setPaymentMethod('pickup')}
                        activeOpacity={0.8}
                      >
                        <ShieldCheck size={18} color={paymentMethod === 'pickup' ? '#00A3FF' : '#94A3B8'} />
                        <Text style={[styles.paymentMethodText, paymentMethod === 'pickup' && styles.paymentMethodTextActive]}>
                          {t('reservation.payPickup')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Step 2 Action Buttons */}
                  <View style={styles.step2Actions}>
                    <TouchableOpacity
                      style={styles.backBtn}
                      onPress={() => setStep(1)}
                      activeOpacity={0.8}
                    >
                      <ArrowLeft size={16} color="#94A3B8" />
                      <Text style={styles.backBtnText}>{t('reservation.back')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.confirmBtn, SHADOWS.glowCyan]}
                      onPress={handleProceedPayment}
                      disabled={isProcessing}
                      activeOpacity={0.85}
                    >
                      {isProcessing ? (
                        <ActivityIndicator size="small" color="#050B14" />
                      ) : (
                        <>
                          <Text style={styles.confirmBtnText}>
                            {t('reservation.confirmReserve')} (₹{totalPayable.toLocaleString()})
                          </Text>
                          <ArrowRight size={17} color="#050B14" strokeWidth={2.5} />
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            {/* RIGHT COLUMN: VEHICLE SUMMARY CARD */}
            <View style={[styles.rightColumn, isWide && { flex: 1, maxWidth: 440 }]}>
              <View style={[styles.card, styles.vehicleCard, SHADOWS.card]}>
                {/* Bike Image Container */}
                <View style={styles.bikeImageWrap}>
                  <Image
                    source={selectedBike.imageSource}
                    style={styles.bikeImage}
                    resizeMode="cover"
                  />
                </View>

                {/* Bike Name & Specs */}
                <Text style={styles.bikeName}>{selectedBike.name}</Text>
                <Text style={styles.bikeModel}>
                  {selectedBike.model} • {selectedBike.specs?.engine || '349.34 CC'}
                </Text>

                {/* Price Breakdown Line Items */}
                <View style={styles.priceBreakdownWrap}>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>{t('reservation.rentalFee')}</Text>
                    <Text style={styles.priceValue}>
                      ₹{selectedBike.pricePerDay.toLocaleString()} {t('bikeCard.perDay')}
                    </Text>
                  </View>

                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>{t('reservation.securityDeposit')}</Text>
                    <Text style={[styles.priceValue, styles.priceValueCyan]}>
                      ₹{securityDeposit.toLocaleString()}*
                    </Text>
                  </View>

                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>{t('reservation.estimatedDays')}</Text>
                    <Text style={styles.priceValue}>{rentalDays} {t('reservation.days')}</Text>
                  </View>

                  {step === 2 && (
                    <View style={[styles.priceRow, styles.totalRow]}>
                      <Text style={styles.totalLabel}>Total Payable</Text>
                      <Text style={styles.totalValue}>₹{totalPayable.toLocaleString()}</Text>
                    </View>
                  )}
                </View>

                {/* Change Selection Link */}
                <TouchableOpacity
                  style={styles.changeSelectionWrap}
                  onPress={() => navigation?.navigate('Motorbikes')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.changeSelectionText}>
                    {t('reservation.changeSelection')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* ================= STEP 3: CONFIRMATION SUCCESS ================= */}
        {step === 3 && (
          <View style={[styles.card, styles.successCard, SHADOWS.card]}>
            <View style={styles.successIconCircle}>
              <CheckCircle2 size={54} color="#10B981" />
            </View>

            <Text style={styles.successTitle}>Reservation Confirmed!</Text>
            <Text style={styles.successSubtitle}>
              Your booking reference is{' '}
              <Text style={{ fontWeight: '800', color: COLORS.accentCyan }}>
                #{bookingRefId}
              </Text>
            </Text>

            {/* Summary Box */}
            <View style={styles.successSummaryBox}>
              <View style={styles.successSummaryRow}>
                <Text style={styles.successSummaryLabel}>Motorcycle</Text>
                <Text style={styles.successSummaryValue}>{selectedBike.name}</Text>
              </View>
              {fullPhoneNumber ? (
                <View style={styles.successSummaryRow}>
                  <Text style={styles.successSummaryLabel}>Rider Contact</Text>
                  <Text style={styles.successSummaryValue}>{fullPhoneNumber}</Text>
                </View>
              ) : null}
              <View style={styles.successSummaryRow}>
                <Text style={styles.successSummaryLabel}>Pickup</Text>
                <Text style={styles.successSummaryValue}>{pickupDate} @ {pickupTime}</Text>
              </View>
              <View style={styles.successSummaryRow}>
                <Text style={styles.successSummaryLabel}>Return</Text>
                <Text style={styles.successSummaryValue}>{returnDate} @ {returnTime}</Text>
              </View>
              <View style={[styles.successSummaryRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.successSummaryLabel}>Total Amount</Text>
                <Text style={[styles.successSummaryValue, { color: '#00A3FF', fontWeight: '800' }]}>
                  ₹{totalPayable.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.successActions}>
              <TouchableOpacity
                style={styles.whatsAppConfirmBtn}
                onPress={() => onOpenWhatsApp && onOpenWhatsApp(selectedBike, { phone: fullPhoneNumber })}
                activeOpacity={0.85}
              >
                <MessageCircle size={18} color="#050B14" />
                <Text style={styles.whatsAppConfirmText}>
                  Confirm Directly on WhatsApp
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.voucherBtn}
                onPress={handleDownloadQuote}
                activeOpacity={0.85}
              >
                <Download size={16} color="#00A3FF" />
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
      </View>

      {/* ================= CALENDAR PICKER MODAL ================= */}
      <Modal
        visible={activeCalendarPicker !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveCalendarPicker(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setActiveCalendarPicker(null)}
        >
          <View style={[styles.modalContent, styles.calendarModalContent]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Calendar size={18} color="#00A3FF" />
                <Text style={styles.modalTitle}>
                  {activeCalendarPicker === 'pickup' ? 'Select Pickup Date' : 'Select Return Date'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setActiveCalendarPicker(null)}>
                <X size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Month & Year Navigation Row */}
            <View style={styles.calendarNavRow}>
              <TouchableOpacity
                style={styles.calendarNavBtn}
                onPress={handlePrevMonth}
                activeOpacity={0.7}
              >
                <ChevronLeft size={18} color="#38BDF8" />
              </TouchableOpacity>
              <Text style={styles.calendarNavMonthText}>
                {MONTH_NAMES[calendarMonth]} {calendarYear}
              </Text>
              <TouchableOpacity
                style={styles.calendarNavBtn}
                onPress={handleNextMonth}
                activeOpacity={0.7}
              >
                <ChevronRight size={18} color="#38BDF8" />
              </TouchableOpacity>
            </View>

            {/* Weekday Row */}
            <View style={styles.weekdayRow}>
              {WEEKDAYS.map((day) => (
                <Text key={day} style={styles.weekdayText}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Days Grid */}
            <View style={styles.daysGrid}>
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <View key={`blank-${idx}`} style={styles.dayCellEmpty} />;
                }
                const selected = isDaySelected(day);
                return (
                  <TouchableOpacity
                    key={`day-${day}`}
                    style={[styles.dayCell, selected && styles.dayCellSelected]}
                    onPress={() => handleSelectDay(day)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.dayCellText, selected && styles.dayCellTextSelected]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Calendar Footer */}
            <View style={styles.calendarFooterRow}>
              <TouchableOpacity
                style={styles.calendarCancelBtn}
                onPress={() => setActiveCalendarPicker(null)}
              >
                <Text style={styles.calendarCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.calendarTodayBtn}
                onPress={() => {
                  const today = new Date();
                  setCalendarMonth(today.getMonth());
                  setCalendarYear(today.getFullYear());
                  handleSelectDay(today.getDate());
                }}
              >
                <Text style={styles.calendarTodayText}>Select Today</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ================= TIME PICKER MODAL (Hours, Minutes, AM/PM) ================= */}
      <Modal
        visible={activeTimePicker !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveTimePicker(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setActiveTimePicker(null)}
        >
          <View style={[styles.modalContent, styles.timeModalContent]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Clock size={18} color="#00A3FF" />
                <Text style={styles.modalTitle}>
                  {activeTimePicker === 'pickup' ? 'Select Pickup Time' : 'Select Return Time'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setActiveTimePicker(null)}>
                <X size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Time Digital Preview Banner */}
            <View style={styles.timePreviewCard}>
              <Clock size={20} color="#00A3FF" />
              <Text style={styles.timePreviewDigits}>
                {selectedHour}:{selectedMinute}
              </Text>
              <View style={styles.timePreviewPeriodBadge}>
                <Text style={styles.timePreviewPeriodText}>{selectedPeriod}</Text>
              </View>
            </View>

            {/* Select Hour */}
            <Text style={styles.timeSectionLabel}>SELECT HOUR</Text>
            <View style={styles.hoursGrid}>
              {HOURS.map((hr) => {
                const active = hr === selectedHour;
                return (
                  <TouchableOpacity
                    key={hr}
                    style={[styles.timeChip, active && styles.timeChipActive]}
                    onPress={() => setSelectedHour(hr)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.timeChipText, active && styles.timeChipTextActive]}>
                      {hr}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Select Minute */}
            <Text style={styles.timeSectionLabel}>SELECT MINUTE</Text>
            <View style={styles.minutesGrid}>
              {MINUTES.map((min) => {
                const active = min === selectedMinute;
                return (
                  <TouchableOpacity
                    key={min}
                    style={[styles.timeChip, styles.minuteChip, active && styles.timeChipActive]}
                    onPress={() => setSelectedMinute(min)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.timeChipText, active && styles.timeChipTextActive]}>
                      :{min}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Period AM/PM */}
            <Text style={styles.timeSectionLabel}>PERIOD</Text>
            <View style={styles.periodToggleRow}>
              {['AM', 'PM'].map((p) => {
                const active = p === selectedPeriod;
                return (
                  <TouchableOpacity
                    key={p}
                    style={[styles.periodToggleBtn, active && styles.periodToggleBtnActive]}
                    onPress={() => setSelectedPeriod(p)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.periodToggleText, active && styles.periodToggleTextActive]}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Quick Hub Presets */}
            <View style={styles.quickTimePresetsRow}>
              <TouchableOpacity
                style={styles.quickPresetChip}
                onPress={() => {
                  setSelectedHour('09');
                  setSelectedMinute('00');
                  setSelectedPeriod('AM');
                }}
              >
                <Text style={styles.quickPresetChipText}>09:00 AM (Opens)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickPresetChip}
                onPress={() => {
                  setSelectedHour('12');
                  setSelectedMinute('00');
                  setSelectedPeriod('PM');
                }}
              >
                <Text style={styles.quickPresetChipText}>12:00 PM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickPresetChip}
                onPress={() => {
                  setSelectedHour('08');
                  setSelectedMinute('00');
                  setSelectedPeriod('PM');
                }}
              >
                <Text style={styles.quickPresetChipText}>08:00 PM (Closes)</Text>
              </TouchableOpacity>
            </View>

            {/* Confirm Time Button */}
            <TouchableOpacity
              style={styles.confirmTimeBtn}
              onPress={handleConfirmTime}
              activeOpacity={0.85}
            >
              <Check size={16} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.confirmTimeBtnText}>
                Confirm {selectedHour}:{selectedMinute} {selectedPeriod}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ================= COUNTRY CODE PICKER MODAL ================= */}
      <Modal
        visible={isCountryPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsCountryPickerOpen(false);
          setCountrySearch('');
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setIsCountryPickerOpen(false);
            setCountrySearch('');
          }}
        >
          <View style={[styles.modalContent, { width: 380, maxHeight: 460 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country Code</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsCountryPickerOpen(false);
                  setCountrySearch('');
                }}
              >
                <X size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Search Input Box */}
            <View style={styles.countrySearchWrap}>
              <TextInput
                style={styles.countrySearchInput}
                value={countrySearch}
                onChangeText={setCountrySearch}
                placeholder="Search country or code..."
                placeholderTextColor="#64748B"
                autoCapitalize="none"
              />
            </View>

            <ScrollView style={{ maxHeight: 290 }} keyboardShouldPersistTaps="handled">
              {filteredCountries.map((c) => {
                const isSelected = selectedCountryCode === c.dialCode;
                return (
                  <TouchableOpacity
                    key={`${c.code}-${c.dialCode}`}
                    style={[
                      styles.timeOptionItem,
                      isSelected && styles.timeOptionItemActive,
                    ]}
                    onPress={() => {
                      setSelectedCountryCode(c.dialCode);
                      setSelectedCountry(c);
                      if (phoneError) setPhoneError('');
                      setIsCountryPickerOpen(false);
                      setCountrySearch('');
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <Text style={{ fontSize: 16 }}>{c.flag}</Text>
                      <Text
                        style={[
                          styles.timeOptionText,
                          isSelected && styles.timeOptionTextActive,
                        ]}
                      >
                        {c.name} ({c.dialCode})
                      </Text>
                    </View>
                    {isSelected && <Check size={16} color="#00A3FF" />}
                  </TouchableOpacity>
                );
              })}
              {filteredCountries.length === 0 && (
                <View style={{ paddingVertical: 24, alignItems: 'center' }}>
                  <Text style={{ color: '#64748B', fontSize: 13 }}>No countries found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  /* Calendar Modal Styles */
  calendarModalContent: {
    maxWidth: 380,
    padding: 20,
    backgroundColor: '#0F172A',
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  calendarNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
    paddingHorizontal: 6,
  },
  calendarNavBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarNavMonthText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  weekdayText: {
    width: 40,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
    borderRadius: RADIUS.full,
  },
  dayCellEmpty: {
    width: '14.28%',
    height: 40,
  },
  dayCellSelected: {
    backgroundColor: '#00A3FF',
  },
  dayCellText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  dayCellTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  calendarFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 12,
  },
  calendarCancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  calendarCancelText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  calendarTodayBtn: {
    backgroundColor: 'rgba(0, 163, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.3)',
    borderRadius: RADIUS.full,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  calendarTodayText: {
    color: '#38BDF8',
    fontSize: 12.5,
    fontWeight: '700',
  },

  /* Time Picker Modal Styles */
  timeModalContent: {
    maxWidth: 400,
    padding: 22,
    backgroundColor: '#0F172A',
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  timePreviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    marginVertical: 14,
  },
  timePreviewDigits: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  timePreviewPeriodBadge: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  timePreviewPeriodText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  timeSectionLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 6,
  },
  hoursGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  timeChip: {
    flexBasis: '14.5%',
    flexGrow: 1,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeChipActive: {
    backgroundColor: '#00A3FF',
    borderColor: '#38BDF8',
  },
  timeChipText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
  },
  timeChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  minutesGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  minuteChip: {
    flex: 1,
    height: 40,
  },
  periodToggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  periodToggleBtn: {
    flex: 1,
    height: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodToggleBtnActive: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
  },
  periodToggleText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },
  periodToggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  quickTimePresetsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  quickPresetChip: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: RADIUS.sm,
    paddingVertical: 7,
    alignItems: 'center',
  },
  quickPresetChipText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  confirmTimeBtn: {
    height: 46,
    backgroundColor: '#0284C7',
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  confirmTimeBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  contentContainer: {
    paddingBottom: 80,
  },
  pageInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  /* Stepper */
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#00A3FF',
  },
  stepCircleInactive: {
    backgroundColor: '#1E293B',
  },
  stepCircleNumActive: {
    color: '#050B14',
    fontSize: 13,
    fontWeight: '800',
  },
  stepCircleNumInactive: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
  stepText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  stepTextActive: {
    color: '#FFFFFF',
  },
  stepTextInactive: {
    color: '#64748B',
  },
  stepDividerLine: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  stepDividerLineActive: {
    backgroundColor: '#00A3FF',
  },

  /* Two Column Layout */
  mainLayout: {
    width: '100%',
  },
  mainLayoutRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  mainLayoutCol: {
    flexDirection: 'column',
    gap: 20,
  },
  leftColumn: {
    width: '100%',
  },
  rightColumn: {
    width: '100%',
  },

  /* Base Card */
  card: {
    backgroundColor: '#0B1322',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 28,
  },
  cardHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  cardSubheading: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 28,
  },

  /* 2x2 Form Grid */
  formGrid: {
    gap: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  formFieldCol: {
    flex: 1,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  fieldLabelText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#8C9BB2',
    letterSpacing: 0.6,
  },
  inputBoxWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070D18',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 11,
  },
  textInputInside: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '500',
    padding: 0,
    marginRight: 8,
  },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#070D18',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
  },
  dropdownValueText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '500',
    flex: 1,
    marginRight: 6,
  },

  /* Security Deposit Box */
  depositNoticeBox: {
    backgroundColor: 'rgba(0, 163, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.2)',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 24,
    marginBottom: 26,
  },
  depositNoticeText: {
    color: '#8C9BB2',
    fontSize: 13.5,
    lineHeight: 19,
    flex: 1,
  },
  depositBoldText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* Primary Button */
  continueBtn: {
    backgroundColor: '#00A3FF',
    borderRadius: RADIUS.full,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueBtnText: {
    color: '#050B14',
    fontSize: 15.5,
    fontWeight: '700',
  },

  /* Right Column: Vehicle Card */
  vehicleCard: {
    padding: 20,
  },
  bikeImageWrap: {
    height: 220,
    backgroundColor: '#070C16',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 18,
  },
  bikeImage: {
    width: '100%',
    height: '100%',
  },
  bikeName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  bikeModel: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 22,
  },
  priceBreakdownWrap: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 16,
    gap: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    color: '#94A3B8',
    fontSize: 14,
  },
  priceValue: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
  },
  priceValueCyan: {
    color: '#00A3FF',
  },
  totalRow: {
    marginTop: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  totalValue: {
    color: '#00A3FF',
    fontSize: 18,
    fontWeight: '800',
  },
  changeSelectionWrap: {
    marginTop: 22,
    alignSelf: 'flex-end',
  },
  changeSelectionText: {
    color: '#00A3FF',
    fontSize: 13,
    fontWeight: '600',
  },

  /* Step 2 Inputs */
  step2InputGroup: {
    marginBottom: 16,
  },
  step2Row: {
    flexDirection: 'row',
    gap: 14,
  },
  step2RowCol: {
    flexDirection: 'column',
    gap: 14,
  },
  phoneFieldColumn: {
    flex: 1.1,
  },
  emailFieldColumn: {
    flex: 1,
  },
  twoPartPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryCodeBox: {
    width: 92,
    height: 48,
    backgroundColor: '#070D18',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  countryCodeBoxText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  phoneNumberInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#070D18',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  inputErrorBorder: {
    borderColor: '#EF4444',
  },
  fieldErrorText: {
    color: '#EF4444',
    fontSize: 11.5,
    marginTop: 5,
    fontWeight: '500',
  },
  countrySearchWrap: {
    backgroundColor: '#070D18',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    marginBottom: 12,
  },
  countrySearchInput: {
    color: '#FFFFFF',
    fontSize: 13.5,
    padding: 0,
  },
  step2Label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8C9BB2',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  step2Input: {
    height: 48,
    backgroundColor: '#070D18',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  paymentMethodCard: {
    flex: 1,
    backgroundColor: '#070D18',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },
  paymentMethodCardActive: {
    borderColor: '#00A3FF',
    backgroundColor: 'rgba(0, 163, 255, 0.08)',
  },
  paymentMethodText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  paymentMethodTextActive: {
    color: '#00A3FF',
  },
  step2Actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 28,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#070D18',
  },
  backBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#00A3FF',
    borderRadius: RADIUS.full,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmBtnText: {
    color: '#050B14',
    fontSize: 15,
    fontWeight: '700',
  },

  /* Step 3 Success Card */
  successCard: {
    maxWidth: 580,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 28,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 24,
  },
  successSummaryBox: {
    width: '100%',
    backgroundColor: '#070D18',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 16,
    marginBottom: 24,
    gap: 10,
  },
  successSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  successSummaryLabel: {
    color: '#94A3B8',
    fontSize: 13.5,
  },
  successSummaryValue: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '600',
  },
  successActions: {
    width: '100%',
    gap: 12,
  },
  whatsAppConfirmBtn: {
    backgroundColor: '#25D366',
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  whatsAppConfirmText: {
    color: '#050B14',
    fontSize: 14.5,
    fontWeight: '700',
  },
  voucherBtn: {
    backgroundColor: '#070D18',
    borderWidth: 1,
    borderColor: '#00A3FF',
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  voucherBtnText: {
    color: '#00A3FF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  homeBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  homeBtnText: {
    color: '#64748B',
    fontSize: 13,
  },

  /* Time Picker Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 11, 20, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#0B1322',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 18,
    width: 360,
    maxWidth: '100%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  timeOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  timeOptionItemActive: {
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
  },
  timeOptionText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  timeOptionTextActive: {
    color: '#00A3FF',
    fontWeight: '700',
  },
});
