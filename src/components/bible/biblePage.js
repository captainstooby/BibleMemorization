"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var BibleStore = require('../../stores/bibleStore');
var BibleActions = require('../../actions/bibleActions');
var BibleBooksList = require('./bibleBooksList');

var BiblePage = React.createClass({
	getInitialState: function() {
		return {
			books: BibleStore.getAllBooksOfTheBible()
		};
	},

	componentWillMount: function() {
		BibleStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		BibleStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ books: BibleStore.getAllBooksOfTheBible() });
	},

	render: function() {
		return (
			<div>
				<h1>Books</h1>
				<Link to="addBook" className="btn btn-default">Add Book</Link>
				<BibleBooksList books={this.state.books} />
			</div>
		);
	}
});

module.exports = BiblePage;
