import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import { COUNTRY_CODES } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage({ onShowToast, onOpenWhatsApp, onGoBack }) {
  const { t, language } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBikeId, setSelectedBikeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = phoneNumber.replace(/\D/g, '');

    if (!clean || (countryCode === '+91' ? clean.length !== 10 : clean.length < 7)) {
      onShowToast?.(
        language === 'hi'
          ? 'कृपया एक मान्य मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid mobile number.'
      );
      return;
    }

    setSubmitted(true);
    onShowToast?.(
      language === 'hi'
        ? 'संदेश प्राप्त हुआ! हमारी टीम शीघ्र ही आपसे संपर्क करेगी।'
        : 'Inquiry received! Our team will contact you shortly.'
    );

    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setCountryCode('+91');
      setPhoneNumber('');
      setEmail('');
      setSelectedBikeId('');
      setStartDate('');
      setEndDate('');
      setMessage('');
    }, 2500);
  };

  return (
    <div className="contact-page" style={{ padding: '40px 0 90px' }}>
      <div className="container">
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

        <div className="section-header" style={{ marginBottom: '60px' }}>
          <span className="section-pretitle">
            {language === 'hi' ? 'हमसे संपर्क करें' : 'GET IN TOUCH'}
          </span>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            {language === 'hi'
              ? 'हम आपकी सहायता के लिए तैयार हैं'
              : "We're Here to Help You Ride"}
          </h1>
          <p className="section-subtitle">
            {language === 'hi'
              ? 'बाइक्स, रेंटल नीतियों या कस्टम टूरिंग पैकेज के बारे में कोई प्रश्न? सीधे कॉल करें या संदेश भेजें।'
              : 'Have questions about bike availability, rental rules, or custom route requirements? Reach out directly.'}
          </p>
        </div>

        <div className="contact-grid">
          <div className="booking-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
              {language === 'hi' ? 'त्वरित संदेश या पूछताछ भेजें' : 'Send an Instant Message'}
            </h2>