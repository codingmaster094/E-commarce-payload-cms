// app/api/send-email/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const MAX_PAYLOAD_BYTES = 20 * 1024 * 1024 

export async function POST(request) {
  try {
    const raw = await request.text()
    if (!raw) return NextResponse.json({ error: 'Empty body' }, { status: 400 })

    const byteLength = Buffer.byteLength(raw, 'utf8')
    if (byteLength > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: `Payload too large (${Math.round(byteLength/1024)} KB). Max ${(MAX_PAYLOAD_BYTES/1024)} KB` },
        { status: 413 }
      )
    }

    let body
    try {
      body = JSON.parse(raw)
    } catch (e) {
      console.error('Invalid JSON', e)
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { to, subject, text, html, attachments } = body
    if (!to || !subject || (!text && !html)) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    })

    try {
      await transporter.verify()
      console.log('SMTP verified')
    } catch (verifyErr) {
      console.error('SMTP verify failed', verifyErr)
      return NextResponse.json(
        { error: 'SMTP authentication/connection failed. Check SMTP_HOST, SMTP_USER, SMTP_PASS.' },
        { status: 502 }
      )
    }

    const mailAttachments = Array.isArray(attachments) && attachments.length > 0
      ? attachments.map(a => ({ filename: a.filename, content: Buffer.from(a.content, 'base64') }))
      : undefined

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || 'Website'}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      text,
      html,
      attachments: mailAttachments,
    })

    console.log('sendMail info', { messageId: info?.messageId, accepted: info?.accepted })
    return NextResponse.json({ message: 'Email sent', id: info.messageId })
  } catch (err) {
    console.error('send-email error', err)
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 })
  }
}
