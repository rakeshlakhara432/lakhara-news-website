import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Megaphone, Users, Heart, Calendar, Image, GraduationCap, Phone, Zap, TrendingUp, Sparkles, ShoppingBag, Book, Info, ShieldCheck, Search, BookOpen } from 'lucide-react';

const menuItems = [
  {
    title: 'समाज',
    slug: 'samaj',
    icon: Users,
    subItems: [
      { name: 'हमारे बारे में', slug: 'about', desc: 'संस्था का इतिहास और उद्देश्य', icon: Info },
      { name: 'कार्यकारिणी', slug: 'committee', desc: 'समिति के सदस्य', icon: ShieldCheck },
      { name: 'सदस्य सूची', slug: 'directory', desc: 'पूरी डायरेक्टरी', icon: Search },
      { name: 'नियम', slug: 'rules', desc: 'समाज के नियम', icon: BookOpen },
    ]
  },
  {
    title: 'सेवाएं',
    slug: 'services',
    icon: Sparkles,
    subItems: [
      { name: 'विवाह मंच', slug: 'matrimonial', desc: 'रिश्तों का संगम', icon: Heart },
      { name: 'शिक्षा/सहायता', slug: 'support', icon: GraduationCap, desc: 'विद्यार्थी सहायता' },
      { name: 'सहायता केंद्र', slug: 'contact', icon: Phone, desc: '24/7 सहायता' },
      { name: 'पंजीकरण', slug: 'register', icon: Zap, desc: 'नए सदस्य' },
    ]
  },
   {
    title: 'मीडिया',
    slug: 'media',
    icon: Megaphone,
    subItems: [
      { name: 'समाचार', slug: 'news', desc: 'ताज़ा ख़बरें', icon: TrendingUp },
      { name: 'कार्यक्रम', slug: 'events', desc: 'आगामी उत्सव', icon: Calendar },
      { name: 'गैलरी', slug: 'gallery', desc: 'पुरानी यादें', icon: Image },
      { name: 'समाज स्टोर', slug: 'store', desc: 'समाज के उत्पाद', icon: ShoppingBag },
      { name: 'ई-पुस्तकालय', slug: 'ebooks', desc: 'साहित्य व इतिहास', icon: Book },
    ]
  }
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="hidden lg:flex items-center gap-1">
      {menuItems.map((item) => (
        <div
          key={item.slug}
          className="relative px-4 py-2 group cursor-pointer"
          onMouseEnter={() => setActiveMenu(item.slug)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:text-primary transition-colors">
            <item.icon className="size-3" />
            <span>{item.title}</span>
            <ChevronDown className={`size-3 transition-transform ${activeMenu === item.slug ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {activeMenu === item.slug && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 w-[400px] bg-white border border-gray-200 shadow-2xl z-[500] p-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/${sub.slug}`}
                      className="group/sub flex flex-col gap-1 p-3 hover:bg-gray-50 border border-transparent hover:border-primary/20 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        {sub.icon && <sub.icon className="size-4 text-primary" />}
                        <span className="text-xs font-black uppercase tracking-tight text-gray-900 group-hover/sub:text-primary">
                          {sub.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">
                        {sub.desc}
                      </span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-primary animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Premium Upgrade</span>
                  </div>
                  <Link to="/news" className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline">
                    View All Activity &rarr;
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
