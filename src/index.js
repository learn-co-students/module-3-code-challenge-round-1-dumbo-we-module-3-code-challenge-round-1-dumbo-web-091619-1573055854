document.addEventListener("DOMContentLoaded", (event) => {
	let beer_ul = document.querySelector("#list-group")
	let beer_window = document.querySelector("#beer-detail")

	list_beers(beer_ul, beer_window)
})

function get_beers(){
	return fetch("http://localhost:3000/beers")
	.then(response => response.json())
}

function list_beers(beer_ul, beer_window){
	get_beers()
	.then((beers) => {
		beers.forEach((beer) => {
			create_beer_li(beer, beer_ul, beer_window)
		})
	})
}

function create_beer_li(beer, beer_ul, beer_window){
	let beer_li = document.createElement("li")

	beer_li.setAttribute("class", "list-group-item")
	beer_li.innerText = `${beer.name}`

	add_listener_to_beer_li(beer, beer_li, beer_window)

	beer_ul.append(beer_li)
}

function add_listener_to_beer_li(beer, beer_li, beer_window){
	beer_li.addEventListener("click", (event) => {
		event.preventDefault()

		beer_window.innerHTML = ""

		fetch(`http://localhost:3000/beers/${beer.id}`)
		.then(response => response.json())
		.then((beer) => {
			create_beer_window(beer, beer_window)
		})

	})
}

function create_beer_window(beer, beer_window){
	let beer_h1 = document.createElement("h1")
	let beer_img = document.createElement("img")
	let beer_tagline = document.createElement("h3")
	let beer_date = document.createElement("p")
	let beer_brewers_tips = document.createElement("p")
	let beer_food_pairings_ul = document.createElement("ul")
	let beer_edit_form = document.createElement("form")
	let beer_desc = document.createElement("textarea")
	let beer_button = document.createElement("button")
	let beer_contrib = document.createElement("p")

	beer_h1.innerText = `${beer.name}`

	beer_img.src = `${beer.image_url}`

	beer_tagline.innerText = `${beer.tagline}`

	beer_date.innerText = `First Brewed:  ${beer.first_brewed}`

	beer_brewers_tips.innerText = `Brewing Tips: ${beer.brewers_tips}`

	beer_food_pairings_ul.innerText = "Goes Great With:"
	beer_food_pairings_ul.className = "list-group"
	beer.food_pairing.forEach((food) => {
		let beer_food_pairings_li = document.createElement("li")
		beer_food_pairings_li.className = "list-group-item"
		beer_food_pairings_li.dataset.id = `${food.id}`
		beer_food_pairings_li.innerText = `${food}`

		beer_food_pairings_ul.append(beer_food_pairings_li)
	})

	beer_desc.id = `${beer.id}`
	beer_desc.name = "beer_description"
	beer_desc.innerText = `${beer.description}`

	beer_contrib.innerText = `Contributed by: ${beer.contributed_by}`

	beer_button.setAttribute("id", "edit-beer")
	beer_button.setAttribute("class", "btn btn-info")
	beer_button.innerText = "Save"

	add_listener_to_beer_edit_form(beer, beer_edit_form, beer_desc)

	beer_edit_form.append(beer_desc)
	beer_edit_form.append(beer_button)

	beer_window.append(beer_h1)
	beer_window.append(beer_img)
	beer_window.append(beer_tagline)
	beer_window.append(beer_date)
	beer_window.append(beer_brewers_tips)
	beer_window.append(beer_food_pairings_ul)
	beer_window.append(beer_edit_form)
	beer_window.append(beer_contrib)
}

function add_listener_to_beer_edit_form(beer, beer_edit_form, beer_desc){
	beer_edit_form.addEventListener("submit", (event) => {
		event.preventDefault()

		let new_desc = event.target["beer_description"].value.trim()

		if (new_desc == "") {
			alert(`Please enter a description for ${beer.name}`)
		} else {
			fetch(`http://localhost:3000/beers/${beer.id}`, {
				method: "PATCH",
				headers: {
					"content-type": "application/json",
					 "Accept": "application/json"
				},
				body: JSON.stringify({
					description: new_desc
				})
			})
			.then(response => response.json())
			.then((beer) => {
				alert(`New description for ${beer.name} has been saved!`)
				beer_desc.innerText = `${beer.description}`
			})
		}
	})
}