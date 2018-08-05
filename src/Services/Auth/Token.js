import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Auth from './Strategies/Auth';
import config from '../../config'

/// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 

class Token extends Auth { 
  constructor(accessToken, refreshToken){
    super()
    this.accessToken = accessToken || config.jwtAccessToken;
    this.refreshToken = refreshToken || config.jwtRefreshToken;
  }

  /// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Creating Tokens
  async createTokens(user){
    const {id} = user;
    const accessToken = jwt.sign({user:id}, this.accessToken, {expiresIn:'1m'});
    const refreshToken = jwt.sign({user:id}, this.refreshToken, {expiresIn: '7d'});
    return Promise.all([accessToken, refreshToken]);
  }


  async refreshTokens(accesToken, refreshToken){
    let userId = -1;
    try{
      const {user: {id}} = jwt.decode(refreshToken);
      userId = id;
    }catch(e){
      return {}
    }

    if(!userId) {
      return {}
    };

    const user = await this.model.findOne({where: {id: userId}, raw: true});

    const refreshSecret = this.refreshToken + user.password;
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