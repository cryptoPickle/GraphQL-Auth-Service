import readGqlFile from '../utils/readGraphqlFile';
import resolvers from './resolvers';

export default {
  schema: readGqlFile('./Mutations/mutations.graphql'),
  resolvers
}