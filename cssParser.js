const parser        = require('./src/parser.js');

exports.parse = function(input) {
    return parser.parse(input);
};

exports.getAllDeclarationsAtBlock = function(handle, blockNumber) {
    if(blockNumber <= Object.keys(handle).length) {
        let numberOfDeclarations = Object.keys(handle[blockNumber.toString()]).length - 4;
        let returnedObject = new Array();
        for(i = 0; i < numberOfDeclarations; i++) {
            let declarationName = "Declaration " + `${i}`;
            returnedObject.push(handle[blockNumber.toString()][declarationName]);
        }
        return returnedObject;
    }
};

exports.getTokenAtPos = function(handle, position) {
    
};
