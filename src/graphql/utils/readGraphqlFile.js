import fs from 'fs';
import path from 'path';


const readGQLFile = (file) => {
  const filePath = path.resolve(__dirname, '..', file); 
  return fs.readFileSync(filePath, 'utf8');
}

export default readGQLFile;
