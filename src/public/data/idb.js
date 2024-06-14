import CONFIG from '../../scripts/globals/config';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(CONFIG.DATABASE_NAME, CONFIG.DATABASE_VERSION);

    request.onerror = (event) => {
      reject(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(CONFIG.OBJECT_STORE_NAME)) {
        db.createObjectStore(CONFIG.OBJECT_STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

const getRestaurant = async (id) => {
  const db = await openDB();
  if (!id) {
    throw new Error('Cannot get restaurant: ID is missing');
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CONFIG.OBJECT_STORE_NAME], 'readonly');
    const store = transaction.objectStore(CONFIG.OBJECT_STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(`Get restaurant failed: ${request.error}`);
    };
  });
};

const getAllRestaurants = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CONFIG.OBJECT_STORE_NAME], 'readonly');
    const store = transaction.objectStore(CONFIG.OBJECT_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(`Get all restaurants failed: ${request.error}`);
    };
  });
};

const addRestaurant = async (restaurant) => {
  const db = await openDB();

  // Check if the restaurant object has an ID property
  if (!restaurant.id) {
    throw new Error('Cannot add restaurant: Restaurant ID is missing');
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CONFIG.OBJECT_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(CONFIG.OBJECT_STORE_NAME);
    const request = store.put(restaurant);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(`Add restaurant failed: ${request.error}`);
    };
  });
};

const deleteRestaurant = async (id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CONFIG.OBJECT_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(CONFIG.OBJECT_STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(`Delete restaurant failed: ${request.error}`);
    };
  });
};

export { getRestaurant, getAllRestaurants, addRestaurant, deleteRestaurant };
