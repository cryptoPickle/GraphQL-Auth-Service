import {makeExecutableSchema} from 'graphql-tools';


const executeableSchema = (typeDefs, resolvers) => 
  makeExecutableSchema({typeDefs, resolvers})


export default executeableSchema;