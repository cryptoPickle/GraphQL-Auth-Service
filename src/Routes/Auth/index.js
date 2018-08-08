import {Router} from 'express';
import {GoogleStrategy, FacebookStrategy} from '../../Services/Auth';


const facebook = new FacebookStrategy();
const google = new GoogleStrategy();

const authRoutes = ({config}) => {
  const router = Router();

  // v1/auth/facebook/return ::::::::::::::::::::::::::::::::: Facebook callback


  router.get('/facebook/return', facebook.returnAuthenticate(), (req, res) => {
    res.redirect('/token')
  });

  // v1/auth/facebook ::::::::::::::::::::::::::::::::::::::::::: Facebook Login

  router.get('/facebook', facebook.authenticate());

  // v1/auth/google/return ::::::::::::::::::::::::::::::::::::: Google CallBack

  router.get('/google/return', google.returnAuthenticate(), (req,res) => {
    console.log(req.user)
    res.redirect('/token')
  });

  // v1/auth/google ::::::::::::::::::::::::::::::::::::::::::::::: Google Login

  router.get('/google', google.authenticate());

  // v1/auth/token ::::::::::::::::::::::::::::::::::::::::::::::::: Token Serve
  router.get('/token', (req,res) => {
    //const token = req.user.tokens;
    console.log(req.user)
    //res.json({token})
  });

  return router;

}

export default authRoutes;