const s={async sendMessage(e){{console.error("Telegram credentials not found in environment variables.");return}},async sendRegistrationNotification(e){const n=`
🔔 <b>New Member Registration</b>
--------------------------------
👤 <b>Name:</b> ${e.name}
👴 <b>Father's Name:</b> ${e.fatherName}
📞 <b>Phone:</b> ${e.phone}
📍 <b>City:</b> ${e.city}
📧 <b>Email:</b> ${e.email||"N/A"}
🏠 <b>Family Type:</b> ${e.familyType}
💼 <b>Occupation:</b> ${e.occupation}
--------------------------------
<i>Please review and approve in the admin panel.</i>
    `;return this.sendMessage(n)},async sendMatrimonialNotification(e){const n=`
💖 <b>New Matrimonial Profile</b>
--------------------------------
👤 <b>Name:</b> ${e.name}
👫 <b>Gender:</b> ${e.gender}
🎂 <b>Age:</b> ${e.age}
📏 <b>Height:</b> ${e.height}
📍 <b>City:</b> ${e.city}
🎓 <b>Education:</b> ${e.education}
💼 <b>Occupation:</b> ${e.occupation}
👴 <b>Father's Name:</b> ${e.fatherName}
👵 <b>Mother's Name:</b> ${e.motherName}
📞 <b>Phone:</b> ${e.phone||"Privacy enabled"}
📧 <b>Email:</b> ${e.email||"N/A"}
--------------------------------
<i>New match request waiting for approval!</i>
    `;return this.sendMessage(n)},async sendContactNotification(e){const n=`
📨 <b>New Contact Message</b>
--------------------------------
👤 <b>From:</b> ${e.name}
📝 <b>Subject:</b> ${e.subject}
💬 <b>Message:</b> ${e.message}
--------------------------------
<i>Check admin panel for details.</i>
    `;return this.sendMessage(n)},async testConnection(){return this.sendMessage(`🚀 <b>Telegram Bot Connection Test</b>

Your website is now successfully connected to this bot. Notifications will appear here!`)}};export{s as t};
