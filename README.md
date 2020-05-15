# cssParser.js
A simple, tiny, light and powerful CSS parser written completely in JavaScript and Node.js.
##### WARNING: THIS PROJECT IS UNDER DEVELOPMENT, AND IT'S NOT RECOMMENDED TO USE IT.

### How to run it:<br>
NOTE: This library requires Node.js. If you didn't install it, download it from the original site https://nodejs.org/en/ or run `sudo apt-get install nodejs` command if you're on Ubuntu or Debian.

For an example, create an index.js file:

    const cssParser = require('./cssParser.js');
    const FileSystem= require('fs');
    cssParser.parse(FileSystem.readFileSync("example.css").toString());

And create a CSS file called "example.css" in the same directory:

    example {
       background-color: blue;
       color: white;
    }

Finally, run `node index.js` and the output will be an object describing each code block, property and value.

Example:

    {
       '0': {
         start: 8,
         end: 57,
         strings: '{\n    background-color: blue;\n    color: white;\n}',
         type: 'Code block',
         'Declaration 0': 
          { string: '    background-color: blue;',
            property: {
               string: 'background-color'
            },
            value: {
               string: 'blue;'
            }
          },
         'Declaration 1': 
          { string: '    color: white;',
            property: {
               string: 'color'
            },
            value: {
               string: 'white;'
            }
          }
       }
    }
