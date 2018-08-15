const webpack = require('webpack');
const path = require('path');


module.exports = () => ({
  entry: [
    'webpack/hot/poll?1000',
    'babel-polyfill',
    path.resolve(path.join(__dirname, '../src/server'))
  ],
  plugins: [new webpack.HotModuleReplacementPlugin()]
})