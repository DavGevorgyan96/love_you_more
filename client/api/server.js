import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

function getTransporter() {
  const host = process.env.MAIL_HOST;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'true',
    auth: { user, pass },
  });
}

app.get(['/health', '/api/health'], (_req, res) => {
  res.json({ status: 'ok' });
});

app.post(['/mail/send', '/api/mail/send'], async (req, res) => {
  try {
    const { to, subject, text, html } = req.body || {};
    const recipient = to || process.env.CONTACT_EMAIL;

    if (!recipient || !subject || !text) {
      return res.status(400).json({
        message: 'subject and text are required; set CONTACT_EMAIL or pass to in request body',
      });
    }

    const transporter = getTransporter();
    if (!transporter) {
      return res.status(503).json({
        message: 'Mail not configured. Set MAIL_HOST, MAIL_USER, MAIL_PASS.',
      });
    }

    const from = process.env.MAIL_FROM || process.env.MAIL_USER || 'noreply@localhost';
    const info = await transporter.sendMail({
      from,
      to: recipient,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>'),
    });

    return res.json({ messageId: info.messageId, accepted: info.accepted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || 'Failed to send email' });
  }
});

export default function handler(req, res) {
  return app(req, res);
}
