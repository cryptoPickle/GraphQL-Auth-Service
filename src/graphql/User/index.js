import readGqlFile from '../utils/readGraphqlFile';

export default {
  schema: readGqlFile('./User/user.schema.graphql')
}