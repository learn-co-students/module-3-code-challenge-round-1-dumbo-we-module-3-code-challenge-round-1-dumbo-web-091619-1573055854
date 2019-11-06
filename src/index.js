console.log('hi mf')

fetch("http://localhost:3000/beers")
.then(r => r.json())
.then(r => {
  let first = r[0]
  let mainBeer = document.getElementById("beer-detail")
  mainBeer.innerHTML = `
  <h1>${first.name}</h1>
  <img src=${first.image_url}>
  <h3>${first.tagline}</h3>
  <form method="PATCH" id=${first.id}>
  <textarea name="newDesc">${first.description}</textarea>
  <br>
  <button type="submit" id="edit-beer" class="btn btn-info">
    Save
  </button>
  </form>
  `
  let form = document.getElementById(first.id)
  form.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(e.target.newDesc.value)
    fetch(`http://localhost:3000/beers/${first.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        description: e.target.newDesc.value
      })
    })
    .then(r => r.json())
    .then(r => {
        mainBeer.innerHTML = `
        <h1>${el.name}</h1>
        <img src=${el.image_url}>
        <h3>${el.tagline}</h3>
        <form method="PATCH" id=${el.id}>
        <textarea id=${"t"+el.id} name="newDesc">${r.description}</textarea>
        <button type="submit" id="edit-beer" class="btn btn-info">
          Save
        </button>
        </form>
        `})
  })


  let leftSide = document.getElementById('list-group')
  // console.log(leftSide)
  r.forEach( el => {
    let newLi = document.createElement("LI")
    newLi.setAttribute("class", "list-group-item")
    newLi.setAttribute("id", el.id+'li')
    newLi.innerHTML = `
    <h3>${el.name}</h3>
    `
    newLi.addEventListener("click", function(e){
      mainBeer.innerHTML = `
      <h1>${el.name}</h1>
      <img src=${el.image_url}>
      <h3>${el.tagline}</h3>
      <form method="PATCH" id=${el.id}>
      <textarea id=${"t"+el.id} name="newDesc">${el.description}</textarea>
      <button type="submit" id="edit-beer" class="btn btn-info">
        Save
      </button>
      </form>
      `
      let form = document.getElementById(el.id)
      form.addEventListener("submit", function(e){
        e.preventDefault()
        // console.log(e.target.newDesc.value)
        fetch(`http://localhost:3000/beers/${el.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            description: e.target.newDesc.value
          })
        })
        .then(r => r.json())
        .then(r => {
          let t = document.getElementById(el.id+'li')
          newLi.addEventListener("click", function(e){
            mainBeer.innerHTML = `
            <h1>${el.name}</h1>
            <img src=${el.image_url}>
            <h3>${el.tagline}</h3>
            <form method="PATCH" id=${el.id}>
            <textarea id=${"t"+el.id} name="newDesc">${r.description}</textarea>
            <button type="submit" id="edit-beer" class="btn btn-info">
              Save
            </button>
            </form>
            `})
        })
      })
    })
    leftSide.append(newLi)
  })

})
