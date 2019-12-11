require('dotenv').config();
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const newPark = {
  name: 'Mt. Tabor',
  hasPlayground: true,
  hasDogpark: true,
  quadrant: 'SE'
};

describe('application routes', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('gets parks', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ parks: ['Mt. Tabor', 'Laurelhurst', 'Jamison Square', 'Forest', 'Cathedral', 'Waterfront'] });
      });
  });

  it('adds a park', () => {
    return request(app)
      .post('/parks')
      .send(newPark)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Mt. Tabor',
          hasPlayground: true,
          hasDogpark: true,
          quadrant: 'SE'
        });
      });
  });

  it('has a parks get route', () => {
    return request(app)
      .post('/parks')
      .send(newPark)
      .then(() => {
        return request(app)
          .get('/parks');
      })
      .then(res => {
        expect(res.body).toEqual([{
          __v: 0,
          _id: expect.any(String),
          name: 'Mt. Tabor',
          hasPlayground: true,
          hasDogpark: true,
          quadrant: 'SE'
        }]);
      });
  });

  it('has a parks put route', () => {
    return request(app)
      .post('/parks')
      .send(newPark)
      .then(park => {
        return request(app)
          .put(`/parks/${park.body._id}`)
          .send({ name: 'Forest Park' });
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Forest Park',
          hasPlayground: true,
          hasDogpark: true,
          quadrant: 'SE'
        });
      });
  });

  it('deletes a park', () => {
    return request(app)
      .post('/parks')
      .send(newPark)
      .then(park => {
        return request(app)
          .delete(`/parks/${park.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              __v: 0,
              _id: expect.any(String),
              name: 'Mt. Tabor',
              hasPlayground: true,
              hasDogpark: true,
              quadrant: 'SE'
            });
          });
      });
  });
});
