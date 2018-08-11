import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import userRepository from '../../Models/User/UserRepository'

/// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 

class Token  {
  constructor(model, accessToken, refreshToken){
    this.userModel = userRepository;
    this.accessTokenSecret = accessToken || config.jwtAccessToken;
    this.refreshTokenSecret = refreshToken || config.jwtRefreshToken;
  }

  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Creating Tokens
  async createTokens(user, userpass){
    const refreshTokenSecret = (userpass) ? this.refreshTokenSecret + userpass : this.refreshTokenSecret;

    const accessToken = jwt.sign({user}, this.accessTokenSecret, {expiresIn:'1m'});
    const refreshToken = jwt.sign({user}, refreshTokenSecret, {expiresIn: '7d'});
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
    if(!user){
      return false
    }
    else{
      const refreshSecret = this.refreshTokenSecret + ((user.password) ? user.password : "");
      try{
        jwt.verify(refreshToken, refreshSecret);
      }catch(e){
        return {}
      }
      const [newToken, newRefreshToken] = await this.createTokens(user, user.password);
      return {
        token: newToken,
        refreshToken: newRefreshToken,
        user
      }
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