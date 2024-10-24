import { openDB } from 'idb';

const dbPromise = openDB('names-numbers-db', 1, {
  upgrade(db) {
    db.createObjectStore('names', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('numbers', { keyPath: 'id', autoIncrement: true });
  },
});

export const insertName = async (name) => {
  const db = await dbPromise;
  const tx = db.transaction('names', 'readwrite');
  const store = tx.objectStore('names');
  await store.add({ name });
  await tx.done;
};

export const updateName = async (id, name) => {
  const db = await dbPromise;
  const tx = db.transaction('names', 'readwrite');
  const store = tx.objectStore('names');
  await store.put({ id, name });
  await tx.done;
};

export const deleteName = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction('names', 'readwrite');
  const store = tx.objectStore('names');
  await store.delete(id);
  await tx.done;
};

export const insertNumber = async (number) => {
  const db = await dbPromise;
  const tx = db.transaction('numbers', 'readwrite');
  const store = tx.objectStore('numbers');
  await store.add({ number });
  await tx.done;
};

export const updateNumber = async (id, number) => {
  const db = await dbPromise;
  const tx = db.transaction('numbers', 'readwrite');
  const store = tx.objectStore('numbers');
  await store.put({ id, number });
  await tx.done;
};

export const deleteNumber = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction('numbers', 'readwrite');
  const store = tx.objectStore('numbers');
  await store.delete(id);
  await tx.done;
};

export const syncDataWithDynamoDB = async () => {
  const db = await dbPromise;
  const namesTx = db.transaction('names', 'readonly');
  const namesStore = namesTx.objectStore('names');
  const allNames = await namesStore.getAll();

  const numbersTx = db.transaction('numbers', 'readonly');
  const numbersStore = numbersTx.objectStore('numbers');
  const allNumbers = await numbersStore.getAll();

  await fetch('http://localhost:8000/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ names: allNames, numbers: allNumbers }),
  });
};
