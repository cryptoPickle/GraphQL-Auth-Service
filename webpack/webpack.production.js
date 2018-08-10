

module.exports = () => ({
  entry: [
    'babel-polyfill',
    path.resolve(path.join(__dirname, '../src/server'))
  ]
})