let listUl = document.querySelector('#list-group')
let divBeer = document.querySelector('#beer-detail')

fetch('http://localhost:3000/beers')
.then(r => r.json())
.then(beers =>{
  beers.forEach(beer => {
    listUl.innerHTML += ` <li id='${beer.id}'class="list-group-item">${beer.name}</li>`
  })
  // liBeer = listUl.document.querySelector('.list-group-item')
  listUl.addEventListener('click', event => {
    if (event.target.tagName == 'LI'){
      fetch (`http://localhost:3000/beers/${event.target.id}`)
      .then(r => r.json())
      .then(beer => {
        if (divBeer.innerHTML){

        }
        divBeer.innerHTML += `<h1>${beer.name}</h1>
        <img src="${beer.image_url}">

        <h3>${beer.tagline}</h3>
        <textarea id='input'>${beer.description}</textarea>
        <button data-id ='${beer.id}' id="edit-beer" class="btn btn-info">
        Save
        </button>`

        button = document.querySelector('#edit-beer')
        button.addEventListener('click', event => {

        let textarea = document.querySelector('#input')
          fetch (`http://localhost:3000/beers/${event.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              description: textarea.value
            })
          }
          )
          .then(r => r.json())
          .then(respond => {
            // debugger
            respond.description
            let divBeerNew = document.querySelector('#beer-detail')
            textarea.innerText = respond.description
          })
        })
      })
    }

  })
})
