/**
 * Created by pter9_000 on 16.10.2016.
 */
console.log('loading babel');

require('babel-core/register');
require("babel-polyfill");


console.log('babel loaded');

require('./app');