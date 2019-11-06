const beerUl = document.querySelector('#list-group')
const beerDetailDiv = document.querySelector('#beer-detail')


fetch(`http://localhost:3000/beers`)
.then(res => res.json())
.then((beerArr) => {
    console.log(beerArr)
    beerArr.forEach(beer => {
        let beerLi = document.createElement('li')
        beerLi.className = 'list-group-item'
        beerLi.innerText = beer.name

        beerUl.append(beerLi)

        beerLi.addEventListener('click',()=>{
            // console.log(evt.target.id)
            fetch(`http://localhost:3000/beers/${beer.id}`)
            .then(res => res.json())
            .then((beerObj) => {
                // console.log(beerDetailDiv)
                
                let beerDetailLi = document.createElement('li')
                beerDetailLi.innerHTML = `<h1>${beer.name}</h1>
                <img src=${beer.image_url}>
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <form class="editbeer" id="beerForm" name="editbeerform">
                <label>new beer description</label>
                <input type="text" name="userInput">
                
                <button type="submit" id=${beer.id} class="btn btn-info">
                  Save
                </button>
                </form>`
                beerDetailDiv.append(beerDetailLi)
                // ====================
                let newDescForm = beerDetailLi.querySelector('#beerForm')
                   newDescForm.addEventListener('submit',(evt) => {
                      fetch(`http://localhost:3000/beers/${beer.id}`,{
                          method:"PATCH",
                          headers:"content-type/application/json",
                          body:JSON.stringify{
                              description:evt.target["userInput"].value
                          }
                          
                      })
                   })
                    // save button =============================
            })
        })
    });
})



// let beerDetailLi = document.createElement('li')
//                 beerDetailLi.innerHTML = `<h1>${beer.name}</h1>
//                 <img src=${beer.image}>
//                 <h3>${beer.tagline}</h3>
//                 <textarea>${beer.description}</textarea>
//                 <button id=${beer.id} class="btn btn-info">
//                   Save
//                 </button>`

//                 beerDetailDiv.append(beerDetailLi)

// console.log(beerObj)
                