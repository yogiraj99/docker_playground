const express = require('express');
const app = express();

const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '172.18.0.3',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

client.connect().then(() => console.log('connected')).catch(err => console.error('connection error', err.stack));


const postNumber = function (req, res) {
  console.log(`added number ${req.body.number}`);
  client.query('INSERT INTO numbers values ($1)', [req.body.number], (err, pgRes) => {
    console.log(err ? err.stack : pgRes);
    res.send(`added number ${req.body.number}`);
  });
};

const getAllNumbers = function (req, res) {
  client.query('SELECT * from numbers', [], (err, pgRes) => {
    if (err) {
      console.log(err.stack);
      res.send(500);
      return;
    }
    console.log(pgRes);
    let rows = pgRes.rows;
    let responseBody = rows.reduce((resBody, row) => {
      let number = row.number;
      console.log(number);
      resBody += `${number}\n`;
      return resBody
    }, "");
    res.send(responseBody);
  });
};

app.use(express.urlencoded({ extended: false }));
app.post('/number', postNumber);
app.get('/numbers', getAllNumbers);
module.exports = app;
