const API_KEY = 'live_lLKaopDfIyqyJyuaT2qxeRCTpmRUfwy5SJ5gyCncpFtzoNu9T6usVs846yu8pery'

//Колекція порід
function fetchBreeds() {
return fetch("https://api.thecatapi.com/v1/breeds")
.then(response => {
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
})
.catch(error => {console.log(error)
})};

//Інформація про кота
function fetchCatByBreed(breedId) {
  return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .catch(error => {
  console.log(error)
  })};

export {fetchBreeds, fetchCatByBreed}