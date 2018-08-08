import passport from 'passport';
import {Strategy} from 'passport-facebook';
import Auth from './Auth';
import config from '../../../config'
import Token from '../Token'

const defaultPermissions =['user_friends', 'emails', 'public_profile'];
const fields = ['id', 'displayName', 'emails', 'first_name', 'middle_name', 'last_name'];




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
      enableProof: true,
      profileFields: fields,
    },async (accessToken, refreshToken, profile, cb) => {

     const {id, name:{familyName, givenName}, email} = profile;
     const userinfo = { id, name: givenName, surname: familyName, email: email, accessToken };

     await this._createUserEntry(userinfo, 'facebook', cb)

   }));
  }

  
  returnAuthenticate(){
    return passport.authenticate('facebook', {
      session: false,
      authType: 'rerequest',
      scope: this.permissions
    })
  }
  
  
  
  authenticate(){
    return passport.authenticate('facebook', {session: false});
  }
}


export default FacebookStrategy;