'use strict';

import React from 'react';

export default {
	propTypes: {
		tree: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object,
		cursorFns: React.PropTypes.shape({
      get: React.PropTypes.func.isRequired,
      value: React.PropTypes.func.isRequired,
      on: React.PropTypes.func,
      off: React.PropTypes.func
    })
	},

	childContextTypes: {
		tree: React.PropTypes.object,
		actions: React.PropTypes.object,
		cursorFns: React.PropTypes.object
	},

	getChildContext: function() {
		return {
			tree: this.props.tree,
			actions: this.props.actions,
			cursorFns: this.props.cursorFns
		};
	}
};
