import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Zap, Cog, Fuel, MessageCircle, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { BIKES_DATA, CATEGORIES_DATA } from '../data/bikes';

export default function MotorbikesPage({ 
  onSelectBike, 
  onStartBooking, 
  onOpenWhatsApp,
  initialCategory = 'all'
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredBikes = useMemo(() => {
    return BIKES_DATA.filter((bike) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || bike.categoryKey === selectedCategory;
      // Search filter
      const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            bike.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            bike.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default newest
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredBikes.length / itemsPerPage) || 1;
  const paginatedBikes = filteredBikes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const categories = [
    { id: 'all', label: 'All Bikes' },
    { id: 'scooters', label: 'Scooters' },
    { id: 'commuter', label: 'Commuter Bikes' },
    { id: 'cruiser', label: 'Cruiser Bikes' },
    { id: 'sports', label: 'Sports Bikes' },
    { id: 'premium', label: 'Premium Bikes' },
  ];

  return (
    <div className="motorbikes-page" style={{ padding: '50px 0 90px' }}>
      <div className="container">
        {/* Page Title */}
        <div className="section-header" style={{ marginBottom: '36px' }}>
          <h1 className="section-title" style={{ fontSize: '2.8rem' }}>
            Find the Perfect Bike <span className="text-gradient">For Your Journey</span>
          </h1>
          <p className="section-subtitle">
            Explore our meticulously maintained fleet. Transparent pricing, zero hidden charges, and instant verification.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                  style={{
                    background: isActive ? '#00A3FF' : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#060c18' : '#cbd5e1',
                    fontWeight: 600,
                    padding: '9px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    border: isActive ? 'none' : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search 
                size={18} 
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} 
              />
              <input
                type="text"
                className="form-input"
                placeholder="Search by bike name, brand, or model..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ width: '100%', paddingLeft: '42px', borderRadius: '9999px' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>Sort by:</span>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '10px 16px', borderRadius: '9999px', fontSize: '0.9rem' }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        {paginatedBikes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>No motorbikes found matching your criteria.</p>
            <button 
              className="btn-outline" 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bikes-grid">
            {paginatedBikes.map((bike) => (
              <div key={bike.id} className="bike-card">
                <div className="bike-card-image-wrap">
                  <img src={bike.image} alt={bike.name} className="bike-card-image" />
                  <span className={`bike-badge ${bike.statusBadge === 'AVAILABLE' ? 'available' : 'limited'}`}>
                    {bike.statusBadge}
                  </span>
                </div>
                <div className="bike-card-body">
                  <h3 className="bike-card-title">{bike.name}</h3>
                  <p className="bike-card-tagline">{bike.tagline}</p>
                  
                  <div className="bike-card-price-row">
                    <span className="bike-price">₹{bike.pricePerDay.toLocaleString()}</span>
                    <span className="bike-price-unit">/ day</span>
                  </div>

                  <div className="bike-specs-strip">
                    <div className="bike-spec-item">
                      <Zap size={14} />
                      <span>{bike.specs.displacement}</span>
                    </div>
                    <div className="bike-spec-item">
                      <Cog size={14} />
                      <span>Manual</span>
                    </div>
                    <div className="bike-spec-item">
                      <Fuel size={14} />
                      <span>{bike.specs.fuelType}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#10B981', marginBottom: '16px' }}>
                    <CheckCircle2 size={14} />
                    <span>Availability: Contact to confirm</span>
                  </div>

                  <div className="bike-card-actions">
                    <button 
                      className="btn-card-action btn-primary"
                      onClick={() => onOpenWhatsApp(bike)}
                    >
                      <MessageCircle size={16} />
                      <span>Enquire Now</span>
                    </button>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <button 
                        className="btn-card-action btn-outline"
                        onClick={() => onSelectBike(bike)}
                      >
                        <span>View Details</span>
                      </button>
                      <button 
                        className="btn-card-action btn-outline"
                        style={{ borderColor: '#00A3FF', color: '#00A3FF' }}
                        onClick={() => onStartBooking(bike)}
                      >
                        <span>Book</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '48px' }}>
            <button
              className="btn-outline"
              style={{ padding: '8px 14px', borderRadius: '8px' }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronLeft size={18} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: isActive ? '#00A3FF' : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#060c18' : '#ffffff',
                    fontWeight: 700,
                    border: '1px solid var(--border-card)',
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="btn-outline"
              style={{ padding: '8px 14px', borderRadius: '8px' }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
