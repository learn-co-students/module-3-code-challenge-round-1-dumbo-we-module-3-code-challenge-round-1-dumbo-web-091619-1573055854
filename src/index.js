//`http://localhost:3000/beers`
//<ul class="list-group" id="list-group">
//<div id="beer-detail">
let beerUL = document.getElementById("list-group")




function loadPage(){
    return fetch(`http://localhost:3000/beers`)
    .then(r => r.json())
}

loadPage().then((jsonObj) => {
    jsonObj.forEach((beer) => {
        console.log(beer)
     showOneBeer(beer)
})})


function showOneBeer(beer){
    //<li class="list-group-item">Beer title 1</li>
    let beerLI = document.createElement('li')
    beerLI.className = "list-group-item"
    beerLI.innerText = beer.name
    beerLI.id = beer.id
    beerUL.append(beerLI)
    beerLI.addEventListener("click", (event) => {
        console.log(event.target)
        console.log(beer.name)
    })
    
  }