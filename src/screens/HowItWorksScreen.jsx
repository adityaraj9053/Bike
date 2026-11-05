import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
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
  const { width } = useWindowDimensions();
  const isWide = width >= 860;
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

  const guidelines = [
    {
      icon: FileText,
      title: t('howItWorks.docsTitle'),
      lines: [
        t('howItWorks.docsLine1'),
        t('howItWorks.docsLine2'),
        t('howItWorks.docsLine3'),
      ],
    },
    {
      icon: ShieldCheck,
      title: t('howItWorks.depositTitle'),
      lines: [
        t('howItWorks.depositLine1'),
        t('howItWorks.depositLine2'),
      ],
    },
    {
      icon: Fuel,
      title: t('howItWorks.fuelTitle'),
      lines: [
        t('howItWorks.fuelLine1'),
        t('howItWorks.fuelLine2'),
      ],
    },
    {
      icon: Clock,
      title: t('howItWorks.gearSupportTitle'),
      lines: [
        t('howItWorks.gearSupportLine1'),
        t('howItWorks.gearSupportLine2'),
      ],
    },
  ];

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
          <Text style={styles.pretitle}>{t('howItWorks.pretitle')}</Text>
          <Text style={styles.title}>
            {t('howItWorks.title1')}{'\n'}
            <Text style={{ color: COLORS.accentCyan }}>{t('howItWorks.title2')}</Text>
          </Text>
          <Text style={styles.subtitle}>
            {t('howItWorks.subtitle')}
          </Text>
        </View>

        {/* 4 Steps Horizontal Cards */}
        <View style={styles.stepsGrid}>
          {steps.map((s, i) => (
            <View key={i} style={[styles.stepCard, SHADOWS.card]}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumCircle}>
                  <Text style={styles.stepNumText}>{s.num}</Text>
                </View>
                <Text style={styles.stepTitle}>{s.title}</Text>
              </View>
              <Text style={styles.stepDesc}>{s.desc}</Text>
            </View>
          ))}
        </View>

        {/* Guidelines Section (Horizontal, Non-Scrollable) */}
        <View style={styles.guidelinesSection}>
          <Text style={styles.sectionTitle}>{t('howItWorks.guidelinesTitle')}</Text>
          <Text style={styles.sectionSubtitle}>
            {t('howItWorks.guidelinesSubtitle')}
          </Text>

          <View style={styles.guidelinesGrid}>
            {guidelines.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <View
                  key={idx}
                  style={[
                    styles.guidelineCard,
                    isWide && styles.guidelineCardWide,
                    SHADOWS.card,
                  ]}
                >
                  <View style={styles.guidelineIconBadge}>
                    <IconComp size={20} color={COLORS.accentCyan} strokeWidth={2} />
                  </View>
                  <Text style={styles.guidelineHeading}>{item.title}</Text>
                  <Text style={styles.guidelineBody}>
                    {item.lines.join('\n')}
                  </Text>
                </View>
              );
            })}
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
    paddingBottom: 48,
  },
  contentContainerWide: {
    paddingHorizontal: 32,
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

  /* Steps Grid */
  stepsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 36,
  },
  stepCard: {
    flex: 1,
    minWidth: 260,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.lg,
    padding: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  stepNumCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    color: COLORS.accentCyan,
    fontSize: 13,
    fontWeight: '900',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    flex: 1,
  },
  stepDesc: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  /* Guidelines Section: Horizontal, Non-Scrollable */
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  guidelineCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.lg,
    padding: 18,
  },
  guidelineCardWide: {
    minWidth: 220,
  },
  guidelineIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 163, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  guidelineHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  guidelineBody: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  /* FAQs */
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

  /* Explore Fleet Button */
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
