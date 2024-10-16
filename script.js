let csFloatDiv = document.getElementById("csfloat")
let skinportDiv = document.getElementById("skinport")

function feeCalc(entryPrice, sellPrice, fee) {
    return [ sellPrice - (sellPrice * fee) , true ? sellPrice - (sellPrice * fee) > entryPrice : false]
}

console.log(csFloatDiv.childNodes)