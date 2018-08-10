import express from 'express';
import bodyParser from 'body-parser';
import logger from './Services/Logger';
import passport from 'passport';

import userTokenValidation from './middlewares/token';
import config from './config';
import graphqlHttp from 'express-graphql';
import schema from './graphql';
import routes from './Routes';
import http from 'http';

import UserModel from './Models/User/UserRepository';
import TokenModel from './Models/Token/TokenRepository';

const app = express();

app.use(bodyParser.json());

app.use(logger(process.env.NODE_ENV));

app.use(passport.initialize());


app.use('/v1', routes);

app.use(userTokenValidation(config.jwtAccessToken));

app.use('/graphql',graphqlHttp((req,res) => {
  return {
    graphiql: true,
    schema,
    context: {
      req,
      res,
      UserModel,
      TokenModel
    }
  }
}));

const server = http.createServer(app);

server.listen(config.apiPort, (err) => {
  if(err) {console.log(err)}
  else {console.log(`🚀Server is ready on ${config.apiPort} 🛸`)};
});


// PM2 Graceful Shutdown

process.on('SIGINT', () => {
  console.log('Server is shutting down... 🚦')
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1)
    }
  })
});

