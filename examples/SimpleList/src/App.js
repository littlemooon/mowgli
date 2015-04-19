'use strict';

import React from 'react/addons';
import {RootMixin} from 'neocortex';

const List = React.createFactory(require('./List'));

export default React.createClass({
	displayName: 'App',

	mixins: [RootMixin],

	childContextTypes: {
		state: React.PropTypes.object,
		actions: React.PropTypes.object
	},

	getChildContext: function() {
		return {
			state: this.props.state,
			actions: this.props.actions
		};
	},

	render: function() {
		return (List());
	}
});
