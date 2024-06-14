/* eslint-disable no-undef */
Feature('Liking Resto');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('showing empty liked resto', ({ I }) => {
  I.amOnPage('/#favorites');
  I.see('No favorite restaurants yet', '.none-restaurant');
});

Scenario('liking and Unliking one restaurant', async ({ I }) => {
  I.seeElement('.restaurant-list .restaurant-box'); // Ensure restaurants are listed

  // Navigate to the restaurant detail page
  await I.executeScript(() => {
    const restaurantElement = document.querySelector('restaurant-box');
    if (!restaurantElement) {
      throw new Error('Restaurant element not found');
    }
    const shadowRoot = restaurantElement.shadowRoot;
    if (!shadowRoot) {
      throw new Error('Shadow root not found');
    }
    const firstRestaurant = shadowRoot.querySelector('.restaurant-container .restaurant-box .restaurant-name');
    if (!firstRestaurant) {
      throw new Error('First restaurant not found');
    }
    firstRestaurant.click();
  });

  I.seeElement('restaurant-detail');
  I.seeElement('.favorite-button')
  I.click('.favorite-button')

  I.wait(2);

  I.amOnPage('/#favorites');
  I.seeElement('favorite-restaurants');

  I.wait(3);

  I.seeElement('.detail-link');
  I.click('.detail-link')

  I.seeElement('.favorite-button.favorited')
  I.click('.favorite-button.favorited')

  I.amOnPage('/#favorites');
  I.seeElement('.none-restaurant')
});
