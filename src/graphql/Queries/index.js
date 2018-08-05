import readGqlFile from '../utils/readGraphqlFile';
import resolvers from './resolvers';

export default {
  schema: readGqlFile('./Queries/queries.graphql'),
  resolvers
}