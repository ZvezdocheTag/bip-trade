export const compareArray = (a, b) => {
    let result = [];
    
    for(let i = 0; i < a.length; i+=1) {
        for(let j = 0; j < b.length; j+=1) {
            if(a[i].MarketName === b[j].name) {
                result.push({...a[i], bipLow: b[j].low, bipHigh: b[j].high })
            }
        }
    }
    return result;
}
