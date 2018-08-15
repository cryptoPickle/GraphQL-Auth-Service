const dotEnv =  require('dotenv');

dotEnv.load();

const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  FACEBOOK_CLIENT_ID                           : process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_APP_SECRET                          : process.env.FACEBOOK_APP_SECRET,
  GOOGLE_CLIENT_ID                             : process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET                         : process.env.GOOGLE_CLIENT_SECRET,
  JWT_ACCESS_TOKEN                             : process.env.JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN                            : process.env.JWT_REFRESH_TOKEN,
  API_PORT                                     : process.env.API_PORT,
  POSTGRES_HOST                                : process.env.POSTGRES_HOST,
  POSTGRES_PORT                                : process.env.POSTGRES_PORT,
  POSTGRES_USER                                : process.env.POSTGRES_USER,
  POSTGRES_PASSWORD                            : process.env.POSTGRES_PASSWORD,
  POSTGRES_DB                                  : process.env.POSTGRES_DB,
  DEFAULT_MAIL_SERVICE                         : process.env.DEFAULT_MAIL_SERVICE,
  MG_API_KEY                                   : process.env.MG_API_KEY,
  MG_DOMAIN                                    : process.env.MG_DOMAIN,
  GMAIL_USER                                   : process.env.GMAIL_USER,
  GMAIL_CLIENT_ID                              : process.env.GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET                          : process.env.GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN                          : process.env.GMAIL_REFRESH_TOKEN,
  SMTP_HOST                                    : process.env.SMTP_HOST,
  SMTP_PORT                                    : process.env.SMTP_PORT,
  SMTP_SECURE                                  : process.env.SMTP_SECURE,
  SMTP_USER                                    : process.env.SMTP_USER,
  SMTP_USER_PASSWORD                           : process.env.SMTP_USER_PASSWORD,
  SENDER_NAME                                  : process.env.SENDER_NAME,
  SENDER_ADDRESS                               : process.env.SENDER_ADDRESS,
  DEFAULT_MAIL_SUBJECT                         : process.env.DEFAULT_MAIL_SUBJECT,
  DEFAULT_MAIL_CONTENT                         : process.env.DEFAULT_MAIL_CONTENT,

};

module.exports = config;