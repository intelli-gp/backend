import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailsService {
  async sendMail(to: string, subject: string, text: string) {
    console.log(nodemailer);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME, // generated brevo user
        pass: process.env.MAIL_PASSWORD, // generated brevo password
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
