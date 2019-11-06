  //assignment of beerUl variable to the class of list-group
  const beerUl = document.querySelector(".list-group")

//fetch to the json url
fetch("http://localhost:3000/beers")

  //response assigned to the json format
  .then( res => res.json())

  //.then method assigning the beerArr variable to data pulled form the json api
  .then((beerArr) => {

  //iterating through beerArr
  beerArr.forEach((beer) => {

    //creation of li tag to be inserted in beerUl
    let beerLi = document.createElement("li")

    //assignment of beerLi within innerHTML
    beerLi.innerHTML = `
      <li class="list-group-item">${beer.name}</li>
    `
    //appends the beerLi to the beerUL(".list-group")
    beerUl.append(beerLi)

    //assignment of beer detail li
    // let beerDetailLi = beers.createElement("li")

      //assignment of event listener to the individual id of beer names
      addEventListener("click",()  => {
        console.log('beers.id')

      })//end of addEventListener

    })//end of forEach

  })//end of second .then
