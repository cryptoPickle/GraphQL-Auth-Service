import express from 'express';
import bodyParser from 'body-parser';
import logger from './middlewares/basiclogger'


const server = express();
server.use(logger);


server.use('/', (req,res) => res.write('dumb root for now '))

server.listen(9090, (err) => {
  if(err) {console.log(err)}
  else {console.log('Server ready to take you to 🚀  Good ☘  port 9090')};
});