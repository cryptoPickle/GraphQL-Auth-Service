import passport from 'passport';
import userRepository from '../../../Models/User/UserRepository';
import tokenRepository from '../../../Models/Token/TokenRepository';

class Auth {
  constructor(model, req, res, next){
    this.usermodel = model || userRepository;
    this.tokenmodel = model || tokenRepository;

  }
  serializeUser(){
    return passport.serializeUser((user, done) => {
      done(null, user)
    })
  }
  deserializeUser(){
    return passport.deserializeUser((obj, done) => {
      done(null, obj);
    })
  }
}


export default Auth;