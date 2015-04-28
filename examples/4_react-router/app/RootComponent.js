'use strict';

import React from 'react';
import Router from 'react-router';
import Baobab from 'baobab';

const App = React.createFactory(require('./App'));
const RouteHandler = React.createFactory(Router.RouteHandler);

// define initial data
let tree = new Baobab({
	title: {
		text: 'Have some fruit!'
	},
	anotherTitle: {
		text: 'This is a second route!'
	},
	list: [
		{name: 'Apple', color: 'Red'},
		{name: 'Orange', color: 'Orange'},
		{name: 'Banana', color: 'Yellow'}
	]
});

// define actions on data
const actions = {
	list: {
		create: () => tree.select('list').push({name: 'Grape', color: 'Purple'})
	}
};

export default React.createClass({
	displayName: 'RootComponent',

	getInitialState: function() {
		return {
			tree: tree
		};
	},

	render: function() {
		return App({tree: tree, actions: actions, route: RouteHandler});
	}
});
