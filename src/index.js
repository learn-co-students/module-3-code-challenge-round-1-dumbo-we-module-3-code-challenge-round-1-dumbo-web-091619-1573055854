const beerListGroup = document.querySelector("#list-group")
const beerDetailDiv = document.querySelector("#beer-detail")
let newDescription = 0;

fetch("http://localhost:3000/beers")
.then(r => r.json())
.then(resObj => {
    console.log(resObj)
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

        brewers_tips: "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus."
        contributed_by: "Sam Mason <samjbmason>"
        description: "please god work"
        first_brewed: "09/2007"
        food_pairing: (3)["Spicy chicken tikka masala", "Grilled chicken quesadilla", "Caramel toffee cake"]
        id: 1
        image_url: "https://images.punkapi.com/v2/keg.png"
        name: "Buzz"
        tagline: "A Real Bitter Experience."
    
        beerDetailDiv.innerHTML = 
        `<h1>${beer.name}</h1><img src="${beer.image_url}"> <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info">
                    Save
        </button>
        <h4>Brewers Tips:</h4><p>${beer.brewers_tips}</p><h4>Contributed By: </h4><p>${beer.contributed_by}</p><h4>First Brewed: </h4><p>${beer.first_brewed}</p><h4>Food Pairing:</h4>`
        
        const tipList = document.createElement("ul")
        beer.food_pairing.forEach(food => {
            const tipItem = document.createElement("li")
            tipItem.innerText = food
            tipList.append(tipItem)
        })

        beerDetailDiv.append(tipList)

        const editButton = beerDetailDiv.querySelector("#edit-beer")

        editButton.addEventListener("click", (event) => {
            const textArea = beerDetailDiv.querySelector("textarea")
            newDescription = textArea.value

            fetch(`http://localhost:3000/beers/${beer.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    description: newDescription
                })
            })
                .then(r => r.json())
                .then(() => {
                    beer.description = newDescription
                    textArea.value = beer.description
                })
        })


    })
}

// function addEventListenerToBeerListItem(beer) {
//     const thisBeerListItem = document.querySelector(`#beer-${beer.id}`)

//     thisBeerListItem.addEventListener("click", (event) => {
//         beerDetailDiv.innerHTML = ""

//         const beerH1 = document.createElement("h1")
//         beerH1.innerText = beer.name

//         const beerImg = document.createElement("img")
//         beerImg.src = beer.image_url

//         const beerH3 = document.createElement("h3")
//         beerH3.innerText = beer.tagline

//         const beerTextArea = document.createElement("textarea")
//         beerTextArea.id = `textarea-${beer.id}`
//         beerTextArea.value = beer.description

//         const beerButton = document.createElement("button")
//         beerButton.id = `edit-beer-${beer.id}`
//         beerButton.className = "btn btn-info"
//         beerButton.innerText = "Save"

//         beerDetailDiv.append(beerH1, beerImg, beerH3, beerTextArea, beerButton)

//         addEventListenerToBeerEditButton(beer)

//     })
// }

// function addEventListenerToBeerEditButton(beer) {
//     const beerButton = document.querySelector(`#edit-beer-${beer.id}`)

//     beerButton.addEventListener("click", (event) => {
//         event.preventDefault()
//         // debugger
//         const beerTextArea = event.target.previousElementSibling
        
//         fetch(`http://localhost:3000/beers/${beer.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 description: beerTextArea.value
//             })
//         })
//         .then(r => r.json())
//         .then((resObj) => {
//             beerTextArea.value = resObj.description
//         })
//     })
// }