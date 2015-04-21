'use strict';

import React from 'react/addons';
import {State} from 'mowgli';

const App = React.createFactory(require('./app/App'));

// define initial data
const tree = new State({
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
		create: () => tree.list.push({name: 'Grape', color: 'Purple'})
	}
};

// render application passing in initial data and actions
const RootComponent = React.render(
	App({tree: tree, actions: actions}),
	document.body
);

// watch for changes to the state and rerender the root component
// TODO: Cortex does not support nested events
tree.on('update', function(newTree) {
  RootComponent.setProps({tree: newTree});
});
