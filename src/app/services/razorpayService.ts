import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  amount: number;
  name: string;
  description: string;
  email?: string;
  contact?: string;
  onSuccess: (response: any) => void;
  onFailure?: (error: any) => void;
}

const RAZORPAY_KEY_ID = "rzp_test_YourKeyHere"; // Replace with your actual key in production

export const initializeRazorpay = (options: RazorpayOptions) => {
  if (!window.Razorpay) {
    toast.error("Razorpay SDK load नहीं हो सका। कृपया इंटरनेट चेक करें।");
    return;
  }

  const razorpayOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amount * 100, // Amount in paise
    currency: "INR",
    name: "Lakhara Samaj Community",
    description: options.description,
    image: "/brand-logo.png",
    handler: function (response: any) {
      toast.success("भुगतान सफल! Transaction ID: " + response.razorpay_payment_id);
      options.onSuccess(response);
    },
    prefill: {
      name: options.name,
      email: options.email || "rakeshlakhara432@gmail.com",
      contact: options.contact || "9876543210",
    },
    notes: {
      address: "Lakhara Samaj Office",
    },
    theme: {
      color: "#CC3300",
    },
  };

  const rzp = new window.Razorpay(razorpayOptions);
  
  rzp.on('payment.failed', function (response: any) {
    toast.error("भुगतान विफल: " + response.error.description);
    options.onFailure?.(response.error);
  });

  rzp.open();
};
