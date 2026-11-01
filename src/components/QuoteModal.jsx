import React from 'react';
import { X, Printer, Compass, CheckCircle2 } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, bookingData, bike }) {
  if (!isOpen || !bike) return null;

  const handlePrint = () => {
    window.print();
  };

  const bookingRef = bookingData?.refId || 'RDE-784920';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', background: '#ffffff', color: '#0f172a' }}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          style={{ background: '#f1f5f9', color: '#334155', border: 'none' }}
        >
          <X size={18} />
        </button>

        {/* Printable Voucher Header */}
        <div style={{ borderBottom: '2px solid #00A3FF', paddingBottom: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: 800, fontSize: '1.2rem', marginBottom: '4px' }}>
                <Compass size={24} color="#0284c7" />
                <span>THE ROAD EAGLE</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Premium Motorcycle & Scooter Rentals</p>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>123 Rider Avenue, Sector 5 • support@theroadeagle.com</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '4px' }}>
                OFFICIAL QUOTATION / VOUCHER
              </span>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '8px', color: '#0f172a' }}>Ref: #{bookingRef}</p>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div style={{ display: 'flex', gap: '20px', background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
          <img
            src={bike.image}
            alt={bike.name}
            style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
          />
          <div>
            <h4 style={{ fontSize: '1.15rem', color: '#0f172a', margin: '0 0 4px' }}>{bike.name}</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 8px' }}>{bike.model} • {bike.specs?.displacement}</p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#334155' }}>
              <span><strong>Pickup:</strong> {bookingData.pickupDate} ({bookingData.pickupTime})</span>
              <span><strong>Return:</strong> {bookingData.returnDate} ({bookingData.returnTime})</span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '24px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
              <th style={{ padding: '10px 12px' }}>Description</th>
              <th style={{ padding: '10px 12px', textAlign: 'center' }}>Duration</th>
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Base Rental ({bike.name}) @ ₹{bike.pricePerDay}/day</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{bookingData.days} Days</td>
              <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600 }}>₹{bookingData.rentalCharge.toLocaleString()}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Refundable Security Deposit (Returned post vehicle inspection)</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>-</td>
              <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#0284c7' }}>₹{bike.deposit.toLocaleString()}*</td>
            </tr>
            <tr style={{ borderBottom: '2px solid #0f172a', background: '#f8fafc' }}>
              <td style={{ padding: '14px 12px', fontWeight: 800 }}>Total Estimated Payable</td>
              <td style={{ padding: '14px 12px' }}></td>
              <td style={{ padding: '14px 12px', textAlign: 'right', fontWeight: 800, fontSize: '1.15rem', color: '#0284c7' }}>
                ₹{(bookingData.rentalCharge + bike.deposit).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pickup checklist */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '12px 16px', fontSize: '0.82rem', color: '#1e40af', marginBottom: '24px' }}>
          <strong>Mandatory at Pickup:</strong> Original Driving Licence, Government ID (Aadhaar/Passport), 2 Photographs. 1 Helmet included complimentary.
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '10px 20px', borderRadius: '6px', background: '#f1f5f9', color: '#334155', fontWeight: 600 }}
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            style={{
              padding: '10px 24px',
              borderRadius: '6px',
              background: '#0284c7',
              color: '#ffffff',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Printer size={16} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
