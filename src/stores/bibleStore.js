"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _books = [];

var BibleStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllBooksOfTheBible: function() {
		return _books;
	},

	getBooksById: function(id) {
		return _.find(_books, {id: id});
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
		console.log("Made it in the store's initialize");
			_books = action.initialData.books;
			BibleStore.emitChange();
			break;
		case ActionTypes.ADD_BOOK:
			_books.push(action.book);
			BibleStore.emitChange();
			break;
		default:
			// no op
	}
});

module.exports = BibleStore;
