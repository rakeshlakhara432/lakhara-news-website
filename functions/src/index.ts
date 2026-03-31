import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const GMAIL_EMAIL = "rakeshlakhara432@gmail.com";
const GMAIL_PASS = "ntro chll ekqt rmvz";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASS,
  },
});

const getSecrets = () => {
  return {
    token: process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.WHITELISTED_TELEGRAM_ID || ""
  };
};

const sendToTelegram = async (text: string) => {
  const { token, chatId } = getSecrets();
  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or WHITELISTED_TELEGRAM_ID not set.");
    return;
  }

  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: text,
      parse_mode: "HTML"
    });
  } catch (error: any) {
    console.error("Error sending message to Telegram:", error.response?.data || error.message);
  }
};

// ── OTP FUNCTIONS ─────────────────────────────────────────────────────────────

/**
 * 1. Send OTP to User's Email
 */
export const sendOTP = functions.https.onCall(async (data, context) => {
  const { email } = data;
  if (!email) throw new functions.https.HttpsError("invalid-argument", "Email is required.");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP in Firestore with 5-minute expiry
  await admin.firestore().collection("otp_tokens").doc(email).set({
    otp,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt: Date.now() + 5 * 60 * 1000
  });

  const mailOptions = {
    from: `"LAKHARA DIGITAL NEWS" <${GMAIL_EMAIL}>`,
    to: email,
    subject: "🔐 Your Verification Code - Lakhara Digital News",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #CC3300; text-align: center;">LAKHARA DIGITAL NEWS</h2>
        <p style="font-size: 16px; color: #333;">नमस्ते लखारा समाज बन्धु,</p>
        <p style="font-size: 16px; color: #333;">
          लखारा डिजिटल न्यूज नेटवर्क से जुड़ने के लिए आपका धन्यवाद। यह केवल एक समाचार मंच नहीं है, बल्कि हमारे समाज की आवाज़ है जो हमें एक सूत्र में पिरोती है।
        </p>
        <div style="background: #fdf2f2; padding: 30px; text-align: center; margin: 30px 0; border-radius: 8px;">
           <p style="font-[12px] text-gray-500 uppercase tracking-widest mb-2 font-black">आपका लॉगिन कोड यहाँ है:</p>
           <h1 style="font-size: 48px; color: #CC3300; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p style="font-size: 14px; color: #666; font-weight: bold; text-align: center;">
          यह कोड 5 मिनट के लिए मान्य है। कृपया इसे किसी के साथ साझा न करें।
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 14px; color: #888; text-align: center;">
          ॥ जन जन की आवाज़, राष्ट्र का गौरव ॥ <br/>
          <b>LAKHARA DIGITAL NEWS TEAM</b>
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP Sent Successfully" };
  } catch (error: any) {
    console.error("Email Error:", error);
    throw new functions.https.HttpsError("internal", "Failed to send email.");
  }
});

/**
 * 2. Verify OTP and Authenticate
 */
export const verifyOTP = functions.https.onCall(async (data, context) => {
  const { email, otp } = data;
  if (!email || !otp) throw new functions.https.HttpsError("invalid-argument", "Email and OTP are required.");

  const otpDoc = await admin.firestore().collection("otp_tokens").doc(email).get();
  if (!otpDoc.exists) throw new functions.https.HttpsError("not-found", "Invalid or expired OTP.");

  const { otp: storedOtp, expiresAt } = otpDoc.data() as any;

  if (Date.now() > expiresAt) {
    await admin.firestore().collection("otp_tokens").doc(email).delete();
    throw new functions.https.HttpsError("deadline-exceeded", "OTP Expired.");
  }

  if (storedOtp !== otp) {
    throw new functions.https.HttpsError("permission-denied", "Incorrect OTP.");
  }

  // OTP is correct! Delete it now
  await admin.firestore().collection("otp_tokens").doc(email).delete();

  // Create or get user in Firebase Auth
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch {
    user = await admin.auth().createUser({ email });
  }

  // Ensure Firestore user document exists to trigger onUserCreate
  const userRef = admin.firestore().collection("users").doc(user.uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    await userRef.set({
      uid: user.uid,
      email: email,
      role: "member",
      joinedAt: new Date().toISOString(),
      name: email.split("@")[0] // Default name from email
    });
  }

  // Generate Custom Token for client login
  const customToken = await admin.auth().createCustomToken(user.uid);

  // Notify Admin on Telegram about new/returning user connection
  await sendToTelegram(`🔑 <b>USER CONNECTION</b>\n\n👤 <b>Email:</b> ${email}\n📅 <b>Time:</b> ${new Date().toLocaleString()}\n\n<i>User has successfully verified their identity via Gmail OTP.</i>`);

  return { success: true, token: customToken, uid: user.uid };
});

