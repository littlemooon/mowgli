'use strict';

import React from 'react';

export default {
	propTypes: {
		tree: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object
	},

	childContextTypes: {
		tree: React.PropTypes.object,
		actions: React.PropTypes.object
	},

	getChildContext: function() {
		return {
			tree: this.props.tree,
			actions: this.props.actions
		};
	}
};
