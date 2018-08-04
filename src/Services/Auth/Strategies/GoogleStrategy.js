import passport from 'passport';
import {Strategy} from 'passport-google-oauth20';
import Auth from './Auth';


class GoogleStrategy extends Auth {
  constructor(clientID,clientSecret,callbackURL){
    super();
    this.clientID = clientID || process.env.GOOGLE_CLIENT_ID;
    this.clientSecret = clientSecret || process.env.GOOGLE_CLIENT_SECRET;
    this.callbackURL = callbackURL;
    this._googleStategy();
  }
  _googleStategy(){
    passport.use(new Strategy({
      clientID: this.clientID,
      clientSecret: this.clientSecret,
      callbackURL: this.callbackURL
    },(accessToken, refreshToken, profile, cb) => {
      this.model.findOrCreate({googleId: profile.id}, (err, user) => {
        return cb(err,user)
      })
    }));
  }
  authenticate(){
    return passport.authenticate('google',  { scope: ['profile'] });
  }
}


export default (clientID,clientSecret,callbackURL) => 
  new GoogleStrategy(clientID,clientSecret,callbackURL)