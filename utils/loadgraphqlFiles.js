const fs = require('fs');
const path = require('path');



const copyFile = (file) => {
  fs.createReadStream(path.resolve(__dirname,'..', file ), 'utf8')
    .pipe(fs.createWriteStream(`dist/${path.basename(file)}`))
    .on('finish', () => console.log('graphql files copied 🖥 ⚒'))
};




const gqlfiles = []
const findGqlFiles =  (basedir, filter) => {

    if (!fs.existsSync(basedir)) {
      console.log('No Directory on ' + basedir)
    }
    else {
      const dirList = fs.readdirSync(basedir);


     return dirList.forEach((file, item) => {
        let filepath = path.join(basedir, file);
        const stat = fs.lstatSync(filepath);
        if (stat.isDirectory()) {
          findGqlFiles(filepath, filter)
        }

        else if (filepath.indexOf(filter) >= 0) {
          console.log('🎖--found', filepath);
          return gqlfiles.push(filepath)
        }
      });
    }

};



findGqlFiles('./src', '.graphql')

gqlfiles.forEach(item => copyFile(item));