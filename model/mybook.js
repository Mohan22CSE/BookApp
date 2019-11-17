const mongoose = require('mongoose');
const MyBook = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'bookMaster',
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

const MyBooks = mongoose.model('my_books', MyBook);
module.exports = MyBooks;