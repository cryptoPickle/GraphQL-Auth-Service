

// ::::::::::::::::::::::::::::::: GraphQl Middleware To Check If User Logged In


const isLoggedIn = (req, res, cb) => {
  if(req.user && req.user.isCompleted && req.user.email_verified){

    return cb()
  }

  else{
     if(req.user){
       if(!req.user.isCompleted) res.json({error:'Please Complete Registration'});
       else if(!req.user.email_verified) res.json({error:'Please Verify Your Mail'})
     }
     else{
       res.json({error:'Please Login'});
     }
  }
};


export default isLoggedIn;