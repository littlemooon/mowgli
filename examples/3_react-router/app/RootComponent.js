'use strict';

import React from 'react/addons';

const App = React.createFactory(require('./App'));

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

function reRender() {
  App.setProps({tree: tree});
}

export default React.createClass({
	displayName: 'RootComponent',

	render: function() {
		return App({tree: tree, actions: actions}, RouteHandler());
	}
});
