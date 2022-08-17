import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const countryDiv = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const countryInput = document.getElementById('search-box');

const DEBOUNCE_DELAY = 300;

countryInput.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY)
);

function onCountryInput() {
  const name = countryInput.value.trim();
  if (name === '') {
    return (countryList.innerHTML = ''), (countryDiv.innerHTML = '');
  }

  fetchCountries(name)
    .then(countries => {
      countryList.innerHTML = '';
      countryDiv.innerHTML = '';
      if (countries.length === 1) {
        countryList.insertAdjacentHTML(
          'beforeend',
          createMarkupList(countries)
        );
        countryDiv.insertAdjacentHTML(
          'beforeend',
          renderCountryInfo(countries)
        );
      } else if (countries.length >= 10) {
        tooManyMatches();
      } else {
        countryList.insertAdjacentHTML(
          'beforeend',
          createMarkupList(countries)
        );
      }
    })
    .catch(wrongName);

  function createMarkupList(countries) {
    const markupList = countries
      .map(({ name, flags }) => {
        return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `;
      })
      .join('');
    return markupList;
  }

  function renderCountryInfo(countries) {
    const markupInfo = countries
      .map(({ capital, population, languages }) => {
        return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(
              languages
            ).join(', ')}</p></li>
        </ul>
        `;
      })
      .join('');
    return markupInfo;
  }

  function wrongName() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }

  function tooManyMatches() {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