// ── FIRESTORE TRIGGERS ────────────────────────────────────────────────────────

// 1. Notify on New Member Registration AND Approval Status
export const onMemberChange = functions.firestore
  .document("members/{memberId}")
  .onWrite(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (!change.before.exists) {
      // NEW REGISTRATION
      const text = `
🆕 <b>नया सदस्य पंजीकरण!</b>
👤 <b>नाम:</b> ${after?.name}
📍 <b>शहर:</b> ${after?.city}
💼 <b>व्यवसाय:</b> ${after?.occupation}
📞 <b>फ़ोन:</b> ${after?.phone}
👴 <b>पिता का नाम:</b> ${after?.fatherName}

<a href="https://lakhara-news-website.web.app/admin/members">अनुमोदन (Approve) के लिए एडमिन पैनल खोलें</a>
      `;
      return sendToTelegram(text);
    }

    if (change.after.exists && !before?.isApproved && after?.isApproved) {
      // USER APPROVED
       return sendToTelegram(`✅ <b>सदस्य सत्यापित:</b> ${after?.name} को लखारा समाज समुदाय के लिए सत्यापित कर दिया गया है।`);
    }
    
    return null;
  });

// 2. Notify on New Matrimonial Profile
export const notifyNewMatrimonial = functions.firestore
  .document("matrimonial/{profileId}")
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const text = `
⚤ <b>Naya Matrimonial Profile!</b>
👤 <b>Naam:</b> ${data.name} (${data.gender})
🎂 <b>Umar:</b> ${data.age}
📏 <b>Height:</b> ${data.height}
🎓 <b>Shiksha:</b> ${data.education}
📍 <b>City:</b> ${data.city}
📞 <b>Phone:</b> ${data.phone}

<a href="https://lakhara-news-website.web.app/admin/matrimonial">Verify karne ke liye Admin Panel jaye</a>
    `;
    return sendToTelegram(text);
  });

// 3. Notify on New Support Message
export const notifyNewMessage = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const text = `
📩 <b>Naya Support Message!</b>
👤 <b>Bhejne wala:</b> ${data.name}
📧 <b>Subject:</b> ${data.subject}
📝 <b>Message:</b>
<i>${data.message}</i>
    `;
    return sendToTelegram(text);
  });

