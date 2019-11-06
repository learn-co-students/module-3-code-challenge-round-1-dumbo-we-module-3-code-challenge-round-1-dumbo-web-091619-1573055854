const beerListGroup = document.querySelector("#list-group")
const beerDetailDiv = document.querySelector("#beer-detail")

fetch("http://localhost:3000/beers")
.then(r => r.json())
.then(resObj => {
    resObj.forEach(beer => {
        turnJSONIntoHTML(beer)
    })
})

function turnJSONIntoHTML(beer) {
    const beerListItem = document.createElement("li")
    beerListItem.id = `beer-${beer.id}`
    beerListItem.className = "list-group-item"
    beerListItem.innerText = beer.name

    beerListGroup.append(beerListItem)

    addEventListenerToBeerListItem(beer)
}

function addEventListenerToBeerListItem(beer) {
    const thisBeerListItem = document.querySelector(`#beer-${beer.id}`)

    thisBeerListItem.addEventListener("click", (event) => {
        beerDetailDiv.innerHTML = ""

        const beerH1 = document.createElement("h1")
        beerH1.innerText = beer.name

        const beerImg = document.createElement("img")
        beerImg.src = beer.image_url

        const beerH3 = document.createElement("h3")
        beerH3.innerText = beer.tagline

        const beerTextArea = document.createElement("textarea")
        beerTextArea.id = `textarea-${beer.id}`
        beerTextArea.value = beer.description

        const beerButton = document.createElement("button")
        beerButton.id = `edit-beer-${beer.id}`
        beerButton.className = "btn btn-info"
        beerButton.innerText = "Save"

        beerDetailDiv.append(beerH1, beerImg, beerH3, beerTextArea, beerButton)

        addEventListenerToBeerEditButton(beer)

    })
}

function addEventListenerToBeerEditButton(beer) {
    const beerButton = document.querySelector(`#edit-beer-${beer.id}`)

    beerButton.addEventListener("click", (event) => {
        event.preventDefault()
        // debugger
        const beerTextArea = event.target.previousElementSibling
        
        fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                description: beerTextArea.value
            })
        })
        .then(r => r.json())
        .then((resObj) => {
            beerTextArea.value = resObj.description
        })
    })
}