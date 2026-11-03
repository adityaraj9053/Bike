import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Search, ArrowUpDown } from 'lucide-react-native';
import { BIKES_DATA } from '../data/bikes';
import { COLORS, RADIUS } from '../theme/colors';
import BikeCard from '../components/BikeCard';
import { useTranslation } from 'react-i18next';

export default function MotorbikesScreen({
  navigation,
  route,
  onSelectBike,
  onStartBooking,
  onOpenBookModal,
  user,
  onOpenAuth,
}) {
  const { t } = useTranslation();
  const initialCategory = route?.params?.initialCategory || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-asc', 'price-desc', 'rating'

  // Responsive Multi-Column Grid state & calculations
  const { width: windowWidth } = useWindowDimensions();
  const [columnOverride, setColumnOverride] = useState(null);

  const containerPadding = 40; // 20px on each side
  const gap = 16;
  const availableWidth = Math.max(windowWidth - containerPadding, 280);

  const autoColumns = useMemo(() => {
    if (availableWidth >= 1200) return 4;
    if (availableWidth >= 860) return 3;
    if (availableWidth >= 540) return 2;
    return 2; // default to 2 horizontal columns side-by-side on mobile
  }, [availableWidth]);

  const numColumns = columnOverride || autoColumns;
  const cardWidth = Math.floor((availableWidth - (numColumns - 1) * gap) / numColumns);
  const isCompact = cardWidth < 250;

  const availableColumnOptions = useMemo(() => {
    if (availableWidth >= 1100) return [2, 3, 4];
    if (availableWidth >= 680) return [2, 3];
    return [1, 2];
  }, [availableWidth]);

  const categories = [
    { id: 'all', label: 'All Bikes' },
    { id: 'scooters', label: 'Scooters' },
    { id: 'commuter', label: 'Commuter Bikes' },
    { id: 'cruiser', label: 'Cruiser Bikes' },
    { id: 'sports', label: 'Sports Bikes' },
    { id: 'premium', label: 'Premium Bikes' },
  ];

  const filteredBikes = useMemo(() => {
    return BIKES_DATA.filter((bike) => {
      const matchesCategory =
        selectedCategory === 'all' || bike.categoryKey === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        bike.name.toLowerCase().includes(q) ||
        bike.model.toLowerCase().includes(q) ||
        bike.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const cycleSort = () => {
    if (sortBy === 'newest') setSortBy('price-asc');
    else if (sortBy === 'price-asc') setSortBy('price-desc');
    else if (sortBy === 'price-desc') setSortBy('rating');
    else setSortBy('newest');
  };

  const sortLabel = {
    newest: 'Featured',
    'price-asc': 'Price: Low → High',
    'price-desc': 'Price: High → Low',
    rating: 'Top Rated',
  }[sortBy];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Page Header */}
      <View style={styles.headerBox}>
        <Text style={styles.pretitle}>{t('fleetScreen.pretitle')}</Text>
        <Text style={styles.title}>
          {t('fleetScreen.title1')} <Text style={{ color: COLORS.accentCyan }}>{t('fleetScreen.title2')}</Text>
        </Text>
        <Text style={styles.subtitle}>
          {t('fleetScreen.subtitle')}
        </Text>
      </View>

      {/* Search Bar & Sort Toggle */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Search size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('fleetScreen.searchPlaceholder')}
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.sortBtn}
          onPress={cycleSort}
          activeOpacity={0.8}
        >
          <ArrowUpDown size={16} color={COLORS.accentCyan} />
          <Text style={styles.sortBtnText}>{sortLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* Category Pills Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                {t(`categories.${cat.id === 'scooters' ? 'scooter' : cat.id === 'sports' ? 'superbike' : cat.id}`) || cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Results Count & Horizontal Grid Columns Selector */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {t('fleetScreen.showingBikes', { count: filteredBikes.length })}
        </Text>

        <View style={styles.gridToggleRow}>
          <Text style={styles.gridToggleLabel}>Columns:</Text>
          {availableColumnOptions.map((cols) => {
            const isActive = numColumns === cols;
            return (
              <TouchableOpacity
                key={cols}
                style={[styles.gridToggleBtn, isActive && styles.gridToggleBtnActive]}
                onPress={() => setColumnOverride(cols)}
                activeOpacity={0.8}
              >
                <Text style={[styles.gridToggleBtnText, isActive && styles.gridToggleBtnTextActive]}>
                  {cols}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Multi-Column Horizontal Grid */}
      <View style={styles.bikesGrid}>
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
            user={user}
            onOpenAuth={onOpenAuth}
            compact={isCompact}
            style={{ width: cardWidth, marginBottom: 0 }}
          />
        ))}

        {filteredBikes.length === 0 && (
          <View style={[styles.emptyState, { width: availableWidth }]}>
            <Text style={styles.emptyTitle}>No bikes found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your category filter or search keywords.
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              <Text style={styles.resetBtnText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 40,
  },
  headerBox: {
    marginBottom: 20,
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    height: 46,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    height: 46,
  },
  sortBtnText: {
    color: COLORS.accentCyan,
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesScroll: {
    gap: 8,
    paddingBottom: 4,
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
  },
  categoryChipActive: {
    backgroundColor: COLORS.accentCyan,
    borderColor: COLORS.accentCyan,
  },
  categoryChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#050B14',
    fontWeight: '700',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 10,
  },
  resultsCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  gridToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.bgCard,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  gridToggleLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginRight: 4,
  },
  gridToggleBtn: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    minWidth: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridToggleBtnActive: {
    backgroundColor: COLORS.accentCyan,
  },
  gridToggleBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  gridToggleBtnTextActive: {
    color: '#050B14',
  },
  bikesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  emptyState: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginTop: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 18,
  },
  resetBtn: {
    backgroundColor: COLORS.accentCyan,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
  },
  resetBtnText: {
    color: '#050B14',
    fontSize: 13,
    fontWeight: '700',
  },
});
