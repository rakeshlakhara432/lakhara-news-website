import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

/**
 * Required Configuration:
 * Run these commands to set up the bot:
 * 
 * firebase functions:secrets:set TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN"
 * firebase functions:secrets:set ADMIN_CHAT_ID="YOUR_CHAT_ID"
 */

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

// 1. Notify on New Member Registration
export const notifyNewMember = functions.firestore
  .document("members/{memberId}")
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const text = `
🆕 <b>Naya Member Registration!</b>
👤 <b>Naam:</b> ${data.name}
📍 <b>City:</b> ${data.city}
💼 <b>Occupation:</b> ${data.occupation}
📞 <b>Phone:</b> ${data.phone}
👴 <b>Pitaji ka Naam:</b> ${data.fatherName}

<a href="https://your-website.com/admin/members">Approve karne ke liye Admin Panel jaye</a>
    `;
    return sendToTelegram(text);
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

<a href="https://your-website.com/admin/matrimonial">Verify karne ke liye Admin Panel jaye</a>
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

// 4. Telegram Webhook (Handle incoming commands from Telegram)
export const telegramWebhook = functions.https.onRequest(async (req, res) => {
  const { token, chatId } = getSecrets();
  
  // Verify token in URL for security (e.g. /telegramWebhook?token=XXXX)
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
