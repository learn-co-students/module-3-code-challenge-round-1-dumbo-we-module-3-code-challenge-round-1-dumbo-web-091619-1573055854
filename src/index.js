let indexUrl = 'http://localhost:3000/beers'
let beerListUl = document.getElementById('list-group')


fetch(indexUrl)
.then(res => res.json())
.then((beers) => {
  beers.forEach(function(beer){
    let beerLi = document.createElement('li')
    beerLi.className = "list-group-item"
    beerLi.innerText = beer.name
    beerListUl.append(beerLi)


    // Add event listener for sidebar items
    beerLi.addEventListener('click', function() {
      let beerDetailDiv = document.getElementById("beer-detail")

      let innerHtml = `
      <h1>${beer.name}</h1>
      <img src=${beer.image_url}>
      <h3>Beer ${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info">
        Save
      </button>
      `

      beerDetailDiv.innerHTML = innerHtml
      let editButton = beerDetailDiv.getElementsByClassName('btn')[0]
      editButton.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log(event)
        // I can't figure out how to add a submit addEventListener to the button, so I'll continue but it won't work. I can't see the event so I am going to write the fetch generally as I don't actually know the key values to pull unless I see the event.

        fetch(`http://localhost:3000/beers/${beer.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            description:  event.description
          })
        })
        .then(res => res.json())

      })

    })
  })
})
