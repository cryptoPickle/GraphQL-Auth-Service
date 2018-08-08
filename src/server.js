import express from 'express';
import bodyParser from 'body-parser';
import logger from './Services/Logger';
import passport from 'passport';
import {GoogleStrategy, FacebookStrategy} from './Services/Auth';
import userTokenValidation from './middlewares/token';
import config from './config'
import graphqlHttp from 'express-graphql';
import schema from './graphql'




const server = express();
server.use(bodyParser.json())
server.use(logger(process.env.NODE_ENV));

const facebook = new FacebookStrategy();
const google = new GoogleStrategy();

server.use(passport.initialize());




server.use(userTokenValidation(config.jwtAccessToken));

server.get('/facebook/return', facebook.returnAuthenticate(), (req, res) => {
  const token = req.user.tokens;
  res.json({token})
});
server.get('/facebook', facebook.authenticate());

server.get('/google/return', google.returnAuthenticate(), (req,res) => {
  const token = req.user.tokens;
  res.json({token})
});

server.get('/google', google.authenticate());





server.use('/graphql',graphqlHttp((req) => {
  return {
    graphiql: true,
    schema,
    context: {}
  }
}))

server.listen(config.apiPort, (err) => {
  if(err) {console.log(err)}
  else {console.log(`🚀Server is ready on ${config.apiPort}`)};
});