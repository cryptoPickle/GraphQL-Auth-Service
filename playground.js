import jwt from 'jsonwebtoken';
import randToken from 'rand-token';
import { userInfo } from 'os';


const createTokken = async (user, secret, secret1) => {
  const {id, isadmin} = user;
  const accessToken = jwt.sign({user: {id, isadmin}}, secret, {expiresIn: '1m'});
  const refreshToken = jwt.sign({user: {id, isadmin}}, secret2, {expiresIn: '7d'});
  return Promise.all([accessToken, refreshToken]);
}


