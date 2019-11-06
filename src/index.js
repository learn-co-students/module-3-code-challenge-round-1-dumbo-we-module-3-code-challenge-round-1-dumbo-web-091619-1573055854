//On click, that item should render in more detail to the screen
//Edit beer info(patch to show)
let beerListUL = document.getElementById('list-group')
let beerCard = document.getElementById('beer-detail')

fetch("http://localhost:3000/beers")
.then(r => r.json())
.then((beerArr) => {
    beerArr.forEach((beer) => {
        let beerLi = document.createElement('li')
        beerLi.setAttribute('class', "list-group-item")
        beerLi.innerText = beer.name
        beerLi.dataset.id = beer.id

        // debugger
        beerLi.addEventListener('click', (event) => {
            event.preventDefault()
            debugger
            //pass beerObj into displayBeerDetails() to render the info of the clicked beer
        })
        beerListUL.append(beerLi)
    })
})

function displayBeerDetails(beer){
let beerCardName = document.createElement('h1')
beerCardName.setAttribute('id', 'beer-card-name')
beerCardName.innerText = beer.name
let beerCardImg = document.createElement('img')
beerCardImg.setAttribute('src', beer.image)
let beerCardTagline = document.createElement('h3')
beerCardTagline.innerText = beer.tagline
let beerCardDescription = document.createElement('textarea')
beerCardDescription.innerText = beer.description
let beerCardButton = document.createElement('button')
beerCardButton.setAttribute('id','edit-beer')
beerCardButton.setAttribute('class','btn btn-info')
beerCardButton.innerText = "Edit"
beerCard.append(beerCardName, beerCardImg, beerCardTagline, beerCardDescription)
}