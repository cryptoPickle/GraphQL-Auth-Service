import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import userRepository from '../../Models/User/UserRepository'

/// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 

class Token  {
  constructor(model, accessToken, refreshToken){
    this.userModel = userRepository;
    this.accessToken = accessToken || config.jwtAccessToken;
    this.refreshToken = refreshToken || config.jwtRefreshToken;
  }

  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Creating Tokens
  async createTokens(user){
    ;
    const accessToken = jwt.sign({user}, this.accessToken, {expiresIn:'1m'});
    const refreshToken = jwt.sign({user}, this.refreshToken, {expiresIn: '7d'});
    return Promise.all([accessToken, refreshToken]);
  }


  async refreshTokens(accesToken, refreshToken){
    let userId = -1;
    try{
      const {user:{id}} = jwt.decode(refreshToken);
      userId = id;
    }catch(e){
      return {}
    }

    if(!userId) {
      return {}
    };

    const fetchedUser = await this.userModel.getUserById(userId);
    const user = fetchedUser[0];


    const refreshSecret = this.refreshToken + ((user.password) ? user.password : "");
    try{
      jwt.verify(refreshToken, refreshSecret);
    }catch(e){
      return {}
    }
    const [newToken, newRefreshToken] = await this.createTokens(user);
    return {
      token: newToken,
      refreshToken: newRefreshToken,
      user
    }
  }


  async loginWithToken(email, password) {
    const user = await this.model.findOne({where: {email}, raw: true})
    if(!user) throw new Error('Invalid Credentials');
    else{
      const isValid = await bcrypt.compare(password, user.password);
      if(!isValid) throw new Error('Invalid Credentials')
      else {
        this.refreshToken = this.refreshToken + user.password;
        const [token, refreshToken] = await this.createTokens(user);
        return { token, refreshToken};
      }
    }
  }
}


export default Token;