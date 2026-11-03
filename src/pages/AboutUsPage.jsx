import React from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  HeartHandshake, 
  Compass, 
  Users, 
  MapPin, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutUsPage({ onNavigate }) {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: ShieldCheck,
      title: language === 'hi' ? 'सख्त सुरक्षा मानक' : 'Uncompromising Safety',
      description: language === 'hi' 
        ? 'हर रेंटल से पहले 24-पॉइंट विस्तृत निरीक्षण सुनिश्चित करता है कि वाहन बेहतरीन स्थिति में हो।'
        : 'Every machine undergoes a strict 24-point pre-delivery check by certified mechanics before handing over the keys.'
    },
    {
      icon: Wrench,
      title: language === 'hi' ? 'प्रीमियम रखरखाव' : 'Factory-Grade Fleet',
      description: language === 'hi' 
        ? 'हमारी वर्कशॉप में केवल ओरिजिनल पार्ट्स और समय पर सर्विसिंग का इस्तेमाल होता है।'
        : 'We only house modern, meticulously maintained machines with authentic factory replacement parts and pristine tires.'
    },
    {
      icon: HeartHandshake,
      title: language === 'hi' ? 'पारदर्शी नीतियां' : 'Honest & Transparent',
      description: language === 'hi' 
        ? 'कोई छिपा शुल्क नहीं। स्पष्ट नियम और 100% रिफंडेबल सिक्योरिटी डिपॉजिट।'
        : 'Zero hidden fees, zero surprise check-in charges, and 100% refundable security deposits returned without delay.'
    },
    {
      icon: Compass,
      title: language === 'hi' ? 'राइडर समुदाय' : 'Rider-First Passion',
      description: language === 'hi' 
        ? 'हम केवल बाइक किराए पर नहीं देते, बल्कि आपको सही रूट और टूरिंग टिप्स भी साझा करते हैं।'
        : 'We are passionate riders ourselves, always eager to share the best local mountain passes, urban shortcuts, and touring advice.'
    }
  ];

  return (
    <div className="about-page" style={{ padding: '40px 0 90px' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header" style={{ marginBottom: '60px' }}>
          <span className="section-pretitle">{language === 'hi' ? 'हमारे बारे में' : 'ABOUT THE ROAD EAGLE'}</span>
          <h1 className="section-title" style={{ fontSize: '3rem' }}>
            {language === 'hi' ? 'सफर के प्रति समर्पण' : 'Driven by Passion for the Open Road'}
          </h1>
          <p className="section-subtitle">
            {language === 'hi' 
              ? 'राइडर्स द्वारा स्थापित, राइडर्स के लिए समर्पित। प्रीमियम मोटरसाइकिल रेंटल में आपका भरोसेमंद साथी।'
              : 'Built by riders, for riders. We believe two wheels offer the purest connection between people and the places they explore.'}
          </p>
        </div>

        {/* Stats Strip */}
        <div className="stats-strip-grid">
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A3FF', fontFamily: 'var(--font-heading)' }}>500+</div>
            <div style={{ color: '#94A3B8', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              {language === 'hi' ? 'संतुष्ट राइडर्स' : 'ACTIVE RIDERS MONTHLY'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A3FF', fontFamily: 'var(--font-heading)' }}>98%</div>
            <div style={{ color: '#94A3B8', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              {language === 'hi' ? 'संतुष्टि दर' : 'CUSTOMER SATISFACTION'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A3FF', fontFamily: 'var(--font-heading)' }}>50+</div>
            <div style={{ color: '#94A3B8', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              {language === 'hi' ? 'प्रीमियम बाइक्स' : 'CURATED MOTORBIKES'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A3FF', fontFamily: 'var(--font-heading)' }}>24/7</div>
            <div style={{ color: '#94A3B8', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              {language === 'hi' ? 'रोडसाइड सपोर्ट' : 'ROADSIDE SUPPORT'}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="story-grid" style={{ marginBottom: '80px' }}>
          <div className="story-image-wrap" style={{ height: '400px' }}>
            <img src="/images/workshop.jpg" alt="The Road Eagle Workshop" className="story-image" />
          </div>
          <div className="story-content">
            <span className="story-tag">{language === 'hi' ? 'हमारा मिशन' : 'OUR MISSION'}</span>
            <h2 className="story-title" style={{ fontSize: '2.2rem' }}>
              {language === 'hi' ? 'सवारी के अनुभव को पुनर्परिभाषित करना' : 'Redefining Urban & Touring Mobility'}
            </h2>
            <p className="story-text">
              {language === 'hi'
                ? 'हमने द रोड ईगल की शुरुआत एक स्पष्ट दृष्टिकोण के साथ की: क्षेत्र में सबसे भरोसेमंद मोटरसाइकिल रेंटल सेवा बनना, जो सुरक्षा, पारदर्शिता और उत्कृष्ट ग्राहक सेवा के लिए जानी जाए।'
                : 'We started The Road Eagle with a clear vision: to become the most trusted motorcycle rental partner in the region, recognized for uncompromising vehicle maintenance, transparent policies, and stellar customer service.'}
            </p>
            <p className="story-text">
              {language === 'hi'
                ? 'चाहे आपको शहर के ट्रैफिक से बचने के लिए एक फुर्तीला स्कूटर चाहिए, या पहाड़ों के लिए एक क्लासिक क्रूजर, हमारी टीम सुनिश्चित करती है कि हर बाइक तैयार और सुरक्षित हो।'
                : 'Whether you need an efficient scooter to bypass traffic or a classic cruiser to conquer mountain passes, our team ensures every ride is pristine, fully inspected, and ready for departure.'}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <h2 className="section-title">{language === 'hi' ? 'हमारे मार्गदर्शक सिद्धांत' : 'Our Guiding Values'}</h2>
            <p className="section-subtitle">
              {language === 'hi' ? 'जो हमें हर किलोमीटर पर सबसे अलग बनाते हैं।' : 'What sets us apart on every kilometer of your journey.'}
            </p>
          </div>

          <div className="values-grid">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="value-card"
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(0, 163, 255, 0.15)',
                    color: '#00A3FF',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{val.title}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
