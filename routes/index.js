var express = require('express');
var router = express.Router();
const BookMaster = require('../model/bookMaster');
const MyBooks = require('../model/mybook');
const UserModel = require('../model/users');

/* GET home page. */
router.get('/index', function(req, res, next) {
	  var user_id = req.session.user_id;
    BookMaster.find({}, function(err, books) {
    	UserModel.find({_id : user_id}, function(err,user) {
    		res.render('index', {books : books, user : user[0]});
    	});

  //   	MyBooks
		// .find({ user_id: user_id},function(err2, child){

		// 	for (var arrayIndex in child) {
		// 		  var bookId = child[arrayIndex].book_id;
		// 		  BookMaster.findOne({_id : bookId}, function(err3, myBook) {
		// 		  		console.log(myBook);
		// 		  });

		// 		}
				
		// });

		
        
    });
    
});

module.exports = router;
