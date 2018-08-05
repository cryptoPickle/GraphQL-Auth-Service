import executeableSchema from './utils/executeableSchema';
import User from './User';
import Token from './Token';


const config = {
  typeDefs: [
    User.schema,
    Token.schema
  ].join('\n'),
  resolver: null,
  context: null
};

const executedSchema = executeableSchema(config.typeDefs, config.resolver);


export {executedSchema as default, config};


