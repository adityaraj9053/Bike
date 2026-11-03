import React from 'react';
import { 
  Bike, 
  Search, 
  CalendarCheck, 
  MessageCircle, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { FAQS_DATA } from '../data/bikes';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorksPage({ onNavigate, onGoBack }) {
  const { t, language } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: Search,
      title: language === 'hi' ? 'बाइक्स खोजें' : 'Choose Your Motorcycle',
      description: language === 'hi'
        ? 'हमारे फ्लीट में से अपनी सवारी चुनें—चाहे वह क्रूजर हो, सुपरबाइक या आसान शहरी स्कूटर।'
        : 'Browse through our premium fleet. Filter by brand, engine capacity, or transmission to select the ideal machine for your route.'
    },
    {
      num: '02',
      icon: CalendarCheck,
      title: language === 'hi' ? 'तिथियां और 18+ सत्यापन' : 'Select Dates & Verify 18+',
      description: language === 'hi'
        ? 'पिकअप और वापसी की तिथि चुनें। 18+ आयु और वैध ड्राइविंग लाइसेंस की पुष्टि करें।'
        : 'Pick your ride dates and confirm the mandatory 18+ age & valid driving license requirements.'
    },
    {
      num: '03',
      icon: FileText,
      title: language === 'hi' ? 'दस्तावेज और बुकिंग' : 'Fast-Track Verification',
      description: language === 'hi'
        ? 'मूल ड्राइविंग लाइसेंस और सरकारी आईडी के साथ तुरंत पुष्टि प्राप्त करें।'
        : 'Present your driving license and ID proof. Minimal paperwork with transparent deposit terms.'
    },
    {
      num: '04',
      icon: Bike,
      title: language === 'hi' ? 'राइड शुरू करें' : 'Ignition & Ride Away',
      description: language === 'hi'
        ? 'हब से चाबी लें या डोरस्टेप डिलीवरी पाएं। 24/7 रोडसाइड सपोर्ट के साथ निश्चिंत सफर करें।'
        : 'Collect your sanitized vehicle from our hub or receive doorstep drop-off. Enjoy 24/7 emergency roadside support.'
    }
  ];

  return (
    <div className="how-it-works-page" style={{ padding: '40px 0 90px' }}>
      <div className="container">
        {/* Top Back Navigation Button */}
        {onGoBack && (
          <button 
            type="button" 
            className="page-back-btn" 
            onClick={onGoBack}
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={16} />
            <span>{language === 'hi' ? 'पिछला पेज' : 'Back'}</span>
          </button>
        )}

        {/* Page Header */}
        <div className="section-header" style={{ marginBottom: '60px' }}>
          <span className="section-pretitle">{language === 'hi' ? 'रेंटल प्रक्रिया' : 'SEAMLESS RESERVATIONS'}</span>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            {language === 'hi' ? 'यह कैसे काम करता है' : 'How The Road Eagle Works'}
          </h1>
          <p className="section-subtitle">
            {language === 'hi'
              ? '4 आसान चरणों में अपनी पसंदीदा बाइक बुक करें और तनाव-मुक्त यात्रा का आनंद लें।'
              : 'From bike discovery to key handover, renting a motorcycle has never been faster, safer, or more transparent.'}
          </p>
        </div>

        {/* 4 Steps Detailed Timeline */}
        <div className="steps-grid" style={{ marginBottom: '80px' }}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="step-card">
                <div className="step-number">{s.num}</div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(0, 163, 255, 0.1)',
                  color: '#00A3FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Icon size={22} />
                </div>
                <h3 className="step-title" style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{s.title}</h3>
                <p className="step-description">{s.description}</p>
              </div>
            );
          })}
        </div>

        {/* Rental Guidelines & Details - RESPONSIVE CLASS */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <h2 className="section-title">{language === 'hi' ? 'रेंटल दिशानिर्देश और नीतियां' : 'Rental Guidelines & Details'}</h2>
            <p className="section-subtitle">
              {language === 'hi' ? 'एक सुरक्षित और अनुपालन वाली सवारी के लिए जरूरी जानकारी।' : 'Everything you need to know for a smooth and compliant ride.'}
            </p>
          </div>

          <div className="two-col-grid">
            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <FileText size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>{language === 'hi' ? 'आवश्यक दस्तावेज (18+)' : 'Documents Required'}</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7' }}>
                • <strong>Original Driving Licence:</strong> Must hold a valid Two-Wheeler / Motorcycle license (A-Category). Learners licenses are not acceptable.<br />
                • <strong>Government Photo ID:</strong> Aadhaar Card, Passport, or Voter ID for address verification.<br />
                • <strong>Photographs:</strong> 2 passport-size photographs or quick biometric verification at hub pickup.
              </p>
            </div>

            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <ShieldCheck size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>{language === 'hi' ? 'सुरक्षा जमा राशि' : 'Security Deposit'}</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7' }}>
                • A refundable security deposit starting from <strong>₹1,500 to ₹5,000*</strong> is collected at vehicle handover.<br />
                • <strong>100% Refundable:</strong> Credited back to your original payment mode within 24 to 48 hours following vehicle inspection.
              </p>
            </div>

            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Clock size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>{language === 'hi' ? 'रेंटल अवधि व ईंधन नीति' : 'Rental Duration & Fuel Policy'}</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7' }}>
                • <strong>Minimum Rental:</strong> 24 hours. The rental clock starts from pickup time until the exact same time the following day.<br />
                • <strong>Fuel Policy:</strong> Same-to-same fuel level return. If picked up with a full tank, return with a full tank.<br />
                • <strong>Grace Period:</strong> A 30-minute buffer window is provided for return before overtime billing applies.
              </p>
            </div>

            <div className="booking-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <HelpCircle size={22} color="#00A3FF" />
                <h3 style={{ fontSize: '1.25rem' }}>{language === 'hi' ? '24/7 रोडसाइड सहायता' : 'Roadside Assistance & Support'}</h3>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7' }}>
                • In case of a mechanical breakdown, flat tire, or minor incident, call our 24/7 emergency dispatch helpline (+91 98765 43210).<br />
                • A mobile technician or replacement motorcycle is dispatched promptly within our operational radius.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <div className="section-header">
            <h2 className="section-title">{language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Common Rental Questions'}</h2>
            <p className="section-subtitle">
              {language === 'hi' ? 'रेंटल से जुड़े सभी मुख्य सवालों के जवाब।' : 'Quick answers to everything our riders ask.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '860px', margin: '0 auto' }}>
            {FAQS_DATA.map((faq, idx) => (
              <div 
                key={idx}
                className="booking-card"
                style={{ padding: '20px 24px' }}
              >
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#00A3FF' }}>{faq.question}</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6' }}>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button 
              className="btn-primary"
              onClick={() => onNavigate('motorbikes')}
              style={{ padding: '14px 36px', fontSize: '1rem' }}
            >
              <span>{language === 'hi' ? 'अभी बाइक चुनें और बुक करें' : 'Ready to Ride? Browse Fleet'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
