require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Book = require('../lib/models/Book');

describe('book routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });


  let book;

  beforeEach(async() => {
    book = await Book.create({
      bookID: '23',
      'title': 'Dark Star Safari',
      authors: 'Paul Theroux',
      average_rating:'5',
      isbn: '9894329848',
      isbn13: '49830945',
      language_code: 'Klingon',
      text_reviews_count: 20003 
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new book', () => {
    return request(app)
      .post('/api/v1/books')
      .send({
        bookID: '23',
        title: 'Dark Star Safari',
        authors: 'Paul Theroux',
        average_rating:'5',
        isbn: '9894329848',
        isbn13: '49830945',
        language_code: 'Klingon',
        text_reviews_count: 20003
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookID: '23',
          title: 'Dark Star Safari',
          authors: 'Paul Theroux',
          average_rating:'5',
          isbn: '9894329848',
          isbn13: '49830945',
          language_code: 'Klingon',
          text_reviews_count: 20003,
          __v: 0
        });
      });
  });

  it('gets a movie by id', () => {
    return request(app)
      .get(`/api/v1/books/${book.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: book.id,
          bookID: '23',
          title: 'Dark Star Safari',
          authors: 'Paul Theroux',
          average_rating:'5',
          isbn: '9894329848',
          isbn13: '49830945',
          language_code: 'Klingon',
          text_reviews_count: 20003,
          __v: 0
        });
      });
  });

  it('get all books', () => {
    return request(app)
      .get('/api/v1/books')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: book.id,
            bookID: '23',
            title: 'Dark Star Safari',
            authors: 'Paul Theroux',
            average_rating:'5',
            isbn: '9894329848',
            isbn13: '49830945',
            language_code: 'Klingon',
            text_reviews_count: 20003,
            __v: 0
          }
        ]);
      });
  });

  it('gets an author by partial input', () => {
    return request(app)
      .get('/api/v1/books/search?partialText=Ther')
      .then(res => {
        expect(res.body).toEqual([{
          _id: book.id,
          bookID: '23',
          title: 'Dark Star Safari',
          authors: 'Paul Theroux',
          average_rating:'5',
          isbn: '9894329848',
          isbn13: '49830945',
          language_code: 'Klingon',
          text_reviews_count: 20003,
          __v: 0
        }]);
      });
  });

  it('updates a book', () => {
    return request(app)
      .patch(`/api/v1/books/${book.id}`)
      .send({ title: 'Light Star Safari' })
      .then(res => {
        expect(res.body).toEqual({
          _id: book.id,
          bookID: '23',
          title: 'Light Star Safari',
          authors: 'Paul Theroux',
          average_rating:'5',
          isbn: '9894329848',
          isbn13: '49830945',
          language_code: 'Klingon',
          text_reviews_count: 20003,
          __v: 0
        });
      });
  });

  it('deletes a book', () => {
    return request(app)
      .delete(`/api/v1/books/${book.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: book.id,
          bookID: '23',
          title: 'Dark Star Safari',
          authors: 'Paul Theroux',
          average_rating:'5',
          isbn: '9894329848',
          isbn13: '49830945',
          language_code: 'Klingon',
          text_reviews_count: 20003,
          __v: 0
        });
      });
  });
});

