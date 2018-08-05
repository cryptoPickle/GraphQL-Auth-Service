import passport from 'passport';
import {Strategy} from 'passport-local';
import Auth from './Auth';


class LocalStrategy extends Auth {
  constructor(){
    super()
    this._localStrategy()
  }
  _localStrategy(){
    passport.use(new Strategy({
      usernameField: 'email',
      passportField: 'passport',
      session: false
    },(username, password, done) => {
      this.model.findOne({username}, (err,user) => {
        if (err) return done(err);
        if(!user) return done(null, false, {message: 'Invalid Credentials'});
        if(!user.validatePassword(password)) return done(null, false, {message: 'Invalid Credentials'});
        return done(null, user);
      })
    }));
  }
  session(){
    return passport.session();
  }
};


export default new LocalStrategy();