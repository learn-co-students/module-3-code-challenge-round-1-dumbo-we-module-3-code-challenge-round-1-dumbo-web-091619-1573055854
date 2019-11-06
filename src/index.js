let beerDetail = document.getElementById('beer-detail')
const beerDetailUl = document.createElement('ul')
let beerDetailLi = document.createElement('li')


fetch("http://localhost:3000/beers")
.then((resp) => resp.json())
.then((allBeerObj) => {
    console.log(allBeerObj)
    allBeerObj.forEach((beer) => {
        // console.log(beer.id)
        let beerList = document.getElementById('list-group')
        let beerLi = document.createElement('li')
        beerList.append(beerLi)
        beerLi.innerHTML = `<li id= "${beer.id}" class="list-group-item">${beer.name}</li>` 
        
        beerLi.addEventListener('click', (event, beer) => {
            console.log(event.target)
            beerDetailLi.innerHTML = ""
            beerDetail.append(beerDetailUl)
            beerDetailUl.append(beerDetailLi)
            beerDetailLi.innerHTML = createBeerDetail(event, beer)
    }) //inside beer list eventlistener     
    }//inside beer for each
    )} //inside beerObj forEach)
    
    //Edit and Patch Beer Description Form
    // editBeerDescForm = document.getElementById('edit-beer')
    // editBeerDescForm.addEventListener('click', () => {
        
    //     fetch(`http://localhost:3000/beers/${beer.id}`, {
    //       method:'PATCH',
    //      headers: { 
    //          'Content-type': 'application/json'
    //      },
    //      body: JSON.stringify({
    //          "description": ""
    //       })
    //     })
    // })
                    
    )//inside original fetch   
                    
    // createBeerDetail(beer)
    function createBeerDetail(beer){
    beerDetailLi.innerHTML = `<h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save </button>`}
                    
                    
                    
                    
                    
                    