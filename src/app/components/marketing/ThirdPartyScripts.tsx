import { useEffect } from 'react';

export function ThirdPartyScripts() {
  useEffect(() => {
    // 1. Google Analytics / Tag Manager
    const gaScript = document.createElement('script');
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    gaScript.async = true;
    document.head.appendChild(gaScript);

    const gaConfig = document.createElement('script');
    gaConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `;
    document.head.appendChild(gaConfig);

    // 2. Facebook Pixel
    const fbPixel = document.createElement('script');
    fbPixel.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'PIXEL_ID');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbPixel);

    // 3. Google Pixel (Conversion)
    const googlePixel = document.createElement('script');
    googlePixel.innerHTML = `
      // Google Ads Pixel if needed
    `;
    document.head.appendChild(googlePixel);

    return () => {
      // Cleanup scripts if needed, though they usually persist
    };
  }, []);

  return null;
}
