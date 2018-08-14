import {Gmail, Mailgun, Smtp} from './Clients';


class Mail {
  constructor(config) {
    const {
      service,
      mgApiKey,
      mgDomain,
      googleUser,
      googleClientId,
      googleClientSecret,
      googleRefreshToken,
      smptpHost,
      smtpPort,
      smtpSecure,
      smtpUser,
      smtpPass
    } = config;

    //// Configs :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    this.service = service;
    this.mailgunConfig = { auth: { api_key: mgApiKey, domain: mgDomain } };
    this.gmailConfig = {
      user: googleUser,
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      refreshToken: googleRefreshToken
    };
    this.smptpConfig = {
      host: smptpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
      pass: smtpPass
    };
  }

  _decideClient(type) {
    switch (type) {
      case 'gmail':
        const gmail = new Gmail(this.gmailConfig);
        return gmail.client;
      case 'mailgun':
        const mailgun = new Mailgun(this.mailgunConfig);
        return mailgun.client;
      case 'smtp':
        const smtp = new Smtp(this.smptpConfig);
        return smtp.client;
    }
  }

  sendMail(mail) {
    const { from, to, subject, text, html } = mail;
    const client = this._decideClient(this.service);
    return new Promise((resolve, reject) => {
      client.sendMail({ from, to, subject, text }, (err, info) => {
        if (err) return reject(err);
        return resolve(info);
      });
    });
  }
}

export default Mail;