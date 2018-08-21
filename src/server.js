import express from "express";
import bodyParser from "body-parser";
import logger from "./Services/Logger";
import passport from "passport";

import userTokenValidation from "./middlewares/token";
import config from "./config";
import graphqlHttp from "express-graphql";
import schema from "./graphql";
import routes from "./Routes";
import isAuthenticated from "./graphql/utils/isLoggedIn";

import UserModel from "./Models/User/UserRepository";
import TokenModel from "./Models/Token/TokenRepository";

const app = express();

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: HMR
if (module.hot) {
  module.hot.accept();
}
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.use(bodyParser.json());

app.use(logger(process.env.NODE_ENV));

app.use(passport.initialize());

app.use("/v1", routes);

app.use(userTokenValidation(config.JWT_ACCESS_TOKEN));

app.use(
  "/graphql",
  graphqlHttp((req, res) => {
    return {
      graphiql: true,
      schema,
      context: {
        req,
        res,
        UserModel,
        TokenModel,
        isAuthenticated
      }
    };
  })
);

app.listen(config.API_PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`🚀Server is ready on ${config.API_PORT}`);
  }
});
