const PATH = require('path');

module.exports = {
  entry: './src/script.js',
  output: {
    filename: 'script.js',
    path: PATH.resolve(__dirname, 'js'),
  },
};
