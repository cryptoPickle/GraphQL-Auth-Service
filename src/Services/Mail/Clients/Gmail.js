import nodemailer from 'nodemailer';

class Gmail {
  constructor(config) {
    this.config = config;
    this.client = this._gmailInit();
  }
  _gmailInit() {
    return nodemailer.createTransport(this._gmailConfig(this.config));
  }
  _gmailConfig(config) {
    const { user, clientId, clientSecret, refreshToken } = config;
    return {
      service: 'gmail',
      auth: { type: 'oauth2', user, clientId, clientSecret, refreshToken }
    };
  }
};


export default Gmail;