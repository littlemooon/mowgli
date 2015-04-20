
'use strict';

import React from 'react/addons';
import request from 'superagent';
require('superagent-bluebird-promise');
import {State} from 'neocortex';

const App = React.createFactory(require('./app/App'));

// define initial data
const state = new State({
	title: {
		text: 'Have some fruit!'
	}
});

// define actions on data
const actions = {
	list: {
		get: () => {
			request
				.get('http://localhost:3000/api/list')
				.then(res => state.list.push(res.body));
		},
		create: () => {
			request
				.post('http://localhost:3000/api/list')
				.then(res => state.list.push(res.body));
		}
	}
};

// render application passing in initial data and actions
const RootComponent = React.render(
	App({state: state, actions: actions}),
	document.body
);

// watch for changes to the state and rerender the root component
state.on('update', function(data) {
	RootComponent.setProps({state: data});
});
