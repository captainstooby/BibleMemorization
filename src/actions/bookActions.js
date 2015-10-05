"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var BookApi = require('../api/bookApi');
var ActionTypes = require('../constants/actionTypes');

var BookActions = {
	createBook: function(book) {
		var newBook = BookApi.saveBook(book);

		//Hey dispatcher, go tell all the stores that a book of the Bible was just added.
		Dispatcher.dispatch({
			actionType: ActionTypes.ADD_BOOK,
			book: newBook
		});
	}
};

module.exports = BookActions;
