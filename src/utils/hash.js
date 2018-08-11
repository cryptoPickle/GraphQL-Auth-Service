//@flow/////////////////////////////////////////////////////////////////////////


import bcrypt from 'bcryptjs';


const hash = {}

hash.password = (param) => {
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

hash.compare = (userpassword, hash) =>{
  return new Promise((resolve,reject) => {
    bcrypt.compare(userpassword, hash, (err,res) => {
      if(err) reject(err);
      resolve(res)
    })
  })
};


export default hash;



