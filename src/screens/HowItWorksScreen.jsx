import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  FileText,
  ShieldCheck,
  Clock,
  Fuel,
  Plus,
  Minus,
  Bike,
  ArrowRight,
} from 'lucide-react-native';
import { FAQS_DATA } from '../data/bikes';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';

export default function HowItWorksScreen({ navigation }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const steps = [
    {
      num: '01',
      title: 'Explore Our Fleet',
      desc: 'Browse our diverse lineup of scooters, daily commuters, highway cruisers, and track-ready superbikes.',
    },
    {
      num: '02',
      title: 'Select Your Machine',
      desc: 'Review detailed factory specifications, real photographs, verified rider reviews, and transparent daily rates.',
    },
    {
      num: '03',
      title: 'Choose Dates & Enquire',
      desc: 'Enquire directly via WhatsApp or book online. Select your preferred pickup dates, time, and hub location.',
    },
    {
      num: '04',
      title: 'Confirm & Ride',
      desc: 'Present your driving licence and ID at our pickup hub, perform a 2-minute vehicle inspection, and hit the open road!',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pretitle}>HOW IT WORKS</Text>
        <Text style={styles.title}>
          Getting Your Ride Is{'\n'}
          <Text style={{ color: COLORS.accentCyan }}>Easier Than You Think.</Text>
        </Text>
        <Text style={styles.subtitle}>
          Follow four simple steps to find, book, and ride your preferred motorcycle with zero friction.
        </Text>
      </View>

      {/* 4 Steps Vertical Cards */}
      <View style={styles.stepsList}>
        {steps.map((s, idx) => (
          <View key={idx} style={[styles.stepCard, SHADOWS.card]}>
            <View style={styles.stepNumBadge}>
              <Text style={styles.stepNumText}>{s.num}</Text>
            </View>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <Text style={styles.stepDesc}>{s.desc}</Text>
          </View>
        ))}
      </View>

      {/* Guidelines Section */}
      <View style={styles.guidelinesSection}>
        <Text style={styles.sectionTitle}>Rental Guidelines & Details</Text>
        <Text style={styles.sectionSubtitle}>
          Everything you need to know for a compliant and seamless ride.
        </Text>

        <View style={styles.guidelinesGrid}>
          <View style={styles.guidelineCard}>
            <View style={styles.guidelineIcon}>
              <FileText size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.guidelineHeading}>Mandatory Documents</Text>
            <Text style={styles.guidelineBody}>
              • Valid original Driving Licence (Two-Wheeler / A-Category).{'\n'}
              • Government Photo ID (Aadhaar, Passport, or Voter ID).{'\n'}
              • 2 Passport-size photographs or instant biometric selfie.
            </Text>
          </View>

          <View style={styles.guidelineCard}>
            <View style={styles.guidelineIcon}>
              <ShieldCheck size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.guidelineHeading}>Security Deposit</Text>
            <Text style={styles.guidelineBody}>
              • Refundable deposit of ₹1,500 to ₹5,000 depending on vehicle class.{'\n'}
              • 100% refunded within 24-48 hours after vehicle return inspection.
            </Text>
          </View>

          <View style={styles.guidelineCard}>
            <View style={styles.guidelineIcon}>
              <Fuel size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.guidelineHeading}>Fuel & Mileage Policy</Text>
            <Text style={styles.guidelineBody}>
              • Same-to-same fuel policy. Match the gauge level at drop-off.{'\n'}
              • Unlimited city kilometers. Interstate touring requires intimation.
            </Text>
          </View>

          <View style={styles.guidelineCard}>
            <View style={styles.guidelineIcon}>
              <Clock size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.guidelineHeading}>Complimentary Gear & Support</Text>
            <Text style={styles.guidelineBody}>
              • 1 Sanitized ISI/DOT approved helmet included complimentary.{'\n'}
              • 24/7 Roadside breakdown and towing assistance on call.
            </Text>
          </View>
        </View>
      </View>

      {/* FAQs */}
      <View style={styles.faqsSection}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqList}>
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.faqCard, isOpen && styles.faqCardOpen]}
                onPress={() => toggleFaq(index)}
                activeOpacity={0.8}
              >
                <View style={styles.faqHeader}>
                  <Text style={[styles.faqQuestion, isOpen && styles.faqQuestionActive]}>
                    {faq.question}
                  </Text>
                  {isOpen ? (
                    <Minus size={18} color={COLORS.accentCyan} />
                  ) : (
                    <Plus size={18} color={COLORS.textSecondary} />
                  )}
                </View>

                {isOpen && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Browse Fleet Button */}
      <TouchableOpacity
        style={styles.exploreFleetBtn}
        onPress={() => navigation.navigate('Motorbikes')}
        activeOpacity={0.8}
      >
        <Text style={styles.exploreFleetBtnText}>Explore Available Bikes</Text>
        <ArrowRight size={16} color="#050B14" strokeWidth={2.5} />
      </TouchableOpacity>
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
    marginBottom: 24,
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
  stepsList: {
    gap: 14,
    marginBottom: 36,
  },
  stepCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    padding: 20,
  },
  stepNumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    marginBottom: 10,
  },
  stepNumText: {
    color: COLORS.accentCyan,
    fontSize: 14,
    fontWeight: '900',
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  stepDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  guidelinesSection: {
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 18,
  },
  guidelinesGrid: {
    gap: 12,
  },
  guidelineCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.md,
    padding: 16,
  },
  guidelineIcon: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  guidelineHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  guidelineBody: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  faqsSection: {
    marginBottom: 30,
  },
  faqList: {
    gap: 10,
    marginTop: 14,
  },
  faqCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    padding: 16,
  },
  faqCardOpen: {
    borderColor: COLORS.accentCyan,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 10,
  },
  faqQuestionActive: {
    color: COLORS.accentCyan,
  },
  faqAnswer: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 10,
  },
  exploreFleetBtn: {
    backgroundColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  exploreFleetBtnText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
});
