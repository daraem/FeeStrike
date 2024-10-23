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
        taxSites[k].div.innerHTML = `Sell: ${feeCalc(entryPrice.value, sellPrice.value, (taxSites[k].fee / 100))[0]} <br> Profit: ${feeCalc(entryPrice.value, sellPrice.value, (taxSites[k].fee / 100))[1]}`
        taxSites[k].div.style.color = feeCalc(entryPrice.value, sellPrice.value, (taxSites[k].fee / 100))[2] ? "green" : "red"
    })
}

siteContainers = 1
function addSite(name, fee) {
    let siteDiv = document.createElement("div")
    siteDiv.setAttribute("class", "site")
    let siteName = document.createElement("p")
    let siteResult = document.createElement("p")
    let deleteBut = document.createElement("button")
    deleteBut.innerHTML = "Delete"
    siteResult.setAttribute("id", name)
    siteName.innerHTML = name

    siteDiv.append(siteName)
    siteDiv.append(siteResult)
    // siteDiv.append(deleteBut)
    if(document.getElementById(`div${siteContainers}`).childElementCount == 5) {
        siteContainers += 1;
        let newContainer = document.createElement("div")
        newContainer.setAttribute("class", "sites")
        newContainer.setAttribute("id", `div${siteContainers}`)
        document.body.append(newContainer)
        newContainer.append(siteDiv)
    } else {
        document.getElementById(`div${siteContainers}`).append(siteDiv)
    }
    

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
    let newSite = document.createElement("div")
    newSite.setAttribute("id", "newSite")
    document.getElementById("mainInput").append(newSite)

    let inputName = document.createElement("input")
    let inputTax = document.createElement("input")
    let submitButton = document.createElement("Button")
    submitButton.innerHTML = "Submit"
    
    inputName.setAttribute("placeholder", "name")
    inputTax.setAttribute("placeholder", "fee")
    inputTax.setAttribute("type", "number")

    newSite.append(inputName)
    newSite.append(inputTax)
    newSite.append(submitButton)

    submitButton.addEventListener("click", () => {
        addSite(inputName.value, inputTax.value)
        setTimeout(() => {
            inputName.remove()
            inputTax.remove()
            submitButton.remove()
            newSite.remove()
        }, 50)
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

