import passport from 'passport';
import {Strategy} from 'passport-google-oauth20';
import Auth from './Auth';
import config from '../../../config'

class GoogleStrategy extends Auth {
  constructor(clientID,clientSecret,callbackURL){
    super();
    this.clientID = clientID || config.GOOGLE_CLIENT_ID;
    this.clientSecret = clientSecret || config.GOOGLE_CLIENT_SECRET;
    this.callbackURL = callbackURL || 'http://127.0.0.1:9090/v1/auth/google/return';
    this._stategy();
  }


  _stategy(){
    passport.use(new Strategy({
      clientID: this.clientID,
      clientSecret: this.clientSecret,
      callbackURL: this.callbackURL
    }, async(accessToken, refreshToken, profile, cb) => {


      const {id, name: {familyName, givenName}, emails} = profile;

      const userInfo = {
        id,
        name: givenName,
        surname: familyName,
        email: emails[0].value,
        accessToken
      };

      await this._createUserEntry(userInfo, 'google', cb)
    }));
  }


  authenticate(){
    return passport.authenticate('google',  {session: false, scope: ['openid', 'email' ,'profile'] });
  }


  returnAuthenticate() {
    return passport.authenticate('google', {session: false, failureRedirect: '/google'});
  }
}


export default GoogleStrategy;

//MwAJFmFJ2Shutv2yZHyfC2B97O0oECRfUxY1nA071YqRQf4fLPxku37KeSg3koQF0Y61GdM6KNvN9-MPNqkWUZg