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
import { useTranslation } from 'react-i18next';

export default function HowItWorksScreen({ navigation }) {
  const { t } = useTranslation();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const steps = [
    {
      num: '01',
      title: t('howItWorks.step1Title'),
      desc: t('howItWorks.step1Desc'),
    },
    {
      num: '02',
      title: t('howItWorks.step2Title'),
      desc: t('howItWorks.step2Desc'),
    },
    {
      num: '03',
      title: t('howItWorks.step3Title'),
      desc: t('howItWorks.step3Desc'),
    },
    {
      num: '04',
      title: t('howItWorks.step4Title'),
      desc: t('howItWorks.step4Desc'),
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
        <Text style={styles.pretitle}>{t('howItWorks.pretitle')}</Text>
        <Text style={styles.title}>
          {t('howItWorks.title1')}{'\n'}
          <Text style={{ color: COLORS.accentCyan }}>{t('howItWorks.title2')}</Text>
        </Text>
        <Text style={styles.subtitle}>
          {t('howItWorks.subtitle')}
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
        <Text style={styles.sectionTitle}>{t('howItWorks.guidelinesTitle')}</Text>
        <Text style={styles.sectionSubtitle}>
          {t('howItWorks.guidelinesSubtitle')}
        </Text>

        <View style={styles.guidelinesGrid}>
          <View style={styles.guidelineCard}>
            <View style={styles.guidelineIcon}>
              <FileText size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.guidelineHeading}>{t('howItWorks.docsTitle')}</Text>
            <Text style={styles.guidelineBody}>
              {t('howItWorks.docsLine1')}{'\n'}
              {t('howItWorks.docsLine2')}{'\n'}
              {t('howItWorks.docsLine3')}
            </Text>
          </View>

          <View style={styles.guidelineCard}>
            <View style={styles.guidelineIcon}>
              <ShieldCheck size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.guidelineHeading}>{t('howItWorks.depositTitle')}</Text>
            <Text style={styles.guidelineBody}>
              {t('howItWorks.depositLine1')}{'\n'}
              {t('howItWorks.depositLine2')}
            </Text>
          </View>

          <View style={styles.guidelineCard}>
            <View style={styles.guidelineIcon}>
              <Fuel size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.guidelineHeading}>{t('howItWorks.fuelTitle')}</Text>
            <Text style={styles.guidelineBody}>
              {t('howItWorks.fuelLine1')}{'\n'}
              {t('howItWorks.fuelLine2')}
            </Text>
          </View>

          <View style={styles.guidelineCard}>
            <View style={styles.guidelineIcon}>
              <Clock size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.guidelineHeading}>{t('howItWorks.gearSupportTitle')}</Text>
            <Text style={styles.guidelineBody}>
              {t('howItWorks.gearSupportLine1')}{'\n'}
              {t('howItWorks.gearSupportLine2')}
            </Text>
          </View>
        </View>
      </View>

      {/* FAQs */}
      <View style={styles.faqsSection}>
        <Text style={styles.sectionTitle}>{t('frequentlyAsked')}</Text>
        <View style={styles.faqList}>
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            const qKey = `faqs.q${index + 1}`;
            const aKey = `faqs.a${index + 1}`;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.faqCard, isOpen && styles.faqCardOpen]}
                onPress={() => toggleFaq(index)}
                activeOpacity={0.8}
              >
                <View style={styles.faqHeader}>
                  <Text style={[styles.faqQuestion, isOpen && styles.faqQuestionActive]}>
                    {t(qKey) !== qKey ? t(qKey) : faq.question}
                  </Text>
                  {isOpen ? (
                    <Minus size={18} color={COLORS.accentCyan} />
                  ) : (
                    <Plus size={18} color={COLORS.textSecondary} />
                  )}
                </View>

                {isOpen && (
                  <Text style={styles.faqAnswer}>{t(aKey) !== aKey ? t(aKey) : faq.answer}</Text>
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
        <Text style={styles.exploreFleetBtnText}>{t('howItWorks.exploreAvailableBikes')}</Text>
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
