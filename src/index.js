import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');
const loaderEl = document.querySelector('.loader');

function addOption(breeds) {
  const options = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
  });
  breedSelect.append(...options);
}

fetchBreeds()
  .then(breeds => {
    addOption(breeds);
    breedSelect.classList.remove('is-hidden');
  })
  .catch(error => {
    errorEl.classList.remove('is-hidden');
  })
  .finally(() => {
    loaderEl.classList.add('is-hidden');
  });

breedSelect.addEventListener('change', showCatInfoById);

function showCatInfoById(event) {
  const breedId = event.target.value;
  errorEl.classList.add('is-hidden');
  catInfoEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');
  fetchCatByBreed(breedId)
    .then(data => createMarkUp(data))
    .catch(error => {
      errorEl.classList.remove('is-hidden');
    })
    .finally(() => {
      loaderEl.classList.add('is-hidden');
    });
}

function createMarkUp(cat) {
  const { name, description, temperament } = cat[0].breeds[0];
  const { url } = cat[0];

  const markUp = `<img src="${url}" width="300" height="200"> <div>
<h1>${name}</h1>
<p>${description}</p>
<p><b>Tepmerament:</b>${temperament}</p>
</div>`;

  catInfoEl.innerHTML = markUp;
}
