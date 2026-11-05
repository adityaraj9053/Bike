import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  Award,
  Heart,
  Wrench,
  ShieldCheck,
  Bike,
  ArrowRight,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IMAGES } from '../assets/images';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export default function AboutUsScreen({ navigation }) {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const stats = [
    { value: '50+', label: t('aboutUs.premiumFleet', 'PREMIUM FLEET') },
    { value: '10K+', label: t('aboutUs.happyRiders', 'HAPPY RIDERS') },
    { value: '4.9★', label: t('aboutUs.googleRating', 'GOOGLE RATING') },
    { value: '24/7', label: t('aboutUs.onRoadSupport', 'ON-ROAD SUPPORT') },
  ];

  const values = [
    {
      title: t('aboutUs.affordability', 'Affordability'),
      desc: t(
        'aboutUs.affordabilityDesc',
        'Premium motorcycles and scooters at competitive, transparent day rates with zero hidden charges.'
      ),
      icon: Award,
    },
    {
      title: t('aboutUs.satisfactionTitle', 'Unmatched Satisfaction'),
      desc: t(
        'aboutUs.satisfactionDesc',
        'Dedicated concierge team focused on making your road adventure effortless and memorable.'
      ),
      icon: Heart,
    },
    {
      title: t('aboutUs.precisionTitle', 'Mechanical Precision'),
      desc: t(
        'aboutUs.precisionDesc',
        'In-house certified mechanics performing rigorous 24-point inspections on every vehicle before departure.'
      ),
      icon: Wrench,
    },
    {
      title: t('aboutUs.safetyTitle', 'Rider Safety First'),
      desc: t(
        'aboutUs.safetyDesc',
        'Complimentary certified helmets, comprehensive insurance coverage, and 24/7 roadside assistance.'
      ),
      icon: ShieldCheck,
    },
  ];

  const cardWidth = Math.max(240, Math.min(width * 0.72, 280));

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
            {t('aboutUs.pretitle', 'ABOUT THE ROAD EAGLE')}
          </Text>
          <Text style={styles.title}>
            {t('aboutUs.title', 'Redefining Two-Wheeled Freedom')}
          </Text>
          <Text style={styles.subtitle}>
            {t(
              'aboutUs.subtitle',
              "Born out of a genuine obsession with motorcycling and exploration. We are building India's most dependable, rider-centric motorcycle rental fleet."
            )}
          </Text>
        </View>

        {/* 4 Stats Bar */}
        <View style={[styles.statsStrip, SHADOWS.card]}>
          {stats.map((s, idx) => (
            <View key={idx} style={styles.statBox}>
              <Text style={styles.statNum}>{s.value}</Text>
              <Text style={styles.statLabel} numberOfLines={2}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Foundation Story Card */}
        <View style={[styles.foundationCard, SHADOWS.card]}>
          <Image
            source={IMAGES['workshop']}
            style={[styles.foundationImg, isWide && { height: 320 }]}
            resizeMode="cover"
          />
          <View style={[styles.foundationContent, isWide && { padding: 28 }]}>
            <Text style={styles.foundationPretitle}>
              {t('aboutUs.foundationPretitle', 'OUR FOUNDATION')}
            </Text>
            <Text style={styles.foundationTitle}>
              {t('aboutUs.foundationTitle', 'No Shortcuts. No Surprises.')}
            </Text>
            <Text style={styles.foundationText}>
              {t(
                'aboutUs.foundationDesc1',
                'Too many bike rentals in India deliver poorly maintained, noisy machines with uncommunicated charges and withheld security deposits. The Road Eagle was founded to change this completely.'
              )}
            </Text>
            <Text style={[styles.foundationText, { marginBottom: 0 }]}>
              {t(
                'aboutUs.foundationDesc2',
                'Every cruiser, commuter, and superbike in our garage is company-owned, rigorously inspected by certified mechanics, and cleaned prior to handover. We believe renting a machine should feel as trustworthy and exciting as taking delivery of your own showroom bike.'
              )}
            </Text>
          </View>
        </View>

        {/* What Sets Us Apart - Horizontal Cards */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>
            {t('aboutUs.whatSetsUsApart', 'What Sets Us Apart')}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {t(
              'aboutUs.whatSetsUsApartSubtitle',
              'Our core operating principles built around trust, transparency, and mechanical excellence.'
            )}
          </Text>

          {isWide ? (
            /* Wide screen: 4 horizontal columns */
            <View style={styles.featuresRow}>
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <View key={idx} style={[styles.featureCardWide, SHADOWS.card]}>
                    <View style={styles.featureIconBadge}>
                      <IconComponent size={20} color={COLORS.accentCyan} strokeWidth={2} />
                    </View>
                    <Text style={styles.featureTitle}>{v.title}</Text>
                    <Text style={styles.featureDesc}>{v.desc}</Text>
                  </View>
                );
              })}
            </View>
          ) : (
            /* Mobile screen: Horizontal scrollable cards */
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.featuresScrollView}
              contentContainerStyle={styles.featuresScrollContent}
            >
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <View
                    key={idx}
                    style={[
                      styles.featureCardMobile,
                      { width: cardWidth },
                      SHADOWS.card,
                    ]}
                  >
                    <View style={styles.featureIconBadge}>
                      <IconComponent size={20} color={COLORS.accentCyan} strokeWidth={2} />
                    </View>
                    <Text style={styles.featureTitle}>{v.title}</Text>
                    <Text style={styles.featureDesc}>{v.desc}</Text>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* Centered Browse Fleet CTA */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            onPress={() => navigation && navigation.navigate && navigation.navigate('Motorbikes')}
            activeOpacity={0.85}
            style={styles.ctaTouchable}
          >
            <LinearGradient
              colors={['#0284C7', '#00A3FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaBtn}
            >
              <Bike size={18} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.ctaBtnText}>
                {t('aboutUs.browseFleet', 'Browse Available Fleet')}
              </Text>
              <ArrowRight size={16} color="#FFFFFF" strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>
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
    paddingBottom: 48,
  },
  contentContainerWide: {
    paddingHorizontal: 32,
    paddingVertical: 40,
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
    marginBottom: 20,
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
    fontSize: 27,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
    lineHeight: 33,
  },
  subtitle: {
    fontSize: 13.5,
    color: '#94A3B8',
    lineHeight: 20,
  },
  statsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginBottom: 28,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statNum: {
    fontSize: 19,
    fontWeight: '900',
    color: '#00A3FF',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 8.5,
    color: '#94A3B8',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  foundationCard: {
    backgroundColor: '#0B1220',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: '#1E293B',
    overflow: 'hidden',
    marginBottom: 32,
  },
  foundationImg: {
    width: '100%',
    height: 190,
  },
  foundationContent: {
    padding: 18,
  },
  foundationPretitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#00A3FF',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  foundationTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  foundationText: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 19.5,
    marginBottom: 12,
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 18,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 16,
  },
  featureCardWide: {
    flex: 1,
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.lg,
    padding: 20,
    minHeight: 180,
  },
  featuresScrollView: {
    marginHorizontal: -20,
  },
  featuresScrollContent: {
    paddingHorizontal: 20,
    gap: 14,
  },
  featureCardMobile: {
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.lg,
    padding: 18,
    minHeight: 180,
  },
  featureIconBadge: {
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
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 18,
  },
  ctaContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  ctaTouchable: {
    borderRadius: RADIUS.full,
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaBtn: {
    paddingVertical: 13,
    paddingHorizontal: 26,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
