"use strict";

var React = require('react');
var Input = require('../common/textInput');

var BibleBookForm = React.createClass({
	propTypes: {
		book:	React.PropTypes.object.isRequired,
		onSave:	React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>Manage Book</h1>
				<Input
					name="name"
					label="Name"
					value={this.props.book.name}
					onChange={this.props.onChange}
					error={this.props.errors.book} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = BibleBookForm;
