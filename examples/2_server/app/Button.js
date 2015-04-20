'use strict';

import React from 'react/addons';
import {Mixin} from 'neocortex';

const button = React.createFactory('button');

export default React.createClass({
	displayName: 'Button',

	mixins: [Mixin],

	actions: {
		'add': 'list.create'
	},

	_handleClick: function() {
		this.actions.add({name: 'Grape', color: 'Purple'});
	},

	render: function() {
		return button({
			onClick: this._handleClick
		}, 'Add');
	}
});
