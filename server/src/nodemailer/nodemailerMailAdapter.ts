import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from '../adapters/mailAdapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '08e6e28c0b8fda',
    pass: '9eda2a39928aea',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <faleconosco@feedget.com>',
      to: 'Geovanne Moro <geovannemoro@hotmail.com>',
      subject,
      html: body,
    });
  }
}
