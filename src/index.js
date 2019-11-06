// Step 1: get and show all beers showing their name

let beerUl = document.getElementById('list-group')

let beerDiv = document.getElementById('beer-detail')

fetch(`http://localhost:3000/beers`)
.then(r => r.json())
.then((beerArray) => {
    beerArray.forEach(beer => {
        let beerLi = document.createElement('li')
        beerLi.setAttribute('class', 'list-group-item')
        beerLi.innerText = beer.name
        beerUl.append(beerLi)
        beerLi.addEventListener('click', function (event) {
            showBeer(beer)
        })
    });


    function showBeer(beer) {
        //   console.log(beer)  

        beerDiv.innerHTML = `<h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>`

        let beerSaveBtn = document.createElement('button')
        beerSaveBtn.setAttribute('id', 'edit-beer')
        beerSaveBtn.setAttribute('class', 'btn btn-info')
        beerSaveBtn.setAttribute('value', beer.description)
        beerSaveBtn.innerText = "Save Edit"
        beerDiv.append(beerSaveBtn)

        beerSaveBtn.addEventListener('click', function (event){
            // event.preventDefault()
            editBeer(event, beer)
            // debugger
        })
    }


    function editBeer(event, beer) {

        // I was having trouble getting the new description come through so I will do a demonstrative parth with the old value that comes through
        let newDesc = beer.description

        fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: newDesc
            })
        })
        .then(r => r.json())
        .then((description) => {
            console.log(description)
        })



        // I intended to pessimistically attach the new description to the DOM at this point


        // debugger
        
    }

    // let submitBtn = document.getElementById('.edit-beer')
    // console.log(submitBtn)









})

