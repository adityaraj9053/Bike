import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  Download, 
  MessageCircle, 
  Check, 
  Smartphone,
  MapPin,
  Compass
} from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';

export default function BookingPage({ 
  selectedBike = BIKES_DATA[0], 
  onNavigate, 
  onOpenQuote, 
  onShowToast, 
  onOpenWhatsApp 
}) {
  const [step, setStep] = useState(1); // 1: DateSelection, 2: BookingSummary, 3: Confirmation
  const [pickupDate, setPickupDate] = useState('2024-11-15');
  const [pickupTime, setPickupTime] = useState('09:00 AM');
  const [returnDate, setReturnDate] = useState('2024-11-17');
  const [returnTime, setReturnTime] = useState('08:00 PM');
  
  // Rider details
  const [riderName, setRiderName] = useState('Rahul Verma');
  const [riderPhone, setRiderPhone] = useState('+91 98765 43210');
  const [riderEmail, setRiderEmail] = useState('rahul.verma@example.com');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const bike = selectedBike || BIKES_DATA[0];

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    try {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays + 1 : 1; // standard rental billing days
    } catch {
      return 3;
    }
  }, [pickupDate, returnDate]);

  const rentalTotal = rentalDays * bike.pricePerDay;
  const securityDeposit = bike.deposit;
  const totalPayable = rentalTotal + securityDeposit;
  const bookingRefId = 'RDE-' + Math.floor(100000 + Math.random() * 900000);

  const handleProceedPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      onShowToast(`Booking confirmed! Your reservation ref is #${bookingRefId}`);
    }, 1200);
  };

  const handleDownloadQuote = () => {
    onOpenQuote({
      refId: bookingRefId,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      days: rentalDays,
      rentalCharge: rentalTotal,
      deposit: securityDeposit,
      total: totalPayable
    });
  };

  return (
    <div className="booking-page">
      <div className="container">
        {/* Stepper Header */}
        <div className="stepper-header">
          <div className={`step-indicator ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
            <div className="step-badge">{step > 1 ? <Check size={16} /> : '1'}</div>
            <span>DATE SELECTION</span>
          </div>

          <div style={{ width: '40px', height: '2px', background: step > 1 ? '#00A3FF' : '#1e293b' }}></div>

          <div className={`step-indicator ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
            <div className="step-badge">{step > 2 ? <Check size={16} /> : '2'}</div>
            <span>SUMMARY & PAYMENT</span>
          </div>
        </div>

        {/* STEP 1: DATE SELECTION */}
        {step === 1 && (
          <div className="booking-layout">
            {/* Left Box: Date Inputs */}
            <div className="booking-card">
              <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>When are you riding?</h1>
              <p style={{ color: '#94A3B8', fontSize: '1rem', marginBottom: '32px' }}>
                Select your pickup and return dates to see vehicle availability and exact pricing.
              </p>

              <div className="booking-form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    Pickup Time
                  </label>
                  <select
                    className="form-select"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  >
                    <option value="09:00 AM">09:00 AM (Hub Opens)</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    Return Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    Return Time
                  </label>
                  <select
                    className="form-select"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                  >
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM (Hub Closes)</option>
                    <option value="10:00 AM">10:00 AM (Next Day)</option>
                  </select>
                </div>
              </div>

              {/* Security Deposit Notice */}
              <div className="notice-box">
                <Info size={22} color="#00A3FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p>
                  A security deposit of <strong>₹{bike.deposit.toLocaleString()}*</strong> will be collected at pickup. This is 100% fully refundable after your ride upon standard vehicle handover inspection.
                </p>
              </div>

              {/* Continue Button */}
              <button
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1.05rem', justifyContent: 'center' }}
                onClick={() => setStep(2)}
              >
                <span>Continue to Summary</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Box: Selected Bike Preview Card */}
            <div className="booking-card" style={{ padding: '24px' }}>
              <div style={{ height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '18px' }}>
                <img
                  src={bike.image}
                  alt={bike.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{bike.name}</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '18px' }}>
                {bike.model} • {bike.specs.displacement}
              </p>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Rental Fee</span>
                  <span style={{ fontWeight: 700 }}>₹{bike.pricePerDay.toLocaleString()} / day</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Security Deposit</span>
                  <span style={{ fontWeight: 700, color: '#00A3FF' }}>₹{bike.deposit.toLocaleString()}*</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Estimated Days</span>
                  <span style={{ fontWeight: 700 }}>{rentalDays} Days</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => onNavigate('motorbikes')}
                  style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Need a different bike? Change Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BOOKING SUMMARY & PAYMENT */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <button
                className="btn-outline"
                style={{ padding: '8px 18px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} />
                <span>Back to Dates</span>
              </button>
            </div>

            <div className="booking-layout">
              {/* Left Column: Summary & Cost Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Bike & Schedule Card */}
                <div className="booking-card">
                  <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '24px', alignItems: 'center' }}>
                    <div style={{ height: '140px', borderRadius: '10px', overflow: 'hidden' }}>
                      <img src={bike.image} alt={bike.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{bike.name}</h2>
                      <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '14px' }}>
                        {bike.model} • {bike.specs.displacement} • {bike.specs.transmission}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                        <div>
                          <span style={{ color: '#64748B', display: 'block' }}>PICKUP</span>
                          <strong>{pickupDate} • {pickupTime}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748B', display: 'block' }}>RETURN</span>
                          <strong>{returnDate} • {returnTime}</strong>
                        </div>
                      </div>
                      <div style={{ marginTop: '12px', color: '#00A3FF', fontSize: '0.85rem', fontWeight: 600 }}>
                        🔄 Total Duration: {rentalDays} Billing Days
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Breakdown Card */}
                <div className="booking-card">
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '16px' }}>Payment Breakdown</h3>
                  
                  <div className="breakdown-row">
                    <span style={{ color: '#cbd5e1' }}>Rental Charges (₹{bike.pricePerDay.toLocaleString()} × {rentalDays} days*)</span>
                    <span style={{ fontWeight: 600 }}>₹{rentalTotal.toLocaleString()}</span>
                  </div>

                  <div className="breakdown-row">
                    <span style={{ color: '#00A3FF' }}>Security Deposit (Refundable*)</span>
                    <span style={{ fontWeight: 600, color: '#00A3FF' }}>₹{securityDeposit.toLocaleString()}*</span>
                  </div>

                  <div className="breakdown-row total">
                    <span>Total Payable Amount</span>
                    <span style={{ color: '#00A3FF' }}>₹{totalPayable.toLocaleString()}</span>
                  </div>

                  {/* Highlighted Refund Information */}
                  <div className="notice-box" style={{ marginTop: '20px', marginBottom: 0 }}>
                    <Info size={22} color="#00A3FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p>
                      <strong>Important Refund Information:</strong> The security deposit of ₹{bike.deposit.toLocaleString()}* is visually highlighted as it is fully refundable after the rental period. Refunds are processed within 24-48 hours after vehicle inspection for damages, fuel levels, and traffic violations.
                    </p>
                  </div>
                </div>

                {/* Rider Details & Mock Payment Selection */}
                <div className="booking-card">
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '18px' }}>Rider Information</h3>
                  <div className="booking-form-grid" style={{ margin: 0 }}>
                    <div className="form-group">
                      <label className="form-label">Rider Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={riderName}
                        onChange={(e) => setRiderName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-input"
                        value={riderPhone}
                        onChange={(e) => setRiderPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginTop: '24px', marginBottom: '12px' }}>Payment Method</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                      { id: 'upi', label: 'Instant UPI / QR' },
                      { id: 'card', label: 'Credit / Debit Card' },
                      { id: 'pickup', label: 'Pay at Hub Pickup' }
                    ].map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        style={{
                          background: paymentMethod === m.id ? 'rgba(0, 163, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${paymentMethod === m.id ? '#00A3FF' : 'var(--border-card)'}`,
                          borderRadius: '8px',
                          padding: '14px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        {m.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Confirm & Pay Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="booking-card">
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Confirm & Pay</h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '24px' }}>
                    By proceeding, you agree to our Rental Policies and confirmed the vehicle availability for the requested dates.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                      className="btn-primary"
                      style={{ width: '100%', padding: '15px', justifyContent: 'center', fontSize: '1rem' }}
                      onClick={handleProceedPayment}
                      disabled={isProcessing}
                    >
                      <span>{isProcessing ? 'Confirming Reservation...' : 'Proceed to Payment'}</span>
                      <ArrowRight size={18} />
                    </button>

                    <button
                      className="btn-outline"
                      style={{ width: '100%', padding: '13px', justifyContent: 'center' }}
                      onClick={handleDownloadQuote}
                    >
                      <FileText size={16} />
                      <span>Download Quote (PDF)</span>
                    </button>
                  </div>
                </div>

                {/* Required at Pickup Checklist */}
                <div className="booking-card">
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', color: '#ffffff' }}>Required at Pickup:</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8' }}>
                      <CheckCircle2 size={16} color="#00A3FF" />
                      <span>Original Driving License (A-Category)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8' }}>
                      <CheckCircle2 size={16} color="#00A3FF" />
                      <span>Aadhaar / Passport / ID Proof</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8' }}>
                      <CheckCircle2 size={16} color="#00A3FF" />
                      <span>2 Passport size photos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMATION & SUCCESS SCREEN */}
        {step === 3 && (
          <div style={{ maxWidth: '680px', margin: '20px auto', textAlign: 'center' }}>
            <div className="booking-card" style={{ padding: '48px 36px' }}>
              <div style={{
                width: '72px',
                height: '72px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <CheckCircle2 size={40} />
              </div>

              <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Booking Confirmed!</h1>
              <p style={{ color: '#94A3B8', fontSize: '1.05rem', marginBottom: '28px' }}>
                Your {bike.name} is reserved for {pickupDate} ({pickupTime}).
              </p>

              {/* Reservation Code Badge */}
              <div style={{
                background: 'rgba(0, 163, 255, 0.1)',
                border: '1.5px dashed #00A3FF',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '32px'
              }}>
                <span style={{ fontSize: '0.82rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Booking Reference Number
                </span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00A3FF', marginTop: '4px' }}>
                  #{bookingRefId}
                </div>
              </div>

              {/* Hub Location Details */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-card)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'left',
                marginBottom: '32px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}>
                <MapPin size={24} color="#00A3FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Pickup Hub</h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    123 Rider Avenue, Sector 5, [City Name]
                  </p>
                  <p style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '4px' }}>
                    Open Mon-Sun 9:00 AM - 9:00 PM. Please bring your original driving licence.
                  </p>
                </div>
              </div>

              {/* Next Steps Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  className="btn-whatsapp"
                  style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '1rem' }}
                  onClick={() => onOpenWhatsApp(bike)}
                >
                  <MessageCircle size={18} />
                  <span>Receive Booking Confirmation on WhatsApp</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    className="btn-outline"
                    style={{ padding: '12px', justifyContent: 'center' }}
                    onClick={handleDownloadQuote}
                  >
                    <Download size={16} />
                    <span>Download Invoice</span>
                  </button>
                  <button
                    className="btn-outline"
                    style={{ padding: '12px', justifyContent: 'center', borderColor: '#00A3FF', color: '#00A3FF' }}
                    onClick={() => onNavigate('home')}
                  >
                    <span>Return to Home</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
