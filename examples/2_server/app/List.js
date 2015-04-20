'use strict';

import React from 'react/addons';
import {Mixin} from 'neocortex';

const h4 = React.createFactory('h4');
const div = React.createFactory('div');
const p = React.createFactory('p');
const button = React.createFactory('button');
const Title = React.createFactory(require('./Title'));
const ListItem = React.createFactory(require('./ListItem'));
const Button = React.createFactory(require('./Button'));

export default React.createClass({
	displayName: 'List',

	mixins: [Mixin],

	cursors: {
		items: 'list'
	},

	actions: {
		getList: 'list.get'
	},

	componentWillMount: function() {
		this.actions.getList();
	},

	_renderList: function() {
		if (!this.state.items) return p({}, 'Loading...');

		return div({},
			this.state.items.val().map((item, i) =>
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

const Button = React.createClass({
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

const Title = React.createClass({
	displayName: 'Title',

	mixins: [Mixin],

	cursors: {
		text: 'title.text'
	},

	render: function() {
		return h4({}, this.state.text.val());
	}
});
