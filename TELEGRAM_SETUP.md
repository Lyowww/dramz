# Telegram Bot Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
NEXT_PUBLIC_TG_BOT=your_bot_username_here

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.dramz.fun

# Web App URL (for Telegram Mini App)
NEXT_PUBLIC_WEB_APP_URL=https://dramz.vercel.app
```

## Required Environment Variables:

1. **TELEGRAM_BOT_TOKEN** - Your Telegram bot token from @BotFather
2. **NEXT_PUBLIC_TG_BOT** - Your bot username (without @)
3. **NEXT_PUBLIC_API_BASE_URL** - Your backend API URL (default: https://api.dramz.fun)
4. **NEXT_PUBLIC_WEB_APP_URL** - Your deployed web app URL (default: https://dramz.vercel.app)

## Setting Up Telegram Webhook

After deploying to Vercel, set the webhook URL:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://dramz.vercel.app/api/telegram/webhook"}'
```

Or use this URL format:
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://dramz.vercel.app/api/telegram/webhook
```

## Testing

1. Send `/start` to your bot in Telegram
2. The bot should respond with a welcome message and a button to open the app
3. Clicking the button will open your web app in Telegram

## Vercel Environment Variables

Make sure to add all environment variables in Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.local` (use the same names)

