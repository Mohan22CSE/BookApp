const mongoose = require('mongoose');
const BooksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  publisher: {
    type: String
  },
  paperback : {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('book_master', BooksSchema);
module.exports = Book;