

// ::::::::::::::::::::::::::::::: GraphQl Middleware To Check If User Logged In


const isLoggedIn = (req, cb) => {
  if(req.user && req.user.isCompleted && req.user.email_verified){

    return cb()
  }

  else{
     if(!req.user.isCompleted) throw new Error('Please Complete Registration');
     else if(!req.user.email_verified) throw new Error("Please Verify Your Mail")
     else{
       throw new Error('Please Login');
     }
  }
};


export default isLoggedIn;