let row = document.querySelector(".row")
let beerDetail = document.getElementById("beer-detail")

fetch("http://localhost:3000/beers")
.then(response => response.json())
.then((beersArr) => {
    console.log(beersArr)
    beersArr.forEach((beer) => {
        let beerUl = document.createElement("ul")
        beerUl.innerHTML = 
        `<ul class="list-group">
            <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
        </ul>`
        row.append(beerUl)
    })

    row.addEventListener("click", (evt) => {
        // debugger
        evt.preventDefault();
        let id = evt.target.dataset.id
        console.log("Hi")

        
        fetch(`http://localhost:3000/beers/${id}`, {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                // name:,
                // tagline:,
                // first_brewed:,
                // description:,
                // image_url:,
                // food_pairing:
            })
        })
        // .then(response => response.json())
        // .then((beer) => {
        //     let beerLi = document.createElement("li")
        //     beerLi.innerHTML`<p>${beer.name}<p>`
        // })
    })


})