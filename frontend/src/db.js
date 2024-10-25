import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('names_numbers.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS names_numbers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number TEXT);'
    );
  });
};

export const insertData = (name, number) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO names_numbers (name, number) VALUES (?, ?);',
      [name, number]
    );
  });
};

export const updateData = (id, name, number) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE names_numbers SET name = ?, number = ? WHERE id = ?;',
      [name, number, id]
    );
  });
};

export const deleteData = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM names_numbers WHERE id = ?;',
      [id]
    );
  });
};

export const fetchDataFromSQLite = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM names_numbers;',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const syncDataWithDynamoDB = async () => {
  // Fetch data from DynamoDB
  const dynamoDBData = await fetch('http://localhost:8000/names_numbers')
    .then(response => response.json())
    .catch(error => console.error('Error fetching data from DynamoDB:', error));

  // Insert or update data in SQLite
  dynamoDBData.forEach(item => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO names_numbers (id, name, number) VALUES (?, ?, ?);',
        [item.id, item.name, item.number]
      );
    });
  });

  // Fetch data from SQLite
  const sqliteData = await fetchDataFromSQLite();

  // Send new data to DynamoDB
  const newData = sqliteData.filter(item => !dynamoDBData.some(dynamoItem => dynamoItem.id === item.id));
  await fetch('http://localhost:8000/names_numbers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  }).catch(error => console.error('Error sending data to DynamoDB:', error));
};
