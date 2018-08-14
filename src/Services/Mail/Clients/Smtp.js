import nodemailer from 'nodemailer';

class Smtp {
  constructor(config) {
    this.config = config;
    this.client = this._smtpInit();
  }
  _smtpInit() {
    return nodemailer.createTransport(this._smtpConfig(this.config));
  }
  _smtpConfig(config) {
    const { host, port, secure, user, pass } = config;
    return { host, port, secure, auth: { user, pass } };
  }
};


export default Smtp;