import {Gmail, Mailgun, Smtp} from './Clients';
import Config from '../../config'


const {
  DEFAULT_MAIL_SERVICE,
  MG_API_KEY,
  MG_DOMAIN,
  GMAIL_USER,
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_USER_PASSWORD

} = Config;

const defaultConfig = {
  service  : DEFAULT_MAIL_SERVICE,
  mgApiKey : MG_API_KEY,
  mgDomain : MG_DOMAIN,
  googleUser : GMAIL_USER,
  googleClientId : GMAIL_CLIENT_ID,
  googleClientSecret : GMAIL_CLIENT_SECRET,
  googleRefreshToken : GMAIL_REFRESH_TOKEN,
  smptpHost : SMTP_HOST,
  smtpPort: SMTP_PORT,
  smtpSecure :  SMTP_SECURE,
  smtpUser :  SMTP_USER,
  smtpPass: SMTP_USER_PASSWORD
}

class Mail {
  constructor(config) {
    this.config = config || defaultConfig;
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
    } = this.config;



    //// Configs :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    this.service = service
    this.mailgunConfig = {
      auth: {
        api_key: mgApiKey,
        domain: mgDomain,
      }
    };
    this.gmailConfig = {
      user: googleUser ,
      clientId: googleClientId ,
      clientSecret: googleClientSecret,
      refreshToken: googleRefreshToken
    };
    this.smptpConfig = {
      host: smptpHost ,
      port: smtpPort ,
      secure: smtpSecure ,
      user: smtpUser ,
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
      client.sendMail({ from, to, subject, text, html }, (err, info) => {
        if (err) return reject(err);
        return resolve(info);
      });
    });
  }
}

export default Mail;