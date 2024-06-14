/* eslint-disable no-undef */
Feature('Reviewing Resto');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('submitting a review for a restaurant', async ({ I }) => {
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

  // Wait until restaurant detail page is loaded
  I.seeElement('restaurant-detail');
  I.waitForElement('.review-form');

  // Fill in review form
  const reviewerName = 'John Doe';
  const reviewText = 'Great restaurant with amazing food!';
  I.fillField('#reviewer-name', reviewerName);
  I.fillField('#review-text', reviewText);

  // Submit review
  I.seeElement('.submit-review')
  I.wait(3);
  I.click('.submit-review');

  // Wait for the review to be submitted and processed
  I.wait(2);

  // Verify that the new review appears in the customer reviews section
  I.seeElement('.customer-reviews .review');
  I.see(reviewerName, '.customer-reviews .review .review-name');
  I.see(reviewText, '.customer-reviews .review .review-text');
});
