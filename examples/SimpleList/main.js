'use strict';

import React from 'react/addons';
import {State} from 'isocortex';

const App = React.createFactory(require('./src/App'));

// define initial data
const initialData = new State({
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
		add: x => console.log(x)
	}
};

// render application passing in initial data and actions
const RootComponent = React.render(
	App({state: initialData, actions: actions}),
	document.body
);

// watch for changes to the state and rerender the root component
initialData.on('update', function(data) {
  RootComponent.setProps({state: data});
});
