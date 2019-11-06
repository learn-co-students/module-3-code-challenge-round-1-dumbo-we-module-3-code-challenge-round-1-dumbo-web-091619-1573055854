

let beerUl = document.querySelector('#list-group');
let beerDetail = document.querySelector('#beer-detail');


// ======================================= {Fetch the beers Api}===============================

fetch(`http://localhost:3000/beers`)
  .then(response => response.json())
  .then(beers =>{
     beers.forEach(beer => {
              getBeers(beer)})
     }); 
     

// ======================================= {get Beers}===============================

function getBeers(beer){
    beerUl.className = 'list-group'
    let beerLi = document.createElement('li');

    beerLi.className = 'list-group-item'
    beerLi.innerText = beer.name
    beerUl.append(beerLi)

      beerLi.addEventListener('click',() => {

            beerDetail.innerHTML = 
            `<h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
              Save
            </button>`

            let editBeerBtn = document.querySelector('#edit-beer')

            editBeerBtn.addEventListener('click', (event) => {
                event.preventDefault();
                let textarea = document.querySelector('textarea').value

                fetch(`http://localhost:3000/beers/${beer.id}`, {
                  method: 'PATCH',
                  headers: {
                    'content-type': 'application/json',
                    Accept: 'application/json'
                  },
                  body: JSON.stringify({
                    description: textarea 
                   })
                })
                .then(response => response.json())
                .then((descriptionBeer) =>{ descriptionBeer.description = textarea })
            

            })
          


      })




}

     

