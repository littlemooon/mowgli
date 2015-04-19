'use strict';

import React from 'react/addons';

// know if we are on the client or the server
const isBrowser = !(global && Object.prototype.toString.call(global.process) === '[object process]');

export default {
	contextTypes: {
		state: React.PropTypes.object,
		actions: React.PropTypes.object
	},

	componentWillMount: function() {
		const c = this.context;

		// get a map of initial cursors pointing to subsets of the state
		const cursors = this._getCursors(this.cursors, c && c.state);

		// get an array of subscriptions to be applied
		this._subscriptions = this._getSubscriptions(this, cursors);

		// subscribe to the update event for each cursor
		// this._subscriptions.forEach(this._subscribe__).bind(this);

		// add the declared actions to the component
		this.actions = this._getActions(this.actions, c && c.actions);

		// add the cursors to the component state
		this.setState(cursors);
	},

	componentWillUpdate: function(p, s) {
		console.log('cwu');
		console.log(p);
		console.log(s);
	},
	componentDidUpdate: function(p, s) {
		console.log('cdu');
		console.log(p);
		console.log(s);
	},

	componentWillUnmount: function() {
		// unsubscribe from all changes to the state
		// this._subscriptions.forEach(this._unsubscribe__).bind(this);
	},

	// get a map of cursors pointing to subsets of the state
	_getCursors: function(declaredCursors, state) {
		return this.__getNestedObjectForEachKey(declaredCursors, state, 'Cursor');
	},

	// get a map of actions pointing to actions in the context
	_getActions: function(declaredActions, actions) {
		return this.__getNestedObjectForEachKey(declaredActions, actions, 'Action');
	},

	// get an array of all subscriptions to apply
	_getSubscriptions: function(component, cursors) {
		// do not subscribe to anything on the server (rerender from root)
		if (!isBrowser) return [];

		// return an array of subscription functions that update state on change
		return Object.keys(cursors).map(key => ({
			cursor: cursors[key],
			subscribe: () => component.setState({[key]: cursors[key]})
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

	// get a map of each key to the subtree identified by the path value
	__getNestedObjectForEachKey: function(keyObj, treeObj, errorDesc) {
		// check yourself
		if (!keyObj) return {};
		if (!treeObj) throw new Error(`No ${errorDesc}s have been passed to your root component`);

		// return a map of keys to nested object
		return Object.keys(keyObj).reduce((acc, key) => {
			acc[key] = this.__getNestedObjectFromPath(keyObj[key], treeObj, errorDesc);
			return acc;
		}, {});
	},

	// return the subtree identified by following the given path
	__getNestedObjectFromPath: function(path, treeObj, errorDesc) {
		// split path into an array
		const pathArray = path.constructor === Array ? path : path.split('.');

		// navigate the object via the path array and return the result
		return pathArray.reduce((tree, key) => {
			const subTree = tree && tree[key];

			// handle not found case
			if (tree && subTree === undefined) {
				console.warn(`${errorDesc} ${path} (key: ${key}) cannot be found`);
				return null;
			}

			return subTree;
		}, treeObj);
	}
};
