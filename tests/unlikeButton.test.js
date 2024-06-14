// unlikeButton.test.js
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import LikeButtonHandler from '../src/scripts/utils/like-button-handler';
import { getRestaurant, getAllRestaurants, addRestaurant, deleteRestaurant } from '../src/public/data/idb';

describe('Unliking A Resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await addRestaurant({ id: 'rqdv5juczeskfw1e867' }); // Add a restaurant to favorites
  });

  afterEach(async () => {
    await deleteRestaurant('rqdv5juczeskfw1e867'); // Clean up after each test
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 'rqdv5juczeskfw1e867',
        name: 'Melting Pot',
        city: 'Medan',
        rating: 4.2,
        pictureId: 14,
      },
    });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 'rqdv5juczeskfw1e867',
        name: 'Melting Pot',
        city: 'Medan',
        rating: 4.2,
        pictureId: 14,
      },
    });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to remove liked resto from the list', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 'rqdv5juczeskfw1e867',
        name: 'Melting Pot',
        city: 'Medan',
        rating: 4.2,
        pictureId: 14,
      },
    });

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    const restaurant = await getRestaurant('rqdv5juczeskfw1e867');
    expect(restaurant).toBeFalsy(); // Restaurant should no longer exist in favorites
  });

  it('should not throw error when user click favorite widget if the unliked resto is not in the list', async () => {
    await LikeButtonHandler.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 'rqdv5juczeskfw1e867',
        name: 'Melting Pot',
        city: 'Medan',
        rating: 4.2,
        pictureId: 14,
      },
    });
    await deleteRestaurant('rqdv5juczeskfw1e867');
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await getAllRestaurants()).toEqual([]);
  });
});
