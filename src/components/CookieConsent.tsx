'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CookieConsent() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const consentValue = localStorage.getItem('cookieConsent');
    if (consentValue) setConsent(true);
  }, []);

  const handleAccept = () => {
    setConsent(true);
    localStorage.setItem('cookieConsent', 'true');
  };

  if (consent) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          We use cookies to improve your experience. By continuing, you agree to our{' '}
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>.
        </p>
        <Button variant="default" onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </div>
  );
}
