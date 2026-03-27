---
description: How to setup and deploy the Telegram Bot
---
# Telegram Bot Deployment Workflow

Follow these steps to activate your bot after editing the credentials in your `.env` file.

## 1. Local Configuration (Done)
- Credentials saved in `.env`.
- Files copied to `functions` directory.

## 2. Deploy to Firebase
Run the following command in your terminal:
```bash
firebase deploy --only functions
```

## 3. Activate Webhook
Once the functions are deployed, you will get a URL like:
`https://<region>-<project-id>.cloudfunctions.net/telegramWebhook`

To activate the bot, replace `<YOUR_BOT_TOKEN>` and `<YOUR_FUNCTION_URL>` in this URL and open it in your browser:
`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_FUNCTION_URL>?token=<YOUR_BOT_TOKEN>`

## 4. Test the Bot
- Send `/start` to your bot.
- Send `/stats` to see website counts.
- Send `/post Namskar Lakhara Samaj!` to post to your website news.
