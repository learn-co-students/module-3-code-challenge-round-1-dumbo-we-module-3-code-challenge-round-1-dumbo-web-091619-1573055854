//`http://localhost:3000/beers`
//<ul class="list-group" id="list-group">
//<div id="beer-detail">
//<div id="beer-detail">
let beerUL = document.getElementById("list-group")
let beerDIV = document.getElementById("beer-detail")



function loadPage(){
    return fetch(`http://localhost:3000/beers`)
    .then(r => r.json())
}

loadPage().then((jsonObj) => {
    jsonObj.forEach((beer) => {
        // console.log(beer)
     makeList(beer)
})})


function makeList(beer){
    //<li class="list-group-item">Beer title 1</li>
    let beerLI = document.createElement('li')
    beerLI.className = "list-group-item"
    beerLI.innerText = beer.name
    beerLI.id = beer.id
    beerUL.append(beerLI)
    beerLI.addEventListener("click", (event) => {
        // console.log(event.target)
        // console.log(beer.name)
        fetchOneBeer(event)
    })
    
  }

  function fetchOneBeer(evernt){
      fetch(`http://localhost:3000/beers/${event.target.id}`)
      .then(r => r.json())
      .then((beer) => {
          showOneBeer(beer)
      })
  }

  function showOneBeer(beer){
    beerDIV.removeChildre
    let h1 = document.createElement('h1')
    h1.innerText = beer.name
    let img = document.createElement('img')
    img.src= beer.image_url
    let h3 = document.createElement('h3')
    h3.innerText = beer.tagline
    let textarea = document.createElement('textarea')
    textarea.innerText = beer.description
    textarea.id = textarea
    let button = document.createElement('button')
      button.id = "edit-beer"
      button.className = "btn btn-info"
      button.innerText = "Save" 
      beerDIV.append(h1, img, h3, textarea, button)
     beerDIV.addEventListener("submit", (e) => {
         e.preventDefault()
         console.log(e)
     })


    }
   
// beer.tagline}</h3>
// <textarea>${beer.description}</textarea>
    
     
  