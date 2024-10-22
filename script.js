const csFloatDiv = document.getElementById("CSfloatResult")
const skinportDiv = document.getElementById("SkinportResult")
const steamDiv = document.getElementById("steamResult")

const entryPrice = document.getElementById("entryPrice")
const sellPrice = document.getElementById("sellPrice")

let taxSites = [
    {
        name: "csFloat",
        div: csFloatDiv,
        fee: 2
    },
    {
        name: "skinPort",
        div: skinportDiv,
        fee: 12
    },
    {
        name: "steam",
        div: steamDiv,
        fee: 15
    }
]

function feeCalc(entryPrice, sellPrice, fee) {
    return [sellPrice - (sellPrice * fee), (sellPrice - (sellPrice * fee) - entryPrice).toFixed(2), true ? ((sellPrice - (sellPrice * fee)) > entryPrice) : false]
}

function setSellPrice() {
    taxSites.forEach((i, k) => {
        console.log(taxSites[k])
        taxSites[k].div.innerHTML = `Sell: ${feeCalc(entryPrice.value, sellPrice.value, (taxSites[k].fee / 100))[0]} | Profit: ${feeCalc(entryPrice.value, sellPrice.value, (taxSites[k].fee / 100))[1]}`
        taxSites[k].div.style.color = feeCalc(entryPrice.value, sellPrice.value, (taxSites[k].fee / 100))[2] ? "green" : "red"
    })
}

function addSite(name, fee) {
    let siteDiv = document.createElement("div")
    let siteName = document.createElement("p")
    let siteResult = document.createElement("p")
    let deleteBut = document.createElement("button")
    deleteBut.innerHTML = "Delete"
    siteResult.setAttribute("id", name)
    siteName.innerHTML = name

    siteDiv.append(siteName)
    siteDiv.append(siteResult)
    siteDiv.append(deleteBut)
    document.body.append(siteDiv)

    setTimeout(() => {
        taxSites.push({
            "name": name,
            "div": document.getElementById(name),
            "fee": Number(fee)
        })
    }, 100)

    deleteBut.addEventListener("click", () => {
        siteName.remove()
        siteResult.remove()
        deleteBut.remove()
        siteDiv.remove()
    })
}

function submitSite() {
    let inputName = document.createElement("input")
    let inputTax = document.createElement("input")
    let submitButton = document.createElement("Button")
    submitButton.innerHTML = "Submit"
    
    inputName.setAttribute("placeholder", "name")
    inputTax.setAttribute("placeholder", "fee")

    document.getElementById("newSite").append(inputName)
    document.getElementById("newSite").append(inputTax)
    document.getElementById("newSite").append(submitButton)

    submitButton.addEventListener("click", () => {
        addSite(inputName.value, inputTax.value)
        setTimeout(() => {
            inputName.remove()
            inputTax.remove()
            submitButton.remove()
        }, 100)
    })
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