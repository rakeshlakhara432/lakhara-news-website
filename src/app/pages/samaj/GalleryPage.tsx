import { Camera, ArrowRight, PlayCircle, Loader2, X, ZoomIn, Calendar, ImageIcon, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";
import { samajService, GalleryAlbum } from "../../services/samajService";
import { motion, AnimatePresence } from "framer-motion";

export function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToGalleryAlbums((data) => {
      const hasSpecial = data.some(a => a.id === "special-album-recent");
      const isDeletedLocally = localStorage.getItem("deleted-special-recent") === "true";

      if (!hasSpecial && !isDeletedLocally) {
        const specialAlbum: GalleryAlbum = {
          id: "special-album-recent",
          title: "Latest Image Highlights",
          date: new Date().toISOString(),
          description: "Special collection featuring our newest additions.",
          images: ["/gallery/1.jpeg", "/gallery/2.jpeg", "/gallery/3.jpeg"],
          coverImage: "/gallery/1.jpeg",
          createdAt: new Date().toISOString()
        };
        setAlbums([specialAlbum, ...data]);
      } else {
        setAlbums(data);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openAlbum = (album: GalleryAlbum) => {
    setSelectedAlbum(album);
    setCurrentImgIndex(0);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedAlbum) return;
    setCurrentImgIndex((prev) => (prev + 1) % selectedAlbum.images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedAlbum) return;
    setCurrentImgIndex((prev) => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
  };

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
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">OUR MEMORIES • EVENT GALLERIES • VIDEOS</p>
         </div>
      </section>

      {/* 🎞️ VIDEO SECTION */}
      <section className="space-y-8 px-4 md:px-0">
         <div className="flex items-center justify-between border-l-8 border-orange-600 pl-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">वीडियो <span className="text-orange-600">संग्रह</span></h2>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">LATEST BROADCASTS</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">সব देखें <ArrowRight className="size-4" /></button>
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

      {/* 📸 EVENT GALLERY GRID */}
      <section className="space-y-10 px-4 md:px-0">
         <div className="flex items-center gap-3 border-l-8 border-orange-600 pl-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">डिजिटल <span className="text-orange-600">आरकाइव</span></h2>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">EVENT-WISE MEMORY WALL</p>
            </div>
         </div>
         
         {isLoading ? (
           <div className="flex justify-center py-24">
             <Loader2 className="size-10 text-orange-600 animate-spin" />
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <motion.div 
                  key={album.id} 
                  whileHover={{ y: -10 }}
                  onClick={() => openAlbum(album)}
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 hover:border-orange-200 transition-all cursor-pointer flex flex-col"
                >
                   <div className="aspect-[4/3] relative overflow-hidden">
                      <img src={album.coverImage || album.images[0]} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt={album.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center gap-2 text-white">
                         <ImageIcon className="size-4" />
                         <span className="text-xs font-black">{album.images.length}</span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                         <div className="size-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl">
                            <Maximize2 className="size-8" />
                         </div>
                      </div>
                   </div>

                   <div className="p-8 space-y-3">
                      <div className="flex items-center gap-2 text-orange-600">
                         <Calendar className="size-3" />
                         <span className="text-[10px] font-black uppercase tracking-widest">{new Date(album.date).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tighter italic group-hover:text-orange-600 transition-colors line-clamp-2">{album.title}</h3>
                      {album.description && (
                         <p className="text-xs text-slate-400 font-bold italic line-clamp-2 pt-1">{album.description}</p>
                      )}
                      
                      <div className="pt-4 flex items-center gap-2">
                         <div className="flex -space-x-3">
                            {album.images.slice(0, 3).map((url, idx) => (
                               <div key={idx} className="size-8 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                                  <img src={url} className="size-full object-cover" alt="" />
                               </div>
                            ))}
                         </div>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">View Album</span>
                      </div>
                   </div>
                </motion.div>
              ))}
              {albums.length === 0 && (
                <div className="col-span-full py-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] text-center">
                  <Camera className="size-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No collections in archive</p>
                </div>
              )}
           </div>
         )}
      </section>

      {/* 📸 PREMIUM LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedAlbum && (
          <div className="fixed inset-0 z-[600] flex flex-col md:flex-row items-stretch justify-stretch overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedAlbum(null)}
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl" 
            />
            
            {/* Main Image Container */}
            <div className="relative flex-grow flex flex-col items-center justify-center p-4 md:p-12 z-10 overflow-hidden">
               <motion.div 
                  key={currentImgIndex}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative w-full h-full flex items-center justify-center"
               >
                  <img 
                    src={selectedAlbum.images[currentImgIndex]} 
                    className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl" 
                    alt="" 
                  />
                  
                  {/* Image Details Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 md:p-12 rounded-b-3xl text-center md:text-left">
                     <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                           {currentImgIndex + 1} / {selectedAlbum.images.length}
                        </span>
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                           {new Date(selectedAlbum.date).toLocaleDateString()}
                        </span>
                     </div>
                     <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter italic drop-shadow-lg">{selectedAlbum.title}</h3>
                  </div>
               </motion.div>

               {/* Navigation Controls */}
               <button 
                 onClick={prevImage}
                 className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 size-14 md:size-20 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/10 scale-90 hover:scale-100 active:scale-95"
               >
                  <ChevronLeft className="size-8 md:size-12" />
               </button>
               <button 
                 onClick={nextImage}
                 className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 size-14 md:size-20 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/10 scale-90 hover:scale-100 active:scale-95"
               >
                  <ChevronRight className="size-8 md:size-12" />
               </button>

               <button 
                 onClick={() => setSelectedAlbum(null)}
                 className="absolute top-6 right-6 md:top-12 md:right-12 size-12 md:size-16 bg-white/10 hover:bg-rose-600 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 active:scale-90"
               >
                  <X className="size-6 md:size-8" />
               </button>
            </div>

            {/* Thumbnails Sidebar/Bottom Bar */}
            <div className="relative w-full md:w-80 bg-black/40 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/10 z-10 flex flex-col">
               <div className="p-8 hidden md:block">
                  <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-1">Album Collection</h4>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Scroll to explore</p>
               </div>
               
               <div className="flex-grow flex md:flex-col gap-4 p-4 md:p-8 overflow-x-auto md:overflow-y-auto no-scrollbar">
                  {selectedAlbum.images.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`relative flex-shrink-0 size-20 md:w-full md:aspect-square rounded-2xl overflow-hidden transition-all duration-300 border-4
                        ${currentImgIndex === idx ? "border-orange-600 scale-95" : "border-transparent opacity-40 hover:opacity-100"}`}
                    >
                       <img src={url} className="size-full object-cover" alt="" />
                       {currentImgIndex === idx && (
                         <div className="absolute inset-0 bg-orange-600/20 flex items-center justify-center">
                            <ZoomIn className="size-6 text-white" />
                         </div>
                       )}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 🏛️ MEMORY WALL BANNER */}
      <section className="px-4 md:px-0">
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
