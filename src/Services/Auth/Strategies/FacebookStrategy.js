import passport from 'passport';
import {Strategy} from 'passport-facebook';
import Auth from './Auth';
import config from '../../../config'


const defaultPermissions = ['user_friends', 'email','user_birthday','user_photos']

class FacebookStrategy extends Auth {
  constructor(clientID, clientSecret,callbackURL,permissions){
    super();
    
    this.clientID = clientID || config.facebookClientID;
    this.clientSecret = clientSecret || config.facebookAppSecret;
    this.callbackURL = callbackURL || 'http://localhost:9090/facebook/return';
    this.permissions = permissions || defaultPermissions;
    this._strategy();
  }
  
  
  _strategy(){
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
  
  
  returnAuthenticate(){
    return passport.authenticate('facebook', {authType: 'rerequest', scope: this.permissions})
  }
  
  
  
  authenticate(){
    return passport.authenticate('facebook');
  }
}


export default FacebookStrategy;