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
server.use(passport.session());

facebook.serializeUser();
facebook.deserializeUser();


server.use('/facebook', facebook.authenticate());
server.use('/facebook/return', facebook.returnAuthenticate());
server.use('/google', google.authenticate());

server.use('/google/return', google.returnAuthenticate());

server.use(userTokenValidation(config.jwtAccessToken));

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