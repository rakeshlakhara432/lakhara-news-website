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
  url = "https://lakhara-news.com"
}: MetaProps) {
  const location = useLocation();
  const currentUrl = `${url}${location.pathname}`;
  const siteTitle = location.pathname === '/' ? title : `${title} | Lakhara Digital`;

  useEffect(() => {
    document.title = siteTitle;
    
    // Update Meta Tags
    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let element = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    updateMeta('description', description);
    updateMeta('og:title', siteTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:url', currentUrl, 'property');
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', siteTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

  }, [siteTitle, description, image, currentUrl]);

  return null;
}
