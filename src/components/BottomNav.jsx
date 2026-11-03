import React from 'react';
import { Home, Bike, MessageCircle, FileText, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNav({ 
  activePage, 
  onNavigate, 
  onOpenWhatsApp, 
  onOpenAuth, 
  user 
}) {
  const { t, language } = useLanguage();

  const navItems = [
    {
      id: 'home',
      label: t('navHome'),
      icon: Home,
      action: () => onNavigate('home')
    },
    {
      id: 'motorbikes',
      label: t('navMotorbikes'),
      icon: Bike,
      action: () => onNavigate('motorbikes')
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      isSpecial: true,
      action: () => onOpenWhatsApp()
    },
    {
      id: 'how-it-works',
      label: language === 'hi' ? 'नियम' : 'How It Works',
      icon: FileText,
      action: () => onNavigate('how-it-works')
    },
    {
      id: 'auth',
      label: user ? user.name.split(' ')[0] : t('navLogin'),
      icon: User,
      action: () => onOpenAuth()
    }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <div className="bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                type="button"
                className="bottom-nav-item bottom-nav-special"
                onClick={item.action}
                title="Chat on WhatsApp"
              >
                <div className="bottom-nav-special-icon">
                  <Icon size={22} color="#ffffff" />
                </div>
                <span style={{ color: '#25D366', fontWeight: 700 }}>{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={item.action}
            >
              <div className="bottom-nav-icon-wrap">
                <Icon size={20} />
                {isActive && <span className="bottom-nav-active-dot"></span>}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
