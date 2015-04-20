'use strict';

import React from 'react/addons';
import {State} from 'neocortex';

const App = React.createFactory(require('./app/App'));

// define initial data
const state = new State({
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
		create: () => state.list.push({name: 'Grape', color: 'Purple'})
	}
};

// render application passing in initial data and actions
const RootComponent = React.render(
	App({state: state, actions: actions}),
	document.body
);

// watch for changes to the state and rerender the root component
// TODO: Cortex does not support nested events
state.on('update', function(data) {
  RootComponent.setProps({state: data});
});
