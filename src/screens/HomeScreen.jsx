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
} from 'lucide-react-native';
import { BIKES_DATA, CATEGORIES_DATA, FAQS_DATA, TESTIMONIALS_DATA } from '../data/bikes';
import { IMAGES } from '../assets/images';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
import BikeCard from '../components/BikeCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({
  navigation,
  onSelectBike,
  onStartBooking,
  onOpenWhatsApp,
  onOpenBookModal,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const carouselScrollRef = useRef(null);
  const [carouselOffset, setCarouselOffset] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleScrollCarousel = (direction) => {
    const cardStep = 326; // 310 card width + 16 gap
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
      {/* ================= HERO SECTION ================= */}
      <View style={styles.heroSection}>
        <Image
          source={IMAGES['hero-bike']}
          style={styles.heroBgImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.heroContent}>
          <View style={styles.heroTagBadge}>
            <Text style={styles.heroTagText}>THEROADEAGLE.COM</Text>
          </View>

          <Text style={styles.heroTitle}>
            Your Ride, Your Route,{'\n'}
            <Text style={styles.heroTitleCyan}>Your Freedom.</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Discover the city on two wheels. Find the perfect machine for your journey, from agile urban scooters to highway cruisers and superbikes.
          </Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={[styles.btnPrimary, SHADOWS.glowCyan]}
              onPress={() => navigation.navigate('Motorbikes')}
              activeOpacity={0.8}
            >
              <Bike size={18} color="#050B14" />
              <Text style={styles.btnPrimaryText}>Explore Bikes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnWhatsAppDark}
              onPress={onOpenWhatsApp}
              activeOpacity={0.8}
            >
              <MessageCircle size={18} color={COLORS.accentCyan} />
              <Text style={styles.btnWhatsAppDarkText}>WhatsApp Enquiry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ================= FEATURE STRIP ================= */}
      <View style={styles.featureStrip}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featureStripContent}
        >
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Bike size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.featureTitle}>Multiple Bike Options</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Tag size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.featureTitle}>Transparent Pricing</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Headphones size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.featureTitle}>Customer Assistance</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <CalendarCheck size={20} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.featureTitle}>Easy Enquiries</Text>
          </View>
        </ScrollView>
      </View>

      {/* ================= PHILOSOPHY STATEMENT ================= */}
      <View style={styles.philosophySection}>
        <Text style={styles.philosophyQuote}>
          "Renting a motorcycle shouldn't feel like a leap of faith. We exist to provide transparent pricing, factory-maintained machines, and complete peace of mind."
        </Text>
        <Text style={styles.philosophyAuthor}>— The Road Eagle Guarantee</Text>
      </View>

      {/* ================= CURATED FLEET SECTION ================= */}
      <View style={styles.fleetSection}>
        <View style={styles.fleetHeaderRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.sectionPretitle}>CURATED LINEUP</Text>
            <Text style={styles.sectionTitle}>Featured Motorbikes</Text>
            <Text style={styles.sectionSubtitle}>
              Hand-picked machines ready for immediate adventure and daily convenience.
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
                  {cat.label}
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
                <Text style={styles.carouselEmptyText}>No motorbikes found in this category.</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* View All Bikes CTA */}
        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => navigation.navigate('Motorbikes')}
          activeOpacity={0.8}
        >
          <Text style={styles.viewAllBtnText}>View Complete 50+ Fleet ({filteredBikes.length} available)</Text>
          <ArrowRight size={16} color={COLORS.accentCyan} />
        </TouchableOpacity>
      </View>

      {/* ================= WHY CHOOSE US ================= */}
      <View style={styles.whySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionPretitle}>WHY THE ROAD EAGLE</Text>
          <Text style={styles.sectionTitle}>Built for Serious Riders</Text>
        </View>

        <View style={styles.whyGrid}>
          <View style={styles.whyCard}>
            <View style={styles.whyIconCircle}>
              <ShieldCheck size={24} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.whyCardTitle}>24-Point Inspection</Text>
            <Text style={styles.whyCardDesc}>
              Every machine undergoes meticulous fluid, brake, and tyre checks before handover.
            </Text>
          </View>

          <View style={styles.whyCard}>
            <View style={styles.whyIconCircle}>
              <Tag size={24} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.whyCardTitle}>Zero Hidden Fees</Text>
            <Text style={styles.whyCardDesc}>
              Clear daily rates with 100% refundable security deposit returned within 24-48 hours.
            </Text>
          </View>

          <View style={styles.whyCard}>
            <View style={styles.whyIconCircle}>
              <Headphones size={24} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.whyCardTitle}>24/7 Roadside Assistance</Text>
            <Text style={styles.whyCardDesc}>
              Flat tyre? Emergency support? Our rapid breakdown van is always one phone call away.
            </Text>
          </View>

          <View style={styles.whyCard}>
            <View style={styles.whyIconCircle}>
              <Award size={24} color={COLORS.accentCyan} />
            </View>
            <Text style={styles.whyCardTitle}>Complimentary Gear</Text>
            <Text style={styles.whyCardDesc}>
              Sanitized ISI/DOT certified helmet and phone mounts provided with every booking.
            </Text>
          </View>
        </View>
      </View>

      {/* ================= CUSTOMER REVIEWS ================= */}
      <View style={styles.reviewsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionPretitle}>VERIFIED FEEDBACK</Text>
          <Text style={styles.sectionTitle}>Loved by Riders</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviewsScroll}
        >
          {TESTIMONIALS_DATA.map((t, idx) => (
            <View key={idx} style={[styles.reviewCard, SHADOWS.card]}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: t.avatar }} style={styles.reviewerAvatar} />
                <View>
                  <Text style={styles.reviewerName}>{t.name}</Text>
                  <Text style={styles.reviewerCity}>{t.city}</Text>
                </View>
              </View>

              <View style={styles.reviewStars}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} color={COLORS.accentCyan} fill={COLORS.accentCyan} />
                ))}
              </View>

              <Text style={styles.reviewText}>"{t.review}"</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ================= FAQS ACCORDION ================= */}
      <View style={styles.faqSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionPretitle}>COMMON QUERIES</Text>
          <Text style={styles.sectionTitle}>Frequently Asked</Text>
        </View>

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

      {/* ================= BOTTOM CTA BANNER ================= */}
      <View style={styles.ctaBanner}>
        <Text style={styles.ctaBannerTitle}>Ready to Hit the Open Road?</Text>
        <Text style={styles.ctaBannerSubtitle}>
          Reserve your dream machine today or chat with our team on WhatsApp for instant booking.
        </Text>
        <View style={styles.ctaBannerBtns}>
          <TouchableOpacity
            style={styles.ctaPrimaryBtn}
            onPress={() => navigation.navigate('Motorbikes')}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaPrimaryBtnText}>Browse Entire Fleet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ctaWhatsAppBtn}
            onPress={onOpenWhatsApp}
            activeOpacity={0.8}
          >
            <MessageCircle size={18} color="#050B14" />
            <Text style={styles.ctaWhatsAppBtnText}>WhatsApp Concierge</Text>
          </TouchableOpacity>
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
    paddingBottom: 40,
  },
  heroSection: {
    height: 480,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 12, 20, 0.78)',
  },
  heroContent: {
    zIndex: 2,
  },
  heroTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 163, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 163, 255, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginBottom: 16,
  },
  heroTagText: {
    color: COLORS.accentCyan,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.textPrimary,
    lineHeight: 40,
    marginBottom: 12,
  },
  heroTitleCyan: {
    color: COLORS.accentCyan,
  },
  heroSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginBottom: 24,
    maxWidth: '90%',
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    backgroundColor: COLORS.accentCyan,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  btnPrimaryText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
  btnWhatsAppDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  btnWhatsAppDarkText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  featureStrip: {
    backgroundColor: COLORS.bgCard,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.borderCard,
    paddingVertical: 14,
  },
  featureStripContent: {
    paddingHorizontal: 16,
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.bgCardAlt,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  philosophySection: {
    paddingHorizontal: 20,
    paddingVertical: 36,
    alignItems: 'center',
  },
  philosophyQuote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  philosophyAuthor: {
    fontSize: 12,
    color: COLORS.accentCyan,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  fleetSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionPretitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accentCyan,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  categoryPillsScroll: {
    gap: 8,
    marginBottom: 20,
  },
  categoryPill: {
    backgroundColor: COLORS.bgCardAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  categoryPillActive: {
    backgroundColor: COLORS.accentCyan,
    borderColor: COLORS.accentCyan,
  },
  categoryPillText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  categoryPillTextActive: {
    color: '#050B14',
    fontWeight: '700',
  },
  fleetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  carouselArrows: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  carouselArrowBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselWrapper: {
    marginHorizontal: -20,
    marginBottom: 20,
  },
  carouselContent: {
    paddingHorizontal: 20,
    gap: 16,
    paddingVertical: 4,
  },
  carouselCard: {
    width: 310,
    marginBottom: 0,
  },
  carouselEmpty: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.lg,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  carouselEmptyText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  viewAllBtn: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  viewAllBtnText: {
    color: COLORS.accentCyan,
    fontSize: 14,
    fontWeight: '700',
  },
  whySection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  whyGrid: {
    gap: 14,
  },
  whyCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.lg,
    padding: 18,
  },
  whyIconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 163, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  whyCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  whyCardDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  reviewsSection: {
    marginBottom: 40,
  },
  reviewsScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  reviewCard: {
    width: width * 0.78,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    padding: 18,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  reviewerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.accentCyan,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  reviewerCity: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  faqSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  faqList: {
    gap: 10,
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
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 10,
  },
  faqQuestionActive: {
    color: COLORS.accentCyan,
  },
  faqAnswer: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 10,
  },
  ctaBanner: {
    marginHorizontal: 20,
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.accentCyan,
    borderRadius: RADIUS.xl,
    padding: 24,
    alignItems: 'center',
  },
  ctaBannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaBannerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  ctaBannerBtns: {
    width: '100%',
    gap: 10,
  },
  ctaPrimaryBtn: {
    backgroundColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPrimaryBtnText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
  ctaWhatsAppBtn: {
    backgroundColor: COLORS.whatsappGreen,
    borderRadius: RADIUS.full,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaWhatsAppBtnText: {
    color: '#050B14',
    fontSize: 14,
    fontWeight: '700',
  },
});
