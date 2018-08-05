import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import Auth from './Auth';
import config from '../../../config'


class JWTStrategy extends Auth {
  constructor(params, jwtSecret){
    super()
    this.jwtSecret = jwtSecret || config.jwtAccessToken;
    this.params = params || {
      secretOrKey: this.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    };
    this._jwtStrategy();
  }
  _jwtStrategy(){
    passport.use(new Strategy(params, async (payload, done) => {
      this.model.findOne({id: payload.id}, (err, user) => {
        if(err) return done(err,false);
        if(user) return done(null, user || undefined);
        return done(null,false);
      })
    }));
  }
  authenticate(){
    return passport.authenticate('jwt', { 
      session: false, 
      secret:this.jwtSecret
    })
  }
}


export default (params, jwtSecret) => new JWTStrategy(params, jwtSecret);