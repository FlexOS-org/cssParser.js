const cssParser = require('./cssParser.js');
const FileSystem= require('fs');

cssParser.parse(FileSystem.readFileSync("./example.css").toString());
