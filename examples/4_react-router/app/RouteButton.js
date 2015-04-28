'use strict';

import React from 'react';

const button = React.createFactory('button');

export default React.createClass({
	displayName: 'RouteButton',
  contextTypes: {
    router: React.PropTypes.func
  },

	_handleClick: function() {
		const pathName = this.context.router.getCurrentPathname();
		const toRoute = pathName === '/' ? 'another' : '/';
		this.context.router.transitionTo(toRoute);
	},

	render: function() {
		return button({
			onClick: this._handleClick
		}, 'ChangeRoute');
	}
});
