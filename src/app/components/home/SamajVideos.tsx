import React from 'react';
import { Play, Video, Share2, Info } from 'lucide-react';
import { SAMAJ_VIDEOS } from '../../data/videos';

const SamajVideos = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider">
              <Video className="size-3" /> विशेष वीडियो
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              समाज <span className="text-orange-600">वीडियो गैलरी</span>
            </h2>
            <p className="text-slate-500 font-bold text-lg border-l-4 border-orange-600 pl-4">
              लखारा समाज की प्रगति और सूचनाओं का डिजिटल संग्रह
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-slate-600 font-bold hover:text-orange-600 transition-colors">
            <Share2 className="size-5" /> साझा करें
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {SAMAJ_VIDEOS.map((video) => (
            <div 
              key={video.id} 
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                <video 
                  src={video.url} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  controls
                  poster="/brand-logo.png"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg">
                    HD QUALITY
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-800 group-hover:text-orange-600 transition-colors mb-1">
                      {video.title}
                    </h3>
                    <p className="text-orange-600 font-bold text-sm">
                      {video.subtitle}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                    <Info className="size-5" />
                  </div>
                </div>
                
                <p className="text-slate-600 font-medium leading-relaxed mb-6 flex-1">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Video className="size-4" /> MP4 FORMAT
                  </div>
                  <button className="inline-flex items-center gap-2 text-sm font-black text-orange-600 uppercase tracking-widest hover:gap-3 transition-all">
                    अभी देखें <Play className="size-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SamajVideos;
