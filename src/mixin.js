'use strict';

import React from 'react/addons';

// know if we are on the client or the server
const isBrowser = !(global && Object.prototype.toString.call(global.process) === '[object process]');

export default {

	// add the PureRenderMixin for optimized rendering
	mixins: [React.addons.PureRenderMixin],

	// the appState must be available on context
	contextTypes: {
		appState: React.PropTypes.object.isRequired
	},

	// get a map of cursors pointing to subsets of the appState
	_getCursors: function(appState, cursors) {
		return cursors.keys().reduce((acc, key) => {
			acc[key] = cursors[key].reduce((subset, path) => subset[path], appState);
		}, {});
	},

	// get an array of all subscriptions to apply
	_getSubscriptions: function(component, cursors) {
		// do not subscribe to anything on the server (rerender from root)
		if (!isBrowser) return [];

		// return an array of subscription functions that update state on change
		return cursors.keys().map(key => ({
			cursor: cursors[key],
			subscribe: component.setState({[key]: cursors[key]})
		}));
	},

	// bind update event on cursor to subscription function
	_subscribe__: function(subscription) {
		subscription.cursor.on('update', subscription.subscribe);
	},

	// remove the bound update event from the cursor
	_unsubscribe__: function(subscription) {
		subscription.cursor.off('update', subscription.subscribe);
	},

	componentWillMount: function() {
		// get the entire appState
		const appState = this.context && this.context.appState;
		if (!appState) throw new Error('You must pass appState to your root component');

		// get a map of initial cursors pointing to subsets of the appState
		const cursors = this._getCursors(appState, this.cursors);

		// get an array of subscriptions to be applied
		const subscriptions = this._getSubscriptions(this, cursors);

		// subscribe to the update event for each cursor
		subscriptions.forEach(this._subscribe__).bind(this);

		// add the subscriptions to the component for unsubscription later
		this._subscriptions = subscriptions;

		// add the cursors to the component state
		this.setState(cursors);
	},

	componentWillUnmount: function() {
		// unsubscribe from all changes to the appState
		this._subscriptions.forEach(this._unsubscribe__).bind(this);
	}
};
