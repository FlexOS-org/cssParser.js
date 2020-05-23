# cssParser.js
A simple, tiny, light and powerful CSS parser written completely in JavaScript and Node.js developed originally for ThetaIDE.

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

<pre>{ &apos;0&apos;: 
   { start: 9,
     end: 56,
     string: &apos;{ background-color: blue; color: white; }&apos;,
     type: &apos;Code block&apos;,
     selector: &apos;.example&apos;,
     &apos;Declaration 0&apos;: 
      { string: &apos; background-color: blue;&apos;,
        property: [Object],
        start: 9,
        end: 34,
        value: [Object] },
     &apos;Declaration 1&apos;: 
      { string: &apos; color: white;&apos;,
        property: [Object],
        start: 34,
        end: 54,
        value: [Object] } } }</pre>
