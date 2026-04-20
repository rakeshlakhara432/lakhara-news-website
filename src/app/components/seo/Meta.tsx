import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function Meta({ 
  title = "Lakhara Digital News & Community Store", 
  description = "हिंदू लखारा समाज की एकता, संस्कृति और विकास के लिए समर्पित डिजिटल मंच। समाज स्टोर, विवाह मंच और ताज़ा न्यूज़।",
  image = "/lakhara.png",
  url = "https://lakhara-news-website.com"
}: MetaProps) {
  const location = useLocation();
  const siteTitle = location.pathname === '/' ? title : `${title} | Lakhara Digital`;
  const currentUrl = `${url}${location.pathname}`;

  useEffect(() => {
    // Update Document Title
    document.title = siteTitle;
    
    // Standardized Meta Manager
    const setMeta = (attr: string, value: string, content: string) => {
      let el = document.head.querySelector(`meta[${attr}="${value}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Essential Meta
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow');
    setMeta('name', 'viewport', 'width=device-width, initial-scale=1, maximum-scale=5');
    setMeta('name', 'theme-color', '#ea580c'); // Orange-600

    // Open Graph / Facebook
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', currentUrl);
    setMeta('property', 'og:title', siteTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:url', currentUrl);
    setMeta('name', 'twitter:title', siteTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

  }, [siteTitle, description, image, currentUrl]);

  return null;
}
