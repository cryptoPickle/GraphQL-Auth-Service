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

      const userinfo = {
        facebook_profile_id: id,
        facebook_verified: true,
        name: givenName,
        surname: familyName,
        email: email,
      };
      this._createUserEntry(id, userinfo, accessToken, cb)

   }));
  }

  async _createToken(fields, user, facebookToken, cb){
    if(fields) {
      const accessToken = new Token();

      user.tokens =  await accessToken.createTokens(user);

      await this.tokenmodel.findOrUpdate(user.id, {
        jwt_access_token: user.tokens[0],
        jwt_refresh_token: user.tokens[1],
        facebook_access_token: facebookToken
      });

      return cb(null, user)
    }

    return cb('Please fill profile details')
  }

  async _createUserEntry(facebook_profile_id, userinfo, facebookToken, cb){

    const returnedUser = await this.usermodel.findOrCreate({
      facebook_profile_id
    }, userinfo)

    const user = returnedUser[0]

    const isAllFieldsCompleted = Object.values(user).every(item => item);

    await this._createToken(isAllFieldsCompleted, user, facebookToken, cb)

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