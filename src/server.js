import express from 'express';
import bodyParser from 'body-parser';
import logger from './middlewares/basiclogger';
import passport from 'passport';
import Auth from './Services/Auth/Strategies/Auth';
import {GoogleStrategy, FacebookStrategy} from './Services/Auth';
import userTokenValidation from './middlewares/token';
import config from './config'






const server = express();
server.use(bodyParser.json())
server.use(logger);

const facebook = new FacebookStrategy();
const google = new GoogleStrategy();

server.use(passport.initialize());
server.use(passport.session());

facebook.serializeUser();
facebook.deserializeUser();


server.get('/facebook', facebook.authenticate());
server.get('/facebook/return', facebook.returnAuthenticate());
server.get('/google', google.authenticate());

server.get('/google/return', google.returnAuthenticate());

server.use(userTokenValidation(config.jwtAccessToken));

server.use('/', (req,res) => res.write('dumb root for now '))

server.listen(9090, (err) => {
  if(err) {console.log(err)}
  else {console.log('Server ready to take you to 🚀  Good ☘  port 9090')};
});