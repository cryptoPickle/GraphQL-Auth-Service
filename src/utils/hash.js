//@flow/////////////////////////////////////////////////////////////////////////


import bcrypt from 'bcryptjs';

const hash = (param) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err,salt) => {
      if (err) reject(err);
      bcrypt.hash(param ,salt, (err, hash) => {
        if(err) reject(err)
        resolve(hash)
      })
    });
  })
};


export default hash;



