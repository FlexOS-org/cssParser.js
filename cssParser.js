const parser = require('./src/parser.js');
const scrape = require('./src/scrape.js');

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

exports.preprocess = function(input) {
    let matched     = [];
    let matchedPos  = [];
    if(input.search(/(@import\s*((".*")|('.*'));)|(@import\s*url\(\s*((".*")|('.*'))\s*\);)|(@import\s*url\(\s*.*\s*\);)/g) != -1) {
        for(i = 0; i < input.match(/(@import\s*((".*")|('.*'));)|(@import\s*url\(\s*((".*")|('.*'))\s*\);)|(@import\s*url\(\s*.*\s*\);)/g).length; i++) {
            matched.push(input.match(/(@import\s*((".*")|('.*'));)|(@import\s*url\(\s*((".*")|('.*'))\s*\);)|(@import\s*url\(\s*.*\s*\);)/g)[i]);
            matchedPos.push()
        }
    }
    
    for(i = 0; i < matched.length; i++) {
        matched[i] = matched[i].replace(/^@import\s*/g, "");
        matched[i] = matched[i].replace(/(\s*;)$/gm, "");
        if(matched[i].search(/(^(url\())/g) != -1) {
            matched[i] = matched[i].replace(/(^(url\())/g, "");
        }
        
        matched[i] = matched[i].replace(/(^")|(^')/g, "").replace(/("$)|('$)|('\s*\)\s*$)|("\s*\)\s*$)|(\)\s*$)/g, "");
        
        if(matched[i].search(/(^((https|https):\/\/www\..*\.[A-z]*))|(^((https|https):\/\/.*\.[A-z]*))|(^(www\..*\.[A-z]*))/g) != -1) {
            return scrape.scrape(matched[i]);
        }
    }
}
