let beerUl = document.getElementById('list-group')
let beerDiv = document.getElementById('beer-detail')

fetch('http://localhost:3000/beers')
.then(r => r.json())
.then(beerArr => {
    beerArr.forEach(beer => {
        renderBeerList(beer)
    })
})

function renderBeerList(beer) {
    let beerLi = document.createElement('li')
    beerLi.className = 'list-group-item'
    beerLi.innerText = beer.name
    beerLi.id = `beer-${beer.id}`
    beerUl.append(beerLi)
    beerLi.addEventListener('click', () => {
        getBeer(beer)
    })
}

function getBeer(beer) {
    fetch(`http://localhost:3000/beers/${beer.id}`)
    .then(r => r.json())
    .then((beerObj) => {
        renderBeer(beerObj)
    })
}

function renderBeer(beer) {
    beerDiv.innerHTML = ""
    let nameHeader = document.createElement('h1')
    nameHeader.innerText = beer.name
    let beerImg = document.createElement('img')
    beerImg.src = beer.image_url
    let taglineH3 = document.createElement('h3')
    taglineH3.innerText = beer.tagline
    let descText = document.createElement('textarea')
    descText.id = `desc-${beer.id}`
    descText.innerText = beer.description
    let saveBtn = document.createElement('button')
    saveBtn.id = 'edit-beer'
    saveBtn.className = 'btn btn-info'
    saveBtn.innerText = 'Save'
    beerDiv.append(nameHeader, beerImg, taglineH3, descText, saveBtn)
}

beerDiv.addEventListener('click', (event) => {
    if (event.target.id === 'edit-beer') {
        let id = event.target.previousSibling.id.slice(5)
        let newDesc = event.target.previousSibling.value
        editBeerDesc(id, newDesc)
    }
})

function editBeerDesc(id, newDesc) {
    fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: newDesc
        })
    })
    .then(r => r.json())
    .then((beerObj) => {
        getBeer(beerObj)
    })
}
