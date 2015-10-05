"use strict";

//This file is mocking a web API by hitting hard coded data.
var books = require('./booksData').books;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(book) {
	return book.name.toLowerCase() + '-' + book.testament.toLowerCase();
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var booksApi = {
	getAllBooks: function() {
		return _clone(books);
	},

	getBooksById: function(id) {
		var book = _.find(book, {id: id});
		return _clone(book);
	},

	saveBook: function(book) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the books to the DB via AJAX call...');

		if (book.id) {
			var existingbookIndex = _.indexOf(book, _.find(book, {id: book.id}));
			books.splice(existingbookIndex, 1, book);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new books in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			books.id = _generateId(book);
			books.push(book);
		}

		return _clone(book);
	}
};

  module.exports = booksApi;
