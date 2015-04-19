'use strict';

import React from 'react/addons';

export default {
	propTypes: {
		state: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object
	},

	childContextTypes: {
		state: React.PropTypes.object,
		actions: React.PropTypes.object
	},

	getChildContext: function() {
		return {
			state: this.props.state,
			actions: this.props.actions
		};
	}
};
