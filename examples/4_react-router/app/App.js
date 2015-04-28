'use strict';

import React from 'react';
import {RootMixin} from 'mowgli';

const RouteButton = React.createFactory(require('./RouteButton'));

export default React.createClass({
	displayName: 'App',
	propTypes: {
		route: React.PropTypes.func.isRequired
	},

	mixins: [RootMixin],

	render: function() {
		return React.createElement('div', {},
			this.props.route(),
			RouteButton()
		);
	}
});
