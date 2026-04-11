import { useState } from "react";
import { Heart, Zap, Gift, HandHeart, IndianRupee, CheckCircle, CreditCard } from "lucide-react";
import { UPIPaymentModal } from "../../components/ui/UPIPaymentModal";
import { initializeRazorpay } from "../../services/razorpayService";

const AMOUNTS = [101, 251, 501, 1001, 2101, 5001];

export function DonatePage() {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(501);
  const [showPayment, setShowPayment] = useState(false);
  const [donorName, setDonorName] = useState("");

  const finalAmount = Number(customAmount) || selectedAmount;

  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {showPayment && (
        <UPIPaymentModal
          amount={finalAmount}
          purpose="Lakhara Samaj Community Donation"
          memberName={donorName}
          onClose={() => setShowPayment(false)}
          onSuccess={(txn) => console.log("Donation TXN:", txn)}
        />
      )}

      {/* Header */}
      <section className="text-center space-y-6 pt-12">
        <div className="size-16 mx-auto bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-sm border border-rose-100">
          <Heart className="size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            समाज को <span className="text-rose-600">सहयोग करें</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Donate • Support • Unite</p>
        </div>
      </section>

      {/* Why Donate */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap,       title: "समाज विकास",     desc: "आपका योगदान समाज की तरक्की में सीधा उपयोग होता है।",        color: "bg-blue-50 text-blue-600"   },
            { icon: Gift,      title: "शिक्षा सहायता",  desc: "गरीब बच्चों की पढ़ाई में मदद करें।",                          color: "bg-amber-50 text-amber-600" },
            { icon: HandHeart, title: "सामाजिक कार्य",  desc: "जरूरतमंदों की सहायता के लिए funds का उपयोग।",              color: "bg-emerald-50 text-emerald-600" },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-all">
              <div className={`size-12 ${c.color} rounded-xl flex items-center justify-center mx-auto`}>
                <c.icon className="size-6" />
              </div>
              <h3 className="font-black text-slate-800">{c.title}</h3>
              <p className="text-sm text-slate-500 font-medium">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Form */}
      <section className="container mx-auto px-6">
        <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-slate-800 border-l-4 border-rose-500 pl-4">दान करें</h2>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">आपका नाम</label>
            <input
              type="text"
              placeholder="नाम दर्ज करें..."
              value={donorName}
              onChange={e => setDonorName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Amount grid */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">राशि चुनें</label>
            <div className="grid grid-cols-3 gap-3">
              {AMOUNTS.map(a => (
                <button
                  key={a}
                  onClick={() => { setSelectedAmount(a); setCustomAmount(""); }}
                  className={`py-3 rounded-xl font-black text-sm transition-all border-2 ${
                    selectedAmount === a && !customAmount
                      ? "bg-rose-600 text-white border-rose-600 shadow-lg"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-rose-300 hover:bg-rose-50"
                  }`}
                >
                  ₹{a.toLocaleString("hi")}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">या Custom Amount</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-rose-500 transition-colors">
              <IndianRupee className="size-4 text-slate-400 shrink-0" />
              <input
                type="number"
                placeholder="कोई भी राशि..."
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                className="bg-transparent outline-none w-full text-sm font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Final amount display */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-sm font-black text-slate-700">कुल दान राशि</span>
            <span className="text-2xl font-black text-rose-600">₹{finalAmount.toLocaleString("hi")}</span>
          </div>

          <button
            onClick={() => setShowPayment(true)}
            disabled={!finalAmount}
            className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black rounded-2xl text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Heart className="size-5" />
            UPI से दान करें (₹{finalAmount.toLocaleString("hi")})
          </button>

          <button
            onClick={() => {
              initializeRazorpay({
                amount: finalAmount,
                name: donorName || "Samaj Donor",
                description: "Society Development Donation",
                onSuccess: (res) => console.log("Razorpay Success:", res)
              });
            }}
            disabled={!finalAmount}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <CreditCard className="size-5" />
            Card / NetBanking / Wallet से (₹{finalAmount.toLocaleString("hi")})
          </button>

          <div className="flex items-center gap-2 justify-center text-xs text-slate-400 font-medium">
            <CheckCircle className="size-3.5 text-green-500" />
            100% Secure • Powerd by Razorpay & UPI
          </div>
        </div>
      </section>
    </div>
  );
}
