const beersListGroup = document.querySelector('#list-group')
const beerDetailDiv = document.querySelector('#beer-detail')
const url = 'http://localhost:3000/beers'
fetch(url) //eslint-disable-line
  .then(response => response.json())
  .then(listAllBeers)

function listAllBeers (beers) {
  for (const beer of beers) {
    listABeer(beer)
  }
  showBeerDetail(beers[0])
}
/* <ul class="list-group">
  <li class="list-group-item">Beer title 1</li>
  <li class="list-group-item">Beer title 2</li>
</ul> */
function listABeer (beer) {
  createAndAppendElement('li', beersListGroup, null, 'list-group-item', (element) => {
    element.innerText = beer.name
    element.dataset.beerId = beer.id
    element.addEventListener('click', beerListItemClicked)
  })
}

function beerListItemClicked (event) {
  const beerId = event.target.dataset.beerId
  fetch(`${url}/${beerId}`) //eslint-disable-line
    .then(response => response.json())
    .then(showBeerDetail)
}

/* <h1>Beer Name</h1>
<img src="<add beer img url here>">
<h3>Beer Tagline</h3>
<textarea>Beer Description</textarea>
<button id="edit-beer" class="btn btn-info">
  Save
</button> */
function showBeerDetail (beer) {
  beerDetailDiv.innerHTML = ''
  createAndAppendElement('h1', beerDetailDiv, null, null, (element) => {
    element.innerText = beer.name
  })
  createAndAppendElement('img', beerDetailDiv, null, null, (element) => {
    element.src = beer.image_url
  })
  createAndAppendElement('h3', beerDetailDiv, null, null, (element) => {
    element.innerText = beer.tagline
  })
  const form = createAndAppendElement('form', beerDetailDiv, 'edit-form', null, (element) => {
    element.addEventListener('submit', editBeerDetail)
  })
  createAndAppendElement('textarea', form, 'beer-desc', null, (element) => {
    element.dataset.beerId = beer.id
    element.value = beer.description
  })
  createAndAppendElement('button', form, 'edit-button', 'btn btn-info', (element) => {
    element.innerText = 'Save'
  })
}

function editBeerDetail (event) {
  event.preventDefault()
  const descTextArea = event.target['beer-desc']
  const beerId = descTextArea.dataset.beerId
  fetch(`${url}/${beerId}`, { //eslint-disable-line 
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      description: descTextArea.value
    })
  })
    .then(response => response.json())
    .then((beer) => { console.log(beer) })
}

function createAndAppendElement (tag, parent, id = null, className = null, callback) {
  const element = document.createElement(tag)
  parent.append(element)
  if (id !== null) element.id = id
  if (className !== null) element.className = className
  if (callback !== undefined) callback(element)
  return element
}
