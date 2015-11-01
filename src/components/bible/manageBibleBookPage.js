"use strict";

var React = require('react');
var Router = require('react-router');
var BibleBookForm = require('./bibleBookForm');
var BookActions = require('../../actions/bookActions');
var BibleStore = require('../../stores/bibleStore');
var toastr = require('toastr');

var ManageBibleBookPage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			book: { id: '', name: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var bookId = this.props.params.id; //from the path '/book:id'
		if (bookId) {
			this.setState({book: BibleStore.getBooksById(bookId) });
		}
	},

	setBookState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.book[field] = value;
		return this.setState({book: this.state.book});
	},

	bookFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.book.name.length == 0) {
			this.state.errors.book = 'Book name must be provided';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveBook: function(event) {
		event.preventDefault();

		if (!this.bookFormIsValid()) {
			return;
		}

		if (this.state.book.id === undefined) {
			BookActions.addBook(this.state.book);
		}

		this.setState({dirty: false});
		toastr.success('Book saved.');
		this.transitionTo('bible');
	},

	render: function() {
		return (
			<BibleBookForm
				book={this.state.book}
				onChange={this.setBookState}
				onSave={this.saveBook}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageBibleBookPage;
