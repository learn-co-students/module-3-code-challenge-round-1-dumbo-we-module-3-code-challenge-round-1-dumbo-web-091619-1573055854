document.addEventListener("DOMContentLoaded", () =>{
    console.log("Thanks for visiting 🍺 BEER APP 🍺")
    console.log("Please click responsibly!")

    // ~~~~~~~~~~~~~~ VARIABLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

    const beerList = document.querySelector("#list-group")
    const beerDetail = document.querySelector("#beer-detail")

    // ~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

    // ADDS BEER TO <UL> SIDEBAR
    let appendBeer = (beer) =>{
        // create beerLi for beer
        let beerLi = document.createElement("li")
        beerLi.setAttribute("class", "list-group-item")
        beerLi.innerText = beer.name
        // add event listener
        beerLi.addEventListener("click", () => {
            // clear existing details from display
            clearTarget(beerDetail)
            // triggers beer detail display
            showBeer(beer)
        })
        // append to <ul> on dom
        beerList.appendChild(beerLi)
    }

    // ASSIGNS BEER DETAILS + APPENDS TO DISPLAY <DIV>
    let showBeer = (beer) => {        
        // name
        let beerName = document.createElement("h1")
        beerName.innerText = beer.name
        beerDetail.appendChild(beerName)

        // image
        let beerImg = document.createElement("img")
        beerImg.src = beer.image_url
        beerDetail.appendChild(beerImg)

        // tagline
        let beerTagline = document.createElement("h3")
        beerTagline.innerText = beer.tagline
        beerDetail.appendChild(beerTagline)

        // description
        let beerDesc = document.createElement("TEXTAREA")
        beerDesc.innerText = beer.description
        beerDetail.appendChild(beerDesc)

        // pairing notes (?)
        let beerPairings = document.createElement("ul")
        beer.food_pairing.forEach(food => {
            let pairingFood = document.createElement("li")
            pairingFood.innerText = food
            beerPairings.appendChild(pairingFood)
        })
        beerDetail.appendChild(beerPairings)

        // brewers tips (?)
        let brewersTips = document.createElement("p")
        brewersTips.innerText = beer.brewers_tips
        beerDetail.appendChild(brewersTips)

        // edit button
        let editButton = document.createElement("button")
        editButton.setAttribute("id", "edit-beer")
        editButton.setAttribute("class", "btn btn-info")
        editButton.innerText = "Save"
        // edit click event handler
        editButton.addEventListener("click", () => {
             editBeer(beer, beerDesc)
        })
        beerDetail.appendChild(editButton)  
    }

    // EDITS BEER DESCRIPTION
    let editBeer = (beer, desc) =>{
        // grab description textarea value, save as object. 
        let updatedDesc = {
            description: desc.value}
        // perform fetch
        patchDesc(beer, updatedDesc)
    }

    // REMOVES ALL CHILD NODES FROM TARGET ELEMENT
    // (this allows clean reloading of data w/o duplicate display)
    let clearTarget = (targetElement) => {
        // assign last child node of target element to variable child
        let child = targetElement.lastElementChild 
        // repeat until all child nodes are removed 
        while (child) { 
            // remove child 
            targetElement.removeChild(child)
            child = targetElement.lastElementChild 
        }
    }

    // ~~~~~~~~~~~~~~~~~~ FETCHES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

    // GET ALL BEERS
    let getBeers = async () =>{

        // clear sidebar <ul>
        clearTarget(beerList)

        // fetch bears
        let response = await fetch("http://localhost:3000/beers")
        let beers = await response.json()
        beers.forEach(beer => {
            appendBeer(beer)
        })
    }

    // PATCH BEER DESCRIPTION
    let patchDesc = async (beer, descValue) => {
        // fetch data
        let fetchObj = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(descValue)
        }
        // perform patch fetch
        let response = await fetch(`http://localhost:3000/beers/${beer.id}`, fetchObj)
        let updatedBeer = await response.json()
        // re-fetch all beers to get updated data
        getBeers()
        // clear the existing display
        // NOTE: removing this will cause double display
        clearTarget(beerDetail)
        // update the dom element data for the edited beer
        showBeer(updatedBeer)
    }

    // ~~~~~~~~~~~~~~~~~~~~ PAGELOAD FUNCTION CALL ~~~~~~~~~~~~~~~~~~ //
    getBeers()
})