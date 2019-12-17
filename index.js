
const mongoose = require('mongoose');
const csv = require('csvtojson');

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
  average_rating: String,
  isbn: String,
  isbn13: String,
  language_code: String,
  num_pages: Number,
  ratings_count: Number,
  text_reviews_count: Number 
});

const Book = mongoose.model('Book', schema);

const csvFilePath = './csv/books.csv';

csv()
  .fromFile(csvFilePath)
  .then((jsonObj)=>{
    return Book.create(jsonObj);

  });

