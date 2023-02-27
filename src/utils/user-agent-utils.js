import { useEffect, useState } from 'react';

export default function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator !== 'undefined' &&
      navigator.userAgent.toLowerCase();
    if (
      userAgent &&
      userAgent.indexOf('safari') !== -1 &&
      userAgent.indexOf('chrome') === -1
    ) {
      setIsSafari(true);
    }
  }, []);
  return isSafari;
}
