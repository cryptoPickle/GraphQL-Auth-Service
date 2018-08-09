import jwt from 'jsonwebtoken';
import {Token} from '../../Services/Auth'



const userTokenValidation = (accessTokenSecret) => 
  async (req, res, next) => {
    const tokenManager = new Token();
    const token = req.headers['x-token'];
    if(token){
      try{
        const {user} = jwt.verify(token, accessTokenSecret);
        req.user = user;
      }catch(err){
        const refreshToken = req.headers['x-refresh-token'];
        const newTokens = await tokenManager.refreshTokens(token, refreshToken);
        if(newTokens.token && newTokens.refreshToken){
          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        }
        req.user = newTokens.user;
      }
  }
  next();
};

export default userTokenValidation;