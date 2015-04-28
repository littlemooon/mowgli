'use strict';

import React from 'react';
import {Mixin} from 'mowgli';

const div = React.createFactory('div');
const Title = React.createFactory(require('./Title'));
const ListItem = React.createFactory(require('./ListItem'));
const Button = React.createFactory(require('./Button'));

export default React.createClass({
	displayName: 'List',

	mixins: [Mixin],

	data: {
		items: 'list'
	},

	render: function() {
		return div({},
			Title(),
			this.state.items.map((item, i) =>
				ListItem({key: i, name: item.name, color: item.color})
			),
			Button()
		);
	}
});
