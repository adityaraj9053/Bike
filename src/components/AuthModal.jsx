import React, { useState } from 'react';
import { X, LogIn, Mail, Check } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, user }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    onLogin({
      name: 'Rider Alex',
      email: 'alex.rider@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    });
    onClose();
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onLogin({
      name: name || email.split('@')[0],
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    });
    onClose();
  };

  const handleSignOut = () => {
    onLogin(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {user ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '14px', border: '2px solid #00A3FF' }}
            />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>Welcome back, {user.name}!</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '24px' }}>{user.email}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn-outline"
                style={{ width: '100%', borderColor: '#EF4444', color: '#EF4444' }}
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, textAlign: 'center', marginBottom: '8px' }}>
              {isSignUp ? 'Create Rider Account' : 'Sign In to The Road Eagle'}
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', textAlign: 'center', marginBottom: '28px' }}>
              Manage your motorcycle bookings, fast track document verification, and access exclusive member rates.
            </p>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                background: '#ffffff',
                color: '#000000',
                fontWeight: 600,
                padding: '13px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '0.95rem',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <span style={{ color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {isSignUp && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '13px', marginTop: '6px' }}
              >
                <span>{isSignUp ? 'Create Free Account' : 'Continue with email'}</span>
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ background: 'none', border: 'none', color: '#00A3FF', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
