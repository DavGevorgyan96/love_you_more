import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    send(dto: SendMailDto): Promise<{
        messageId: any;
        accepted: any;
    }>;
}
