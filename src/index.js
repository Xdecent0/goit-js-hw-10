import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

countryDiv = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
