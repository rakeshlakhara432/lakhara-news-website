import { Camera, ArrowRight, PlayCircle, Loader2, X, ZoomIn } from "lucide-react";
import { useState, useEffect } from "react";
import { samajService, GalleryImage } from "../../services/samajService";
import { motion, AnimatePresence } from "framer-motion";

export function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToGallery((data) => {
      setGalleryImages(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const videos = [
    { title: "समाज की महाआरती 2026", duration: "12:45", image: "https://picsum.photos/seed/vid1/800/600" },
    { title: "अध्यक्ष महोदय का संदेश", duration: "05:20", image: "https://picsum.photos/seed/vid2/800/600" },
    { title: "संस्कृति गौरव फिल्म", duration: "25:00", image: "https://picsum.photos/seed/vid3/800/600" },
  ];

  return (
    <div className="space-y-16 pb-24 animate-in fade-in duration-700">
      
      {/* 🖼️ HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20">
            <Camera className="size-8" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">स्मृति <span className="text-orange-600">कलश</span></h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">OUR MEMORIES • PHOTOS • VIDEOS</p>
         </div>
      </section>

      {/* 🎞️ VIDEO SECTION */}
      <section className="space-y-8">
         <div className="flex items-center justify-between border-l-8 border-orange-600 pl-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">वीडियो <span className="text-orange-600">संग्रह</span></h2>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">LATEST BROADCASTS</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">সকল देखें <ArrowRight className="size-4" /></button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((vid, i) => (
               <div key={i} className="group aspect-video bg-slate-950 rounded-3xl overflow-hidden relative cursor-pointer shadow-xl border border-slate-100">
                  <img src={vid.image} className="size-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <div className="size-16 bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center rounded-full scale-90 group-hover:scale-100 transition-all duration-500">
                        <PlayCircle className="size-10 text-white group-hover:text-orange-500 transition-colors" />
                     </div>
                  </div>
                  <div className="absolute inset-x-6 bottom-6 space-y-2">
                     <h4 className="text-sm font-black text-white leading-tight">{vid.title}</h4>
                     <div className="text-[9px] font-black text-primary bg-white/90 px-2.5 py-1 rounded-full w-fit backdrop-blur-md uppercase tracking-widest">{vid.duration}</div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 📸 PHOTO ARCHIVE GRID */}
      <section className="space-y-8">
         <div className="flex items-center gap-3 border-l-8 border-orange-600 pl-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">डिजिटल <span className="text-orange-600">आरकाइव</span></h2>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">VISUAL MEMORY WALL</p>
            </div>
         </div>
         
         {isLoading ? (
           <div className="flex justify-center py-24">
             <Loader2 className="size-10 text-orange-600 animate-spin" />
           </div>
         ) : (
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {galleryImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImage(img)}
                  className="group aspect-square bg-slate-50 rounded-3xl overflow-hidden shadow-sm relative cursor-zoom-in border border-slate-100 hover:shadow-xl hover:border-orange-200 transition-all"
                >
                   <img src={img.url} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt={img.caption} />
                   <div className="absolute inset-0 bg-orange-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                     <ZoomIn className="size-8 text-white mb-2" />
                     <p className="text-[8px] font-black text-white uppercase tracking-widest text-center">{img.caption}</p>
                   </div>
                </div>
              ))}
              {galleryImages.length === 0 && (
                <div className="col-span-full py-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] text-center">
                  <Camera className="size-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No assets in visual archive</p>
                </div>
              )}
           </div>
         )}
      </section>

      {/* 📸 LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-auto max-h-[85vh] overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/10 shadow-2xl"
            >
               <img src={selectedImage.url} className="size-full object-contain" alt={selectedImage.caption} />
               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 md:p-12">
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic">{selectedImage.caption}</h3>
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mt-2">LAKHARA DIGITAL ARCHIVE • MEMORY #{selectedImage.id?.slice(-4)}</p>
               </div>
               <button 
                 onClick={() => setSelectedImage(null)}
                 className="absolute top-6 right-6 size-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20"
               >
                  <X className="size-6" />
               </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🏛️ MEMORY WALL BANNER */}
      <section>
         <div className="bg-slate-950 text-white rounded-[3rem] p-12 md:p-24 space-y-12 relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="absolute -top-32 -right-32 size-96 bg-orange-600/10 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-32 -left-32 size-96 bg-primary/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white/40 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] italic">
                  ॥ स्मृति वंदन ॥
               </div>
               <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase italic">
                  समाज की हर <span className="text-orange-500">सुनहरी याद</span> <br className="hidden md:block" /> यहाँ सुरक्षित है
               </h2>
               <p className="text-slate-400 font-bold text-sm md:text-lg leading-relaxed max-w-2xl mx-auto italic opacity-70">
                  विगत आयोजनों, सम्मेलनों और सांस्कृतिक उत्सवों की झलकियों को सहेजने का हमारा निरंतर प्रयास। समाज की गौरवगाथा अब डिजिटल पन्नों पर।
               </p>
               <div className="pt-6 flex flex-wrap justify-center gap-6">
                  <button className="px-10 py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 text-xs uppercase tracking-widest active:scale-95">
                     अपनी तस्वीरें साझा करें
                  </button>
                  <button className="px-10 py-4 bg-white/5 text-white font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10 text-xs uppercase tracking-widest active:scale-95">
                     पुराना आरकाइव
                  </button>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
