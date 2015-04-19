'use strict';

import React from 'react/addons';
import {Mixin} from 'isocortex';

const div = React.createFactory('div');
const Title = React.createFactory(require('./Title'));
const ListItem = React.createFactory(require('./ListItem'));
const Button = React.createFactory(require('./Button'));

export default React.createClass({
	displayName: 'List',

	mixins: [Mixin],

	cursors: {
		items: ['list']
	},

	render: function() {
		return div({},
			Title(),
			this.state.items.getValue().map((item, i) =>
				ListItem({key: i, item: item})
			),
			Button()
		);
	}
});
