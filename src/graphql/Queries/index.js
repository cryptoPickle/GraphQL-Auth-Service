import fs from 'fs';
import path from 'path';
import resolvers from './resolvers';

export default {
  schema: fs.readFileSync(path.resolve(__dirname,'./queries.graphql'), 'utf8'),
  resolvers
}