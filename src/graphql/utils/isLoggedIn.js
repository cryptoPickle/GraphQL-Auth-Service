

// ::::::::::::::::::::::::::::::: GraphQl Middleware To Check If User Logged In


const isLoggedIn = (req, cb) => {
  if(req.user && req.user.isCompleted){

    return cb()
  }
  else{
     if(!req.user.isCompleted) throw new Error('Please Complete Registration');
     else{
       throw new Error('Please Login');
     }
  }
};


export default isLoggedIn;