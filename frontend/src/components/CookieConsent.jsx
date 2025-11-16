import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // delay showing to avoid immediate pop on load
      const t = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(t);
    }
    // if consent already present, keep hidden
  }, []);

  // small mount helper to trigger CSS entry transition
  useEffect(() => {
    if (isVisible) {
      // wait a tick so CSS transition can run
      const t = setTimeout(() => setMounted(true), 20);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [isVisible]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full mx-4 transition-all transform ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div
        className="rounded-2xl shadow-2xl border border-gray-200 p-6 bg-white"
        style={{ backgroundColor: '#ffffff', color: '#111827' }}
      >
        <div className="flex items-start gap-4">
          <Cookie className="w-8 h-8 text-orange-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2">We use cookies</h3>
            <p className="text-gray-600 text-sm mb-4">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of
              cookies.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm rounded-md bg-orange-600 hover:bg-orange-700 text-white"
              >
                Accept All
              </button>

              <button onClick={handleDecline} className="px-4 py-2 text-sm rounded-md border">
                Decline
              </button>

              <Link to="/privacy" className="px-4 py-2 text-sm rounded-md hover:bg-base-200">
                Customize
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
