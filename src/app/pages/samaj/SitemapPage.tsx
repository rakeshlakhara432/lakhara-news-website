import { Link } from 'react-router';
import { Network, Globe, Search, ShoppingBag, Heart, Calendar } from 'lucide-react';

const links = [
  { group: 'Main Pages', items: [
    { name: 'Home', path: '/', icon: Globe },
    { name: 'About Us', path: '/about', icon: Network },
    { name: 'Contact', path: '/contact', icon: Search },
    { name: 'Directory', path: '/directory', icon: Search },
  ]},
  { group: 'Community', items: [
    { name: 'Matrimonial', path: '/matrimonial', icon: Heart },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Committee', path: '/committee', icon: Network },
    { name: 'Gallery', path: '/gallery', icon: Network },
  ]},
  { group: 'Media & Commerce', items: [
    { name: 'Store', path: '/store', icon: ShoppingBag },
    { name: 'News', path: '/news', icon: Network },
    { name: 'Videos', path: '/news', icon: Network },
  ]}
];

export function SitemapPage() {
  return (
    <div className="container mx-auto max-w-4xl py-20 px-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="traditional-header justify-center uppercase">Sitemap & Directory</h1>
        <p className="text-gray-500 font-bold text-sm">लखारा समाज डिजिटल नेटवर्क का संपूर्ण मार्गदर्शन।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {links.map((group) => (
          <div key={group.group} className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
               <div className="size-1 bg-primary"></div> {group.group}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-sm font-bold text-gray-700 hover:text-primary flex items-center gap-3 group transition-colors"
                  >
                    <item.icon className="size-4 text-gray-300 group-hover:text-primary" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-10 border border-gray-100 text-center space-y-4">
         <h4 className="font-black uppercase text-xs text-gray-900 tracking-widest">Automatic Indexing Active</h4>
         <p className="text-[10px] font-bold text-gray-400 max-w-sm mx-auto leading-relaxed uppercase tracking-[0.2em]">
            This sitemap is dynamically updated for Google Search Console and social sharing.
         </p>
      </div>
    </div>
  );
}
