import nodemailer from 'nodemailer';
import mailgunConfig from 'nodemailer-mailgun-transport';

class MailGun {
  constructor(config) {
    this.config = config;
    this.client = this._mailgunInit();
  }
  _mailgunInit() {
    return nodemailer.createTransport(mailgunConfig(this.config));
  }
}

export default MailGun;