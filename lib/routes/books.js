
const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', (req, res, next) => {
    Book
      .create(req.body)
      .then(book => res.send(book))
      .catch(next);
  })

//get all with pagination
  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Book
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(books => res.send(books))
      .catch(next);
  })

  .get('/author-partial', (req, res, next) => {
    Book
      .getAuthorWithPartialText(req.params.partialText)
      .then(book => res.send(book))
      .catch(next);
  })


  .get('/:id', (req, res, next) => {
    Book
      .findById(req.params.id)
      .then(book => res.send(book))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Book
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(book => res.send(book))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Book
      .findByIdAndDelete(req.params.id)
      .then(book => res.send(book))
      .catch(next);
  });

