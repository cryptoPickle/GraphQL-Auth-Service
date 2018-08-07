import express from 'express';
import bodyParser from 'body-parser';
import logger from './middlewares/basiclogger';
import passport from 'passport';
import Auth from './Services/Auth/Strategies/Auth';
import {GoogleStrategy, FacebookStrategy} from './Services/Auth';
import userTokenValidation from './middlewares/token';
import config from './config'
import graphqlHttp from 'express-graphql';
import schema from './graphql'




const server = express();
server.use(bodyParser.json())
server.use(logger);

const facebook = new FacebookStrategy();
const google = new GoogleStrategy();

server.use(passport.initialize());




server.use(userTokenValidation(config.jwtAccessToken));

server.get('/facebook/return', facebook.returnAuthenticate(), (req, res) => {
  const token = req.user.tokens;
  res.json({token})
});
server.get('/facebook', facebook.authenticate());
server.use('/google', google.authenticate());

server.use('/google/return', google.returnAuthenticate(), (req,res) => {
  res.redirect('/graphql')
});



server.use('/graphql',graphqlHttp((req) => {
  return {
    graphiql: true,
    schema,
    context: {}
  }
}))

server.listen(9090, (err) => {
  if(err) {console.log(err)}
  else {console.log('Server ready to take you to 🚀  Good ☘  port 9090')};
});