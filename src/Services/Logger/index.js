import moment from 'moment';
import morgan from 'morgan';


// Ip Address

morgan.token('ip', (req) => {
  return (req.connection.remoteAddress.split(':')[3]) ?
    req.connection.remoteAddress.split(':')[3] : 'localhost'
})

const devLogger = (env) => {
  if(env === 'development'){
    return morgan((tokens, req, res) =>  {
      return [
        tokens['ip'](req,res),
        '-',
        `[${moment().format('D/MMM/YYYY HH:mm:ss')}]`,
        '-',
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms'
      ].join(' ')
    })
  }
};


export default devLogger;