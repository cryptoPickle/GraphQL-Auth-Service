const dotEnv =  require('dotenv');

dotEnv.load();

const isDevelopment = process.env.NODE_ENV === 'development';

const config = { 
  facebookClientID: process.env.FACEBOOK_CLIENT_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
  jwtRefreshToken: process.env.JWT_REFRESH_TOKEN,
  apiPort: process.env.API_PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB
};

module.exports = config;