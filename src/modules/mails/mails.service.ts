import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import templates from './mail-templates';

@Injectable()
export class MailsService {
    async sendMail(to: string, subject: string, type: number, data: any) {
        console.log(nodemailer);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const html = this.constructMail(type, data);

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'intelli968@gmail.com', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html, // plain html body
        });

        console.log('Message sent: %s', info.messageId);
    }

    private constructMail(type: number, data: any) {
        switch (type) {
            case 1:
                return templates.verification(data);
            case 2:
                return templates.reset_password(data);
            case 3:
                return templates.congratsMail();
            case 4:
                return templates.passwordChanged();
        }
    }
}
