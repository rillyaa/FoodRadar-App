import CONFIG from '../globals/config.js';
import LoadingIndicator from './loading-indicator.js';
import { getAllRestaurants } from '../../public/data/idb.js';

class FavoriteRestaurants extends HTMLElement {
  connectedCallback () {
    this.render();
  }

  async render () {
    const shadow = this.attachShadow({ mode: 'open' });

    const container = document.createElement('div');
    container.classList.add('favorite-restaurants-container');

    const style = document.createElement('style');
    style.textContent = `
      .favorite-restaurants-container {
        padding: 20px;
      }

      .restaurant-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
      }

      .restaurant-image {
        width: 300px;
        height: 200px;
        border-radius: 8px;
        object-fit: cover;
      }

      .restaurant-info {
        display: flex;
        flex-direction: column;
      }

      .restaurant-name {
        font-size: 20px;
        font-weight: bold;
        margin: 0px;
      }

      .restaurant-city, .restaurant-rating {
        font-size: 16px;
        margin: 3px 0px;
        color: #666;
      }

      .restaurant-description {
        font-size: 16px;
        margin-bottom: 20px;
        color: #444;
        display: -webkit-box; /* Menentukan tata letak teks menggunakan box model */
        -webkit-box-orient: vertical; /* Mengatur orientasi box model ke vertikal */
        -webkit-line-clamp: 3; /* Mengatur jumlah maksimum baris yang akan ditampilkan */
        overflow: hidden;
        margin-top: 7px;
      }

      .detail-link {
        height: 45px;
        font-size: 16px;
        color: #007bff;
        text-decoration: none;
        transition: color 0.3s;
      }

      .detail-link:hover {
        color: #0056b3;
      }

      @media only screen and (max-width: 768px) {
        .restaurant-item {
          grid-template-columns: 1fr; /* Mengubah tata letak ke satu kolom untuk layar yang lebih kecil */
        }

        .restaurant-image {
          width: 100%; /* Mengisi lebar untuk mengisi kontainer parent */
          height: auto; /* Mengatur ketinggian ke otomatis untuk mempertahankan rasio aspek */
        }
      }
    `;

    shadow.appendChild(style);

    const loadingIndicator = new LoadingIndicator();

    loadingIndicator.showLoading();

    shadow.appendChild(loadingIndicator);

    try {
      const favoriteRestaurants = await getAllRestaurants();

      container.innerHTML = '';

      if (favoriteRestaurants.length === 0) {
        container.innerHTML = '<p class="none-restaurant">No favorite restaurants yet.</p>';
      } else {
        favoriteRestaurants.forEach(restaurant => {
          const restaurantItem = document.createElement('div');
          restaurantItem.classList.add('restaurant-item');
          restaurantItem.innerHTML = `
            <img class="restaurant-image" src="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}" alt="${restaurant.name}">
            <div class="restaurant-info">
              <h2 class="restaurant-name">${restaurant.name}</h2>
              <p class="restaurant-city">City: ${restaurant.city}</p>
              <p class="restaurant-rating">Rating: ${restaurant.rating}</p>
              <p class="restaurant-description">${restaurant.description}</p>
              <a href="#detail/${restaurant.id}" class="detail-link">View Details</a>
            </div>
          `;
          container.appendChild(restaurantItem);
        });
      }

      loadingIndicator.hideLoading();
    } catch (error) {
      console.error('Error fetching favorite restaurants:', error);
      container.innerHTML = '<p>Failed to load favorite restaurants. Please try again later.</p>';
      loadingIndicator.hideLoading();
    }

    shadow.appendChild(container);
  }
}

customElements.define('favorite-restaurants', FavoriteRestaurants);
