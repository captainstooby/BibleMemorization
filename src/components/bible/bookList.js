"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var BookActions = require('../../actions/bookActions');
var toastr = require('toastr');

var BookList = React.createClass({
	propTypes: {
		books: React.PropTypes.array.isRequired
	},

	render: function() {
		var creatBookRow = function(book) {
			return (
				<tr key={book.id}>
					<td>{book.id}</td>
					<td>{book.name}</td>
					<td>{book.testament}</td>
				</tr>
			);
		};

		return (
			<div>
				<table className="table">
					<thead>
						<th>Book Number of the Bible</th>
						<th>Name</th>
						<th>Testament</th>
					</thead>
					<tbody>
						{this.props.books.map(creatBookRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = BookList;