// 3. Notify and Welcome New User on Account Creation
export const onUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snapshot, context) => {
    const userData = snapshot.data();
    const { email, name, photoURL, role, joinedAt } = userData;

    if (!email) return null;

    // A. Send Welcome Email to User
    const welcomeMailOptions = {
        from: `"LAKHARA DIGITAL NEWS" <${GMAIL_EMAIL}>`,
        to: email,
        subject: "🌸 लखारा डिजिटल न्यूज़ परिवार में आपका स्वागत है!",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 2px solid #CC3300; border-radius: 15px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #CC3300; margin: 0; font-size: 28px;">LAKHARA DIGITAL NEWS</h1>
              <p style="color: #666; font-weight: bold; margin-top: 5px;">॥ समाज का अपना डिजिटल परिवार ॥</p>
            </div>
            
            <p style="font-size: 18px; color: #333;">नमस्ते <b>${name || "आदरणीय सदस्य"}</b>,</p>
            
            <p style="font-size: 16px; color: #444; line-height: 1.6;">
              लखारा डिजिटल न्यूज़ नेटवर्क के आधिकारिक सदस्य के रूप में जुड़ने पर आपका हृदय से अभिनन्दन। 
              हमारा उद्देश्य हमारे समाज को सूचनात्मक रूप से सशक्त और सामाजिक रूप से एकीकृत करना है।
            </p>
            
            <div style="background: #fff8f8; padding: 20px; border-left: 5px solid #CC3300; margin: 25px 0;">
               <p style="margin: 0; color: #333; font-weight: bold;">अब आप ये सब कर पाएंगे:</p>
               <ul style="color: #555; font-size: 15px; margin-top: 10px;">
                 <li>विवाह योग्य युवक-युवती के प्रोफाइल बनाना और ढूँढना</li>
                 <li>समाज की हर ताज़ा खबर सबसे पहले प्राप्त करना</li>
                 <li>व्यापार और शिक्षा के क्षेत्र में समाज का सहयोग प्राप्त करना</li>
                 <li>अपनी आवाज़ समाज के शीर्ष तक पहुँचाना</li>
               </ul>
            </div>
            
            <p style="font-size: 16px; color: #444;">
              हमें गर्व है कि आप हमारे साथ हैं। चलिए मिलकर लखारा समाज को डिजिटल शिखर पर पहुँचाते हैं।
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://lakhara-news-website.web.app/profile" style="background: #CC3300; color: white; padding: 12px 35px; text-decoration: none; font-weight: bold; border-radius: 5px;">अपना प्रोफाइल देखें</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #888; text-align: center; line-height: 1.5;">
              यह ईमेल आपको लखारा डिजिटल न्यूज़ की सदस्यता के कारण भेजा गया है।<br/>
              <b>संपर्क:</b> 9875150535 | <b>Email:</b> info@lakharanews.in
            </p>
          </div>
        `
    };

    // B. Send User Details to Telegram for Admin Review
    const telegramMessage = `
👤 <b>NEW WEBSITE CONNECTION</b>
--------------------------------
📛 <b>Name:</b> ${name || "N/A"}
📧 <b>Email:</b> ${email}
🎭 <b>Role:</b> ${role || "member"}
📅 <b>Joined:</b> ${joinedAt || new Date().toISOString()}
📸 <b>Photo:</b> ${photoURL ? '<a href="' + photoURL + '">View Profile Pic</a>' : "None"}
--------------------------------
🚀 <i>New user is now connected to the network!</i>
    `;

    try {
      await Promise.all([
        transporter.sendMail(welcomeMailOptions),
        sendToTelegram(telegramMessage)
      ]);
      console.log(`Welcome sequence completed for: ${email}`);
    } catch (error) {
      console.error("Welcome Error:", error);
    }

    return null;
  });

// 4. Telegram Webhook (Handle incoming commands from Telegram)
export const telegramWebhook = functions.https.onRequest(async (req, res) => {
  const { token, chatId } = getSecrets();
  
  if (req.query.token !== token) {
     res.status(401).send("Unauthorized");
     return;
  }

  const message = req.body.message;
  if (!message || String(message.chat.id) !== chatId) {
     res.status(200).send("OK");
     return;
  }

  const text = message.text || "";
  
  if (text.startsWith("/post ")) {
    const newsContent = text.replace("/post ", "").trim();
    if (newsContent) {
      await admin.firestore().collection("samaj_news").add({
        title: "Telegram Update",
        content: newsContent,
        category: "Breaking",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      await sendToTelegram("✅ News published to website successfully!");
    }
  } else if (text === "/stats") {
    const members = await admin.firestore().collection("members").count().get();
    const matrimonial = await admin.firestore().collection("matrimonial").count().get();
    const messages = await admin.firestore().collection("messages").count().get();
    
    const statsText = `
📊 <b>Website Stats:</b>
👥 Members: ${members.data().count}
💍 Matrimonial: ${matrimonial.data().count}
📩 Messages: ${messages.data().count}
    `;
    await sendToTelegram(statsText);
  } else if (text === "/start") {
    await sendToTelegram("Namaste Admin! My features:\n/post [news] - News upload karein\n/stats - Website report dekhein");
  }

  res.status(200).send("OK");
});

