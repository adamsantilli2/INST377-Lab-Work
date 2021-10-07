const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const locations = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => locations.push(...data));

function findMatches(wordToMatch, locations) {
  return locations.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, locations);
  const html = matchArray.map((place) => {
    const regex = new RegExp(this.value, 'gi');
    return `
                    <li>
                        <span class="name">${place.name}</span><br>
                        <span class="category">${place.category}</span><br>
                        <span class="address"><em>${place.address_line_1}</span><br>
                        <span class="city">${place.city}</span><br>
                        <span class="zip">${place.zip}</em></span>
                    </li>
                `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);