import React, { useEffect, useState } from 'react';

import Cookies from 'components/cookies';

const { REACT_APP_GA_MEASUREMENT_ID } = process.env;
const consentCookieName = 'HE_COOKIES_CONSENT';
function ThirdParty() {
  const [isOpenCookies, setOpen] = useState(false);
  const [scriptAdded, setScriptAdded] = useState(false);
  const consentCookie = localStorage.getItem(consentCookieName);

  useEffect(() => {
    if (consentCookie === 'true' && !scriptAdded) {
      const script1 = document.createElement('script');
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${REACT_APP_GA_MEASUREMENT_ID}`;
      script1.async = true;

      const script2 = document.createElement('script');
      script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${REACT_APP_GA_MEASUREMENT_ID}');
      `;
      script2.async = true;

      document.body.appendChild(script1);
      document.body.appendChild(script2);

      setScriptAdded(true);
    }
  }, [consentCookie, scriptAdded]);

  const setConsentCookie = (cookie: string) =>
    localStorage.setItem(consentCookieName, cookie);

  const handleCookieClick = (c: boolean) => {
    setConsentCookie(String(c));
    setOpen(false);
  };

  useEffect(() => {
    if (!consentCookie) {
      setOpen(true);
    }
  }, [consentCookie]);

  return (
    <Cookies
      open={isOpenCookies}
      onAccept={() => handleCookieClick(true)}
      onReject={() => handleCookieClick(false)}
    />
  );
}

export default ThirdParty;
