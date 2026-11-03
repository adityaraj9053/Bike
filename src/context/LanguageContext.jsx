import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    navHome: "Home",
    navMotorbikes: "Motorbikes",
    navHowItWorks: "How It Works",
    navAboutUs: "About Us",
    navContactUs: "Contact Us",
    navBookNow: "Book Now",
    navEnquireWhatsApp: "Enquire on WhatsApp",
    navLogin: "Log In",
    navAccount: "Account",
    navSignOut: "Sign Out",

    // Hero & Common
    heroTag: "THEROADEAGLE.COM",
    heroTitlePart1: "Your Ride, Your Route,",
    heroTitlePart2: "Your Freedom.",
    heroSubtitle: "Discover the open roads on two wheels. Find the perfect bike for your journey, from agile urban scooters to high-performance cruisers and superbikes.",
    exploreBikes: "Explore Bikes",
    enquireWhatsApp: "Enquire on WhatsApp",
    callConcierge: "Call Concierge",

    // Feature Strip
    featMultipleBikes: "Multiple Bike Options",
    featPricing: "Transparent Pricing",
    featSupport: "Customer Assistance",
    featEnquiries: "Easy Enquiries",

    // Bike Cards
    bookThisBike: "Book this bike",
    btnBook: "Book Now",
    btnWhatsAppShort: "WhatsApp",
    viewDetails: "View Details",
    perDay: "/ day",
    from: "from",
    verifiedInspection: "Verified 24-Point Mechanical Inspection Completed",
    availableNow: "Available Now",

    // 18+ Verification
    ageTitle: "Age Verification Required",
    ageNotice: "Government Age & License Compliance",
    ageDescription: "You must be strictly 18 years of age or older and possess a valid driving license (or International Driving Permit) to rent and ride our motorcycles.",
    ageConfirm: "Yes, I am 18+ & Have License",
    ageCancel: "No, I am under 18",
    ageReminderBanner: "🔞 Mandatory 18+ Compliance: Rider must be at least 18 years old and carry a valid original driving license at the time of bike handover.",

    // Booking Page
    bookingTitle: "When are you riding?",
    bookingSubtitle: "Select your pickup and return dates to see vehicle availability and exact pricing.",
    pickupDate: "Pickup Date",
    pickupTime: "Pickup Time",
    returnDate: "Return Date",
    returnTime: "Return Time",
    continueSummary: "Continue to Summary",
    backToDates: "Back to Dates",
    riderInfo: "Rider Information",
    riderName: "Full Name",
    riderPhone: "Mobile Number",
    riderEmail: "Email Address",
    countryCodeNote: "Country code (+91) - 10 digit Indian mobile number",
    paymentBreakdown: "Payment Breakdown",
    rentalCharges: "Rental Charges",
    securityDeposit: "Security Deposit (Refundable*)",
    totalPayable: "Total Payable Amount",
    confirmAndPay: "Confirm & Book Now",
    bookingConfirmed: "Booking Confirmed!",

    // Auth
    signInTitle: "Sign In to The Road Eagle",
    signUpTitle: "Create Rider Account",
    authSubtitle: "Manage your motorcycle bookings, fast track verification, and access exclusive member rates.",
    loginWithPhone: "Login with Phone (OTP)",
    loginWithEmail: "Login with Email (OTP)",
    phoneNoPasswordNote: "Password not required! We will verify you via quick OTP.",
    phoneNumberLabel: "10-Digit Mobile Number",
    enterOtpLabel: "Enter 4-Digit OTP",
    sendOtpBtn: "Send OTP",
    verifyAndLoginBtn: "Verify OTP & Continue",
    signUpBtn: "Register & Send OTP",
    alreadyAccount: "Already have an account? Sign In",
    noAccount: "Don't have an account? Sign Up",
    forgotPasswordText: "Forgot Password / Reset OTP",
    forgotTitle: "Reset Your Account",
    forgotSubtitle: "Enter your phone or email to receive a login verification code.",
    sendResetOtp: "Send Recovery OTP",
    backToLogin: "Back to Sign In",

    // Enquiry
    enquiryTitle: "Instant Rental Enquiry",
    enquirySubtitle: "Reach out via direct call, WhatsApp, or request an instant callback.",
    directCallBtn: "Call Now: +91 98765 43210",
    openWhatsAppBtn: "Chat on WhatsApp Directly",
    submitFormBtn: "Request Free Callback",
    emailLoggedInPhoneNotice: "You signed in via email. Please provide your phone number so our team can contact you.",
    phonePreFilledNotice: "Your verified phone number will be used for callback."
  },

  hi: {
    // Navigation
    navHome: "होम",
    navMotorbikes: "मोटरसाइकिलें",
    navHowItWorks: "यह कैसे काम करता है",
    navAboutUs: "हमारे बारे में",
    navContactUs: "संपर्क करें",
    navBookNow: "अभी बुक करें",
    navEnquireWhatsApp: "व्हाट्सएप पूछताछ",
    navLogin: "लॉग इन",
    navAccount: "प्रोफ़ाइल",
    navSignOut: "साइन आउट",

    // Hero & Common
    heroTag: "THEROADEAGLE.COM",
    heroTitlePart1: "आपकी सवारी, आपका रास्ता,",
    heroTitlePart2: "आपकी आज़ादी।",
    heroSubtitle: "दो पहियों पर शहर और खुली सड़कों का आनंद लें। शहरी स्कूटर से लेकर हाई-परफॉर्मेंस क्रूजर और सुपरबाइक तक, अपनी पसंदीदा बाइक चुनें।",
    exploreBikes: "बाइक्स देखें",
    enquireWhatsApp: "व्हाट्सएप पर पूछें",
    callConcierge: "कॉल करें",

    // Feature Strip
    featMultipleBikes: "अनेक बाइक विकल्प",
    featPricing: "पारदर्शी किराया",
    featSupport: "24/7 ग्राहक सहायता",
    featEnquiries: "आसान पूछताछ",

    // Bike Cards
    bookThisBike: "यह बाइक बुक करें",
    btnBook: "बुक करें",
    btnWhatsAppShort: "व्हाट्सएप",
    viewDetails: "विवरण देखें",
    perDay: "/ दिन",
    from: "शुरू",
    verifiedInspection: "24-पॉइंट सुरक्षा एवं तकनीकी जांच प्रमाणित",
    availableNow: "उपलब्ध है",

    // 18+ Verification
    ageTitle: "18+ आयु सत्यापन अनिवार्य",
    ageNotice: "सरकारी नियम एवं लाइसेंस अनुपालन",
    ageDescription: "मोटरसाइकिल किराए पर लेने और चलाने के लिए आपकी आयु कम से कम 18 वर्ष और आपके पास वैध ड्राइविंग लाइसेंस होना अनिवार्य है।",
    ageConfirm: "हाँ, मैं 18+ हूँ और लाइसेंस है",
    ageCancel: "नहीं, मेरी आयु 18 से कम है",
    ageReminderBanner: "🔞 अनिवार्य 18+ नियम: राइडर की आयु 18 वर्ष से अधिक होनी चाहिए और बाइक लेते समय मूल ड्राइविंग लाइसेंस दिखाना अनिवार्य है।",

    // Booking Page
    bookingTitle: "आप कब राइड करना चाहते हैं?",
    bookingSubtitle: "वाहन की उपलब्धता और सही किराया जानने के लिए अपनी पिकअप और वापसी तिथि चुनें।",
    pickupDate: "पिकअप तिथि",
    pickupTime: "पिकअप समय",
    returnDate: "वापसी तिथि",
    returnTime: "वापसी समय",
    continueSummary: "सारांश और भुगतान पर जाएं",
    backToDates: "तिथियों पर वापस जाएं",
    riderInfo: "राइडर की जानकारी",
    riderName: "पूरा नाम",
    riderPhone: "मोबाइल नंबर",
    riderEmail: "ईमेल पता",
    countryCodeNote: "कंट्री कोड (+91) - 10 अंकों का भारतीय मोबाइल नंबर",
    paymentBreakdown: "किराया विवरण",
    rentalCharges: "कुल किराया",
    securityDeposit: "सिक्योरिटी डिपॉजिट (वापसी योग्य*)",
    totalPayable: "कुल देय राशि",
    confirmAndPay: "पुष्टि करें और बुक करें",
    bookingConfirmed: "बुकिंग की पुष्टि हो गई!",

    // Auth
    signInTitle: "द रोड ईगल में लॉग इन करें",
    signUpTitle: "नया राइडर खाता बनाएं",
    authSubtitle: "अपनी बुकिंग प्रबंधित करें, त्वरित सत्यापन प्राप्त करें और विशेष सदस्य दरों का लाभ उठाएं।",
    loginWithPhone: "फोन से लॉग इन (OTP)",
    loginWithEmail: "ईमेल से लॉग इन (OTP)",
    phoneNoPasswordNote: "पासवर्ड की जरूरत नहीं! हम त्वरित OTP द्वारा सत्यापन करेंगे।",
    phoneNumberLabel: "10-अंकों का मोबाइल नंबर",
    enterOtpLabel: "4-अंकों का OTP दर्ज करें",
    sendOtpBtn: "OTP भेजें",
    verifyAndLoginBtn: "OTP सत्यापित करें और जारी रखें",
    signUpBtn: "पंजीकरण करें और OTP भेजें",
    alreadyAccount: "क्या आपका खाता पहले से है? लॉग इन करें",
    noAccount: "खाता नहीं है? साइन अप करें",
    forgotPasswordText: "पासवर्ड भूल गए / OTP रीसेट करें",
    forgotTitle: "अपना खाता पुनर्प्राप्त करें",
    forgotSubtitle: "लॉगिन सत्यापन कोड प्राप्त करने के लिए अपना फोन या ईमेल दर्ज करें।",
    sendResetOtp: "रिकवरी OTP भेजें",
    backToLogin: "साइन इन पर वापस जाएं",

    // Enquiry
    enquiryTitle: "तुरंत रेंटल पूछताछ",
    enquirySubtitle: "सीधे कॉल करें, व्हाट्सएप पर चैट करें, या तुरंत कॉलबैक का अनुरोध करें।",
    directCallBtn: "अभी कॉल करें: +91 98765 43210",
    openWhatsAppBtn: "सीधे व्हाट्सएप पर चैट करें",
    submitFormBtn: "निःशुल्क कॉलबैक अनुरोध करें",
    emailLoggedInPhoneNotice: "आपने ईमेल से लॉग इन किया है। कृपया अपना फोन नंबर दर्ज करें ताकि हमारी टीम आपसे संपर्क कर सके।",
    phonePreFilledNotice: "आपके सत्यापित फोन नंबर पर संपर्क किया जाएगा।"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
