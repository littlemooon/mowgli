'use strict';

import React from 'react';

const App = React.createFactory(require('./app/App'));

// define initial data
let tree = {
	title: {
		text: 'Have some fruit!'
	},
	list: [
		{name: 'Apple', color: 'Red'},
		{name: 'Orange', color: 'Orange'},
		{name: 'Banana', color: 'Yellow'}
	]
};

// define actions on data
const actions = {
	list: {
		create: () => {
			tree.list.push({name: 'Grape', color: 'Purple'});
			reRender();
		}
	}
};

// render application passing in initial data and actions
const RootComponent = React.render(
	App({tree: tree, actions: actions}),
	document.body
);

function reRender() {
  RootComponent.setProps({tree: tree});
}
