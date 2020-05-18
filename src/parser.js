exports.parse = function(code) {
    code = code.replace(/(@import\s*((".*")|('.*'));)|(@import\s*url\(\s*((".*")|('.*'))\s*\);)/g, function(x) {
        return "0".repeat(x.length);
    }); code = code.replace(/(^(@charset\s*((".*")|('.*'))))/g, function(x) {
        return "0".repeat(x.length);
    }); code = code.replace(/(^(@charset\s*((".*")|('.*'))))/g, function(x) {
        return "0".repeat(x.length);
    });
    
    tree = new Object();
    increment = new Number();
    valueIncrement = new Number(0);
    level = new Number();
    for(i = 0; i < code.length; i++) {
        if(code.charAt(i) == "{" && level < 1) {
            level++;
            blockName = `${increment}`;
            tree[blockName] = new Object();
            tree[blockName] = {
                start: "",
                end: "",
                string: "",
                type: "Code block",
                selector: ""
            };
            
            tree[blockName].start = i;
            increment++;
        } else if(code.charAt(i) == "}") {
            tree[blockName].end = i + 1;
            tree[blockName].string = code.slice(tree[blockName].start, tree[blockName].end);
            level--;
        }
    }
    
    for(i = 0; i < increment; i++) {
        let array = [];
        let arrayCount = 0;
        let blockNumber = `${i}`;
        let selector = "";
        if(i > 0) {
            selector = code.slice(tree[`${i - 1}`].end, tree[blockNumber].start - 1).split("\n").join("").split("\r").join("").replace(/0+/g, "");
        } else {
            selector = code.substring(0, tree[blockNumber].start - 1).split("\n").join("").split("\r").join("").replace(/0+/g, "");
        }
        tree[blockNumber].selector = selector;
        let blockValue = code.slice(tree[blockNumber].start + 1, tree[blockNumber].end - 1);
        let slicedString = blockValue;
        array = tree[blockNumber].string.split(";");
        for(j = 0; j < array.length; j++) {
            if(j != array.length - 1) {
                array[j] = array[j] + ";";
            }
        } for(j = 0; j < array.length; j++) {
            let size = 0;
            let arraY = array.slice(j - 1, j);
            let string = "";
            for(k = 0; k < arraY.length; k++) {
                string = string + arraY[k];
            }
            array[j] = string + array[j];
        }
        
        for(j = 0; j < blockValue.match(/(.*?):(\s*?)(.*?);/g).length; j++) {
            let tokenID = "Declaration " + `${j}`;
            tree[blockNumber][tokenID] = new Object();
            tree[blockNumber][tokenID].string = slicedString.match(/(.*?):(\s*?)(.*?);/g)[0];
            let prop = 'property';
            tree[blockNumber][tokenID][prop] = new Object();
            tree[blockNumber][tokenID][prop].string = tree[blockNumber][tokenID].string.substring(0, tree[blockNumber][tokenID].string.indexOf(":")).replace(/^\s*/g, "");
            if(j != 0) {
                tree[blockNumber][tokenID].start = tree[blockNumber].start + array[j - 1].length;
                tree[blockNumber][tokenID].end   = array[j].length + tree[blockNumber].start;
            } else {
                tree[blockNumber][tokenID].start = tree[blockNumber].start + tree[blockNumber].string.search(/(.*?):(\s*?)(.*?);/g);
                tree[blockNumber][tokenID].end   = array[j].length + tree[blockNumber].start;
            }
            
            tree[blockNumber][tokenID][prop].start = tree[blockNumber][tokenID].start + tree[blockNumber][tokenID].string.substring(0, tree[blockNumber][tokenID].string.indexOf(":")).search(/[^\s]/);
            tree[blockNumber][tokenID][prop].end = tree[blockNumber][tokenID].start + tree[blockNumber][tokenID].string.search(":");
            
            let val = 'value';
            tree[blockNumber][tokenID][val] = new Object();
            tree[blockNumber][tokenID][val].string = tree[blockNumber][tokenID].string.slice(tree[blockNumber][tokenID].string.indexOf(":") + 2, tree[blockNumber][tokenID].string.length).replace(/^\s*/g, "");
            tree[blockNumber][tokenID][val].start = tree[blockNumber][tokenID].start + tree[blockNumber][tokenID].string.search(":") + 1;
            tree[blockNumber][tokenID][val].end = tree[blockNumber][tokenID][val].start + tree[blockNumber][tokenID][val].string.length;
            slicedString = slicedString.replace(/(.*?):(\s*?)(.*?);/, "");
        }
    }
    
    return tree;
};
