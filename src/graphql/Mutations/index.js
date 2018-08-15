import resolvers from './resolvers';
import fs from 'fs';
import path from 'path';



export default {
  schema: fs.readFileSync(path.resolve(__dirname,'./mutations.graphql'), 'utf8'),
  resolvers
}