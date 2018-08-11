const fs = require('fs');
const path = require('path');


const files = [
  './src/graphql/Mutations/mutations.graphql',
  './src/graphql/Queries/queries.graphql',
  './src/graphql/Token/token.schema.graphql',
  './src/graphql/User/user.schema.graphql'
];

const copyFile = (file) => {
  fs.createReadStream(path.resolve(__dirname,'..', file ), 'utf8')
    .pipe(fs.createWriteStream(`dist/${path.basename(file)}`))
    .on('finish', () => console.log('Gql files copied!'))
};


files.forEach(item => copyFile(item));


