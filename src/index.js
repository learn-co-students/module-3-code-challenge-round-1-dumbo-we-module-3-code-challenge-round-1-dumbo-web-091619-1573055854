let beerDetailDIV = document.getElementById("beer-detail")
let beerListUL = document.getElementById("list-group")

fetch(`http://localhost:3000/beers`)
.then(r => r.json())
.then((beerArray) => {
    beerArray.forEach((beer) => {
        let beerLI = document.createElement("li")
        beerLI.className = "list-group-item"
        beerLI.innerText = beer.name 
        beerListUL.append(beerLI)

        beerLI.addEventListener("click", () => {
            beerDetailDIV.innerText = ""

            let beerNameH1 = document.createElement("h1")
            beerNameH1.innerText = beer.name

            let beerIMG = document.createElement("img")
            beerIMG.src = beer.image_url

            let taglineH3 = document.createElement("h3")
            taglineH3.innerText = beer.tagline

            let beerDescrAREA = document.createElement("textarea")
            beerDescrAREA.value = beer.description
            
            let saveBTN = document.createElement("button")
            saveBTN.id = "edit-beer"
            saveBTN.className = "btn btn-info"
            saveBTN.innerText = "Save"

            beerDetailDIV.append(beerNameH1, beerIMG, taglineH3, beerDescrAREA, saveBTN)

            saveBTN.addEventListener("click", () => {
                // beerDetailDIV.innerText = ""
                newDesc = beerDescrAREA.value
                    
                fetch(`http://localhost:3000/beers/${beer.id}`, {
                    method:'PATCH',
                    headers: { 
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        description: newDesc
                    })
                })
                .then(r => r.json())
                .then((beer) => {
                    beerDescrAREA.value = beer.description
                })
                
                
                beerDescrAREA.value = beer.description
            })
            beerDescrAREA.value = beer.description

        })

    })  
})
