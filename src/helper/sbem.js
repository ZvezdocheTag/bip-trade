export const sBem = (setBlock, key) => {
    let block;
    let upperKey = key;
    if(typeof block === "undefined") {
        block = setBlock
    }

    return function(element, modifier) {      
        if(typeof element === "undefined") {
            if(typeof upperKey === 'undefined') {
                return block;
            } else {
                return `${block} ${block}--${upperKey.m}`
            }
            
        } else if(typeof modifier !== 'undefined') {
            return `${block}__${element} ${block}__${element}--${modifier.m}`
        } else {
            return `${block}__${element}`
        }
    }
}
