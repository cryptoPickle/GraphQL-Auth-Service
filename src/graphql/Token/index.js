import fs from 'fs';
import path from 'path';

export default {
  schema: fs.readFileSync(path.resolve(__dirname,'./token.schema.graphql'), 'utf8'),
 
}