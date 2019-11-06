fetch('http://localhost:3000/beers')
.then(response => response.json())
.then(beerArray => {
    beerArray.forEach(beer => {
        renderBeer(beer)
    })
})

function renderBeer(beer) {

    let beerUl = document.getElementById('list-group')
    let beerLi = document.createElement('li')
    beerLi.setAttribute('class', 'list-group-item')
    beerLi.innerText = beer.name

    beerUl.append(beerLi)

    beerLi.addEventListener('click', event => {
        
        let beerDiv = document.getElementById('beer-detail')
        beerDiv.innerHTML = ''

        let h1 = document.createElement('h1')
        h1.innerText = beer.name
        let image = document.createElement('img')
        image.src = beer.image_url
        let h3 = document.createElement('h3')
        h3.innerText = beer.tagline
        let textarea = document.createElement('textarea')
        textarea.setAttribute('id', 'beer-desc')
        textarea.innerText = beer.description
        let button = document.createElement('button')
        button.setAttribute('id', 'edit-beer')
        button.setAttribute('class', 'btn btn-info')
        button.innerText = 'Save'

        let form = document.createElement('form')
        form.append(textarea, button)

        beerDiv.append(h1, image, h3, form)

        form.addEventListener('submit', event => {
            event.preventDefault()

            let userInput = event.target['beer-desc'].value

            fetch(`http://localhost:3000/beers/${beer.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: userInput
                })
            })
            .then(response => response.json())
            .then(newBeerObj => {
                
                textarea.innerText = newBeerObj.description      
            })
        })
    })
}