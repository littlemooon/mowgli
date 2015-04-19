'use strict';

import React from 'react/addons';
import {Mixin} from 'isocortex';

const button = React.createFactory('button');

export default React.createClass({
	displayName: 'Button',

	mixins: [Mixin],

	_handleClick: function() {
		console.log('clicked');
	},

	render: function() {
		return button({
			onClick: this._handleClick
		}, 'Add');
	}
});
