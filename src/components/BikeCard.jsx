import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Star, Zap, Fuel, Cog, ArrowRight } from 'lucide-react-native';
import { COLORS, RADIUS, SHADOWS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

export default function BikeCard({
  bike,
  onSelectBike,
  onOpenBookModal,
  onStartBooking,
  user,
  onOpenAuth,
  style,
  compact = false,
}) {
  const { t } = useTranslation();
  const isLimited = bike.statusBadge === 'LIMITED';

  const getBadgeTranslation = (badge) => {
    if (!badge) return '';
    const map = {
      'PREMIUM CHOICE': t('bikeCard.premiumChoice'),
      'POPULAR': t('bikeCard.popular'),
      'PREMIUM': t('bikeCard.premium'),
      'SPORT RACING': t('bikeCard.sportRacing'),
      'CLASSIC VINTAGE': t('bikeCard.classicVintage'),
      'ECO FRIENDLY': t('bikeCard.ecoFriendly'),
    };
    return map[badge] || badge;
  };

  const handleBookPress = () => {
    if (!user) {
      if (onOpenAuth) {
        onOpenAuth();
      }
      return;
    }
    if (onStartBooking) {
      onStartBooking(bike);
    } else if (onOpenBookModal) {
      onOpenBookModal(bike);
    }
  };

  return (
    <View style={[styles.card, SHADOWS.card, compact && styles.cardCompact, style]}>
      {/* Top Image Container */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onSelectBike(bike)}
        style={[styles.imageContainer, compact && styles.imageContainerCompact]}
      >
        <Image
          source={bike.imageSource}
          style={styles.bikeImage}
          resizeMode="cover"
        />

        {/* Top Floating Badges */}
        <View style={styles.badgeRow}>
          {bike.badge ? (
            <View style={[styles.primaryBadge, compact && styles.badgeCompact]}>
              <Text style={[styles.primaryBadgeText, compact && styles.badgeTextCompact]}>
                {getBadgeTranslation(bike.badge)}
              </Text>
            </View>
          ) : null}

          <View
            style={[
              styles.statusBadge,
              compact && styles.badgeCompact,
              { backgroundColor: isLimited ? COLORS.statusLimited : COLORS.statusAvailable },
            ]}
          >
            <Text style={[styles.statusBadgeText, compact && styles.badgeTextCompact]}>
              {isLimited ? t('bikeCard.limited') : t('bikeCard.available')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Card Content */}
      <View style={[styles.content, compact && styles.contentCompact]}>
        <View style={styles.titleRow}>
          <Text style={[styles.bikeName, compact && styles.bikeNameCompact]} numberOfLines={1}>
            {bike.name}
          </Text>
        </View>

        <Text style={[styles.bikeModel, compact && styles.bikeModelCompact]} numberOfLines={1}>
          {bike.model}
        </Text>

        {/* Rating and Reviews */}
        <View style={[styles.ratingRow, compact && styles.ratingRowCompact]}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={compact ? 12 : 14}
                color={COLORS.accentCyan}
                fill={COLORS.accentCyan}
              />
            ))}
          </View>
          <Text style={[styles.ratingNumber, compact && styles.ratingNumberCompact]}>
            {bike.rating}
          </Text>
          <Text style={[styles.reviewCount, compact && styles.reviewCountCompact]}>
            ({bike.reviewsCount})
          </Text>
        </View>

        {/* Key Specs Pills */}
        <View style={[styles.specsRow, compact && styles.specsRowCompact]}>
          <View style={[styles.specPill, compact && styles.specPillCompact]}>
            <Zap size={compact ? 10 : 12} color={COLORS.accentCyan} />
            <Text style={[styles.specText, compact && styles.specTextCompact]}>
              {bike.specs?.displacement || '350 CC'}
            </Text>
          </View>
          <View style={[styles.specPill, compact && styles.specPillCompact]}>
            <Cog size={compact ? 10 : 12} color={COLORS.accentCyan} />
            <Text style={[styles.specText, compact && styles.specTextCompact]}>
              {bike.specs?.transmission?.includes('Manual') ? t('bikeCard.manual') : t('bikeCard.auto')}
            </Text>
          </View>
          <View style={[styles.specPill, compact && styles.specPillCompact]}>
            <Fuel size={compact ? 10 : 12} color={COLORS.accentCyan} />
            <Text style={[styles.specText, compact && styles.specTextCompact]}>
              {bike.specs?.mileage || '40 kmpl'}
            </Text>
          </View>
        </View>

        {/* Price & Action Row */}
        <View style={[styles.footerRow, compact && styles.footerRowCompact]}>
          <View style={compact && styles.priceBlockCompact}>
            <View style={styles.priceRow}>
              <Text style={[styles.fromLabel, compact && styles.fromLabelCompact]}>{t('bikeCard.from')}</Text>
              <Text style={[styles.priceValue, compact && styles.priceValueCompact]}>
                ${Math.round(bike.pricePerDay / 50)}
              </Text>
              <Text style={[styles.perDayLabel, compact && styles.perDayLabelCompact]}>{t('bikeCard.perDay')}</Text>
            </View>
            <Text style={[styles.inrSubtext, compact && styles.inrSubtextCompact]}>
              ₹{bike.pricePerDay.toLocaleString()} INR
            </Text>
          </View>

          {/* Red Action Button */}
          <TouchableOpacity
            style={[styles.bookBtn, compact && styles.bookBtnCompact, SHADOWS.glowRed]}
            onPress={handleBookPress}
            activeOpacity={0.8}
          >
            <Text style={[styles.bookBtnText, compact && styles.bookBtnTextCompact]}>{t('bikeCard.book')}</Text>
            <ArrowRight size={compact ? 12 : 14} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardCompact: {
    borderRadius: RADIUS.md,
  },
  imageContainer: {
    height: 190,
    width: '100%',
    position: 'relative',
    backgroundColor: COLORS.bgCardAlt,
  },
  imageContainerCompact: {
    height: 145,
  },
  bikeImage: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeCompact: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeTextCompact: {
    fontSize: 9,
  },
  primaryBadge: {
    backgroundColor: 'rgba(8, 12, 20, 0.85)',
    borderWidth: 1,
    borderColor: COLORS.accentCyan,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  primaryBadgeText: {
    color: COLORS.accentCyan,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusBadge: {
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusBadgeText: {
    color: '#050B14',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  content: {
    padding: 16,
  },
  contentCompact: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  bikeName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  bikeNameCompact: {
    fontSize: 15,
  },
  bikeModel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  bikeModelCompact: {
    fontSize: 11,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  ratingRowCompact: {
    marginBottom: 8,
    gap: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  ratingNumberCompact: {
    fontSize: 11,
  },
  reviewCount: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  reviewCountCompact: {
    fontSize: 10,
  },
  specsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  specsRowCompact: {
    gap: 5,
    marginBottom: 10,
  },
  specPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.bgCardAlt,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  specPillCompact: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 3,
  },
  specText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  specTextCompact: {
    fontSize: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 12,
  },
  footerRowCompact: {
    paddingTop: 8,
  },
  priceBlockCompact: {},
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  fromLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  fromLabelCompact: {
    fontSize: 10,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.accentRed,
  },
  priceValueCompact: {
    fontSize: 18,
  },
  perDayLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  perDayLabelCompact: {
    fontSize: 10,
  },
  inrSubtext: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  inrSubtextCompact: {
    fontSize: 10,
    marginTop: 1,
  },
  bookBtn: {
    backgroundColor: COLORS.accentRed,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
  },
  bookBtnCompact: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    gap: 4,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  bookBtnTextCompact: {
    fontSize: 12,
  },
});
