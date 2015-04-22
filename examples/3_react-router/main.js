'use strict';

import React from 'react/addons';
import Router, {Route, DefaultRoute} from 'react-router';

const RootComponent = React.createFactory(require('./app/RootComponent'));

// render application passing in initial data and actions
const RootComponent = React.render(
	App({tree: tree, actions: actions}),
	document.body
);
const routes = [
  Route({path: '/', handler: App},
    Route({name: 'list', handler: List}),
    DefaultRoute({handler: Title})
  )
];

Router.run(routes, Router.HistoryLocation, Handler =>
  React.render(React.createElement(Handler), document.body)
);
