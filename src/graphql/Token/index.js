import readGqlFile from '../utils/readGraphqlFile';

export default {
  schema: readGqlFile('./Token/schema/token.schema.graphql')
}