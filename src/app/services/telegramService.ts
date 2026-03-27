const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const telegramService = {
  async sendMessage(message: string) {
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Telegram credentials not found in environment variables.");
      return;
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Telegram Error:", error);
        throw new Error(error.description || "Failed to send Telegram message");
      }

      return await response.json();
    } catch (error) {
      console.error("Telegram notification failed:", error);
      throw error;
    }
  },

  async sendRegistrationNotification(userData: any) {
    const message = `
🔔 <b>New Member Registration</b>
--------------------------------
👤 <b>Name:</b> ${userData.name}
👴 <b>Father's Name:</b> ${userData.fatherName}
📞 <b>Phone:</b> ${userData.phone}
📍 <b>City:</b> ${userData.city}
📧 <b>Email:</b> ${userData.email || "N/A"}
🏠 <b>Family Type:</b> ${userData.familyType}
💼 <b>Occupation:</b> ${userData.occupation}
--------------------------------
<i>Please review and approve in the admin panel.</i>
    `;
    return this.sendMessage(message);
  },

  async sendMatrimonialNotification(profileData: any) {
    const message = `
💖 <b>New Matrimonial Profile</b>
--------------------------------
👤 <b>Name:</b> ${profileData.name}
👫 <b>Gender:</b> ${profileData.gender}
🎂 <b>Age:</b> ${profileData.age}
📏 <b>Height:</b> ${profileData.height}
📍 <b>City:</b> ${profileData.city}
🎓 <b>Education:</b> ${profileData.education}
💼 <b>Occupation:</b> ${profileData.occupation}
👴 <b>Father's Name:</b> ${profileData.fatherName}
👵 <b>Mother's Name:</b> ${profileData.motherName}
📞 <b>Phone:</b> ${profileData.phone || "Privacy enabled"}
📧 <b>Email:</b> ${profileData.email || "N/A"}
--------------------------------
<i>New match request waiting for approval!</i>
    `;
    return this.sendMessage(message);
  },

  async sendContactNotification(contactData: any) {
    const message = `
📨 <b>New Contact Message</b>
--------------------------------
👤 <b>From:</b> ${contactData.name}
📝 <b>Subject:</b> ${contactData.subject}
💬 <b>Message:</b> ${contactData.message}
--------------------------------
<i>Check admin panel for details.</i>
    `;
    return this.sendMessage(message);
  },

  async testConnection() {
    const message = `🚀 <b>Telegram Bot Connection Test</b>\n\nYour website is now successfully connected to this bot. Notifications will appear here!`;
    return this.sendMessage(message);
  }
};
