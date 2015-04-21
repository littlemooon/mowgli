'use strict';

import React from 'react/addons';
import {Mixin} from 'mowgli';

const button = React.createFactory('button');

export default React.createClass({
	displayName: 'Button',

	mixins: [Mixin],

	actions: {
		'add': 'list.create'
	},

	_handleClick: function() {
		this.actions.add();
	},

	render: function() {
		return button({
			onClick: this._handleClick
		}, 'Add');
	}
});
