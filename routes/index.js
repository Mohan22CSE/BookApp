var express = require('express');
var router = express.Router();
const BookMaster = require('../model/bookMaster');

/* GET home page. */
router.get('/index', function(req, res, next) {
	  var user_id = req.session.id;
    BookMaster.find({}, function(err, books) {
        res.render('index', { books: books });
    });
});

module.exports = router;
