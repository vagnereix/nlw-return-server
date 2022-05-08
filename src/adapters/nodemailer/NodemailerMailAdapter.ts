import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2c14c7759f80de',
    pass: '921f90779a6aeb',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: 'Equipe Feedget <equipe@feedget.com>',
      to: 'Vagner Reis <vagnereix@dev.com>',
      subject,
      html: body,
    });
  }
}
