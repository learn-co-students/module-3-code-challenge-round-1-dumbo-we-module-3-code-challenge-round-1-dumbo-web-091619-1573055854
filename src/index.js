let ul = document.getElementById("list-group")

fetch("http://localhost:3000/beers")
.then(r => r.json())
.then(allBeers => {
    allBeers.forEach(beer => {
        let newLi = document.createElement("li")
        newLi.className = "list-group-item"

        newLi.innerText = beer.name
        ul.append(newLi)

        newLi.addEventListener("click", (e) => {
            let beerDiv = document.querySelector("#beer-detail")
            let saveButton = document.createElement("button")

            saveButton.setAttribute("id", `${beer.id}`)
            saveButton.className = "btn btn-info"
            saveButton.setAttribute = ("id", `${beer.id}`)
            saveButton.innerText = "Save"

            // saveButton.innerHTML = `<button type="submit">Save</button>`

            beerDiv.innerHTML = `<h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea id="${beer.id}">${beer.description}</textarea>`

            // <form method="post">
            //  <textarea>${beer.description}</textarea>
            // </form>

            beerDiv.append(saveButton)

            // Can only use submit on a form 
            saveButton.addEventListener("submit", (e) => {
                e.preventDefault();
                debugger
                fetch(`http://localhost:3000/beers/${beer.id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        // What are we updating //User input e.targer[""].value
                        description: beer.description // This will not work
                    })
                })
                .then(r => r.json())
                .then(res => {
                    console.log(re)
                })
            })
        })
    })
})