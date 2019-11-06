const beerUl = getElementById("list-group")
const beerDIV = getElementById(".col-md-8")

fetch("http://localhost:3000/beers")
    .then(r => res.json())
    .then(() => {

        beerArr.forEach((beer) => {
            let beerLi = document.createElement('li')
            beerLi.className = "list-group"

            beerLi.innerHTML = `html
            <h1>${beer.name}</h1>
            <img src="<add beer img url here>">
            <h3>${beer.tagName}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
              Save
            </button>
            `

            beerUl.append(beerLi)

            fetch("http://localhost:3000/beers/:id", {
                    method: 'PATCH'
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                    body: JSON.stringify({
                        description: "your new description"
                    })

                }) // end of fetch
                .then(r => r.json())
                .then((Obj) => {


                })

        })
    }) // end of fetch