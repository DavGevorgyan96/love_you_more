import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from './dto/send-mail.dto';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter | null = null;

  constructor(private readonly config: ConfigService) {
    this.initTransporter();
  }

  private initTransporter() {
    const host = this.config.get<string>('MAIL_HOST');
    const port = this.config.get<number>('MAIL_PORT');
    const user = this.config.get<string>('MAIL_USER');
    const pass = this.config.get<string>('MAIL_PASS');
    const secure = this.config.get<string>('MAIL_SECURE') === 'true';

    if (!host || !user || !pass) {
      console.warn('Mail not configured (MAIL_HOST, MAIL_USER, MAIL_PASS). Emails will not be sent.');
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: port ?? 587,
      secure,
      auth: { user, pass },
    });
  }

  async send(dto: SendMailDto) {
    if (!this.transporter) {
      throw new Error('Mail transporter not configured. Set MAIL_HOST, MAIL_USER, MAIL_PASS.');
    }

    const from = this.config.get<string>('MAIL_FROM') || this.config.get<string>('MAIL_USER');

    const info = await this.transporter.sendMail({
      from: from || 'noreply@localhost',
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      html: dto.html ?? dto.text.replace(/\n/g, '<br>'),
    });

    return { messageId: info.messageId, accepted: info.accepted };
  }
}
