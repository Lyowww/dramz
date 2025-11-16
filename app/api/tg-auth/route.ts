import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const widgetHtml = (bot: string, authUrl: string) => `<!doctype html>
<html><head><meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>body{margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#0f0b1d;color:#fff;font-family:ui-sans-serif,system-ui}</style></head>
<body>
<script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="${bot}" data-size="large" data-auth-url="${authUrl}" data-request-access="write"></script>
</body></html>`

function verify(params: URLSearchParams) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) return true
  const hash = params.get('hash') || ''
  const data = [...params.entries()]
    .filter(([k]) => k !== 'hash')
    .map(([k, v]) => `${k}=${v}`)
    .sort()
    .join('\n')
  const secret = crypto.createHash('sha256').update(token).digest()
  const computed = crypto.createHmac('sha256', secret).update(data).digest('hex')
  const authDateSec = Number(params.get('auth_date') || '0')
  if (authDateSec && Math.abs(Math.floor(Date.now() / 1000) - authDateSec) > 86400) return false
  return computed === hash
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const sp = url.searchParams

  if (sp.get('start') === 'widget') {
    const bot = sp.get('bot') || process.env.NEXT_PUBLIC_TG_BOT
    if (!bot) {
      return new NextResponse('Bot username not configured. Please set NEXT_PUBLIC_TG_BOT environment variable.', { status: 500 })
    }
    const authUrl = new URL('/api/tg-auth', url.origin)
    const redirect = sp.get('redirect')
    if (redirect) authUrl.searchParams.set('redirect', redirect)
    return new NextResponse(widgetHtml(bot, authUrl.toString()), { headers: { 'content-type': 'text/html' } })
  }

  if (sp.get('mock') === '1') {
    const mock = { id: 1, first_name: 'Demo', username: 'demo_user' }
    const res = NextResponse.redirect(new URL('/', req.url))
    res.cookies.set('tgUser', JSON.stringify(mock), { path: '/', httpOnly: false })
    return res
  }

  if (sp.get('hash')) {
    if (!verify(sp)) return NextResponse.json({ ok: false }, { status: 401 })
    const user = {
      id: Number(sp.get('id') || '0'),
      first_name: sp.get('first_name') || undefined,
      last_name: sp.get('last_name') || undefined,
      username: sp.get('username') || undefined,
      photo_url: sp.get('photo_url') || undefined
    }
    const target = sp.get('redirect') || '/'
    const res = NextResponse.redirect(new URL(target, url.origin))
    res.cookies.set('tgUser', JSON.stringify(user), { path: '/', httpOnly: false })
    return res
  }

  return NextResponse.redirect(new URL('/?login=1', req.url))
}


