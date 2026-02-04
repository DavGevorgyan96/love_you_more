import { ConfigService } from '@nestjs/config';
import { SendMailDto } from './dto/send-mail.dto';
export declare class MailService {
    private readonly config;
    private transporter;
    constructor(config: ConfigService);
    private initTransporter;
    send(dto: SendMailDto): Promise<{
        messageId: any;
        accepted: any;
    }>;
}
