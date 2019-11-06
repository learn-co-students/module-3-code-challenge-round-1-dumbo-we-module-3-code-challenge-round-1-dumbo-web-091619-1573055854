let beerList = document.querySelector('#list-group')
let beerDiv = document.querySelector('#beer-detail')
fetch("http://localhost:3000/beers")
  .then(function(response) {
    return response.json();
  })
  .then(function(beerArr){
    beerArr.forEach(function(beer){
      let beerLI = document.createElement('li')
      beerLI.className = "list-group-item"
      beerLI.innerText = beer.name
      beerList.append(beerLI)

      beerLI.addEventListener('click', function() {
          // console.log('test', beer.id)
      beerDiv.innerHTML = `<h1>${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer"  class="btn btn-info">
      Save
      </button>`
      //fetch to http://localhost:3000/beers/${beer.id}

      let saveButton = beerDiv.querySelector(`#edit-beer`)
      console.log(saveButton)
      saveButton.addEventListener('submit', function(){
        event.preventDefault()
        // let textVal = beerDiv.querySelector('textarea').value
        let textVal = event.target.textarea.value
        debugger;
        console.log(textVal)
        // make the patch request here
        fetch(`http://localhost:3000/beers/${beer.id}`, {
          method: "PATCH",
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({
            description: textVal,
          })
        })
        .then((r) => r.json())
        .then(newResponse)
         // display change on the dom's beer description
        beer.description.innerText = newResponse


      })



    }) //end of beerLI event listener


    }) //end of forEach




  }) //End of Second then
