import readGqlFile from '../utils/readGraphqlFile';

export default {
  schema: readGqlFile('./User/schema/user.schema.graphql')
}