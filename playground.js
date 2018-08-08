// import jwt from 'jsonwebtoken';
// import randToken from 'rand-token';
// import { userInfo } from 'os';
//
//
// const createTokken = async (user, secret, secret1) => {
//   const {id, isadmin} = user;
//   const accessToken = jwt.sign({user: {id, isadmin}}, secret, {expiresIn: '1m'});
//   const refreshToken = jwt.sign({user: {id, isadmin}}, secret2, {expiresIn: '7d'});
//   return Promise.all([accessToken, refreshToken]);
// }
//
//


const propertyNameDecider = (section ,type) => {
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

propertyNameDecider('provider','facebook') //?


const queryBuilder = (type, object) => {
  return {test:'test', [propertyNameDecider(type)]: 'value'}
}

queryBuilder('github', {tests:'test'}) //?