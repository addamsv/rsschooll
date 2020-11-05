const PATH = require('path');

module.exports = {
  // mode: 'production',
  entry: './src/script.js',
  output: {
    filename: 'script.js',
    path: PATH.resolve(__dirname, 'js'),
  },
};
