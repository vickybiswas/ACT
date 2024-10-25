import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { saveDataToSQLite, syncDataWithDynamoDB, fetchDataFromSQLite } from './db';

const App = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataFromSQLite();
      setData(result);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    await saveDataToSQLite(name, number);
    const result = await fetchDataFromSQLite();
    setData(result);
    setName('');
    setNumber('');
  };

  const handleSync = async () => {
    await syncDataWithDynamoDB();
    const result = await fetchDataFromSQLite();
    setData(result);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Names and Numbers</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleSync}>
              Sync
            </Button>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.number}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
