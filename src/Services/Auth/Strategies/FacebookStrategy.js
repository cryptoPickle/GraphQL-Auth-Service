import passport from 'passport';
import {Strategy} from 'passport-facebook';
import Auth from './Auth';

const defaultPermissions = ['user_friends', 'email','user_birthday','user_photos']

class FacebookStrategy extends Auth {
  constructor(clientID, clientSecret,callbackURL,permissions){
    super();
    this.clientID = clientID || process.env.FACEBOOK_CLIENT_ID;
    this.clientSecret = clientSecret || process.env.FACEBOOK_APP_SECRET;
    this.callbackURL = callbackURL;
    this.permissions = permissions || defaultPermissions;
    this._facebookStrategy();
  }
  _facebookStrategy(){
    passport.use(new Strategy({
      clientID: this.clientID,
      clientSecret: this.clientSecret,
      callbackURL: this.callbackURL,
      enableProof: true
    },(accessToken, refreshToken, profile, cb) => {
      this.model.findOrCreate({facebookId: profile.id}, (err,user) => {
        return cb(err,user)
      })
    }));
  }
  authenticate(){
    return passport.authenticate('facebook', {authType: 'rerequest', scope: this.permissions})
  }
}


export default (clientID, clientSecret,callbackURL,permissions) => 
  new FacebookStrategy(clientID, clientSecret,callbackURL,permissions)