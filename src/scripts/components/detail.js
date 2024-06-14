import CONFIG from '../globals/config';
import LoadingIndicator from './loading-indicator.js';
import LikeButtonHandler from '../utils/like-button-handler.js';

class RestaurantDetail extends HTMLElement {
  connectedCallback () {
    const id = window.location.hash.split('/')[1];
    const loadingIndicator = new LoadingIndicator();

    this.render(id, loadingIndicator);

    this.shadowRoot.appendChild(loadingIndicator);
  }

  async render (id, loadingIndicator) {
    const shadow = this.attachShadow({ mode: 'open' });

    const container = document.createElement('div');
    container.classList.add('restaurant-detail-container');

    const style = document.createElement('style');
    style.textContent = `
            .restaurant-detail-container {
    padding: 25px;
    background: #FFEC9E;
    font-family: 'Arial', sans-serif;
}

.restaurant-info {
    margin-top: 50px;
    border: 1px solid #dee2e6;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    transition: transform 0.3s, box-shadow 0.3s;
}

.restaurant-info:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.restaurant-name {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 10px;
    color: #343a40;
}

.restaurant-address,
.restaurant-city,
.restaurant-description,
.menu-item,
.review-name,
.review-date,
.review-text {
    font-size: 14px;
    margin-bottom: 10px;
    color: #495057;
}

.restaurant-description {
    line-height: 1.6;
}

.menu-section {
    margin-bottom: 20px;
}

.menu-section h3 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #343a40;
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 5px;
}

.customer-reviews {
    margin-top: 30px;
}

.review {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #dee2e6;
    border-radius: 10px;
    background-color: #f8f9fa;
    transition: background-color 0.3s;
}

.review:hover {
    background-color: #e9ecef;
}

.restaurant-image {
    width: 100%;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 10px;
    object-fit: cover;
}

.favorite-button {
    display: flex;
    align-items: center;
    border-radius: 35px;
    background-color: #ff6347;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 14px;
    transition: background-color 0.3s, transform 0.3s;
}

.favorite-button:hover {
    background-color: #ff4500;
    transform: scale(1.05);
}

.favorite-button.favorited {
    background-color: #32cd32;
}

.favorite-button.favorited:hover {
    background-color: #28a745;
}

.review-form {
    margin-top: 30px;
    padding: 15px;
    border: 1px solid #dee2e6;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.review-form h3 {
    margin-bottom: 15px;
    font-size: 18px;
    color: #343a40;
}

.review-form form {
    display: flex;
    flex-direction: column;
}

.review-form input,
.review-form textarea {
    margin-bottom: 10px;
    padding: 15px;
    font-size: 14px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
}

.review-form button {
    align-self: flex-end;
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 50px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.review-form button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

/* Media Queries for larger screens */
@media (min-width: 768px) {
    .restaurant-detail-container {
        display: grid;
        gap: 20px;
    }

    .restaurant-info {
        padding: 40px;
        grid-column: span 2;
    }

    .restaurant-name {
        font-size: 28px;
    }

    .restaurant-address,
    .restaurant-city,
    .restaurant-description,
    .menu-item,
    .review-name,
    .review-date,
    .review-text {
        font-size: 16px;
    }

    .restaurant-image {
        height: 400px;
    }

    .favorite-button {
        padding: 15px 30px;
        font-size: 16px;
    }
}

@media (min-width: 1024px) {
    .restaurant-info {
        padding: 60px;
        grid-column: span 3;
    }

    .restaurant-name,
    .restaurant-address,
    .restaurant-city,
    .restaurant-description,
    .restaurant-menu,
    .customer-reviews,
    .favorite-button {
        grid-column: span 2;
    }

    .restaurant-image {
        height: 500px;
        grid-column: span 1;
    }

    .favorite-button {
        background-color: #ff6347;
        color: #ffffff;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        margin-top: 20px;
        font-size: 14px;
        transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s; /* Added transition for hover effect and box-shadow */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added box-shadow for button */
    }

    .favorite-button:hover {
        background-color: #ff4500;
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Increased shadow on hover */
    }

    .favorite-button.favorited {
        background-color: #32cd32;
    }

    .favorite-button.favorited:hover {
        background-color: #28a745;
    }

    .icon-wrapper {
        display: flex;
        align-items: center;
        margin-right: 8px; /* Adjust space between icon and text */
    }
}
    `;

    loadingIndicator.showLoading();
    try {
      const response = await fetch(`${CONFIG.BASE_URL}detail/${id}`);
      const data = await response.json();
      const restaurant = data.restaurant;

      const restaurantElement = document.createElement('div');
      restaurantElement.classList.add('restaurant-info');

      loadingIndicator.hideLoading();

      restaurantElement.setAttribute('role', 'article');
      restaurantElement.setAttribute('aria-label', `Restaurant: ${restaurant.name}. Rating: ${restaurant.rating}. Located in ${restaurant.city}. Address: ${restaurant.address}. Description: ${restaurant.description}`);
      restaurantElement.innerHTML = `
                <img class="restaurant-image" src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" alt="${restaurant.name}">
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-address">Address: ${restaurant.address}</div>
                <div class="restaurant-city">City: ${restaurant.city}</div>
                <div class="restaurant-description">${restaurant.description}</div>
                <div class="restaurant-menu">
                    <div class="menu-section">
                        <h3>Food Menu</h3>
                        ${restaurant.menus.foods.map(food => `<div class="menu-item">${food.name}</div>`).join('')}
                    </div>
                    <div class="menu-section">
                        <h3>Drink Menu</h3>
                        ${restaurant.menus.drinks.map(drink => `<div class="menu-item">${drink.name}</div>`).join('')}
                    </div>
                </div>
                <div class="customer-reviews">
                    <h3>Customer Reviews</h3>
                    ${restaurant.customerReviews.map(review => `
                        <div class="review">
                            <div class="review-name">${review.name}</div>
                            <div class="review-date">${review.date}</div>
                            <div class="review-text">${review.review}</div>
                        </div>
                    `).join('')}
                </div>
                <!-- Review Form -->
                <div class="review-form">
                    <h3>Submit Your Review</h3>
                    <form id="review-form">
                        <input type="text" id="reviewer-name" placeholder="Your Name" required>
                        <textarea id="review-text" placeholder="Your Review" required></textarea>
                        <button type="submit" class="submit-review">Submit Review</button>
                    </form>
                </div>
                <!-- Favorite Button Container -->
                <div id="favorite-button-container"></div>
            `;

      restaurantElement.setAttribute('tabindex', '0');
      container.appendChild(restaurantElement);

      shadow.appendChild(style);
      shadow.appendChild(loadingIndicator);
      shadow.appendChild(container);

      // Initialize LikeButtonHandler after the restaurant element is added to the DOM
      const favoriteButtonContainer = this.shadowRoot.querySelector('#favorite-button-container');
      LikeButtonHandler.init({
        likeButtonContainer: favoriteButtonContainer,
        restaurant
      });

      // Handle review form submission
      const reviewForm = restaurantElement.querySelector('#review-form');
      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const reviewerName = reviewForm.querySelector('#reviewer-name').value;
        const reviewText = reviewForm.querySelector('#review-text').value;

        const reviewResponse = await fetch(`${CONFIG.BASE_URL}review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: restaurant.id,
            name: reviewerName,
            review: reviewText
          })
        });

        const reviewData = await reviewResponse.json();

        if (!reviewData.error) {
          const newReviews = reviewData.customerReviews.map(review => `
            <div class="review">
              <div class="review-name">${review.name}</div>
              <div class="review-date">${review.date}</div>
              <div class="review-text">${review.review}</div>
            </div>
          `).join('');

          const reviewsContainer = restaurantElement.querySelector('.customer-reviews');
          reviewsContainer.innerHTML = `<h3>Customer Reviews</h3>${newReviews}`;
        }
      });
    } catch (error) {
      console.error('Error fetching Detail Restaurant:', error);
      container.innerHTML = '<p>Failed to load Detail restaurants. Please try again later.</p>';
    }
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
