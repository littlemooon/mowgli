'use strict';

import React from 'react';
import Baobab from 'baobab';

const App = React.createFactory(require('./app/App'));

// define initial data
let tree = new Baobab({
	title: {
		text: 'Have some fruit!'
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

// render application passing in initial data and actions
React.render(
	App({tree: tree, actions: actions}),
	document.body
);
