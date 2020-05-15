exports.parse = function(code) {
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
                type: "Code block"
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
        let blockNumber = `${i}`;
        let blockValue = code.slice(tree[blockNumber].start + 1, tree[blockNumber].end - 1);
        blockValue = blockValue.split(";").join(";\n");
        blockValue = blockValue.replace(/\n\s*\n/g, "\n");
        let slicedString = blockValue;
        for(j = 0; j < blockValue.match(/.*:\s*.*;/g).length; j++) {
            let tokenID = "Declaration " + `${j}`;
            tree[blockNumber][tokenID] = new Object();
            tree[blockNumber][tokenID].string = slicedString.match(/.*:\s*.*;/g)[0];
            let prop = 'property';
            tree[blockNumber][tokenID][prop] = new Object();
            tree[blockNumber][tokenID][prop].string = tree[blockNumber][tokenID].string.substring(0, tree[blockNumber][tokenID].string.indexOf(":")).replace(/^\s*/g, "");
            let val = 'value';
            tree[blockNumber][tokenID][val] = new Object();
            tree[blockNumber][tokenID][val].string = tree[blockNumber][tokenID].string.slice(tree[blockNumber][tokenID].string.indexOf(":") + 2, tree[blockNumber][tokenID].string.length).replace(/^\s*/g, "");
            slicedString = slicedString.replace(/.*:\s*.*;/, "");
        }
    }
    
    return tree;
};
