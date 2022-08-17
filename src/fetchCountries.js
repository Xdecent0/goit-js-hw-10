const DATA_URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = `fields=name,capital,population,flags,languages`;

export function fetchCountries(name) {
  return fetch(`${DATA_URL}${name}?${FIELDS}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}
