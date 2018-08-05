import passport from 'passport';
import {Strategy} from 'passport-google-oauth20';
import Auth from './Auth';
import config from '../../../config'

class GoogleStrategy extends Auth {
  constructor(clientID,clientSecret,callbackURL){
    super();
    this.clientID = clientID || config.googleClientID;
    this.clientSecret = clientSecret || config.googleClientSecret;
    this.callbackURL = callbackURL || 'http://127.0.0.1:9090/google/return';
    this._stategy();
  }
  _stategy(){
    passport.use(new Strategy({
      clientID: this.clientID,
      clientSecret: this.clientSecret,
      callbackURL: this.callbackURL
    },(accessToken, refreshToken, profile, cb) => {
      console.log({accessToken, refreshToken, profile})
      this.model.findOrCreate({googleId: profile.id}, (err, user) => {
        return cb(err,user)
      })
    }));
  }
  authenticate(){
    return passport.authenticate('google',  { scope: ['openid', 'email' ,'profile'] });
  }
  returnAuthenticate() {
    return passport.authenticate('google');
  }
}


export default GoogleStrategy;