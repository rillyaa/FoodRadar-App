import { getRestaurant, addRestaurant, deleteRestaurant } from '../../public/data/idb.js';

const LikeButtonHandler = {
  async init ({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton () {
    const { id } = this._restaurant;
    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist (id) {
    const restaurant = await getRestaurant(id);
    return !!restaurant;
  },

  _renderLike () {
    this._likeButtonContainer.innerHTML = this._createLikeButtonTemplate();

    const likeButton = this._likeButtonContainer.querySelector('.favorite-button');
    likeButton.addEventListener('click', async () => {
      await addRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked () {
    this._likeButtonContainer.innerHTML = this._createLikedButtonTemplate();

    const likeButton = this._likeButtonContainer.querySelector('.favorite-button');
    likeButton.addEventListener('click', async () => {
      await deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },

  _createLikeButtonTemplate () {
    return `
      <button aria-label="like this restaurant" class="favorite-button">
        <box-icon name='heart'></box-icon>
        Add to Favorites
      </button>
    `;
  },

  _createLikedButtonTemplate () {
    return `
      <button aria-label="unlike this restaurant" class="favorite-button favorited">
        <box-icon name='heart' type='solid'></box-icon>
        Remove from Favorites
      </button>
    `;
  }
};

export default LikeButtonHandler;
