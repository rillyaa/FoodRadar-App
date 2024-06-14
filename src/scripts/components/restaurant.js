import CONFIG from '../globals/config.js';
import LoadingIndicator from './loading-indicator.js';

class RestaurantBox extends HTMLElement {
  connectedCallback () {
    const shadow = this.attachShadow({ mode: 'open' });

    const loadingIndicator = new LoadingIndicator();

    const container = document.createElement('div');
    container.classList.add('restaurant-container');

    const style = document.createElement('style');
    style.textContent = `
      .restaurant-container {
        padding: 25px;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;
      }
      .restaurant-box {
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        text-align: center;
      }
      .restaurant-name {
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .restaurant-description {
        font-size: 12px;
        color: #666;
        margin-bottom: 10px;
      }
      .restaurant-rating, .restaurant-city {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #333;
        font-weight: bold;
        padding-bottom: 5px;
      }
      .restaurant-rating box-icon, .restaurant-city box-icon {
        margin-right: 5px;
      }
      .restaurant-image {
        width: 100%;
        height: 170px;
        border-radius: 8px;
        margin-bottom: 10px;
      }
      .skeleton {
        background-color: #e0e0e0;
        border-radius: 8px;
        display: inline-block;
        height: 150px;
        margin-bottom: 10px;
        width: 100%;
      }
      .skeleton-text {
        background-color: #e0e0e0;
        border-radius: 4px;
        display: inline-block;
        height: 14px;
        width: 80%;
        margin-bottom: 5px;
      }
      .skeleton-text.short {
        width: 60%;
      }
      @media screen and (min-width: 576px) {
        .restaurant-container {
          grid-template-columns: repeat(2, 1fr); /* 2 columns on smaller screens */
        }
        .restaurant-name, .restaurant-rating, .restaurant-city, .restaurant-description {
          font-size: 14px;
        }
      }
      @media screen and (min-width: 1000px) {
        .restaurant-container {
          grid-template-columns: repeat(3, 1fr);
        }
        .restaurant-name, .restaurant-rating, .restaurant-city, .restaurant-description {
          font-size: 18px;
        }
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(loadingIndicator);
    shadow.appendChild(container);

    loadingIndicator.showLoading();

    // Show skeleton UI
    for (let i = 0; i < 6; i++) {
      const skeletonElement = document.createElement('div');
      skeletonElement.classList.add('restaurant-box');
      skeletonElement.innerHTML = `
        <div class="skeleton"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
      `;
      container.appendChild(skeletonElement);
    }

    fetch(`${CONFIG.BASE_URL}list`)
      .then(response => response.json())
      .then(data => {
        loadingIndicator.hideLoading();
        container.innerHTML = ''; // Clear skeleton UI
        data.restaurants.forEach(restaurant => {
          const restaurantElement = document.createElement('div');
          restaurantElement.classList.add('restaurant-box');
          restaurantElement.setAttribute('role', 'article');
          restaurantElement.setAttribute('aria-label', `Restaurant: ${restaurant.name}. Rating: ${restaurant.rating}. Located in ${restaurant.city}.`);
          restaurantElement.innerHTML = `
            <picture>
              <source media="(min-width: 1000px)" srcset="${CONFIG.BASE_IMAGE_URL}large/${restaurant.pictureId}" loading="lazy">
              <source media="(min-width: 576px)" srcset="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" loading="lazy">
              <img 
                class="restaurant-image" 
                src="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}" 
                alt="${restaurant.name}" 
                loading="lazy">
            </picture>
            <div class="restaurant-name">${restaurant.name}</div>
            <div class="restaurant-rating"><box-icon name='star' type='solid' color='#FFC100'></box-icon> ${restaurant.rating}</div>
            <div class="restaurant-city"><box-icon name='current-location'></box-icon> ${restaurant.city}</div>
          `;
          restaurantElement.setAttribute('tabindex', '0');
          restaurantElement.addEventListener('click', () => {
            window.location.hash = `#detail/${restaurant.id}`;
          });
          container.appendChild(restaurantElement);
        });
      });
  }
}

customElements.define('restaurant-box', RestaurantBox);
