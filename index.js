console.log('loading babel');

require('babel-core/register');
require("babel-polyfill");


console.log('babel loaded');

require('./app');