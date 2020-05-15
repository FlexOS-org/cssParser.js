//const preprocessor  = require('./preprocessor.js');
const parser        = require('./src/parser.js');

exports.parse = function(input) {
    parser.parse(input);
};