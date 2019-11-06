document.addEventListener('DOMContentLoaded', (e) => {
let beersList = document.getElementById("list-group"); //this is a ul
let beerDetail = document.getElementById("beer-detail"); //this is a div



  fetch('http://localhost:3000/beers')
  .then(r => r.json())
  .then(allBeers => {

    //i know this isn't in the deliverables but I'm adding it anyway because the web page looks naked
    htmlifyBeer(allBeers[0]) //web page loads with first beer displayed

   allBeers.forEach(beer => {
       let beerLi = document.createElement('li')
       beerLi.innerText = beer.name
       beerLi.className = "list-group-item";

       beerLi.addEventListener('click', (e) => {
           fetch(`http://localhost:3000/beers/${beer.id}`)
           .then(r => r.json())
           .then(beerInfo => {
            htmlifyBeer(beerInfo)
           })
       })

       beersList.appendChild(beerLi)
   });
//====================================================================\
function htmlifyBeer(beerInstance){
 beerDetail.innerHTML = "";
 let beerTitle = document.createElement('h1');
 beerTitle.innerText = beerInstance.name;

 let beerImg = document.createElement('img');
 beerImg.src = beerInstance.image_url;

 let beerTagline = document.createElement('h3');
 beerTagline.innerText = beerInstance.tagline;

 let beerDesc = document.createElement('textarea');
 beerDesc.innerText = beerInstance.description;

 let editBeer = document.createElement('button');
 editBeer.id = "edit-beer";
 editBeer.className = "btn btn-info";
 editBeer.innerText = "Save";


 editBeer.addEventListener('click', (e) => {
    //  console.log(beerDesc.value)
     fetch(`http://localhost:3000/beers/${beerInstance.id}`, {
        method: "PATCH",
        body: JSON.stringify({
         description: beerDesc.value
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
     })
     .then(r => r.json())
     .then(updatedBeer => {
        beerDesc = updatedBeer.description
        // console.log(updatedBeer.description)
     })
 })

 beerDetail.appendChild(beerTitle);
 beerDetail.appendChild(beerImg);
 beerDetail.appendChild(beerTagline);
 beerDetail.appendChild(beerDesc);
 beerDetail.appendChild(editBeer);

}
  })












})