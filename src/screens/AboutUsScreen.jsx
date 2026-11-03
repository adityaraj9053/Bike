import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Award,
  Heart,
  Wrench,
  ShieldCheck,
  Bike,
  ArrowRight,
  Compass,
} from 'lucide-react-native';
import { IMAGES } from '../assets/images';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export default function AboutUsScreen({ navigation }) {
  const { t } = useTranslation();

  const values = [
    {
      title: t('aboutUs.affordability'),
      desc: t('aboutUs.affordabilityDesc'),
      icon: Award,
    },
    {
      title: t('aboutUs.satisfactionTitle'),
      desc: t('aboutUs.satisfactionDesc'),
      icon: Heart,
    },
    {
      title: t('aboutUs.precisionTitle'),
      desc: t('aboutUs.precisionDesc'),
      icon: Wrench,
    },
    {
      title: t('aboutUs.safetyTitle'),
      desc: t('aboutUs.safetyDesc'),
      icon: ShieldCheck,
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
        <Text style={styles.pretitle}>{t('aboutUs.pretitle')}</Text>
        <Text style={styles.title}>
          {t('aboutUs.title1')}{'\n'}
          <Text style={{ color: COLORS.accentCyan }}>{t('aboutUs.title2')}</Text>
        </Text>
        <Text style={styles.subtitle}>
          {t('aboutUs.subtitle')}
        </Text>
      </View>

      {/* 4 Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>500+</Text>
          <Text style={styles.statLabel}>{t('aboutUs.activeRiders')}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>98%</Text>
          <Text style={styles.statLabel}>{t('aboutUs.satisfaction')}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>50+</Text>
          <Text style={styles.statLabel}>{t('aboutUs.motorbikes')}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>24/7</Text>
          <Text style={styles.statLabel}>{t('aboutUs.support')}</Text>
        </View>
      </View>

      {/* Workshop Story Card */}
      <View style={[styles.storyCard, SHADOWS.card]}>
        <Image
          source={IMAGES['workshop']}
          style={styles.storyImg}
          resizeMode="cover"
        />
        <View style={styles.storyContent}>
          <Text style={styles.storyPretitle}>{t('aboutUs.hubPretitle')}</Text>
          <Text style={styles.storyTitle}>{t('aboutUs.hubTitle')}</Text>
          <Text style={styles.storyText}>
            {t('aboutUs.hubDesc')}
          </Text>
        </View>
      </View>

      {/* Core Values */}
      <View style={styles.valuesSection}>
        <Text style={styles.sectionTitle}>{t('aboutUs.whatDrivesUs')}</Text>
        <Text style={styles.sectionSubtitle}>
          {t('aboutUs.valuesSubtitle')}
        </Text>

        <View style={styles.valuesList}>
          {values.map((v, idx) => {
            const IconComponent = v.icon;
            return (
              <View key={idx} style={[styles.valueCard, SHADOWS.card]}>
                <View style={styles.valueIconCircle}>
                  <IconComponent size={22} color={COLORS.accentCyan} />
                </View>
                <Text style={styles.valueTitle}>{v.title}</Text>
                <Text style={styles.valueDesc}>{v.desc}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Browse Fleet CTA */}
      <TouchableOpacity
        style={styles.ctaBtn}
        onPress={() => navigation.navigate('Motorbikes')}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaBtnText}>{t('aboutUs.browseFleet')}</Text>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 28,
  },
  statBox: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statNum: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.accentCyan,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  storyCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    overflow: 'hidden',
    marginBottom: 32,
  },
  storyImg: {
    width: '100%',
    height: 180,
  },
  storyContent: {
    padding: 18,
  },
  storyPretitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accentCyan,
    letterSpacing: 1,
    marginBottom: 4,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  storyText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  valuesSection: {
    marginBottom: 28,
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
    marginBottom: 16,
  },
  valuesList: {
    gap: 12,
  },
  valueCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.md,
    padding: 16,
  },
  valueIconCircle: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  valueDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  ctaBtn: {
    backgroundColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaBtnText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
});
