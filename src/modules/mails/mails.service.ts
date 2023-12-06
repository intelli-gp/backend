import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailsService {
  constructor(private readonly config: ConfigService) {}
  async sendMail(to: string, subject: string, text: string) {
    console.log(nodemailer);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get('MAIL_USERNAME'), // generated brevo user
        pass: this.config.get('MAIL_PASSWORD'), // generated brevo password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'intelli968@gmail.com', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    });
    console.log('Message sent:');
  }
}
