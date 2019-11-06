
fetch(`http://localhost:3000/beers`)
.then(r => r.json())
.then(allBeers => allBeers.forEach(beer => {
    
    
    let pageBody = document.querySelector('body')
    let beersUl = document.createElement("ul")
    let beersLi = document.createElement("li")
    beersUl.innerHTML = `<ul class="list-group"></ul>`
    beersUl.append(beersLi)
    beersLi.innerHTML = `<li class="list-group-item"> ${beer.name} </li>`
    pageBody.append(beersUl)

    beersLi.addEventListener("click", () => {
        let beerDetailDiv = document.getElementById("beer-detail")
        let beerMainDetails = document.createElement("div")
        let beerDescDetails = document.createElement("textarea")
        let beerSaveButton = document.createElement("button")

        beerDetailDiv.append(beerMainDetails, beerDescDetails, beerSaveButton)
        beerMainDetails.innerHTML = 
        `<h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>`
        beerDescDetails.innerHTML = `${beer.description}`
        
        beerSaveButton.innerHTML = `<button id="edit-beer" class="btn btn-info">
          Save
        </button>`


        let newFormPost = beerDescDetails.addEventListener("submit", (event) => {
            event.preventDefault()
            debugger;
            fetch(`http://localhost:3000/beers/${beer.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    description: beer.description     
                    })
                })
            
            
            
         })

        beerSaveButton.addEventListener("click", (event) => {
            
            let saveButtonPressed = event.target.className === "btn btn-info"
            if (saveButtonPressed) {
                
                newFormPost()    
                    }
                })

            }
            
        )

        
        

    })

)
