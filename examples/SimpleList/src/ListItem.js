'use strict';

import React from 'react/addons';

const p = React.createFactory('p');

export default React.createClass({
	displayName: 'ListItem',

	propTypes: {
		item: React.PropTypes.object.isRequired
	},

	render: function() {
		return p({}, `The ${this.props.item.name} is ${this.props.item.color}`);
	}
});
