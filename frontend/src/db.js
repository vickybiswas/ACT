import initSqlJs from 'sql.js';

let db;

const initDB = async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();
  createTable();
};

const createTable = () => {
  db.run('CREATE TABLE IF NOT EXISTS names_numbers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number TEXT);');
};

export const insertData = (name, number) => {
  db.run('INSERT INTO names_numbers (name, number) VALUES (?, ?);', [name, number]);
};

export const updateData = (id, name, number) => {
  db.run('UPDATE names_numbers SET name = ?, number = ? WHERE id = ?;', [name, number, id]);
};

export const deleteData = (id) => {
  db.run('DELETE FROM names_numbers WHERE id = ?;', [id]);
};

export const fetchDataFromSQLite = () => {
  const result = db.exec('SELECT * FROM names_numbers;');
  return result[0] ? result[0].values : [];
};

export const syncDataWithDynamoDB = async () => {
  // Fetch data from DynamoDB
  const dynamoDBData = await fetch('http://localhost:8000/names_numbers')
    .then(response => response.json())
    .catch(error => console.error('Error fetching data from DynamoDB:', error));

  // Insert or update data in SQLite
  dynamoDBData.forEach(item => {
    db.run('INSERT OR REPLACE INTO names_numbers (id, name, number) VALUES (?, ?, ?);', [item.id, item.name, item.number]);
  });

  // Fetch data from SQLite
  const sqliteData = fetchDataFromSQLite();

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

initDB();
