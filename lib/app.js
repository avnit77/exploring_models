require('dotenv').config();
require('./utils/connect')();
const Park = require('./models/Park');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ parks: ['Mt. Tabor', 'Laurelhurst', 'Jamison Square', 'Forest', 'Cathedral', 'Waterfront'] });
});

app.get('/parks', (req, res) => {
  Park.find()
    .then(response => {
      res.send(response);
    });
});

app.post('/parks', (req, res) => {
  Park.create(req.body)
    .then(park => {
      res.send(park);
    });
});

app.put('/parks/:id', (req, res) => {
  Park.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedItem => {
      res.send(updatedItem);
    });
});

app.delete('/parks/:id', (req, res) => {
  Park.findByIdAndDelete(req.params.id)
    .then(deletedItem => {
      res.send(deletedItem);
    });
});

app.delete('/parks', (req, res) => {
  return mongoose.connection.dropDatabase()
    .then(() => {
      res.send('All parks deleted');
    });
});

module.exports = app;
