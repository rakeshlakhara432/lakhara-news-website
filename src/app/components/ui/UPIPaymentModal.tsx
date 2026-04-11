import { useState } from "react";
import { CreditCard, UpiIcon, QrCode, ExternalLink, Copy, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  amount: number;
  purpose: string;
  memberName?: string;
  onClose: () => void;
  onSuccess?: (txnId: string) => void;
}

const UPI_ID    = "rakeshlakhara432@upi";
const PHONE_NO  = "9876543210";
const PAYEE_NAME = "Lakhara Samaj Community";

export function UPIPaymentModal({ amount, purpose, memberName, onClose, onSuccess }: Props) {
  const [step, setStep]       = useState<"choose" | "verify">("choose");
  const [txnId, setTxnId]     = useState("");
  const [copied, setCopied]   = useState(false);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(purpose)}`;
  const gpayLink  = `tez://upi/pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR`;
  const phonepeLink = `phonepe://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR`;

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    if (!txnId.trim()) {
      toast.error("Transaction ID दर्ज करें");
      return;
    }
    onSuccess?.(txnId);
    toast.success("Payment verify के लिए submit हो गया!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl">
            <X className="size-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <CreditCard className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-black">UPI Payment</h2>
              <p className="text-indigo-100 text-xs font-medium">{purpose}</p>
            </div>
          </div>
          <div className="mt-4 text-4xl font-black">₹{amount}</div>
        </div>

        <div className="p-6 space-y-5">
          {step === "choose" ? (
            <>
              {/* UPI ID Copy */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-black text-slate-500 uppercase tracking-wider">UPI ID</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-black text-slate-800 text-sm">{UPI_ID}</span>
                  <button onClick={copyUPI} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${copied ? "bg-green-100 text-green-600" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"}`}>
                    {copied ? <CheckCircle2 className="size-3.5" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* App buttons */}
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest text-center">या इन apps से pay करें</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "GPay",    link: gpayLink,    emoji: "🟢", color: "border-green-200 hover:bg-green-50" },
                  { name: "PhonePe", link: phonepeLink,  emoji: "💜", color: "border-purple-200 hover:bg-purple-50" },
                  { name: "UPI App", link: upiLink,      emoji: "💳", color: "border-indigo-200 hover:bg-indigo-50" },
                ].map(app => (
                  <a
                    key={app.name}
                    href={app.link}
                    className={`flex flex-col items-center gap-2 p-4 bg-white border-2 ${app.color} rounded-2xl transition-colors text-center`}
                  >
                    <span className="text-2xl">{app.emoji}</span>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">{app.name}</span>
                  </a>
                ))}
              </div>

              <button
                onClick={() => setStep("verify")}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow"
              >
                Payment कर लिया? Verify करें →
              </button>
            </>
          ) : (
            <>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                <CheckCircle2 className="size-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-black text-green-700">Payment complete करने के बाद Transaction ID enter करें</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Transaction ID / UTR Number</label>
                <input
                  type="text"
                  placeholder="जैसे: 402312345678"
                  value={txnId}
                  onChange={e => setTxnId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setStep("choose")} className="py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">
                  वापस जाएं
                </button>
                <button onClick={handleVerify} className="py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black rounded-xl text-sm hover:opacity-90 transition-all shadow">
                  Submit करें ✓
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
