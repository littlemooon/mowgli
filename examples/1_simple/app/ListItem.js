'use strict';

import React from 'react';

const p = React.createFactory('p');

export default React.createClass({
	displayName: 'ListItem',

	propTypes: {
		name: React.PropTypes.string,
		color: React.PropTypes.string
	},

	render: function() {
		return p({}, `The ${this.props.name} is ${this.props.color}`);
	}
});
