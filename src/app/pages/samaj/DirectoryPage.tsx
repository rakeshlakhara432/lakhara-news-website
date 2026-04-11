import { Search, User, MapPin, Phone, Users, Loader2, Mail, Briefcase, Camera, X, Check, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { samajService, Member } from "../../services/samajService";
import { toast } from "sonner";

export function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile View & Edit state
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Member>>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToMembers((data) => {
      // Only show approved members on public page
      setMembers(data.filter(m => m.isApproved));
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
        } else {
          if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
        }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setEditFormData(prev => ({ ...prev, photoUrl: compressedBase64 }));
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!selectedMember?.id) return;
    try {
      await samajService.updateMember(selectedMember.id, editFormData);
      setSelectedMember({ ...selectedMember, ...editFormData } as Member);
      setIsEditing(false);
      toast.success("प्रोफ़ाइल अपडेट हो गई!");
    } catch (error) {
      toast.error("अपडेट करने में विफल।");
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-24">
      
      {/* 🧑🤝🧑 HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-600 text-white flex items-center justify-center rounded-2xl shadow-sm">
            <Users className="size-8" />
         </div>
         <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">सदस्य <span className="text-orange-600">निर्देशिका</span></h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Samaj Member Directory</p>
         </div>
      </section>

      {/* 🔍 SEARCH & FILTER */}
      <section className="max-w-3xl mx-auto px-6">
         <div className="bg-white p-2 border border-slate-200 rounded-xl flex flex-col md:flex-row gap-2 shadow-sm">
            <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
               <Search className="size-5 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="नाम या शहर से खोजें..." 
                 className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-700"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button className="px-6 py-2 bg-orange-600 text-white font-semibold text-sm rounded-lg hover:bg-orange-500 transition-colors">
               फ़िल्टर
            </button>
         </div>
      </section>

      {/* 📋 MEMBERS GRID */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-orange-600 animate-spin" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-0 container mx-auto">
           {filteredMembers.length > 0 ? (
             filteredMembers.map((m, i) => (
               <div key={i} className="group p-6 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow hover:border-orange-200 flex flex-col">
                  <div className="flex items-center gap-4">
                     <div className="size-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0 border border-orange-100 overflow-hidden">
                        {m.photoUrl ? <img src={m.photoUrl} alt={m.name} className="size-full object-cover" /> : <User className="size-6" />}
                     </div>
                     <div className="flex-grow min-w-0">
                        <h3 className="text-base font-bold text-slate-800 truncate mb-1">{m.name}</h3>
                        <div className="flex items-center gap-1.5 text-slate-500">
                           <MapPin className="size-3.5 text-orange-600" />
                           <span className="text-xs font-medium">{m.city}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                     <div className="space-y-0.5">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">व्यवसाय</p>
                        <p className="text-sm font-medium text-slate-700">{m.occupation || '-'}</p>
                     </div>
                     <div className="space-y-0.5 text-right">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">संपर्क</p>
                        <p className="text-sm font-semibold text-orange-600">{m.phone}</p>
                     </div>
                  </div>
                  
                  <button 
                     onClick={() => { setSelectedMember(m); setIsEditing(false); setEditFormData(m); }}
                     className="w-full mt-5 py-2.5 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-orange-50 group-hover:text-orange-700 font-semibold text-xs transition-colors border border-slate-100"
                  >
                     प्रोफ़ाइल देखें
                  </button>
               </div>
             ))
           ) : (
             <div className="col-span-full py-20 text-center space-y-4">
                <Search className="size-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 font-medium text-sm">कोई सदस्य नहीं मिला।</p>
             </div>
           )}
        </section>
      )}

      {/* 📢 JOIN SAMAJ BANNER */}
      <section className="container mx-auto px-6 lg:px-0">
         <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
               <div className="space-y-4 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">क्या आप समाज के <br /> <span className="text-orange-500">पंजीकृत</span> सदस्य हैं?</h2>
                  <p className="text-slate-300 font-medium text-sm md:text-base max-w-lg">अभी अपनी सदस्यता सुनिश्चित करें और समाज के डिजिटल नेटवर्क का हिस्सा बनें।</p>
               </div>
               <Link to="/register" className="shrink-0 px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors shadow">अभी पंजीकरण करें</Link>
            </div>
         </div>
      </section>

      {/* PROFILE VIEW / EDIT MODAL */}
      {selectedMember && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedMember(null)}></div>
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200">
               
               <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 size-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 hover:text-slate-900 transition-colors">
                  <X className="size-4" />
               </button>

               <div className="text-center space-y-4 mb-8">
                 <div className="relative size-24 mx-auto rounded-full border-4 border-orange-50 shadow-sm bg-orange-50 flex items-center justify-center overflow-hidden">
                    {(isEditing ? editFormData.photoUrl : selectedMember.photoUrl) ? (
                      <img src={(isEditing ? editFormData.photoUrl : selectedMember.photoUrl)} className="size-full object-cover" />
                    ) : (
                      <User className="size-10 text-orange-400" />
                    )}
                    {isEditing && (
                      <label className="absolute inset-x-0 bottom-0 py-1 bg-black/50 text-white text-[10px] font-bold cursor-pointer hover:bg-black/70 flex justify-center items-center gap-1 transition-colors">
                         {isUploading ? <Loader2 className="size-3 animate-spin"/> : <Camera className="size-3"/>} बदलें
                         <input type="file" accept="image/*" className="hidden" onChange={handleEditPhoto} />
                      </label>
                    )}
                 </div>
                 
                 <div>
                   {isEditing ? (
                     <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} className="text-2xl font-black text-slate-800 text-center w-full border-b border-orange-300 focus:outline-none focus:border-orange-600 px-2 py-1 placeholder:text-slate-300" placeholder="पूरा नाम" />
                   ) : (
                     <h2 className="text-2xl font-black text-slate-800">{selectedMember.name}</h2>
                   )}
                   <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">S/O {(isEditing ? editFormData.fatherName : selectedMember.fatherName) || "N/A"}</p>
                 </div>
               </div>

               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                           <Phone className="size-3.5" /> <span className="text-[10px] font-bold uppercase tracking-wider">नंबर</span>
                        </div>
                        {isEditing ? (
                           <input type="tel" name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-semibold text-slate-800 outline-none" />
                        ) : (
                           <p className="text-sm font-semibold text-slate-800">{selectedMember.phone}</p>
                        )}
                     </div>
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                           <MapPin className="size-3.5" /> <span className="text-[10px] font-bold uppercase tracking-wider">स्थान</span>
                        </div>
                        {isEditing ? (
                           <input type="text" name="city" value={editFormData.city} onChange={handleEditChange} className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-semibold text-slate-800 outline-none" />
                        ) : (
                           <p className="text-sm font-semibold text-slate-800">{selectedMember.city}</p>
                        )}
                     </div>
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                           <Briefcase className="size-3.5" /> <span className="text-[10px] font-bold uppercase tracking-wider">पेशा</span>
                        </div>
                        {isEditing ? (
                           <input type="text" name="occupation" value={editFormData.occupation} onChange={handleEditChange} className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-semibold text-slate-800 outline-none" />
                        ) : (
                           <p className="text-sm font-semibold text-slate-800">{selectedMember.occupation || "-"}</p>
                        )}
                     </div>
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                           <Users className="size-3.5" /> <span className="text-[10px] font-bold uppercase tracking-wider">टाइप</span>
                        </div>
                        {isEditing ? (
                           <select name="familyType" value={editFormData.familyType} onChange={handleEditChange} className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-semibold text-slate-800 outline-none">
                              <option value="एकल">एकल</option>
                              <option value="संयुक्त">संयुक्त</option>
                              <option value="अन्य">अन्य</option>
                           </select>
                        ) : (
                           <p className="text-sm font-semibold text-slate-800">{selectedMember.familyType}</p>
                        )}
                     </div>
                  </div>
               </div>

               <div className="mt-8 flex gap-3">
                 {isEditing ? (
                   <>
                     <button onClick={() => { setIsEditing(false); setEditFormData(selectedMember); }} className="flex-1 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm">रद्द करें</button>
                     <button onClick={handleSaveProfile} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors text-sm"><Check className="size-4" /> सुरक्षित करें</button>
                   </>
                 ) : (
                   <button onClick={() => setIsEditing(true)} className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors text-sm">
                     <Edit2 className="size-4" /> प्रोफ़ाइल संपादित करें
                   </button>
                 )}
               </div>

            </div>
         </div>
      )}

    </div>
  );
}
