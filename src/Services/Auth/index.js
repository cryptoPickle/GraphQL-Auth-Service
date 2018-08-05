import FacebookStrategy from './Strategies/FacebookStrategy';
import GoogleStrategy from './Strategies/GoogleStrategy';
import authWithJWT from './Strategies/JWTStrategy';
import authWithLocal from './Strategies/LocalStrategy';
import Token from './Token'

export {
  FacebookStrategy,
  GoogleStrategy,
  Token,
  authWithJWT,
  authWithLocal,
};