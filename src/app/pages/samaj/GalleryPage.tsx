import { Camera, ArrowRight, PlayCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { samajService, GalleryImage } from "../../services/samajService";

export function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToGallery((data) => {
      setGalleryImages(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const albums = [
    { title: "महासम्मेलन 2025", count: "120 फोटो", image: "https://picsum.photos/seed/alb1/800/600", category: "event" },
    { title: "संगठनात्मक बैठक", count: "45 फोटो", image: "https://picsum.photos/seed/alb2/800/600", category: "meeting" },
    { title: "युवा गौरव सम्मान", count: "85 फोटो", image: "https://picsum.photos/seed/alb3/800/600", category: "event" },
    { title: "सांस्कृतिक उत्सव", count: "210 फोटो", image: "https://picsum.photos/seed/alb4/800/600", category: "cultural" },
  ];

  const videos = [
    { title: "समाज की महाआरती 2026", duration: "12:45", image: "https://picsum.photos/seed/vid1/800/600" },
    { title: "अध्यक्ष महोदय का संदेश", duration: "05:20", image: "https://picsum.photos/seed/vid2/800/600" },
    { title: "संस्कृति गौरव फिल्म", duration: "25:00", image: "https://picsum.photos/seed/vid3/800/600" },
  ];

  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 🖼️ HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-sm">
            <Camera className="size-8" />
         </div>
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">स्मृति <span className="text-orange-600">कलश</span></h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Our Memories • Photos • Videos</p>
         </div>
      </section>

      {/* 🎞️ VIDEO SECTION */}
      <section className="container mx-auto px-6 lg:px-0 space-y-8">
         <div className="flex items-center justify-between border-l-4 border-orange-600 pl-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">वीडियो <span className="text-orange-600">संग्रह</span></h2>
            <button className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1">सभी देखें <ArrowRight className="size-4" /></button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid, i) => (
               <div key={i} className="group aspect-video bg-slate-900 rounded-2xl overflow-hidden relative cursor-pointer shadow-sm">
                  <img src={vid.image} className="size-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <PlayCircle className="size-16 text-white opacity-80 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-x-4 bottom-4 space-y-1">
                     <h4 className="text-sm font-bold text-white line-clamp-1">{vid.title}</h4>
                     <div className="text-[10px] font-bold text-white bg-slate-800/80 px-2 py-0.5 rounded w-fit backdrop-blur-sm">{vid.duration}</div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 📸 PHOTO ARCHIVE GRID */}
      <section className="container mx-auto px-6 lg:px-0 space-y-8">
         <div className="flex items-center gap-3 border-l-4 border-orange-600 pl-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">डिजिटल <span className="text-orange-600">आरकाइव</span></h2>
         </div>
         
         {isLoading ? (
           <div className="flex justify-center py-16">
             <Loader2 className="size-8 text-orange-600 animate-spin" />
           </div>
         ) : (
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="group aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-sm relative focus:outline-none">
                   <img src={img.url} className="size-full object-cover group-hover:scale-110 transition-transform duration-500" alt={img.caption} />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Camera className="size-6 text-white" />
                   </div>
                </div>
              ))}
              {galleryImages.length === 0 && (
                <div className="col-span-full py-16 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <p className="text-slate-500 font-medium text-sm">No archive assets detected</p>
                </div>
              )}
           </div>
         )}
      </section>

      {/* 📸 OLD ALBUMS GRID */}
      <section className="container mx-auto px-6 lg:px-0 space-y-8">
         <div className="flex items-center gap-3 border-l-4 border-slate-300 pl-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">पुराने <span className="text-slate-400">एलबम</span></h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {albums.map((alb, i) => (
              <div key={i} className="group bg-white p-4 rounded-2xl border border-slate-200 hover:shadow-md hover:border-orange-200 transition-all text-center space-y-4">
                 <div className="aspect-square rounded-xl bg-slate-50 overflow-hidden relative">
                    <img src={alb.image} className="size-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
                 <div>
                    <h3 className="text-base font-bold text-slate-800 line-clamp-1">{alb.title}</h3>
                    <div className="text-xs font-semibold text-orange-600 mt-1">{alb.count}</div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 🏛️ MEMORY WALL BANNER */}
      <section className="container mx-auto px-6 lg:px-0">
         <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 space-y-8 relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute -top-24 -right-24 size-64 bg-orange-600/20 blur-3xl rounded-full"></div>
            <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
               <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  ॥ स्मृति वंदन ॥
               </div>
               <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  समाज की हर <span className="text-orange-500">सुनहरी याद</span> <br className="hidden md:block" /> यहाँ सुरक्षित है
               </h2>
               <p className="text-slate-400 font-medium text-sm md:text-base">
                  विगत आयोजनों, सम्मेलनों और सांस्कृतिक उत्सवों की झलकियों को सहेजने का हमारा निरंतर प्रयास। समाज की गौरवगाथा अब डिजिटल पन्नों पर।
               </p>
               <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors shadow text-sm">
                     अपनी तस्वीरें साझा करें
                  </button>
                  <button className="px-6 py-2.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 text-sm">
                     पुराना आरकाइव
                  </button>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
