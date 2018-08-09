import express from 'express';
import bodyParser from 'body-parser';
import logger from './Services/Logger';
import passport from 'passport';

import userTokenValidation from './middlewares/token';
import config from './config';
import graphqlHttp from 'express-graphql';
import schema from './graphql';
import routes from './Routes';

import UserModel from './Models/User/UserRepository';
import TokenModel from './Models/Token/TokenRepository';

const server = express();

server.use(bodyParser.json());

server.use(logger(process.env.NODE_ENV));

server.use(passport.initialize());


server.use('/v1', routes);

server.use(userTokenValidation(config.jwtAccessToken));

server.use('/graphql',graphqlHttp((req) => {
  return {
    graphiql: true,
    schema,
    context: {
      req,
      UserModel,
      TokenModel
    }
  }
}));

server.listen(config.apiPort, (err) => {
  if(err) {console.log(err)}
  else {console.log(`🚀Server is ready on ${config.apiPort} 🛸`)};
});

