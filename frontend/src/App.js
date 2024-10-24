import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import axios from 'axios';

const App = () => {
  const [names, setNames] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB('names-numbers-db', 1, {
        upgrade(db) {
          db.createObjectStore('names', { keyPath: 'id', autoIncrement: true });
          db.createObjectStore('numbers', { keyPath: 'id', autoIncrement: true });
        },
      });
      setDb(db);
    };

    initDB();
  }, []);

  const addName = async (name) => {
    const tx = db.transaction('names', 'readwrite');
    const store = tx.objectStore('names');
    await store.add({ name });
    await tx.done;
    fetchNames();
  };

  const addNumber = async (number) => {
    const tx = db.transaction('numbers', 'readwrite');
    const store = tx.objectStore('numbers');
    await store.add({ number });
    await tx.done;
    fetchNumbers();
  };

  const fetchNames = async () => {
    const tx = db.transaction('names', 'readonly');
    const store = tx.objectStore('names');
    const allNames = await store.getAll();
    setNames(allNames);
  };

  const fetchNumbers = async () => {
    const tx = db.transaction('numbers', 'readonly');
    const store = tx.objectStore('numbers');
    const allNumbers = await store.getAll();
    setNumbers(allNumbers);
  };

  const syncData = async () => {
    const namesTx = db.transaction('names', 'readonly');
    const namesStore = namesTx.objectStore('names');
    const allNames = await namesStore.getAll();

    const numbersTx = db.transaction('numbers', 'readonly');
    const numbersStore = numbersTx.objectStore('numbers');
    const allNumbers = await numbersStore.getAll();

    await axios.post('http://localhost:8000/sync', { names: allNames, numbers: allNumbers });
  };

  return (
    <div>
      <h1>Names and Numbers</h1>
      <div>
        <h2>Names</h2>
        <ul>
          {names.map((name) => (
            <li key={name.id}>{name.name}</li>
          ))}
        </ul>
        <input type="text" id="nameInput" />
        <button onClick={() => addName(document.getElementById('nameInput').value)}>Add Name</button>
      </div>
      <div>
        <h2>Numbers</h2>
        <ul>
          {numbers.map((number) => (
            <li key={number.id}>{number.number}</li>
          ))}
        </ul>
        <input type="text" id="numberInput" />
        <button onClick={() => addNumber(document.getElementById('numberInput').value)}>Add Number</button>
      </div>
      <button onClick={syncData}>Sync Data</button>
    </div>
  );
};

export default App;
