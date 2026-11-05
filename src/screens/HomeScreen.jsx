import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Bike,
  Tag,
  Headphones,
  CalendarCheck,
  ArrowRight,
  MessageCircle,
  Star,
  ShieldCheck,
  Plus,
  Minus,
  Award,
  ChevronLeft,
  ChevronRight,
  Compass,
} from 'lucide-react-native';
import { BIKES_DATA, CATEGORIES_DATA, FAQS_DATA, TESTIMONIALS_DATA } from '../data/bikes';
import { IMAGES } from '../assets/images';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
import BikeCard from '../components/BikeCard';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

export default function HomeScreen({
  navigation,
  onSelectBike,
  onStartBooking,
  onOpenWhatsApp,
  onOpenBookModal,
}) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const carouselScrollRef = useRef(null);
  const [carouselOffset, setCarouselOffset] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleScrollCarousel = (direction) => {
    const cardStep = 306; // 290 card width + 16 gap
    const nextX = direction === 'left'
      ? Math.max(0, carouselOffset - cardStep)
      : carouselOffset + cardStep;
    carouselScrollRef.current?.scrollTo({ x: nextX, animated: true });
    setCarouselOffset(nextX);
  };

  const filteredBikes = BIKES_DATA.filter((b) => {
    if (selectedCategory === 'all') return true;
    return b.categoryKey === selectedCategory;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* ================= HERO SECTION (Centered & Contained) ================= */}
      <View style={styles.heroSection}>
        <Image
          source={IMAGES['hero-bike']}
          style={styles.heroBgImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.heroContainer}>
          <View style={styles.heroTagBadge}>
            <Compass size={13} color="#38BDF8" style={{ marginRight: 6 }} />
            <Text style={styles.heroTagText}>{t('heroTag', 'THEROADEAGLE.COM')}</Text>
          </View>

          <Text style={styles.heroTitle}>
            {t('heroTitle1', 'Your Ride, Your Route,')}{'\n'}
            <Text style={styles.heroTitleCyan}>{t('heroTitle2', 'Your Freedom.')}</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            {t(
              'heroSubtitle',
              'Discover the city on two wheels. Find the perfect machine for your journey, from agile urban scooters to highway cruisers and superbikes.'
            )}
          </Text>

          <View style={styles.heroButtons}>
            {/* Explore Bikes button - navigates directly to Motorbikes fleet screen */}
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => {
                navigation.navigate('Motorbikes');
              }}
              activeOpacity={0.8}
            >
              <Bike size={17} color="#FFFFFF" />
              <Text style={styles.btnPrimaryText}>{t('exploreBikes', 'Explore Bikes')}</Text>
            </TouchableOpacity>

            {/* WhatsApp Enquiry button - luxury styling */}
            <TouchableOpacity
              style={styles.btnWhatsAppDark}
              onPress={onOpenWhatsApp}
              activeOpacity={0.8}
            >
              <MessageCircle size={17} color="#10B981" />
              <Text style={styles.btnWhatsAppDarkText}>
                {t('whatsappEnquiry', 'WhatsApp Enquiry')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ================= FEATURE STRIP (Centered on all screen sizes) ================= */}
      <View style={styles.featureStrip}>
        <View style={styles.centerContainer}>
          <View style={styles.featureStripCenteredWrap}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Bike size={16} color={COLORS.accentCyan} />
              </View>
              <Text style={styles.featureTitle}>
                {t('multipleBikeOptions', 'Multiple Bike Options')}
              </Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Tag size={16} color={COLORS.accentCyan} />
              </View>
              <Text style={styles.featureTitle}>
                {t('transparentPricing', 'Transparent Pricing')}
              </Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Headphones size={16} color={COLORS.accentCyan} />
              </View>
              <Text style={styles.featureTitle}>
                {t('customerAssistance', 'Customer Assistance')}
              </Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <CalendarCheck size={16} color={COLORS.accentCyan} />
              </View>
              <Text style={styles.featureTitle}>
                {t('easyEnquiries', 'Easy Enquiries')}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ================= PHILOSOPHY STATEMENT ================= */}
      <View style={styles.philosophySection}>
        <View style={styles.centerContainer}>
          <Text style={styles.philosophyQuote}>
            {t(
              'philosophyQuote',
              '"Renting a motorcycle shouldn\'t feel like a leap of faith. We exist to provide transparent pricing, factory-maintained machines, and complete peace of mind."'
            )}
          </Text>
          <Text style={styles.philosophyAuthor}>
            {t('philosophyAuthor', '— The Road Eagle Guarantee')}
          </Text>
        </View>
      </View>

      {/* ================= CURATED FLEET SECTION ================= */}
      <View style={styles.fleetSection}>
        <View style={styles.centerContainer}>
          <View style={styles.fleetHeaderRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.sectionPretitle}>
                {t('curatedLineup', 'CURATED LINEUP')}
              </Text>
              <Text style={styles.sectionTitle}>
                {t('featuredMotorbikes', 'Featured Motorbikes')}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {t(
                  'featuredSubtitle',
                  'Hand-picked machines ready for immediate adventure and daily convenience.'
                )}
              </Text>
            </View>

            {/* Carousel Navigation Arrows */}
            <View style={styles.carouselArrows}>
              <TouchableOpacity
                style={styles.carouselArrowBtn}
                onPress={() => handleScrollCarousel('left')}
                activeOpacity={0.7}
                accessibilityLabel="Previous bikes"
              >
                <ChevronLeft size={18} color={COLORS.accentCyan} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.carouselArrowBtn}
                onPress={() => handleScrollCarousel('right')}
                activeOpacity={0.7}
                accessibilityLabel="Next bikes"
              >
                <ChevronRight size={18} color={COLORS.accentCyan} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Category Filter Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryPillsScroll}
          >
            {CATEGORIES_DATA.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const key = cat.id === 'scooters' ? 'scooter' : cat.id;
              const label = t(`categories.${key}`, cat.label);
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                  onPress={() => {
                    setSelectedCategory(cat.id);
                    carouselScrollRef.current?.scrollTo({ x: 0, animated: true });
                    setCarouselOffset(0);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryPillText, isActive && styles.categoryPillTextActive]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Horizontal Carousel of Bike Cards */}
          <View style={styles.carouselWrapper}>
            <ScrollView
              ref={carouselScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContent}
              onScroll={(e) => setCarouselOffset(e.nativeEvent.contentOffset.x)}
              scrollEventThrottle={16}
            >
              {filteredBikes.map((bike) => (
                <BikeCard
                  key={bike.id}
                  bike={bike}
                  onSelectBike={(b) => {
                    if (onSelectBike) onSelectBike(b);
                    navigation.navigate('BikeDetails', { bike: b });
                  }}
                  onStartBooking={onStartBooking}
                  onOpenBookModal={onOpenBookModal}
                  style={styles.carouselCard}
                />
              ))}

              {filteredBikes.length === 0 && (
                <View style={styles.carouselEmpty}>
                  <Text style={styles.carouselEmptyText}>
                    {t('noBikesFound', 'No motorbikes found in this category.')}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* View All Bikes CTA */}
          <View style={styles.viewAllBtnWrapper}>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => navigation.navigate('Motorbikes')}
              activeOpacity={0.8}
            >
              <Text style={styles.viewAllBtnText}>
                {t('viewCompleteFleet', 'View Complete 50+ Fleet')} ({filteredBikes.length}{' '}
                {t('available', 'available')})
              </Text>
              <ArrowRight size={15} color="#38BDF8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ================= WHY CHOOSE US ================= */}
      <View style={styles.whySection}>
        <View style={styles.centerContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionPretitle}>
              {t('whyRoadEagle', 'WHY THE ROAD EAGLE')}
            </Text>
            <Text style={styles.sectionTitle}>
              {t('builtForSeriousRiders', 'Built for Serious Riders')}
            </Text>
          </View>

          <View style={styles.whyGrid}>
            <View style={styles.whyCard}>
              <View style={styles.whyIconCircle}>
                <ShieldCheck size={22} color={COLORS.accentCyan} />
              </View>
              <Text style={styles.whyCardTitle}>
                {t('inspection24Title', '24-Point Inspection')}
              </Text>
              <Text style={styles.whyCardDesc}>
                {t(
                  'inspection24Desc',
                  'Every machine undergoes meticulous fluid, brake, and tyre checks before handover.'
                )}
              </Text>
            </View>

            <View style={styles.whyCard}>
              <View style={styles.whyIconCircle}>
                <Tag size={22} color={COLORS.accentCyan} />
              </View>
              <Text style={styles.whyCardTitle}>
                {t('zeroFeesTitle', 'Zero Hidden Fees')}
              </Text>
              <Text style={styles.whyCardDesc}>
                {t(
                  'zeroFeesDesc',
                  'Clear daily rates with 100% refundable security deposit returned within 24-48 hours.'
                )}
              </Text>
            </View>

            <View style={styles.whyCard}>
              <View style={styles.whyIconCircle}>
                <Headphones size={22} color={COLORS.accentCyan} />
              </View>
              <Text style={styles.whyCardTitle}>
                {t('roadsideTitle', '24/7 Roadside Assistance')}
              </Text>
              <Text style={styles.whyCardDesc}>
                {t(
                  'roadsideDesc',
                  'Flat tyre? Emergency support? Our rapid breakdown van is always one phone call away.'
                )}
              </Text>
            </View>

            <View style={styles.whyCard}>
              <View style={styles.whyIconCircle}>
                <Award size={22} color={COLORS.accentCyan} />
              </View>
              <Text style={styles.whyCardTitle}>
                {t('gearTitle', 'Complimentary Gear')}
              </Text>
              <Text style={styles.whyCardDesc}>
                {t(
                  'gearDesc',
                  'Sanitized ISI/DOT certified helmet and phone mounts provided with every booking.'
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ================= CUSTOMER REVIEWS ================= */}
      <View style={styles.reviewsSection}>
        <View style={styles.centerContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionPretitle}>
              {t('verifiedFeedback', 'VERIFIED FEEDBACK')}
            </Text>
            <Text style={styles.sectionTitle}>
              {t('lovedByRiders', 'Loved by Riders')}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewsScroll}
          >
            {TESTIMONIALS_DATA.map((item, idx) => {
              const city = t(`testimonials.t${idx + 1}.city`, item.city);
              const review = t(`testimonials.t${idx + 1}.review`, item.review);
              return (
                <View key={idx} style={[styles.reviewCard, SHADOWS.card]}>
                  <View style={styles.reviewHeader}>
                    <Image source={{ uri: item.avatar }} style={styles.reviewerAvatar} />
                    <View>
                      <Text style={styles.reviewerName}>{item.name}</Text>
                      <Text style={styles.reviewerCity}>{city}</Text>
                    </View>
                  </View>

                  <View style={styles.reviewStars}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={13} color={COLORS.accentCyan} fill={COLORS.accentCyan} />
                    ))}
                  </View>

                  <Text style={styles.reviewText}>"{review}"</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* ================= FAQS ACCORDION ================= */}
      <View style={styles.faqSection}>
        <View style={styles.centerContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionPretitle}>
              {t('commonQueries', 'COMMON QUERIES')}
            </Text>
            <Text style={styles.sectionTitle}>
              {t('frequentlyAsked', 'Frequently Asked Questions')}
            </Text>
          </View>

          <View style={styles.faqList}>
            {FAQS_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const question = t(`faqs.q${index + 1}`, faq.question);
              const answer = t(`faqs.a${index + 1}`, faq.answer);
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.faqCard, isOpen && styles.faqCardOpen]}
                  onPress={() => toggleFaq(index)}
                  activeOpacity={0.8}
                >
                  <View style={styles.faqHeader}>
                    <Text style={[styles.faqQuestion, isOpen && styles.faqQuestionActive]}>
                      {question}
                    </Text>
                    {isOpen ? (
                      <Minus size={18} color={COLORS.accentCyan} />
                    ) : (
                      <Plus size={18} color={COLORS.textSecondary} />
                    )}
                  </View>

                  {isOpen && (
                    <Text style={styles.faqAnswer}>{answer}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* ================= BOTTOM LUXURY CTA BANNER ================= */}
      <View style={styles.ctaBannerSection}>
        <View style={styles.centerContainer}>
          <View style={styles.ctaBanner}>
            <Text style={styles.ctaBannerTitle}>
              {t('readyToHitOpenRoad', 'Ready to Hit the Open Road?')}
            </Text>
            <Text style={styles.ctaBannerSubtitle}>
              {t(
                'readySubtitle',
                'Reserve your dream machine today or chat with our team on WhatsApp for instant confirmation.'
              )}
            </Text>
            <View style={styles.ctaBannerBtns}>
              <TouchableOpacity
                style={styles.ctaPrimaryBtn}
                onPress={() => navigation.navigate('Motorbikes')}
                activeOpacity={0.8}
              >
                <Bike size={17} color="#FFFFFF" />
                <Text style={styles.ctaPrimaryBtnText}>
                  {t('browseEntireFleet', 'Browse Entire Fleet')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ctaWhatsAppBtn}
                onPress={onOpenWhatsApp}
                activeOpacity={0.8}
              >
                <MessageCircle size={17} color="#FFFFFF" />
                <Text style={styles.ctaWhatsAppBtnText}>
                  {t('whatsappConcierge', 'WhatsApp Concierge')}
                </Text>
              </TouchableOpacity>
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
    backgroundColor: COLORS.bgDark,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  centerContainer: {
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  heroSection: {
    height: 520,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 14, 27, 0.82)',
  },
  heroContainer: {
    width: '100%',
    maxWidth: 820,
    paddingHorizontal: 24,
    alignItems: 'center',
    textAlign: 'center',
  },
  heroTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 18,
  },
  heroTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  heroTitleCyan: {
    color: COLORS.accentCyan,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 620,
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#0284C7',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  btnWhatsAppDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnWhatsAppDarkText: {
    color: '#E2E8F0',
    fontWeight: '600',
    fontSize: 14,
  },

  /* Feature Strip */
  featureStrip: {
    backgroundColor: '#0D1524',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1E293B',
    paddingVertical: 18,
  },
  featureStripCenteredWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 160,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  /* Philosophy Statement */
  philosophySection: {
    paddingVertical: 36,
    backgroundColor: COLORS.bgDark,
  },
  philosophyQuote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 720,
    alignSelf: 'center',
    marginBottom: 8,
  },
  philosophyAuthor: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accentCyan,
    textAlign: 'center',
    letterSpacing: 0.8,
  },

  /* Fleet Section */
  fleetSection: {
    paddingVertical: 36,
  },
  fleetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  sectionPretitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accentCyan,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    maxWidth: 580,
  },
  carouselArrows: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 4,
  },
  carouselArrowBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPillsScroll: {
    gap: 8,
    marginBottom: 20,
    paddingVertical: 4,
  },
  categoryPill: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
  },
  categoryPillActive: {
    backgroundColor: COLORS.accentCyan,
    borderColor: COLORS.accentCyan,
  },
  categoryPillText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryPillTextActive: {
    color: '#050B14',
    fontWeight: '800',
  },
  carouselWrapper: {
    marginBottom: 24,
  },
  carouselContent: {
    gap: 16,
    paddingBottom: 8,
  },
  carouselCard: {
    width: 290,
  },
  carouselEmpty: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  carouselEmptyText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  viewAllBtnWrapper: {
    alignItems: 'center',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: RADIUS.full,
  },
  viewAllBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#E2E8F0',
  },

  /* Why Us */
  whySection: {
    paddingVertical: 40,
    backgroundColor: '#0B1220',
  },
  sectionHeader: {
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  whyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  whyCard: {
    flex: 1,
    minWidth: 240,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.lg,
    padding: 22,
  },
  whyIconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  whyCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  whyCardDesc: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  /* Reviews */
  reviewsSection: {
    paddingVertical: 40,
  },
  reviewsScroll: {
    gap: 16,
    paddingBottom: 8,
  },
  reviewCard: {
    width: 290,
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.lg,
    padding: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  reviewerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.accentCyan,
  },
  reviewerName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  reviewerCity: {
    fontSize: 11.5,
    color: COLORS.textMuted,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 12.5,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  /* FAQs */
  faqSection: {
    paddingVertical: 40,
    backgroundColor: '#0B1220',
  },
  faqList: {
    gap: 10,
  },
  faqCard: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: RADIUS.md,
    padding: 18,
  },
  faqCardOpen: {
    borderColor: COLORS.accentCyan,
    backgroundColor: '#121C30',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  faqQuestionActive: {
    color: COLORS.accentCyan,
  },
  faqAnswer: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },

  /* Bottom CTA Banner */
  ctaBannerSection: {
    paddingVertical: 44,
  },
  ctaBanner: {
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: RADIUS.xl,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#00A3FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaBannerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaBannerSubtitle: {
    fontSize: 13.5,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 580,
    marginBottom: 24,
  },
  ctaBannerBtns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  ctaPrimaryBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  ctaPrimaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  ctaWhatsAppBtn: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ctaWhatsAppBtnText: {
    color: '#E2E8F0',
    fontWeight: '600',
    fontSize: 14,
  },
});
