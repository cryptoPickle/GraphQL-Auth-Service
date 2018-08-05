import passport from 'passport';

class Auth {
  constructor(model){
    this.model = model; 
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