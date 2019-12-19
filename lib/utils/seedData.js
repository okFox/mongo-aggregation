const csv = require('csvtojson');
const Book = require('../models/Book');


const csvFilePath = './csv/books.csv';

function seedData() {
  return csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
      return Book.create(jsonObj);
    });
}

module.exports = { seedData };
