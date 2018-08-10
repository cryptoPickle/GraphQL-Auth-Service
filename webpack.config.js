const webpack  = require('webpack')
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const webpackMerge = require('webpack-merge');


// const env = process.env.NODE_ENV;
// const isProduction = env !== 'development';


// const plugins = [
//   new webpack.DefinePlugin({
//     $dirname: '__dirname',
//     'process.env':{
//       NODE_ENV: JSON.stringify(env)
//     }
//   }),
//   new webpack.NamedModulesPlugin(),
//   new Dotenv({systemvars: true})
// ];

// if(!isProduction){
//   plugins.push(new webpack.HotModuleReplacementPlugin())
// }

// const entry = isProduction ? [
//   'babel-polyfill',
//   path.resolve(path.join(__dirname, './src/server'))
//   ] : [
//   'webpack/hot/poll?1000',
//   'babel-polyfill',
//   path.resolve(path.join(__dirname, './src/server'))
// ];

const env = process.env.NODE_ENV;

const modeConfig = (env) => require(`./webpack/webpack.${env}`)(env);

module.exports = () => webpackMerge({
  mode: env,
  devtool: false,

  target: 'node',
  name: 'server',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.prod.js',
    libraryTarget: 'commonjs2'
  },


  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  })],


  module:{
    rules: [
      {test: /\.js$/, loader: 'babel-loader', options:{babelrc:true}},
      {test: /\.graphql?$/, loader:'webpack-graphql-loader'}
      ]
  },


  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },


  plugins: [
    new webpack.DefinePlugin({
      $dirname: '__dirname',
      'process.env':{
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new webpack.NamedModulesPlugin(),
    new Dotenv({systemvars: true})
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __dirname: false,
    __filename: false
  }
},
  modeConfig(env)
  );