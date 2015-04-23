'use strict';

import React from 'react/addons';
import Router from 'react-router';

const Route = React.createFactory(Router.Route);
const DefaultRoute = React.createFactory(Router.DefaultRoute);

const RootComponent = require('./app/RootComponent');
const List = require('./app/List');
const AnotherTitle = require('./app/AnotherTitle');

const routes = [
	Route({path: '/', handler: RootComponent},
		Route({name: 'another', handler: AnotherTitle}),
		DefaultRoute({handler: List})
	)
];

Router.run(routes, Router.HistoryLocation, Handler =>
	React.render(React.createElement(Handler), document.body)
);
