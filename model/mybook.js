const mongoose = require('mongoose');
const MyBook = new mongoose.Schema({
  book_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

const MyBooks = mongoose.model('my_book', MyBook);
module.exports = MyBooks;