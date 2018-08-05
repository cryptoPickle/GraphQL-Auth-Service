import dotEnv from 'dotenv';

dotEnv.load();

const isDevelopment = process.env.NODE.ENV === 'development';

const config = { 
  facebookClientID: process.env.FACEBOOK_CLIENT_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET
};

export default config;