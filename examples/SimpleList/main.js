'use strict';

import React from 'react/addons';
import {State} from 'isocortex';

const App = React.createFactory(require('./src/App'));

const exampleData = new State({
	title: {
		text: 'Have some fruit!'
	},
	list: [
		{name: 'Apple', color: 'Red'},
		{name: 'Orange', color: 'Orange'},
		{name: 'Banana', color: 'Yellow'}
	]
});

// render Root component wrapper and embed App component inside
const RootComponent = React.render(App({state: exampleData}), document.body);

exampleData.on('update', function(data) {
  RootComponent.setProps({state: data});
});
