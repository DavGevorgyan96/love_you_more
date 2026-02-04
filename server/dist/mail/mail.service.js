"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    constructor(config) {
        this.config = config;
        this.transporter = null;
        this.initTransporter();
    }
    initTransporter() {
        const host = this.config.get('MAIL_HOST');
        const port = this.config.get('MAIL_PORT');
        const user = this.config.get('MAIL_USER');
        const pass = this.config.get('MAIL_PASS');
        const secure = this.config.get('MAIL_SECURE') === 'true';
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
    async send(dto) {
        if (!this.transporter) {
            throw new Error('Mail transporter not configured. Set MAIL_HOST, MAIL_USER, MAIL_PASS.');
        }
        const from = this.config.get('MAIL_FROM') || this.config.get('MAIL_USER');
        const info = await this.transporter.sendMail({
            from: from || 'noreply@localhost',
            to: dto.to,
            subject: dto.subject,
            text: dto.text,
            html: dto.html ?? dto.text.replace(/\n/g, '<br>'),
        });
        return { messageId: info.messageId, accepted: info.accepted };
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map