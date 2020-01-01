const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const schema = new mongoose.Schema({
  bookID: String,
  title: String,
  authors: String,
  average_rating: Number,
  isbn: Number,
  isbn13: Number,
  language_code: String,
  num_pages: Number,
  ratings_count: Number,
  text_reviews_count: Number 
});

const Book = mongoose.model('Book', schema);


const fs = require('fs').promises;
const csv = require('csvtojson');

fs.readdir('./csv')
  .then(files => {
    return Promise.all(
      files.map(file => {
        return csv({
          delimiter: ','
        })
          .fromFile(`./csv/${file}`);
      })
    );
  });

module.exports = Book;
