
const mongoose = require('mongoose');

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

//statics and queries go here
schema.statics.getAuthorWithPartialText = function(partialText) {
  return this.aggregate([
    {
      authors: { $regex: `${partialText}` }
    }
  ]);
};


module.exports = mongoose.model('Book', schema);

