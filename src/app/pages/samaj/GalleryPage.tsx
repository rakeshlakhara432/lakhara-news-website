import { Image, Video, Camera, LayoutGrid, Maximize2, Flag, ArrowRight, PlayCircle, Star, History, Calendar } from "lucide-react";
import { useState } from "react";

export function GalleryPage() {
  const [filter, setFilter] = useState("all");

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
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 🖼️ HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <Camera className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">स्मृति <span className="text-primary underline underline-offset-8 decoration-primary/20">कलश</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">OUR MEMORIES • PHOTOS • VIDEOS</p>
         </div>
      </section>

      {/* 🎞️ VIDEO SECTION (Dynamic Slider Style) */}
      <section className="space-y-12">
         <div className="flex items-center justify-between border-l-[8px] border-primary pl-8">
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">वीडियो <span className="text-primary opacity-50 underline decoration-primary/20">संग्रह</span></h2>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2 italic">सभी वीडियो <ArrowRight className="size-4" /></button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((vid, i) => (
               <div key={i} className="group aspect-video bg-gray-950 rounded-[4rem] overflow-hidden relative shadow-bhagva border-[6px] border-white ring-1 ring-primary/5 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  <img src={vid.image} className="size-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <PlayCircle className="size-20 text-white opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                  </div>
                  <div className="absolute inset-x-10 bottom-10 space-y-2">
                     <h4 className="text-sm font-black italic tracking-tighter text-white uppercase leading-tight line-clamp-1">{vid.title}</h4>
                     <div className="text-[8px] font-black text-primary uppercase tracking-widest bg-gray-950/50 backdrop-blur-md px-4 py-1.5 rounded-full w-fit border border-white/10">{vid.duration}</div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 📸 PHOTO ALBUMS GRID */}
      <section className="space-y-12">
         <div className="flex items-center gap-6 border-l-[8px] border-primary pl-8">
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">फोटो <span className="text-primary font-black opacity-40">एलबम</span></h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {albums.map((alb, i) => (
              <div key={i} className="group bg-white p-8 rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:-translate-y-2 relative overflow-hidden text-center space-y-6">
                 <div className="aspect-square bg-gray-50 rounded-[3rem] overflow-hidden relative border-4 border-white shadow-lg shadow-gray-200 group-hover:rotate-6 transition-all duration-700">
                    <img src={alb.image} className="size-full object-cover grayscale group-hover:grayscale-0 transition-all group-hover:scale-125" alt="" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 right-4 size-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                       <Maximize2 className="size-5" />
                    </div>
                 </div>
                 <div>
                    <h3 className="text-md font-black text-gray-950 tracking-tighter uppercase italic leading-tight mb-2 truncate">{alb.title}</h3>
                    <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest italic">{alb.count}</div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 🏛️ MEMORY WALL BANNER (Polaroids Style) */}
      <section className="bg-gray-950 text-white rounded-[5rem] p-16 md:p-24 space-y-16 relative overflow-hidden group border-[10px] border-white shadow-2xl">
         <div className="absolute inset-0 mandala-bg opacity-10 group-hover:scale-125 transition-transform duration-[20s]"></div>
         <div className="absolute -top-40 -left-40 size-96 bg-primary/20 blur-[15rem]"></div>
         <div className="absolute -bottom-40 -right-40 size-96 bg-secondary/10 blur-[15rem]"></div>
         
         <div className="relative z-10 text-center space-y-10">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-3xl text-primary px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] italic border border-white/10 animate-in fade-in slide-in-from-bottom-5">
               ॥ स्मृति वंदन ॥
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-2xl">
               समाज की हर <br/> <span className="text-primary underline decoration-white/20 underline-offset-8 italic">सुनहरी याद</span> यहाँ सुरक्षित है
            </h2>
            <p className="text-gray-400 font-bold italic text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
               विगत आयोजनों, सम्मेलनों और सांस्कृतिक उत्सवों की झलकियों को सहेजने का हमारा निरंतर प्रयास। समाज की गौरवगाथा अब डिजिटल पन्नों पर।
            </p>
            <div className="pt-10 flex flex-wrap justify-center gap-8">
               <button className="px-16 py-6 bg-primary text-white font-black rounded-xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center gap-4 hover:scale-110 active:scale-95 group">
                  <Star className="size-6 fill-current" /> अपनी तस्वीरें साझा करें
               </button>
               <button className="px-16 py-6 bg-white/5 text-white font-black rounded-xl hover:bg-white/10 transition-all text-xs tracking-widest uppercase shadow-2xl flex border border-white/10 items-center gap-4">
                  पुराना आरकाइव <History className="size-6" />
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}
