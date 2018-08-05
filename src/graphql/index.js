import executeableSchema from './utils/executeableSchema';
import User from './User';
import Token from './Token';
import Queries from './Queries'
import Mutations from './Mutations';

const config = {
  typeDefs: [
    Queries.schema,
    Mutations.schema,
    User.schema,
    Token.schema
  ].join('\n'),
  resolver: {...Queries.resolvers, ...Mutations.resolvers},
  context: {}
};

const executedSchema = executeableSchema(config.typeDefs, config.resolver);


export {executedSchema as default, config};


