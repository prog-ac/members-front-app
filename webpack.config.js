const Dotenv = require('dotenv-webpack');

plugins: [
  new Dotenv()
],

// なんか言われたら
node: {
  fs: 'empty'
}