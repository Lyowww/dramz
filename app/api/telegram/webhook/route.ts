import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`
const WEB_APP_URL = process.env.NEXT_PUBLIC_WEB_APP_URL || 'https://dramz.vercel.app'

async function sendMessage(chatId: number, text: string, replyMarkup?: any) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN is not set')
    return
  }

  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Telegram API error:', error)
  }

  return response.json()
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.message) {
      const { message } = body
      const chatId = message.chat.id
      const text = message.text

      if (text === '/start') {
        const welcomeText = `🎬 Добро пожаловать в <b>DRAMZ</b>!

Смотрите лучшие сериалы прямо в Telegram!

Нажмите кнопку ниже, чтобы открыть приложение 👇`

        const replyMarkup = {
          inline_keyboard: [
            [
              {
                text: '🚀 Открыть приложение',
                web_app: { url: WEB_APP_URL },
              },
            ],
          ],
        }

        await sendMessage(chatId, welcomeText, replyMarkup)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Telegram webhook endpoint. Use POST method.' })
}

