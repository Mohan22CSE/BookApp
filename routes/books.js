var express = require('express');
var router = express.Router();
const BookMaster = require('../model/bookMaster');
const MyBook = require('../model/mybook');

router.get('/create', function(req, res, next) {
  res.render('createBook', { data: 'test' });
});

router.get('/addMybook', function(req, res, next) {
  var user_id = req.session.id;
  var book_id = req.query.id
  let errors = [];

  MyBook.findOne({book_id:book_id,user_id : user_id }).then(book => {
      if (book) {
        console.log(book);
        errors.push({ msg: 'already exists' });
         res.redirect('/index');
      } else { 
        const newBook = new MyBook({
            book_id : book_id,
            user_id : user_id
        });
           newBook
              .save()
              .then(user => {
                errors.push({ msg: 'Addes sucessfully' });
                res.redirect('/index');
              })
      }
    });
  
});

router.post('/submit', function(req, res, next) {
    const { name, paperback, publisher, language , isbn } = req.body;
    let errors = [];
    if (!name) {
    errors.push({ msg: 'book name required' });
    }
    
    if (!isbn) {
    errors.push({ msg: 'ISBN NUMBER required' });
    }
    
    if (errors.length > 0) {
        res.render('createBook', {
            errors,
            name,
            paperback,
            publisher,
            language,
            isbn
        });
  } else {
    BookMaster.findOne({ isbn: isbn }).then(book => {
      if (book) {
        errors.push({ msg: 'this isbn already exists' });
        res.render('createBook', {
            errors,
            name,
            paperback,
            publisher,
            language,
            isbn
        });
      } else { 
        const newBook = new BookMaster({
            name,
            paperback,
            publisher,
            language,
            isbn
        });
           newBook
              .save()
              .then(user => {
                res.redirect('/index');
              })
      }
    });
  }
});

module.exports = router;