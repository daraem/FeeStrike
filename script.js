const csFloatDiv = document.getElementById("CSfloatResult")
const skinportDiv = document.getElementById("SkinportResult")
const steamDiv = document.getElementById("steamResult")

const entryPrice = document.getElementById("entryPrice")
const sellPrice = document.getElementById("sellPrice")

const taxSitesRef = ["csFloat", "skinPort", "steam"]
let taxSites = {
    "csFloat": {
        div: csFloatDiv,
        tax: 2
    },
    "skinPort": {
        "div": skinportDiv,
        "tax": 12
    },
    "steam": {
        "div": steamDiv,
        "tax": 15
    }
} 

function feeCalc(entryPrice, sellPrice, fee) {
    return [sellPrice - (sellPrice * fee), (sellPrice - (sellPrice * fee) - entryPrice).toFixed(2), true ? ((sellPrice - (sellPrice * fee)) > entryPrice) : false]
}

function setSellPrice() {
    taxSitesRef.forEach((i, k) => {
        taxSites[taxSitesRef[k]].div.innerText = `Sell: ${feeCalc(entryPrice.value, sellPrice.value, (taxSites[taxSitesRef[k]].tax / 100))[0]} | Profit: ${feeCalc(entryPrice.value, sellPrice.value, (taxSites[taxSitesRef[k]].tax / 100))[1]}`
        taxSites[taxSitesRef[k]].div.style.color = feeCalc(entryPrice.value, sellPrice.value, (taxSites[taxSitesRef[k]].tax / 100))[2] ? "green" : "red"
    })
}

function addSite() {
    let inputName = document.createElement("input")
    let inputTax = document.createElement("input")
    inputName.setAttribute("placeholder", "name")
    document.getElementById("newSite").append(inputName)
    document.getElementById("newSite").append(inputTax)
}

"keypress mouseup".split(" ").forEach((e) => {
    entryPrice.addEventListener(e, () => {
        setTimeout(() => {
            if(entryPrice.value > 0) {
                setSellPrice()
            }
        }, 1)
    })
})

"keypress mouseup".split(" ").forEach((e) => {
    sellPrice.addEventListener(e, () => {
        setTimeout(() => {
            if(entryPrice.value > 0) {
                setSellPrice()
            }
        }, 1)
    })
})