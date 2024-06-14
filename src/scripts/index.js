import 'regenerator-runtime';
import '../scss-styles/style.scss';
import './components/app-bar.js';
import './components/restaurant.js';
import './components/randomfact.js';
import './components/detail.js';
import './components/favorite-restaurant.js'
import swRegister from './utils/sw-register.js';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// eslint-disable-next-line no-unused-vars
const START = 10;
// eslint-disable-next-line no-unused-vars
const NUMBER_OF_IMAGES = 100;
// Initialize WebSocket connection

function loadRoute () {
  const app = document.getElementById('app');
  const jumbotronContainer = document.getElementById('jumbotron-container');
  const jumbotronImage = document.querySelector('.jumbotron-image');
  const textJumbotron = document.querySelector('.text-overlay');

  const hash = window.location.hash.split('/')[0];

  switch (hash) {
    case '#detail':
      if (textJumbotron) {
        textJumbotron.style.display = 'none';
      }
      // Periksa apakah elemen detail sudah ada sebelumnya
      if (!app.querySelector('restaurant-detail')) {
        const detailElement = document.createElement('restaurant-detail');
        jumbotronImage.style.height = '20vh';
        app.innerHTML = ''; // Clear the content
        app.appendChild(detailElement);
      }

      break;
    case '#favorites':
      // if (jumbotronContainer) {
      //     jumbotronContainer.style.display = 'none'; // Hide the jumbotron
      // }
      // Periksa apakah elemen favorit sudah ada sebelumnya
      if (textJumbotron) {
        textJumbotron.style.display = 'none';
      }
      if (!app.querySelector('favorite-restaurants')) {
        const favoriteElement = document.createElement('favorite-restaurants');
        jumbotronImage.style.height = '20vh';
        app.innerHTML = ''; // Clear the content
        app.appendChild(favoriteElement);
      }
      // footer.style.position = 'absolute';  // Set posisi footer absolute untuk halaman favorit
      // footer.style.bottom = '0';  // Pastikan footer berada di bawah
      // footer.style.width = '100%';

      break;
    default:
      if (jumbotronContainer) {
        jumbotronContainer.style.display = 'block'; // Show the jumbotron
      }
      if (textJumbotron) {
        textJumbotron.style.display = 'block';
      }
      jumbotronImage.style.height = '';

      // Periksa apakah elemen header sudah ada sebelumnya
      if (!app.querySelector('.restaurant-header')) {
        const restaurantHeader = document.createElement('div');
        restaurantHeader.classList.add('restaurant-header');
        restaurantHeader.setAttribute('tabindex', '0');
        restaurantHeader.innerHTML = `
                    <h3>Here, Choose Your Favorite Restaurant</h3>
                    <hr>
                `;
        app.innerHTML = ''; // Clear the content
        app.appendChild(restaurantHeader);
      }

      // Periksa apakah elemen random fact sudah ada sebelumnya
      if (!app.querySelector('random-fact')) {
        const randomFactElement = document.createElement('random-fact');
        app.appendChild(randomFactElement);
      }

      // Periksa apakah elemen box sudah ada sebelumnya
      if (!app.querySelector('restaurant-box')) {
        const boxElement = document.createElement('restaurant-box');
        app.appendChild(boxElement);
      }
      // footer.style.position = '';
      break;
  }
}

const skipLink = document.querySelector('.skip-link');
const mainContent = document.querySelector('#main-content');

skipLink.addEventListener('click', event => {
  event.preventDefault();
  mainContent.focus();
})

// Listen to hash changes
window.addEventListener('hashchange', loadRoute);

// Load the initial route
loadRoute();

window.addEventListener('load', () => {
  swRegister();
});

console.log('Hello Coders! :)');
