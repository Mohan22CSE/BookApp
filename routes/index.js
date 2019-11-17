var express = require('express');
var router = express.Router();
const BookMaster = require('../model/bookMaster');
const MyBooks = require('../model/mybook');
const UserModel = require('../model/users');

/* GET home page. */
router.get('/index', function(req, res, next) {
	var user_id = req.session.user_id;
	 if(!user_id){
	 	res.redirect('/');
	  }

    BookMaster.find({}, function(err, books) {
	    	UserModel.find({_id : user_id}, function(err,user) {
	    		MyBooks.find({user_id:user_id},{_id:0,book_id:1},(err,booksArray)=>{
			    	bkk = booksArray.map((x)=>x.book_id);
			    	BookMaster.find({_id:{$in:bkk}},(err,bookinf)=>{
			    		res.render('index', {books : books, user : user[0] , mybook : bookinf});
			    	 })
			    });
	    	});
    	}); 
    });

module.exports = router;
