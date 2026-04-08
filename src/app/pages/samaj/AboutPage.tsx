import { History, Target, Shield, Users, Flag, Heart } from "lucide-react";

export function AboutPage() {
  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 📜 HERO / TITLE */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
            <Flag className="size-8" />
         </div>
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">लखारा समाज का <span className="text-orange-600">गौरवशाली</span> इतिहास</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Our History • Vision • Mission</p>
         </div>
      </section>

      {/* 🏰 HISTORY SECTION */}
      <section className="space-y-10">
         <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 text-orange-600 bg-orange-50 px-4 py-2 rounded-full w-fit mx-auto">
               <History className="size-4" />
               <span className="text-xs font-bold uppercase tracking-wider">विस्तृत इतिहास</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">लखारा समाज का <span className="text-orange-600">इतिहास</span></h2>
            <p className="text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              लखारा समाज भारत के पारंपरिक कारीगर (शिल्पकार) समुदायों में से एक माना जाता है, जिसका मुख्य कार्य लाख (Lac) से संबंधित उत्पादों का निर्माण रहा है। यह समाज विशेष रूप से राजस्थान, गुजरात, मध्य प्रदेश और उत्तर प्रदेश में पाया जाता है।
            </p>
         </div>

         <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border-4 border-white mb-8 group">
            <img 
              src="/lakhara_history.png" 
              alt="Lakhara Samaj History" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&q=80&w=1000";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-10">
               <div className="text-white">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest drop-shadow-lg">पारंपरिक विरासत</h3>
                  <p className="text-white/80 font-bold text-sm tracking-widest max-w-lg mt-2">सदियों पुरानी कला और हमारी प्राचीन शिल्प परंपरा</p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1 */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
               <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-3"><span className="size-2.5 bg-orange-600 rounded-full"></span> लखारा समाज का परिचय</h3>
               <p className="text-slate-600 text-sm leading-relaxed mb-4">
                 “लखारा” शब्द की उत्पत्ति “लाख” से हुई है। लाख एक प्राकृतिक रेज़िन (resin) होती है, जिसका उपयोग प्राचीन काल से चूड़ियाँ, आभूषण, सजावटी वस्तुएँ और हस्तशिल्प बनाने में किया जाता रहा है।
               </p>
               <ul className="text-sm font-medium text-slate-600 space-y-2 list-disc pl-5 marker:text-orange-400">
                 <li>लाख की चूड़ियाँ बनाते थे</li>
                 <li>लकड़ी और धातु पर लाख का काम करते थे</li>
                 <li>शादी-विवाह और त्योहारों के लिए विशेष वस्तुएँ तैयार करते थे</li>
               </ul>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
               <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-3"><span className="size-2.5 bg-orange-600 rounded-full"></span> ऐतिहासिक पृष्ठभूमि</h3>
               <p className="text-slate-600 text-sm leading-relaxed mb-4">
                 लखारा समाज का इतिहास बहुत प्राचीन है और यह भारतीय शिल्प परंपरा से गहराई से जुड़ा हुआ है।
               </p>
               <ul className="text-sm font-medium text-slate-600 space-y-2 list-disc pl-5 marker:text-orange-400">
                 <li>प्राचीन भारत में लाख का उपयोग राजदरबारों और धार्मिक अनुष्ठानों में होता था।</li>
                 <li>लखारा कारीगरों को राजा-महाराजाओं के समय में विशेष सम्मान मिलता था।</li>
                 <li>राजस्थान के राजपूताना काल में लखारा समाज ने अपनी कला को उच्च स्तर तक पहुँचाया।</li>
               </ul>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
               <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-3"><span className="size-2.5 bg-orange-600 rounded-full"></span> सामाजिक और सांस्कृतिक जीवन</h3>
               <p className="text-slate-600 text-sm leading-relaxed mb-4">
                 लखारा समाज का सामाजिक जीवन पारंपरिक और सांस्कृतिक मूल्यों पर आधारित है।
               </p>
               <ul className="text-sm font-medium text-slate-600 space-y-2 list-disc pl-5 marker:text-orange-400">
                 <li>समाज में विवाह, त्यौहार और रीति-रिवाज बहुत महत्वपूर्ण होते हैं।</li>
                 <li>दीवाली, होली, तीज, गणगौर जैसे त्योहार धूमधाम से मनाए जाते हैं।</li>
                 <li>समाज में आपसी सहयोग और एकता का विशेष महत्व है।</li>
               </ul>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
               <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-3"><span className="size-2.5 bg-orange-600 rounded-full"></span> व्यवसाय और परिवर्तन</h3>
               <p className="text-slate-600 text-sm leading-relaxed mb-4">
                 समय के साथ लखारा समाज के व्यवसाय में भारी बदलाव आया है:
               </p>
               <div className="space-y-4">
                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                   <strong className="text-[10px] text-orange-600 font-bold uppercase tracking-widest block mb-2">पहले:</strong>
                   <ul className="text-sm font-medium text-slate-600 space-y-1 list-disc pl-5 marker:text-orange-400">
                     <li>केवल लाख से जुड़े हस्तशिल्प कार्य</li>
                     <li>पारंपरिक कारीगरी पर निर्भरता</li>
                   </ul>
                 </div>
                 <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100/50">
                   <strong className="text-[10px] text-green-600 font-bold uppercase tracking-widest block mb-2">अब:</strong>
                   <ul className="text-sm font-medium text-slate-600 space-y-1 list-disc pl-5 marker:text-green-500">
                     <li>आधुनिक व्यापार, शिक्षा, सरकारी और निजी नौकरियाँ</li>
                     <li>कई लोग अब बिज़नेस, आईटी, और अन्य क्षेत्रों में आगे बढ़ रहे हैं</li>
                   </ul>
                 </div>
               </div>
            </div>

            {/* Conclusion */}
            <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 p-8 md:p-10 rounded-3xl border border-orange-100 shadow-sm flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
               <div className="absolute -right-10 -bottom-10 opacity-10">
                  <History className="size-64 text-orange-900" />
               </div>
               <div className="flex-1 space-y-5 relative z-10">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-3"><span className="size-3 bg-orange-600 rounded-full"></span> वर्तमान स्थिति एवं निष्कर्ष</h3>
                  <div className="space-y-4 text-slate-700 text-base font-medium leading-relaxed">
                     <p>
                       आज लखारा समाज <strong>शिक्षा के क्षेत्र में प्रगति कर रहा है</strong>, सामाजिक संगठनों के माध्यम से एकजुट हो रहा है, और अपनी पारंपरिक कला को आधुनिक बाजार के अनुसार ढाल रहा है।
                     </p>
                     <p className="border-l-4 border-orange-600 pl-4 text-lg italic font-bold">
                       "लखारा समाज का इतिहास कला, परंपरा और मेहनत का प्रतीक है। इस समाज ने भारत की हस्तशिल्प परंपरा को समृद्ध किया है और आज भी अपनी सांस्कृतिक पहचान को बनाए रखते हुए आधुनिकता की ओर बढ़ रहा है।"
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 🎯 VISION & MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {[
           { 
             title: "हमारा लक्ष्य (Mission)", 
             desc: "समाज के प्रत्येक सदस्य को शिक्षित, संगठित और आत्मनिर्भर बनाना। लखारा समाज की आने वाली पीढ़ी को अपनी संस्कृति और जड़ों से जोड़ना।", 
             icon: Target, 
             color: "bg-orange-50 text-orange-600 border-orange-100" 
           },
           { 
             title: "हमारा स्वप्न (Vision)", 
             desc: "एक ऐसा सशक्त और प्रबुद्ध लखारा समाज, जो सामाजिक, आर्थिक और राजनीतिक रूप से राष्ट्र के विकास में अग्रसर हो।", 
             icon: Shield, 
             color: "bg-blue-50 text-blue-600 border-blue-100" 
           }
         ].map((item, i) => (
           <div key={i} className={`p-8 border rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-all hover:-translate-y-1 ${item.color}`}>
              <item.icon className="size-8" />
              <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
              <p className="font-medium text-slate-600 text-base leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </section>

      {/* 🤝 CORE VALUES */}
      <section className="space-y-8">
         <div className="text-center font-bold text-xs text-slate-500 uppercase tracking-widest">हमारे आदर्श मूल्य</div>
         <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { label: "एकता", icon: Users },
              { label: "संस्कृति", icon: Heart },
              { label: "शिक्षा", icon: Flag },
              { label: "सहयोग", icon: Target }
            ].map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group px-4">
                 <div className="size-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <v.icon className="size-8" />
                 </div>
                 <span className="font-bold text-sm text-slate-700">{v.label}</span>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
}
