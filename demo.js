const cssParser = require('./cssParser.js');

cssParser.parse(".example { background-color: grey; position: absolute; } @import (myfile.css);");
