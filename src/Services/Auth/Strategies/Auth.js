import passport from 'passport';
import userRepository from '../../../Models/User/UserRepository';
import tokenRepository from '../../../Models/Token/TokenRepository';
import Token from '../Token';




class Auth {
  constructor(model){
    this.usermodel = model || userRepository;
    this.tokenmodel = model || tokenRepository;
  }

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Internal Methods

  _propertyNameDecider(section ,type){
    switch(section){
      case 'token':
        switch (type) {
          case 'facebook':
            return 'facebook_access_token';
          case 'google':
            return 'google_access_token';
        }
      case 'profile':
        switch(type){
          case 'facebook':
            return 'facebook_profile_id';
          case 'google':
            return 'google_profile_id';
        }
      case 'provider':
        switch(type){
          case 'facebook':
            return 'facebook_verified';
          case 'google':
            return 'google_verified'
        }
    }
  }

  _checkFields(obj){
    return Object.values(obj).every(item => item);
  }

  _checkUserValidUser(user) {

    const check = this._checkFields(user);
    if(check) return {...user, isCompleted: true};
    return user;
  }

  async _createUserEntry(userinfo, type, cb){

    const {id,accessToken,name,surname,email} = userinfo;


    const userObj = {
      [this._propertyNameDecider('profile', type)]: id,
      [this._propertyNameDecider('provider', type)]: true,
      name,
      surname,
      email
    };

    const checkedUser = this._checkUserValidUser(userObj, type)

    const returnedUser = await this.usermodel.findOrCreate({
      [this._propertyNameDecider('profile', type)] : id,
      email
    }, checkedUser, type);


    const user = returnedUser[0];

    const fieldCheck = this._checkFields(user);

    await this._createToken({fieldCheck, user, accessToken, type}, cb)
  };



  async _createToken(params, cb){
    const {fieldCheck, user, accessToken, type} = params;

    if(fieldCheck) {
      const jwtToken = new Token();


      user.tokens =  await jwtToken.createTokens(user);
      await this.tokenmodel.findOrUpdate(user.id,{
        jwt_access_token: user.tokens[0],
        jwt_refresh_token: user.tokens[1],
        [this._propertyNameDecider('token',type)]: accessToken
      });

      return cb(null, user)
    }

    return cb('Please fill profile details')
  }
}


export default Auth;