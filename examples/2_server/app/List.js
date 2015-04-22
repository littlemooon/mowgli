'use strict';

import React from 'react/addons';
import {Mixin} from 'mowgli';

const div = React.createFactory('div');
const p = React.createFactory('p');
const Title = React.createFactory(require('./Title'));
const ListItem = React.createFactory(require('./ListItem'));
const Button = React.createFactory(require('./Button'));

export default React.createClass({
	displayName: 'List',

	mixins: [Mixin],

	data: {
		items: 'list.value',
		isLoading: 'list.loading'
	},

	actions: {
		getList: 'list.get'
	},

	componentWillMount: function() {
		this.actions.getList();
	},

	_renderList: function() {
		if (this.state.isLoading) return p({}, 'Loading..');

		return div({},
			this.state.items.map((item, i) =>
				ListItem({key: i, name: item.name, color: item.color})
			),
			Button()
		);
	},

	render: function() {
		return div({},
			Title(),
			this._renderList()
		);
	}
});
