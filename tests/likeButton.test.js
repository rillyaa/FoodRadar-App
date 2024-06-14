/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import LikeButtonHandler from '../src/scripts/utils/like-button-handler.js';
import { getRestaurant, addRestaurant, deleteRestaurant } from '../src/public/data/idb.js';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
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
    ).toBeTruthy();
  });
  it('should not show the unlike button when the restaurant has not been liked before', async () => {
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
    ).toBeFalsy();
  });
  it('should be able to like the restaurant', async () => {
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

    document.querySelector('.favorite-button').dispatchEvent(new Event('click'));

    const restaurant = await getRestaurant('rqdv5juczeskfw1e867');
    expect(restaurant.id).toEqual('rqdv5juczeskfw1e867');

    await deleteRestaurant('rqdv5juczeskfw1e867');
  });
  it('should not add a restaurant again when its already liked', async () => {
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

    await addRestaurant({ id: 'rqdv5juczeskfw1e867' });

    document.querySelector('.favorite-button').dispatchEvent(new Event('click'));

    const allRestaurants = await getRestaurant('rqdv5juczeskfw1e867');
    expect(allRestaurants).toBeTruthy();

    await deleteRestaurant('rqdv5juczeskfw1e867');
  });
  it('should not add a restaurant when it has no id', async () => {
    try {
      await LikeButtonHandler.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {}, // Provide an empty object without an ID
      });

      // Click the like button
      document.querySelector('.favorite-button').dispatchEvent(new Event('click'));

      // If the above code succeeds, it means the test failed to throw an error
      // So its explicitly fail the test in case no error was thrown
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('Cannot get restaurant: ID is missing');
    }
  });
});
