import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../data/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { samajService } from "../../services/samajService";

interface GoogleAuthButtonProps {
  label?: string;
  onSuccess?: (user: any) => void;
  className?: string;
}

export function GoogleAuthButton({ label = "Google से जुड़ें", onSuccess, className = "" }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    
    // Applying Official OAuth 2.0 Best Practices
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Step 1: Check if users collection already has this UID
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Step 2: Check if there's an existing Member record with this email
        // but no UID linked (orphan member record)
        let memberLinked = false;
        if (user.email) {
          const existingMember = await samajService.getMemberByEmail(user.email);
          if (existingMember && !existingMember.uid) {
            await samajService.linkMemberToUser(existingMember.id!, user.uid);
            memberLinked = true;
          }
        }

        // Step 3: Initialize the User Document
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || "Unknown User",
          email: user.email,
          photoURL: user.photoURL,
          role: "member",
          joinedAt: new Date().toISOString(),
          bio: "लखारा डिजिटल न्यूज नेटवर्क का गर्वित सदस्य।",
          location: "भारत",
          authMethod: "google.oauth2",
          isMemberLinked: memberLinked
        });
      }

      toast.success("Google प्रवेश सफल! 🎉");
      if (onSuccess) onSuccess(user);
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        toast.error("प्रवेश खिड़की बंद कर दी गई।");
      } else if (err.code === 'auth/cancelled-popup-request') {
        // Ignore parallel requests
      } else {
        toast.error("प्रवेश विफल: " + (err.message || "Unknown error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className={`relative w-full flex items-center justify-center gap-4 bg-white border border-slate-200 text-slate-800 py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-70 group ${className}`}
    >
      {isLoading ? (
        <Loader2 className="size-5 animate-spin text-primary" />
      ) : (
        <>
          <svg className="size-5 shrink-0" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="group-hover:text-primary transition-colors">{label}</span>
        </>
      )}
    </button>
  );
}
